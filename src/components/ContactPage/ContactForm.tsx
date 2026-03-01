"use client";

import { motion } from "motion/react";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import type { Locale } from "@/types/locale";
import type { ContactFormData, ContactFormState } from "@/types/contact";

const uiStrings: Record<string, Record<Locale, string>> = {
  nameLabel: { en: "Name", tr: "Ad Soyad" },
  namePlaceholder: { en: "Your name", tr: "Adınız" },
  emailLabel: { en: "Email", tr: "E-posta" },
  emailPlaceholder: { en: "your@email.com", tr: "ornek@email.com" },
  messageLabel: { en: "Message", tr: "Mesaj" },
  messagePlaceholder: {
    en: "Tell me about your project or idea...",
    tr: "Projeniz veya fikriniz hakkında bilgi verin...",
  },
  submit: { en: "Send Message", tr: "Mesaj Gönder" },
  sending: { en: "Sending...", tr: "Gönderiliyor..." },
  success: {
    en: "Message sent successfully! I'll get back to you soon.",
    tr: "Mesajınız başarıyla gönderildi! En kısa sürede dönüş yapacağım.",
  },
  error: {
    en: "Something went wrong. Please try again.",
    tr: "Bir hata oluştu. Lütfen tekrar deneyin.",
  },
  nameRequired: { en: "Name is required", tr: "Ad alanı zorunludur" },
  emailRequired: { en: "Email is required", tr: "E-posta alanı zorunludur" },
  emailInvalid: {
    en: "Invalid email address",
    tr: "Geçersiz e-posta adresi",
  },
  messageRequired: { en: "Message is required", tr: "Mesaj alanı zorunludur" },
  messageMin: {
    en: "Message must be at least 10 characters",
    tr: "Mesaj en az 10 karakter olmalıdır",
  },
};

type ContactFormProps = {
  locale: Locale;
};

function validateForm(
  data: ContactFormData,
  locale: Locale
): Partial<Record<keyof ContactFormData, string>> | null {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};

  if (!data.name.trim()) errors.name = uiStrings.nameRequired[locale];
  if (!data.email.trim()) errors.email = uiStrings.emailRequired[locale];
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = uiStrings.emailInvalid[locale];
  if (!data.message.trim()) errors.message = uiStrings.messageRequired[locale];
  else if (data.message.trim().length < 10)
    errors.message = uiStrings.messageMin[locale];

  return Object.keys(errors).length > 0 ? errors : null;
}

export function ContactForm({ locale }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [formState, setFormState] = useState<ContactFormState>({
    status: "idle",
  });
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ContactFormData, string>>
  >({});

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errors = validateForm(formData, locale);
    if (errors) {
      setFieldErrors(errors);
      return;
    }

    setFormState({ status: "loading" });
    setFieldErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();

      if (!res.ok || !json.success) {
        setFormState({
          status: "error",
          errorMessage: json.error || uiStrings.error[locale],
        });
        return;
      }

      setFormState({ status: "success" });
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setFormState({
        status: "error",
        errorMessage: uiStrings.error[locale],
      });
    }
  }

  function handleChange(field: keyof ContactFormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    if (formState.status === "success" || formState.status === "error") {
      setFormState({ status: "idle" });
    }
  }

  const isLoading = formState.status === "loading";

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-2xl border border-border/50 bg-surface/50 p-6 backdrop-blur-sm md:p-8"
    >
      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium text-foreground">
          {uiStrings.nameLabel[locale]}
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder={uiStrings.namePlaceholder[locale]}
          maxLength={100}
          disabled={isLoading}
          className="w-full rounded-xl border border-border/50 bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted/50 focus:border-primary/50 focus:shadow-[0_0_10px_rgba(234,88,12,0.1)] disabled:opacity-50"
        />
        {fieldErrors.name && (
          <p className="mt-1 text-sm text-red-400">{fieldErrors.name}</p>
        )}
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium text-foreground">
          {uiStrings.emailLabel[locale]}
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder={uiStrings.emailPlaceholder[locale]}
          maxLength={254}
          disabled={isLoading}
          className="w-full rounded-xl border border-border/50 bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted/50 focus:border-primary/50 focus:shadow-[0_0_10px_rgba(234,88,12,0.1)] disabled:opacity-50"
        />
        {fieldErrors.email && (
          <p className="mt-1 text-sm text-red-400">{fieldErrors.email}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-foreground">
          {uiStrings.messageLabel[locale]}
        </label>
        <textarea
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          placeholder={uiStrings.messagePlaceholder[locale]}
          maxLength={5000}
          disabled={isLoading}
          rows={5}
          className="w-full resize-none rounded-xl border border-border/50 bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted/50 focus:border-primary/50 focus:shadow-[0_0_10px_rgba(234,88,12,0.1)] disabled:opacity-50"
        />
        {fieldErrors.message && (
          <p className="mt-1 text-sm text-red-400">{fieldErrors.message}</p>
        )}
      </div>

      {formState.status === "success" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400"
        >
          <CheckCircle size={16} />
          {uiStrings.success[locale]}
        </motion.div>
      )}

      {formState.status === "error" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
        >
          <AlertCircle size={16} />
          {formState.errorMessage}
        </motion.div>
      )}

      <motion.button
        type="submit"
        disabled={isLoading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="btn-shine flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ea580c] via-[#f97316] to-[#ea580c] bg-[length:200%_100%] px-8 py-3 font-semibold text-white shadow-[0_0_20px_rgba(234,88,12,0.3)] transition-all duration-500 hover:bg-right hover:shadow-[0_0_30px_rgba(234,88,12,0.5)] disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            {uiStrings.sending[locale]}
          </>
        ) : (
          <>
            <Send size={18} />
            {uiStrings.submit[locale]}
          </>
        )}
      </motion.button>
    </motion.form>
  );
}
