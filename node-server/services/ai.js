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

  // Text-to-speech (ElevenLabs)
  const ttsResponse = await axios.post(
    "https://api.elevenlabs.io/v1/text-to-speech/XYZ",
    { text: chat.choices[0].message.content },
    { headers: { "xi-api-key": process.env.ELEVENLABS_KEY }, responseType: "arraybuffer" }
  );

  return {
    audio: ttsResponse.data,
    text: chat.choices[0].message.content,
  };
}
