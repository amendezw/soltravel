# Sol Travel × TOKA · Prototipo explicativo

Prototipo navegable del mini program de Sol Travel en TOKA y de su administrador web, con recorrido guiado, explicaciones por elemento y la propuesta comercial de Wigilabs.

## Estructura

| Ruta | Contenido |
|---|---|
| `index.html` | Plataforma explicativa (portada, tour, reglas, propuesta) |
| `MiniProgram.dc.html` | Mini program (se carga dentro del iPhone) |
| `Admin.dc.html` | Administrador web |
| `store.js` · `docs.js` | Datos simulados, reglas de negocio y textos del tour |
| `support.js` | Runtime de los componentes |
| `_ds/` | Wigi Design System (tokens y estilos) |
| `assets/` | Imágenes de paquetes, logos y PDF de respaldo |
| `api/propuesta.js` | Función que entrega la propuesta desde Vercel Blob |

## Publicar

1. Sube esta carpeta a un repositorio de GitHub.
2. En Vercel: **Add New → Project → Import** el repositorio.
   - Framework Preset: **Other**
   - Build Command: vacío · Output Directory: vacío (raíz)
3. Deploy.

## Propuesta en Vercel Blob

El botón «Descargar la propuesta» apunta a `/api/propuesta`, que entrega el PDF más reciente guardado en Vercel Blob dentro de la carpeta `propuesta/`. Si Blob no está configurado, entrega `assets/Propuesta-Sol-Travel-Wigilabs.pdf`.

1. Proyecto en Vercel → **Storage → Create → Blob** → conéctalo al proyecto (crea la variable `BLOB_READ_WRITE_TOKEN`).
2. Sube el PDF a la carpeta `propuesta/`:
   - Desde el panel: Storage → tu Blob store → **Upload**, con el nombre `propuesta/Propuesta-Sol-Travel.pdf`; o
   - Desde tu equipo: `npm install` y luego
     `BLOB_READ_WRITE_TOKEN=xxxx npm run subir-propuesta -- ruta/al/archivo.pdf`
3. **Redeploy** para que la función lea la variable.

Para actualizar la propuesta, sube un PDF nuevo a `propuesta/`: siempre se descarga el más reciente.

## Probar en local

Los archivos se cargan entre sí, así que hay que servirlos por HTTP (no abrir con doble clic):

```
npx vercel dev
```

o, sin la función de la propuesta, `npx serve .`.
