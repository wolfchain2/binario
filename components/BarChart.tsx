import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartDataPoint } from '../types';

interface BarChartProps {
  data: ChartDataPoint[];
  barKey: string;
  barName: string;
  barColor?: string;
  showCurrency?: boolean;
}

const BarChart: React.FC<BarChartProps> = ({ data, barKey, barName, barColor = "#34D399", showCurrency = false }) => {
  const formatCurrency = (value: number) => `$${value.toLocaleString('es-ES')}`;

  return (
    <div className="w-full h-56 sm:h-64 md:h-80 bg-gray-50 p-2 sm:p-4 rounded-lg shadow">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} margin={{ top: 5, right: 10, left: showCurrency ? 5 : -25, bottom: 5 }}> {/* Adjusted margins */}
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" stroke="#6b7280" fontSize="0.75rem" />
          <YAxis 
            stroke="#6b7280" 
            fontSize="0.75rem"
            tickFormatter={showCurrency ? formatCurrency : undefined}
          />
          <Tooltip 
            formatter={(value: number) => showCurrency ? formatCurrency(value) : value}
            labelStyle={{ color: '#1f2937', fontSize: '0.75rem' }}
            itemStyle={{ color: barColor, fontSize: '0.75rem' }}
            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '0.375rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '0.5rem' }}
          />
          <Legend wrapperStyle={{ fontSize: '0.875rem', paddingTop: '10px' }} />
          <Bar dataKey="value" name={barName} fill={barColor} radius={[4, 4, 0, 0]} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;