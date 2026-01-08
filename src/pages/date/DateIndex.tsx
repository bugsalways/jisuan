import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { SEO } from '../../components';

const tools = [
  {
    name: '日期差计算',
    description: '计算两个日期之间相差的天数。',
    href: '/date/date-difference',
    icon: Calendar
  },
  {
    name: '倒计时',
    description: '创建目标日期的倒计时，精确到秒。',
    href: '/date/countdown',
    icon: Clock
  },
  {
    name: '工作日计算',
    description: '计算两个日期之间的工作日天数（排除周末）。',
    href: '/date/workday',
    icon: Calendar
  },
  {
    name: '日期推算',
    description: '计算几天后是几号，或几天前是几号。',
    href: '/date/offset',
    icon: Calendar
  },
];

const DateIndex: React.FC = () => {
  return (
    <div className="space-y-8">
      <SEO title="日期时间计算" description="提供日期差计算、工作日计算、倒计时等实用工具。" />
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-zinc-900">日期与时间计算</h1>
        <p className="text-zinc-600">
          简单好用的日期时间工具，帮助你规划时间。
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.name}
            to={tool.href}
            className="block p-6 bg-white rounded-xl border border-zinc-200 hover:border-blue-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <tool.icon className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-semibold text-zinc-900">{tool.name}</h2>
            </div>
            <p className="text-sm text-zinc-500">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DateIndex;
