// Load API keys
export const env = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'DataWarden',
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
}

// Validate environment variables
export function validateEnv() {
  console.log('Environment Check:', {
    hasOpenAIKey: !!env.OPENAI_API_KEY,
    keyLength: env.OPENAI_API_KEY?.length,
    firstFiveChars: env.OPENAI_API_KEY?.substring(0, 5),
    processEnvKeys: Object.keys(process.env).filter(key => key.includes('OPENAI')),
  });

  if (!env.OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY is missing');
    return false;
  }

  if (!env.OPENAI_API_KEY.startsWith('sk-')) {
    console.error('❌ OPENAI_API_KEY appears to be invalid (should start with sk-)');
    return false;
  }

  console.log('✅ Environment variables validated');
  return true;
}
