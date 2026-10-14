import { list } from '@vercel/blob';

// Entrega la propuesta más reciente guardada en Vercel Blob (carpeta "propuesta/").
// Si no hay Blob configurado o está vacío, usa el PDF estático del repositorio.
const FALLBACK = '/assets/Propuesta-Sol-Travel-Wigilabs.pdf';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { blobs } = await list({ prefix: 'propuesta/' });
      const pdfs = blobs.filter(b => b.pathname.toLowerCase().endsWith('.pdf'));
      if (pdfs.length) {
        pdfs.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
        return res.redirect(302, pdfs[0].downloadUrl);
      }
    }
  } catch (e) {
    console.error('Blob no disponible:', e.message);
  }
  return res.redirect(302, FALLBACK);
}
