import React, { useState } from 'react';
import { ToolLayout, SEO } from '../../components';

const ElectricityCalculator: React.FC = () => {
  const [power, setPower] = useState<number | ''>('');
  const [hours, setHours] = useState<number | ''>('');
  const [price, setPrice] = useState<number | ''>(0.6);
  const [result, setResult] = useState<{daily: number, monthly: number, yearly: number} | null>(null);

  const calculate = () => {
    const p = Number(power) / 1000; // W to kW
    const h = Number(hours);
    const cost = Number(price);
    
    if (!p || !h) return;

    const dailyKwh = p * h;
    const dailyCost = dailyKwh * cost;

    setResult({
      daily: dailyCost,
      monthly: dailyCost * 30,
      yearly: dailyCost * 365
    });
  };

  return (
    <>
      <SEO 
        title="电费估算器" 
        description="在线耗电量及电费计算器，帮助你估算家用电器的耗电成本。" 
        keywords="电费计算,耗电量计算,电费估算,功率计算"
      />
      <ToolLayout
        title="电费估算器"
        description="输入电器功率和使用时间，估算电费支出。"
        explanation={
          <>
            <p>1 度电 = 1 千瓦时 (kWh) = 1000 瓦 × 1 小时。</p>
          </>
        }
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
             <div className="space-y-2">
               <label className="block text-sm font-medium text-zinc-700">电器功率 (瓦/W)</label>
               <input type="number" className="block w-full p-2 border rounded-md" placeholder="例如：1500" value={power} onChange={e => setPower(Number(e.target.value))} />
             </div>
             <div className="space-y-2">
               <label className="block text-sm font-medium text-zinc-700">每天使用时长 (小时)</label>
               <input type="number" className="block w-full p-2 border rounded-md" placeholder="例如：2" value={hours} onChange={e => setHours(Number(e.target.value))} />
             </div>
             <div className="space-y-2">
               <label className="block text-sm font-medium text-zinc-700">电价 (元/度)</label>
               <input type="number" className="block w-full p-2 border rounded-md" value={price} onChange={e => setPrice(Number(e.target.value))} />
             </div>
          </div>

          <button onClick={calculate} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">开始计算</button>

          {result && (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200">
                  <p className="text-sm text-zinc-500">每天电费</p>
                  <p className="text-xl font-bold text-blue-600">¥ {result.daily.toFixed(2)}</p>
              </div>
              <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200">
                  <p className="text-sm text-zinc-500">每月电费 (30天)</p>
                  <p className="text-xl font-bold text-blue-600">¥ {result.monthly.toFixed(2)}</p>
              </div>
              <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200">
                  <p className="text-sm text-zinc-500">每年电费</p>
                  <p className="text-xl font-bold text-blue-600">¥ {result.yearly.toFixed(2)}</p>
              </div>
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
};

export default ElectricityCalculator;
