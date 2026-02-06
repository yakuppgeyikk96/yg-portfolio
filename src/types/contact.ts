export interface SocialLink {
  platform: "github" | "linkedin" | "email";
  url: string;
  label: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormState {
  status: "idle" | "loading" | "success" | "error";
  errorMessage?: string;
}
