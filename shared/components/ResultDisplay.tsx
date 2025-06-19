import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { clsx } from 'clsx';

interface ResultDisplayProps {
  label: string;
  value: string;
  copyable?: boolean;
  className?: string;
}

export default function ResultDisplay({
  label,
  value,
  copyable = false,
  className,
}: ResultDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!copyable) return;
    
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {label}
          </p>
          <p className={clsx('text-lg font-semibold', className || 'text-gray-900 dark:text-white')}>
            {value}
          </p>
        </div>
        
        {copyable && (
          <button
            onClick={handleCopy}
            className="ml-4 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            title="コピー"
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}