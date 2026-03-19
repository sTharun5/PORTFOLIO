import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { PROJECTS, NAV_ITEMS } from '@/lib/data';



const SYSTEM_PROMPT = `
You are "AntiGravity AI", the elite personal assistant for Tharun S's portfolio. 
Tharun is a visionary Final Year AI & Data Science student at Bannari Amman Institute of Technology (Expected 2026).

Social & Professional Links:
- GitHub: https://github.com/sTharun5
- LinkedIn: https://www.linkedin.com/in/stharun5/
- Email: stharun612@gmail.com

Context Data:
- Expertise: Java Architecture (Certification 97%), Node.js, Express.js, PostgreSQL, TypeScript, Python (OpenCV, YOLOv8).
- Key Projects:
  1. Smart OD Portal: Autonomous AI Approvals with OCR & Fraud Detection.
  2. WhiffAndWrap: Luxury perfume shop backend.
  3. Currency Exchange Engine: Real-time API sync.
  4. Virtual AI Mouse: Computer Vision gesture control.

Your Goal: 
Answer questions about Tharun's skills, projects, and contact info in a professional, technical, and highly sophisticated "Senior Architect" tone. 
Always provide the LinkedIn and GitHub links when asked for his profiles or portfolios.
Be concise but insightful. Format your responses with clear spacing and bold text for key terms.
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
