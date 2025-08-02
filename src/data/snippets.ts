import { Snippet } from '../types';

export const defaultSnippets: Snippet[] = [
  // JavaScript Utilities
  {
    id: '1',
    title: 'Debounce Function',
    description: 'Delays function execution until after specified delay',
    code: `function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}`,
    category: 'JavaScript Utilities',
    language: 'javascript'
  },
  {
    id: '2',
    title: 'Deep Clone Object',
    description: 'Creates a deep copy of an object',
    code: `function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (typeof obj === 'object') {
    const clonedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
}`,
    category: 'JavaScript Utilities',
    language: 'javascript'
  },
  {
    id: '3',
    title: 'Throttle Function',
    description: 'Limits function execution to once per specified interval',
    code: `function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}`,
    category: 'JavaScript Utilities',
    language: 'javascript'
  },
  // React Snippets
  {
    id: '4',
    title: 'useLocalStorage Hook',
    description: 'Custom hook for localStorage management',
    code: `import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}`,
    category: 'React Snippets',
    language: 'javascript'
  },
  {
    id: '5',
    title: 'useDebounce Hook',
    description: 'Debounce values in React components',
    code: `import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}`,
    category: 'React Snippets',
    language: 'javascript'
  },
  // Git Commands
  {
    id: '6',
    title: 'Reset to Previous Commit',
    description: 'Reset repository to a previous commit',
    code: `# Soft reset (keeps changes staged)
git reset --soft HEAD~1

# Mixed reset (unstages changes)
git reset --mixed HEAD~1

# Hard reset (discards all changes)
git reset --hard HEAD~1`,
    category: 'Git Commands',
    language: 'bash'
  },
  {
    id: '7',
    title: 'Interactive Rebase',
    description: 'Interactive rebase for last N commits',
    code: `# Interactive rebase for last 3 commits
git rebase -i HEAD~3

# Common actions in interactive rebase:
# pick = use commit
# reword = use commit, but edit message
# edit = use commit, but stop for amending
# squash = use commit, but meld into previous commit
# drop = remove commit`,
    category: 'Git Commands',
    language: 'bash'
  },
  {
    id: '8',
    title: 'Stash Management',
    description: 'Git stash commands for temporary storage',
    code: `# Stash current changes
git stash

# Stash with message
git stash push -m "work in progress"

# List all stashes
git stash list

# Apply latest stash
git stash apply

# Apply and remove latest stash
git stash pop

# Drop specific stash
git stash drop stash@{0}`,
    category: 'Git Commands',
    language: 'bash'
  },
  // Regex Patterns
  {
    id: '9',
    title: 'Email Validation',
    description: 'Regex pattern for email validation',
    code: `const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Usage
const isValidEmail = (email) => emailRegex.test(email);

// More comprehensive email regex
const strictEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_\`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;`,
    category: 'Regex Patterns',
    language: 'javascript'
  },
  {
    id: '10',
    title: 'Phone Number Validation',
    description: 'Regex patterns for phone number validation',
    code: `// US phone number formats
const usPhoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

// International phone number (basic)
const intlPhoneRegex = /^\+?[1-9]\d{1,14}$/;

// Usage
const isValidUSPhone = (phone) => usPhoneRegex.test(phone);
const isValidIntlPhone = (phone) => intlPhoneRegex.test(phone);`,
    category: 'Regex Patterns',
    language: 'javascript'
  },
  // Terminal Commands
  {
    id: '11',
    title: 'File Operations',
    description: 'Common file and directory operations',
    code: `# Create directory and subdirectories
mkdir -p path/to/directory

# Copy files/directories recursively
cp -r source/ destination/

# Move/rename files
mv oldname newname

# Find files by name
find . -name "*.js" -type f

# Find and delete files
find . -name "*.log" -type f -delete

# Check disk usage
du -sh *

# File permissions
chmod 755 filename
chmod -R 644 directory/`,
    category: 'Terminal Commands',
    language: 'bash'
  },
  {
    id: '12',
    title: 'Process Management',
    description: 'Commands for managing system processes',
    code: `# List running processes
ps aux | grep process_name

# Kill process by PID
kill -9 1234

# Kill process by name
pkill process_name

# Background and foreground jobs
command &        # Run in background
jobs            # List background jobs
fg %1           # Bring job 1 to foreground
bg %1           # Send job 1 to background

# Monitor system resources
top             # Real-time process viewer
htop            # Enhanced process viewer`,
    category: 'Terminal Commands',
    language: 'bash'
  }
];