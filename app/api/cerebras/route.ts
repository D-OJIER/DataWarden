import { NextResponse } from "next/server";
import { generateCerebrasContent } from "@/lib/cerebras";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const messages = body.messages || [];
    const model = body.model || 'qwen-3-coder-480b';

    const result = await generateCerebrasContent(messages, model);

    return NextResponse.json({
      success: true,
      insight: result,
    });
  } catch (error: any) {
    console.error('Cerebras generation error:', error);
    return NextResponse.json({
      success: false,
      error: error?.message || 'Failed to generate content',
    }, { status: 500 });
  }
}
