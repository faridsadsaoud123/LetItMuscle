import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export const parseJwt = (token: string): any => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ")
}

/**
 * Fusionne proprement des classes conditionnelles Tailwind.
 * @param inputs Chaînes de classes conditionnelles.
 * @returns Une chaîne unique de classes CSS fusionnées.
 */
export function cn2(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}