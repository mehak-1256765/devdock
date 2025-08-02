import React, { useState } from 'react';
import { Wand2, Sparkles, Code, Palette, Layout, Zap } from 'lucide-react';
import { Snippet } from '../types';
import toast from 'react-hot-toast';

interface AISnippetGeneratorProps {
  onSnippetGenerated: (snippet: Snippet) => void;
  onClose: () => void;
}

const AISnippetGenerator: React.FC<AISnippetGeneratorProps> = ({
  onSnippetGenerated,
  onClose
}) => {
  const [prompt, setPrompt] = useState('');
  const [selectedType, setSelectedType] = useState<'component' | 'function' | 'layout' | 'animation' | 'gradient'>('component');
  const [selectedFramework, setSelectedFramework] = useState<'react' | 'vue' | 'vanilla' | 'tailwind'>('react');
  const [isGenerating, setIsGenerating] = useState(false);

  const snippetTypes = [
    { key: 'component', label: 'Component', icon: Code },
    { key: 'function', label: 'Function', icon: Zap },
    { key: 'layout', label: 'Layout', icon: Layout },
    { key: 'animation', label: 'Animation', icon: Sparkles },
    { key: 'gradient', label: 'Gradient', icon: Palette }
  ];

  const frameworks = [
    { key: 'react', label: 'React' },
    { key: 'vue', label: 'Vue.js' },
    { key: 'vanilla', label: 'Vanilla JS' },
    { key: 'tailwind', label: 'Tailwind CSS' }
  ];

  const generateSnippet = async () => {
    if (!prompt.trim()) {
      toast.error('Please describe what you want to create');
      return;
    }

    setIsGenerating(true);

    // Simulate AI generation with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate code based on prompt and selections
    const generatedCode = generateCodeFromPrompt(prompt, selectedType, selectedFramework);
    
    const newSnippet: Snippet = {
      id: `ai-${Date.now()}`,
      title: generateTitle(prompt),
      description: `AI-generated ${selectedType} based on: "${prompt}"`,
      code: generatedCode,
      category: 'AI Generated',
      language: selectedFramework === 'tailwind' ? 'css' : selectedFramework,
      isCustom: true,
      tags: ['ai-generated', selectedType, selectedFramework],
      difficulty: 'intermediate',
      createdAt: new Date().toISOString()
    };

    onSnippetGenerated(newSnippet);
    setIsGenerating(false);
    setPrompt('');
    
    toast.success('AI snippet generated successfully!', {
      icon: '🤖',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      }
    });
  };

  const generateTitle = (prompt: string): string => {
    const words = prompt.split(' ').slice(0, 4);
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const generateCodeFromPrompt = (prompt: string, type: string, framework: string): string => {
    // This is a simplified AI simulation - in a real app, you'd use an actual AI API
    const templates = {
      component: {
        react: `import React from 'react';

const ${generateTitle(prompt).replace(/\s/g, '')} = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            ${generateTitle(prompt)}
          </div>
          <p className="mt-2 text-gray-600">
            Generated component based on your prompt: "${prompt}"
          </p>
          <div className="mt-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Action Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ${generateTitle(prompt).replace(/\s/g, '')};`,
        vue: `<template>
  <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
    <div class="md:flex">
      <div class="p-8">
        <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
          ${generateTitle(prompt)}
        </div>
        <p class="mt-2 text-gray-600">
          Generated component based on your prompt: "${prompt}"
        </p>
        <div class="mt-4">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Action Button
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '${generateTitle(prompt).replace(/\s/g, '')}',
  data() {
    return {
      // Component data
    };
  }
};
</script>`
      },
      function: {
        react: `// ${generateTitle(prompt)} Function
const ${generateTitle(prompt).replace(/\s/g, '').toLowerCase()} = (${prompt.includes('array') ? 'array' : 'input'}) => {
  // Generated function based on: "${prompt}"
  
  try {
    // Add your logic here
    console.log('Processing:', ${prompt.includes('array') ? 'array' : 'input'});
    
    // Example implementation
    return ${prompt.includes('array') ? 'array' : 'input'};
  } catch (error) {
    console.error('Error in ${generateTitle(prompt).replace(/\s/g, '').toLowerCase()}:', error);
    return null;
  }
};

// Usage example:
// const result = ${generateTitle(prompt).replace(/\s/g, '').toLowerCase()}(yourData);

export default ${generateTitle(prompt).replace(/\s/g, '').toLowerCase()};`
      },
      gradient: {
        tailwind: `/* ${generateTitle(prompt)} Gradient Styles */

.${generateTitle(prompt).replace(/\s/g, '').toLowerCase()}-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.${generateTitle(prompt).replace(/\s/g, '').toLowerCase()}-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Tailwind classes for ${prompt} */
.bg-${generateTitle(prompt).replace(/\s/g, '').toLowerCase()} {
  @apply bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500;
}

.text-${generateTitle(prompt).replace(/\s/g, '').toLowerCase()} {
  @apply bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent;
}

/* Animated version */
.animated-${generateTitle(prompt).replace(/\s/g, '').toLowerCase()} {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}`
      }
    };

    return templates[type]?.[framework] || templates.component.react;
  };

  const quickPrompts = [
    'Create a modern card component with hover effects',
    'Build a responsive navigation menu',
    'Design a gradient background with animation',
    'Make a form with validation',
    'Create a dashboard layout',
    'Build a modal dialog component'
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <Wand2 className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              AI Snippet Generator
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          {/* Snippet Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              What do you want to create?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {snippetTypes.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setSelectedType(key as any)}
                  className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                    selectedType === key
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <Icon className="w-5 h-5 mb-1" />
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Framework Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Framework/Technology
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {frameworks.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setSelectedFramework(key as any)}
                  className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                    selectedFramework === key
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Describe what you want to create
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
              placeholder="E.g., Create a modern card component with a gradient background, hover effects, and a call-to-action button..."
            />
          </div>

          {/* Quick Prompts */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Quick Ideas
            </label>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((quickPrompt, index) => (
                <button
                  key={index}
                  onClick={() => setPrompt(quickPrompt)}
                  className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {quickPrompt}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={generateSnippet}
              disabled={!prompt.trim() || isGenerating}
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Snippet</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISnippetGenerator;