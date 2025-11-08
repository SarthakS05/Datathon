"use client";
import React, { useState } from 'react';
import { Sidebar, SidebarBody, SidebarLink } from '../components/SideBar';
import Overview from '../components/overview';
import ExpenseReport from '../components/ExpenseReport';
import {
  IconChartBar,
  IconClipboardList,
  IconChevronLeft,
  IconBrandTabler,
  IconUserBolt,
  IconSettings,
  IconArrowLeft,
} from '@tabler/icons-react';
import { cn } from '../lib/utils';

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
    <div
      className={cn(
        "flex w-full flex-1 flex-col overflow-hidden bg-black md:flex-row",
        "h-screen",
      )}
    >
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


      <main className="flex-1 overflow-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Overview />
            <div className="mt-6">
              <ExpenseReport />
            </div>
          </div>

          <aside className="space-y-6">
            {/* Additional bento items: top ingredients, cost breakdown, quick actions */}
            <div className="p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/6">
              <h3 className="text-sm font-semibold mb-2">Top Ingredients</h3>
              <ul className="text-sm space-y-1 text-neutral-200">
                <li>Gochujang — 12kg / week</li>
                <li>Yuzu — 2.5L / month</li>
                <li>Bonito Flakes — 8kg / month</li>
              </ul>
            </div>

            <div className="p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/6">
              <h3 className="text-sm font-semibold mb-2">Cost Breakdown</h3>
              <div className="text-sm text-neutral-200">
                <div className="flex justify-between"><span>Ingredients</span><span>$5,420</span></div>
                <div className="flex justify-between"><span>Labor</span><span>$3,120</span></div>
                <div className="flex justify-between"><span>Rent</span><span>$2,000</span></div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
