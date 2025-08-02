import React from 'react';
import { Coffee } from 'lucide-react';

const BuyMeCoffee: React.FC = () => {
  const handleClick = () => {
    // Replace with your actual Buy Me a Coffee profile URL
    window.open('https://buymeacoffee.com/yourusername', '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-medium text-sm"
      aria-label="Buy me a coffee"
    >
      <Coffee className="w-5 h-5" />
      <span className="hidden sm:inline">Help keep DevDock free — buy me a coffee ☕</span>
      <span className="sm:hidden">☕</span>
    </button>
  );
};

export default BuyMeCoffee;