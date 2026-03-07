"use client";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  async function analyze() {
    const res = await fetch("http://127.0.0.1:8000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    setResult(data);
  }

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">ZenMode</h1>

      <textarea
        className="w-full border p-3 rounded"
        placeholder="Write your journal entry..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={analyze}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Analyze Stress
      </button>

      {result && (
        <div className="mt-6">
          <p>Stress Level: {result.stress_level}</p>
          <p>Score: {result.score}</p>
        </div>
      )}
    </div>
  );
}
