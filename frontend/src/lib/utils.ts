import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...classes: (string | undefined | null | boolean)[]) {
    return classes.filter(Boolean).join(" ");
  }
  
export function cn2(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
