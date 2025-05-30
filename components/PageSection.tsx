
import React from 'react';

interface PageSectionProps {
  title?: string;
  intro?: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  introClassName?: string;
}

const PageSection: React.FC<PageSectionProps> = ({ title, intro, children, className = '', titleClassName = '', introClassName= '' }) => {
  return (
    <section className={`py-6 sm:py-8 ${className}`}>
      {title && (
        <h2 className={`text-2xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-3 text-center ${titleClassName}`}>
          {title}
        </h2>
      )}
      {intro && (
        <p className={`text-sm sm:text-base text-gray-600 text-center max-w-3xl mx-auto mb-6 sm:mb-8 px-2 ${introClassName}`}>
          {intro}
        </p>
      )}
      {children}
    </section>
  );
};

export default PageSection;