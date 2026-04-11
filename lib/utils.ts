import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge" // <--- Add this

export function cn(...inputs: ClassValue[]) {
  // Pass the result of clsx into twMerge
  return twMerge(clsx(inputs))
}
