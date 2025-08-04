import { NextResponse } from "next/server";
import { generateGeminiContent } from "@/lib/gemini";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const prompt = body.text || "Explain how AI works";
    const result = await generateGeminiContent(prompt);
    return NextResponse.json({
      success: true,
      insight: result,
    });
  } catch (error: any) {
    console.error('Gemini generation error:', error);
    return NextResponse.json({
      success: false,
      error: error?.message || 'Failed to generate content',
    }, { status: 500 });
  }
}
