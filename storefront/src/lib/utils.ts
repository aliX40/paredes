import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format price in TND (Tunisian Dinar)
 * @param amount - Price in millimes (e.g. 15900 = 15,900 TND)
 * @returns Formatted string like "15,900 TND"
 */
export function formatPrice(amount: number): string {
  const value = amount / 1000;
  return (
    value
      .toFixed(3)
      .replace(".", ",")
      + " TND"
  );
}

/**
 * Format a Tunisian phone number for display
 * @param phone - Raw phone string
 * @returns Formatted like "+216 XX XXX XXX"
 */
export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");

  if (digits.startsWith("216") && digits.length === 11) {
    const local = digits.slice(3);
    return `+216 ${local.slice(0, 2)} ${local.slice(2, 5)} ${local.slice(5)}`;
  }

  if (digits.length === 8) {
    return `+216 ${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
  }

  return phone;
}

/**
 * Validate a Tunisian phone number
 * Accepts: +216XXXXXXXX, 216XXXXXXXX, 0XXXXXXXX, XXXXXXXX
 * Tunisian mobile numbers start with 2, 3, 4, 5, 9
 */
export function validatePhone(phone: string): boolean {
  const digits = phone.replace(/[\s\-\(\)]/g, "");

  // +216 or 00216 prefix
  const withPrefixRegex = /^(\+?216|00216)[2-9]\d{7}$/;
  // Local format (8 digits starting with valid prefix)
  const localRegex = /^[2-9]\d{7}$/;

  return withPrefixRegex.test(digits) || localRegex.test(digits);
}
