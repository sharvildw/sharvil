import { Resend } from 'resend';

// ─── Validate env vars at startup ────────────────────────────────────────────
const validateEnv = (): boolean => {
  const required = ['RESEND_API_KEY', 'EMAIL_FROM', 'EMAIL_TO'];
  const missing = required.filter(k => !process.env[k]);
  if (missing.length) {
    console.error(`[MAILER] ❌ Missing env vars: ${missing.join(', ')}`);
    return false;
  }
  return true;
};

// ─── Resend client (lazy init so env loads first) ────────────────────────────
const getResend = (): Resend => new Resend(process.env.RESEND_API_KEY as string);

// ─── Startup check (non-blocking, replaces verifyMailer) ─────────────────────
export const verifyMailer = async (): Promise<boolean> => {
  if (!validateEnv()) return false;
  // Resend is HTTP-based — no connection to verify; just confirm key present
  console.log(`[MAILER] ✅ Resend configured. FROM: ${process.env.EMAIL_FROM} → TO: ${process.env.EMAIL_TO}`);
  return true;
};

// ─── Notification email HTML ──────────────────────────────────────────────────
const buildNotificationHtml = (opts: {
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
}): string => `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:24px;background:#0a0f1e;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:600px;margin:auto;background:#0f172a;border-radius:16px;overflow:hidden;border:1px solid #1e293b;box-shadow:0 20px 60px rgba(0,0,0,0.5);">
    
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#3b82f6 0%,#6366f1 100%);padding:28px 36px;">
      <div style="display:flex;align-items:center;gap:12px;">
        <div style="width:40px;height:40px;background:rgba(255,255,255,0.2);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;">✉️</div>
        <div>
          <h1 style="margin:0;color:#fff;font-size:18px;font-weight:700;letter-spacing:0.3px;">New Portfolio Message</h1>
          <p style="margin:4px 0 0;color:rgba(255,255,255,0.75);font-size:13px;">via sharvil.vercel.app contact form</p>
        </div>
      </div>
    </div>

    <!-- Body -->
    <div style="padding:32px 36px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:10px 0;color:#64748b;font-size:12px;font-weight:600;letter-spacing:0.8px;text-transform:uppercase;width:80px;vertical-align:top;">FROM</td>
          <td style="padding:10px 0;color:#e2e8f0;font-size:15px;font-weight:600;">${opts.senderName}</td>
        </tr>
        <tr><td colspan="2" style="height:1px;background:#1e293b;padding:0;"></td></tr>
        <tr>
          <td style="padding:10px 0;color:#64748b;font-size:12px;font-weight:600;letter-spacing:0.8px;text-transform:uppercase;">EMAIL</td>
          <td style="padding:10px 0;"><a href="mailto:${opts.senderEmail}" style="color:#60a5fa;text-decoration:none;font-size:14px;">${opts.senderEmail}</a></td>
        </tr>
        <tr><td colspan="2" style="height:1px;background:#1e293b;padding:0;"></td></tr>
        <tr>
          <td style="padding:10px 0;color:#64748b;font-size:12px;font-weight:600;letter-spacing:0.8px;text-transform:uppercase;">SUBJECT</td>
          <td style="padding:10px 0;color:#e2e8f0;font-size:14px;font-weight:500;">${opts.subject}</td>
        </tr>
      </table>

      <!-- Message block -->
      <div style="margin-top:24px;padding:20px 24px;background:#1e293b;border-radius:12px;border-left:4px solid #3b82f6;">
        <p style="margin:0 0 8px;color:#64748b;font-size:11px;font-weight:600;letter-spacing:0.8px;text-transform:uppercase;">MESSAGE</p>
        <p style="margin:0;color:#cbd5e1;line-height:1.8;font-size:14px;white-space:pre-wrap;">${opts.message}</p>
      </div>

      <!-- Reply CTA -->
      <div style="margin-top:24px;text-align:center;">
        <a href="mailto:${opts.senderEmail}?subject=Re: ${encodeURIComponent(opts.subject)}"
           style="display:inline-block;padding:12px 28px;background:linear-gradient(135deg,#3b82f6,#6366f1);color:#fff;text-decoration:none;border-radius:8px;font-size:14px;font-weight:600;">
          Reply to ${opts.senderName}
        </a>
      </div>

      <p style="margin-top:28px;font-size:11px;color:#334155;text-align:center;">Sent via Resend · Portfolio Backend · Render</p>
    </div>
  </div>
</body>
</html>`;

