"use client";

import { forwardRef, useState, type ChangeEvent } from "react";
import { cn } from "@/lib/utils";
import { validatePhone } from "@/lib/utils";

interface PhoneInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  className?: string;
}

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    { label = "Numéro de téléphone", value, onChange, error, className },
    ref
  ) => {
    const [touched, setTouched] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      let raw = e.target.value;
      // Allow only digits, spaces, plus sign
      raw = raw.replace(/[^\d\s+]/g, "");
      onChange(raw);
    };

    const handleBlur = () => {
      setTouched(true);
    };

    const showError =
      error || (touched && value.length > 0 && !validatePhone(value));
    const errorMessage =
      error || "Numéro invalide. Format attendu : +216 XX XXX XXX";

    return (
      <div className="w-full">
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-text-dark mb-1.5"
        >
          {label}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
            <span className="text-sm text-text font-medium">🇹🇳</span>
          </div>
          <input
            ref={ref}
            id="phone"
            type="tel"
            inputMode="numeric"
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="+216 XX XXX XXX"
            className={cn(
              "block w-full rounded-lg border pl-12 pr-4 py-2.5 text-sm text-text-dark",
              "placeholder:text-text/50",
              "transition-colors duration-150",
              "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
              showError
                ? "border-error bg-red-50 focus:ring-error/30 focus:border-error"
                : "border-border bg-white hover:border-primary/40",
              className
            )}
            aria-invalid={showError ? "true" : undefined}
            aria-describedby={showError ? "phone-error" : undefined}
          />
        </div>
        {showError && (
          <p id="phone-error" className="mt-1.5 text-sm text-error">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";
export default PhoneInput;
