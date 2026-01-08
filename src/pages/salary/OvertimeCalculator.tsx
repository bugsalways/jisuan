import React, { useState } from 'react';
import { ToolLayout, SEO } from '../../components';

const OvertimeCalculator: React.FC = () => {
  const [baseSalary, setBaseSalary] = useState<number | ''>('');
  const [workDays, setWorkDays] = useState<number>(21.75);
  const [weekdayHours, setWeekdayHours] = useState<number | ''>('');
  const [weekendHours, setWeekendHours] = useState<number | ''>('');
  const [holidayHours, setHolidayHours] = useState<number | ''>('');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const salary = Number(baseSalary);
    if (!salary) return;

    // Hourly rate = Monthly Salary / 21.75 / 8
    const hourlyRate = salary / workDays / 8;
    
    const weekdayPay = (Number(weekdayHours) || 0) * hourlyRate * 1.5;
    const weekendPay = (Number(weekendHours) || 0) * hourlyRate * 2.0;
    const holidayPay = (Number(holidayHours) || 0) * hourlyRate * 3.0;

    setResult(weekdayPay + weekendPay + holidayPay);
  };

  return (
    <>
      <SEO 
        title="加班费计算器" 
        description="根据劳动法规定，快速计算工作日、周末及法定节假日的加班费用。" 
        keywords="加班费,加班工资,劳动法加班费,周末加班"
      />
      <ToolLayout
        title="加班费计算器"
        description="输入基本工资和加班时长，计算应得加班费。"
        explanation={
          <>
            <p>计算公式依据《劳动法》：</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>工作日延长工作时间：工资的 150%</li>
              <li>休息日（周末）工作：工资的 200%</li>
              <li>法定休假日工作：工资的 300%</li>
            </ul>
            <p className="mt-2">日工资 = 月工资收入 ÷ 21.75 (月计薪天数)</p>
            <p>小时工资 = 日工资 ÷ 8</p>
          </>
        }
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700">月基本工资 (元)</label>
              <input
                type="number"
                className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                value={baseSalary}
                onChange={(e) => setBaseSalary(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700">月计薪天数 (默认21.75)</label>
              <input
                type="number"
                className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                value={workDays}
                onChange={(e) => setWorkDays(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700">工作日加班 (小时)</label>
              <input
                type="number"
                className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                placeholder="1.5倍"
                value={weekdayHours}
                onChange={(e) => setWeekdayHours(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700">周末加班 (小时)</label>
              <input
                type="number"
                className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                placeholder="2.0倍"
                value={weekendHours}
                onChange={(e) => setWeekendHours(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700">节假日加班 (小时)</label>
              <input
                type="number"
                className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                placeholder="3.0倍"
                value={holidayHours}
                onChange={(e) => setHolidayHours(Number(e.target.value))}
              />
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            计算加班费
          </button>

          {result !== null && (
            <div className="mt-8 p-6 bg-zinc-50 rounded-xl border border-zinc-200 text-center">
              <p className="text-sm text-zinc-500 mb-2">加班费总计</p>
              <p className="text-4xl font-bold text-green-600">
                ¥ {result.toFixed(2)}
              </p>
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
};

export default OvertimeCalculator;
