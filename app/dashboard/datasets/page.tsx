"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import Navbar from "@/components/sections/navbar/default";
import Footer from "@/components/sections/footer/default";

export default function DatasetsPage() {
  const [datasets, setDatasets] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/datasets")
      .then((res) => res.json())
      .then((data) => setDatasets(data));
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/datasets/upload", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const dataset = await res.json();
      setDatasets((prev) => [...prev, dataset]);
    }
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/datasets/${id}`, { method: "DELETE" });
    if (res.ok) {
      setDatasets((prev) => prev.filter((d) => d.id !== id));
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1 container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold flex items-center gap-2 mb-8">
          📂 My Datasets
        </h1>

        {/* Upload */}
        <div className="mb-10">
          <label className="cursor-pointer inline-flex items-center gap-2 px-5 py-3 bg-purple-600 hover:bg-purple-700 transition text-white rounded-xl shadow-md">
            <Upload className="w-5 h-5" />
            Upload Dataset
            <input
              type="file"
              accept=".xlsx"
              className="hidden"
              onChange={handleUpload}
            />
          </label>
        </div>

        {/* Dataset list */}
        {datasets.length === 0 ? (
          <p className="text-gray-400">No datasets uploaded yet.</p>
        ) : (
          <ul className="space-y-4">
            {datasets.map((dataset) => (
              <li
                key={dataset.id}
                className="flex items-center justify-between bg-gray-800/60 border border-gray-700 rounded-xl p-4 shadow-sm hover:shadow-lg transition"
              >
                <div>
                  <p className="font-semibold">{dataset.name}</p>
                  <p className="text-sm text-gray-400">
                    {(dataset.size / (1024 * 1024)).toFixed(2)} MB •{" "}
                    {new Date(dataset.createdAt).toLocaleDateString()}
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
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
