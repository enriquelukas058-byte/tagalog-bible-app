import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    try {
      aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (e) {
      console.error("Failed to initialize GoogleGenAI", e);
    }
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Server-side Gemini endpoint for Tagalog verse reflection / explanation
  app.post("/api/explain-verse", async (req, res) => {
    try {
      const { reference, verseText, question } = req.body;
      if (!reference || !verseText) {
        return res.status(400).json({ error: "Missing reference or verseText" });
      }

      const client = getAIClient();
      if (!client) {
        // Fallback explanation if API key is not yet set
        return res.json({
          explanation: `Ang talatang ito mula sa **${reference}** ("${verseText}") ay nagpapaalala sa atin ng dakilang pag-ibig, gabay, at katapatan ng Diyos sa ating pang-araw-araw na pamumuhay. Pagnilayan ang mensaheng ito at dalhin sa panalangin upang magbigay ng kapayapaan at lakas sa puso.`
        });
      }

      const prompt = `Ikaw ay isang magiliw, matulungin, at magalang na Tagalog Christian Bible companion. 
Ipaliwanag nang maikli, malinaw, at may inspirasyon sa wikang Tagalog ang talatang ito:
Talata: ${reference} - "${verseText}"
${question ? `Karagdagang tanong: ${question}` : "Magbigay ng: 1) Kahulugan at Konteksto, 2) Praktikal na Aplikasyon sa Buhay, at 3) Maikling Panalangin."}

Panatilihing magalang, nakakapagpatibay, at madaling maintindihan ang paliwanag.`;

      const response = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      res.json({ explanation: response.text || "Walang maibigay na paliwanag sa ngayon." });
    } catch (error: any) {
      console.error("Error in explain-verse:", error);
      res.status(500).json({ 
        error: "Hindi maiproseso ang kahilingan",
        fallback: "Ang talatang ito ay nagbibigay ng inspirasyon, kapayapaan, at gabay sa buhay pananampalataya." 
      });
    }
  });

  // Server-side Gemini TTS Audio endpoint with Quota & Error handling
  app.post("/api/tts", async (req, res) => {
    try {
      const { text, voiceName } = req.body;
      if (!text) {
        return res.status(400).json({ error: "Missing text for TTS" });
      }

      const client = getAIClient();
      if (!client) {
        return res.status(503).json({
          error: "Walang Gemini API key na naka-configure sa server",
          code: "NO_API_KEY"
        });
      }

      // Use gemini-3.1-flash-tts-preview model for high quality AI voice
      const response = await client.models.generateContent({
        model: "gemini-3.1-flash-tts-preview",
        contents: [{ parts: [{ text: text.trim() }] }],
        config: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: voiceName || "Kore" },
            },
          },
        },
      });

      const candidate = response.candidates?.[0];
      const audioPart = candidate?.content?.parts?.find((p: any) => p.inlineData?.data);
      const base64Audio = audioPart?.inlineData?.data;
      const mimeType = audioPart?.inlineData?.mimeType || "audio/pcm;rate=24000";

      if (!base64Audio) {
        return res.status(502).json({
          error: "Walang audio stream na natanggap mula sa AI API",
          code: "NO_AUDIO_RETURNED"
        });
      }

      res.json({
        audio: base64Audio,
        mimeType,
        sampleRate: 24000
      });
    } catch (error: any) {
      console.error("Error in /api/tts endpoint:", error);
      const errorMsg = error?.message || String(error);
      const status = error?.status || 500;
      const isQuota = 
        status === 429 || 
        errorMsg.toLowerCase().includes("quota") || 
        errorMsg.toLowerCase().includes("resource_exhausted") ||
        errorMsg.toLowerCase().includes("rate limit") ||
        errorMsg.toLowerCase().includes("too many requests");

      res.status(isQuota ? 429 : (status >= 400 && status < 600 ? status : 500)).json({
        error: errorMsg,
        code: isQuota ? "QUOTA_EXCEEDED" : "API_ERROR",
        isQuota
      });
    }
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Tagalog Bible Reader server listening on port ${PORT}`);
  });
}

startServer();
