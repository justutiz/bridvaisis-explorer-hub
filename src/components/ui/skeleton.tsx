
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  glass = false,
  gradient = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { 
  glass?: boolean;
  gradient?: boolean;
}) {
  return (
    <div
      className={cn(
        "animate-shimmer rounded-md",
        glass && "backdrop-blur-sm border border-white/10",
        gradient 
          ? "bg-gradient-to-r from-muted/5 via-muted/20 to-muted/5 bg-[length:400%_100%]" 
          : "bg-gradient-to-r from-muted/10 via-muted/30 to-muted/10 bg-[length:400%_100%]",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
