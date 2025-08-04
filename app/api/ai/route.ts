import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { env, validateEnv } from '../../../config/env'

// Force Node.js runtime for environment variable access
export const runtime = 'nodejs'
// Disable response caching
export const dynamic = 'force-dynamic'

// Simple test endpoint that runs Gemini
export async function GET() {
  try {
    console.log('Starting GET request handler...');
    
    // Log raw environment state
    console.log('Raw env check:', {
      directKey: process.env.GOOGLE_GEMINI_API_KEY,
      publicKey: process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY,
      envKey: env.GEMINI_API_KEY,
    });

    // Validate environment
    const isValid = validateEnv();
    console.log('Environment validation result:', isValid);

    if (!isValid) {
      return NextResponse.json({
        success: false,
        error: 'Environment variables not properly configured',
        apiKeyAvailable: false
      }, { status: 503 });
    }

    const apiKey = env.GEMINI_API_KEY;
                  
    console.log('API Key Check:', {
      isDefined: typeof process.env.GOOGLE_GEMINI_API_KEY !== 'undefined',
      length: apiKey?.length,
      firstFiveChars: apiKey?.substring(0, 5)
    });
    
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
    const response = await result.response;
    const text = response.text();
    
    console.log('Gemini Response:', text);
    
    return NextResponse.json({
      success: true,
      message: text,
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
    // Validate environment
    if (!validateEnv()) {
      console.error('Environment validation failed')
      return NextResponse.json({
        error: 'Environment variables not properly configured. Check .env.local file.',
        status: 'failed'
      }, { status: 503 });
    }

    const apiKey = env.GEMINI_API_KEY;

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
    const response = await result.response;
    const insight = response.text();

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