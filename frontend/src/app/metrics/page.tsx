"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [data, setData] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(console.error);
  }, []);

  if (!data) {
    return <div className="p-6">Loading…</div>;
  }

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-semibold">Dashboard Data Preview</h1>

      {Object.entries(data).map(([fileName, dataset]) => (
        <div key={fileName} className="border rounded p-4 space-y-4">
          <h2 className="text-xl font-medium">{fileName}</h2>

          {/* CSV or single-sheet XLSX (array of rows) */}
          {Array.isArray(dataset) && (
            <pre className="text-sm bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
              {JSON.stringify(dataset, null, 2)}
            </pre>
          )}

          {/* Multi-sheet XLSX (object where keys = sheet names) */}
          {!Array.isArray(dataset) && typeof dataset === "object" && dataset !== null && (
            <div className="space-y-6">
              {Object.entries(dataset as Record<string, any[]>).map(
                ([sheetName, rows]) => (
                  <div key={sheetName} className="space-y-2">
                    <h3 className="text-md font-medium">{sheetName}</h3>
                    <pre className="text-sm bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                      {JSON.stringify(rows, null, 2)}
                    </pre>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
