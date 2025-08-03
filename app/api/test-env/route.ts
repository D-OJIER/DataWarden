import { NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('Testing environment variables...')
    console.log('NEXT_PUBLIC_APP_NAME:', process.env.NEXT_PUBLIC_APP_NAME)
    console.log('GOOGLE_GEMINI_API_KEY present:', !!process.env.GOOGLE_GEMINI_API_KEY)
    
    return NextResponse.json({ 
      NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
      GOOGLE_GEMINI_API_KEY_present: !!process.env.GOOGLE_GEMINI_API_KEY,
      all_env_keys: Object.keys(process.env).filter(key => key.includes('GEMINI') || key.includes('APP_NAME'))
    })
  } catch (error) {
    console.error('Environment test failed:', error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
} 