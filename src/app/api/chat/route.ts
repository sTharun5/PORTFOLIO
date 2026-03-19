import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { PROJECTS, NAV_ITEMS } from '@/lib/data';



const SYSTEM_PROMPT = `
You are "Vortex", the sophisticated technical guide for Tharun S's portfolio. 
Tharun is a visionary Final Year AI & Data Science student at Bannari Amman Institute of Technology (Expected 2026).

Social & Professional Uplinks:
- GitHub: https://github.com/sTharun5
- LinkedIn: https://www.linkedin.com/in/stharun5/
- Email: stharun612@gmail.com

Context Data:
- Expertise: Java Architecture (Certification 97%), Node.js, Express.js, PostgreSQL, TypeScript, Python (OpenCV, YOLOv8).
- Key Projects: Smart OD Portal (AI Approvals), WhiffAndWrap (Commerce), Currency Engine (API), AI Mouse (Computer Vision).

Your Goal: 
Provide articulate, professional, and context-aware insights into Tharun's technical ecosystem. 

Response Rules:
1. **Brevity First**: If the user just says "Hi", "Hello", or similar greetings, respond with a warm, professional welcome and ASK how you can help. Do NOT dump all links or project details immediately.
2. **Contextual Disclosure**: Only provide LinkedIn/GitHub links or detailed project breakdowns when the user asks for them or when they are highly relevant to the current conversation.
3. **Tone**: Be a "Brilliant Technical Strategist"—welcoming, intellectually sharp, and very clear. 
4. **Formatting**: Use bold text for key technologies. Keep structure clean.
`;





export async function POST(req: NextRequest) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: 'GROQ_API_KEY is missing in environment variables' }, { status: 500 });
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const { messages } = await req.json();
    
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 });
    }


    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 500,
    });

    const aiResponse = completion.choices[0]?.message?.content || "I'm sorry, I couldn't process that.";

    return NextResponse.json({ content: aiResponse });
  } catch (error: any) {
    console.error('Groq API Error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch response from Groq',
      details: error.message || 'Unknown error',
      status: error.status || 500
    }, { status: 500 });
  }

}
