
import React from 'react';
import type { CalculationResult } from '../types.ts';
import { formatCurrency } from '../utils/formatters.ts';

interface ResultsDisplayProps {
  result: CalculationResult | null;
}

const ResultCard: React.FC<{ title: string; value: string; description: string;}> = ({ title, value, description }) => (
  <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl">
    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
    <p className="text-3xl font-bold mt-1 text-gray-900 dark:text-white">{value}</p>
    <p className="text-xs mt-2 text-gray-500 dark:text-gray-400">{description}</p>
  </div>
);

const ProgressBar: React.FC<{ value: number }> = ({ value }) => {
    const percentage = Math.max(0, Math.min(100, value));
    return (
        <div>
            <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-gray-700 dark:text-gray-300">Goal Progress</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{percentage.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
                <div 
                    className="bg-gradient-to-r from-teal-400 to-blue-500 h-4 rounded-full" 
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};


export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  if (!result) {
    return (
      <div className="flex items-center justify-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 h-full min-h-[400px]">
        <div className="text-center">
            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-100">Awaiting Calculation</h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Fill in your details to see a projection of your child's education fund.</p>
        </div>
      </div>
    );
  }

  const isOnTrack = result.shortfall <= 0;
  const progressPercentage = (result.totalProjectedSavings / result.futureCost) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Your Education Plan Summary</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Based on your inputs, here's the projection for your {result.yearsToGoal}-year plan.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ResultCard
          title="Future Education Cost"
          value={formatCurrency(result.futureCost)}
          description={`Projected cost in ${result.yearsToGoal} years.`}
        />
        <ResultCard
          title="Your Projected Savings"
          value={formatCurrency(result.totalProjectedSavings)}
          description="Based on current savings & monthly investment."
        />
      </div>
      
      <ProgressBar value={progressPercentage} />

      {isOnTrack ? (
        <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900/40 border border-green-200 dark:border-green-700">
            <h3 className="font-semibold text-green-800 dark:text-green-200">Congratulations! You're on track.</h3>
            <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                You are projected to have a surplus of {formatCurrency(Math.abs(result.shortfall))}. Keep up the great work!
            </p>
        </div>
      ) : (
        <div className="p-4 rounded-lg bg-amber-100 dark:bg-amber-900/40 border border-amber-200 dark:border-amber-700">
            <h3 className="font-semibold text-amber-800 dark:text-amber-200">You have a projected shortfall.</h3>
            <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                Your current plan may not be enough. You have a projected deficit of {formatCurrency(result.shortfall)}.
            </p>
            <div className="mt-4 pt-4 border-t border-amber-300 dark:border-amber-600">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    To reach your goal, you need to save a total of <strong>{formatCurrency(result.requiredTotalMonthlyInvestment)}</strong> per month.
                </p>
            </div>
        </div>
      )}

    </div>
  );
};