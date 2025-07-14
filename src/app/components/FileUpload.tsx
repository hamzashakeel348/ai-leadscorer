'use client';

import { useState } from 'react';
import Papa from 'papaparse';

export default function FileUpload({ onData }: { onData: (data: Record<string, unknown>[]) => void }) {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        console.log('Parsed results:', results.data);
        onData(results.data as Record<string, unknown>[]);
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-6">
      <input type="file" accept=".csv" onChange={handleFileChange} />
      {fileName && <p className="mt-2 text-green-600">{fileName} uploaded</p>}
    </div>
  );
}
