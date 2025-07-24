import React from "react";
import { Spinner } from "@NicolasSancho/storybook-core";

/**
 * Reusable loading component with spinner and customizable message
 * @param {Object} props - Component props
 * @param {string} props.message - Loading message to display (default: "Loading...")
 * @param {boolean} props.fullScreen - Whether to use full screen height (default: true)
 * @param {string} props.className - Additional CSS classes
 */
export default function Loading({ 
  message = "Loading...", 
  fullScreen = true, 
  className = "" 
}) {
  const containerClasses = fullScreen 
    ? "min-h-screen flex items-center justify-center" 
    : "flex items-center justify-center py-12";

  return (
    <div className={`${containerClasses} ${className}`}>
      <div className="text-center">
        <Spinner />
        <p className="mt-4 text-gray-600">{message}</p>
      </div>
    </div>
  );
}
