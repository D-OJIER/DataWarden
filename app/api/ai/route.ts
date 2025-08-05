import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Force Node.js runtime for environment variable access
export const runtime = 'nodejs'
// Disable response caching
export const dynamic = 'force-dynamic'

// Simple test endpoint that runs Gemini
export async function GET() {
  try {
    console.log('Starting GET request handler...');
    
    // Check API key
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({
        success: false,
        error: 'GEMINI_API_KEY is not configured',
        apiKeyAvailable: false
      }, { status: 503 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: 'API key is not configured',
        apiKeyAvailable: false
      }, { status: 503 });
    }
    
    console.log('Testing Gemini with simple prompt...');
    
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const result = await model.generateContent("Say: Hello, I am testing Ojier's Gemini integration!");
    if (!result.response) {
      throw new Error('Failed to get response from Gemini');
    }
    const response = await result.response;
    const responseText = response.text();
    if (!responseText) {
      throw new Error('Empty response from Gemini');
    }
    
    console.log('Gemini Response:', responseText);
    
    return NextResponse.json({
      success: true,
      message: responseText,
      apiKeyAvailable: true
    });
    
  } catch (error: any) {
    console.error('Gemini Test Error:', error);
    return NextResponse.json({
      success: false,
      error: error?.message || 'Unknown error occurred',
      apiKeyAvailable: !!process.env.GOOGLE_GEMINI_API_KEY
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({
        error: 'GEMINI_API_KEY is not configured. Check .env file.',
        status: 'failed'
      }, { status: 503 });
    }

    // Get data from request body
    const body = await request.json();
    console.log('Received request body:', body);
    
    const { data } = body;

    if (!data || !Array.isArray(data) || data.length === 0) {
      console.error('Invalid data format received');
      return NextResponse.json({
        error: 'Invalid data format. Please provide an array of data.',
        status: 'failed'
      }, { status: 400 });
    }
    
    console.log('Data validation passed, sample:', data.slice(0, 2));

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Create a prompt for data analysis
    const dataStr = JSON.stringify(data.slice(0, 10), null, 2); // Send first 10 items for analysis
    const prompt = `Analyze this dataset and provide key insights (trends, patterns, anomalies):
    
    ${dataStr}
    
    Provide a concise, professional analysis in 3-4 sentences.`;

    // Generate insights
    const result = await model.generateContent(prompt);
    if (!result.response) {
      throw new Error('Failed to get response from Gemini');
    }
    const response = await result.response;
    const responseText = response.text();
    if (!responseText) {
      throw new Error('Empty response from Gemini');
    }
    const insight = responseText;

    return NextResponse.json({ 
      insight,
      status: 'success'
    });
  } catch (error) {
    console.error('AI Insight generation failed:', error);
    
    let errorMessage = 'Failed to generate insights';
    if (error instanceof Error) {
      if (error.message.includes('401')) {
        errorMessage = 'Invalid API key. Please check your Gemini API key.';
      } else if (error.message.includes('403')) {
        errorMessage = 'API key does not have permission to access Gemini models.';
      } else {
        errorMessage = error.message;
      }
    }
    
    return NextResponse.json({ 
      error: errorMessage,
      status: 'failed'
    }, { status: 500 });
  }
}