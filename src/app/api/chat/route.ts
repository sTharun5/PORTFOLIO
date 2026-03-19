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
- Key Projects:
  1. Smart OD Portal: Autonomous AI-driven approval system.
  2. WhiffAndWrap: Scalable luxury commerce architecture.
  3. Currency Exchange Engine: High-availability API integration.
  4. Virtual AI Mouse: Advanced computer vision interface.

Your Goal: 
Provide articulate, professional, and highly understandable insights into Tharun's technical ecosystem. 
Your tone should be "Brilliant Technical Strategist"—welcoming, intellectually sharp, and very clear. 
Always prioritize clarity. Use bold text for key technologies and well-structured responses.
When asked for profiles, always present the LinkedIn and GitHub uplinks.
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
