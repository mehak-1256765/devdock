import React, { useState, useMemo } from 'react';
import { Search, Copy, Heart, Plus, Code2, Tag, Star, Wand2, Filter, Grid, List } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Snippet } from '../types';
import { defaultSnippets } from '../data/snippets';
import { copyToClipboard } from '../utils/copyToClipboard';
import { useLocalStorage } from '../hooks/useLocalStorage';
import AISnippetGenerator from '../components/AISnippetGenerator';

const DevSnippets: React.FC = () => {
  const [customSnippets, setCustomSnippets] = useLocalStorage<Snippet[]>('custom-snippets', []);
  const [favorites, setFavorites] = useLocalStorage<string[]>('favorite-snippets', []);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'title' | 'category' | 'recent'>('title');
  const [newSnippet, setNewSnippet] = useState({
    title: '',
    description: '',
    code: '',
    category: 'Custom',
    language: 'javascript',
    difficulty: 'beginner' as 'beginner' | 'intermediate' | 'advanced'
  });

  const allSnippets = [...defaultSnippets, ...customSnippets];
  const categories = ['All', ...Array.from(new Set(allSnippets.map(s => s.category)))];
  const difficulties = ['All', 'beginner', 'intermediate', 'advanced'];

  const filteredSnippets = useMemo(() => {
    let filtered = allSnippets.filter(snippet => {
      const matchesSearch = snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          snippet.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          snippet.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || snippet.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || snippet.difficulty === selectedDifficulty;
      return matchesSearch && matchesCategory && matchesDifficulty;
    });

    // Sort snippets
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'category':
          return a.category.localeCompare(b.category);
        case 'recent':
          return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
        default:
          return a.title.localeCompare(b.title);
      }
    });

    return filtered;
  }, [allSnippets, searchTerm, selectedCategory, selectedDifficulty, sortBy]);

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
      isCustom: true,
      createdAt: new Date().toISOString()
    };

    setCustomSnippets(prev => [...prev, snippet]);
    setNewSnippet({
      title: '',
      description: '',
      code: '',
      category: 'Custom',
      language: 'javascript',
      difficulty: 'beginner'
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

  const handleAISnippetGenerated = (snippet: Snippet) => {
    setCustomSnippets(prev => [...prev, snippet]);
    setShowAIGenerator(false);
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
      css: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
      html: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      vue: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
      react: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300',
    };
    return colors[language] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  };

  const getDifficultyColor = (difficulty?: string) => {
    const colors: { [key: string]: string } = {
      beginner: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      advanced: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    };
    return colors[difficulty || 'beginner'] || colors.beginner;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            DevSnippet Vault
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Your ultimate collection of beautiful, responsive code snippets. Browse, create, and manage reusable components with AI assistance.
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-xl border border-white/20 dark:border-gray-700/50 mb-8">
          {/* Primary Controls */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
            <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full lg:w-auto">
              {/* Search */}
              <div className="relative flex-1 min-w-0 sm:min-w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search snippets, tags, or code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white min-w-0 sm:min-w-48"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowAIGenerator(true)}
                className="flex items-center space-x-2 px-4 sm:px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Wand2 className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">AI Generate</span>
                <span className="sm:hidden">AI</span>
              </button>
              
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center space-x-2 px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Add Snippet</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>
          </div>

          {/* Secondary Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-3">
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty === 'All' ? 'All Levels' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="title">Sort by Title</option>
                <option value="category">Sort by Category</option>
                <option value="recent">Sort by Recent</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'list'
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Add Snippet Form */}
          {showAddForm && (
            <div className="mt-6 p-4 sm:p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
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
                    <option value="react">React</option>
                    <option value="vue">Vue.js</option>
                    <option value="bash">Bash</option>
                    <option value="python">Python</option>
                    <option value="css">CSS</option>
                    <option value="html">HTML</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    value={newSnippet.category}
                    onChange={(e) => setNewSnippet(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="e.g., Components, Utilities"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Difficulty
                  </label>
                  <select
                    value={newSnippet.difficulty}
                    onChange={(e) => setNewSnippet(prev => ({ ...prev, difficulty: e.target.value as any }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
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
                  rows={8}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm"
                  placeholder="Paste your code here..."
                />
              </div>
              <div className="flex flex-wrap gap-3">
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
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Showing {filteredSnippets.length} snippet{filteredSnippets.length !== 1 ? 's' : ''}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {selectedDifficulty !== 'All' && ` • ${selectedDifficulty} level`}
          </p>
        </div>

        {/* Snippets Display */}
        {viewMode === 'grid' ? (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {filteredSnippets.map((snippet) => (
              <div
                key={snippet.id}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 truncate">
                        {snippet.title}
                      </h3>
                      {snippet.isCustom && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 flex-shrink-0">
                          <Star className="w-3 h-3 mr-1" />
                          Custom
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                      {snippet.description}
                    </p>
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getLanguageColor(snippet.language)}`}>
                        <Code2 className="w-3 h-3 mr-1" />
                        {snippet.language}
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                        <Tag className="w-3 h-3 mr-1" />
                        {snippet.category}
                      </span>
                      {snippet.difficulty && (
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(snippet.difficulty)}`}>
                          {snippet.difficulty}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0 ml-4">
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
                  <pre className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 text-sm overflow-x-auto border border-gray-200 dark:border-gray-700 max-h-64">
                    <code className="text-gray-800 dark:text-gray-200 whitespace-pre">
                      {snippet.code.length > 300 ? `${snippet.code.substring(0, 300)}...` : snippet.code}
                    </code>
                  </pre>
                  <button
                    onClick={() => handleCopySnippet(snippet.code, snippet.title)}
                    className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                    aria-label="Copy code"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSnippets.map((snippet) => (
              <div
                key={snippet.id}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                        {snippet.title}
                      </h3>
                      {snippet.isCustom && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                          <Star className="w-3 h-3 mr-1" />
                          Custom
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {snippet.description}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getLanguageColor(snippet.language)}`}>
                        <Code2 className="w-4 h-4 mr-1" />
                        {snippet.language}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                        <Tag className="w-4 h-4 mr-1" />
                        {snippet.category}
                      </span>
                      {snippet.difficulty && (
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(snippet.difficulty)}`}>
                          {snippet.difficulty}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 flex-shrink-0">
                    <button
                      onClick={() => handleCopySnippet(snippet.code, snippet.title)}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </button>
                    <button
                      onClick={() => toggleFavorite(snippet.id)}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        favorites.includes(snippet.id)
                          ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
                          : 'text-gray-400 hover:text-red-500 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                      aria-label="Toggle favorite"
                    >
                      <Heart className={`w-5 h-5 ${favorites.includes(snippet.id) ? 'fill-current' : ''}`} />
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
              </div>
            ))}
          </div>
        )}

        {filteredSnippets.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <Code2 className="w-20 h-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                No snippets found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Try adjusting your search terms, category, or difficulty filter. Or create a new snippet to get started!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setSelectedDifficulty('All');
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Clear Filters
                </button>
                <button
                  onClick={() => setShowAIGenerator(true)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                >
                  Generate with AI
                </button>
              </div>
            </div>
          </div>
        )}

        {/* AI Snippet Generator Modal */}
        {showAIGenerator && (
          <AISnippetGenerator
            onSnippetGenerated={handleAISnippetGenerated}
            onClose={() => setShowAIGenerator(false)}
          />
        )}
      </div>
    </div>
  );
};

export default DevSnippets;