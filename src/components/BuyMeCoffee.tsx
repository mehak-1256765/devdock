import React, { useState } from 'react';
import { Coffee, X, ChevronDown } from 'lucide-react';

const BuyMeCoffee: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleRazorpayClick = () => {
    window.open('https://razorpay.me/@mehak2768', '_blank', 'noopener,noreferrer');
    setDropdownOpen(false);
  };

  return (
    <>
      {/* Floating Button with Dropdown */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 bg-gradient-to-r from-pink-500 via-red-400 to-orange-400 hover:brightness-110 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-medium text-sm"
            aria-label="Buy me a coffee"
          >
            <Coffee className="w-5 h-5" />
            <span className="hidden sm:inline">Buy Me a Coffee</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* Dropdown menu */}
          {dropdownOpen && (
            <div className="absolute bottom-full right-0 mb-4 w-72 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-sm text-gray-800 z-50">
              <p className="mb-3 text-gray-600">
                I’m saving up for a laptop 💻 — DevDock will always stay free.  
                If you liked it, support me below!
              </p>
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleRazorpayClick}
                  className="w-full text-left bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md"
                >
                  💳 Pay via Razorpay
                </button>
                <button
                  onClick={() => {
                    setShowQR(true);
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md"
                >
                  📱 Pay via UPI (QR)
                </button>
              </div>
            </div>
          )}
        </div>
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
              Scan this QR to send money via UPI — thanks for your support!
            </p>
            <img
              src="/upi.jpeg" // your UPI QR image path
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
