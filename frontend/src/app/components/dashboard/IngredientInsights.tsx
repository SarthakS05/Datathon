'use client';

import React from 'react';
import { cn } from '../../lib/utils';

interface IngredientUsage {
  name: string;
  usageCount: number;
  trend: 'up' | 'down' | 'stable';
  percentage: number;
}

interface IngredientInsightsProps {
  data: IngredientUsage[];
  className?: string;
}

export default function IngredientInsights({ data, className }: IngredientInsightsProps) {
  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return '↑';
      case 'down':
        return '↓';
      case 'stable':
        return '→';
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'text-emerald-500';
      case 'down':
        return 'text-red-500';
      case 'stable':
        return 'text-gray-500';
    }
  };

  return (
    <div className={cn("rounded-lg bg-white/5 p-4 backdrop-blur-lg", className)}>
      <h2 className="text-lg font-semibold text-white mb-4">Ingredient Usage</h2>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-gray-300">{item.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">
                  {item.usageCount} uses
                </span>
                <span className={cn("text-sm", getTrendColor(item.trend))}>
                  {getTrendIcon(item.trend)} {item.percentage}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}