import React, { useState } from 'react';
import { ToolLayout, SEO } from '../../components';

const JsonFormatter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const format = () => {
    setError('');
    if (!input.trim()) {
      setOutput('');
      return;
    }
    try {
      const obj = JSON.parse(input);
      setOutput(JSON.stringify(obj, null, 2));
    } catch (e) {
      setError('无效的 JSON 格式');
      setOutput('');
    }
  };

  const compress = () => {
    setError('');
    if (!input.trim()) {
      setOutput('');
      return;
    }
    try {
      const obj = JSON.parse(input);
      setOutput(JSON.stringify(obj));
    } catch (e) {
      setError('无效的 JSON 格式');
      setOutput('');
    }
  };

  return (
    <>
      <SEO 
        title="JSON 格式化工具" 
        description="在线 JSON 格式化、校验、压缩工具，支持语法高亮和错误提示。" 
        keywords="JSON格式化,JSON校验,JSON压缩,JSON工具"
      />
      <ToolLayout
        title="JSON 格式化"
        description="JSON 代码美化、校验与压缩。"
        explanation={
          <>
            <p>输入 JSON 字符串，点击按钮即可将其格式化为易读的缩进格式，或压缩为单行。</p>
          </>
        }
      >
        <div className="space-y-6">
          <div className="flex gap-4">
            <button
              onClick={format}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              格式化 (Beautify)
            </button>
            <button
              onClick={compress}
              className="px-4 py-2 bg-zinc-100 text-zinc-700 rounded-md hover:bg-zinc-200 transition-colors"
            >
              压缩 (Minify)
            </button>
            <button
              onClick={() => { setInput(''); setOutput(''); setError(''); }}
              className="px-4 py-2 text-red-600 hover:text-red-700 transition-colors"
            >
              清空
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700">输入 JSON</label>
              <textarea
                className="block w-full h-96 rounded-md border-zinc-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border font-mono text-xs sm:text-sm"
                placeholder='{"name": "test", "value": 123}'
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700">
                结果 {error && <span className="text-red-500 ml-2">({error})</span>}
              </label>
              <textarea
                readOnly
                className={`block w-full h-96 rounded-md border shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 font-mono text-xs sm:text-sm ${error ? 'border-red-300 bg-red-50' : 'border-zinc-300 bg-zinc-50'}`}
                value={output}
                placeholder="格式化后的 JSON 将显示在这里..."
              />
            </div>
          </div>
        </div>
      </ToolLayout>
    </>
  );
};

export default JsonFormatter;
