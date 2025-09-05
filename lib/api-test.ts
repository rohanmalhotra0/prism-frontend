// API connection test utility
import { API_BASE, checkApiHealth } from "./api-config";

export const testApiConnection = async () => {
  console.log("🔍 Testing API connection...");
  console.log("📍 API Base URL:", API_BASE);
  
  try {
    // Test basic connectivity
    const response = await fetch(`${API_BASE}/health`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log("✅ API Health Check:", data);
      return { success: true, data };
    } else {
      console.error("❌ API Health Check Failed:", response.status, response.statusText);
      return { success: false, error: `HTTP ${response.status}: ${response.statusText}` };
    }
  } catch (error) {
    console.error("❌ API Connection Error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
};

// Test finance endpoint
export const testFinanceEndpoint = async () => {
  console.log("🔍 Testing Finance endpoint...");
  
  try {
    const testPayload = {
      symbol: "AAPL",
      chartType: "candlestick",
      overlays: [],
      indicators: [],
      timePeriod: "1D"
    };
    
    const response = await fetch(`${API_BASE}/finance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testPayload),
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log("✅ Finance Endpoint Test:", data);
      return { success: true, data };
    } else {
      console.error("❌ Finance Endpoint Failed:", response.status, response.statusText);
      return { success: false, error: `HTTP ${response.status}: ${response.statusText}` };
    }
  } catch (error) {
    console.error("❌ Finance Endpoint Error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
};

// Run all tests
export const runAllApiTests = async () => {
  console.log("🚀 Running all API tests...");
  
  const healthTest = await testApiConnection();
  const financeTest = await testFinanceEndpoint();
  
  const results = {
    health: healthTest,
    finance: financeTest,
    overall: healthTest.success && financeTest.success
  };
  
  console.log("📊 Test Results:", results);
  return results;
};
