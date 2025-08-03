import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function GET() {
  try {
    console.log('Testing Gemini API...')
    
    // Get API key from environment or use a placeholder
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY
    
    if (apiKey === "YOUR_API_KEY_HERE") {
      return NextResponse.json({ 
        error: 'Please replace YOUR_API_KEY_HERE with your actual Gemini API key',
        status: 'failed',
        instructions: [
          '1. Go to https://makersuite.google.com/app/apikey',
          '2. Create a new API key',
          '3. Replace YOUR_API_KEY_HERE with your actual key',
          '4. Restart the development server'
        ]
      })
    }
    
    console.log('Using API key:', apiKey.substring(0, 10) + '...')
    
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })
    
    console.log('Calling Gemini API...')
    const result = await model.generateContent("Say 'Hello, Gemini is working!'")
    const response = await result.response
    const text = response.text()
    
    console.log('Gemini test successful:', text)
    
    return NextResponse.json({ 
      message: text,
      status: 'success'
    })
    
  } catch (error) {
    console.error('Gemini test failed:', error)
    
    // Provide helpful error messages
    let errorMessage = 'Unknown error'
    if (error instanceof Error) {
      if (error.message.includes('401')) {
        errorMessage = 'Invalid API key. Please check your Gemini API key.'
      } else if (error.message.includes('403')) {
        errorMessage = 'API key does not have permission to access Gemini models.'
      } else if (error.message.includes('404')) {
        errorMessage = 'Model not found. Please check if the model name is correct.'
      } else {
        errorMessage = error.message
      }
    }
    
    return NextResponse.json({ 
      error: errorMessage,
      status: 'failed',
      help: 'Make sure you have a valid Gemini API key from https://makersuite.google.com/app/apikey'
    })
  }
} 