// ─── Auto-reply HTML ──────────────────────────────────────────────────────────
const buildAutoReplyHtml = (opts: {
  senderName: string;
  subject: string;
  message: string;
}): string => `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:24px;background:#0a0f1e;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:600px;margin:auto;background:#0f172a;border-radius:16px;overflow:hidden;border:1px solid #1e293b;box-shadow:0 20px 60px rgba(0,0,0,0.5);">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%);padding:28px 36px;">
      <h1 style="margin:0;color:#fff;font-size:20px;font-weight:700;">Thanks for reaching out! 👋</h1>
      <p style="margin:6px 0 0;color:rgba(255,255,255,0.8);font-size:13px;">I'll get back to you within 24–48 hours.</p>
    </div>

    <!-- Body -->
    <div style="padding:32px 36px;">
      <p style="color:#e2e8f0;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Hi <strong style="color:#a78bfa;">${opts.senderName}</strong>,
      </p>
      <p style="color:#94a3b8;font-size:14px;line-height:1.8;margin:0 0 24px;">
        Thank you for your message about <strong style="color:#e2e8f0;">"${opts.subject}"</strong>.
        I've received it and will personally respond as soon as possible.
      </p>

      <!-- Message recap -->
      <div style="padding:20px 24px;background:#1e293b;border-radius:12px;border-left:4px solid #6366f1;margin-bottom:28px;">
        <p style="margin:0 0 8px;color:#64748b;font-size:11px;font-weight:600;letter-spacing:0.8px;text-transform:uppercase;">Your message</p>
        <p style="margin:0;color:#cbd5e1;line-height:1.8;font-size:13px;white-space:pre-wrap;">${opts.message}</p>
      </div>

      <!-- Social links -->
      <div style="text-align:center;margin-bottom:28px;">
        <p style="color:#64748b;font-size:13px;margin:0 0 12px;">In the meantime, feel free to explore:</p>
        <a href="https://github.com/sharvildw/sharvil"
           style="display:inline-block;margin:0 8px;padding:10px 20px;background:#1e293b;color:#60a5fa;text-decoration:none;border-radius:8px;font-size:13px;font-weight:600;border:1px solid #334155;">
          🐙 GitHub
        </a>
        <a href="https://www.linkedin.com/in/sharvilw"
           style="display:inline-block;margin:0 8px;padding:10px 20px;background:#1e293b;color:#60a5fa;text-decoration:none;border-radius:8px;font-size:13px;font-weight:600;border:1px solid #334155;">
          💼 LinkedIn
        </a>
      </div>

      <!-- Signature -->
      <div style="border-top:1px solid #1e293b;padding-top:24px;">
        <p style="margin:0;color:#e2e8f0;font-size:14px;font-weight:700;">Sharvil Waghmare</p>
        <p style="margin:4px 0 0;color:#64748b;font-size:12px;">Full-Stack Developer · React · Node.js · TypeScript</p>
        <a href="https://sharvil.vercel.app" style="color:#6366f1;font-size:12px;text-decoration:none;">🌐 sharvil.vercel.app</a>
      </div>

      <p style="margin-top:20px;font-size:11px;color:#334155;text-align:center;">You're receiving this because you submitted the contact form at sharvil.vercel.app</p>
    </div>
  </div>
</body>
</html>`;

// ─── Main send function ───────────────────────────────────────────────────────
export const sendContactEmail = async (opts: {
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
}): Promise<void> => {
  if (!validateEnv()) {
    throw new Error('Email env vars not configured. Check RESEND_API_KEY, EMAIL_FROM, EMAIL_TO in .env');
  }

  const resend = getResend();
  const fromAddress = process.env.EMAIL_FROM as string;
  const toAddress   = process.env.EMAIL_TO   as string;

  // ── 1. Notification email to portfolio owner ──────────────────────────────
  console.log(`[MAILER] ⏳ Sending notification to ${toAddress}...`);
  const { data: d1, error: e1 } = await resend.emails.send({
    from:    `Portfolio Contact <${fromAddress}>`,
    to:      [toAddress],
    replyTo: opts.senderEmail,
    subject: `📬 New Contact: ${opts.subject}`,
    html:    buildNotificationHtml(opts),
  });

  if (e1) {
    console.error(`[MAILER] ❌ Notification failed:`, JSON.stringify(e1));
    throw new Error(`Notification email failed: ${e1.message}`);
  }
  console.log(`[MAILER] ✅ Notification sent. ID: ${d1?.id}`);

  // ── 2. Auto-reply to the sender (non-fatal — sandbox may block external emails) ─
  console.log(`[MAILER] ⏳ Sending auto-reply to ${opts.senderEmail}...`);
  try {
    const { data: d2, error: e2 } = await resend.emails.send({
      from:    `Sharvil Waghmare <${fromAddress}>`,
      to:      [opts.senderEmail],
      subject: `Re: ${opts.subject} — Thanks for reaching out!`,
      html:    buildAutoReplyHtml(opts),
    });

    if (e2) {
      console.warn(`[MAILER] ⚠️ Auto-reply failed (sandbox restriction or invalid address): ${e2.message}`);
    } else {
      console.log(`[MAILER] ✅ Auto-reply sent. ID: ${d2?.id}`);
    }
  } catch (autoReplyErr: any) {
    console.warn(`[MAILER] ⚠️ Auto-reply exception (non-fatal): ${autoReplyErr.message}`);
  }
};
