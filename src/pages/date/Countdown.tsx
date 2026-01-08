import React, { useState, useEffect } from 'react';
import { ToolLayout, SEO } from '../../components';

const Countdown: React.FC = () => {
  const [targetDate, setTargetDate] = useState('');
  const [timeLeft, setTimeLeft] = useState<{days: number, hours: number, minutes: number, seconds: number} | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isRunning && targetDate) {
      interval = setInterval(() => {
        const now = new Date().getTime();
        const target = new Date(targetDate).getTime();
        const distance = target - now;

        if (distance < 0) {
          clearInterval(interval);
          setIsRunning(false);
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          return;
        }

        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, targetDate]);

  const startTimer = () => {
    if (targetDate) setIsRunning(true);
  };

  return (
    <>
      <SEO 
        title="在线倒计时" 
        description="自定义目标时间的倒计时工具，精确到秒。" 
        keywords="倒计时,计时器,在线倒计时,时间管理"
      />
      <ToolLayout
        title="在线倒计时"
        description="设定一个未来的时间，开始倒计时。"
        explanation={
          <>
            <p>适用于考试倒计时、假期倒计时、纪念日倒计时等场景。</p>
          </>
        }
      >
        <div className="space-y-6">
          <div className="max-w-md mx-auto">
             <label htmlFor="targetDate" className="block text-sm font-medium text-zinc-700 mb-2">
                选择目标时间
              </label>
              <input
                type="datetime-local"
                id="targetDate"
                className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                value={targetDate}
                onChange={(e) => {
                  setTargetDate(e.target.value);
                  setIsRunning(false); 
                }}
              />
          </div>

          <div className="text-center">
            <button
                onClick={startTimer}
                className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
            >
                开始倒计时
            </button>
          </div>

          {timeLeft && (
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
               <div className="p-4 bg-blue-50 rounded-xl">
                 <div className="text-3xl font-bold text-blue-600">{timeLeft.days}</div>
                 <div className="text-sm text-zinc-500">天</div>
               </div>
               <div className="p-4 bg-blue-50 rounded-xl">
                 <div className="text-3xl font-bold text-blue-600">{timeLeft.hours}</div>
                 <div className="text-sm text-zinc-500">时</div>
               </div>
               <div className="p-4 bg-blue-50 rounded-xl">
                 <div className="text-3xl font-bold text-blue-600">{timeLeft.minutes}</div>
                 <div className="text-sm text-zinc-500">分</div>
               </div>
               <div className="p-4 bg-blue-50 rounded-xl">
                 <div className="text-3xl font-bold text-blue-600">{timeLeft.seconds}</div>
                 <div className="text-sm text-zinc-500">秒</div>
               </div>
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
};

export default Countdown;
