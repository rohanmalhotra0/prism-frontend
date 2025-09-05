import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Check if OpenAI API key is configured
    if (!process.env.NEXT_OPENAI_API_KEY) {
      console.error("OpenAI API key not configured");
      return NextResponse.json({ 
        message: "⚠️ AI service is currently unavailable. Please check back later or contact support if this issue persists." 
      }, { status: 200 });
    }

    // Get the last user message
    const lastUserMessage = messages?.filter((m: any) => m.role === "user").pop()?.content;

    if (!lastUserMessage) {
      return NextResponse.json({ error: "No user message found" }, { status: 400 });
    }

    // Call OpenAI's API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // fast, cheaper chat model
        messages: [
          { role: "system", content: "You are Tomas, the King of Analytics 👑. Answer like a master of data, stats, and financial modeling. Be helpful, engaging, and knowledgeable about financial analysis, statistics, and data science." },
          ...messages, // forward full conversation
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenAI API error:", errText);
      
      // Return a user-friendly error message
      return NextResponse.json({ 
        message: "⚠️ I'm having trouble connecting to my analytics brain right now. Please try again in a moment!" 
      }, { status: 200 });
    }

    const data = await response.json();
    const aiMessage = data.choices[0]?.message?.content ?? "⚠️ No response from AI";

    return NextResponse.json({ message: aiMessage });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ 
      message: "⚠️ Something went wrong on my end. Please try again or contact support if this continues!" 
    }, { status: 200 });
  }
}
