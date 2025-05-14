
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

// Initialize Google Tag Manager dataLayer
window.dataLayer = window.dataLayer || [];
function gtag(...args: any[]) {
  window.dataLayer.push(args);
}
window.gtag = gtag;

// Initialize GTM with a default config
gtag('js', new Date());
gtag('config', 'G-XHHTZGK86K'); // Updated with actual Google Tag Manager ID

// Pritaikome tamsią temą dokumentui
document.documentElement.classList.add('dark');

createRoot(document.getElementById("root")!).render(<App />);
