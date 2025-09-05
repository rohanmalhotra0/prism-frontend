import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Get the last user message
    const lastUserMessage = messages?.filter((m: any) => m.role === "user").pop()?.content;

    if (!lastUserMessage) {
      return NextResponse.json({ error: "No user message found" }, { status: 400 });
    }

    // Call your backend API instead of OpenAI directly
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "https://prismbackend.fly.dev";
    const response = await fetch(`${backendUrl}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: "You are Tomas, the King of Analytics 👑. Answer like a master of data, stats, and financial modeling. Be helpful, engaging, and knowledgeable about financial analysis, statistics, and data science." },
          ...messages, // forward full conversation
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      console.error("Backend API error:", response.status, response.statusText);
      
      // Return a user-friendly error message
      return NextResponse.json({ 
        message: "⚠️ I'm having trouble connecting to my analytics brain right now. Please try again in a moment!" 
      }, { status: 200 });
    }

    const data = await response.json();
    const aiMessage = (data.message || data.choices?.[0]?.message?.content) ?? "⚠️ No response from AI";

    return NextResponse.json({ message: aiMessage });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ 
      message: "⚠️ Something went wrong on my end. Please try again or contact support if this continues!" 
    }, { status: 200 });
  }
}