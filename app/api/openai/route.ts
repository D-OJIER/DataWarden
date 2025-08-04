import { NextResponse } from "next/server";
import { generateContent } from "@/lib/openai";

// Force Node.js runtime for environment variable access
export const runtime = 'nodejs';
// Disable response caching
export const dynamic = 'force-dynamic';

// Enable edge runtime for better environment variable support
export const preferredRegion = 'auto';
export const maxDuration = 10;

/**
 * API route for generating content using OpenAI
 */
export async function POST(req: Request): Promise<Response> {
  try {
    // Validate request method
    if (req.method !== 'POST') {
      return NextResponse.json({ 
        success: false, 
        error: 'Method not allowed' 
      }, { status: 405 });
    }

    // Parse request body
    let data;
    try {
      data = await req.json();
    } catch (e) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid JSON in request body' 
      }, { status: 400 });
    }

    const prompt = data.text || "Explain how AI works";

    console.log('Processing prompt:', prompt);

    /**
     * Generate content using OpenAI
     */
    const text = await generateContent(prompt);
    console.log('Generated response length:', text.length);

    /**
     * Return the generated content as a JSON response.
     */
    return NextResponse.json({
      success: true,
      summary: text,
    });
  } catch (error: any) {
    console.error('OpenAI generation error:', {
      message: error?.message,
      details: error
    });
    
    // Provide more specific error messages
    let errorMessage = 'Failed to generate content';
    let statusCode = 500;
    
    if (error?.message?.includes('401')) {
      errorMessage = 'Invalid API key configuration. Please check your environment variables.';
      statusCode = 401;
    } else if (error?.message?.includes('429')) {
      errorMessage = 'Rate limit exceeded. Please try again later.';
      statusCode = 429;
    }
    
    return NextResponse.json({
      success: false,
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error?.message : undefined
    }, { status: statusCode });
  }
}
