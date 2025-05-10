require("dotenv").config();
const OpenAI = require("openai");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function processAudio(audioBuffer) {
  const filename = `audio-${uuidv4()}.webm`;
  const filepath = path.join(__dirname, filename);

  // Save buffer to disk
  fs.writeFileSync(filepath, audioBuffer);

  try {
    // Transcribe using Whisper
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(filepath),
      model: "whisper-1",
    });

    console.log("Transcribed Text:", transcription.text);

    // Generate GPT-4 response
    const chat = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You're a technical interviewer. Always respond in English." },
        { role: "user", content: transcription.text },
      ],
    });

    const reply = chat.choices[0].message.content;
    console.log("GPT Reply:", reply);

    // Convert text to speech via ElevenLabs (optional)
    const ttsResponse = await axios.post(
      "https://api.elevenlabs.io/v1/text-to-speech/GUDYcgRAONiI1nXDcNQQ",
      { text: reply },
      {
        headers: {
          "xi-api-key": process.env.ELEVENLABS_API_KEY,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      }
    );

    return {
      audio: ttsResponse.data, // MP3 buffer
      text: reply,
    };
  } catch (err) {
    console.error("Error during AI processing:", err);
    return { audio: null, text: "Sorry, something went wrong." };
  } finally {
    // Clean up
    if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
  }
}

module.exports = { processAudio };
