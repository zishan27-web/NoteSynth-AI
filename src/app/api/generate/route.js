import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function POST(request) {
    try {
        const { text } = await request.json();
    
        if (!text) {
            return NextResponse.json({ error: 'Text is Required' }, { status: 400 });
        }
    
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash"});
    
        const prompt = `Summarize the following text in one single, concise sentence ${text}`;
    
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const summary = response.text();
    
        return NextResponse.json({ summary: summary }, { status: 200 })
        
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to generate the summary.' }, { status: 500 });
    }
}