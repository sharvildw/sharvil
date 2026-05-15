import nodemailer from 'nodemailer';

// ─── Validate env vars at startup ────────────────────────────────────────────
const validateEnv = () => {
  const required = ['EMAIL_USER', 'EMAIL_PASS', 'EMAIL_TO'];
  const missing = required.filter(k => !process.env[k]);
  if (missing.length) {
    console.error(`[MAILER] ❌ Missing env vars: ${missing.join(', ')}`);
    return false;
  }
  return true;
};

// ─── Build a verified transporter ────────────────────────────────────────────
const buildTransporter = () => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',       // explicit host — more reliable than service:'gmail'
    port: 587,                    // STARTTLS port (preferred for Render)
    secure: false,                // false for port 587, true for 465
    requireTLS: true,             // Force TLS since secure is false
    auth: {
      user: process.env.EMAIL_USER as string,
      pass: process.env.EMAIL_PASS as string,  // 16-char Gmail App Password
    },
    tls: {
      rejectUnauthorized: false,  // handles self-signed cert issues in dev
    },
    // Production timeouts to prevent hanging on Render
    connectionTimeout: 10000,     // 10 seconds
    greetingTimeout: 10000,       // 10 seconds
    socketTimeout: 15000,         // 15 seconds
  });
  return transporter;
};

// ─── Verify SMTP connection ───────────────────────────────────────────────────
export const verifyMailer = async (): Promise<boolean> => {
  if (!validateEnv()) return false;
  
  console.log(`[MAILER] ⏳ Verifying SMTP connection to smtp.gmail.com...`);
  try {
    const transporter = buildTransporter();
    await transporter.verify();
    console.log(`[MAILER] ✅ SMTP connection verified (${process.env.EMAIL_USER})`);
    return true;
  } catch (err: any) {
    console.error(`[MAILER] ❌ SMTP verification failed: ${err.message}`);
    if (err.message.includes('timeout')) {
      console.error(`[MAILER] 💡 FIX: The connection timed out. Ensure Render allows outbound SMTP (port 465). Sometimes IPv6 causes issues. You might try port 587 with secure:false if 465 remains blocked.`);
    } else {
      console.error(`[MAILER] 💡 FIX: Ensure Gmail App Password is correct & 2FA is enabled.`);
    }
    return false;
  }
};

// ─── Notification email HTML ──────────────────────────────────────────────────
const buildNotificationHtml = (opts: {
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
}) => `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;background:#0f172a;color:#e2e8f0;border-radius:12px;overflow:hidden;">
  <div style="background:linear-gradient(135deg,#3b82f6,#6366f1);padding:24px 32px;">
    <h2 style="margin:0;color:#fff;font-size:20px;">New Portfolio Contact Message</h2>
  </div>
  <div style="padding:32px;">
    <table style="width:100%;border-collapse:collapse;">
      <tr>
        <td style="padding:8px 0;color:#94a3b8;font-size:13px;width:80px;vertical-align:top;">From</td>
        <td style="padding:8px 0;font-weight:600;">${opts.senderName}</td>
      </tr>
      <tr>
        <td style="padding:8px 0;color:#94a3b8;font-size:13px;">Email</td>
        <td style="padding:8px 0;"><a href="mailto:${opts.senderEmail}" style="color:#60a5fa;">${opts.senderEmail}</a></td>
      </tr>
      <tr>
        <td style="padding:8px 0;color:#94a3b8;font-size:13px;">Subject</td>
        <td style="padding:8px 0;font-weight:600;">${opts.subject}</td>
      </tr>
    </table>
    <div style="margin-top:20px;padding:20px;background:#1e293b;border-radius:10px;border-left:4px solid #3b82f6;">
      <p style="margin:0;line-height:1.7;white-space:pre-wrap;">${opts.message}</p>
    </div>
    <p style="margin-top:24px;font-size:12px;color:#64748b;">Received via portfolio contact form.</p>
  </div>
</div>`;

// ─── Auto-reply HTML ──────────────────────────────────────────────────────────
const buildAutoReplyHtml = (opts: {
  senderName: string;
  subject: string;
  message: string;
}) => `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;background:#0f172a;color:#e2e8f0;border-radius:12px;overflow:hidden;">
  <div style="background:linear-gradient(135deg,#3b82f6,#6366f1);padding:24px 32px;">
    <h2 style="margin:0;color:#fff;font-size:20px;">Thanks for reaching out!</h2>
  </div>
  <div style="padding:32px;">
    <p style="font-size:16px;line-height:1.7;">Hi <strong>${opts.senderName}</strong>,</p>
    <p style="color:#94a3b8;line-height:1.8;">
      Thank you for contacting me! I have received your message about
      <strong style="color:#e2e8f0;">"${opts.subject}"</strong>
      and will get back to you within 24-48 hours.
    </p>
    <div style="margin:24px 0;padding:20px;background:#1e293b;border-radius:10px;border-left:4px solid #6366f1;">
      <p style="margin:0;font-size:13px;color:#94a3b8;">Your message:</p>
      <p style="margin-top:8px;line-height:1.7;white-space:pre-wrap;">${opts.message}</p>
    </div>
    <p style="color:#94a3b8;line-height:1.8;">
      Check out my work on
      <a href="https://github.com/sharvildw" style="color:#60a5fa;">GitHub</a> or connect on
      <a href="https://www.linkedin.com/in/sharvilw" style="color:#60a5fa;">LinkedIn</a>.
    </p>
    <p style="margin-top:24px;">
      Best regards,<br/>
      <strong>Sharvil Waghmare</strong><br/>
      <span style="color:#64748b;font-size:13px;">Full-Stack Developer</span>
    </p>
  </div>
</div>`;

// ─── Main send function ───────────────────────────────────────────────────────
export const sendContactEmail = async (opts: {
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
}): Promise<void> => {
  if (!validateEnv()) {
    throw new Error('Email env vars not configured. Check EMAIL_USER, EMAIL_PASS, EMAIL_TO in .env');
  }

  const transporter = buildTransporter();

  try {
    console.log(`[MAILER] ⏳ Attempting to send notification to ${process.env.EMAIL_TO} ...`);
    
    // 1. Notification to portfolio owner
    const info1 = await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to:   process.env.EMAIL_TO,
      replyTo: opts.senderEmail,
      subject: `New Contact: ${opts.subject}`,
      html: buildNotificationHtml(opts),
    });
    console.log(`[MAILER] ✅ Notification sent successfully. MessageId: ${info1.messageId}`);

    // 2. Auto-reply to sender
    console.log(`[MAILER] ⏳ Attempting to send auto-reply to ${opts.senderEmail} ...`);
    const info2 = await transporter.sendMail({
      from:    `"Sharvil Waghmare" <${process.env.EMAIL_USER}>`,
      to:      opts.senderEmail,
      subject: `Re: ${opts.subject} - Thanks for reaching out!`,
      html:    buildAutoReplyHtml(opts),
    });
    console.log(`[MAILER] ✅ Auto-reply sent successfully. MessageId: ${info2.messageId}`);
    
  } catch (error: any) {
    console.error(`[MAILER] ❌ Failed to send email: ${error.message}`);
    throw new Error(`Email sending failed: ${error.message}`);
  }
};
