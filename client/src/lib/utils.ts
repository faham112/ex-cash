import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return `PKR ${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
}
