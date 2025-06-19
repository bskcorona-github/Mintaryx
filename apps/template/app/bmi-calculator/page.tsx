'use client';

import { useState, useEffect } from 'react';
import {
  Layout,
  Card,
  Input,
  Button,
  ResultDisplay,
} from '../../../../shared/components';
import { trackPageView, trackToolUsage } from '../../../../shared/utils/analytics';
import { saveUsageHistory } from '../../../../shared/utils/storage';

export default function BMICalculatorPage() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState('');

  useEffect(() => {
    trackPageView('BMI Calculator');
  }, []);

  const calculateBMI = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (!h || !w || h <= 0 || w <= 0) {
      alert('有効な身長と体重を入力してください');
      return;
    }

    // 身長をメートルに変換
    const heightInMeters = h / 100;
    const calculatedBMI = w / (heightInMeters * heightInMeters);
    
    setBmi(calculatedBMI);
    
    // BMI分類を決定
    let bmiCategory = '';
    if (calculatedBMI < 18.5) {
      bmiCategory = '低体重';
    } else if (calculatedBMI < 25) {
      bmiCategory = '標準体重';
    } else if (calculatedBMI < 30) {
      bmiCategory = '肥満度1';
    } else if (calculatedBMI < 35) {
      bmiCategory = '肥満度2';
    } else {
      bmiCategory = '肥満度3';
    }
    
    setCategory(bmiCategory);
    
    // Analytics追跡と履歴保存
    trackToolUsage('bmi_calculator', { bmi: calculatedBMI, category: bmiCategory });
    saveUsageHistory('bmi_calculator', {
      height: h,
      weight: w,
      bmi: calculatedBMI,
      category: bmiCategory,
      timestamp: Date.now(),
    });
  };

  const getBMIColor = (bmiValue: number) => {
    if (bmiValue < 18.5) return 'text-blue-600';
    if (bmiValue < 25) return 'text-green-600';
    if (bmiValue < 30) return 'text-yellow-600';
    if (bmiValue < 35) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <Layout
      title="BMI計算機"
      description="身長と体重からBMI（Body Mass Index）を簡単に計算できます"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 入力エリア */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            BMI計算
          </h3>
          
          <Input
            label="身長 (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            type="number"
            placeholder="例: 170"
          />
          
          <Input
            label="体重 (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            type="number"
            placeholder="例: 65"
          />
          
          <Button
            onClick={calculateBMI}
            className="w-full"
            disabled={!height || !weight}
          >
            BMIを計算
          </Button>
        </Card>

        {/* 結果エリア */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            計算結果
          </h3>
          
          {bmi !== null ? (
            <div className="space-y-4">
              <ResultDisplay
                label="BMI値"
                value={bmi.toFixed(1)}
                copyable={true}
                className={getBMIColor(bmi)}
              />
              
              <ResultDisplay
                label="分類"
                value={category}
                copyable={false}
              />
              
              {/* BMI分類表 */}
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  BMI分類基準
                </h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>低体重:</span>
                    <span className="text-blue-600">18.5未満</span>
                  </div>
                  <div className="flex justify-between">
                    <span>標準体重:</span>
                    <span className="text-green-600">18.5-24.9</span>
                  </div>
                  <div className="flex justify-between">
                    <span>肥満度1:</span>
                    <span className="text-yellow-600">25.0-29.9</span>
                  </div>
                  <div className="flex justify-between">
                    <span>肥満度2:</span>
                    <span className="text-orange-600">30.0-34.9</span>
                  </div>
                  <div className="flex justify-between">
                    <span>肥満度3:</span>
                    <span className="text-red-600">35.0以上</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              身長と体重を入力して「BMIを計算」ボタンを押してください
            </div>
          )}
        </Card>
      </div>

      {/* AdSense広告エリア */}
      <Card className="mt-8 p-8">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p className="text-sm">広告エリア</p>
          <p className="text-xs mt-1">AdSense広告がここに表示されます</p>
        </div>
      </Card>
    </Layout>
  );
}