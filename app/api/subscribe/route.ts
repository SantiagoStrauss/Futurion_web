import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

export const runtime = 'edge'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM_EMAIL = process.env.RESEND_FROM || 'Contacto Futurion <onboarding@resend.dev>'
const TO_EMAIL = process.env.RESEND_SUBSCRIBE_TO || process.env.RESEND_TO || 'ds.ramosv@globusscreen.com'

const SubscribeSchema = z.object({
  email: z.string().email()
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = SubscribeSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
    }

    const { email } = parsed.data

    const html = `<!DOCTYPE html><html lang="es"><head><meta charSet="UTF-8" /><title>Nueva suscripción</title></head><body style="font-family:Arial,Helvetica,sans-serif;background:#f5f6f8;padding:32px;">
      <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:32px;">
        <h2 style="margin:0 0 12px;font-weight:500;font-family:Georgia,serif;color:#111;">Nueva suscripción al newsletter</h2>
        <p style="margin:0 0 16px;color:#374151;font-size:15px;">Un usuario se ha suscrito con este correo:</p>
        <p style="background:#111;color:#fff;display:inline-block;padding:10px 16px;border-radius:8px;font-size:14px;letter-spacing:.5px;">${email}</p>
        <p style="margin-top:28px;font-size:12px;color:#6b7280;">Añádelo a tu lista de contactos si procede.</p>
      </div>
    </body></html>`

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      subject: 'Nueva suscripción al newsletter',
      html
    })

    if (result.error) {
      console.error(result.error)
      return NextResponse.json({ error: 'Error enviando correo' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
