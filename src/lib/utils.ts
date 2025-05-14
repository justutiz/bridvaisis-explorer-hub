
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Added utility functions for lake color themes
export const getLakeGradient = (variant: 'blue' | 'teal' = 'blue', opacity: number = 1) => {
  const gradients = {
    blue: `linear-gradient(to right, rgba(0, 102, 175, ${opacity}), rgba(51, 133, 191, ${opacity}))`,
    teal: `linear-gradient(to right, rgba(0, 175, 175, ${opacity}), rgba(51, 191, 191, ${opacity}))`
  };
  
  return gradients[variant];
}

