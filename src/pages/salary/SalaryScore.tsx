import React, { useState } from 'react';
import { ToolLayout, SEO } from '../../components';

const SalaryScore: React.FC = () => {
  const [salary, setSalary] = useState<number | ''>('');
  const [workDays, setWorkDays] = useState<number | ''>(22);
  const [dailyHours, setDailyHours] = useState<number | ''>(8);
  const [city, setCity] = useState('上海');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const s = Number(salary);
    const d = Number(workDays);
    const h = Number(dailyHours);

    if (!s || !d || !h) return;

    const dailyWage = s / d;
    const hourlyWage = dailyWage / h;
    const weeklyHours = h * (d / 4.33); // Estimate

    // Fake algorithms for demo purposes based on image
    // Score: roughly correlated to hourly wage and inverse to work intensity
    const baseScore = 2000;
    const score = Math.round(baseScore + (hourlyWage * 50) - (weeklyHours * 10));
    
    // Cow Horse Index: Higher work, lower pay = higher index
    // Benchmark: 5500/month, 60h/week => 20
    // Formula idea: (WeeklyHours * 1000) / Salary * factor
    // (60 * 1000) / 5500 * x = 20 => 10.9 * x = 20 => x ~ 1.8
    const cowHorseIndex = Math.round((weeklyHours * 1800) / s);

    // Purchasing Power
    const items = [
      { name: '小馄饨', price: 15, unit: '碗' },
      { name: '地铁票', price: 4, unit: '次' },
      { name: '牛奶', price: 10, unit: '盒' },
      { name: '咖啡', price: 30, unit: '杯' },
    ];

    const purchasingPower = items.map(item => ({
      ...item,
      count: Math.floor(dailyWage / item.price)
    }));

    let title = '打工萌新';
    if (score > 5000) title = '打工皇帝';
    else if (score > 3500) title = '打工贵族';
    else if (score > 2500) title = '资深社畜';
    else title = '吃土少年';

    setResult({
      dailyWage,
      hourlyWage,
      weeklyHours,
      score,
      cowHorseIndex,
      title,
      purchasingPower,
      beatPct: Math.min(99, Math.floor(score / 50))
    });
  };

  return (
    <>
      <SEO 
        title="打工跑分 (牛马指数)" 
        description="计算你的打工性价比，看看你是打工贵族还是牛马？包含薪资分析、购买力评估及牛马指数计算。" 
        keywords="打工跑分,牛马指数,薪资计算,购买力评估"
      />
      <ToolLayout
        title="打工跑分计算器"
        description="输入薪资和工时，全方位评估你的“打工含金量”。"
      >
        <div className="space-y-8">
          {/* Input Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700">月薪 (元)</label>
              <input type="number" className="block w-full p-2 border rounded-md" value={salary} onChange={e => setSalary(Number(e.target.value))} placeholder="5500" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700">月工作天数</label>
              <input type="number" className="block w-full p-2 border rounded-md" value={workDays} onChange={e => setWorkDays(Number(e.target.value))} placeholder="26" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700">日工作时长 (小时)</label>
              <input type="number" className="block w-full p-2 border rounded-md" value={dailyHours} onChange={e => setDailyHours(Number(e.target.value))} placeholder="10" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700">所在城市</label>
              <select className="block w-full p-2 border rounded-md" value={city} onChange={e => setCity(e.target.value)}>
                <option>上海</option>
                <option>北京</option>
                <option>深圳</option>
                <option>广州</option>
                <option>杭州</option>
                <option>其他</option>
              </select>
            </div>
          </div>

          <button onClick={calculate} className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            开始跑分
          </button>

          {result && (
            <div className="space-y-6 animate-fade-in">
              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl text-center">
                  <p className="text-xs text-zinc-500">日薪</p>
                  <p className="text-lg font-bold text-zinc-900">{result.dailyWage.toFixed(2)}元</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl text-center">
                  <p className="text-xs text-zinc-500">时薪</p>
                  <p className="text-lg font-bold text-zinc-900">{result.hourlyWage.toFixed(2)}元</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl text-center">
                  <p className="text-xs text-zinc-500">周工时 (约)</p>
                  <p className="text-lg font-bold text-zinc-900">{result.weeklyHours.toFixed(1)}时</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-xl text-center">
                  <p className="text-xs text-zinc-500">休息制度</p>
                  <p className="text-lg font-bold text-zinc-900">{result.weeklyHours > 50 ? '单休/大小周' : '双休'}</p>
                </div>
              </div>

              {/* Score Card */}
              <div className="bg-white border-2 border-blue-100 rounded-2xl p-6 text-center shadow-sm relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="inline-block px-4 py-1 bg-zinc-100 rounded-full text-sm text-zinc-600 font-medium mb-4">打工跑分</h3>
                  <div className="text-5xl font-black text-blue-600 mb-2">{result.score} <span className="text-2xl font-normal text-zinc-400">分</span></div>
                  <p className="text-zinc-500 text-sm mb-4">
                    超越了 <span className="text-blue-600 font-bold">{result.beatPct}%</span> 的打工人
                  </p>
                  <div className="text-zinc-600">
                    当前称号：<span className="text-xl font-bold text-blue-600">{result.title}</span>
                  </div>
                </div>
              </div>

              {/* Purchasing Power */}
              <div className="bg-white border border-zinc-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-zinc-900 mb-4 border-l-4 border-blue-500 pl-3">购买力评价</h3>
                <p className="text-zinc-600 text-sm mb-6 leading-relaxed">
                  {city}日薪 {result.dailyWage.toFixed(2)} 元，
                  {result.dailyWage > 200 
                    ? '能在便利店潇洒走一回啦，小馄饨配咖啡，生活美滋滋！' 
                    : '生活略显拮据，每一分钱都要花在刀刃上哦。'}
                </p>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-zinc-500 bg-zinc-50">
                      <tr>
                        <th className="px-4 py-2 rounded-l-lg">物品名称</th>
                        <th className="px-4 py-2">物品价格</th>
                        <th className="px-4 py-2 rounded-r-lg">日薪可购</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {result.purchasingPower.map((item: any) => (
                        <tr key={item.name}>
                          <td className="px-4 py-3 font-medium text-zinc-900">{item.name}</td>
                          <td className="px-4 py-3 text-zinc-500">{item.price} 元/{item.unit}</td>
                          <td className="px-4 py-3 text-blue-600 font-bold">{item.count} {item.unit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Cow Horse Index */}
              <div className="bg-white border border-zinc-200 rounded-2xl p-6 text-center">
                <h3 className="text-lg font-bold text-zinc-900 mb-6">牛马指数</h3>
                <div className={`text-6xl font-black mb-4 ${
                  result.cowHorseIndex < 15 ? 'text-green-500' :
                  result.cowHorseIndex < 25 ? 'text-blue-500' :
                  result.cowHorseIndex < 40 ? 'text-orange-500' : 'text-red-600'
                }`}>
                  {result.cowHorseIndex}
                </div>
                <p className="text-zinc-500 text-sm text-left leading-relaxed bg-zinc-50 p-4 rounded-lg">
                  牛马指数体现打工人薪资与购买能力的辛苦程度。指数越低越轻松，越高越辛苦。
                  <br/>
                  当前指数 <strong>{result.cowHorseIndex}</strong>，
                  {result.cowHorseIndex < 15 ? ' 恭喜你，处于相对舒适的“神仙工作”状态！' :
                   result.cowHorseIndex < 25 ? ' 处于中等偏下的辛苦水平，比较辛苦但还不是最艰难。' :
                   result.cowHorseIndex < 40 ? ' 警告！你的工作性价比极低，正在遭受严重剥削。' :
                   ' 纯纯的牛马，建议立即在此处寻找新的机会！'}
                </p>
              </div>
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
};

export default SalaryScore;
