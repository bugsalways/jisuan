import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Calendar, GraduationCap, Code2, Heart, Sigma } from 'lucide-react';
import { SEO } from '../components/SEO';

const categories = [
  {
    title: '工资与收入计算',
    description: '税后工资、年终奖、五险一金、加班费计算',
    icon: Calculator,
    href: '/salary',
    color: 'bg-blue-500',
  },
  {
    title: '日期时间计算',
    description: '日期差、工作日、倒计时、时间推算',
    icon: Calendar,
    href: '/date',
    color: 'bg-green-500',
  },
  {
    title: '学生与考试工具',
    description: 'GPA计算、加权成绩、目标分数反推',
    icon: GraduationCap,
    href: '/student',
    color: 'bg-yellow-500',
  },
  {
    title: '程序员工具',
    description: '时间戳转换、JSON格式化、Base64编解码',
    icon: Code2,
    href: '/dev',
    color: 'bg-purple-500',
  },
  {
    title: '生活常用计算',
    description: 'BMI、面积、卡路里、电费估算',
    icon: Heart,
    href: '/life',
    color: 'bg-pink-500',
  },
  {
    title: '数学与科学计算',
    description: '科学计算器、三角函数、数学公式',
    icon: Sigma,
    href: '/math',
    color: 'bg-indigo-500',
  },
];

const Home: React.FC = () => {
  return (
    <div className="space-y-12">
      <SEO 
        title="在线实用计算工具站" 
        description="简单、好用、免费的在线计算工具集合，覆盖工作、学习、生活等多个场景。" 
        keywords="计算器,在线工具,工资计算,日期计算,学生工具,程序员工具,生活计算"
      />
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
          在线实用计算工具站
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-zinc-600">
          简单、好用、免费的在线计算工具集合，覆盖工作、学习、生活等多个场景。
        </p>
      </section>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.title}
            to={category.href}
            className="block p-6 bg-white rounded-xl border border-zinc-200 hover:border-blue-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className={`p-3 rounded-lg text-white ${category.color} group-hover:scale-110 transition-transform duration-300`}>
                <category.icon className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-zinc-900">{category.title}</h2>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed pl-[3.25rem]">
              {category.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
