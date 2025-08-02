import React from 'react';
import Header from './Header';
import BuyMeCoffee from './BuyMeCoffee';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <BuyMeCoffee />
    </div>
  );
};

export default Layout;