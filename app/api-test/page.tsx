"use client";

import { useState } from "react";
import { testApiConnection, testFinanceEndpoint, runAllApiTests } from "@/lib/api-test";
import { API_BASE } from "@/lib/api-config";

export default function ApiTestPage() {
  const [testResults, setTestResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const runTests = async () => {
    setLoading(true);
    try {
      const results = await runAllApiTests();
      setTestResults(results);
    } catch (error) {
      console.error("Test error:", error);
      setTestResults({ error: "Test failed", details: error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">🔌 API Connection Test</h1>
        
        <div className="mb-8 p-6 bg-gray-900 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Configuration</h2>
          <p><strong>API Base URL:</strong> {API_BASE}</p>
          <p><strong>Environment:</strong> {process.env.NODE_ENV}</p>
        </div>

        <div className="mb-8">
          <button
            onClick={runTests}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg font-semibold"
          >
            {loading ? "Testing..." : "Run API Tests"}
          </button>
        </div>

        {testResults && (
          <div className="space-y-6">
            <div className="p-6 bg-gray-900 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Test Results</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Overall Status:</h3>
                  <span className={`px-3 py-1 rounded ${
                    testResults.overall ? 'bg-green-600' : 'bg-red-600'
                  }`}>
                    {testResults.overall ? '✅ All Tests Passed' : '❌ Some Tests Failed'}
                  </span>
                </div>
                
                {testResults.health && (
                  <div>
                    <h3 className="font-semibold">Health Check:</h3>
                    <span className={`px-3 py-1 rounded ${
                      testResults.health.success ? 'bg-green-600' : 'bg-red-600'
                    }`}>
                      {testResults.health.success ? '✅ Passed' : '❌ Failed'}
                    </span>
                    {testResults.health.error && (
                      <p className="text-red-400 mt-2">Error: {testResults.health.error}</p>
                    )}
                  </div>
                )}
                
                {testResults.finance && (
                  <div>
                    <h3 className="font-semibold">Finance Endpoint:</h3>
                    <span className={`px-3 py-1 rounded ${
                      testResults.finance.success ? 'bg-green-600' : 'bg-red-600'
                    }`}>
                      {testResults.finance.success ? '✅ Passed' : '❌ Failed'}
                    </span>
                    {testResults.finance.error && (
                      <p className="text-red-400 mt-2">Error: {testResults.finance.error}</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 bg-gray-900 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Raw Results</h2>
              <pre className="bg-black p-4 rounded text-green-400 text-sm overflow-x-auto">
                {JSON.stringify(testResults, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
