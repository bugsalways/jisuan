import React, { useState } from 'react';
import { ToolLayout, SEO } from '../../components';

const CalorieCalculator: React.FC = () => {
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [weight, setWeight] = useState<number | ''>('');
  const [activity, setActivity] = useState(1.2);
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const w = Number(weight);
    const h = Number(height);
    const a = Number(age);
    if (!w || !h || !a) return;

    // Mifflin-St Jeor Equation
    let bmr = 10 * w + 6.25 * h - 5 * a;
    if (gender === 'male') bmr += 5;
    else bmr -= 161;

    setResult(bmr * activity);
  };

  return (
    <>
      <SEO 
        title="卡路里计算器" 
        description="在线 TDEE/BMR 计算器，帮助你计算每日所需热量，科学减肥增肌。" 
        keywords="卡路里计算,TDEE计算,基础代谢率,热量计算"
      />
      <ToolLayout
        title="卡路里计算器"
        description="估算您的每日总能量消耗 (TDEE)。"
        explanation={
          <>
            <p>基于 Mifflin-St Jeor 公式计算基础代谢率 (BMR)，再根据活动水平估算每日所需总热量。</p>
          </>
        }
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
             <div className="space-y-2">
               <label className="block text-sm font-medium text-zinc-700">性别</label>
               <select className="block w-full p-2 border rounded-md" value={gender} onChange={e => setGender(e.target.value)}>
                 <option value="male">男</option>
                 <option value="female">女</option>
               </select>
             </div>
             <div className="space-y-2">
               <label className="block text-sm font-medium text-zinc-700">年龄</label>
               <input type="number" className="block w-full p-2 border rounded-md" value={age} onChange={e => setAge(Number(e.target.value))} />
             </div>
             <div className="space-y-2">
               <label className="block text-sm font-medium text-zinc-700">身高 (cm)</label>
               <input type="number" className="block w-full p-2 border rounded-md" value={height} onChange={e => setHeight(Number(e.target.value))} />
             </div>
             <div className="space-y-2">
               <label className="block text-sm font-medium text-zinc-700">体重 (kg)</label>
               <input type="number" className="block w-full p-2 border rounded-md" value={weight} onChange={e => setWeight(Number(e.target.value))} />
             </div>
             <div className="space-y-2 sm:col-span-2">
               <label className="block text-sm font-medium text-zinc-700">日常活动水平</label>
               <select className="block w-full p-2 border rounded-md" value={activity} onChange={e => setActivity(Number(e.target.value))}>
                 <option value={1.2}>久坐 (几乎不运动)</option>
                 <option value={1.375}>轻度活跃 (每周运动 1-3 天)</option>
                 <option value={1.55}>中度活跃 (每周运动 3-5 天)</option>
                 <option value={1.725}>高度活跃 (每周运动 6-7 天)</option>
                 <option value={1.9}>非常活跃 (从事体力工作)</option>
               </select>
             </div>
          </div>

          <button onClick={calculate} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">开始计算</button>

          {result !== null && (
            <div className="mt-8 p-6 bg-zinc-50 rounded-xl border border-zinc-200 text-center">
              <p className="text-sm text-zinc-500 mb-2">每日建议摄入热量</p>
              <p className="text-4xl font-bold text-green-600">{result.toFixed(0)} <span className="text-xl text-zinc-600 font-normal">大卡 (kcal)</span></p>
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
};

export default CalorieCalculator;
