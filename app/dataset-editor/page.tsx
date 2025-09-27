"use client";

import Navbar from "@/components/sections/navbar/default";
import DatasetEditor from "../general/components/DatasetEditor";

export default function DatasetEditorPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* NAVBAR */}
      <Navbar />

      {/* Main Interface */}
      <div className="pt-20">
        <DatasetEditor />
      </div>
    </div>
  );
}
