import React, { useState } from 'react';
import { ToolLayout, SEO } from '../../components';

const DateOffsetCalculator: React.FC = () => {
  const [baseDate, setBaseDate] = useState('');
  const [offset, setOffset] = useState<number | ''>('');
  const [resultDate, setResultDate] = useState<string>('');

  const calculate = () => {
    if (!baseDate || offset === '') return;
    const date = new Date(baseDate);
    date.setDate(date.getDate() + Number(offset));
    
    // Format YYYY-MM-DD
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    setResultDate(`${y}-${m}-${d}`);
  };

  return (
    <>
      <SEO 
        title="日期推算器" 
        description="计算几天后或几天前是哪一天。" 
        keywords="日期推算,几天后是几号,日期计算"
      />
      <ToolLayout
        title="日期推算器"
        description="计算指定日期向前或向后推算若干天后的日期。"
        explanation={
          <>
            <p>输入正数表示向后推算（如100天后），输入负数表示向前推算（如100天前）。</p>
          </>
        }
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700">基准日期</label>
              <input
                type="date"
                className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                value={baseDate}
                onChange={(e) => setBaseDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700">推算天数 (负数代表以前)</label>
              <input
                type="number"
                className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                placeholder="例如：100 或 -100"
                value={offset}
                onChange={(e) => setOffset(Number(e.target.value))}
              />
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            开始推算
          </button>

          {resultDate && (
            <div className="mt-8 p-6 bg-zinc-50 rounded-xl border border-zinc-200 text-center">
              <p className="text-sm text-zinc-500 mb-2">推算结果</p>
              <p className="text-3xl font-bold text-blue-600">
                {resultDate}
              </p>
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
};

export default DateOffsetCalculator;
