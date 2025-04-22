import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || '';
const API_URL = 'https://api.deepseek.com/v1/chat/completions';

export async function POST(request: Request) {
  try {
    
    const { content } = await request.json();
    console.log('Received content for summarization:', content);
    // Input validation
    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { error: 'Content is required and must be a string' },
        { status: 400 }
      );
    }

    // Check if the content is too short to summarize
    // if (content.length < 50) {
    //   return NextResponse.json(
    //     { summary: 'The content is too short to summarize.' },
    //     { status: 200 }
    //   );
    // }

    // Fallback for development without API key
    if (!DEEPSEEK_API_KEY) {
      console.warn('No DeepSeek API key found. Using mock summarization.');
      
      // Create a simple mock summary (~ 20% of original content)
      const sentences = content.split(/[.!?]+/);
      const summaryLength = Math.max(1, Math.ceil(sentences.length * 0.2));
      const mockSummary = sentences.slice(0, summaryLength).join('. ') + '.';
      
      return NextResponse.json({ summary: mockSummary });
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'You are an AI assistant that creates concise summaries of notes. Your summary should be clear, informative, dont use bold styling and all just return plain text.',
          },
          {
            role: 'user',
            content: `Please summarize the following note: ${content}`,
          },
        ],
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('DeepSeek API error:', error);
      return NextResponse.json(
        { error: 'Failed to generate summary' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const summary = data.choices[0].message.content.trim();

    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Error in summarize API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}