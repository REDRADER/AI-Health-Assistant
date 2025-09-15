// src/services/aiService.js
import { HfInference } from '@huggingface/inference';

const HF_TOKEN = import.meta.env.VITE_HF_TOKEN;
const hf = HF_TOKEN ? new HfInference(HF_TOKEN) : null;

const systemPrompt = `You are an AI Health Assistant. Provide safe, general health information.
Rules:
- Do not provide diagnoses, prescriptions, or definitive medical advice.
- Encourage seeking professional care when symptoms are severe, persistent, or worsening.
- If user mentions emergency red flags (e.g., chest pain, difficulty breathing, stroke symptoms), advise calling emergency services immediately.
- Be concise, structured, and empathetic.`;

export async function getMedicalResponse(userMessage) {
  const prompt = `${systemPrompt}\n\nUser: ${userMessage}\nAssistant:`;

  // Try Hugging Face text-generation if token provided
  if (hf) {
    try {
      const resp = await hf.textGeneration({
        model: 'mistralai/Mistral-7B-Instruct-v0.3',
        inputs: prompt,
        parameters: {
          max_new_tokens: 280,
          temperature: 0.5,
          top_p: 0.9,
          repetition_penalty: 1.1,
          return_full_text: false,
        },
      });
      if (resp && resp.generated_text) {
        return sanitize(resp.generated_text);
      }
    } catch (e) {
      console.warn('HF generation failed, falling back:', e?.message || e);
    }
  }

  // Fallback: simple heuristics template so app still works
  return fallbackHeuristic(userMessage);
}

function sanitize(text) {
  if (!text) return 'Sorry, I could not generate a response.';
  // Basic cleaning
  return text.replace(/\u0000/g, '').trim();
}

function fallbackHeuristic(message) {
  const lower = message.toLowerCase();
  const redFlags = ['chest pain', 'shortness of breath', 'stroke', 'severe bleeding'];
  const hasRedFlag = redFlags.some((x) => lower.includes(x));

  const advice = [
    '- Stay hydrated and rest as needed.',
    '- Monitor your symptoms over the next 24–48 hours.',
    '- Use over-the-counter remedies if appropriate for you.',
    '- Seek professional medical advice if symptoms persist or worsen.',
  ];

  const header = hasRedFlag
    ? 'If you are experiencing severe or rapidly worsening symptoms, call your local emergency number now.'
    : 'Here is general, educational information that may help:';

  return [
    header,
    '',
    'What you described: ',
    `- "${message}"`,
    '',
    'General guidance:',
    ...advice,
  ].join('\n');
}


