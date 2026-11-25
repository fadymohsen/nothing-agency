function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export interface LeadData {
  name: string;
  email: string;
  subject?: string;
  message: string;
  lang?: "en" | "ar";
  submittedAt?: string;
}

/**
 * Admin Notification Email:
 * Alerting the agency at info@nothing-ads.com with complete lead details and 1-click reply.
 */
export function buildAdminEmail(data: LeadData): { subject: string; html: string; text: string } {
  const safeName = escapeHtml(data.name.trim());
  const safeEmail = escapeHtml(data.email.trim());
  const safeSubject = escapeHtml((data.subject || "General Inquiry").trim());
  const safeMessage = escapeHtml(data.message.trim()).replace(/\n/g, "<br/>");
  const timeStr = data.submittedAt || new Date().toUTCString();
  const langLabel = data.lang === "ar" ? "Arabic (العربية)" : "English";

  const emailSubject = `[New Lead] ${safeSubject} — ${safeName}`;

  const text = `
NEW CLIENT LEAD RECEIVED
========================

Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject || "General Inquiry"}
Language: ${langLabel}
Date: ${timeStr}

MESSAGE:
------------------------
${data.message}

Reply directly to this email or write to ${data.email}
`.trim();

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(emailSubject)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0d0f11; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e5e7eb;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #0d0f11; padding: 30px 15px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #14171a; border: 1px solid rgba(240, 179, 28, 0.25); border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          
          <!-- Header Banner -->
          <tr>
            <td style="padding: 32px 36px 20px; background: linear-gradient(180deg, #1b2024 0%, #14171a 100%); border-bottom: 1px solid rgba(255,255,255,0.08);">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="display: inline-block; font-size: 11px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #f0b31c; background: rgba(240,179,28,0.12); padding: 5px 12px; border-radius: 20px; border: 1px solid rgba(240,179,28,0.3);">
                      NEW CLIENT INQUIRY
                    </span>
                    <h1 style="margin: 14px 0 4px; font-size: 24px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">
                      ${safeName}
                    </h1>
                    <p style="margin: 0; font-size: 14px; color: #9ca3af;">
                      Submitted via website contact form
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Lead Details Table -->
          <tr>
            <td style="padding: 28px 36px 10px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
                <tr>
                  <td style="padding-bottom: 14px; width: 110px; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">From</td>
                  <td style="padding-bottom: 14px; font-weight: 600; color: #ffffff;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding-bottom: 14px; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</td>
                  <td style="padding-bottom: 14px;">
                    <a href="mailto:${safeEmail}" style="color: #f0b31c; text-decoration: none; font-weight: 600;">
                      ${safeEmail}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 14px; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Subject</td>
                  <td style="padding-bottom: 14px; color: #e5e7eb; font-weight: 500;">${safeSubject}</td>
                </tr>
                <tr>
                  <td style="padding-bottom: 14px; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Language</td>
                  <td style="padding-bottom: 14px; color: #e5e7eb;">${langLabel}</td>
                </tr>
                <tr>
                  <td style="padding-bottom: 14px; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Date</td>
                  <td style="padding-bottom: 14px; color: #9ca3af; font-size: 13px;">${escapeHtml(timeStr)}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Box -->
          <tr>
            <td style="padding: 0 36px 30px;">
              <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; color: #9ca3af; margin-bottom: 8px;">
                Message Content
              </div>
              <div style="background-color: #1a1e22; border-left: 3px solid #f0b31c; border-radius: 6px; padding: 18px 20px; font-size: 15px; line-height: 1.6; color: #ffffff; word-break: break-word;">
                ${safeMessage}
              </div>
            </td>
          </tr>

          <!-- Action Button -->
          <tr>
            <td style="padding: 0 36px 36px;" align="center">
              <a href="mailto:${safeEmail}?subject=Re:%20${encodeURIComponent(data.subject || "Your inquiry with Nothing Agency")}" style="display: inline-block; background-color: #f0b31c; color: #14171a; font-weight: 700; font-size: 14px; text-decoration: none; padding: 14px 28px; border-radius: 6px; letter-spacing: 0.5px; text-transform: uppercase; box-shadow: 0 4px 12px rgba(240,179,28,0.3);">
                Reply to ${safeName} &rarr;
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 36px; background-color: #0f1214; border-top: 1px solid rgba(255,255,255,0.06); text-align: center; font-size: 12px; color: #6b7280;">
              Nothing Advertising Agency • Automated Lead Notification System<br/>
              <span style="color: #4b5563;">Cairo, Egypt • info@nothing-ads.com</span>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();

  return { subject: emailSubject, html, text };
}

