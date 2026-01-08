import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components';

const tools = [
  {
    name: '税后工资计算器',
    description: '快速计算个税、社保、公积金及税后到手工资。',
    href: '/salary/tax-calculator',
  },
  {
    name: '年终奖计税对比',
    description: '计算年终奖个税，对比不同发放方式的税后收益。',
    href: '/salary/bonus-tax',
  },
  {
    name: '五险一金计算',
    description: '根据所在城市计算五险一金缴纳比例和金额。',
    href: '/salary/social-insurance',
  },
  {
    name: '加班费计算',
    description: '根据劳动法计算工作日、周末及节假日加班费。',
    href: '/salary/overtime',
  },
  {
    name: '打工跑分 (牛马指数)',
    description: '测测你的薪资含金量，看看你是打工贵族还是牛马？',
    href: '/salary/score',
  },
];

const SalaryIndex: React.FC = () => {
  return (
    <div className="space-y-8">
      <SEO title="工资与收入计算" description="提供最全的薪资计算工具，包括税后工资计算器、年终奖计算器、五险一金计算器等。" />
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-zinc-900">工资与收入计算</h1>
        <p className="text-zinc-600">
          提供最全的薪资计算工具，帮助你算清每一分钱。
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
                <Calculator className="h-5 w-5" />
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

export default SalaryIndex;
