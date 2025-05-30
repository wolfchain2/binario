
import React from 'react';

const ChatbotFAB: React.FC = () => {
  const handleChatbotClick = () => {
    alert('Asistente IA P2P CASH activado (funcionalidad simulada).');
  };

  return (
    <button
      onClick={handleChatbotClick}
      title="Asistente IA P2P CASH"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-teal-600 hover:bg-teal-700 text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-2xl sm:text-3xl shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 z-[1000]"
    >
      <span role="img" aria-label="Chatbot icon">AI</span>
    </button>
  );
};

export default ChatbotFAB;