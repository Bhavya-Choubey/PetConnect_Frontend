"use client";

import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  // Get theme from document class
  const isDarkMode = document.documentElement.classList.contains("dark");
  const theme = isDarkMode ? "dark" : "light";

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      style={{
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
      }}
      {...props}
    />
  );
};

export { Toaster };
