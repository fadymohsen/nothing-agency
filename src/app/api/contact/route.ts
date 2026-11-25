import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { resend, EMAIL_CONFIG } from "@/lib/email/resend";
import { buildAdminEmail, buildUserConfirmationEmail, type LeadData } from "@/lib/email/templates";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, lang, _hp } = body || {};

    // 1. Honeypot check for spam bots
    if (_hp) {
      return NextResponse.json({ success: true, message: "Message received" });
    }

    // 2. Validate required fields
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Please provide a valid name." }, { status: 400 });
    }

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    if (!message || typeof message !== "string" || message.trim().length < 4) {
      return NextResponse.json({ error: "Please write a message with at least 4 characters." }, { status: 400 });
    }

    const lead: LeadData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: typeof subject === "string" ? subject.trim() : "",
      message: message.trim(),
      lang: lang === "ar" ? "ar" : "en",
      submittedAt: new Date().toLocaleString("en-US", {
        timeZone: "Africa/Cairo",
        dateStyle: "full",
        timeStyle: "medium",
      }) + " (Cairo Time)",
    };

    // 3. Verify Resend client initialization
    if (!resend) {
      console.error("[contact-form] RESEND_API_KEY is not configured in .env");
      return NextResponse.json(
        { error: "Email service is temporarily unconfigured. Please contact us directly at info@nothing-ads.com." },
        { status: 503 }
      );
    }

    const adminEmailData = buildAdminEmail(lead);
    const userEmailData = buildUserConfirmationEmail(lead);

    // 4. Load embedded brand logo attachment (guarantees logo displays in all clients)
    let attachments: Array<{ filename: string; content: Buffer; contentId: string }> = [];
    try {
      const logoPath = path.join(process.cwd(), "public", "images", "nothing-logo-yellow-tight.png");
      const logoBuffer = await fs.readFile(logoPath);
      attachments = [
        {
          filename: "nothing-logo.png",
          content: logoBuffer,
          contentId: "nothing-logo",
        },
      ];
    } catch (e) {
      console.warn("[contact-form] Could not load local logo attachment:", e);
    }

    // 5. Send Admin Notification & User Confirmation concurrently
    const [adminResult, userResult] = await Promise.allSettled([
      // Admin notification (reply-to is the lead's email)
      resend.emails.send({
        from: EMAIL_CONFIG.from,
        to: EMAIL_CONFIG.adminTo,
        replyTo: lead.email,
        subject: adminEmailData.subject,
        html: adminEmailData.html,
        text: adminEmailData.text,
        attachments: attachments.length > 0 ? attachments : undefined,
      }),
      // User confirmation (reply-to is info@nothing-ads.com)
      resend.emails.send({
        from: EMAIL_CONFIG.from,
        to: lead.email,
        replyTo: EMAIL_CONFIG.adminTo,
        subject: userEmailData.subject,
        html: userEmailData.html,
        text: userEmailData.text,
        attachments: attachments.length > 0 ? attachments : undefined,
      }),
    ]);

    if (adminResult.status === "rejected") {
      console.error("[contact-form] Failed to send admin notification:", adminResult.reason);
    } else if (adminResult.value.error) {
      console.error("[contact-form] Resend API error sending admin notification:", adminResult.value.error);
    }

    if (userResult.status === "rejected") {
      console.error("[contact-form] Failed to send user confirmation:", userResult.reason);
    } else if (userResult.value.error) {
      console.error("[contact-form] Resend API error sending user confirmation:", userResult.value.error);
    }

    // If both failed with errors from Resend, report to caller
    const adminError = adminResult.status === "fulfilled" ? adminResult.value.error : adminResult.reason;
    const userError = userResult.status === "fulfilled" ? userResult.value.error : userResult.reason;

    if (adminError && userError) {
      const msg =
        (adminError && typeof adminError === "object" && "message" in adminError ? String(adminError.message) : "") ||
        "Failed to send email via Resend.";
      return NextResponse.json({ error: msg }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact-form] Unexpected error handling contact submission:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request. Please try again." },
      { status: 500 }
    );
  }
}
