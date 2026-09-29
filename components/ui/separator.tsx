import { cn } from "@/lib/utils";

export function Separator({ className }: { className?: string }) {
  return (
    <hr
      aria-hidden="true"
      className={cn("border-0 border-t border-border", className)}
    />
  );
}
