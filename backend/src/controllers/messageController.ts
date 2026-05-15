import { Request, Response } from 'express';
import { Message } from '../models/Message';
import { sendContactEmail } from '../utils/mailer';

export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find({}).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required.' });
    }

    // 1. Save to DB
    const saved = await Message.create({ name, email, subject: subject || 'No Subject', message });
    console.log(`[MESSAGE] Saved to DB: ${saved._id}`);

    // 2. Send email — awaited so errors are visible in logs
    try {
      await sendContactEmail({
        senderName:  name,
        senderEmail: email,
        subject:     subject || 'No Subject',
        message,
      });
      console.log('[MESSAGE] Emails sent successfully.');
      return res.status(201).json({ ...saved.toObject(), emailSent: true });
    } catch (emailErr: any) {
      // DB save succeeded — still return 201 but flag email failure
      console.error('[MESSAGE] Email failed (DB save was OK):', emailErr.message);
      return res.status(201).json({ ...saved.toObject(), emailSent: false, emailError: emailErr.message });
    }

  } catch (error: any) {
    console.error('[MESSAGE] createMessage error:', error.message);
    return res.status(400).json({ message: 'Invalid data', error: error.message });
  }
};

export const markMessageRead = async (req: Request, res: Response) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    if (!message) return res.status(404).json({ message: 'Message not found' });
    res.json(message);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ message: 'Message not found' });
    res.json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// ─── Test email route (GET /api/messages/test-email) ─────────────────────────
export const testEmail = async (req: Request, res: Response) => {
  try {
    await sendContactEmail({
      senderName:  'Test User',
      senderEmail: process.env.EMAIL_TO as string,
      subject:     'SMTP Test',
      message:     'This is a test email from your portfolio backend. If you see this, Nodemailer is working correctly!',
    });
    res.json({ success: true, message: 'Test email sent! Check your inbox.' });
  } catch (err: any) {
    console.error('[TEST-EMAIL]', err);
    res.status(500).json({ success: false, message: err.message });
  }
};
