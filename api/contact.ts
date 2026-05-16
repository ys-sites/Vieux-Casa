import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, email, date, time, guests, eventType, requests, lang } = req.body;

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px;">
      <h2 style="color:#112330;margin-bottom:24px;">New Reservation Inquiry – Vieux Casa</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr style="border-bottom:1px solid #f0ebe1;"><td style="padding:10px 0;color:#6b7280;width:40%;">Full Name</td><td style="padding:10px 0;font-weight:600;color:#112330;">${name}</td></tr>
        <tr style="border-bottom:1px solid #f0ebe1;"><td style="padding:10px 0;color:#6b7280;">Phone</td><td style="padding:10px 0;font-weight:600;color:#112330;">${phone}</td></tr>
        <tr style="border-bottom:1px solid #f0ebe1;"><td style="padding:10px 0;color:#6b7280;">Email</td><td style="padding:10px 0;font-weight:600;color:#112330;">${email}</td></tr>
        <tr style="border-bottom:1px solid #f0ebe1;"><td style="padding:10px 0;color:#6b7280;">Date</td><td style="padding:10px 0;font-weight:600;color:#112330;">${date}</td></tr>
        <tr style="border-bottom:1px solid #f0ebe1;"><td style="padding:10px 0;color:#6b7280;">Time</td><td style="padding:10px 0;font-weight:600;color:#112330;">${time}</td></tr>
        <tr style="border-bottom:1px solid #f0ebe1;"><td style="padding:10px 0;color:#6b7280;">Guests</td><td style="padding:10px 0;font-weight:600;color:#112330;">${guests}</td></tr>
        <tr style="border-bottom:1px solid #f0ebe1;"><td style="padding:10px 0;color:#6b7280;">Event Type</td><td style="padding:10px 0;font-weight:600;color:#112330;">${eventType}</td></tr>
        <tr><td style="padding:10px 0;color:#6b7280;">Special Requests</td><td style="padding:10px 0;color:#112330;">${requests || '—'}</td></tr>
      </table>
      <p style="margin-top:24px;color:#6b7280;font-size:13px;">Language: ${lang === 'fr' ? 'French' : 'English'} · Sent from vieuxcasa.com</p>
    </div>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Vieux Casa <onboarding@resend.dev>',
        to: ['restoredinmtl@gmail.com'],
        subject: `New Reservation Inquiry – ${name}`,
        html,
      }),
    });

    if (response.ok) {
      return res.status(200).json({ success: true });
    }

    const err = await response.json();
    console.error('Resend error:', err);
    return res.status(500).json({ success: false });
  } catch (err) {
    console.error('Contact handler error:', err);
    return res.status(500).json({ success: false });
  }
}
