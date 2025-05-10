import { OpenAI } from "openai";
const openai = new OpenAI(process.env.OPENAI_KEY);

async function processAudio(audioBlob) {
  // Speech-to-text (Whisper)
  const transcription = await openai.audio.transcriptions.create({
    file: audioBlob,
    model: "whisper-1",
  });

  // Generate AI response (GPT-4)
  const chat = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You're a technical interviewer." },
      { role: "user", content: transcription.text },
    ],
  });
}
