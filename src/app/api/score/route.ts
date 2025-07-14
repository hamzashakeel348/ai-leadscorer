import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI();

export async function POST(req: Request) {
  const { lead } = await req.json();

  try {
    const prompt = `
You are an expert sales qualification assistant.
Score the following lead from 1-10 based on relevance to an AI SaaS product and provide reasoning.

Lead Details:
Name: ${lead.Name}
Company: ${lead.Company}
Job Title: ${lead["Job Title"]}
Message: ${lead.Message}

Respond in JSON with "score" (1-10) and "reason".
`;

    // const completion = await openai.chat.completions.create({
    //   model: "gpt-4o",
    //   messages: [
    //     { role: "system", content: "You are a helpful assistant." },
    //     { role: "user", content: prompt },
    //   ],
    // });

    // const text = completion.choices[0].message.content || "{}";
    // const result = JSON.parse(text);

    const result = {
      score: Math.floor(Math.random() * 10) + 1,
      reason: "This is a mock AI reasoning for testing purposes.",
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error scoring lead:", error);
    return NextResponse.json(
      { score: 0, reason: "Error scoring lead" },
      { status: 500 }
    );
  }
}
