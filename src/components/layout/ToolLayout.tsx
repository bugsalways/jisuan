import React from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface ToolLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  explanation?: React.ReactNode;
  faq?: FAQItem[];
}

export const ToolLayout = ({
  title,
  description,
  children,
  explanation,
  faq,
}: ToolLayoutProps) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Tool Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-zinc-900 sm:text-4xl">{title}</h1>
        {description && <p className="text-lg text-zinc-600">{description}</p>}
      </div>

      {/* Tool Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-6 sm:p-8">
        {children}
      </div>


      {/* Explanation */}
      {explanation && (
        <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-6 prose prose-zinc max-w-none">
          <h2 className="text-xl font-semibold text-zinc-900 mb-4">工具说明</h2>
          {explanation}
        </div>
      )}

      {/* FAQ */}
      {faq && faq.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-6">
          <h2 className="text-xl font-semibold text-zinc-900 mb-6">常见问题</h2>
          <div className="space-y-6">
            {faq.map((item, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-base font-medium text-zinc-900">{item.question}</h3>
                <p className="text-zinc-600 text-sm leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
