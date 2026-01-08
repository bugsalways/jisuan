import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { SEO } from '../../components';

const tools = [
  {
    name: 'BMI 计算器',
    description: '输入身高体重，评估身体健康状况。',
    href: '/life/bmi',
    icon: Heart
  },
  {
    name: '面积计算器',
    description: '矩形、圆形、三角形面积计算。',
    href: '/life/area',
    icon: Heart
  },
  {
    name: '卡路里计算',
    description: '估算每日 TDEE 和 BMR 热量消耗。',
    href: '/life/calories',
    icon: Heart
  },
  {
    name: '电费估算',
    description: '计算家用电器耗电量及电费成本。',
    href: '/life/electricity',
    icon: Heart
  },
];

const LifeIndex: React.FC = () => {
  return (
    <div className="space-y-8">
      <SEO title="生活常用计算" description="BMI计算器、卡路里计算、电费估算等生活实用工具。" />
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-zinc-900">生活常用计算</h1>
        <p className="text-zinc-600">
          贴心的生活小助手。
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

export default LifeIndex;
