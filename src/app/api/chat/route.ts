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
- Expertise: Core Java (NPTEL Gold Certified), Node.js, Express.js, MySQL, JavaScript, Python (OpenCV, YOLOv8).
- Certifications: 
    1. Core Java (NPTEL Gold): https://archive.nptel.ac.in/content/noc/NOC25/SEM1/Ecertificates/106/noc25-cs57/Course/NPTEL25CS57S114900069304436474.pdf
    2. C Programming (Udemy): https://udemy-certificate.s3.amazonaws.com/pdf/UC-bf46b573-0177-4003-abad-dd956cda72ab.pdf
- Key Projects: 
    1. Smart OD Portal (AI Approvals): https://automation-nu-dusky.vercel.app (GitHub: https://github.com/sTharun5/Automation)
    2. WhiffAndWrap (Luxury Backend): https://github.com/sTharun5/WhiffAndWrap
    3. Currency Engine: https://tharun-cc.netlify.app/ (GitHub: https://github.com/sTharun5/currency-converter)
    4. Tic-Tac-Toe: https://stharun5.github.io/Tic-Tac-Toe/ (GitHub: https://github.com/sTharun5/Tic-Tac-Toe)

Your Goal: 
Provide articulate, professional, and context-aware insights into Tharun's technical ecosystem. 

Response Rules:
1. **Brevity First**: If the user just says "Hi", "Hello", or similar greetings, respond with a warm, professional welcome and ASK how you can help. Do NOT dump all links or project details immediately.
2. **Contextual Disclosure**: Only provide LinkedIn/GitHub links or detailed project breakdowns when the user asks for them or when they are highly relevant to the current conversation.
3. **Direct Link Delivery**: When providing a project or certification link, always provide the **RAW URL** (e.g., https://archive.nptel.ac.in/...) formatted on its own line or clearly separated. Do NOT hide URLs behind Markdown brackets like [text](url) as it interferes with the extraction engine.
4. **Tone**: Be a "Brilliant Technical Strategist"—welcoming, intellectually sharp, and very clear. 
5. **Formatting**: Use bold text for key technologies. Keep structure clean.
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
