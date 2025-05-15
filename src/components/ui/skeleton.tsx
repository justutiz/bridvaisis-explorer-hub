
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-shimmer rounded-md bg-gradient-to-r from-muted/20 via-muted/60 to-muted/20 bg-[length:400%_100%]", className)}
      {...props}
    />
  )
}

export { Skeleton }
