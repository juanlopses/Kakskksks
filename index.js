import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

// 📘 Página raíz con documentación
app.get("/", (req, res) => {
  res.json({
    mensaje: "Bienvenido a la API de Descargas Multimedia 🌐",
    descripción: "Convierte y descarga contenido de YouTube, TikTok y Facebook (respuestas traducidas al español).",
    rutas_disponibles: {
      youtube_mp3: "/api/ytmp3?url=<enlace_de_youtube>",
      youtube_mp4: "/api/ytmp4?url=<enlace_de_youtube>",
      tiktok: "/api/tiktok?url=<enlace_de_tiktok>",
      facebook: "/api/facebook?url=<enlace_de_facebook>"
    },
    ejemplo: {
      ytmp3: "/api/ytmp3?url=https://youtu.be/TdrL3QxjyVw",
      ytmp4: "/api/ytmp4?url=https://youtu.be/TdrL3QxjyVw",
      tiktok: "/api/tiktok?url=https://vt.tiktok.com/ZSB2HNoKR/",
      facebook: "/api/facebook?url=https://fb.watch/rOnqYjdiUo/"
    }
  });
});

// 🔊 YouTube MP3
app.get("/api/ytmp3", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ éxito: false, mensaje: "Falta el parámetro 'url'." });

  try {
    const respuesta = await fetch(`https://delirius-apiofc.vercel.app/download/ytmp3?url=${url}`);
    const data = await respuesta.json();

    if (!data.status) return res.status(404).json({ éxito: false, mensaje: "No se pudo obtener el audio." });

    const d = data.data;
    res.json({
      éxito: true,
      plataforma: "YouTube (MP3)",
      título: d.title,
      id: d.id,
      autor: d.author,
      imagen: d.image,
      imagen_alta_resolución: d.image_max_resolution,
      privado: d.private,
      vistas: d.views,
      me_gusta: d.likes,
      comentarios: d.comments,
      categoría: d.category,
      duración_segundos: d.duration,
      descarga: {
        nombre_archivo: d.download.filename,
        calidad: d.download.quality,
        tamaño: d.download.size,
        extensión: d.download.extension,
        enlace: d.download.url
      },
      consultado_en: new Date().toLocaleString("es-PE"),
      mensaje: "✅ Audio de YouTube obtenido correctamente."
    });
  } catch (error) {
    res.status(500).json({ éxito: false, mensaje: "Error interno del servidor." });
  }
});

// 🎬 YouTube MP4
app.get("/api/ytmp4", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ éxito: false, mensaje: "Falta el parámetro 'url'." });

  try {
    const respuesta = await fetch(`https://delirius-apiofc.vercel.app/download/ytmp4?url=${url}`);
    const data = await respuesta.json();

    if (!data.status) return res.status(404).json({ éxito: false, mensaje: "No se pudo obtener el video." });

    const d = data.data;
    res.json({
      éxito: true,
      plataforma: "YouTube (MP4)",
      título: d.title,
      id: d.id,
      autor: d.author,
      imagen: d.image,
      imagen_alta_resolución: d.image_max_resolution,
      privado: d.private,
      vistas: d.views,
      me_gusta: d.likes,
      comentarios: d.comments,
      categoría: d.category,
      duración_segundos: d.duration,
      descarga: {
        nombre_archivo: d.download.filename,
        calidad: d.download.quality,
        tamaño: d.download.size,
        extensión: d.download.extension,
        enlace: d.download.url
      },
      consultado_en: new Date().toLocaleString("es-PE"),
      mensaje: "✅ Video de YouTube obtenido correctamente."
    });
  } catch (error) {
    res.status(500).json({ éxito: false, mensaje: "Error interno del servidor." });
  }
});

// 🎥 TikTok
app.get("/api/tiktok", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ éxito: false, mensaje: "Falta el parámetro 'url'." });

  try {
    const respuesta = await fetch(`https://delirius-apiofc.vercel.app/download/tiktok?url=${url}`);
    const data = await respuesta.json();

    if (!data.status) return res.status(404).json({ éxito: false, mensaje: "No se pudo obtener el video de TikTok." });

    const d = data.data;
    const media = d.meta.media[0];
    res.json({
      éxito: true,
      plataforma: "TikTok",
      id: d.id,
      región: d.region,
      título: d.title,
      duración_segundos: d.duration,
      reproducciones: d.repro,
      me_gusta: d.like,
      compartidos: d.share,
      comentarios: d.comment,
      descargas_totales: d.download,
      publicado: d.published,
      autor: {
        id: d.author.id,
        usuario: d.author.username,
        nombre: d.author.nickname
      },
      música: {
        título: d.music.title,
        autor: d.music.author,
        duración_segundos: d.music.duration
      },
      enlaces: {
        tipo: media.type,
        tamaño_original: media.size_org,
        tamaño_hd: media.size_hd,
        video_original: media.org,
        video_hd: media.hd
      },
      consultado_en: new Date().toLocaleString("es-PE"),
      mensaje: "✅ Video de TikTok obtenido correctamente."
    });
  } catch (error) {
    res.status(500).json({ éxito: false, mensaje: "Error interno del servidor." });
  }
});

// 📘 Facebook
app.get("/api/facebook", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ éxito: false, mensaje: "Falta el parámetro 'url'." });

  try {
    const respuesta = await fetch(`https://delirius-apiofc.vercel.app/download/facebook?url=${url}`);
    const data = await respuesta.json();

    if (!data.status) return res.status(404).json({ éxito: false, mensaje: "No se pudo obtener el video de Facebook." });

    res.json({
      éxito: true,
      plataforma: "Facebook",
      título: data.data.title,
      disponible_hd: data.data.hd,
      enlaces: data.data.url,
      consultado_en: new Date().toLocaleString("es-PE"),
      mensaje: "✅ Video de Facebook obtenido correctamente."
    });
  } catch (error) {
    res.status(500).json({ éxito: false, mensaje: "Error interno del servidor." });
  }
});

// 🚀 Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor ejecutándose en el puerto ${PORT}`));
