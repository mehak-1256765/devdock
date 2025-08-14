import React from 'react';
import Header from './Header';
// import BuyMeCoffee from './BuyMeCoffee';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen transition-colors duration-200 bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="container px-4 py-8 mx-auto sm:px-6 lg:px-8">
        {children}
      </main>
      {/* <BuyMeCoffee /> */}
    </div>
  );
};

export default Layout;