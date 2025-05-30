
import React from 'react';
import { Stat } from '../types';

// const useAnimatedCounter = (targetValue: number, duration: number = 1500, initialValue: number = 0) => { ... };

const StatCard: React.FC<{ stat: Stat }> = ({ stat }) => {
  return (
    <div className="bg-teal-50 p-4 sm:p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition-transform duration-300">
      {stat.labelTop && (
        <div className="text-xs sm:text-sm font-medium text-teal-600 mb-1 uppercase tracking-wider">{stat.labelTop}</div>
      )}
      <div className="text-3xl sm:text-4xl font-bold text-gray-800 my-1 sm:my-2">
        {stat.valueString ? stat.valueString : (
          <>
            Needs configuration if animation is desired
          </>
        )}
      </div>
      <div className="text-xs sm:text-sm text-gray-600 mt-1">{stat.label}</div>
    </div>
  );
};

export default StatCard;