import { cn } from "@/lib/utils";

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "col";
  gap?: "xs" | "sm" | "md" | "lg" | "xl" | "none";
  align?: "start" | "center" | "end" | "baseline";
}

export function Stack({
  direction = "col",
  gap = "md",
  align,
  className,
  ...props
}: StackProps) {
  const gaps = {
    none: "gap-0",
    xs: "gap-2",
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-10",
    xl: "gap-16",
  };

  const alignments = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    baseline: "items-baseline",
  };

  return (
    <div
      className={cn(
        "flex",
        direction === "col" ? "flex-col" : "flex-row",
        gaps[gap],
        align && alignments[align],
        className,
      )}
      {...props}
    />
  );
}
