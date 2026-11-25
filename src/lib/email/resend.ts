import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

export const resend = apiKey ? new Resend(apiKey) : null;

export const EMAIL_CONFIG = {
  from: process.env.RESEND_FROM_EMAIL || "Nothing Agency <info@nothing-ads.com>",
  adminTo: process.env.RESEND_ADMIN_EMAIL || "info@nothing-ads.com",
};
