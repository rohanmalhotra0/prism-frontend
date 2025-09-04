"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function DataAddDel() {
  const [datasets, setDatasets] = useState<any[]>([]);

  // Fetch datasets list from API (later DB-backed)
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
    } else {
      alert("Upload failed");
    }
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/datasets/${id}`, { method: "DELETE" });
    if (res.ok) {
      setDatasets((prev) => prev.filter((d) => d.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload */}
      <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg">
        <Upload className="w-4 h-4" />
        Upload Dataset
        <input
          type="file"
          accept=".xlsx"
          className="hidden"
          onChange={handleUpload}
        />
      </label>

      {/* List */}
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
    </div>
  );
}
