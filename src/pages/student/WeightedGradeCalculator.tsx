import React, { useState } from 'react';
import { ToolLayout, SEO } from '../../components';

interface Assignment {
  id: number;
  name: string;
  grade: number | '';
  weight: number | '';
}

const WeightedGradeCalculator: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: 1, name: '作业', grade: '', weight: '' },
    { id: 2, name: '期中考试', grade: '', weight: '' },
    { id: 3, name: '期末考试', grade: '', weight: '' },
  ]);
  const [result, setResult] = useState<number | null>(null);

  const updateItem = (id: number, field: keyof Assignment, value: string | number) => {
    setAssignments(assignments.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  const addItem = () => {
    setAssignments([...assignments, { id: Date.now(), name: '', grade: '', weight: '' }]);
  };

  const removeItem = (id: number) => {
    if (assignments.length > 1) {
        setAssignments(assignments.filter(a => a.id !== id));
    }
  };

  const calculate = () => {
    let totalWeight = 0;
    let weightedSum = 0;

    assignments.forEach(a => {
      const g = Number(a.grade);
      const w = Number(a.weight);
      if (a.grade !== '' && a.weight !== '') {
        weightedSum += g * w;
        totalWeight += w;
      }
    });

    if (totalWeight > 0) {
      setResult(weightedSum / totalWeight);
    }
  };

  return (
    <>
      <SEO 
        title="加权成绩计算器" 
        description="在线加权平均分计算器，适用于计算期末总评成绩。" 
        keywords="加权成绩,平均分计算,期末成绩计算,加权平均"
      />
      <ToolLayout
        title="加权成绩计算器"
        description="输入各项成绩及其在总评中的占比权重，计算最终加权平均分。"
        explanation={
          <>
            <p>加权平均分 = (成绩1 × 权重1 + 成绩2 × 权重2 + ...) ÷ 总权重</p>
          </>
        }
      >
        <div className="space-y-6">
          <div className="space-y-4">
            {assignments.map((item, index) => (
              <div key={item.id} className="flex gap-2 sm:gap-4 items-center">
                 <input
                   placeholder="项目名称"
                   className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                   value={item.name}
                   onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                 />
                 <input
                   placeholder="成绩"
                   type="number"
                   className="block w-24 sm:w-32 rounded-md border-zinc-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                   value={item.grade}
                   onChange={(e) => updateItem(item.id, 'grade', e.target.value)}
                 />
                 <div className="relative w-24 sm:w-32">
                    <input
                        placeholder="权重"
                        type="number"
                        className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border pr-6"
                        value={item.weight}
                        onChange={(e) => updateItem(item.id, 'weight', e.target.value)}
                    />
                    <span className="absolute right-2 top-2 text-zinc-400 text-sm">%</span>
                 </div>
                 
                 <button onClick={() => removeItem(item.id)} className="text-red-500 px-2" disabled={assignments.length <= 1}>×</button>
              </div>
            ))}
          </div>

          <button onClick={addItem} className="text-blue-600 text-sm font-medium">+ 添加项目</button>

          <div className="pt-4 border-t border-zinc-200">
             <button onClick={calculate} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">计算总成绩</button>
          </div>

          {result !== null && (
            <div className="mt-8 p-6 bg-zinc-50 rounded-xl border border-zinc-200 text-center">
              <p className="text-sm text-zinc-500 mb-2">加权总成绩</p>
              <p className="text-4xl font-bold text-blue-600">{result.toFixed(2)}</p>
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
};

export default WeightedGradeCalculator;
