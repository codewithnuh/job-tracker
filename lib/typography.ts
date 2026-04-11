export const t = {
  // --- Headers ---
  // Large Hero text: High contrast (foreground)
  display:
    "text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight leading-tight text-foreground",

  // Section Titles: High contrast
  headline:
    "text-4xl sm:text-5xl font-bold tracking-tight leading-snug text-foreground",

  // Sub-sections: High contrast
  title: "text-2xl sm:text-3xl font-semibold leading-normal text-foreground",

  // Feature/Card Titles
  subtitle: "text-xl sm:text-2xl font-medium leading-relaxed text-foreground",

  // --- Body & Utility ---
  // Standard reading text: Uses muted-foreground for better visual hierarchy
  body: "text-base sm:text-lg text-muted-foreground leading-relaxed",

  // Small descriptors or "Fine Print"
  caption: "text-sm text-muted-foreground/80 leading-normal",

  // Labels (e.g., small text above a title): Uses primary color for a pop of branding
  label: "text-xs font-bold uppercase tracking-widest text-primary",

  // Inline links or emphasized spans
  link: "font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors",

  // Interactive elements
  button: "text-sm sm:text-base font-semibold tracking-wide",
};
