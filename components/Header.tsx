
import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { NavItem } from '../types';
import { NAV_ITEMS } from '../constants';

// Simple Robot Icon SVG
const RobotIcon: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    aria-hidden="true"
  >
    <rect x="2" y="8" width="20" height="12" rx="2"></rect>
    <circle cx="7" cy="14" r="1"></circle>
    <circle cx="17" cy="14" r="1"></circle>
    <path d="M12 18v-4M8 6h8"></path>
    <path d="M9 3h6l2 3H7z"></path>
  </svg>
);

// Hamburger Icon
const MenuIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

// Close Icon
const XIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false); // Close mobile menu on route change
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/home" className="flex items-center text-lg sm:text-xl font-bold text-teal-600 hover:text-teal-700 transition-colors">
          <RobotIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-1.5 sm:mr-2 text-teal-500" />
          <span>P2P CASH</span>
        </Link>

        {/* Desktop Navigation Links and Action Buttons Container */}
        <div className="hidden md:flex items-center space-x-3 md:space-x-4">
          {NAV_ITEMS.map((item: NavItem) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-2 py-1.5 text-xs sm:text-sm rounded hover:bg-teal-50 transition-colors ${
                  isActive
                    ? 'text-teal-600 font-semibold'
                    : 'text-gray-600 hover:text-teal-500'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <button
            onClick={() => navigate('/registro')}
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-1.5 px-3 sm:py-2 sm:px-4 rounded-md text-xs sm:text-sm transition-colors duration-150 shadow-sm hover:shadow-md"
          >
            Registrarse
          </button>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-600 hover:text-teal-600 focus:outline-none"
            aria-label="Abrir menú de navegación"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-40 border-t border-gray-200">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-2">
            {NAV_ITEMS.map((item: NavItem) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 text-sm rounded hover:bg-teal-50 transition-colors ${
                    isActive
                      ? 'text-teal-600 font-semibold bg-teal-100'
                      : 'text-gray-700 hover:text-teal-600'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <button
              onClick={() => { navigate('/registro'); setIsMobileMenuOpen(false); }}
              className="w-full mt-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2.5 px-4 rounded-md text-sm transition-colors duration-150 shadow-sm hover:shadow-md"
            >
              Registrarse
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;