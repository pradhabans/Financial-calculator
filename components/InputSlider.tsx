
import React from 'react';

interface InputSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  unit: string;
}

export const InputSlider: React.FC<InputSliderProps> = ({ label, value, onChange, min, max, step, unit }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = e.target.value === '' ? min : parseFloat(e.target.value);
    if (!isNaN(numValue)) {
      onChange(Math.max(min, Math.min(max, numValue)));
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseFloat(e.target.value));
  };
  
  const backgroundSize = ((value - min) * 100) / (max - min);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <span className="px-3 py-1 text-sm font-semibold text-blue-800 bg-blue-100 dark:bg-blue-900 dark:text-blue-200 rounded-full">
          {value} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleSliderChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        style={{ 
            background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${backgroundSize}%, #E5E7EB ${backgroundSize}%, #E5E7EB 100%)`
        }}
      />
    </div>
  );
};
