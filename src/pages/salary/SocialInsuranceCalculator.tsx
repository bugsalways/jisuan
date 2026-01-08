import React, { useState } from 'react';
import { ToolLayout, SEO } from '../../components';

const SocialInsuranceCalculator: React.FC = () => {
  const [base, setBase] = useState<number | ''>('');
  const [housingRate, setHousingRate] = useState<number>(7); // Default 7%
  const [result, setResult] = useState<{
    personal: { pension: number; medical: number; unemployment: number; housing: number; total: number };
    company: { pension: number; medical: number; unemployment: number; injury: number; maternity: number; housing: number; total: number };
  } | null>(null);

  const calculate = () => {
    const val = Number(base);
    if (!val) return;

    // Rates (Simplified, varies by city)
    const rates = {
      personal: {
        pension: 0.08,
        medical: 0.02,
        unemployment: 0.005,
        housing: housingRate / 100
      },
      company: {
        pension: 0.16,
        medical: 0.10, // Some cities merge maternity
        unemployment: 0.005,
        injury: 0.002,
        maternity: 0.008,
        housing: housingRate / 100
      }
    };

    const personal = {
      pension: val * rates.personal.pension,
      medical: val * rates.personal.medical,
      unemployment: val * rates.personal.unemployment,
      housing: val * rates.personal.housing,
      total: 0
    };
    personal.total = personal.pension + personal.medical + personal.unemployment + personal.housing;

    const company = {
      pension: val * rates.company.pension,
      medical: val * rates.company.medical,
      unemployment: val * rates.company.unemployment,
      injury: val * rates.company.injury,
      maternity: val * rates.company.maternity,
      housing: val * rates.company.housing,
      total: 0
    };
    company.total = company.pension + company.medical + company.unemployment + company.injury + company.maternity + company.housing;

    setResult({ personal, company });
  };

  return (
    <>
      <SEO 
        title="五险一金计算器" 
        description="五险一金计算器，输入社保基数，自动计算个人与公司缴纳的养老、医疗、失业、工伤、生育保险及住房公积金。"
        keywords="五险一金,社保计算器,公积金计算,社保比例"
      />
      <ToolLayout
        title="五险一金计算器"
        description="输入社保缴费基数，计算个人和单位应缴纳的社保与公积金金额。"
        explanation={
          <>
            <p>此计算器使用常见比例估算，具体比例请以当地社保局规定为准。</p>
            <p>个人部分：养老8%，医疗2%，失业0.5%，公积金（可调整）。</p>
            <p>公司部分：养老16%，医疗10%，失业0.5%，工伤0.2%，生育0.8%，公积金（同个人）。</p>
          </>
        }
        faq={[
          {
            question: '什么是社保基数？',
            answer: '社保基数通常是上一年度的月平均工资。如果工资低于下限，按下限算；高于上限，按上限算。',
          },
          {
            question: '公积金比例是多少？',
            answer: '住房公积金缴存比例通常在5%-12%之间，由单位自主选择。',
          },
        ]}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="base" className="block text-sm font-medium text-zinc-700">
                社保缴费基数 (元)
              </label>
              <input
                type="number"
                id="base"
                className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                placeholder="例如：10000"
                value={base}
                onChange={(e) => setBase(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="housingRate" className="block text-sm font-medium text-zinc-700">
                公积金比例 (%)
              </label>
              <select
                id="housingRate"
                className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                value={housingRate}
                onChange={(e) => setHousingRate(Number(e.target.value))}
              >
                {[5, 6, 7, 8, 9, 10, 11, 12].map(r => (
                  <option key={r} value={r}>{r}%</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            开始计算
          </button>

          {result && (
            <div className="mt-8 space-y-6">
               <div className="p-6 bg-zinc-50 rounded-xl border border-zinc-200">
                 <h3 className="text-lg font-semibold text-zinc-900 mb-4">个人缴纳部分</h3>
                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                   <div><p className="text-xs text-zinc-500">养老</p><p className="font-medium">¥{result.personal.pension.toFixed(2)}</p></div>
                   <div><p className="text-xs text-zinc-500">医疗</p><p className="font-medium">¥{result.personal.medical.toFixed(2)}</p></div>
                   <div><p className="text-xs text-zinc-500">失业</p><p className="font-medium">¥{result.personal.unemployment.toFixed(2)}</p></div>
                   <div><p className="text-xs text-zinc-500">公积金</p><p className="font-medium">¥{result.personal.housing.toFixed(2)}</p></div>
                 </div>
                 <div className="mt-4 pt-4 border-t border-zinc-200">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-zinc-900">个人共计缴纳</span>
                      <span className="text-xl font-bold text-red-600">¥ {result.personal.total.toFixed(2)}</span>
                    </div>
                 </div>
               </div>

               <div className="p-6 bg-zinc-50 rounded-xl border border-zinc-200">
                 <h3 className="text-lg font-semibold text-zinc-900 mb-4">公司缴纳部分</h3>
                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                   <div><p className="text-xs text-zinc-500">养老</p><p className="font-medium">¥{result.company.pension.toFixed(2)}</p></div>
                   <div><p className="text-xs text-zinc-500">医疗</p><p className="font-medium">¥{result.company.medical.toFixed(2)}</p></div>
                   <div><p className="text-xs text-zinc-500">失业</p><p className="font-medium">¥{result.company.unemployment.toFixed(2)}</p></div>
                   <div><p className="text-xs text-zinc-500">工伤</p><p className="font-medium">¥{result.company.injury.toFixed(2)}</p></div>
                   <div><p className="text-xs text-zinc-500">生育</p><p className="font-medium">¥{result.company.maternity.toFixed(2)}</p></div>
                   <div><p className="text-xs text-zinc-500">公积金</p><p className="font-medium">¥{result.company.housing.toFixed(2)}</p></div>
                 </div>
                 <div className="mt-4 pt-4 border-t border-zinc-200">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-zinc-900">公司共计缴纳</span>
                      <span className="text-xl font-bold text-blue-600">¥ {result.company.total.toFixed(2)}</span>
                    </div>
                 </div>
               </div>
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
};

export default SocialInsuranceCalculator;
