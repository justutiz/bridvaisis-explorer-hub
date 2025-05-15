
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-shimmer rounded-md bg-gradient-to-r from-muted/10 via-muted/30 to-muted/10 bg-[length:400%_100%]",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
