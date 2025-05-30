
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 text-center">
      <p className="text-sm">&copy; {currentYear} P2P CASH. Todos los derechos reservados.</p>
      <p className="text-xs mt-1">Una plataforma de préstamos P2P impulsada por Inteligencia Artificial.</p>
    </footer>
  );
};

export default Footer;