'use client';

import React from 'react';
import { cn } from '../../lib/utils';

interface InventoryItem {
  name: string;
  quantity: number;
  unit: string;
  reorderPoint: number;
}

interface InventoryChartProps {
  data: InventoryItem[];
  className?: string;
}

export default function InventoryChart({ data, className }: InventoryChartProps) {
  return (
    <div className={cn("rounded-lg bg-white/5 p-4 backdrop-blur-lg", className)}>
      <h2 className="text-lg font-semibold text-white mb-4">Inventory Status</h2>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm text-gray-300">
              <span>{item.name}</span>
              <span>{`${item.quantity} ${item.unit}`}</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  item.quantity <= item.reorderPoint
                    ? "bg-red-500"
                    : "bg-emerald-500"
                )}
                style={{
                  width: `${Math.min(
                    (item.quantity / item.reorderPoint) * 100,
                    100
                  )}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}