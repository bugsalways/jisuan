import React, { useState } from 'react';
import { ToolLayout, SEO } from '../../components';

const DateDifference: React.FC = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [diff, setDiff] = useState<number | null>(null);

  const calculate = () => {
    if (!startDate || !endDate) return;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    setDiff(diffDays);
  };

  return (
    <>
      <SEO 
        title="日期差计算器" 
        description="在线计算两个日期之间相差多少天，支持计算纪念日、倒数日等。" 
        keywords="日期计算,日期差,天数计算,相差几天"
      />
      <ToolLayout
        title="日期差计算器"
        description="计算两个日期之间相隔的天数。"
        explanation={
          <>
            <p>输入开始日期和结束日期，即可计算出两个日期之间相差的自然日天数。</p>
          </>
        }
        faq={[
          {
            question: '包含开始和结束当天吗？',
            answer: '通常计算的是两个时间点之间的间隔天数。例如1号到2号，间隔是1天。',
          },
        ]}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="startDate" className="block text-sm font-medium text-zinc-700">
                开始日期
              </label>
              <input
                type="date"
                id="startDate"
                className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="endDate" className="block text-sm font-medium text-zinc-700">
                结束日期
              </label>
              <input
                type="date"
                id="endDate"
                className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            计算天数
          </button>

          {diff !== null && (
            <div className="mt-8 p-6 bg-zinc-50 rounded-xl border border-zinc-200 text-center">
               <p className="text-sm text-zinc-500 mb-2">两个日期相差</p>
               <p className="text-4xl font-bold text-blue-600">
                 {diff} <span className="text-xl text-zinc-600 font-normal">天</span>
               </p>
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
};

export default DateDifference;
