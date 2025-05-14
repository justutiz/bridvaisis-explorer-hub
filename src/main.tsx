
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
  window.dataLayer.push(args);
}
window.gtag = gtag;

// Pritaikome tamsią temą dokumentui
document.documentElement.classList.add('dark');

createRoot(document.getElementById("root")!).render(<App />);
