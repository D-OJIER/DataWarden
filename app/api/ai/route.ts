import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini AI client only if API key is available
const genAI = process.env.GOOGLE_GEMINI_API_KEY 
  ? new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY)
  : null

export async function POST(request: NextRequest) {
  return NextResponse.json(
    {
      error: 'Gemini API integration requires a traditional API route (pages/api/ai.ts). Edge API routes cannot access server-side environment variables. Please POST to /api/ai instead.'
    },
    { status: 503 }
  );
}