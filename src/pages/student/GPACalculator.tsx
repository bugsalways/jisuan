import React, { useState } from 'react';
import { ToolLayout, SEO } from '../../components';

interface Course {
  id: number;
  name: string;
  grade: number | '';
  credit: number | '';
}

const GPACalculator: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: '', grade: '', credit: '' },
    { id: 2, name: '', grade: '', credit: '' },
    { id: 3, name: '', grade: '', credit: '' },
    { id: 4, name: '', grade: '', credit: '' },
    { id: 5, name: '', grade: '', credit: '' },
  ]);
  const [gpa, setGpa] = useState<number | null>(null);

  const addCourse = () => {
    setCourses([...courses, { id: Date.now(), name: '', grade: '', credit: '' }]);
  };

  const removeCourse = (id: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const updateCourse = (id: number, field: keyof Course, value: string | number) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const calculate = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(c => {
      const grade = Number(c.grade);
      const credit = Number(c.credit);
      if (grade && credit) {
        // Simple 4.0 scale assumption: 
        // 90-100: 4.0, 80-89: 3.0, 70-79: 2.0, 60-69: 1.0, <60: 0
        let point = 0;
        if (grade >= 90) point = 4.0;
        else if (grade >= 80) point = 3.0;
        else if (grade >= 70) point = 2.0;
        else if (grade >= 60) point = 1.0;
        else point = 0;

        totalPoints += point * credit;
        totalCredits += credit;
      }
    });

    if (totalCredits > 0) {
      setGpa(totalPoints / totalCredits);
    }
  };

  return (
    <>
      <SEO 
        title="GPA 计算器" 
        description="大学生GPA绩点计算器，支持标准4.0算法，输入成绩和学分即可快速计算平均绩点。" 
        keywords="GPA计算器,绩点计算,平均学分绩点,大学生工具"
      />
      <ToolLayout
        title="GPA 计算器"
        description="输入课程成绩和学分，计算平均学分绩点 (GPA)。"
        explanation={
          <>
            <p>本计算器采用常见的 4.0 算法（标准算法）：</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>90-100分：4.0</li>
              <li>80-89分：3.0</li>
              <li>70-79分：2.0</li>
              <li>60-69分：1.0</li>
              <li>60分以下：0</li>
            </ul>
          </>
        }
      >
        <div className="space-y-6">
          <div className="space-y-4">
            {courses.map((course, index) => (
              <div key={course.id} className="flex gap-2 sm:gap-4 items-center">
                 <span className="text-zinc-400 w-6 text-center">{index + 1}</span>
                 <input
                   placeholder="课程名称 (可选)"
                   className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                   value={course.name}
                   onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                 />
                 <input
                   placeholder="成绩 (0-100)"
                   type="number"
                   className="block w-24 sm:w-32 rounded-md border-zinc-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                   value={course.grade}
                   onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                 />
                 <input
                   placeholder="学分"
                   type="number"
                   className="block w-20 sm:w-24 rounded-md border-zinc-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                   value={course.credit}
                   onChange={(e) => updateCourse(course.id, 'credit', e.target.value)}
                 />
                 <button 
                   onClick={() => removeCourse(course.id)}
                   className="text-red-500 hover:text-red-700 px-2"
                   disabled={courses.length <= 1}
                 >
                   ×
                 </button>
              </div>
            ))}
          </div>
          
          <button
            onClick={addCourse}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            + 添加课程
          </button>

          <div className="pt-4 border-t border-zinc-200">
            <button
                onClick={calculate}
                className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
                计算 GPA
            </button>
          </div>

          {gpa !== null && (
            <div className="mt-8 p-6 bg-zinc-50 rounded-xl border border-zinc-200 text-center">
              <p className="text-sm text-zinc-500 mb-2">平均学分绩点 (GPA)</p>
              <p className="text-4xl font-bold text-blue-600">
                {gpa.toFixed(2)}
              </p>
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
};

export default GPACalculator;
