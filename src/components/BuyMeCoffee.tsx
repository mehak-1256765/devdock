import React, { useState } from 'react';
import { Coffee, X } from 'lucide-react';

const BuyMeCoffee: React.FC = () => {
  const [showQR, setShowQR] = useState(false);

  const handleClick = () => {
    window.open('https://ko-fi.com/mehakthakur', '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50 group">
        <div className="absolute bottom-full right-0 mb-2 w-64 p-2 text-sm text-white bg-black rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg">
          I’m saving up for a new laptop 💻 — this app will always be free!  
          If you love using it, feel free to buy me a coffee ☕ — any amount helps!
        </div>

        <button
          onClick={handleClick}
          className="flex items-center gap-2 bg-gradient-to-r from-pink-500 via-red-400 to-orange-400 hover:brightness-110 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-medium text-sm"
          aria-label="Support me on Ko-fi"
        >
          <Coffee className="w-5 h-5" />
          <span className="hidden sm:inline">Support DevDock — Buy me a Coffee ☕</span>
          <span className="sm:hidden">☕</span>
        </button>

        {/* Toggle QR for UPI */}
        <button
          onClick={() => setShowQR(!showQR)}
          className="absolute -left-12 top-1/2 transform -translate-y-1/2 bg-white text-black border border-gray-300 rounded-full p-2 shadow hover:bg-gray-100"
          title="Prefer UPI?"
        >
          ₹
        </button>
      </div>

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center relative">
            <button
              onClick={() => setShowQR(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold mb-2">Support via UPI</h2>
            <p className="mb-4 text-sm text-gray-700">
              Scan this QR to send money via UPI — thank you so much for your support!
            </p>
            <img
              src="/upi.jpeg" // Replace with your actual QR code image path
              alt="UPI QR Code"
              className="w-48 mx-auto rounded-md"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default BuyMeCoffee;
