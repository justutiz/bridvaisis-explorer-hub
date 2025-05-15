
"use client"

import * as React from "react"
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"
import { cn } from "@/lib/utils"

const AspectRatio = React.forwardRef<
  React.ElementRef<typeof AspectRatioPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root> & {
    glass?: boolean;
  }
>(({ className, glass, ...props }, ref) => (
  <AspectRatioPrimitive.Root
    ref={ref}
    className={cn(
      className,
      glass && "backdrop-blur-md bg-white/5 border border-white/10 shadow-xl rounded-lg overflow-hidden"
    )}
    {...props}
  />
))
AspectRatio.displayName = "AspectRatio"

export { AspectRatio }
