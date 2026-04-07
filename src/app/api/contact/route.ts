import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { contactSchema } from '@/lib/validations';

// Server-side Supabase client — uses service role key if available, falls back to anon key
function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // Use service role key for full access, fallback to anon key (works for INSERT with RLS policy)
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !key) {
    throw new Error('Missing Supabase environment variables');
  }

  return createClient(supabaseUrl, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const locale = request.headers.get('x-locale') || 'fr';

    // Validate input
    const validation = contactSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const { terms: _terms, ...formData } = validation.data;

    // Save to Supabase
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          ...formData,
          locale,
          status: 'new',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      // Still return success to user — log internally
      // We don't want to block the form if DB is unavailable
    }

    // Send email notification (Resend)
    const adminEmail = process.env.ADMIN_EMAIL;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey && adminEmail) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: 'Montreal Concierge Services <noreply@montrealconciergeservices.com>',
            to: [adminEmail],
            subject: `🔔 Nouvelle soumission — ${formData.service_type} (${formData.name})`,
            html: buildAdminEmailHtml(formData, locale),
          }),
        });

        // Auto-reply to client
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: 'Montreal Concierge Services <info@montrealconciergeservices.com>',
            to: [formData.email],
            subject: locale === 'fr'
              ? 'Votre soumission a bien été reçue — Montreal Concierge Services'
              : 'Your quote request has been received — Montreal Concierge Services',
            html: buildClientEmailHtml(formData, locale),
          }),
        });
      } catch (emailError) {
        console.error('Email send error:', emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json(
      { success: true, id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function buildAdminEmailHtml(data: Record<string, string>, locale: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
  body { font-family: Arial, sans-serif; color: #1e293b; }
  .header { background: #1e40af; color: white; padding: 20px 30px; }
  .content { padding: 30px; }
  .field { margin-bottom: 16px; }
  .label { font-size: 11px; font-weight: bold; text-transform: uppercase; color: #64748b; }
  .value { font-size: 15px; color: #1e293b; margin-top: 4px; }
  .badge { display: inline-block; background: #fef9c3; color: #854d0e; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: bold; }
  .cta { background: #1e40af; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block; margin-top: 20px; }
  hr { border: none; border-top: 1px solid #e2e8f0; margin: 20px 0; }
</style></head>
<body>
<div class="header">
  <h2 style="margin:0">🔔 Nouvelle soumission reçue</h2>
  <p style="margin:4px 0 0;opacity:0.8">Montreal Concierge Services</p>
</div>
<div class="content">
  <span class="badge">⚡ Répondre dans les 60 minutes</span>
  <hr>
  <div class="field"><div class="label">Nom</div><div class="value">${data.name}</div></div>
  <div class="field"><div class="label">Courriel</div><div class="value"><a href="mailto:${data.email}">${data.email}</a></div></div>
  <div class="field"><div class="label">Téléphone</div><div class="value"><a href="tel:${data.phone}">${data.phone}</a></div></div>
  <div class="field"><div class="label">Service demandé</div><div class="value">${data.service_type}</div></div>
  <div class="field"><div class="label">Zone</div><div class="value">${data.location}</div></div>
  <div class="field"><div class="label">Budget</div><div class="value">${data.budget}</div></div>
  <div class="field"><div class="label">Urgence</div><div class="value">${data.urgency}</div></div>
  <div class="field"><div class="label">Langue</div><div class="value">${locale.toUpperCase()}</div></div>
  <hr>
  <div class="field"><div class="label">Description des besoins</div><div class="value" style="background:#f8fafc;padding:12px;border-radius:8px;border:1px solid #e2e8f0">${data.description}</div></div>
  <a href="mailto:${data.email}" class="cta">Répondre au client</a>
</div>
</body>
</html>`;
}

function buildClientEmailHtml(data: Record<string, string>, locale: string): string {
  const isFr = locale === 'fr';
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
  body { font-family: Arial, sans-serif; color: #1e293b; margin: 0; }
  .header { background: linear-gradient(135deg, #1e40af, #1e3a8a); color: white; padding: 40px 30px; text-align: center; }
  .content { padding: 30px; max-width: 600px; margin: 0 auto; }
  .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 20px 0; }
  .green { color: #16a34a; font-weight: bold; }
  .footer { background: #0f172a; color: #94a3b8; padding: 20px; text-align: center; font-size: 12px; }
</style></head>
<body>
<div class="header">
  <div style="font-size:40px;margin-bottom:10px">✅</div>
  <h1 style="margin:0;font-size:24px">${isFr ? 'Demande bien reçue!' : 'Request received!'}</h1>
  <p style="margin:8px 0 0;opacity:0.85">${isFr ? 'Nous vous contacterons dans les 60 minutes.' : 'We\'ll contact you within 60 minutes.'}</p>
</div>
<div class="content">
  <p>${isFr ? `Bonjour <strong>${data.name}</strong>,` : `Hello <strong>${data.name}</strong>,`}</p>
  <p>${isFr
    ? 'Merci pour votre demande de soumission. Notre équipe l\'a bien reçue et vous contactera très bientôt.'
    : 'Thank you for your quote request. Our team has received it and will contact you very soon.'}</p>

  <div class="card">
    <p style="margin:0 0 10px;font-weight:bold;color:#1e40af">${isFr ? '📋 Résumé de votre demande' : '📋 Request Summary'}</p>
    <p style="margin:4px 0"><strong>${isFr ? 'Service:' : 'Service:'}</strong> ${data.service_type}</p>
    <p style="margin:4px 0"><strong>${isFr ? 'Zone:' : 'Area:'}</strong> ${data.location}</p>
    <p style="margin:4px 0"><strong>${isFr ? 'Budget:' : 'Budget:'}</strong> ${data.budget}</p>
    <p style="margin:4px 0"><strong>${isFr ? 'Urgence:' : 'Timeline:'}</strong> ${data.urgency}</p>
  </div>

  <div style="background:#fefce8;border:1px solid #fde047;border-radius:12px;padding:16px;margin:20px 0">
    <p style="margin:0"><span class="green">⏱ ${isFr ? 'Délai de réponse garanti:' : 'Guaranteed response time:'}</span> ${isFr ? '60 minutes pendant les heures d\'ouverture.' : '60 minutes during business hours.'}</p>
  </div>

  <p>${isFr
    ? 'En attendant, n\'hésitez pas à nous appeler directement:'
    : 'In the meantime, feel free to call us directly:'}</p>
  <p style="font-size:20px;font-weight:bold;color:#1e40af">📞 +1 (514) 000-0000</p>

  <p style="color:#64748b;font-size:13px">${isFr ? 'Cordialement,' : 'Best regards,'}<br><strong>L\'équipe Montreal Concierge Services</strong></p>
</div>
<div class="footer">
  <p>© ${new Date().getFullYear()} Montreal Concierge Services — montrealconciergeservices.com</p>
</div>
</body>
</html>`;
}
