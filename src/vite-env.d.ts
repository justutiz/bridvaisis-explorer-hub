
/// <reference types="vite/client" />

// Add Google Analytics types
interface Window {
  gtag: (command: string, action: string, params: any) => void;
  dataLayer: any[];
}

