import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactBody {
  name: string;
  email: string;
  message: string;
}

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;

// In-memory rate limiter: max 5 requests per IP per 15 minutes
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

// Periodically clean up expired entries to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(ip);
    }
  }
}, RATE_LIMIT_WINDOW_MS);

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function sanitizeHeaderValue(str: string): string {
  return str.replace(/[\r\n\t]/g, "");
}

function validate(
  data: unknown
): { valid: true; data: ContactBody } | { valid: false; error: string } {
  if (!data || typeof data !== "object") {
    return { valid: false, error: "Invalid request body" };
  }

  const { name, email, message } = data as Record<string, unknown>;

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return { valid: false, error: "Name is required (minimum 2 characters)" };
  }
  if (name.trim().length > MAX_NAME_LENGTH) {
    return {
      valid: false,
      error: `Name must be at most ${MAX_NAME_LENGTH} characters`,
    };
  }

  if (
    !email ||
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return { valid: false, error: "A valid email address is required" };
  }
  if (email.trim().length > MAX_EMAIL_LENGTH) {
    return {
      valid: false,
      error: `Email must be at most ${MAX_EMAIL_LENGTH} characters`,
    };
  }

  if (!message || typeof message !== "string" || message.trim().length < 10) {
    return {
      valid: false,
      error: "Message is required (minimum 10 characters)",
    };
  }
  if (message.trim().length > MAX_MESSAGE_LENGTH) {
    return {
      valid: false,
      error: `Message must be at most ${MAX_MESSAGE_LENGTH} characters`,
    };
  }

  return {
    valid: true,
    data: {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    },
  };
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please try again later.",
        },
        { status: 429 }
      );
    }

    // Validate environment variables
    if (
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASS ||
      !process.env.CONTACT_TO_EMAIL
    ) {
      console.error(
        "Contact form error: Missing required environment variables (SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL)"
      );
      return NextResponse.json(
        {
          success: false,
          error: "Server configuration error. Please try again later.",
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    const validation = validate(body);

    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    const { name, email, message } = validation.data;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Sanitize name for email header to prevent header injection
    const safeName = sanitizeHeaderValue(name);
    // Escape all user input for HTML to prevent XSS
    const escapedName = escapeHtml(name);
    const escapedEmail = escapeHtml(email);
    const escapedMessage = escapeHtml(message);

    await transporter.sendMail({
      from: `"${safeName}" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: process.env.CONTACT_TO_EMAIL,
      subject: `Portfolio Contact: ${safeName}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #ea580c;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${escapedName}</p>
          <p><strong>Email:</strong> <a href="mailto:${escapedEmail}">${escapedEmail}</a></p>
          <hr style="border: 1px solid #eee;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${escapedMessage}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(
      "Contact form error:",
      error instanceof Error ? error.message : error
    );
    return NextResponse.json(
      {
        success: false,
        error: "Failed to send message. Please try again later.",
      },
      { status: 500 }
    );
  }
}
