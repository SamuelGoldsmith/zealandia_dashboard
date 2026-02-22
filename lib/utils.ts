import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isValidUrl(string: string): boolean{
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

export function isKLayer(name: string): boolean{
  return name.toLowerCase().startsWith('k ')
}

export function trimKLayer(name: string): string{
  return name.substring(2)
}