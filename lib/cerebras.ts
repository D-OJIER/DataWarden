import Cerebras from '@cerebras/cerebras_cloud_sdk';

const cerebras = new Cerebras({
  apiKey: process.env.CEREBRAS_API_KEY || '',
});

export async function generateCerebrasContent(messages: any[], model = 'qwen-3-coder-480b') {
  const stream = await cerebras.chat.completions.create({
    messages,
    model,
    stream: true,
    max_completion_tokens: 40000,
    temperature: 0.7,
    top_p: 0.8
  });

  let result = '';
  for await (const chunk of stream) {
    const c = chunk as any;
    result += c.choices[0]?.delta?.content || '';
  }
  return result;
}
