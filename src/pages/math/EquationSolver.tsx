import React, { useState } from 'react';
import { ToolLayout, SEO } from '../../components';

const EquationSolver: React.FC = () => {
  const [a, setA] = useState<number | ''>('');
  const [b, setB] = useState<number | ''>('');
  const [c, setC] = useState<number | ''>('');
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const va = Number(a);
    const vb = Number(b);
    const vc = Number(c);

    if (va === 0) {
      setResult('a 不能为 0（不是一元二次方程）');
      return;
    }

    const delta = vb * vb - 4 * va * vc;
    if (delta > 0) {
      const x1 = (-vb + Math.sqrt(delta)) / (2 * va);
      const x2 = (-vb - Math.sqrt(delta)) / (2 * va);
      setResult(`有两个实根：x1 = ${x1.toFixed(4)}, x2 = ${x2.toFixed(4)}`);
    } else if (delta === 0) {
      const x = -vb / (2 * va);
      setResult(`有一个实根：x = ${x.toFixed(4)}`);
    } else {
      setResult('无实数根 (Delta < 0)');
    }
  };

  return (
    <>
      <SEO 
        title="一元二次方程求解器" 
        description="在线解一元二次方程工具，输入系数自动计算实根。" 
        keywords="一元二次方程,方程计算器,解方程"
      />
      <ToolLayout
        title="一元二次方程求解"
        description="求解形如 ax² + bx + c = 0 的一元二次方程。"
        explanation={
          <>
            <p>判别式 Δ = b² - 4ac</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Δ &gt; 0：有两个不相等的实根</li>
              <li>Δ = 0：有两个相等的实根</li>
              <li>Δ &lt; 0：无实根</li>
            </ul>
          </>
        }
      >
        <div className="space-y-6">
          <div className="flex items-center gap-2 justify-center text-xl font-mono bg-zinc-100 p-4 rounded-lg">
             <input type="number" className="w-16 p-1 border rounded text-center" placeholder="a" value={a} onChange={e => setA(Number(e.target.value))} />
             <span>x² +</span>
             <input type="number" className="w-16 p-1 border rounded text-center" placeholder="b" value={b} onChange={e => setB(Number(e.target.value))} />
             <span>x +</span>
             <input type="number" className="w-16 p-1 border rounded text-center" placeholder="c" value={c} onChange={e => setC(Number(e.target.value))} />
             <span>= 0</span>
          </div>

          <div className="text-center">
             <button onClick={calculate} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">求解</button>
          </div>

          {result && (
            <div className="mt-8 p-6 bg-zinc-50 rounded-xl border border-zinc-200 text-center">
              <p className="text-lg font-bold text-zinc-800">{result}</p>
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
};

export default EquationSolver;
