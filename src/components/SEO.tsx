import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
}

export const SEO = ({ title, description, keywords }: SEOProps) => {
  const siteTitle = '在线实用计算工具站 (EasyCalc)';
  const fullTitle = title === siteTitle ? title : `${title} - ${siteTitle}`;
  const defaultDesc = '简单、好用、免费的在线计算工具集合，覆盖工资、日期、学习、程序员、生活等多个领域的实用计算器。';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      {keywords && <meta name="keywords" content={keywords} />}
    </Helmet>
  );
};
