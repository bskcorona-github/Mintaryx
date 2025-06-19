"use client";

import { Card, Button } from "../../../shared/components";
import { trackEvent } from "../../../shared/utils/analytics";

const tools = [
  {
    id: "bmi-calculator",
    title: "BMI計算機",
    description: "身長と体重からBMI（Body Mass Index）を計算します",
    category: "健康・医療",
    icon: "⚖️",
    href: "/bmi-calculator",
    tags: ["健康", "BMI", "体重管理"],
  },
  {
    id: "password-generator",
    title: "パスワード生成器",
    description: "安全で強力なパスワードを自動生成します",
    category: "セキュリティ",
    icon: "🔐",
    href: "/password-generator",
    tags: ["セキュリティ", "パスワード"],
    comingSoon: true,
  },
  {
    id: "qr-code-generator",
    title: "QRコード生成器",
    description: "テキストやURLからQRコードを生成します",
    category: "ユーティリティ",
    icon: "📱",
    href: "/qr-generator",
    tags: ["QR", "コード生成"],
    comingSoon: true,
  },
  {
    id: "color-palette",
    title: "カラーパレット生成器",
    description: "美しいカラーパレットを自動生成します",
    category: "デザイン",
    icon: "🎨",
    href: "/color-palette",
    tags: ["カラー", "デザイン"],
    comingSoon: true,
  },
];

const categories = [
  "すべて",
  "健康・医療",
  "セキュリティ",
  "ユーティリティ",
  "デザイン",
];

export default function HomePage() {
  const handleToolClick = (toolId: string, href: string) => {
    trackEvent("tool_access", { tool_id: toolId });
    if (!tools.find((t) => t.id === toolId)?.comingSoon) {
      window.location.href = href;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* ヒーローセクション */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Mintaryx Tools
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
          無料で使える便利ツール集
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          日常業務を効率化する30以上のツールを提供しています
        </p>
      </div>

      {/* カテゴリーフィルター */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <Button
            key={category}
            variant="secondary"
            onClick={() => {
              // フィルター機能は後で実装
              trackEvent("category_filter", { category });
            }}
            className="text-sm px-4 py-2"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* ツール一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${
              tool.comingSoon ? "opacity-60" : ""
            }`}
            onClick={() => handleToolClick(tool.id, tool.href)}
          >
            <Card>
              <div className="p-6">
                {/* アイコンとタイトル */}
                <div className="flex items-center mb-3">
                  <span className="text-3xl mr-3">{tool.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                      {tool.title}
                    </h3>
                    {tool.comingSoon && (
                      <span className="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </div>

                {/* 説明 */}
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {tool.description}
                </p>

                {/* カテゴリー */}
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                    {tool.category}
                  </span>
                </div>

                {/* タグ */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* 統計情報 */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center p-6">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {tools.filter((t) => !t.comingSoon).length}
          </div>
          <div className="text-gray-600 dark:text-gray-300">利用可能ツール</div>
        </Card>
        <Card className="text-center p-6">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
            100%
          </div>
          <div className="text-gray-600 dark:text-gray-300">無料</div>
        </Card>
        <Card className="text-center p-6">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
            {categories.length - 1}
          </div>
          <div className="text-gray-600 dark:text-gray-300">カテゴリー</div>
        </Card>
      </div>

      {/* AdSense広告エリア */}
      <div className="mt-12">
        <Card className="p-8">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <p className="text-sm">広告エリア</p>
            <p className="text-xs mt-1">AdSense広告がここに表示されます</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
