
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../utils/formatters.ts';

interface InvestmentChartProps {
  totalInvestment: number;
  totalReturns: number;
}

const COLORS = ['#60A5FA', '#34D399']; // blue-400, teal-400

export const InvestmentChart: React.FC<InvestmentChartProps> = ({ totalInvestment, totalReturns }) => {
  const data = [
    { name: 'Total Investment', value: totalInvestment > 0 ? totalInvestment : 0 },
    { name: 'Wealth Gained', value: totalReturns > 0 ? totalReturns : 0 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Tooltip
          formatter={(value: number) => [formatCurrency(value), '']}
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            border: '1px solid #ccc',
            borderRadius: '0.5rem',
            color: '#333'
          }}
        />
        <Legend
          verticalAlign="bottom"
          height={36}
          iconType="circle"
          wrapperStyle={{ fontSize: '12px' }}
        />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={70}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};