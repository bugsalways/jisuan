import React, { useState } from 'react';
import { ToolLayout, SEO } from '../../components';

const BonusTaxCalculator: React.FC = () => {
  const [bonus, setBonus] = useState<number | ''>('');
  const [result, setResult] = useState<{ tax: number; afterTax: number; rate: number; deduction: number } | null>(null);

  const calculate = () => {
    const val = Number(bonus);
    if (!val) return;

    // Year-end bonus tax calculation rule (divide by 12 to find rate)
    const monthlyAvg = val / 12;
    let rate = 0;
    let deduction = 0;

    if (monthlyAvg <= 3000) { rate = 0.03; deduction = 0; }
    else if (monthlyAvg <= 12000) { rate = 0.1; deduction = 210; }
    else if (monthlyAvg <= 25000) { rate = 0.2; deduction = 1410; }
    else if (monthlyAvg <= 35000) { rate = 0.25; deduction = 2660; }
    else if (monthlyAvg <= 55000) { rate = 0.3; deduction = 4410; }
    else if (monthlyAvg <= 80000) { rate = 0.35; deduction = 7160; }
    else { rate = 0.45; deduction = 15160; }

    const tax = val * rate - deduction;

    setResult({
      tax,
      afterTax: val - tax,
      rate,
      deduction
    });
  };

  return (
    <>
      <SEO 
        title="年终奖个税计算器" 
        description="2024年最新年终奖个人所得税计算器，一键计算年终奖个税及到手金额。"
        keywords="年终奖,年终奖个税,税后年终奖,个税计算器"
      />
      <ToolLayout
        title="年终奖个税计算器"
        description="输入年终奖金额，快速计算应缴纳的个人所得税及实际到手金额。"
        explanation={
          <>
            <p>本计算器采用全年一次性奖金个人所得税计算方法。</p>
            <p>计算公式：应纳税额 = 全年一次性奖金收入 × 适用税率 - 速算扣除数。</p>
            <p>适用税率：以全年一次性奖金收入除以12个月得到的数额，对照月度税率表确定。</p>
          </>
        }
        faq={[
          {
            question: '年终奖单独计税还是合并计税好？',
            answer: '一般情况下，单独计税更划算。但如果您的月薪低于起征点，合并计税可能更合适。本工具采用单独计税方式。',
          },
          {
            question: '年终奖个税怎么算的？',
            answer: '将年终奖除以12，根据结果查找对应的税率和速算扣除数，然后套用公式计算。',
          },
        ]}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="bonus" className="block text-sm font-medium text-zinc-700">
                年终奖金额 (元)
              </label>
              <input
                type="number"
                id="bonus"
                className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                placeholder="例如：50000"
                value={bonus}
                onChange={(e) => setBonus(Number(e.target.value))}
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
                  <p className="text-sm text-zinc-500">税后年终奖</p>
                  <p className="text-2xl font-bold text-green-600">
                    ¥ {result.afterTax.toFixed(2)}
                  </p>
                </div>
                <div>
                   <p className="text-sm text-zinc-500">适用税率</p>
                   <p className="text-lg font-medium text-zinc-900">{(result.rate * 100).toFixed(0)}%</p>
                </div>
                <div>
                   <p className="text-sm text-zinc-500">速算扣除数</p>
                   <p className="text-lg font-medium text-zinc-900">¥ {result.deduction}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
};

export default BonusTaxCalculator;
