"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface RightSidebarContextType {
  content: ReactNode;
  setContent: (content: ReactNode) => void;
}

const RightSidebarContext = createContext<RightSidebarContextType | null>(null);

export function useRightSidebar() {
  const context = useContext(RightSidebarContext);
  if (!context) {
    throw new Error("useRightSidebar must be used within a RightSidebarProvider");
  }
  return context;
}

export function RightSidebarProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ReactNode>(null);

  return (
    <RightSidebarContext.Provider value={{ content, setContent }}>
      {children}
    </RightSidebarContext.Provider>
  );
}

export function RightSidebarContent() {
  const context = useContext(RightSidebarContext);
  return context?.content || null;
}
