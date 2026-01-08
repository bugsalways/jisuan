import React, { useState, useEffect } from 'react';
import { ToolLayout, SEO } from '../../components';

const TimestampConverter: React.FC = () => {
  const [timestamp, setTimestamp] = useState<string>(Math.floor(Date.now() / 1000).toString());
  const [dateStr, setDateStr] = useState<string>('');
  const [unit, setUnit] = useState<'s' | 'ms'>('s');

  // Initialize date string on mount
  useEffect(() => {
    convertTsToDate(timestamp);
  }, []);

  const convertTsToDate = (ts: string) => {
    if (!ts) {
      setDateStr('');
      return;
    }
    try {
      let val = Number(ts);
      if (unit === 's') val *= 1000;
      const date = new Date(val);
      if (isNaN(date.getTime())) {
        setDateStr('无效的时间戳');
      } else {
        // Format: YYYY-MM-DD HH:mm:ss
        const pad = (n: number) => n < 10 ? `0${n}` : n;
        const str = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
        setDateStr(str);
      }
    } catch (e) {
      setDateStr('转换错误');
    }
  };

  const convertDateToTs = (str: string) => {
    try {
      const date = new Date(str);
      if (isNaN(date.getTime())) {
        setTimestamp('无效的日期');
      } else {
        let ts = date.getTime();
        if (unit === 's') ts = Math.floor(ts / 1000);
        setTimestamp(ts.toString());
      }
    } catch (e) {
      setTimestamp('转换错误');
    }
  };

  const handleTsChange = (val: string) => {
    setTimestamp(val);
    convertTsToDate(val);
  };

  const handleDateChange = (val: string) => {
    setDateStr(val);
    // Only auto-convert if it looks like a full date to avoid jumping
    if (val.length >= 19) { 
        convertDateToTs(val);
    }
  };

  const handleNow = () => {
    const now = new Date();
    let ts = now.getTime();
    if (unit === 's') ts = Math.floor(ts / 1000);
    setTimestamp(ts.toString());
    
    const pad = (n: number) => n < 10 ? `0${n}` : n;
    const str = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    setDateStr(str);
  };

  return (
    <>
      <SEO 
        title="时间戳转换" 
        description="在线 Unix 时间戳转换工具，支持秒/毫秒时间戳与北京时间互转。" 
        keywords="时间戳,Timestamp,时间戳转换,Unix时间戳"
      />
      <ToolLayout
        title="时间戳转换"
        description="Unix 时间戳与日期时间相互转换。"
        explanation={
          <>
            <p>Unix 时间戳是从1970年1月1日（UTC/GMT的午夜）开始所经过的秒数，不考虑闰秒。</p>
          </>
        }
      >
        <div className="space-y-6">
          <div className="flex items-center gap-4 mb-4">
             <button onClick={handleNow} className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200">
               获取当前时间
             </button>
             <div className="flex items-center gap-2">
               <label className="text-sm text-zinc-600">单位：</label>
               <select 
                 value={unit} 
                 onChange={(e) => {
                   setUnit(e.target.value as 's' | 'ms');
                   // Recalculate based on new unit? 
                   // Ideally we should keep the date fixed and update timestamp, but simple reload is fine for now
                   handleNow();
                 }}
                 className="text-sm border-zinc-300 rounded p-1"
               >
                 <option value="s">秒 (10位)</option>
                 <option value="ms">毫秒 (13位)</option>
               </select>
             </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-center">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-700">Unix 时间戳</label>
                <input
                  type="text"
                  className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border font-mono"
                  value={timestamp}
                  onChange={(e) => handleTsChange(e.target.value)}
                />
              </div>

              <div className="text-center text-zinc-400">
                ⇄
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-700">日期时间 (YYYY-MM-DD HH:mm:ss)</label>
                <input
                  type="text"
                  className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border font-mono"
                  value={dateStr}
                  onChange={(e) => handleDateChange(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </ToolLayout>
    </>
  );
};

export default TimestampConverter;
