import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';

// Category Pages
import SalaryIndex from './pages/salary/SalaryIndex';
import TaxCalculator from './pages/salary/TaxCalculator';
import BonusTaxCalculator from './pages/salary/BonusTaxCalculator';
import SocialInsuranceCalculator from './pages/salary/SocialInsuranceCalculator';
import OvertimeCalculator from './pages/salary/OvertimeCalculator';
import SalaryScore from './pages/salary/SalaryScore';

import DateIndex from './pages/date/DateIndex';
import DateDifference from './pages/date/DateDifference';
import Countdown from './pages/date/Countdown';
import WorkdayCalculator from './pages/date/WorkdayCalculator';
import DateOffsetCalculator from './pages/date/DateOffsetCalculator';

import DevIndex from './pages/dev/DevIndex';
import TimestampConverter from './pages/dev/TimestampConverter';
import Base64Converter from './pages/dev/Base64Converter';
import JsonFormatter from './pages/dev/JsonFormatter';

import StudentIndex from './pages/student/StudentIndex';
import GPACalculator from './pages/student/GPACalculator';
import WeightedGradeCalculator from './pages/student/WeightedGradeCalculator';
import TargetScoreCalculator from './pages/student/TargetScoreCalculator';

import LifeIndex from './pages/life/LifeIndex';
import BMICalculator from './pages/life/BMICalculator';
import AreaCalculator from './pages/life/AreaCalculator';
import CalorieCalculator from './pages/life/CalorieCalculator';
import ElectricityCalculator from './pages/life/ElectricityCalculator';

import MathIndex from './pages/math/MathIndex';
import ScientificCalculator from './pages/math/ScientificCalculator';
import EquationSolver from './pages/math/EquationSolver';
import PrimeFactorizer from './pages/math/PrimeFactorizer';
import GcdLcmCalculator from './pages/math/GcdLcmCalculator';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="contact" element={<Contact />} />
          
          {/* Salary Category */}
          <Route path="salary">
            <Route index element={<SalaryIndex />} />
            <Route path="tax-calculator" element={<TaxCalculator />} />
            <Route path="bonus-tax" element={<BonusTaxCalculator />} />
            <Route path="social-insurance" element={<SocialInsuranceCalculator />} />
            <Route path="overtime" element={<OvertimeCalculator />} />
            <Route path="score" element={<SalaryScore />} />
          </Route>

          {/* Date Category */}
          <Route path="date">
            <Route index element={<DateIndex />} />
            <Route path="date-difference" element={<DateDifference />} />
            <Route path="countdown" element={<Countdown />} />
            <Route path="workday" element={<WorkdayCalculator />} />
            <Route path="offset" element={<DateOffsetCalculator />} />
          </Route>

          {/* Dev Category */}
          <Route path="dev">
            <Route index element={<DevIndex />} />
            <Route path="timestamp-converter" element={<TimestampConverter />} />
            <Route path="base64" element={<Base64Converter />} />
            <Route path="json" element={<JsonFormatter />} />
          </Route>

          {/* Student Category */}
          <Route path="student">
            <Route index element={<StudentIndex />} />
            <Route path="gpa" element={<GPACalculator />} />
            <Route path="weighted" element={<WeightedGradeCalculator />} />
            <Route path="target" element={<TargetScoreCalculator />} />
          </Route>

          {/* Life Category */}
          <Route path="life">
            <Route index element={<LifeIndex />} />
            <Route path="bmi" element={<BMICalculator />} />
            <Route path="area" element={<AreaCalculator />} />
            <Route path="calories" element={<CalorieCalculator />} />
            <Route path="electricity" element={<ElectricityCalculator />} />
          </Route>

          {/* Math Category */}
          <Route path="math">
            <Route index element={<MathIndex />} />
            <Route path="scientific-calculator" element={<ScientificCalculator />} />
            <Route path="equation-solver" element={<EquationSolver />} />
            <Route path="prime-factorizer" element={<PrimeFactorizer />} />
            <Route path="gcd-lcm" element={<GcdLcmCalculator />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
