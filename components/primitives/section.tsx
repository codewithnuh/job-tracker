import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div" | "header" | "footer";
  spacing?: "sm" | "md" | "lg" | "none";
}

export function Section({
  as: Tag = "section",
  spacing = "md",
  className,
  ...props
}: SectionProps) {
  const spacings = {
    none: "py-0",
    sm: "py-12 md:py-16",
    md: "py-20 md:py-24 lg:py-32",
    lg: "py-24 md:py-32 lg:py-[120px]", // Your "Hero/Big" spacing
  };

  return <Tag className={cn(spacings[spacing], className)} {...props} />;
}
