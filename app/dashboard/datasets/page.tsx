"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import Navbar from "@/components/sections/navbar/default";
import Footer from "@/components/sections/footer/default";
import { useAuth } from "@/lib/AuthProvider";
import { supabase } from "@/lib/supaBaseClient";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

function DatasetsContent() {
  const [datasets, setDatasets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadDatasets();
    }
  }, [user]);

  const loadDatasets = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get auth headers
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        setError("Please sign in to view datasets");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/datasets", {
        headers: {
          "Authorization": `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
        },
      });
      
      if (res.ok) {
        const data = await res.json();
        setDatasets(data);
      } else {
        const errorData = await res.json();
        setError(errorData.error || "Failed to load datasets");
      }
    } catch (err) {
      console.error("Error loading datasets:", err);
      setError("Failed to load datasets");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      setError(null);
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        setError("Please sign in to upload datasets");
        return;
      }

      const res = await fetch("/api/datasets/upload", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${session.access_token}`,
        },
        body: formData,
      });

      if (res.ok) {
        const dataset = await res.json();
        setDatasets((prev) => [dataset, ...prev]);
      } else {
        const errorData = await res.json();
        setError(errorData.error || "Upload failed");
      }
    } catch (err) {
      setError("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setError(null);
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        setError("Please sign in to delete datasets");
        return;
      }

      const res = await fetch(`/api/datasets/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${session.access_token}`,
        },
      });
      
      if (res.ok) {
        setDatasets((prev) => prev.filter((d) => d.id !== id));
      } else {
        const errorData = await res.json();
        setError(errorData.error || "Delete failed");
      }
    } catch (err) {
      setError("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.15)_0%,rgba(0,0,0,1)_85%)]" />
      
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="relative z-10 flex-1 container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-4">
            My Datasets
          </h1>
          <p className="text-muted-foreground text-lg">
            Upload and manage your data files
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/50 rounded-xl text-destructive">
            {error}
          </div>
        )}

        {/* Upload */}
        <div className="mb-10">
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-card-foreground mb-4 flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                📤
              </div>
              Upload New Dataset
            </h2>
            <label className={`cursor-pointer inline-flex items-center gap-3 px-6 py-3 transition text-white rounded-xl shadow-md ${
              uploading 
                ? "bg-muted cursor-not-allowed" 
                : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            }`}>
              <Upload className="w-5 h-5" />
              {uploading ? "Uploading..." : "Choose Excel File (.xlsx)"}
              <input
                type="file"
                accept=".xlsx"
                className="hidden"
                onChange={handleUpload}
                disabled={uploading}
              />
            </label>
            <p className="text-sm text-muted-foreground mt-2">
              Only .xlsx files up to 10MB are allowed
            </p>
          </div>
        </div>

        {/* Dataset list */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
              <span className="text-muted-foreground">Loading datasets...</span>
            </div>
          </div>
        ) : datasets.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              •
            </div>
            <p className="text-muted-foreground text-lg mb-2">No datasets uploaded yet</p>
            <p className="text-muted-foreground/70 text-sm">Upload your first dataset to get started!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {datasets.map((dataset) => (
              <div
                key={dataset.id}
                className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                      •
                    </div>
                    <div>
                      <h3 className="font-semibold text-card-foreground text-lg">{dataset.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {(dataset.size / (1024 * 1024)).toFixed(2)} MB •{" "}
                        {new Date(dataset.created_at || dataset.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(dataset.id)}
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function DatasetsPage() {
  return (
    <ProtectedRoute>
      <DatasetsContent />
    </ProtectedRoute>
  );
}
