import React, { useState } from 'react';
import { ToolLayout, SEO } from '../../components';

const WorkdayCalculator: React.FC = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [workDays, setWorkDays] = useState<number | null>(null);

  const calculate = () => {
    if (!startDate || !endDate) return;
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start > end) {
        setWorkDays(0);
        return;
    }

    let count = 0;
    const cur = new Date(start);
    while (cur <= end) {
      const dayOfWeek = cur.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        count++;
      }
      cur.setDate(cur.getDate() + 1);
    }
    setWorkDays(count);
  };

  return (
    <>
      <SEO 
        title="工作日计算器" 
        description="在线计算两个日期之间的工作日天数，自动排除周末。" 
        keywords="工作日计算,工作日天数,排除周末"
      />
      <ToolLayout
        title="工作日计算器"
        description="计算两个日期之间的工作日天数（自动排除周六日）。"
        explanation={
          <>
            <p>此工具仅计算周一至周五的天数，暂未包含法定节假日调休数据。</p>
          </>
        }
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700">开始日期</label>
              <input
                type="date"
                className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700">结束日期</label>
              <input
                type="date"
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
            计算工作日
          </button>

          {workDays !== null && (
            <div className="mt-8 p-6 bg-zinc-50 rounded-xl border border-zinc-200 text-center">
              <p className="text-sm text-zinc-500 mb-2">工作日天数</p>
              <p className="text-4xl font-bold text-blue-600">
                {workDays} <span className="text-xl text-zinc-600 font-normal">天</span>
              </p>
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
};

export default WorkdayCalculator;
