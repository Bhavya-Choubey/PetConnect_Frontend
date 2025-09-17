// src/components/ui/Toaster.jsx
import React from "react";
import { Toaster } from "sonner";

/**
 * Single place to render Sonner Toaster for the whole app.
 * Import this once in your app root (src/main.jsx).
 */
export default function AppToaster() {
  return <Toaster position="bottom-right" />;
}
