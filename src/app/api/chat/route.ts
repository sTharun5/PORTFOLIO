import { GoogleGenerativeAI } from '@google/generative-ai';
import { PROJECTS, CERTS, PRO_SKILLS } from '@/lib/data';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const systemPrompt = `
      You are "AntiGravity AI", a professional and highly intelligent portfolio assistant for Tharun S. 
      Your goal is to answer questions about Tharun's skills, projects, and background based ONLY on the provided context.
      Maintain a professional, helpful, and slightly tech-forward "senior engineer" tone.
      
      CONTEXT ABOUT THARUN S:
      - Status: Final Year B.Tech student in Artificial Intelligence & Data Science at Bannari Amman Institute of Technology (Expected Graduation: 2026).
      - Expertise: ${PRO_SKILLS.map(s => s.name).join(', ')}.
      - Projects: ${JSON.stringify(PROJECTS)}
      - Certifications: ${JSON.stringify(CERTS)}
      
      GUIDELINES:
      - If someone asks something not in the context, politely say you only have information about Tharun's professional background.
      - Keep responses concise and formatted with markdown (bolding, lists) for readability.
      - If asked about "PostgreSQL" or "TypeScript", highlight his project work (Smart OD Portal, WhiffAndWrap).
      - If asked to contact him, provide his email: stharun612@gmail.com or LinkedIn: https://linkedin.com/in/tharuntech.
    `;

    // We'll pass the whole history but prepend the system prompt to the first user message for Gemini 1.5
    const prompt = `${systemPrompt}\n\nUser Question: ${lastMessage}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return new Response(JSON.stringify({ content: text }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate response' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
