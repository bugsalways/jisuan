import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components';

const tools = [
  {
    name: '科学计算器',
    description: '在线科学计算器，支持复杂数学运算。',
    href: '/math/scientific-calculator',
    icon: Calculator
  },
  {
    name: '一元二次方程',
    description: '输入系数，快速求解一元二次方程。',
    href: '/math/equation-solver',
    icon: Calculator
  },
  {
    name: '质因数分解',
    description: '将整数分解为质数的乘积。',
    href: '/math/prime-factorizer',
    icon: Calculator
  },
  {
    name: 'GCD & LCM',
    description: '计算最大公约数与最小公倍数。',
    href: '/math/gcd-lcm',
    icon: Calculator
  },
];

const MathIndex: React.FC = () => {
  return (
    <div className="space-y-8">
      <SEO title="数学与科学计算" description="在线科学计算器、数学公式计算工具。" />
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-zinc-900">数学与科学计算</h1>
        <p className="text-zinc-600">
          解决复杂的数学问题。
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

export default MathIndex;
