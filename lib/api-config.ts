// Centralized API configuration
export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

// API endpoints
export const API_ENDPOINTS = {
  FINANCE: `${API_BASE}/finance`,
  FUNDAMENTALS: (symbol: string) => `${API_BASE}/fundamentals/${symbol}`,
  WEBSOCKET: (symbol: string) => `${API_BASE.replace("http", "ws")}/ws/quotes/${symbol}`,
} as const;

// Helper function to check if API is available
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE}/health`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return response.ok;
  } catch (error) {
    console.error("API health check failed:", error);
    return false;
  }
};

// Helper function to make API requests with error handling
export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response;
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
};
