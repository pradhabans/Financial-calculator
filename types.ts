export type EducationGoal = '18' | '22' | 'other';

export interface CalculatorInputs {
  yourAge: number;
  currentAge: number; // Child's current age
  educationGoal: EducationGoal;
  targetAge: number; // Child's target age
  currentCost: number;
  inflationRate: number;
  currentSavings: number;
  monthlySavings: number;
  returnRate: number; // Expected investment return
}

export interface CalculationResult {
  yearsToGoal: number;
  futureCost: number;
  totalProjectedSavings: number;
  shortfall: number; // Will be negative if there's a surplus
  requiredTotalMonthlyInvestment: number;
}
