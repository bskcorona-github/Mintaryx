import { ReactNode } from "react";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";

interface ResultDisplayProps {
  data: any;
  format?: "text" | "code" | "number";
  title?: string;
  copyable?: boolean;
  className?: string;
}

export default function ResultDisplay({
  data,
  format = "text",
  title,
  copyable = true,
  className,
}: ResultDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(String(data));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("コピーに失敗しました:", err);
    }
  };

  const formatData = () => {
    if (format === "number") {
      return typeof data === "number" ? data.toLocaleString() : data;
    }
    if (format === "code") {
      return <code className="font-mono text-sm">{String(data)}</code>;
    }
    return String(data);
  };

  return (
    <div
      className={clsx(
        "bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 p-6 rounded-xl border-l-4 border-primary-500",
        className
      )}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          {title && (
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              {title}
            </h4>
          )}
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatData()}
          </div>
        </div>

        {copyable && (
          <button
            onClick={handleCopy}
            className="ml-4 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-600"
            aria-label="結果をコピー"
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-600" />
            ) : (
              <Copy className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
