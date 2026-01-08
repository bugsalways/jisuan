import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { SEO } from '../../components';

const tools = [
  {
    name: 'GPA 计算器',
    description: '输入课程成绩和学分，快速计算 GPA。',
    href: '/student/gpa',
    icon: GraduationCap
  },
  {
    name: '加权成绩计算',
    description: '计算加权平均分，适用于期末总评。',
    href: '/student/weighted',
    icon: GraduationCap
  },
  {
    name: '目标分数反推',
    description: '想拿高分，期末至少要考多少分？',
    href: '/student/target',
    icon: GraduationCap
  },
];

const StudentIndex: React.FC = () => {
  return (
    <div className="space-y-8">
      <SEO title="学生与考试工具" description="GPA计算器、成绩分析等大学生必备工具。" />
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-zinc-900">学生与考试工具</h1>
        <p className="text-zinc-600">
          助你规划学业，轻松计算成绩。
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

export default StudentIndex;
