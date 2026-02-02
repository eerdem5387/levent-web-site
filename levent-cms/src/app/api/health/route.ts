/**
 * Payload kullanmadan çalışır. Deploy'un ayakta olduğunu test etmek için:
 * GET https://levent-web-site.vercel.app/api/health
 */
export const dynamic = 'force-dynamic'
export async function GET() {
  return Response.json({ ok: true, env: process.env.VERCEL ? 'vercel' : 'local' })
}
