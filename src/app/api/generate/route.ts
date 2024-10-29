import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(request: Request) {
  try {
    const { paragraphs, includeHeaders, includePTags } = await request.json();
    
    const prompt = `Generate ${paragraphs} paragraphs of lorem ipsum text John Wick styles of speaking when he fight a bad guy. At the end of paragraphs, John Wick always says "yeah". 
    ${includeHeaders ? 'Include some header tags (H1, H2) where appropriate.' : ''}
    ${includePTags ? 'Wrap paragraphs in <p> tags.' : ''}
    Include references to: Continental Hotel, assassins, gold coins, guns, dogs, and revenge.`;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate text" }, { status: 500 });
  }
}
