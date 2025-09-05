"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { authenticatedFetch } from "@/lib/api-utils";
import { useAuth } from "@/lib/AuthProvider";
import { supabase } from "@/lib/supaBaseClient";

export default function DataAddDel() {
  const [datasets, setDatasets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();

  // Fetch datasets list from API
  useEffect(() => {
    if (user) {
      loadDatasets();
    }
  }, [user]);

  const loadDatasets = async () => {
    try {
      setLoading(true);
      const res = await authenticatedFetch("/api/datasets");
      if (res.ok) {
        const data = await res.json();
        setDatasets(data);
      } else {
        setError("Failed to load datasets");
      }
    } catch (err) {
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
      const res = await authenticatedFetch(`/api/datasets/${id}`, { 
        method: "DELETE" 
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
    <div className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-900/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Upload */}
      <label className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg transition ${
        uploading 
          ? "bg-gray-600 cursor-not-allowed text-gray-300" 
          : "bg-accent hover:bg-accent/80 text-white"
      }`}>
        <Upload className="w-4 h-4" />
        {uploading ? "Uploading..." : "Upload Dataset"}
        <input
          type="file"
          accept=".xlsx"
          className="hidden"
          onChange={handleUpload}
          disabled={uploading}
        />
      </label>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-accent"></div>
          <span className="ml-2 text-sm text-gray-400">Loading...</span>
        </div>
      ) : datasets.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-4">No datasets uploaded yet.</p>
      ) : (
        <ul className="space-y-3">
          {datasets.map((dataset) => (
            <li
              key={dataset.id}
              className="flex items-center justify-between border rounded-lg p-3"
            >
              <div>
                <p className="font-medium">{dataset.name}</p>
                <p className="text-sm text-gray-500">
                  {(dataset.size / (1024 * 1024)).toFixed(2)} MB •{" "}
                  {new Date(dataset.created_at || dataset.createdAt).toLocaleDateString()}
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(dataset.id)}
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
