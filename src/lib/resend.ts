/**
 * Resend Email Service Stub
 *
 * This is a stub implementation for the Resend email service.
 * To use actual email functionality, install resend:
 * npm install resend
 *
 * Then replace this file with actual Resend implementation or
 * update the import to use a real service like SendGrid, Nodemailer, etc.
 */

interface Email {
  from: string;
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  [key: string]: any;
}

class ResendStub {
  emails = {
    send: async (email: Email) => {
      console.log('[RESEND STUB] Email would be sent:', {
        to: email.to,
        subject: email.subject,
        from: email.from,
      });
      return { id: `stub-${Date.now()}` };
    },
  };
}

export const resend = new ResendStub();
