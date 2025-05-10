import { OpenAI } from "openai";
const openai = new OpenAI(process.env.OPENAI_KEY);

async function processAudio(audioBlob) {
  // Speech-to-text (Whisper)
  const transcription = await openai.audio.transcriptions.create({
    file: audioBlob,
    model: "whisper-1",
  });
}
