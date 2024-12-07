import { cn } from "@/lib/utils"

interface Props {
  number: number
  title: string
  disabled?: boolean
  last?: boolean
  children?: React.ReactNode
  className?: string // Add className as an optional prop
}

export function Stage({ number, title, disabled, last, children, className }: Props) {
  return (
    <section className={cn("bg-background text-foreground", className, disabled && "opacity-50")}>
      <div className="flex h-8 flex-row items-center">
        {/* The bullet point (circle) background */}
        <div className="mr-4 grid size-8 shrink-0 place-items-center rounded-full bg-muted text-center dark:bg-muted text-foreground">
          {number}
        </div>
        <h2 className="font-semibold text-foreground">{title}</h2>
      </div>
      <div
        className={cn(
          "border-l-1 ml-4 border-l border-muted py-6 pl-8",  // updated border color
          last && "border-transparent"
        )}
      >
        {children}
      </div>
    </section>
  )
}
