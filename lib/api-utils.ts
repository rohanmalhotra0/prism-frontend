import { supabase } from "./supaBaseClient";

export async function getAuthHeaders() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) {
    return null;
  }
  return {
    "Authorization": `Bearer ${session.access_token}`,
    "Content-Type": "application/json",
  };
}

export async function authenticatedFetch(url: string, options: RequestInit = {}) {
  const headers = await getAuthHeaders();
  if (!headers) {
    throw new Error("User not authenticated");
  }
  return fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });
}

// Chat-specific API functions
export async function saveChatSession(chatData: { title: string; messages: any[] }) {
  const headers = await getAuthHeaders();
  if (!headers) {
    throw new Error("User not authenticated");
  }
  const response = await fetch("/api/chats", {
    method: "POST",
    headers,
    body: JSON.stringify(chatData),
  });
  if (!response.ok) {
    throw new Error(`Failed to save chat session: ${response.status}`);
  }
  return response.json();
}

export async function updateChatSession(id: string, chatData: { title: string; messages: any[] }) {
  const headers = await getAuthHeaders();
  if (!headers) {
    throw new Error("User not authenticated");
  }
  const response = await fetch(`/api/chats/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(chatData),
  });
  if (!response.ok) {
    throw new Error(`Failed to update chat session: ${response.status}`);
  }
  return response.json();
}

export async function deleteChatSession(id: string) {
  const headers = await getAuthHeaders();
  if (!headers) {
    throw new Error("User not authenticated");
  }
  const response = await fetch(`/api/chats/${id}`, {
    method: "DELETE",
    headers,
  });
  if (!response.ok) {
    throw new Error(`Failed to delete chat session: ${response.status}`);
  }
  return response.json();
}

export async function loadChatSessions() {
  const response = await authenticatedFetch("/api/chats");
  if (!response.ok) {
    throw new Error(`Failed to load chat sessions: ${response.status}`);
  }
  return response.json();
}
