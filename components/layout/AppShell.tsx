"use client";

import React from "react";
import { Sidebar, MobileTabBar } from "@/components/layout/Sidebar";
import { AppHeader } from "@/components/layout/AppHeader";

interface AppShellProps {
  children: React.ReactNode;
  showHeader?: boolean;
}

export function AppShell({ children, showHeader = true }: AppShellProps) {
  return (
    <div className="flex-1 flex flex-col min-h-0 bg-paper">
      {showHeader && <AppHeader />}
      <div className="flex-1 flex min-h-0">
        <Sidebar />
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 pb-20 md:pb-8 overflow-y-auto max-w-7xl">
          {children}
        </main>
      </div>
      <MobileTabBar />
    </div>
  );
}
