
import React from 'react';

const SummaryCard: React.FC<{ title: string; value: string; subtext?: string; }> = ({ title, value, subtext }) => (
    <div className="bg-white p-3 sm:p-4 md:p-5 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
        <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5 truncate">{title}</h4>
        <p className="text-lg sm:text-xl md:text-2xl font-bold text-teal-600 truncate">{value}</p>
        {subtext && <p className="text-xs text-gray-700 mt-0.5 sm:mt-1 truncate">{subtext}</p>}
    </div>
);

export default SummaryCard;