import React, { useState } from 'react';
import { ToolLayout, SEO } from '../../components';

const GcdLcmCalculator: React.FC = () => {
  const [num1, setNum1] = useState<number | ''>('');
  const [num2, setNum2] = useState<number | ''>('');
  const [result, setResult] = useState<{gcd: number, lcm: number} | null>(null);

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const calculate = () => {
    const a = Number(num1);
    const b = Number(num2);
    if (!a || !b) return;

    const g = gcd(a, b);
    const l = (a * b) / g;

    setResult({ gcd: g, lcm: l });
  };

  return (
    <>
      <SEO 
        title="最大公约数与最小公倍数计算器" 
        description="在线计算两个整数的最大公约数 (GCD) 和最小公倍数 (LCM)。" 
        keywords="最大公约数,最小公倍数,GCD,LCM"
      />
      <ToolLayout
        title="最大公约数 & 最小公倍数"
        description="计算两个整数的最大公约数和最小公倍数。"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700">第一个数</label>
              <input type="number" className="block w-full p-2 border rounded-md" value={num1} onChange={e => setNum1(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700">第二个数</label>
              <input type="number" className="block w-full p-2 border rounded-md" value={num2} onChange={e => setNum2(Number(e.target.value))} />
            </div>
          </div>

          <button onClick={calculate} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">计算</button>

          {result && (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
              <div className="p-6 bg-green-50 rounded-xl border border-green-100">
                <p className="text-sm text-green-700 mb-2">最大公约数 (GCD)</p>
                <p className="text-3xl font-bold text-green-800">{result.gcd}</p>
              </div>
              <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-sm text-blue-700 mb-2">最小公倍数 (LCM)</p>
                <p className="text-3xl font-bold text-blue-800">{result.lcm}</p>
              </div>
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
};

export default GcdLcmCalculator;
