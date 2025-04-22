import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number
  text?: string
}

export function Loader({ size = 24, text, className, ...props }: LoaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-[200px] gap-2",
        className
      )}
      {...props}
    >
      <Loader2 className="animate-spin" style={{ width: size, height: size }} />
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  )
} 