/**
 * User Confirmation Email:
 * Sent to the lead thanking them for their message with branded reassurance and direct contact channels.
 */
export function buildUserConfirmationEmail(data: LeadData): { subject: string; html: string; text: string } {
  const isAr = data.lang === "ar";
  const safeName = escapeHtml(data.name.trim());
  const safeSubject = escapeHtml((data.subject || (isAr ? "استفسار عام" : "General Inquiry")).trim());
  const safeMessage = escapeHtml(data.message.trim()).replace(/\n/g, "<br/>");

  const emailSubject = isAr
    ? `استلمنا رسالتك بنجاح — Nothing Advertising Agency`
    : `We received your message — Nothing Advertising Agency`;

  const text = isAr
    ? `
مرحباً ${data.name}،

شكراً لتواصلك مع Nothing Advertising Agency. لقد استلمنا رسالتك بنجاح، وفريقنا يراجع تفاصيل طلبك حالياً.
نحن لا ننتظر الإلهام، بل نصنعه من الصفر المطلق وفق منهجية واضحة. سنقوم بالرد عليك خلال 24 ساعة عمل.

تفاصيل رسالتك:
الموضوع: ${data.subject || "استفسار عام"}
الرسالة:
${data.message}

إذا كان مشروعك عاجلاً، يمكنك أيضاً التواصل معنا مباشرة عبر واتساب على الرقم: +201000108068
أو هاتفياً: +201273890104

مع خالص التحية،
فريق Nothing Advertising Agency
info@nothing-ads.com
https://nothing-agency.com
`.trim()
    : `
Hello ${data.name},

Thank you for reaching out to Nothing Advertising Agency. We have received your message and our creative team is already reviewing your inquiry.
We don't wait for inspiration — we engineer impact from zero, step by step. Our team typically gets back to you within 24 business hours.

Summary of your message:
Subject: ${data.subject || "General Inquiry"}
Message:
${data.message}

If your inquiry is urgent, feel free to reach out to us directly:
WhatsApp: +20 100 010 8068
Phone: +20 12 73890104

Best regards,
Nothing Advertising Agency
info@nothing-ads.com
https://nothing-agency.com
`.trim();

  const html = `
<!DOCTYPE html>
<html lang="${isAr ? "ar" : "en"}" dir="${isAr ? "rtl" : "ltr"}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(emailSubject)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0d0f11; font-family: ${isAr ? "'Noto Kufi Arabic', -apple-system, BlinkMacSystemFont, Tahoma, Arial, sans-serif" : "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"}; color: #e5e7eb; direction: ${isAr ? "rtl" : "ltr"}; text-align: ${isAr ? "right" : "left"};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #0d0f11; padding: 30px 15px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #14171a; border: 1px solid rgba(240, 179, 28, 0.25); border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">

          <!-- Brand Header -->
          <tr>
            <td style="padding: 36px 36px 24px; background: linear-gradient(180deg, #1c2125 0%, #14171a 100%); border-bottom: 1px solid rgba(255,255,255,0.08); text-align: center;">
              <span style="display: block; font-size: 20px; font-weight: 800; letter-spacing: 4px; color: #ffffff; text-transform: uppercase;">
                NOTHING
              </span>
              <span style="display: block; font-size: 10px; font-weight: 600; letter-spacing: 2px; color: #f0b31c; text-transform: uppercase; margin-top: 4px;">
                ADVERTISING AGENCY
              </span>
              <div style="height: 2px; width: 44px; background-color: #f0b31c; margin: 18px auto 0;"></div>
            </td>
          </tr>

          <!-- Main Greeting & Message -->
          <tr>
            <td style="padding: 36px 36px 20px;">
              <h2 style="margin: 0 0 16px; font-size: 22px; font-weight: 700; color: #ffffff; line-height: 1.3;">
                ${isAr ? `أهلاً ${safeName}، كل شيء يبدأ من اللاشيء.` : `Hello ${safeName}, everything starts as nothing.`}
              </h2>

              <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.7; color: #d1d5db;">
                ${
                  isAr
                    ? `شكراً لتواصلك معنا في <strong>Nothing Agency</strong>. لقد استلمنا رسالتك بنجاح، وفريقنا الإبداعي يراجع استفسارك حالياً.`
                    : `Thank you for getting in touch with <strong>Nothing Agency</strong>. We have received your message and our creative team is already reviewing your details.`
                }
              </p>

              <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.7; color: #9ca3af;">
                ${
                  isAr
                    ? `نحن لا ننتظر الإلهام ليأتي صدفة، بل نبني الحملات والهويات البصرية وفق عملية إبداعية ومنهجية صارمة. سنقوم بالرد عليك خلال <strong>24 ساعة عمل</strong>.`
                    : `We don't wait for sudden inspiration — we engineer brand identities, campaigns, and impact from scratch with a rigorous process. We typically respond within <strong>24 business hours</strong>.`
                }
              </p>

              <!-- Submitted Message Recap -->
              <div style="background-color: #191d21; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 20px; margin-bottom: 28px;">
                <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #f0b31c; font-weight: 700; margin-bottom: 10px;">
                  ${isAr ? "ملخص رسالتك المرسلة:" : "Summary of your inquiry:"}
                </div>
                <div style="font-size: 13px; color: #9ca3af; margin-bottom: 8px;">
                  <strong>${isAr ? "الموضوع:" : "Subject:"}</strong> ${safeSubject}
                </div>
                <div style="font-size: 14px; color: #e5e7eb; line-height: 1.6; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px;">
                  ${safeMessage}
                </div>
              </div>

              <!-- Quick Connect Box -->
              <div style="background: rgba(240,179,28,0.05); border: 1px dashed rgba(240,179,28,0.3); border-radius: 8px; padding: 18px 20px;">
                <p style="margin: 0 0 12px; font-size: 13px; font-weight: 600; color: #f0b31c;">
                  ${isAr ? "هل لديك مشروع عاجل؟ تواصل معنا مباشرة:" : "Have an urgent project? Reach us directly:"}
                </p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size: 13px;">
                  <tr>
                    <td style="padding: 4px 0; color: #d1d5db;">
                      WhatsApp: <a href="https://wa.me/201000108068" style="color: #ffffff; text-decoration: none; font-weight: 600;" dir="ltr">+20 100 010 8068</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; color: #d1d5db;">
                      Call: <a href="tel:+201273890104" style="color: #ffffff; text-decoration: none; font-weight: 600;" dir="ltr">+20 12 73890104</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; color: #d1d5db;">
                      Email: <a href="mailto:info@nothing-ads.com" style="color: #ffffff; text-decoration: none; font-weight: 600;">info@nothing-ads.com</a>
                    </td>
                  </tr>
                </table>
              </div>

            </td>
          </tr>

          <!-- CTA to Website -->
          <tr>
            <td style="padding: 10px 36px 36px;" align="center">
              <a href="https://nothing-agency.com" style="display: inline-block; background-color: #f0b31c; color: #14171a; font-weight: 700; font-size: 13px; text-decoration: none; padding: 12px 26px; border-radius: 6px; letter-spacing: 0.5px; text-transform: uppercase;">
                ${isAr ? "استكشف أعمالنا على الموقع &larr;" : "Explore Our Work &rarr;"}
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 36px; background-color: #0f1214; border-top: 1px solid rgba(255,255,255,0.06); text-align: center; font-size: 12px; color: #6b7280;">
              <strong>Nothing Advertising Agency</strong><br/>
              2 Almaza / Al-Thawra Main Street, Office 1, Cairo, Egypt<br/>
              <span style="color: #4b5563; display: block; margin-top: 6px;">
                &copy; ${new Date().getFullYear()} Nothing Advertising Agency. All rights reserved.
              </span>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();

  return { subject: emailSubject, html, text };
}
