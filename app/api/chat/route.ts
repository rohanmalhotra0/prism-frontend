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
          { role: "system", content: "You are Tomas, the King of Analytics. Answer like a master of data, stats, and financial modeling. Be helpful, engaging, and knowledgeable about financial analysis, statistics, and data science." },
          ...messages, // forward full conversation
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      console.error("Backend API error:", response.status, response.statusText);
      
      // Return a fallback response instead of error
      const fallbackResponses = [
        "I'm Tomas, the King of Analytics! I'm currently experiencing some technical difficulties with my backend connection, but I'm still here to help you with data analysis, financial modeling, and statistical insights! What specific analytical challenge can I assist you with?",
        "Greetings! I'm Tomas, your analytics expert. While my main processing system is temporarily offline, I can still provide guidance on financial modeling, statistical analysis, and data interpretation. What would you like to explore?",
        "Hello there! I'm Tomas, the King of Analytics. My backend connection is having issues right now, but I'm ready to help you with quantitative analysis, risk modeling, and statistical insights. What analytical problem are you working on?"
      ];
      
      const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      
      return NextResponse.json({ 
        message: randomResponse
      }, { status: 200 });
    }

    const data = await response.json();
    const aiMessage = (data.message || data.choices?.[0]?.message?.content) ?? "No response from AI";

    return NextResponse.json({ message: aiMessage });
  } catch (err) {
    console.error("API error:", err);
    
    // Return a helpful fallback response
    const fallbackResponses = [
      "I'm Tomas, the King of Analytics! I'm experiencing some technical difficulties right now, but I'm still here to help you with data analysis, financial modeling, and statistical insights! What specific analytical challenge can I assist you with?",
      "Greetings! I'm Tomas, your analytics expert. While my main processing system is temporarily offline, I can still provide guidance on financial modeling, statistical analysis, and data interpretation. What would you like to explore?",
      "Hello there! I'm Tomas, the King of Analytics. My backend connection is having issues right now, but I'm ready to help you with quantitative analysis, risk modeling, and statistical insights. What analytical problem are you working on?"
    ];
    
    const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    
    return NextResponse.json({ 
      message: randomResponse
    }, { status: 200 });
  }
}