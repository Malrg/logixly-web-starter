import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function whatsappUrl(phone: string, message: string) {
  const normalizedPhone = phone.replace(/\D/g, "");
  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
}
