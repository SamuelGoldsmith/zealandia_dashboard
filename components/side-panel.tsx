"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export function SidePanel({
    children,
    className,
  ...props
}:{ children: React.ReactNode, className?: string } & React.HTMLAttributes<HTMLDivElement>){
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex fixed bottom-4 right-4 lg:top-20 lg:left-4 lg:right-auto lg:bottom-auto z-50 p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
        <h1 className="ml-2">Menu</h1>
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:relative left-0 top-0 h-screen lg:h-auto bg-primary border-r border-deep-brown rounded-sm z-40 transition-all duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0 min-w-64 p-4" : "-translate-x-full lg:translate-x-0 w-64 lg:w-0 overflow-hidden"
        }`}
      >
        {children}
      </div>
    </>
  );
}

