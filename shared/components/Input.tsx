import { ChangeEvent } from "react";
import { clsx } from "clsx";

interface InputProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "number" | "email" | "password";
  placeholder?: string;
  required?: boolean;
  className?: string;
  error?: string;
}

export default function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
  className,
  error,
}: InputProps) {
  return (
    <div className={clsx("mb-4", className)}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={clsx(
          "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
          error
            ? "border-red-300 dark:border-red-600"
            : "border-gray-300 dark:border-gray-600",
          "bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        )}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}