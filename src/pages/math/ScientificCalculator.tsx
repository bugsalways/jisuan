import React, { useState } from 'react';
import { ToolLayout, SEO } from '../../components';

const ScientificCalculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState<number>(0);
  const [shouldReset, setShouldReset] = useState(false);

  const handleNumber = (num: string) => {
    if (display === '0' || shouldReset) {
      setDisplay(num);
      setShouldReset(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (op: string) => {
    // Simple handling: append to display string to eval later
    // In a production app, a parser would be safer/better
    if (shouldReset) setShouldReset(false);
    
    // Prevent double operators
    const lastChar = display.slice(-1);
    if (['+', '-', '*', '/', '.'].includes(lastChar)) {
        setDisplay(display.slice(0, -1) + op);
    } else {
        setDisplay(display + op);
    }
  };

  const calculate = () => {
    try {
      // Use Function constructor for a safer eval alternative (still risky if user input allowed, but here controlled)
      // Replace visual operators with JS operators
      const expression = display
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/\^/g, '**')
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/sqrt\(/g, 'Math.sqrt(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(');

      // eslint-disable-next-line no-new-func
      const result = new Function(`return ${expression}`)();
      
      // Handle precision issues
      const final = Math.round(result * 100000000) / 100000000;
      setDisplay(String(final));
      setShouldReset(true);
    } catch (e) {
      setDisplay('Error');
      setShouldReset(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setShouldReset(false);
  };

  const backspace = () => {
    if (shouldReset) {
        clear();
        return;
    }
    if (display.length === 1) setDisplay('0');
    else setDisplay(display.slice(0, -1));
  };

  const scientificOp = (func: string) => {
      if (display === '0' || shouldReset) {
          setDisplay(`${func}(`);
          setShouldReset(false);
      } else {
          setDisplay(`${display}${func}(`);
      }
  };

  return (
    <>
      <SEO 
        title="在线科学计算器" 
        description="功能强大的在线科学计算器，支持三角函数、对数、指数等复杂运算。" 
        keywords="科学计算器,在线计算器,数学计算,三角函数"
      />
      <ToolLayout
        title="科学计算器"
        description="支持加减乘除及常见科学运算。"
        explanation={
          <>
            <p>支持键盘输入（部分功能）。</p>
            <p>sin/cos/tan 使用弧度制。</p>
          </>
        }
      >
        <div className="max-w-md mx-auto">
            {/* Display */}
            <div className="bg-zinc-900 text-white text-right p-6 rounded-t-2xl text-4xl font-mono overflow-x-auto mb-1">
                {display}
            </div>

            {/* Keypad */}
            <div className="grid grid-cols-5 gap-1 bg-zinc-200 p-1 rounded-b-2xl">
                {/* 2nd Row: Special Ops */}
                <button onClick={() => scientificOp('sin')} className="p-3 bg-zinc-300 rounded hover:bg-zinc-400 text-sm">sin</button>
                <button onClick={() => scientificOp('cos')} className="p-3 bg-zinc-300 rounded hover:bg-zinc-400 text-sm">cos</button>
                <button onClick={() => scientificOp('tan')} className="p-3 bg-zinc-300 rounded hover:bg-zinc-400 text-sm">tan</button>
                <button onClick={() => scientificOp('log')} className="p-3 bg-zinc-300 rounded hover:bg-zinc-400 text-sm">log</button>
                <button onClick={() => scientificOp('ln')} className="p-3 bg-zinc-300 rounded hover:bg-zinc-400 text-sm">ln</button>

                <button onClick={() => handleOperator('(')} className="p-3 bg-zinc-300 rounded hover:bg-zinc-400 text-sm">(</button>
                <button onClick={() => handleOperator(')')} className="p-3 bg-zinc-300 rounded hover:bg-zinc-400 text-sm">)</button>
                <button onClick={() => scientificOp('sqrt')} className="p-3 bg-zinc-300 rounded hover:bg-zinc-400 text-sm">√</button>
                <button onClick={() => handleOperator('^')} className="p-3 bg-zinc-300 rounded hover:bg-zinc-400 text-sm">^</button>
                <button onClick={clear} className="p-3 bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm font-bold">AC</button>

                <button onClick={() => handleNumber('7')} className="p-4 bg-white rounded hover:bg-zinc-50 text-lg font-medium">7</button>
                <button onClick={() => handleNumber('8')} className="p-4 bg-white rounded hover:bg-zinc-50 text-lg font-medium">8</button>
                <button onClick={() => handleNumber('9')} className="p-4 bg-white rounded hover:bg-zinc-50 text-lg font-medium">9</button>
                <button onClick={backspace} className="p-4 bg-zinc-300 rounded hover:bg-zinc-400 text-lg">⌫</button>
                <button onClick={() => handleOperator('/')} className="p-4 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 text-lg">÷</button>

                <button onClick={() => handleNumber('4')} className="p-4 bg-white rounded hover:bg-zinc-50 text-lg font-medium">4</button>
                <button onClick={() => handleNumber('5')} className="p-4 bg-white rounded hover:bg-zinc-50 text-lg font-medium">5</button>
                <button onClick={() => handleNumber('6')} className="p-4 bg-white rounded hover:bg-zinc-50 text-lg font-medium">6</button>
                <button onClick={() => handleOperator('*')} className="p-4 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 text-lg">×</button>
                <button onClick={() => handleOperator('-')} className="p-4 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 text-lg">-</button>

                <button onClick={() => handleNumber('1')} className="p-4 bg-white rounded hover:bg-zinc-50 text-lg font-medium">1</button>
                <button onClick={() => handleNumber('2')} className="p-4 bg-white rounded hover:bg-zinc-50 text-lg font-medium">2</button>
                <button onClick={() => handleNumber('3')} className="p-4 bg-white rounded hover:bg-zinc-50 text-lg font-medium">3</button>
                <button onClick={() => handleOperator('+')} className="p-4 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 text-lg row-span-2 flex items-center justify-center">+</button>
                <button onClick={calculate} className="p-4 bg-blue-600 text-white rounded hover:bg-blue-700 text-lg row-span-2 flex items-center justify-center">=</button>

                <button onClick={() => handleNumber('0')} className="p-4 bg-white rounded hover:bg-zinc-50 text-lg font-medium col-span-2">0</button>
                <button onClick={() => handleNumber('.')} className="p-4 bg-white rounded hover:bg-zinc-50 text-lg font-medium">.</button>
            </div>
        </div>
      </ToolLayout>
    </>
  );
};

export default ScientificCalculator;
