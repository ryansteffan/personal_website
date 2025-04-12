import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Selects a random element from a list. If the list is empty, it returns undefined.
 * @template T - The type of the elements in the list.
 * @param list - The list to select a radom value from.
 * @returns - A random value from the list or undefined if the list is empty.
 */
export function SelectRandomListElement<T>(list: T[]): T | undefined {
  return list[Math.floor(Math.random() * list.length)];
}
