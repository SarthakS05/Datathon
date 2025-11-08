'use client';

import React from 'react';
import { cn } from '../../lib/utils';

interface ForecastData {
  date: string;
  expectedOrders: number;
  predictedIngredients: {
    name: string;
    amount: number;
    unit: string;
  }[];
}

interface PredictiveForecastProps {
  data: ForecastData[];
  className?: string;
}

export default function PredictiveForecast({ data, className }: PredictiveForecastProps) {
  return (
    <div className={cn("rounded-lg bg-white/5 p-4 backdrop-blur-lg", className)}>
      <h2 className="text-lg font-semibold text-white mb-4">Predictive Forecast</h2>
      <div className="space-y-6">
        {data.map((forecast, index) => (
          <div key={index} className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">{forecast.date}</span>
              <span className="text-emerald-500 font-semibold">
                {forecast.expectedOrders} orders
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {forecast.predictedIngredients.map((ingredient, idx) => (
                <div key={idx} className="text-sm">
                  <div className="text-gray-400">{ingredient.name}</div>
                  <div className="text-gray-300">
                    {ingredient.amount} {ingredient.unit}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}