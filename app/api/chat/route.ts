import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Get the last user message
    const lastUserMessage = messages?.filter((m: any) => m.role === "user").pop()?.content;

    // Call OpenAI’s API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_OPENAI_API_KEY}`, // 🔑 use env variable
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // fast, cheaper chat model
        messages: [
          { role: "system", content: "You are Tomas, the King of Analytics 👑. Answer like a master of data, stats, and financial modeling." },
          ...messages, // forward full conversation
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenAI API error:", errText);
      return NextResponse.json({ error: "Failed to get AI response" }, { status: 500 });
    }

    const data = await response.json();
    const aiMessage = data.choices[0]?.message?.content ?? "⚠️ No response from AI";

    return NextResponse.json({ message: aiMessage });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
