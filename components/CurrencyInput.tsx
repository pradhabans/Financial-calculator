import React from 'react';

interface CurrencyInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({ label, value, onChange, placeholder }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    // Remove non-digit characters
    const sanitizedValue = rawValue.replace(/[^\d]/g, '');
    const numberValue = parseInt(sanitizedValue, 10);
    onChange(isNaN(numberValue) ? 0 : numberValue);
  };
  
  const formattedValue = value > 0 ? new Intl.NumberFormat('en-IN').format(value) : '';

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">₹</span>
        <input
          type="text"
          value={formattedValue}
          onChange={handleInputChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-8 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder || "0"}
        />
      </div>
    </div>
  );
};
