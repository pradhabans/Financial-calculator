
import React, { useState, useCallback } from 'react';
import { CalculatorForm } from './components/CalculatorForm.tsx';
import { ResultsDisplay } from './components/ResultsDisplay.tsx';
import type { CalculatorInputs, CalculationResult, EducationGoal } from './types.ts';
import { initialInputs } from './constants.ts';

const App: React.FC = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>(initialInputs);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string>('');

  const handleInputChange = useCallback((field: keyof CalculatorInputs, value: number | EducationGoal) => {
    setInputs(prevInputs => {
      const newInputs = { ...prevInputs, [field]: value };
      
      if (field === 'educationGoal') {
        if (value === '18') newInputs.targetAge = 18;
        if (value === '22') newInputs.targetAge = 22;
      }

      // Ensure target age is always greater than current age
      if (field === 'currentAge' && newInputs.targetAge <= (value as number)) {
        newInputs.targetAge = (value as number) + 1;
      }
      
      return newInputs;
    });
    setError('');
    setResult(null);
  }, []);

  const handleCalculate = useCallback(() => {
    if (inputs.targetAge <= inputs.currentAge) {
      setError("Target age must be greater than your child's current age.");
      setResult(null);
      return;
    }

    setError('');
    
    const years = inputs.targetAge - inputs.currentAge;
    const months = years * 12;
    const annualReturnRate = inputs.returnRate / 100;
    const monthlyReturnRate = annualReturnRate / 12;
    const inflationRate = inputs.inflationRate / 100;

    // 1. Future Education Cost
    const futureCost = inputs.currentCost * Math.pow(1 + inflationRate, years);

    // 2. Future value of existing savings (lump sum)
    const fvLumpSum = inputs.currentSavings * Math.pow(1 + annualReturnRate, years);

    // 3. Future value of planned monthly savings (SIP)
    const fvSip = months > 0 && monthlyReturnRate > 0
      ? inputs.monthlySavings * ((Math.pow(1 + monthlyReturnRate, months) - 1) / monthlyReturnRate)
      : inputs.monthlySavings * months;

    const totalProjectedSavings = fvLumpSum + fvSip;

    // 4. Shortfall or Surplus
    const shortfall = futureCost - totalProjectedSavings;

    // 5. Required total monthly investment to meet the goal
    const lumpSumContributionToFuture = inputs.currentSavings * Math.pow(1 + monthlyReturnRate, months);
    const requiredFutureValueFromSip = futureCost - lumpSumContributionToFuture;
    
    let requiredTotalMonthlyInvestment = 0;
    if (requiredFutureValueFromSip > 0 && months > 0 && monthlyReturnRate > 0) {
        requiredTotalMonthlyInvestment = requiredFutureValueFromSip * (monthlyReturnRate / (Math.pow(1 + monthlyReturnRate, months) - 1));
    } else if (requiredFutureValueFromSip > 0) {
        requiredTotalMonthlyInvestment = requiredFutureValueFromSip / months;
    }
    
    setResult({
      futureCost,
      yearsToGoal: years,
      totalProjectedSavings,
      shortfall,
      requiredTotalMonthlyInvestment: requiredTotalMonthlyInvestment > 0 ? requiredTotalMonthlyInvestment : 0,
    });

  }, [inputs]);

  const handleReset = useCallback(() => {
    setInputs(initialInputs);
    setResult(null);
    setError('');
  }, []);

  return (
    <div className="min-h-screen font-sans text-gray-800 dark:text-gray-200 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
            Children's Education Planner
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Plan, save, and secure your child's future education.
          </p>
        </header>
        <main className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <CalculatorForm 
              inputs={inputs} 
              onInputChange={handleInputChange} 
              onCalculate={handleCalculate} 
              onReset={handleReset}
              error={error}
            />
          </div>
          <div className="lg:col-span-3">
            <ResultsDisplay result={result} />
          </div>
        </main>
        <footer className="text-center mt-12 text-gray-500 dark:text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Education Planner. All rights reserved.</p>
          <p className="mt-1">Disclaimer: This calculator is for illustrative purposes only.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;