import { ReactNode } from "react";
import { clsx } from "clsx";

interface CardProps {
  children: ReactNode;
  title?: string;
  isLoading?: boolean;
  className?: string;
}

export default function Card({
  children,
  title,
  isLoading = false,
  className,
}: CardProps) {
  return (
    <div
      className={clsx(
        "bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6",
        isLoading && "opacity-50 pointer-events-none",
        className
      )}
    >
      {title && (
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {title}
        </h3>
      )}
      {children}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-800 bg-opacity-75 rounded-xl">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      )}
    </div>
  );
}
