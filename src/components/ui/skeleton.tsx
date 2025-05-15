
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  glass = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { glass?: boolean }) {
  return (
    <div
      className={cn(
        "animate-shimmer rounded-md bg-gradient-to-r from-muted/10 via-muted/30 to-muted/10 bg-[length:400%_100%]",
        glass && "backdrop-blur-sm border border-white/10",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
