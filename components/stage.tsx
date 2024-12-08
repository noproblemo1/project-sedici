import { cn } from "@/lib/utils";

interface Props {
  number: number;
  title: string;
  disabled?: boolean;
  last?: boolean;
  children?: React.ReactNode;
}

export function Stage({ number, title, disabled, last, children }: Props) {
  return (
    <section className={cn(disabled && "opacity-50")}>
      <div className="flex h-8 flex-row items-center">
        {/* Circle: Adjusted text and background colors for both light and dark modes */}
        <div
          className="mr-4 flex items-center justify-center h-8 w-8 rounded-full bg-foreground text-background 
            dark:bg-foreground dark:text-background"
        >
          {number}
        </div>
        <h2 className="font-semibold">{title}</h2>
      </div>
      <div
        className={cn(
          "border-l-2 ml-4 py-6 pl-8",
          "border-[hsl(var(--foreground))]",  // Connecting line color uses --foreground
          last && "border-transparent"
        )}
      >
        {children}
      </div>
    </section>
  );
}
