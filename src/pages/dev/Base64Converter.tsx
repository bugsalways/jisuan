import React, { useState } from 'react';
import { ToolLayout, SEO } from '../../components';

const Base64Converter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const handleConvert = () => {
    if (!input) {
      setOutput('');
      return;
    }
    try {
      if (mode === 'encode') {
        // UTF-8 safe encoding
        setOutput(window.btoa(unescape(encodeURIComponent(input))));
      } else {
        // UTF-8 safe decoding
        setOutput(decodeURIComponent(escape(window.atob(input))));
      }
    } catch (e) {
      setOutput('转换失败：输入格式不正确或包含非法字符');
    }
  };

  return (
    <>
      <SEO 
        title="Base64 在线编解码" 
        description="免费的 Base64 在线加密与解密工具，支持中文，处理速度快。" 
        keywords="Base64,Base64编码,Base64解码,在线工具"
      />
      <ToolLayout
        title="Base64 编解码"
        description="在线 Base64 编码与解码工具。"
        explanation={
          <>
            <p>Base64 是一种基于64个可打印字符来表示二进制数据的表示方法。常用于在处理文本数据的场合，表示、传输、存储一些二进制数据。</p>
          </>
        }
      >
        <div className="space-y-6">
          <div className="flex gap-4">
            <button
              onClick={() => { setMode('encode'); setInput(''); setOutput(''); }}
              className={`px-4 py-2 rounded-md transition-colors ${mode === 'encode' ? 'bg-blue-600 text-white' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'}`}
            >
              编码 (Encode)
            </button>
            <button
              onClick={() => { setMode('decode'); setInput(''); setOutput(''); }}
              className={`px-4 py-2 rounded-md transition-colors ${mode === 'decode' ? 'bg-blue-600 text-white' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'}`}
            >
              解码 (Decode)
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700">
                {mode === 'encode' ? '输入明文' : '输入 Base64'}
              </label>
              <textarea
                className="block w-full h-32 rounded-md border-zinc-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border font-mono"
                placeholder={mode === 'encode' ? '在此输入要编码的内容...' : '在此输入要解码的 Base64 字符串...'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            <button
              onClick={handleConvert}
              className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              {mode === 'encode' ? '执行编码' : '执行解码'}
            </button>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700">
                结果
              </label>
              <textarea
                readOnly
                className="block w-full h-32 rounded-md border-zinc-300 bg-zinc-50 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border font-mono"
                placeholder="结果将显示在这里..."
                value={output}
              />
            </div>
          </div>
        </div>
      </ToolLayout>
    </>
  );
};

export default Base64Converter;
