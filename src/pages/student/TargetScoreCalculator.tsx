import React, { useState } from 'react';
import { ToolLayout, SEO } from '../../components';

const TargetScoreCalculator: React.FC = () => {
  const [currentGrade, setCurrentGrade] = useState<number | ''>('');
  const [targetGrade, setTargetGrade] = useState<number | ''>('');
  const [finalWeight, setFinalWeight] = useState<number | ''>('');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const cur = Number(currentGrade);
    const tar = Number(targetGrade);
    const w = Number(finalWeight) / 100;
    
    if (!tar || !w) return;

    // Formula: Target = Current * (1 - w) + Final * w
    // Final = (Target - Current * (1 - w)) / w
    
    const required = (tar - cur * (1 - w)) / w;
    setResult(required);
  };

  return (
    <>
      <SEO 
        title="目标分数反推" 
        description="计算期末考试需要考多少分才能达到目标总成绩。" 
        keywords="目标分数计算,期末分数计算,及格分计算"
      />
      <ToolLayout
        title="目标分数反推"
        description="根据当前成绩和期末权重，计算期末考试至少需要考多少分才能达到目标。"
        explanation={
          <>
            <p>适用于已知平时成绩，想知道期末考多少分不挂科或拿高分的场景。</p>
          </>
        }
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
             <div className="space-y-2">
               <label className="block text-sm font-medium text-zinc-700">当前平均分 (平时成绩)</label>
               <input type="number" className="block w-full p-2 border rounded-md" placeholder="例如：85" value={currentGrade} onChange={e => setCurrentGrade(Number(e.target.value))} />
             </div>
             <div className="space-y-2">
               <label className="block text-sm font-medium text-zinc-700">目标总成绩</label>
               <input type="number" className="block w-full p-2 border rounded-md" placeholder="例如：90" value={targetGrade} onChange={e => setTargetGrade(Number(e.target.value))} />
             </div>
             <div className="space-y-2">
               <label className="block text-sm font-medium text-zinc-700">期末考试权重 (%)</label>
               <input type="number" className="block w-full p-2 border rounded-md" placeholder="例如：40" value={finalWeight} onChange={e => setFinalWeight(Number(e.target.value))} />
             </div>
          </div>

          <button onClick={calculate} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">开始计算</button>

          {result !== null && (
            <div className="mt-8 p-6 bg-zinc-50 rounded-xl border border-zinc-200 text-center">
              <p className="text-sm text-zinc-500 mb-2">期末考试至少需要</p>
              <p className={`text-4xl font-bold ${result > 100 ? 'text-red-500' : 'text-blue-600'}`}>
                {result.toFixed(1)} <span className="text-xl text-zinc-600 font-normal">分</span>
              </p>
              {result > 100 && <p className="text-red-500 mt-2 text-sm">目标太高啦，理论上无法达到！</p>}
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
};

export default TargetScoreCalculator;
