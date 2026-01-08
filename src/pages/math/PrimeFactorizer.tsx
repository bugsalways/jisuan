import React, { useState } from 'react';
import { ToolLayout, SEO } from '../../components';

const PrimeFactorizer: React.FC = () => {
  const [number, setNumber] = useState<number | ''>('');
  const [result, setResult] = useState<string>('');

  const calculate = () => {
    const n = Number(number);
    if (!n || n < 2) {
      setResult('请输入大于 1 的整数');
      return;
    }

    let temp = n;
    const factors: number[] = [];
    let d = 2;
    while (d * d <= temp) {
      while (temp % d === 0) {
        factors.push(d);
        temp /= d;
      }
      d++;
    }
    if (temp > 1) factors.push(temp);

    setResult(`${n} = ${factors.join(' × ')}`);
  };

  return (
    <>
      <SEO 
        title="质因数分解工具" 
        description="在线质因数分解计算器，快速将整数分解为质数的乘积。" 
        keywords="质因数分解,分解质因数,数学工具"
      />
      <ToolLayout
        title="质因数分解"
        description="将一个合数分解成若干个质因数的乘积。"
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700">请输入整数</label>
            <input 
              type="number" 
              className="block w-full p-2 border rounded-md" 
              value={number} 
              onChange={e => setNumber(Number(e.target.value))} 
              placeholder="例如：360"
            />
          </div>

          <button onClick={calculate} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">分解</button>

          {result && (
            <div className="mt-8 p-6 bg-zinc-50 rounded-xl border border-zinc-200 text-center">
              <p className="text-2xl font-bold text-zinc-900">{result}</p>
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
};

export default PrimeFactorizer;
