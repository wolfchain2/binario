
import React, { useState, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) {
    return null;
  }

  const sizeClasses = {
    sm: 'w-11/12 max-w-xs sm:max-w-sm',
    md: 'w-11/12 max-w-sm sm:max-w-md',
    lg: 'w-11/12 max-w-md sm:max-w-lg md:max-w-xl', // Added md:max-w-xl for lg modals
  };

  return (
    <div 
      className={`
        fixed inset-0 bg-black flex justify-center items-center z-[1001] p-3 sm:p-4 
        transition-opacity duration-300 ease-out
        ${isVisible ? 'bg-opacity-60 backdrop-blur-sm opacity-100' : 'bg-opacity-0 opacity-0 pointer-events-none'}
      `}
      onClick={onClose} // Allow closing by clicking outside the modal content
    >
      <div 
        className={`
          bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-xl ${sizeClasses[size]} relative 
          transform transition-all duration-300 ease-out max-h-[90vh] flex flex-col
          ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-[-20px] pointer-events-none'}
        `}
        onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
      >
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl sm:text-3xl font-bold"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div className="overflow-y-auto flex-grow"> {/* Make content area scrollable */}
            {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;