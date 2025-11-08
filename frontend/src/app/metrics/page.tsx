"use client";
import React, { useState } from 'react';
import GradientBackground from '../components/GradientBars';
import InventoryChart from '../components/dashboard/InventoryChart';
import IngredientInsights from '../components/dashboard/IngredientInsights';
import PredictiveForecast from '../components/dashboard/PredictiveForecast';
import { Sidebar, SidebarBody, SidebarLink } from "../components/SideBar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { cn } from '../lib/utils';

// Sample data - replace with real data from your backend
const inventoryData = [
  { name: 'Rice', quantity: 150, unit: 'kg', reorderPoint: 100 },
  { name: 'Soy Sauce', quantity: 20, unit: 'L', reorderPoint: 30 },
  { name: 'Chicken', quantity: 45, unit: 'kg', reorderPoint: 50 },
  { name: 'Vegetables', quantity: 25, unit: 'kg', reorderPoint: 30 },
];

const ingredientUsageData = [
  { name: 'Rice', usageCount: 450, trend: 'up' as const, percentage: 15 },
  { name: 'Chicken', usageCount: 320, trend: 'stable' as const, percentage: 0 },
  { name: 'Soy Sauce', usageCount: 200, trend: 'down' as const, percentage: -5 },
  { name: 'Vegetables', usageCount: 280, trend: 'up' as const, percentage: 8 },
];

const forecastData = [
  {
    date: 'Tomorrow',
    expectedOrders: 120,
    predictedIngredients: [
      { name: 'Rice', amount: 25, unit: 'kg' },
      { name: 'Chicken', amount: 15, unit: 'kg' },
      { name: 'Soy Sauce', amount: 3, unit: 'L' },
      { name: 'Vegetables', amount: 8, unit: 'kg' },
    ],
  },
  {
    date: 'Next Week',
    expectedOrders: 850,
    predictedIngredients: [
      { name: 'Rice', amount: 175, unit: 'kg' },
      { name: 'Chicken', amount: 105, unit: 'kg' },
      { name: 'Soy Sauce', amount: 21, unit: 'L' },
      { name: 'Vegetables', amount: 56, unit: 'kg' },
    ],
  },
];

export default function MetricsPage() {
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-white" />
      ),
    },
    {
      label: "Metrics",
      href: "/metrics",
      icon: (
        <IconUserBolt className="h-5 w-5 shrink-0 text-white" />
      ),
    },
    {
      label: "Chatbot",
      href: "#",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-white" />
      ),
    },
    {
      label: "Back",
      href: "/",
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-white" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div className={cn(
        "flex w-full flex-1 flex-col overflow-hidden bg-black md:flex-row",
        "h-screen",
      )}>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>

      <main className="flex-1 overflow-auto">
        <div className="w-full max-w-7xl mx-auto p-6">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white">Restaurant Analytics</h1>
            <p className="text-gray-400 mt-2">Real-time insights and predictions</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <InventoryChart data={inventoryData} />
            </div>
            <div className="lg:col-span-1">
              <IngredientInsights data={ingredientUsageData} />
            </div>
            <div className="lg:col-span-1">
              <PredictiveForecast data={forecastData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
