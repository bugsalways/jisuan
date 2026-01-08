import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calculator } from 'lucide-react';
import { clsx } from 'clsx';

const navigation = [
  { name: '工资计算', href: '/salary' },
  { name: '日期时间', href: '/date' },
  { name: '学生工具', href: '/student' },
  { name: '程序员工具', href: '/dev' },
  { name: '生活计算', href: '/life' },
];

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-white shadow-sm border-b border-zinc-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Calculator className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-zinc-900">EasyCalc</span>
            </Link>
            <div className="hidden ml-10 space-x-8 lg:block">
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={clsx(
                    'text-sm font-medium transition-colors duration-200',
                    isActive(link.href)
                      ? 'text-blue-600'
                      : 'text-zinc-500 hover:text-zinc-900'
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="lg:hidden">
            <button
              type="button"
              className="rounded-md p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-zinc-100">
            <div className="flex flex-col space-y-2">
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={clsx(
                    'block rounded-md px-3 py-2 text-base font-medium',
                    isActive(link.href)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
