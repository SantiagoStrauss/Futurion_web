import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

export const runtime = 'edge'

const resend = new Resend(process.env.RESEND_API_KEY)
// Usa dominio verificado; configurable vía env. Fallback seguro a onboarding si falta
const FROM_EMAIL = process.env.RESEND_FROM || 'Contacto Futurion <contacto@futurionpartners.co>'

const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  company: z.string().optional().nullable(),
  service: z.string().optional().nullable(),
  message: z.string().min(5)
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = ContactSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Datos inválidos', details: parsed.error.flatten() }, { status: 400 })
    }

    const data = parsed.data

    const esc = (v:string | null | undefined) =>
      (v || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c] as string))

    const html = `<!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charSet="UTF-8" />
      <title>Nuevo mensaje de contacto</title>
      <style>
        body { font-family: system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif; background:#f5f6f8; margin:0; padding:0; }
        .wrapper { padding:32px 0; }
        .container { max-width:620px; margin:0 auto; background:#ffffff; border-radius:14px; overflow:hidden; box-shadow:0 4px 18px -2px rgba(0,0,0,0.08); border:1px solid #eceef1; }
        .header { background:linear-gradient(135deg,#111111,#2a2a2a); padding:28px 36px; color:#fff; }
        .brand { font-size:20px; letter-spacing:.5px; margin:0; font-weight:500; font-family:Georgia,'Times New Roman',serif; }
        .title { margin:24px 0 8px; font-size:22px; font-weight:500; }
        .meta { font-size:13px; color:#94a3b8; margin:0 0 4px; }
        .content { padding:8px 36px 36px; color:#1e293b; }
        .block { margin-bottom:18px; }
        .label { font-size:12px; text-transform:uppercase; letter-spacing:.5px; color:#6b7280; margin:0 0 4px; font-weight:600; }
        .value { font-size:15px; margin:0; line-height:1.5; color:#111827; }
        .pill { display:inline-block; background:#A51C30; color:#fff; padding:4px 10px; font-size:11px; border-radius:999px; letter-spacing:.5px; font-weight:600; }
        .message-box { background:#f8fafc; border:1px solid #e2e8f0; padding:18px 20px; border-radius:10px; font-size:15px; line-height:1.55; white-space:pre-wrap; }
        .footer { padding:22px 36px; background:#f1f5f9; font-size:12px; color:#64748b; text-align:center; }
        a { color:#A51C30; text-decoration:none; }
        @media (max-width:640px){ .content, .header, .footer { padding-left:22px; padding-right:22px; } }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          <div class="header">
            <p class="brand">Futurion Partners</p>
            <p class="meta">Nuevo mensaje de contacto del sitio web</p>
            <p class="title">${esc(data.name)} <span class="pill">Nuevo</span></p>
          </div>
          <div class="content">
            <div class="block">
              <p class="label">Nombre</p>
              <p class="value">${esc(data.name)}</p>
            </div>
            <div class="block">
              <p class="label">Email</p>
              <p class="value"><a href="mailto:${esc(data.email)}">${esc(data.email)}</a></p>
            </div>
            ${data.phone ? `<div class="block"><p class="label">Teléfono</p><p class="value"><a href="tel:${esc(data.phone)}">${esc(data.phone)}</a></p></div>` : ''}
            ${data.company ? `<div class="block"><p class="label">Empresa</p><p class="value">${esc(data.company)}</p></div>` : ''}
            ${data.service ? `<div class="block"><p class="label">Servicio de interés</p><p class="value">${esc(data.service)}</p></div>` : ''}
            <div class="block">
              <p class="label">Mensaje</p>
              <div class="message-box">${esc(data.message)}</div>
            </div>
          </div>
          <div class="footer">
            Recibiste este correo porque alguien envió el formulario de contacto. Responde directamente para continuar la conversación.
          </div>
        </div>
      </div>
    </body>
    </html>`

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: [process.env.RESEND_TO || 'ds.ramosv@globusscreen.com'],
      replyTo: data.email,
      subject: `Nuevo mensaje de contacto: ${data.name}`,
      html
    })

    if (result.error) {
      console.error(result.error)
      const msg = (result.error as any)?.message || 'Error enviando el correo'
      // Caso común: dominio no verificado (403)
      if (/domain/i.test(msg) || /not verified/i.test(msg)) {
        return NextResponse.json({ error: 'Dominio no verificado. Configura y verifica el dominio en Resend o usa temporalmente onboarding@resend.dev.' }, { status: 403 })
      }
      return NextResponse.json({ error: msg }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
