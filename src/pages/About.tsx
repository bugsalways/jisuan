import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto prose prose-zinc">
      <h1>关于我们</h1>
      <p>
        在线实用计算工具站 (EasyCalc) 致力于为您提供简单、快捷、准确的在线计算服务。
      </p>
      <p>
        我们的目标是覆盖工资、日期、学习、开发、生活等多个领域的高频计算需求，
        所有计算均在您的浏览器本地完成，安全可靠，无需担心隐私泄露。
      </p>
      <p>
        如果您有任何建议或发现工具的错误，欢迎通过联系我们页面反馈。
      </p>
    </div>
  );
};

export default About;
