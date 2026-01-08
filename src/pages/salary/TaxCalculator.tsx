import React, { useState } from 'react';
import { ToolLayout, SEO } from '../../components';

const TaxCalculator: React.FC = () => {
  const [income, setIncome] = useState<number | ''>('');
  const [result, setResult] = useState<{ tax: number; afterTax: number } | null>(null);

  const calculate = () => {
    const val = Number(income);
    if (!val) return;
    
    // Simplified logic for demo purposes (Standard deduction 5000)
    // In real app, this should be more complex
    const taxable = Math.max(0, val - 5000);
    let tax = 0;
    
    if (taxable <= 3000) tax = taxable * 0.03;
    else if (taxable <= 12000) tax = taxable * 0.1 - 210;
    else if (taxable <= 25000) tax = taxable * 0.2 - 1410;
    else if (taxable <= 35000) tax = taxable * 0.25 - 2660;
    else if (taxable <= 55000) tax = taxable * 0.3 - 4410;
    else if (taxable <= 80000) tax = taxable * 0.35 - 7160;
    else tax = taxable * 0.45 - 15160;

    setResult({
      tax,
      afterTax: val - tax
    });
  };

  return (
    <>
      <SEO 
        title="税后工资计算器" 
        description="2024年最新个人所得税计算器，输入税前工资，一键计算个税、社保及税后到手收入。"
        keywords="税后工资,个税计算器,2024个税,工资计算器"
      />
      <ToolLayout
        title="税后工资计算器"
        description="输入税前工资，快速计算个人所得税及税后到手收入。"
        explanation={
          <>
            <p>本计算器采用2024年最新个人所得税税率表进行计算。</p>
            <p>起征点：5000元。</p>
            <p>注：此计算仅为估算，未包含社保公积金扣除项，仅供参考。</p>
          </>
        }
        faq={[
          {
            question: '起征点是多少？',
            answer: '目前个人所得税起征点为每月5000元。',
          },
          {
            question: '如何计算个税？',
            answer: '应纳税所得额 = 税前工资 - 5000 - 五险一金 - 专项附加扣除。应纳税额 = 应纳税所得额 × 适用税率 - 速算扣除数。',
          },
        ]}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="income" className="block text-sm font-medium text-zinc-700">
                税前月收入 (元)
              </label>
              <input
                type="number"
                id="income"
                className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                placeholder="例如：10000"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
              />
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            开始计算
          </button>

          {result && (
            <div className="mt-8 p-6 bg-zinc-50 rounded-xl border border-zinc-200">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-zinc-500">应纳税额</p>
                  <p className="text-2xl font-bold text-red-600">
                    ¥ {result.tax.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">税后收入</p>
                  <p className="text-2xl font-bold text-green-600">
                    ¥ {result.afterTax.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
};

export default TaxCalculator;
