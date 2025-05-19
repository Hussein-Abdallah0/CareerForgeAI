require("dotenv").config();
const OpenAI = require("openai");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function processAudio(audioBuffer, questionText = "") {
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
        {
          role: "system",
          content: `You're a technical interviewer. Provide concise, constructive feedback in English. MAKE YOUR FEEDBACK LESS THAN 25 WORDS. Focus on:
            1. Technical accuracy
            2. Clarity of communication
            3. Relevance to the role
            4. Suggested improvements
          `,
        },
        { role: "user", content: `Question: ${questionText}\nAnswer: ${transcription.text}` },
      ],
    });

    const reply = chat.choices[0].message.content;
    console.log("GPT Reply:", reply);

    const ttsResponse = await openai.audio.speech.create({
      model: "tts-1",
      voice: "onyx",
      input: reply,
    });

    const audioBuffer = Buffer.from(await ttsResponse.arrayBuffer());

    return {
      audio: audioBuffer, // MP3 buffer
      text: reply,
      userText: transcription.text,
    };
  } catch (err) {
    console.error("Error during AI processing:", err);
    return { audio: null, text: "Sorry, something went wrong." };
  } finally {
    // Clean up
    if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
  }
}

async function processText(questionText, userText) {
  try {
    // 1. Generate GPT-4 response
    const chat = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You're a technical interviewer. Provide concise, constructive feedback in English. MAKE YOUR FEEDBACK LESS THAN 25 WORDS. Focus on:
            1. Technical accuracy
            2. Clarity of communication
            3. Relevance to the role
            4. Suggested improvements
          `,
        },
        {
          role: "user",
          content: `Question: ${questionText}\nAnswer: ${userText}`,
        },
      ],
    });

    const reply = chat.choices[0].message.content;

    // 2. Generate TTS audio (optional)
    const ttsResponse = await openai.audio.speech.create({
      model: "tts-1",
      voice: "onyx",
      input: reply,
    });

    return {
      audio: await ttsResponse.arrayBuffer(),
      text: reply,
      userText: userText,
    };
  } catch (err) {
    console.error("Error processing text:", err);
    return { error: "AI processing failed" };
  }
}

async function processBodyLanguage(bodyMetrics) {
  const payload = bodyMetrics.map((m, i) => ({
    question: i + 1,
    bodyStats: m,
  }));

  const messages = [
    {
      role: "system",
      content: `
You're a technical interviewer. For each question you receive numeric body-language stats:
  • avgShoulderY
  • avgLeftWristY, avgRightWristY
  • handMovementCount

Provide one concise tip (<20 words) per question, focusing on posture, gesture usage, and presence on camera.
      (Respond with each tip on its own line—no numbering, no labels.)`.trim(),
    },
    { role: "user", content: JSON.stringify(payload, null, 2) },
  ];

  const chat = await openai.chat.completions.create({
    model: "gpt-4",
    messages,
  });

  const text = chat.choices[0].message.content.trim();
  return text.split(/\r?\n/).map((l) => l.trim());
}

module.exports = { processAudio, processText, processBodyLanguage };
