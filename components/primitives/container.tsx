import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

export function Container({
  size = "lg",
  className,
  ...props
}: ContainerProps) {
  const sizes = {
    sm: "max-w-screen-sm", // 640px
    md: "max-w-screen-md", // 768px
    lg: "max-w-screen-xl", // 1280px (Standard Desktop)
    xl: "max-w-screen-2xl", // 1536px (Ultra Wide)
    full: "max-w-none",
  };

  return (
    <div
      className={cn(
        "mx-auto w-full px-6 md:px-10 lg:px-16 container",
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
