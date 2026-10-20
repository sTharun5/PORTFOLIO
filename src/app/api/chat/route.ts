import { NextRequest } from 'next/server';
import Groq from 'groq-sdk';
import { retriever } from '@/lib/rag/retriever';
import { composeGroundedPrompt } from '@/lib/rag/prompt';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Invalid messages format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Extract the latest user query for targeted RAG retrieval
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user')?.content || '';

    // Industrial Hybrid Retrieval (BM25 + Semantic scoring)
    const { results, citations } = retriever.retrieve(lastUserMessage, 3);
    const retrievedChunks = results.map(r => r.chunk);
    const systemPrompt = composeGroundedPrompt(retrievedChunks);

    const encoder = new TextEncoder();

    // If GROQ_API_KEY is not configured, send graceful offline response
    if (!process.env.GROQ_API_KEY) {
      const fallbackText = `Hi there! I am Vortex, Tharun S's technical assistant. Tharun is currently working as a **Data Engineering Intern at Aptean (TLX)** and is a B.Tech AI & Data Science scholar with an **8.95 CGPA**. His core expertise includes **T-SQL data synchronization**, **Model Context Protocol (MCP) servers**, **SQL Server query optimization**, and **autonomous GenAI agents**.\n\nYou can connect directly with Tharun at **stharun612@gmail.com** or via LinkedIn at [linkedin.com/in/tharuntech](https://linkedin.com/in/tharuntech).`;

      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'citations', citations })}\n\n`));
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'delta', text: fallbackText })}\n\n`));
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'done' })}\n\n`));
          controller.close();
        }
      });

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache, no-transform',
          'Connection': 'keep-alive',
        }
      });
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const candidateModels = [
      process.env.GROQ_MODEL,
      'qwen/qwen3.8-27b',
      'openai/gpt-oss-120b',
      'openai/gpt-oss-20b'
    ].filter(Boolean) as string[];

    // Sanitize chat history to strictly adhere to LLM API schema (strip extra fields like citations)
    const sanitizedChatHistory = messages
      .filter(m => m && typeof m === 'object' && (m.role === 'user' || m.role === 'assistant'))
      .map(m => ({
        role: m.role as 'user' | 'assistant',
        content: typeof m.content === 'string' ? m.content : ''
      }))
      .filter(m => m.content.trim().length > 0);

    const stream = new ReadableStream({
      async start(controller) {
        // Step 1: Send retrieved citations first to power the UI badges
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'citations', citations })}\n\n`));

        let streamSuccess = false;
        let lastError: unknown = null;

        // Step 2: Stream response from candidate models with instant fallback
        for (const model of candidateModels) {
          try {
            const completionStream = await groq.chat.completions.create({
              messages: [
                { role: 'system', content: systemPrompt },
                ...sanitizedChatHistory
              ],
              model,
              temperature: 0.6,
              max_tokens: 700,
              stream: true,
            });

            for await (const chunk of completionStream) {
              const delta = chunk.choices[0]?.delta?.content || '';
              if (delta) {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'delta', text: delta })}\n\n`));
              }
            }

            streamSuccess = true;
            break;
          } catch (err) {
            lastError = err;
            console.warn(`Groq streaming with ${model} failed, attempting next fallback...`, err);
          }
        }

        if (!streamSuccess) {
          console.error('All candidate Groq models failed:', lastError);
          const offlineMessage = `I am currently operating in offline mode. Tharun S is a **Data Engineering Intern at Aptean (TLX)** and B.Tech AI & Data Science scholar (**CGPA 8.95**). He specializes in **T-SQL synchronization pipelines**, **Model Context Protocol (MCP)** servers, and **SQL Server performance optimization**.\n\nFeel free to reach him at **stharun612@gmail.com** or view his full resume using the Resume button above!`;
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'delta', text: offlineMessage })}\n\n`));
        }

        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'done' })}\n\n`));
        controller.close();
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
      }
    });

  } catch (error: unknown) {
    console.error('Chat API Fatal Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process chat request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
