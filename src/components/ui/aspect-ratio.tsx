
"use client"

import * as React from "react"
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"
import { cn } from "@/lib/utils"

const AspectRatio = React.forwardRef<
  React.ElementRef<typeof AspectRatioPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root> & {
    glass?: boolean;
    gradient?: boolean;
  }
>(({ className, glass, gradient, ...props }, ref) => (
  <AspectRatioPrimitive.Root
    ref={ref}
    className={cn(
      className,
      glass && "backdrop-blur-md bg-white/5 border border-white/10 shadow-xl rounded-lg overflow-hidden",
      gradient && "bg-gradient-to-br from-white/10 via-white/5 to-transparent"
    )}
    {...props}
  />
))
AspectRatio.displayName = "AspectRatio"

export { AspectRatio }
