import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Code2, Github, Sparkles, Zap, Shield } from 'lucide-react';

const Landing: React.FC = () => {
  const features = [
    {
      icon: FileText,
      title: 'README Generator',
      description: 'Create professional GitHub README files with live preview and multiple templates',
      path: '/readme-generator',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Code2,
      title: 'DevSnippet Vault',
      description: 'Browse, save, and manage reusable code snippets across multiple categories',
      path: '/dev-snippets',
      color: 'from-teal-500 to-teal-600'
    }
  ];

  const highlights = [
    {
      icon: Sparkles,
      title: 'Beautiful UI',
      description: 'Clean, modern interface with dark mode support'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Built with Vite and React for optimal performance'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'All data stored locally, no tracking or analytics'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-teal-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl">
            <Github className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">DevDock</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Your all-in-one developer toolkit for creating professional README files and managing code snippets. 
          Built by developers, for developers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/readme-generator"
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Start Creating READMEs
          </Link>
          <Link
            to="/dev-snippets"
            className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 font-semibold rounded-xl transition-all duration-200"
          >
            Browse Snippets
          </Link>
        </div>
      </div>

      {/* Main Features */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {features.map((feature, index) => (
          <Link
            key={index}
            to={feature.path}
            className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:scale-105"
          >
            <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200`}>
              <feature.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              {feature.description}
            </p>
            <div className="mt-6 text-blue-600 dark:text-blue-400 font-semibold group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
              Get Started →
            </div>
          </Link>
        ))}
      </div>

      {/* Highlights */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Why Choose DevDock?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <highlight.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {highlight.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16">
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Ready to streamline your development workflow with professional tools?
        </p>
        <div className="flex justify-center space-x-4">
          <div className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg font-medium">
            ✅ 100% Free
          </div>
          <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-medium">
            🔒 Privacy First
          </div>
          <div className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg font-medium">
            ⚡ Lightning Fast
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;