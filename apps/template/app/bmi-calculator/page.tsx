"use client";

import { useState, useEffect } from "react";
import {
  Layout,
  Card,
  Input,
  Button,
  ResultDisplay,
} from "../../../../shared/components";
import {
  trackPageView,
  trackToolUsage,
} from "../../../../shared/utils/analytics";
import { saveUsageHistory } from "../../../../shared/utils/storage";

export default function BMICalculatorPage() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState("");

  useEffect(() => {
    trackPageView("BMI Calculator");
  }, []);

  const calculateBMI = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (!h || !w || h <= 0 || w <= 0) {
      alert("有効な身長と体重を入力してください");
      return;
    }

    // 身長をメートルに変換
    const heightInMeters = h / 100;
    const calculatedBMI = w / (heightInMeters * heightInMeters);

    setBmi(calculatedBMI);

    // BMI分類
    let bmiCategory = "";
    if (calculatedBMI < 18.5) {
      bmiCategory = "低体重";
    } else if (calculatedBMI < 25) {
      bmiCategory = "標準体重";
    } else if (calculatedBMI < 30) {
      bmiCategory = "肥満（1度）";
    } else {
      bmiCategory = "肥満（2度以上）";
    }

    setCategory(bmiCategory);

    // 使用記録
    const result = {
      bmi: calculatedBMI,
      category: bmiCategory,
    };

    saveUsageHistory("bmi_calculator", { height: h, weight: w }, result);
    trackToolUsage("bmi_calculator", true);
  };

  const reset = () => {
    setHeight("");
    setWeight("");
    setBmi(null);
    setCategory("");
  };

  return (
    <Layout
      title="BMI計算機"
      description="身長と体重を入力してBMI（Body Mass Index）を計算します。健康管理にお役立てください。"
    >
      <div className="max-w-2xl mx-auto space-y-6">
        {/* メイン計算カード */}
        <Card title="BMI計算">
          <div className="space-y-4">
            <Input
              label="身長 (cm)"
              type="number"
              value={height}
              onChange={setHeight}
              placeholder="例: 170"
              required
              id="height"
            />

            <Input
              label="体重 (kg)"
              type="number"
              value={weight}
              onChange={setWeight}
              placeholder="例: 65"
              required
              id="weight"
            />

            <div className="flex space-x-4">
              <Button onClick={calculateBMI} className="flex-1">
                計算する
              </Button>
              <Button onClick={reset} variant="secondary">
                リセット
              </Button>
            </div>
          </div>
        </Card>

        {/* 結果表示 */}
        {bmi && (
          <div className="space-y-4">
            <ResultDisplay
              data={bmi.toFixed(1)}
              format="number"
              title="あなたのBMI"
            />

            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <div className="text-center">
                <p className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  分類: {category}
                </p>
                <div className="text-sm text-blue-700 dark:text-blue-300">
                  <p>• 低体重: 18.5未満</p>
                  <p>• 標準体重: 18.5～25未満</p>
                  <p>• 肥満（1度）: 25～30未満</p>
                  <p>• 肥満（2度以上）: 30以上</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* 情報カード */}
        <Card title="BMIについて">
          <div className="text-gray-600 dark:text-gray-300 space-y-3">
            <p>
              BMI（Body Mass
              Index）は、身長と体重から算出される肥満度を表す指標です。
            </p>
            <p>
              <strong>計算式:</strong> BMI = 体重(kg) ÷ 身長(m)²
            </p>
            <p>
              日本肥満学会の基準に基づいて分類しています。健康管理の参考としてお使いください。
            </p>
          </div>
        </Card>

        {/* 広告スペース */}
        <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg text-center">
          <p className="text-gray-500 dark:text-gray-400">広告エリア</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
            AdSense広告がここに表示されます
          </p>
        </div>
      </div>
    </Layout>
  );
}
