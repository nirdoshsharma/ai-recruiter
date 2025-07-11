import { QUESTIONS_PROMPT } from "@/app/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  const { jobPosition, jobDescription, duration, type } = await req.json();
  const FINAL_PROMPT = QUESTIONS_PROMPT.replace("{{jobTitle}}", jobPosition)
    .replace("{{jobDescription}}", jobDescription)
    .replace("{{duration}}", duration)
    .replace("{{type}}", type);

  try {
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });
    //if ithis is not working change the model to "google/gemini-2.0-flash-exp"
    // or this "google/gemini-2.0-flash-001"
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-lite-001",
      messages: [{ role: "user", content: FINAL_PROMPT }],
    });

    if (
      !completion ||
      !completion.choices ||
      !completion.choices[0]?.message?.content
    ) {
      return NextResponse.json(
        { error: "No content in response from model" },
        { status: 500 }
      );
    }

    return NextResponse.json(completion.choices[0].message);
  } catch (e) {
    console.error("AI model error:", e);
    return NextResponse.json(
      { error: e.message || "Internal error" },
      { status: e.status || 500 }
    );
  }
}
