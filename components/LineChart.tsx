import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartDataPoint } from '../types';

interface LineChartProps {
  data: ChartDataPoint[];
  lineKey: string;
  lineName: string;
  lineColor?: string;
  showCurrency?: boolean;
}

const LineChart: React.FC<LineChartProps> = ({ data, lineKey, lineName, lineColor = "#0D9488", showCurrency = false }) => {
  const formatCurrency = (value: number) => `$${value.toLocaleString('es-ES')}`;
  
  return (
    <div className="w-full h-56 sm:h-64 md:h-80 bg-gray-50 p-2 sm:p-4 rounded-lg shadow">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data} margin={{ top: 5, right: 10, left: showCurrency ? 5 : -25, bottom: 5 }}> {/* Adjusted margins for smaller screens */}
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" stroke="#6b7280" fontSize="0.75rem" />
          <YAxis 
            stroke="#6b7280" 
            fontSize="0.75rem"
            tickFormatter={showCurrency ? formatCurrency : undefined}
            domain={showCurrency ? ['dataMin - 100', 'dataMax + 100'] : ['auto', 'auto']}
          />
          <Tooltip
            formatter={(value: number) => showCurrency ? formatCurrency(value) : value}
            labelStyle={{ color: '#1f2937', fontSize: '0.75rem' }}
            itemStyle={{ color: lineColor, fontSize: '0.75rem' }}
            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '0.375rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '0.5rem' }}
          />
          <Legend wrapperStyle={{ fontSize: '0.875rem', paddingTop: '10px' }} />
          <Line type="monotone" dataKey="value" name={lineName} stroke={lineColor} strokeWidth={2} dot={{ r: 4, fill: lineColor }} activeDot={{ r: 6 }} />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;