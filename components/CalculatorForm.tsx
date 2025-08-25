
import React from 'react';
import type { CalculatorInputs, EducationGoal } from '../types.ts';
import { InputSlider } from './InputSlider.tsx';
import { CurrencyInput } from './CurrencyInput.tsx';

interface CalculatorFormProps {
  inputs: CalculatorInputs;
  onInputChange: (field: keyof CalculatorInputs, value: number | EducationGoal) => void;
  onCalculate: () => void;
  onReset: () => void;
  error: string;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({ inputs, onInputChange, onCalculate, onReset, error }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate();
  };

  const goalOptions: { value: EducationGoal; label: string }[] = [
    { value: '18', label: 'Higher Education (Age 18)' },
    { value: '22', label: 'Post-Graduation (Age 22)' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 h-full">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Plan Your Investment</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputSlider
          label="How old are you?"
          value={inputs.yourAge}
          onChange={(value) => onInputChange('yourAge', value)}
          min={18}
          max={60}
          step={1}
          unit="Years"
        />
        <InputSlider
          label="How old is your child today?"
          value={inputs.currentAge}
          onChange={(value) => onInputChange('currentAge', value)}
          min={0}
          max={20}
          step={1}
          unit="Years"
        />

        <div>
          <label className="block mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">Education Goal</label>
          <div className="grid grid-cols-3 gap-2 rounded-lg bg-gray-200 dark:bg-gray-700 p-1">
            {goalOptions.map(option => (
              <button
                type="button"
                key={option.value}
                onClick={() => onInputChange('educationGoal', option.value)}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  inputs.educationGoal === option.value
                    ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        
        {inputs.educationGoal === 'other' && (
           <InputSlider
            label="Child's Target Age"
            value={inputs.targetAge}
            onChange={(value) => onInputChange('targetAge', value)}
            min={inputs.currentAge + 1}
            max={30}
            step={1}
            unit="Years"
          />
        )}
        
        <CurrencyInput
          label="How much would this education cost today?"
          value={inputs.currentCost}
          onChange={(value) => onInputChange('currentCost', value)}
          placeholder="20,00,000"
        />
        <CurrencyInput
          label="Current Savings for Child's Education"
          value={inputs.currentSavings}
          onChange={(value) => onInputChange('currentSavings', value)}
          placeholder="5,00,000"
        />
        <CurrencyInput
          label="Monthly Savings You Can Set Aside"
          value={inputs.monthlySavings}
          onChange={(value) => onInputChange('monthlySavings', value)}
          placeholder="15,000"
        />
        <InputSlider
          label="Expected Inflation Rate"
          value={inputs.inflationRate}
          onChange={(value) => onInputChange('inflationRate', value)}
          min={1}
          max={20}
          step={0.5}
          unit="%"
        />
        <InputSlider
          label="Expected Investment Return"
          value={inputs.returnRate}
          onChange={(value) => onInputChange('returnRate', value)}
          min={1}
          max={30}
          step={0.5}
          unit="%"
        />
        
        {error && (
            <div className="text-red-500 text-sm font-medium p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                {error}
            </div>
        )}

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md px-5 py-3 transition-colors duration-300"
          >
            Calculate
          </button>
          <button
            type="button"
            onClick={onReset}
            className="w-full text-gray-700 bg-gray-200 hover:bg-gray-300 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 font-medium rounded-lg text-md px-5 py-3 transition-colors duration-300"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};