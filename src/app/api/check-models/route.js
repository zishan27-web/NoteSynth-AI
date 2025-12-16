// src/app/api/check-models/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.GOOGLE_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Filter to only show models that support 'generateContent'
    const contentModels = data.models.filter(m => 
      m.supportedGenerationMethods.includes("generateContent")
    );

    return NextResponse.json({ 
      count: contentModels.length,
      models: contentModels.map(m => m.name) // Just show the names
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}