'use client';

import { useState } from 'react';
import FileUpload from './components/FileUpload';

export default function Home() {
  const [scoredLeads, setScoredLeads] = useState<Record<string, unknown>[]>([]);

  const handleUpload = async (data: Record<string, unknown>[]) => {
    const scored = await Promise.all(
      data.map(async (lead) => {
        const res = await fetch('/api/score', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lead }),
        });
        const result = await res.json();
        return { ...lead, score: result.score, reason: result.reason };
      })
    );
    setScoredLeads(scored);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">AI Lead Scoring Tool</h1>

      <FileUpload onData={handleUpload} />

      {scoredLeads.length > 0 && (
        <table className="mt-6 w-full border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100">
              {Object.keys(scoredLeads[0]).map((key) => (
                <th key={key} className="border px-2 py-1 text-left">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {scoredLeads.map((lead, idx) => (
              <tr key={idx} className="border-t">
                {Object.values(lead).map((value, i) => (
                  <td key={i} className="border px-2 py-1">{value as string}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
