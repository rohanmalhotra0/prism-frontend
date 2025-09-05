import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supaBaseClient";

// GET - Fetch all chat sessions for a user
export async function GET(req: NextRequest) {
  try {
    // Get current user from request
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return NextResponse.json({ error: "Invalid user" }, { status: 401 });
    }

    // Fetch chat sessions from Supabase
    const { data: chats, error: chatsError } = await supabase
      .from("chat_sessions")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false });

    if (chatsError) {
      return NextResponse.json({ error: "Failed to fetch chats" }, { status: 500 });
    }

    return NextResponse.json(chats || []);
  } catch (error) {
    console.error("Error fetching chats:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST - Create a new chat session
export async function POST(req: NextRequest) {
  try {
    const { title, messages } = await req.json();

    // Get current user from request
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return NextResponse.json({ error: "Invalid user" }, { status: 401 });
    }

    // Check if user has reached the 5 chat limit
    const { data: existingChats, error: countError } = await supabase
      .from("chat_sessions")
      .select("id")
      .eq("user_id", user.id);

    if (countError) {
      return NextResponse.json({ error: "Failed to check chat limit" }, { status: 500 });
    }

    if (existingChats && existingChats.length >= 5) {
      return NextResponse.json({ 
        error: "Maximum of 5 chat sessions allowed. Please delete an existing chat to create a new one." 
      }, { status: 400 });
    }

    // Create new chat session
    const { data: chat, error: chatError } = await supabase
      .from("chat_sessions")
      .insert({
        title: title || "New Chat",
        messages: messages || [],
        user_id: user.id,
      })
      .select()
      .single();

    if (chatError) {
      return NextResponse.json({ error: "Failed to create chat" }, { status: 500 });
    }

    return NextResponse.json(chat);
  } catch (error) {
    console.error("Error creating chat:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
