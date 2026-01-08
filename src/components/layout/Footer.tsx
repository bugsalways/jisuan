import React from 'react';
import { Link } from 'react-router-dom';

const navigation = {
  main: [
    { name: '关于我们', href: '/about' },
    { name: '隐私政策', href: '/privacy' },
    { name: '使用条款', href: '/terms' },
    { name: '联系我们', href: '/contact' },
  ],
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-zinc-200 mt-auto">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-16 lg:px-8">
        <nav
          className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
          aria-label="Footer"
        >
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-6">
              <Link
                to={item.href}
                className="text-sm leading-6 text-zinc-600 hover:text-zinc-900 transition-colors"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
        <p className="mt-10 text-center text-xs leading-5 text-zinc-500">
          &copy; {new Date().getFullYear()} 在线实用计算工具站 (EasyCalc). All rights reserved.
        </p>
      </div>
    </footer>
  );
};
