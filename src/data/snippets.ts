import { Snippet } from '../types';

export const defaultSnippets: Snippet[] = [
  // Navbar Snippets
  {
    id: 'navbar-1',
    title: 'Modern Navigation Bar',
    description: 'Clean and responsive navigation bar with mobile menu toggle',
    code: `import React, { useState } from 'react';
import { Menu, X, Home, User, Settings, Mail } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Logo
              </h1>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                <Home className="w-4 h-4 mr-2" />
                Home
              </a>
              <a href="#" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                <User className="w-4 h-4 mr-2" />
                About
              </a>
              <a href="#" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                <Settings className="w-4 h-4 mr-2" />
                Services
              </a>
              <a href="#" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                <Mail className="w-4 h-4 mr-2" />
                Contact
              </a>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <a href="#" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
              <Home className="w-4 h-4 mr-2" />
              Home
            </a>
            <a href="#" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
              <User className="w-4 h-4 mr-2" />
              About
            </a>
            <a href="#" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
              <Settings className="w-4 h-4 mr-2" />
              Services
            </a>
            <a href="#" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
              <Mail className="w-4 h-4 mr-2" />
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;`,
    category: 'Navigation',
    language: 'javascript',
    tags: ['react', 'responsive', 'mobile-menu'],
    difficulty: 'intermediate'
  },
  {
    id: 'navbar-2',
    title: 'Glassmorphism Navbar',
    description: 'Beautiful glassmorphism navbar with backdrop blur effect',
    code: `import React from 'react';
import { Search, Bell, User, ChevronDown } from 'lucide-react';

const GlassNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="text-2xl font-bold text-white">
              Brand
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-white/90 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10">
                Home
              </a>
              <a href="#" className="text-white/90 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10">
                Products
              </a>
              <a href="#" className="text-white/90 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10">
                About
              </a>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
              />
            </div>
            <button className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all">
              <Bell className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2 cursor-pointer hover:bg-white/10 px-3 py-2 rounded-lg transition-all">
              <User className="w-5 h-5 text-white/80" />
              <ChevronDown className="w-4 h-4 text-white/60" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default GlassNavbar;`,
    category: 'Navigation',
    language: 'javascript',
    tags: ['glassmorphism', 'modern', 'blur'],
    difficulty: 'intermediate'
  },

  // Footer Snippets
  {
    id: 'footer-1',
    title: 'Modern Footer',
    description: 'Clean and organized footer with multiple sections and social links',
    code: `import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Company
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Building amazing digital experiences with cutting-edge technology and creative design.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Services</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Portfolio</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Web Development</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Mobile Apps</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">UI/UX Design</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Digital Marketing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">SEO</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300 text-sm">hello@company.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300 text-sm">123 Main St, City, State</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Company Name. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;`,
    category: 'Footer',
    language: 'javascript',
    tags: ['react', 'responsive', 'social-links'],
    difficulty: 'beginner'
  },

  // Gradient Snippets
  {
    id: 'gradient-1',
    title: 'Animated Gradient Background',
    description: 'Beautiful animated gradient background with CSS animations',
    code: `// CSS (add to your stylesheet)
.animated-gradient {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

// React Component
import React from 'react';

const AnimatedGradientBg = ({ children }) => {
  return (
    <div className="animated-gradient min-h-screen flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
        {children}
      </div>
    </div>
  );
};

export default AnimatedGradientBg;`,
    category: 'Gradients',
    language: 'javascript',
    tags: ['css', 'animation', 'background'],
    difficulty: 'intermediate'
  },
  {
    id: 'gradient-2',
    title: 'Gradient Text Effects',
    description: 'Collection of beautiful gradient text effects using Tailwind CSS',
    code: `import React from 'react';

const GradientTextExamples = () => {
  return (
    <div className="space-y-8 p-8">
      {/* Ocean Gradient */}
      <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent text-center">
        Ocean Wave
      </h1>

      {/* Sunset Gradient */}
      <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent text-center">
        Sunset Glow
      </h2>

      {/* Forest Gradient */}
      <h3 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 bg-clip-text text-transparent text-center">
        Forest Dream
      </h3>

      {/* Rainbow Gradient */}
      <h4 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent text-center">
        Rainbow Magic
      </h4>

      {/* Dark Gradient */}
      <h5 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-gray-700 via-gray-900 to-black bg-clip-text text-transparent text-center">
        Dark Matter
      </h5>
    </div>
  );
};

export default GradientTextExamples;`,
    category: 'Gradients',
    language: 'javascript',
    tags: ['tailwind', 'text-effects', 'design'],
    difficulty: 'beginner'
  },
  {
    id: 'gradient-3',
    title: 'Gradient Buttons Collection',
    description: 'Modern gradient buttons with hover effects and animations',
    code: `import React from 'react';

const GradientButtons = () => {
  return (
    <div className="flex flex-wrap gap-4 p-8">
      {/* Primary Gradient Button */}
      <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 hover:from-blue-600 hover:to-purple-700">
        Primary Action
      </button>

      {/* Success Gradient Button */}
      <button className="px-6 py-3 bg-gradient-to-r from-green-400 to-teal-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 hover:from-green-500 hover:to-teal-600">
        Success
      </button>

      {/* Warning Gradient Button */}
      <button className="px-6 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 hover:from-orange-500 hover:to-red-600">
        Warning
      </button>

      {/* Outlined Gradient Button */}
      <button className="px-6 py-3 border-2 border-transparent bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-border text-transparent bg-clip-text font-medium rounded-lg hover:text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-violet-500 transition-all duration-200 relative overflow-hidden group">
        <span className="relative z-10">Outlined</span>
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
      </button>

      {/* Neon Gradient Button */}
      <button className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-medium rounded-lg shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-200 border border-cyan-400/50 hover:border-cyan-300">
        Neon Effect
      </button>

      {/* Glass Gradient Button */}
      <button className="px-6 py-3 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm text-white font-medium rounded-lg border border-white/20 hover:bg-gradient-to-r hover:from-white/30 hover:to-white/20 transition-all duration-200">
        Glass Effect
      </button>
    </div>
  );
};

export default GradientButtons;`,
    category: 'Gradients',
    language: 'javascript',
    tags: ['buttons', 'hover-effects', 'ui-components'],
    difficulty: 'intermediate'
  },

  // Utility Snippets
  {
    id: 'util-1',
    title: 'Responsive Grid Layout',
    description: 'Flexible responsive grid system using CSS Grid',
    code: `import React from 'react';

const ResponsiveGrid = ({ children, minWidth = '300px', gap = '1rem' }) => {
  return (
    <div 
      className="grid gap-4"
      style={{
        gridTemplateColumns: \`repeat(auto-fit, minmax(\${minWidth}, 1fr))\`,
        gap: gap
      }}
    >
      {children}
    </div>
  );
};

// Usage Example
const GridExample = () => {
  const items = Array.from({ length: 12 }, (_, i) => (
    <div key={i} className="bg-gradient-to-br from-blue-100 to-purple-100 p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Card {i + 1}</h3>
      <p className="text-gray-600">This is a responsive grid item that adapts to screen size.</p>
    </div>
  ));

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Responsive Grid Layout</h2>
      <ResponsiveGrid minWidth="250px" gap="1.5rem">
        {items}
      </ResponsiveGrid>
    </div>
  );
};

export default GridExample;`,
    category: 'Layout',
    language: 'javascript',
    tags: ['responsive', 'grid', 'layout'],
    difficulty: 'intermediate'
  },
  {
    id: 'util-2',
    title: 'Dark Mode Toggle',
    description: 'Complete dark mode implementation with system preference detection',
    code: `import React, { useState, useEffect } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';

const DarkModeToggle = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'system';
    }
    return 'system';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    localStorage.setItem('theme', theme);
  }, [theme]);

  const themes = [
    { key: 'light', label: 'Light', icon: Sun },
    { key: 'dark', label: 'Dark', icon: Moon },
    { key: 'system', label: 'System', icon: Monitor }
  ];

  return (
    <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
      {themes.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          onClick={() => setTheme(key)}
          className={\`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 \${
            theme === key
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-700/50'
          }\`}
          title={\`Switch to \${label} mode\`}
        >
          <Icon className="w-4 h-4" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default DarkModeToggle;`,
    category: 'Components',
    language: 'javascript',
    tags: ['dark-mode', 'theme', 'accessibility'],
    difficulty: 'advanced'
  }
];