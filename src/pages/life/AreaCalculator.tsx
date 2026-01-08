import React, { useState } from 'react';
import { ToolLayout, SEO } from '../../components';

const AreaCalculator: React.FC = () => {
  const [shape, setShape] = useState<'rectangle' | 'circle' | 'triangle' | 'trapezoid' | 'parallelogram'>('rectangle');
  const [width, setWidth] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [radius, setRadius] = useState<number | ''>('');
  const [topWidth, setTopWidth] = useState<number | ''>(''); // For trapezoid
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    let area = 0;
    if (shape === 'rectangle') {
      area = Number(width) * Number(height);
    } else if (shape === 'circle') {
      area = Math.PI * Math.pow(Number(radius), 2);
    } else if (shape === 'triangle') {
      area = 0.5 * Number(width) * Number(height);
    } else if (shape === 'parallelogram') {
      area = Number(width) * Number(height);
    } else if (shape === 'trapezoid') {
      area = 0.5 * (Number(topWidth) + Number(width)) * Number(height);
    }
    setResult(area);
  };

  return (
    <>
      <SEO 
        title="面积计算器" 
        description="在线面积计算工具，支持矩形、圆形、三角形、梯形、平行四边形等常见几何图形的面积计算。" 
        keywords="面积计算,矩形面积,圆形面积,三角形面积,几何计算,梯形面积"
      />
      <ToolLayout
        title="面积计算器"
        description="计算常见几何图形的面积。"
        explanation={
          <>
            <p>常用面积公式：</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>矩形：长 × 宽</li>
              <li>圆形：π × 半径²</li>
              <li>三角形：0.5 × 底 × 高</li>
              <li>平行四边形：底 × 高</li>
              <li>梯形：0.5 × (上底 + 下底) × 高</li>
            </ul>
          </>
        }
      >
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2 mb-4">
             {['rectangle', 'circle', 'triangle', 'parallelogram', 'trapezoid'].map(s => (
               <button 
                 key={s}
                 onClick={() => { setShape(s as any); setResult(null); setWidth(''); setHeight(''); setRadius(''); setTopWidth(''); }} 
                 className={`px-4 py-2 rounded-md text-sm transition-colors ${shape === s ? 'bg-blue-600 text-white shadow-md' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'}`}
               >
                 {s === 'rectangle' ? '矩形' : s === 'circle' ? '圆形' : s === 'triangle' ? '三角形' : s === 'parallelogram' ? '平行四边形' : '梯形'}
               </button>
             ))}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {shape === 'rectangle' && (
                <>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-zinc-700">长</label>
                        <input type="number" className="block w-full p-2 border rounded-md" value={width} onChange={e => setWidth(Number(e.target.value))} />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-zinc-700">宽</label>
                        <input type="number" className="block w-full p-2 border rounded-md" value={height} onChange={e => setHeight(Number(e.target.value))} />
                    </div>
                </>
            )}
            {shape === 'circle' && (
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-zinc-700">半径</label>
                    <input type="number" className="block w-full p-2 border rounded-md" value={radius} onChange={e => setRadius(Number(e.target.value))} />
                </div>
            )}
            {(shape === 'triangle' || shape === 'parallelogram') && (
                <>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-zinc-700">底</label>
                        <input type="number" className="block w-full p-2 border rounded-md" value={width} onChange={e => setWidth(Number(e.target.value))} />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-zinc-700">高</label>
                        <input type="number" className="block w-full p-2 border rounded-md" value={height} onChange={e => setHeight(Number(e.target.value))} />
                    </div>
                </>
            )}
            {shape === 'trapezoid' && (
                <>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-zinc-700">上底</label>
                        <input type="number" className="block w-full p-2 border rounded-md" value={topWidth} onChange={e => setTopWidth(Number(e.target.value))} />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-zinc-700">下底</label>
                        <input type="number" className="block w-full p-2 border rounded-md" value={width} onChange={e => setWidth(Number(e.target.value))} />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-zinc-700">高</label>
                        <input type="number" className="block w-full p-2 border rounded-md" value={height} onChange={e => setHeight(Number(e.target.value))} />
                    </div>
                </>
            )}
          </div>

          <button onClick={calculate} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">开始计算</button>

          {result !== null && (
            <div className="mt-8 p-6 bg-zinc-50 rounded-xl border border-zinc-200 text-center">
              <p className="text-sm text-zinc-500 mb-2">面积</p>
              <p className="text-4xl font-bold text-blue-600">{result.toFixed(2)}</p>
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
};

export default AreaCalculator;
