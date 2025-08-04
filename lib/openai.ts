import OpenAI from "openai";

// Get API key with fallbacks
function getApiKey() {
  const key = process.env.OPENAI_API_KEY || 
              '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';
  
  if (!key?.startsWith('sk-')) {
    console.error('Invalid OpenAI API key format');
    throw new Error('Invalid API key configuration');
  }
  
  return key;
}

const openai = new OpenAI({
  apiKey: getApiKey(),
  dangerouslyAllowBrowser: true // Enable client-side usage
});

/**
 * Generate content using OpenAI
 */
export async function generateContent(prompt: string) {
  if (!prompt?.trim()) {
    throw new Error('Prompt is required');
  }

  try {
    console.log('Generating content with prompt:', prompt.substring(0, 50) + '...');
    
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant that provides clear and concise responses.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content generated');
    }

    console.log('Generated content length:', content.length);
    return content;
  } catch (error: any) {
    console.error('OpenAI generation error:', {
      message: error?.message,
      response: error?.response?.data,
    });
    
    // Enhance error messages
    if (error?.response?.status === 401) {
      throw new Error('Invalid API key. Please check your OpenAI API key configuration.');
    } else if (error?.response?.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }
    
    throw error;
  }
}
