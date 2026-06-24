'use client';

import { useEffect } from 'react';

export function ErrorBoundaryFix() {
  useEffect(() => {
    // Suppress the React 19 warning about next-themes script tag
    const originalError = console.error;
    console.error = (...args) => {
      if (typeof args[0] === 'string' && args[0].includes('Encountered a script tag while rendering React component')) {
        return; // Ignore this specific next-themes warning
      }
      originalError.call(console, ...args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  return null;
}
