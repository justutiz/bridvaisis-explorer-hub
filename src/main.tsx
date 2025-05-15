
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Google Tag Manager type definition
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Use the existing GTM configuration from index.html
// We're not initializing GTM here since it's already done in index.html
function gtag(...args: any[]) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}
window.gtag = gtag;

// Apply dark theme to document and add prefers-reduced-motion check
document.documentElement.classList.add('dark');
document.documentElement.style.colorScheme = 'dark';

// Set up motion preference detection
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  document.documentElement.classList.add('reduce-motion');
}

// Make sure text remains crisp
document.documentElement.style.fontSmooth = 'auto';
document.documentElement.style.WebkitFontSmoothing = 'antialiased';
document.documentElement.style.MozOsxFontSmoothing = 'grayscale';

createRoot(document.getElementById("root")!).render(<App />);
