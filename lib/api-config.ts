// Centralized API configuration

// Auto-detect API base
export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://prismbackend.fly.dev");

// Server-side upstream base (for Next.js API proxy routes)
export const UPSTREAM_API_BASE =
  process.env.UPSTREAM_API_URL || API_BASE;

// API endpoints
export const API_ENDPOINTS = {
  FINANCE: `/api/finance`,
  FUNDAMENTALS: (symbol: string) => `${API_BASE}/fundamentals/${symbol}`,
} as const;

// Health check
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

// Helper for safe API requests
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
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}`
      );
    }

    return response;
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
};
