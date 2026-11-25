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
 * High-End Luxury Agency Admin Notification Email
 */
export function buildAdminEmail(data: LeadData): { subject: string; html: string; text: string } {
  const safeName = escapeHtml(data.name.trim());
  const safeEmail = escapeHtml(data.email.trim());
  const safeSubject = escapeHtml((data.subject || "General Inquiry").trim());
  const safeMessage = escapeHtml(data.message.trim()).replace(/\n/g, "<br/>");
  const timeStr = data.submittedAt || new Date().toUTCString();
  const langLabel = data.lang === "ar" ? "Arabic (العربية)" : "English";

  const emailSubject = `[New Client Lead] ${safeSubject} — ${safeName}`;

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

Reply directly to this email or contact ${data.email}
`.trim();

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(emailSubject)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0d0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #d2d7df; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #0b0d0f; padding: 40px 15px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table role="presentation" width="100%" style="max-width: 620px; background-color: #121518; border: 1px solid rgba(240, 179, 28, 0.35); border-radius: 12px; overflow: hidden; box-shadow: 0 16px 40px rgba(0,0,0,0.65);">
          
          <!-- Top Accent Gold Line -->
          <tr>
            <td style="height: 3px; background: linear-gradient(90deg, #f0b31c 0%, #ffd066 50%, #f0b31c 100%);"></td>
          </tr>

          <!-- Header with Logo -->
          <tr>
            <td style="padding: 36px 40px 24px; background: linear-gradient(180deg, #171b1f 0%, #121518 100%); border-bottom: 1px solid rgba(255,255,255,0.07);">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <!-- Embedded Brand Logo -->
                    <img src="cid:nothing-logo" alt="NOTHING ADVERTISING AGENCY" width="170" height="46" style="display: block; width: 170px; max-width: 170px; height: auto; border: 0; outline: none;" />
                  </td>
                  <td align="right" style="vertical-align: middle;">
                    <span style="display: inline-block; font-size: 10px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #f0b31c; background: rgba(240,179,28,0.12); padding: 6px 14px; border-radius: 20px; border: 1px solid rgba(240,179,28,0.35);">
                      NEW CLIENT DOSSIER
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Lead Info Grid -->
          <tr>
            <td style="padding: 32px 40px 10px;">
              <div style="font-size: 11px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #f0b31c; margin-bottom: 18px;">
                CONTACT OVERVIEW
              </div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px; line-height: 1.6;">
                <tr>
                  <td style="padding: 10px 0; width: 110px; color: #8b949e; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid rgba(255,255,255,0.05);">Client Name</td>
                  <td style="padding: 10px 0; font-weight: 700; color: #ffffff; font-size: 16px; border-bottom: 1px solid rgba(255,255,255,0.05);">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #8b949e; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid rgba(255,255,255,0.05);">Email Address</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <a href="mailto:${safeEmail}" style="color: #f0b31c; text-decoration: none; font-weight: 600; font-size: 15px;">
                      ${safeEmail}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #8b949e; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid rgba(255,255,255,0.05);">Subject</td>
                  <td style="padding: 10px 0; color: #ffffff; font-weight: 600; border-bottom: 1px solid rgba(255,255,255,0.05);">${safeSubject}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #8b949e; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid rgba(255,255,255,0.05);">Language</td>
                  <td style="padding: 10px 0; color: #d2d7df; border-bottom: 1px solid rgba(255,255,255,0.05);">${langLabel}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #8b949e; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Received At</td>
                  <td style="padding: 10px 0; color: #8b949e; font-size: 13px;">${escapeHtml(timeStr)}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Box -->
          <tr>
            <td style="padding: 16px 40px 32px;">
              <div style="font-size: 11px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #f0b31c; margin-bottom: 10px;">
                MESSAGE BODY
              </div>
              <div style="background-color: #181c20; border-left: 3px solid #f0b31c; border-radius: 6px; padding: 22px 24px; font-size: 15px; line-height: 1.7; color: #ffffff; word-break: break-word;">
                ${safeMessage}
              </div>
            </td>
          </tr>

          <!-- 1-Click Reply Action Button -->
          <tr>
            <td style="padding: 0 40px 40px;" align="center">
              <a href="mailto:${safeEmail}?subject=Re:%20${encodeURIComponent(data.subject || "Your inquiry with Nothing Advertising Agency")}" style="display: inline-block; background-color: #f0b31c; color: #121518; font-weight: 800; font-size: 14px; text-decoration: none; padding: 15px 32px; border-radius: 6px; letter-spacing: 1px; text-transform: uppercase; box-shadow: 0 6px 20px rgba(240,179,28,0.35);">
                Reply to ${safeName} &rarr;
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #0d0f11; border-top: 1px solid rgba(255,255,255,0.06); text-align: center; font-size: 12px; color: #6b7280; line-height: 1.6;">
              <strong style="color: #9ca3af;">Nothing Advertising Agency</strong><br/>
              Internal Lead Notification System • 2 Almaza / Al-Thawra Main Street, Cairo, Egypt
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
 * Editorial, Luxury Brand Confirmation Email for the Client/Lead
 */
export function buildUserConfirmationEmail(data: LeadData): { subject: string; html: string; text: string } {
  const isAr = data.lang === "ar";
  const safeName = escapeHtml(data.name.trim());
  const safeSubject = escapeHtml((data.subject || (isAr ? "استفسار عام" : "General Inquiry")).trim());
  const safeMessage = escapeHtml(data.message.trim()).replace(/\n/g, "<br/>");
  const refCode = `NTG-${Math.abs(Date.now() % 1000000).toString().padStart(6, "0")}`;

  const emailSubject = isAr
    ? `استلمنا رسالتك بنجاح — Nothing Advertising Agency`
    : `We received your message — Nothing Advertising Agency`;

  const text = isAr
    ? `
NOTHING ADVERTISING AGENCY
===========================
كل شيء يبدأ من اللاشيء.

أهلاً ${data.name}،

شكراً لبدء المحادثة معنا. لقد تم استلام استفسارك بنجاح وفريقنا الإبداعي يراجع التفاصيل حالياً.

في Nothing Agency، لا نؤمن بلحظات التجلي أو الصدف. نحن نبني العلامات التجارية والحملات المؤثرة من الصفر المطلق وفق منهجية واضحة وتفكير نقدي صارم.

تفاصيل رسالتك:
رقم المرجع: #${refCode}
الموضوع: ${data.subject || "استفسار عام"}
الرسالة:
${data.message}

الخطوات التالية:
يقوم أحد مسؤولي الاستراتيجية أو الإدارة الإبداعية بالرد عليك خلال 24 ساعة عمل.

إذا كان مشروعك عاجلاً وترغب في بدء العمل فوراً:
واتساب مباشر: +20 100 010 8068
هاتف الاستوديو: +20 12 73890104
البريد الإلكتروني: info@nothing-ads.com
الموقع الإلكتروني: https://nothing-agency.com

مع خالص التقدير،
فريق Nothing Advertising Agency
القاهرة، مصر
`.trim()
    : `
NOTHING ADVERTISING AGENCY
===========================
Everything starts as nothing.

Hello ${data.name},

Thank you for starting the conversation with Nothing Agency. We have received your inquiry and our creative team is already diving into your brief.

At Nothing Agency, we don't wait for sudden inspiration. We engineer brand identities, market-dominating campaigns, and digital experiences from zero, step by step, with a rigorous, logical process.

Your Inquiry Summary:
Reference: #${refCode}
Subject: ${data.subject || "General Inquiry"}
Message:
${data.message}

What Happens Next:
A senior creative director or brand strategist will review your inquiry and follow up within 24 business hours.

Have an urgent project? Reach our directors directly:
WhatsApp Line: +20 100 010 8068
Studio Phone: +20 12 73890104
Email: info@nothing-ads.com
Website: https://nothing-agency.com

Best regards,
Nothing Advertising Agency
Cairo, Egypt
`.trim();

  const html = `
<!DOCTYPE html>
<html lang="${isAr ? "ar" : "en"}" dir="${isAr ? "rtl" : "ltr"}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(emailSubject)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0d0f; font-family: ${isAr ? "'Noto Kufi Arabic', -apple-system, BlinkMacSystemFont, Tahoma, Arial, sans-serif" : "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"}; color: #d2d7df; direction: ${isAr ? "rtl" : "ltr"}; text-align: ${isAr ? "right" : "left"}; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #0b0d0f; padding: 40px 15px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" style="max-width: 620px; background-color: #121518; border: 1px solid rgba(240, 179, 28, 0.4); border-radius: 12px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.7);">
          
          <!-- Top Accent Gold Line -->
          <tr>
            <td style="height: 3px; background: linear-gradient(90deg, #f0b31c 0%, #ffd066 50%, #f0b31c 100%);"></td>
          </tr>

          <!-- Header with High-Resolution Brand Logo -->
          <tr>
            <td style="padding: 38px 42px 28px; background: linear-gradient(180deg, #171b1f 0%, #121518 100%); border-bottom: 1px solid rgba(255,255,255,0.07);">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="${isAr ? "right" : "left"}">
                    <!-- Embedded Brand Logo (Crisp Yellow Tight Wordmark) -->
                    <img src="cid:nothing-logo" alt="NOTHING ADVERTISING AGENCY" width="190" height="51" style="display: block; width: 190px; max-width: 190px; height: auto; border: 0; outline: none;" />
                  </td>
                  <td align="${isAr ? "left" : "right"}" style="vertical-align: middle;">
                    <span style="display: inline-block; font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #8b949e; font-family: monospace;">
                      REF: #${refCode}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Hero Headline & Core Message -->
          <tr>
            <td style="padding: 38px 42px 20px;">
              
              <!-- Subtle Category Eyebrow -->
              <div style="font-size: 11px; font-weight: 800; letter-spacing: 2.5px; text-transform: uppercase; color: #f0b31c; margin-bottom: 14px;">
                ${isAr ? "وكالة إعلانية تصنع التأثير من الصفر" : "CREATORS OF IMPACT • BUILT FROM ZERO"}
              </div>

              <!-- Main Statement Headline -->
              <h1 style="margin: 0 0 22px; font-size: 26px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px; line-height: ${isAr ? "1.4" : "1.25"};">
                ${isAr ? "كل شيء يبدأ من اللاشيء." : "&ldquo;Everything starts as nothing.&rdquo;"}
              </h1>

              <!-- Warm, Confident Salutation -->
              <p style="margin: 0 0 16px; font-size: 16px; font-weight: 600; color: #f0b31c;">
                ${isAr ? `أهلاً ${safeName}،` : `Hello ${safeName},`}
              </p>

              <p style="margin: 0 0 18px; font-size: 15px; line-height: 1.75; color: #e5e7eb;">
                ${
                  isAr
                    ? `شكراً لبدء المحادثة معنا في <strong>Nothing Agency</strong>. لقد استلمنا رسالتك بنجاح، وفريقنا يراجع تفاصيل طلبك حالياً.`
                    : `Thank you for starting the conversation with <strong>Nothing Agency</strong>. We have received your inquiry and our creative directors are currently reviewing your brief.`
                }
              </p>

              <p style="margin: 0 0 28px; font-size: 14px; line-height: 1.75; color: #9ca3af;">
                ${
                  isAr
                    ? `نحن لا ننتظر الإلهام ليأتي صدفة، بل نؤمن بأن الإبداع عملية منهجية صارمة تبدأ بتحليل السوق وتنتهي ببناء حملات وهوية بصرية تسيطر على المنافسة. فريقنا يتواصل معك خلال <strong>24 ساعة عمل</strong>.`
                    : `We don't wait for sudden inspiration — we engineer brand identities, marketing campaigns, and digital platforms from ground zero with rigorous critical thinking and market data. Our team will get back to you within <strong>24 business hours</strong>.`
                }
              </p>

              <!-- Client Brief Card (Receipt & Record) -->
              <div style="background-color: #171b1f; border-left: ${isAr ? "none" : "3px solid #f0b31c"}; border-right: ${isAr ? "3px solid #f0b31c" : "none"}; border-radius: 8px; padding: 22px 24px; margin-bottom: 30px; box-shadow: inset 0 1px 3px rgba(0,0,0,0.4);">
                <div style="font-size: 11px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #f0b31c; margin-bottom: 12px;">
                  ${isAr ? "تفاصيل استفسارك المُرسل" : "YOUR SUBMITTED BRIEF"}
                </div>
                <div style="font-size: 13px; color: #8b949e; margin-bottom: 8px;">
                  <strong style="color: #ffffff;">${isAr ? "الموضوع:" : "Subject:"}</strong> ${safeSubject}
                </div>
                <div style="font-size: 14px; color: #d2d7df; line-height: 1.7; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 12px; font-style: italic;">
                  &ldquo;${safeMessage}&rdquo;
                </div>
              </div>

              <!-- 3-Step Process Tracker -->
              <div style="background-color: #15181b; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 20px 24px; margin-bottom: 30px;">
                <div style="font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; color: #8b949e; margin-bottom: 14px;">
                  ${isAr ? "مسار العمل التالي:" : "WHAT HAPPENS NEXT:"}
                </div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size: 13px;">
                  <tr>
                    <td style="padding: 6px 0; color: #f0b31c; font-weight: 600;">
                      <span style="display: inline-block; width: 18px; text-align: center;">✓</span> ${isAr ? "تم استلام الطلب وتوثيق البيانات" : "Inquiry Received & Logged"}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #ffffff; font-weight: 600;">
                      <span style="display: inline-block; width: 18px; text-align: center; color: #f0b31c;">●</span> ${isAr ? "المراجعة الاستراتيجية ودراسة المتطلبات (جارية الآن)" : "Strategic Review & Brief Analysis (In Progress)"}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #8b949e;">
                      <span style="display: inline-block; width: 18px; text-align: center;">○</span> ${isAr ? "التواصل المباشر لمناقشة خطة العمل (< 24 ساعة)" : "Direct Response & Action Plan (< 24 Hours)"}
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Urgent Direct Communication Channels -->
              <div style="background: rgba(240,179,28,0.04); border: 1px solid rgba(240,179,28,0.25); border-radius: 8px; padding: 20px 24px;">
                <div style="font-size: 12px; font-weight: 700; color: #f0b31c; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 10px;">
                  ${isAr ? "هل لديك مشروع عاجل؟ تواصل مع الاستوديو مباشرة:" : "HAVE AN URGENT PROJECT? CONNECT DIRECTLY:"}
                </div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size: 13px; line-height: 1.8;">
                  <tr>
                    <td style="padding: 3px 0; color: #d2d7df;">
                      WhatsApp: <a href="https://wa.me/201000108068" style="color: #f0b31c; text-decoration: none; font-weight: 700;" dir="ltr">+20 100 010 8068</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 3px 0; color: #d2d7df;">
                      Call Studio: <a href="tel:+201273890104" style="color: #ffffff; text-decoration: none; font-weight: 600;" dir="ltr">+20 12 73890104</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 3px 0; color: #d2d7df;">
                      Email: <a href="mailto:info@nothing-ads.com" style="color: #ffffff; text-decoration: none; font-weight: 600;">info@nothing-ads.com</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 3px 0; color: #8b949e; font-size: 12px;">
                      Studio: 2 Almaza / Al-Thawra Main Street, Office 1, Cairo, Egypt
                    </td>
                  </tr>
                </table>
              </div>

            </td>
          </tr>

          <!-- Explore Work CTA -->
          <tr>
            <td style="padding: 10px 42px 42px;" align="center">
              <a href="https://nothing-agency.com" style="display: inline-block; background-color: #f0b31c; color: #121518; font-weight: 800; font-size: 13px; text-decoration: none; padding: 14px 32px; border-radius: 6px; letter-spacing: 1px; text-transform: uppercase; box-shadow: 0 4px 16px rgba(240,179,28,0.3);">
                ${isAr ? "استكشف أعمالنا على الموقع &larr;" : "Explore Our Work &rarr;"}
              </a>
            </td>
          </tr>

          <!-- Footer Signature -->
          <tr>
            <td style="padding: 28px 42px; background-color: #0d0f11; border-top: 1px solid rgba(255,255,255,0.06); text-align: center; font-size: 12px; color: #6b7280; line-height: 1.6;">
              <strong style="color: #d2d7df; font-size: 13px; letter-spacing: 1px;">NOTHING ADVERTISING AGENCY</strong><br/>
              Where bold ideas meet systematic creative execution.<br/>
              <span style="color: #4b5563; display: block; margin-top: 8px;">
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
