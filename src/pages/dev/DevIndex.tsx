import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Terminal } from 'lucide-react';
import { SEO } from '../../components';

const tools = [
  {
    name: '时间戳转换',
    description: 'Unix 时间戳与北京时间互转。',
    href: '/dev/timestamp-converter',
    icon: ClockIcon
  },
  {
    name: 'Base64 编解码',
    description: '在线 Base64 加密解密工具。',
    href: '/dev/base64',
    icon: Code
  },
  {
    name: 'JSON 格式化',
    description: 'JSON 美化、压缩与语法校验。',
    href: '/dev/json',
    icon: Code
  },
];

function ClockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

const DevIndex: React.FC = () => {
  return (
    <div className="space-y-8">
      <SEO title="程序员工具" description="提供时间戳转换、Base64编解码、JSON格式化等开发工具。" />
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-zinc-900">程序员工具</h1>
        <p className="text-zinc-600">
          提高开发效率的在线工具箱。
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

export default DevIndex;
