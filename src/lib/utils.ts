import {clsx, type ClassValue} from 'clsx';
import {twMerge} from 'tailwind-merge';

// shadcn standart cn() — koşullu sınıflar + Tailwind çakışma çözümü.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
