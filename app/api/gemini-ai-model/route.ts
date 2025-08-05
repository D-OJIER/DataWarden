import { NextResponse } from "next/server";
import { generateContent } from "@/lib/gemini";

// Force Node.js runtime for environment variable access
export const runtime = 'nodejs';
// Disable response caching
export const dynamic = 'force-dynamic';

// For debugging
const DEBUG = true;
/**
 * API route for generating content using Gemini AI model.
 */
export async function POST(req: Request): Promise<Response> {
  try {
    /**
     * Get the prompt from the request body.
     */
    const data = await req.json();
    const prompt = data.text || "Explain how AI works";

    console.log('Processing prompt:', prompt);

    /**
     * Use the Gemini AI model to generate content from the prompt.
     */
    const text = await generateContent(prompt);
    console.log('Generated response length:', (text ?? '').length);

    /**
     * Return the generated content as a JSON response.
     */
    return NextResponse.json({
      success: true,
      summary: text,
    });
  } catch (error: any) {
    console.error('Gemini generation error:', {
      message: error?.message,
      stack: DEBUG ? error?.stack : undefined,
      details: error
    });
    
    // Provide more specific error messages
    let errorMessage = 'Failed to generate content';
    let statusCode = 500;
    
    if (error?.message?.includes('404')) {
      errorMessage = 'The requested AI model is not available. Using standard model instead.';
      statusCode = 404;
    } else if (error?.message?.includes('401')) {
      errorMessage = 'Invalid API key configuration. Please check your environment variables.';
      statusCode = 401;
    }
    
    return NextResponse.json({
      success: false,
      error: errorMessage,
      details: DEBUG ? error?.message : undefined
    }, { status: statusCode });
  }
}
