"use client";

import { ReactNode } from "react";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

interface LayoutProps {
  children: ReactNode;
  title: string;
  description: string;
}

export default function Layout({ children, title, description }: LayoutProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved) {
      setIsDark(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDark));
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Mintaryx Tools
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              無料で使える便利ツール集
            </p>
          </div>

          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            aria-label="テーマ切り替え"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>

        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              © 2024 Mintaryx Tools. 広告収益で運営しています。
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <a
                href="/privacy"
                className="text-primary-600 hover:text-primary-700"
              >
                プライバシーポリシー
              </a>
              <a
                href="/terms"
                className="text-primary-600 hover:text-primary-700"
              >
                利用規約
              </a>
              <a
                href="/contact"
                className="text-primary-600 hover:text-primary-700"
              >
                お問い合わせ
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}