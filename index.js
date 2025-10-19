import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// 🧾 Documentación principal
app.get("/", (req, res) => {
  res.send(`
    <h1>🎬 API DESCARGADOR DE VIDEOS</h1>
    <p>API creada con Node.js para descargar videos de <b>YouTube</b>, <b>TikTok</b> y <b>Facebook</b> usando <a href="https://delirius-apiofc.vercel.app/" target="_blank">Delirius API</a>.</p>

    <h2>📘 Endpoints disponibles:</h2>
    <ul>
      <li><b>/api/ytmp3?url=</b><i>[enlace de YouTube]</i> → Descargar audio MP3 de YouTube</li>
      <li><b>/api/ytmp4?url=</b><i>[enlace de YouTube]</i> → Descargar video MP4 de YouTube</li>
      <li><b>/api/tiktok?url=</b><i>[enlace de TikTok]</i> → Descargar video de TikTok (sin marca de agua)</li>
      <li><b>/api/facebook?url=</b><i>[enlace de Facebook]</i> → Descargar video de Facebook (SD o HD)</li>
    </ul>

    <h3>🧠 Ejemplo de uso:</h3>
    <code>GET /api/ytmp4?url=https://youtu.be/TdrL3QxjyVw</code><br>
    <code>GET /api/tiktok?url=https://vt.tiktok.com/ZSB2HNoKR/</code><br>
    <code>GET /api/facebook?url=https://fb.watch/rOnqYjdiUo/</code>

    <p>💬 Todas las respuestas están en <b>español</b> con enlaces de descarga y metadatos del video.</p>
  `);
});

// 🎵 YTMP3 (descargar audio de YouTube)
app.get("/api/ytmp3", async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.status(400).json({ error: "Falta el parámetro 'url'." });

  try {
    const response = await fetch(`https://delirius-apiofc.vercel.app/download/ytmp3?url=${encodeURIComponent(videoUrl)}`);
    const data = await response.json();

    res.json({
      éxito: data.status,
      plataforma: "YouTube (MP3)",
      título: data.data.title,
      id: data.data.id,
      autor: data.data.author,
      imagen: data.data.image,
      imagen_alta_resolución: data.data.image_max_resolution,
      privado: data.data.private,
      vistas: data.data.views,
      me_gusta: data.data.likes,
      comentarios: data.data.comments,
      categoría: data.data.category,
      duración_segundos: data.data.duration,
      descarga: {
        nombre_archivo: data.data.download.filename,
        calidad: data.data.download.quality,
        tamaño: data.data.download.size,
        extensión: data.data.download.extension,
        enlace: data.data.download.url
      },
      mensaje: "✅ Audio de YouTube obtenido correctamente."
    });
  } catch (error) {
    console.error("Error al obtener el audio:", error);
    res.status(500).json({ éxito: false, mensaje: "❌ Error al procesar la solicitud de YouTube MP3." });
  }
});

// 🎬 YTMP4 (descargar video de YouTube)
app.get("/api/ytmp4", async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.status(400).json({ error: "Falta el parámetro 'url'." });

  try {
    const response = await fetch(`https://delirius-apiofc.vercel.app/download/ytmp4?url=${encodeURIComponent(videoUrl)}`);
    const data = await response.json();

    res.json({
      éxito: data.status,
      plataforma: "YouTube (MP4)",
      título: data.data.title,
      id: data.data.id,
      autor: data.data.author,
      imagen: data.data.image,
      imagen_alta_resolución: data.data.image_max_resolution,
      privado: data.data.private,
      vistas: data.data.views,
      me_gusta: data.data.likes,
      comentarios: data.data.comments,
      categoría: data.data.category,
      duración_segundos: data.data.duration,
      descarga: {
        nombre_archivo: data.data.download.filename,
        calidad: data.data.download.quality,
        tamaño: data.data.download.size,
        extensión: data.data.download.extension,
        enlace: data.data.download.url
      },
      mensaje: "✅ Video de YouTube obtenido correctamente."
    });
  } catch (error) {
    console.error("Error al obtener el video:", error);
    res.status(500).json({ éxito: false, mensaje: "❌ Error al procesar la solicitud de YouTube MP4." });
  }
});

// 🎥 TikTok
app.get("/api/tiktok", async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.status(400).json({ error: "Falta el parámetro 'url'." });

  try {
    const response = await fetch(`https://delirius-apiofc.vercel.app/download/tiktok?url=${encodeURIComponent(videoUrl)}`);
    const data = await response.json();

    res.json({
      éxito: data.status,
      plataforma: "TikTok",
      id: data.data.id,
      región: data.data.region,
      título: data.data.title,
      duración_segundos: data.data.duration,
      reproducciones: data.data.repro,
      me_gusta: data.data.like,
      compartidos: data.data.share,
      comentarios: data.data.comment,
      descargas_totales: data.data.download,
      publicado: data.data.published,
      autor: {
        id: data.data.author.id,
        usuario: data.data.author.username,
        nombre: data.data.author.nickname
      },
      música: {
        título: data.data.music.title,
        autor: data.data.music.author,
        duración_segundos: data.data.music.duration
      },
      enlaces: data.data.meta.media[0],
      mensaje: "✅ Video de TikTok obtenido correctamente."
    });
  } catch (error) {
    console.error("Error al obtener el video de TikTok:", error);
    res.status(500).json({ éxito: false, mensaje: "❌ Error al procesar la solicitud de TikTok." });
  }
});

// 📘 Facebook
app.get("/api/facebook", async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.status(400).json({ error: "Falta el parámetro 'url'." });

  try {
    const response = await fetch(`https://delirius-apiofc.vercel.app/download/facebook?url=${encodeURIComponent(videoUrl)}`);
    const data = await response.json();

    res.json({
      éxito: true,
      plataforma: "Facebook",
      título: data.title,
      disponible_hd: data.isHdAvailable,
      enlaces: data.urls,
      mensaje: "✅ Video de Facebook obtenido correctamente."
    });
  } catch (error) {
    console.error("Error al obtener el video de Facebook:", error);
    res.status(500).json({ éxito: false, mensaje: "❌ Error al procesar la solicitud de Facebook." });
  }
});

// 🚀 Iniciar servidor
app.listen(PORT, () => console.log(`✅ Servidor corriendo en http://localhost:${PORT}`));
