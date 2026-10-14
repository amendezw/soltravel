// Uso: BLOB_READ_WRITE_TOKEN=xxxx node scripts/subir-propuesta.mjs ruta/al/archivo.pdf
import { put } from '@vercel/blob';
import { readFile } from 'node:fs/promises';
import { basename } from 'node:path';

const file = process.argv[2] || 'assets/Propuesta-Sol-Travel-Wigilabs.pdf';
const data = await readFile(file);
const blob = await put('propuesta/' + basename(file), data, {
  access: 'public',
  contentType: 'application/pdf',
  addRandomSuffix: true,
});
console.log('Propuesta subida:', blob.url);
