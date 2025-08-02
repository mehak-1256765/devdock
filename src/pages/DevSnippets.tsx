import React, { useState, useMemo } from 'react';
import { Search, Copy, Heart, Plus, Code2, Tag, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import { Snippet } from '../types';
import { defaultSnippets } from '../data/snippets';
import { copyToClipboard } from '../utils/copyToClipboard';
import { useLocalStorage } from '../hooks/useLocalStorage';

const DevSnippets: React.FC = () => {
  const [customSnippets, setCustomSnippets] = useLocalStorage<Snippet[]>('custom-snippets', []);
  const [favorites, setFavorites] = useLocalStorage<string[]>('favorite-snippets', []);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSnippet, setNewSnippet] = useState({
    title: '',
    description: '',
    code: '',
    category: 'Custom',
    language: 'javascript'
  });

  const allSnippets = [...defaultSnippets, ...customSnippets];
  const categories = ['All', ...Array.from(new Set(allSnippets.map(s => s.category)))];

  const filteredSnippets = useMemo(() => {
    return allSnippets.filter(snippet => {
      const matchesSearch = snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          snippet.code.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || snippet.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allSnippets, searchTerm, selectedCategory]);

  const handleCopySnippet = async (code: string, title: string) => {
    const success = await copyToClipboard(code);
    if (success) {
      toast.success(`${title} copied to clipboard!`, {
        icon: '📋',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        }
      });
    } else {
      toast.error('Failed to copy snippet');
    }
  };

  const toggleFavorite = (snippetId: string) => {
    setFavorites(prev => 
      prev.includes(snippetId) 
        ? prev.filter(id => id !== snippetId)
        : [...prev, snippetId]
    );
  };

  const addCustomSnippet = () => {
    if (!newSnippet.title.trim() || !newSnippet.code.trim()) {
      toast.error('Please fill in title and code');
      return;
    }

    const snippet: Snippet = {
      id: Date.now().toString(),
      ...newSnippet,
      isCustom: true
    };

    setCustomSnippets(prev => [...prev, snippet]);
    setNewSnippet({
      title: '',
      description: '',
      code: '',
      category: 'Custom',
      language: 'javascript'
    });
    setShowAddForm(false);
    
    toast.success('Snippet added successfully!', {
      icon: '✨',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      }
    });
  };

  const deleteCustomSnippet = (snippetId: string) => {
    setCustomSnippets(prev => prev.filter(s => s.id !== snippetId));
    setFavorites(prev => prev.filter(id => id !== snippetId));
    toast.success('Snippet deleted!');
  };

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      javascript: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      bash: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      typescript: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      python: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    };
    return colors[language] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          DevSnippet Vault
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Browse, save, and manage reusable code snippets for your development workflow
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full lg:w-auto">
            {/* Search */}
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search snippets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white min-w-48"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>Add Snippet</span>
          </button>
        </div>

        {/* Add Snippet Form */}
        {showAddForm && (
          <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Add Custom Snippet
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={newSnippet.title}
                  onChange={(e) => setNewSnippet(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Snippet title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Language
                </label>
                <select
                  value={newSnippet.language}
                  onChange={(e) => setNewSnippet(prev => ({ ...prev, language: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="typescript">TypeScript</option>
                  <option value="bash">Bash</option>
                  <option value="python">Python</option>
                  <option value="css">CSS</option>
                  <option value="html">HTML</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <input
                type="text"
                value={newSnippet.description}
                onChange={(e) => setNewSnippet(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Brief description of the snippet"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Code *
              </label>
              <textarea
                value={newSnippet.code}
                onChange={(e) => setNewSnippet(prev => ({ ...prev, code: e.target.value }))}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm"
                placeholder="Paste your code here..."
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={addCustomSnippet}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Add Snippet
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600 dark:text-gray-400">
          Showing {filteredSnippets.length} snippet{filteredSnippets.length !== 1 ? 's' : ''}
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
        </p>
      </div>

      {/* Snippets Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredSnippets.map((snippet) => (
          <div
            key={snippet.id}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {snippet.title}
                  </h3>
                  {snippet.isCustom && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                      <Star className="w-3 h-3 mr-1" />
                      Custom
                    </span>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  {snippet.description}
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getLanguageColor(snippet.language)}`}>
                    <Code2 className="w-3 h-3 mr-1" />
                    {snippet.language}
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                    <Tag className="w-3 h-3 mr-1" />
                    {snippet.category}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleFavorite(snippet.id)}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    favorites.includes(snippet.id)
                      ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'text-gray-400 hover:text-red-500 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  aria-label="Toggle favorite"
                >
                  <Heart className={`w-4 h-4 ${favorites.includes(snippet.id) ? 'fill-current' : ''}`} />
                </button>
                {snippet.isCustom && (
                  <button
                    onClick={() => deleteCustomSnippet(snippet.id)}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                    aria-label="Delete snippet"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            <div className="relative">
              <pre className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto border border-gray-200 dark:border-gray-700">
                <code className="text-gray-800 dark:text-gray-200 whitespace-pre">
                  {snippet.code.length > 200 ? `${snippet.code.substring(0, 200)}...` : snippet.code}
                </code>
              </pre>
              <button
                onClick={() => handleCopySnippet(snippet.code, snippet.title)}
                className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                aria-label="Copy code"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredSnippets.length === 0 && (
        <div className="text-center py-12">
          <Code2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No snippets found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Try adjusting your search terms or category filter
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default DevSnippets;