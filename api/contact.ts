import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, email, date, time, guests, eventType, requests, lang } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'restoredinmtl@gmail.com',
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px;">
      <h2 style="color:#112330;margin-bottom:4px;">New Reservation Inquiry</h2>
      <p style="color:#b28e57;margin-top:0;margin-bottom:24px;font-size:13px;">Vieux Casa · vieuxcasa.com</p>
      <table style="width:100%;border-collapse:collapse;font-size:15px;">
        <tr style="border-bottom:1px solid #f0ebe1;">
          <td style="padding:10px 0;color:#6b7280;width:40%;">Full Name</td>
          <td style="padding:10px 0;font-weight:600;color:#112330;">${name}</td>
        </tr>
        <tr style="border-bottom:1px solid #f0ebe1;">
          <td style="padding:10px 0;color:#6b7280;">Phone</td>
          <td style="padding:10px 0;font-weight:600;color:#112330;">${phone}</td>
        </tr>
        <tr style="border-bottom:1px solid #f0ebe1;">
          <td style="padding:10px 0;color:#6b7280;">Email</td>
          <td style="padding:10px 0;font-weight:600;color:#112330;">${email}</td>
        </tr>
        <tr style="border-bottom:1px solid #f0ebe1;">
          <td style="padding:10px 0;color:#6b7280;">Date</td>
          <td style="padding:10px 0;font-weight:600;color:#112330;">${date}</td>
        </tr>
        <tr style="border-bottom:1px solid #f0ebe1;">
          <td style="padding:10px 0;color:#6b7280;">Time</td>
          <td style="padding:10px 0;font-weight:600;color:#112330;">${time}</td>
        </tr>
        <tr style="border-bottom:1px solid #f0ebe1;">
          <td style="padding:10px 0;color:#6b7280;">Guests</td>
          <td style="padding:10px 0;font-weight:600;color:#112330;">${guests}</td>
        </tr>
        <tr style="border-bottom:1px solid #f0ebe1;">
          <td style="padding:10px 0;color:#6b7280;">Event Type</td>
          <td style="padding:10px 0;font-weight:600;color:#112330;">${eventType}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;color:#6b7280;">Special Requests</td>
          <td style="padding:10px 0;color:#112330;">${requests || '—'}</td>
        </tr>
      </table>
      <p style="margin-top:24px;padding-top:16px;border-top:1px solid #f0ebe1;color:#9ca3af;font-size:12px;">
        Language: ${lang === 'fr' ? 'French' : 'English'}
      </p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Vieux Casa Website" <restoredinmtl@gmail.com>`,
      to: 'restoredinmtl@gmail.com',
      replyTo: email,
      subject: `New Reservation – ${name} (${eventType})`,
      html,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Email error:', err);
    return res.status(500).json({ success: false });
  }
}
