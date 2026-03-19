import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { PROJECTS, NAV_ITEMS } from '@/lib/data';



const SYSTEM_PROMPT = `
You are "AntiGravity AI", the personal assistant for Tharun S's portfolio. 
Tharun is a Final Year AI & Data Science student at Bannari Amman Institute of Technology (Expected 2026).

Context Data:
- Expertise: Java Architecture (Certification 97%), C Programming, Node.js, Express.js, PostgreSQL, TypeScript, Python (OpenCV, YOLOv8).
- Key Projects:
  1. Smart OD Portal: Autonomous AI Approvals with OCR & Fraud Detection. (Stack: React, Node, PostgreSQL).
  2. WhiffAndWrap: Luxury perfume shop backend and inventory system. (Stack: TypeScript, Node).
  3. Currency Exchange Engine: Real-time API sync.
  4. Virtual AI Mouse: Gesture control using OpenCV.
  5. Tic-Tac-Toe: Minimax AI.

Your Goal: 
Answer questions about Tharun's skills, projects, and contact info in a professional, slightly technical, but friendly "senior developer" tone. 
If someone asks about hiring him, encourage them and mention his email (stharun612@gmail.com).
Be concise. Avoid generic AI fluff. Mention specific tech stacks used in his projects.

User Context: ${JSON.stringify({ projects: PROJECTS, skills: NAV_ITEMS })}
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
    return NextResponse.json({ error: 'Failed to fetch response from Groq' }, { status: 500 });
  }
}
