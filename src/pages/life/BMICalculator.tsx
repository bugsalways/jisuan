import React, { useState } from 'react';
import { ToolLayout, SEO } from '../../components';

const BMICalculator: React.FC = () => {
  const [height, setHeight] = useState<number | ''>('');
  const [weight, setWeight] = useState<number | ''>('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [status, setStatus] = useState<string>('');

  const calculate = () => {
    const h = Number(height) / 100; // cm to m
    const w = Number(weight);
    if (!h || !w) return;

    const val = w / (h * h);
    setBmi(val);

    // China Standard
    if (val < 18.5) setStatus('偏瘦');
    else if (val < 24) setStatus('正常');
    else if (val < 28) setStatus('超重');
    else setStatus('肥胖');
  };

  return (
    <>
      <SEO 
        title="BMI 计算器" 
        description="在线 BMI 身体质量指数计算器，输入身高体重，快速评估健康状况（中国标准）。" 
        keywords="BMI计算,身体质量指数,健康计算器,减肥计算"
      />
      <ToolLayout
        title="BMI 计算器"
        description="输入身高和体重，计算身体质量指数 (BMI)。"
        explanation={
          <>
            <p>BMI = 体重(kg) ÷ 身高(m)²</p>
            <p>中国成人 BMI 标准：</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>&lt; 18.5：偏瘦</li>
              <li>18.5 - 23.9：正常</li>
              <li>24.0 - 27.9：超重</li>
              <li>≥ 28.0：肥胖</li>
            </ul>
          </>
        }
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700">身高 (cm)</label>
              <input
                type="number"
                className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                placeholder="例如：175"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700">体重 (kg)</label>
              <input
                type="number"
                className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                placeholder="例如：65"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
              />
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            开始计算
          </button>

          {bmi !== null && (
            <div className="mt-8 p-6 bg-zinc-50 rounded-xl border border-zinc-200 text-center">
              <p className="text-sm text-zinc-500 mb-2">您的 BMI 指数</p>
              <p className={`text-4xl font-bold mb-2 ${
                  status === '正常' ? 'text-green-600' : 
                  status === '偏瘦' ? 'text-yellow-500' : 'text-red-500'
                }`}>
                {bmi.toFixed(1)}
              </p>
              <p className="text-lg font-medium text-zinc-700">
                身体状况：{status}
              </p>
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
};

export default BMICalculator;
