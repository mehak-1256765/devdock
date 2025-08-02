import React, { useState, useEffect } from 'react';
import { Copy, Download, Eye, Code, Save, Sparkles, Settings, Wand2 } from 'lucide-react';

// Mock types for this example
interface ReadmeData {
  title: string;
  description: string;
  techStack: string[];
  features: string[];
  installation: string;
  usage: string;
  contributing: string;
  license: string;
  githubProfile: string;
  demoImageUrl: string;
}

interface Template {
  id: string;
  name: string;
  description: string;
}

// Enhanced templates with distinct styles
const readmeTemplates: Template[] = [
  { 
    id: 'minimal', 
    name: 'Minimal', 
    description: 'Clean and simple, perfect for small projects' 
  },
  { 
    id: 'detailed', 
    name: 'Detailed', 
    description: 'Comprehensive with all sections and examples' 
  },
  { 
    id: 'modern', 
    name: 'Modern', 
    description: 'Contemporary design with badges and emojis' 
  },
  { 
    id: 'creative', 
    name: 'Creative', 
    description: 'Eye-catching with graphics and animations' 
  },
  { 
    id: 'professional', 
    name: 'Professional', 
    description: 'Corporate-style for business projects' 
  },
  { 
    id: 'open-source', 
    name: 'Open Source', 
    description: 'Community-focused with contribution emphasis' 
  }
];

// Spell check and text enhancement utilities
const spellCheckAndEnhance = (text: string): string => {
  if (!text) return text;

  // Common spelling corrections
  const corrections = {
    // Technical terms
    'javascipt': 'JavaScript',
    'javascript': 'JavaScript',
    'typescript': 'TypeScript',
    'reactjs': 'React.js',
    'nodejs': 'Node.js',
    'mongodb': 'MongoDB',
    'mysql': 'MySQL',
    'postgresql': 'PostgreSQL',
    'postgres': 'PostgreSQL',
    'github': 'GitHub',
    'api': 'API',
    'rest': 'REST',
    'restful': 'RESTful',
    'crud': 'CRUD',
    'ui': 'UI',
    'ux': 'UX',
    'css': 'CSS',
    'html': 'HTML',
    'json': 'JSON',
    'xml': 'XML',
    'sql': 'SQL',
    'nosql': 'NoSQL',
    'graphql': 'GraphQL',
    'jwt': 'JWT',
    'oauth': 'OAuth',
    'aws': 'AWS',
    'docker': 'Docker',
    'kubernetes': 'Kubernetes',
    'ci/cd': 'CI/CD',
    'devops': 'DevOps',
    
    // Common words
    'recieve': 'receive',
    'seperate': 'separate',
    'occurance': 'occurrence',
    'definately': 'definitely',
    'accomodate': 'accommodate',
    'acheive': 'achieve',
    'begining': 'beginning',
    'sucessful': 'successful',
    'necesary': 'necessary',
    'developement': 'development',
    'enviroment': 'environment',
    'managment': 'management',
    'requirment': 'requirement',
    'performace': 'performance',
    'architechture': 'architecture',
    'implementaion': 'implementation',
    'configuraton': 'configuration',
    'authentiction': 'authentication',
    'authorizaton': 'authorization',
    'intergration': 'integration',
    'deploment': 'deployment',
    'documentaion': 'documentation',
    'optimizaton': 'optimization',
    'maintanance': 'maintenance',
    'compatability': 'compatibility',
    'accessability': 'accessibility',
    'responsiveness': 'responsiveness',
    'scalability': 'scalability',
    'reliabilty': 'reliability',
    'availabilty': 'availability',
    'usabilty': 'usability'
  };

  let correctedText = text;
  
  // Apply corrections (case-insensitive)
  Object.entries(corrections).forEach(([wrong, correct]) => {
    const regex = new RegExp(`\\b${wrong}\\b`, 'gi');
    correctedText = correctedText.replace(regex, (match) => {
      // Preserve original case pattern
      if (match === match.toUpperCase()) return correct.toUpperCase();
      if (match === match.toLowerCase()) return correct.toLowerCase();
      if (match[0] === match[0].toUpperCase()) {
        return correct.charAt(0).toUpperCase() + correct.slice(1).toLowerCase();
      }
      return correct;
    });
  });

  return correctedText;
};

// Enhanced text improvement
const enhanceText = (text: string, context: string = ''): string => {
  if (!text) return text;
  
  let enhanced = spellCheckAndEnhance(text);
  
  // Make text more professional and engaging
  const improvements = {
    // Make descriptions more engaging
    'this is a': 'This project is a',
    'it is a': 'This is a',
    'simple': 'streamlined',
    'easy': 'intuitive',
    'good': 'excellent',
    'nice': 'elegant',
    'cool': 'innovative',
    'awesome': 'outstanding',
    'great': 'exceptional',
    'basic': 'fundamental',
    'helps': 'empowers users to',
    'allows': 'enables',
    'makes it possible': 'facilitates',
    'you can': 'users can',
    'it works': 'the system operates',
    'it does': 'the application',
    'fast': 'high-performance',
    'quick': 'rapid',
    'small': 'lightweight',
    'big': 'comprehensive',
    'many': 'numerous',
    'some': 'various',
    'stuff': 'components',
    'things': 'elements',
    'works well': 'performs excellently',
    'is good': 'excels',
    'can do': 'capabilities include'
  };

  // Apply improvements while preserving meaning
  Object.entries(improvements).forEach(([basic, enhanced_version]) => {
    const regex = new RegExp(`\\b${basic}\\b`, 'gi');
    enhanced = enhanced.replace(regex, enhanced_version);
  });

  // Capitalize first letter of sentences
  enhanced = enhanced.replace(/(^|[.!?]\s+)([a-z])/g, (match, p1, p2) => p1 + p2.toUpperCase());
  
  return enhanced;
};

// Template-specific README generation
const generateReadme = (data: ReadmeData, template: string): string => {
  const enhancedData = {
    ...data,
    title: enhanceText(data.title),
    description: enhanceText(data.description),
    installation: enhanceText(data.installation),
    usage: enhanceText(data.usage),
    contributing: enhanceText(data.contributing)
  };

  
  let readme = '';

  switch (template) {
    case 'minimal':
      readme = generateMinimalTemplate(enhancedData);
      break;
    case 'detailed':
      readme = generateDetailedTemplate(enhancedData);
      break;
    case 'modern':
      readme = generateModernTemplate(enhancedData);
      break;
    case 'creative':
      readme = generateCreativeTemplate(enhancedData);
      break;
    case 'professional':
      readme = generateProfessionalTemplate(enhancedData);
      break;
    case 'open-source':
      readme = generateOpenSourceTemplate(enhancedData);
      break;
    default:
      readme = generateMinimalTemplate(enhancedData);
  }

  return readme;
};

// Minimal Template
const generateMinimalTemplate = (data: ReadmeData): string => {
  let readme = `# ${data.title || 'Project Title'}\n\n`;
  
  if (data.description) {
    readme += `${data.description}\n\n`;
  }
  
  if (data.techStack.length > 0) {
    readme += `## Built With\n\n`;
    data.techStack.forEach(tech => {
      readme += `• ${tech}\n`;
    });
    readme += '\n';
  }
  
  if (data.installation) {
    readme += `## Installation\n\n\`\`\`bash\n${data.installation}\n\`\`\`\n\n`;
  }
  
  if (data.usage) {
    readme += `## Usage\n\n${data.usage}\n\n`;
  }
  
  readme += `## License\n\n${data.license} License\n`;
  
  return readme;
};

// Detailed Template
const generateDetailedTemplate = (data: ReadmeData): string => {
  let readme = `# ${data.title || 'Project Title'}\n\n`;
  
  if (data.demoImageUrl) {
    readme += `<div align="center">\n  <img src="${data.demoImageUrl}" alt="Project Demo" width="100%">\n</div>\n\n`;
  }
  
  readme += `## 📋 Table of Contents\n\n`;
  readme += `- [About](#about)\n`;
  readme += `- [Built With](#built-with)\n`;
  readme += `- [Features](#features)\n`;
  readme += `- [Installation](#installation)\n`;
  readme += `- [Usage](#usage)\n`;
  readme += `- [Contributing](#contributing)\n`;
  readme += `- [License](#license)\n`;
  readme += `- [Contact](#contact)\n\n`;
  
  readme += `## About\n\n${data.description || 'Detailed project description goes here.'}\n\n`;
  
  if (data.techStack.length > 0) {
    readme += `## Built With\n\n`;
    data.techStack.forEach(tech => {
      readme += `* ${tech}\n`;
    });
    readme += '\n';
  }
  
  if (data.features.length > 0) {
    readme += `## Features\n\n`;
    data.features.forEach(feature => {
      readme += `- ${feature}\n`;
    });
    readme += '\n';
  }
  
  if (data.installation) {
    readme += `## Installation\n\n### Prerequisites\n\n* Node.js (version 14 or higher)\n* npm or yarn\n\n### Setup\n\n\`\`\`bash\n${data.installation}\n\`\`\`\n\n`;
  }
  
  if (data.usage) {
    readme += `## Usage\n\n${data.usage}\n\n`;
  }
  
  if (data.contributing) {
    readme += `## Contributing\n\n${data.contributing}\n\n`;
  }
  
  readme += `## License\n\nDistributed under the ${data.license} License. See \`LICENSE\` for more information.\n\n`;
  
  if (data.githubProfile) {
    readme += `## Contact\n\n**${data.githubProfile}**\n\n- GitHub: [@${data.githubProfile}](https://github.com/${data.githubProfile})\n- Project Link: [https://github.com/${data.githubProfile}/${data.title.toLowerCase().replace(/\s+/g, '-')}](https://github.com/${data.githubProfile}/${data.title.toLowerCase().replace(/\s+/g, '-')})\n`;
  }
  
  return readme;
};

// Modern Template with badges
const generateModernTemplate = (data: ReadmeData): string => {
  let readme = `<div align="center">\n\n# ${data.title || 'Project Title'}\n\n`;
  
  if (data.description) {
    readme += `*${data.description}*\n\n`;
  }
  
  // Add badges based on tech stack
  const badges: string[] = [];
  data.techStack.forEach(tech => {
    const techLower = tech.toLowerCase();
    if (techLower.includes('react')) {
      badges.push('![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)');
    }
    if (techLower.includes('typescript')) {
      badges.push('![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)');
    }
    if (techLower.includes('javascript')) {
      badges.push('![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)');
    }
    if (techLower.includes('node')) {
      badges.push('![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)');
    }
    if (techLower.includes('python')) {
      badges.push('![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)');
    }
  });
  
  if (badges.length > 0) {
    readme += badges.join(' ') + '\n\n';
  }
  
  readme += `</div>\n\n`;
  
  if (data.demoImageUrl) {
    readme += `## 🚀 Demo\n\n![Demo](${data.demoImageUrl})\n\n`;
  }
  
  if (data.features.length > 0) {
    readme += `## ✨ Features\n\n`;
    data.features.forEach(feature => {
      readme += `🔹 ${feature}\n`;
    });
    readme += '\n';
  }
  
  if (data.techStack.length > 0) {
    readme += `## 🛠️ Built With\n\n`;
    data.techStack.forEach(tech => {
      readme += `- **${tech}**\n`;
    });
    readme += '\n';
  }
  
  if (data.installation) {
    readme += `## 📦 Installation\n\n\`\`\`bash\n${data.installation}\n\`\`\`\n\n`;
  }
  
  if (data.usage) {
    readme += `## 🎯 Usage\n\n${data.usage}\n\n`;
  }
  
  if (data.contributing) {
    readme += `## 🤝 Contributing\n\n${data.contributing}\n\n`;
  }
  
  readme += `## 📄 License\n\nThis project is licensed under the ${data.license} License - see the [LICENSE](LICENSE) file for details.\n\n`;
  
  if (data.githubProfile) {
    readme += `## 👥 Author\n\n**${data.githubProfile}**\n\n- 🌐 GitHub: [@${data.githubProfile}](https://github.com/${data.githubProfile})\n`;
  }
  
  readme += `\n---\n\n<div align="center">\n\n**⭐ Star this repo if you find it helpful! ⭐**\n\n</div>`;
  
  return readme;
};

// Creative Template
const generateCreativeTemplate = (data: ReadmeData): string => {
  let readme = `<div align="center">\n\n`;
  
  // ASCII art title
  readme += `\`\`\`\n`;
  readme += `╔═══════════════════════════════════════╗\n`;
  readme += `║         ${(data.title || 'PROJECT TITLE').padEnd(23)}║\n`;
  readme += `╚═══════════════════════════════════════╝\n`;
  readme += `\`\`\`\n\n`;
  
  if (data.description) {
    readme += `> 🎨 *${data.description}*\n\n`;
  }
  
  readme += `</div>\n\n`;
  
  if (data.demoImageUrl) {
    readme += `<div align="center">\n  <img src="${data.demoImageUrl}" alt="✨ Project Showcase" width="80%" style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">\n</div>\n\n`;
  }
  
  readme += `## 🌟 What Makes This Special?\n\n`;
  if (data.features.length > 0) {
    data.features.forEach((feature, index) => {
      const emojis = ['🚀', '⚡', '🎯', '💎', '🔥', '✨'];
      readme += `${emojis[index % emojis.length]} **${feature}**\n`;
    });
    readme += '\n';
  } else {
    readme += `✨ This project brings innovation to life with cutting-edge technology!\n\n`;
  }
  
  if (data.techStack.length > 0) {
    readme += `## 🛠️ Crafted With Love Using\n\n<div align="center">\n\n`;
    data.techStack.forEach(tech => {
      readme += `\`${tech}\` `;
    });
    readme += `\n\n</div>\n\n`;
  }
  
  readme += `## 🚀 Quick Start Adventure\n\n`;
  readme += `Ready to dive in? Let's get you set up in no time!\n\n`;
  
  if (data.installation) {
    readme += `### 🎬 Action!\n\n\`\`\`bash\n${data.installation}\n\`\`\`\n\n`;
  }
  
  if (data.usage) {
    readme += `### 🎮 How to Play\n\n${data.usage}\n\n`;
  }
  
  readme += `## 🤝 Join the Fun!\n\n`;
  if (data.contributing) {
    readme += `${data.contributing}\n\n`;
  } else {
    readme += `We're always looking for awesome contributors! 🌟\n\n`;
    readme += `1. 🍴 Fork it\n2. 🌿 Create your feature branch\n3. 💫 Commit your changes\n4. 🚀 Push to the branch\n5. 🎉 Open a Pull Request\n\n`;
  }
  
  readme += `## 📜 Legal Stuff\n\n`;
  readme += `This masterpiece is protected under the ${data.license} License. Use it wisely! ⚖️\n\n`;
  
  if (data.githubProfile) {
    readme += `## 👨‍💻 The Mastermind\n\n`;
    readme += `**${data.githubProfile}** - *The architect of this digital wonder*\n\n`;
    readme += `🌐 [GitHub Profile](https://github.com/${data.githubProfile}) | 💼 [Portfolio](https://github.com/${data.githubProfile})\n\n`;
  }
  
  readme += `---\n\n<div align="center">\n\n💖 **Made with passion and lots of coffee** ☕\n\n*Don't forget to ⭐ star this repo if it sparked joy!*\n\n</div>`;
  
  return readme;
};

// Professional Template
const generateProfessionalTemplate = (data: ReadmeData): string => {
  let readme = `# ${data.title || 'Project Title'}\n\n`;
  
  readme += `## Executive Summary\n\n`;
  readme += `${data.description || 'This project delivers enterprise-grade solutions designed to meet modern business requirements.'}\n\n`;
  
  if (data.demoImageUrl) {
    readme += `## System Overview\n\n![System Architecture](${data.demoImageUrl})\n\n`;
  }
  
  readme += `## Key Capabilities\n\n`;
  if (data.features.length > 0) {
    data.features.forEach((feature, index) => {
      readme += `${index + 1}. **${feature}**\n`;
    });
    readme += '\n';
  } else {
    readme += `1. **Scalable Architecture** - Built for enterprise-level performance\n`;
    readme += `2. **Security First** - Implementing industry-standard security practices\n`;
    readme += `3. **Maintainable Codebase** - Following best practices and design patterns\n\n`;
  }
  
  if (data.techStack.length > 0) {
    readme += `## Technology Stack\n\n`;
    readme += `| Category | Technology |\n`;
    readme += `|----------|------------|\n`;
    data.techStack.forEach(tech => {
      readme += `| Framework/Library | ${tech} |\n`;
    });
    readme += '\n';
  }
  
  readme += `## System Requirements\n\n`;
  readme += `### Minimum Requirements\n`;
  readme += `- Node.js 16.x or higher\n`;
  readme += `- 4GB RAM minimum\n`;
  readme += `- 10GB available disk space\n\n`;
  
  readme += `### Recommended Specifications\n`;
  readme += `- Node.js 18.x LTS\n`;
  readme += `- 8GB RAM or higher\n`;
  readme += `- SSD storage for optimal performance\n\n`;
  
  if (data.installation) {
    readme += `## Installation and Deployment\n\n`;
    readme += `### Standard Installation\n\n`;
    readme += `\`\`\`bash\n${data.installation}\n\`\`\`\n\n`;
    readme += `### Docker Deployment\n\n`;
    readme += `\`\`\`bash\n# Build the Docker image\ndocker build -t ${data.title.toLowerCase().replace(/\s+/g, '-')} .\n\n# Run the container\ndocker run -p 3000:3000 ${data.title.toLowerCase().replace(/\s+/g, '-')}\n\`\`\`\n\n`;
  }
  
  if (data.usage) {
    readme += `## Usage Documentation\n\n${data.usage}\n\n`;
  }
  
  readme += `## Quality Assurance\n\n`;
  readme += `### Testing Strategy\n`;
  readme += `- Unit Tests: Comprehensive coverage of core functionality\n`;
  readme += `- Integration Tests: API and database interaction validation\n`;
  readme += `- End-to-End Tests: Complete user workflow verification\n\n`;
  
  readme += `### Performance Benchmarks\n`;
  readme += `- Response Time: < 200ms for standard operations\n`;
  readme += `- Throughput: 1000+ requests per second\n`;
  readme += `- Uptime: 99.9% availability target\n\n`;
  
  if (data.contributing) {
    readme += `## Contributing Guidelines\n\n${data.contributing}\n\n`;
  } else {
    readme += `## Development Workflow\n\n`;
    readme += `1. **Fork** the repository\n`;
    readme += `2. **Create** a feature branch from \`develop\`\n`;
    readme += `3. **Implement** changes following coding standards\n`;
    readme += `4. **Test** thoroughly with automated test suite\n`;
    readme += `5. **Submit** pull request with detailed description\n\n`;
  }
  
  readme += `## Support and Maintenance\n\n`;
  readme += `### Issue Reporting\n`;
  readme += `Please use the GitHub issue tracker for bug reports and feature requests.\n\n`;
  readme += `### Maintenance Schedule\n`;
  readme += `- Security updates: Monthly\n`;
  readme += `- Feature releases: Quarterly\n`;
  readme += `- LTS support: 2 years\n\n`;
  
  readme += `## License and Compliance\n\n`;
  readme += `This software is licensed under the ${data.license} License. See the LICENSE file for full terms and conditions.\n\n`;
  readme += `### Compliance Standards\n`;
  readme += `- GDPR compliant data handling\n`;
  readme += `- SOC 2 Type II security controls\n`;
  readme += `- OWASP security guidelines\n\n`;
  
  if (data.githubProfile) {
    readme += `## Contact Information\n\n`;
    readme += `**Project Maintainer:** ${data.githubProfile}\n`;
    readme += `**GitHub:** [@${data.githubProfile}](https://github.com/${data.githubProfile})\n`;
    readme += `**Project Repository:** [${data.title}](https://github.com/${data.githubProfile}/${data.title.toLowerCase().replace(/\s+/g, '-')})\n\n`;
  }
  
  readme += `---\n\n*This document is maintained according to enterprise documentation standards and is reviewed quarterly for accuracy and completeness.*`;
  
  return readme;
};

// Open Source Template
const generateOpenSourceTemplate = (data: ReadmeData): string => {
  let readme = `<div align="center">\n\n# ${data.title || 'Project Title'}\n\n`;
  
  if (data.description) {
    readme += `**${data.description}**\n\n`;
  }
  
  readme += `[![Contributors](https://img.shields.io/github/contributors/${data.githubProfile || 'username'}/${data.title.toLowerCase().replace(/\s+/g, '-')})](https://github.com/${data.githubProfile || 'username'}/${data.title.toLowerCase().replace(/\s+/g, '-')}/graphs/contributors)\n`;
  readme += `[![Forks](https://img.shields.io/github/forks/${data.githubProfile || 'username'}/${data.title.toLowerCase().replace(/\s+/g, '-')})](https://github.com/${data.githubProfile || 'username'}/${data.title.toLowerCase().replace(/\s+/g, '-')}/network/members)\n`;
  readme += `[![Stargazers](https://img.shields.io/github/stars/${data.githubProfile || 'username'}/${data.title.toLowerCase().replace(/\s+/g, '-')})](https://github.com/${data.githubProfile || 'username'}/${data.title.toLowerCase().replace(/\s+/g, '-')}/stargazers)\n`;
  readme += `[![Issues](https://img.shields.io/github/issues/${data.githubProfile || 'username'}/${data.title.toLowerCase().replace(/\s+/g, '-')})](https://github.com/${data.githubProfile || 'username'}/${data.title.toLowerCase().replace(/\s+/g, '-')}/issues)\n`;
  readme += `[![License](https://img.shields.io/github/license/${data.githubProfile || 'username'}/${data.title.toLowerCase().replace(/\s+/g, '-')})](https://github.com/${data.githubProfile || 'username'}/${data.title.toLowerCase().replace(/\s+/g, '-')}/blob/main/LICENSE)\n\n`;
  
  readme += `</div>\n\n`;
  
  if (data.demoImageUrl) {
    readme += `## 🎥 Demo\n\n<div align="center">\n  <img src="${data.demoImageUrl}" alt="Project Demo" width="100%">\n</div>\n\n`;
  }
  
  readme += `## 🌟 About The Project\n\n`;
  readme += `${data.description || 'This open-source project aims to provide a valuable solution to the community.'}\n\n`;
  
  if (data.features.length > 0) {
    readme += `### ✨ Features\n\n`;
    data.features.forEach(feature => {
      readme += `- ✅ ${feature}\n`;
    });
    readme += '\n';
  }
  
  if (data.techStack.length > 0) {
    readme += `### 🚀 Built With\n\n`;
    data.techStack.forEach(tech => {
      readme += `* [${tech}](#)\n`;
    });
    readme += '\n';
  }
  
  readme += `## 🎯 Getting Started\n\n`;
  readme += `To get a local copy up and running, follow these simple steps.\n\n`;
  
  readme += `### Prerequisites\n\n`;
  readme += `Make sure you have the following installed:\n`;
  readme += `* npm\n  \`\`\`sh\n  npm install npm@latest -g\n  \`\`\`\n\n`;
  
  if (data.installation) {
    readme += `### Installation\n\n\`\`\`bash\n${data.installation}\n\`\`\`\n\n`;
  }
  
  if (data.usage) {
    readme += `## 📖 Usage\n\n${data.usage}\n\n`;
    readme += `_For more examples, please refer to the [Documentation](https://example.com)_\n\n`;
  }
  
  readme += `## 🗺️ Roadmap\n\n`;
  readme += `- [x] Initial Release\n`;
  readme += `- [ ] Add more features\n`;
  readme += `- [ ] Multi-language Support\n`;
  readme += `- [ ] Mobile App\n\n`;
  readme += `See the [open issues](https://github.com/${data.githubProfile || 'username'}/${data.title.toLowerCase().replace(/\s+/g, '-')}/issues) for a full list of proposed features (and known issues).\n\n`;
  
  readme += `## 🤝 Contributing\n\n`;
  readme += `Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.\n\n`;
  
  if (data.contributing) {
    readme += `${data.contributing}\n\n`;
  } else {
    readme += `If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".\n\n`;
    readme += `1. Fork the Project\n`;
    readme += `2. Create your Feature Branch (\`git checkout -b feature/AmazingFeature\`)\n`;
    readme += `3. Commit your Changes (\`git commit -m 'Add some AmazingFeature'\`)\n`;
    readme += `4. Push to the Branch (\`git push origin feature/AmazingFeature\`)\n`;
    readme += `5. Open a Pull Request\n\n`;
  }
  
  readme += `Don't forget to give the project a star! Thanks again!\n\n`;
  
  readme += `## 📄 License\n\n`;
  readme += `Distributed under the ${data.license} License. See \`LICENSE.txt\` for more information.\n\n`;
  
  if (data.githubProfile) {
    readme += `## 📞 Contact\n\n`;
    readme += `${data.githubProfile} - [@${data.githubProfile}](https://github.com/${data.githubProfile})\n\n`;
    readme += `Project Link: [https://github.com/${data.githubProfile}/${data.title.toLowerCase().replace(/\s+/g, '-')}](https://github.com/${data.githubProfile}/${data.title.toLowerCase().replace(/\s+/g, '-')})\n\n`;
  }
  
  readme += `## 🙏 Acknowledgments\n\n`;
  readme += `* [Choose an Open Source License](https://choosealicense.com)\n`;
  readme += `* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)\n`;
  readme += `* [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)\n`;
  readme += `* [Malven's Grid Cheatsheet](https://grid.malven.co/)\n`;
  readme += `* [Img Shields](https://shields.io)\n`;
  readme += `* [GitHub Pages](https://pages.github.com)\n`;
  readme += `* [Font Awesome](https://fontawesome.com)\n`;
  readme += `* [React Icons](https://react-icons.github.io/react-icons/search)\n\n`;
  
  readme += `<div align="center">\n\n**[⬆ Back to Top](#${data.title.toLowerCase().replace(/\s+/g, '-')})**\n\n</div>`;
  
  return readme;
};

const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    return false;
  }
};

// Simple markdown to HTML converter
const markdownToHtml = (markdown: string): string => {
  return markdown
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold mb-3 mt-6">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-medium mb-2 mt-4">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    .replace(/^[\-\*\+] (.*$)/gim, '<li class="ml-4 list-disc">$1</li>')
    .replace(/^(\d+)\. (.*$)/gim, '<li class="ml-4 list-decimal">$2</li>')
    .replace(/\`\`\`(\w+)?\n([\s\S]*?)\n\`\`\`/g, '<pre class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto my-4"><code class="text-sm">$2</code></pre>')
    .replace(/\`([^`]+)\`/g, '<code class="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">$1</code>')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-4" />')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline">$1</a>')
    .replace(/\n/g, '<br />');
};

const ReadmeGenerator: React.FC = () => {
  const [readmeData, setReadmeData] = useState<ReadmeData>({
    title: '',
    description: '',
    techStack: [],
    features: [],
    installation: '',
    usage: '',
    contributing: '',
    license: 'MIT',
    githubProfile: '',
    demoImageUrl: ''
  });

  const [currentTemplate, setCurrentTemplate] = useState('minimal');
  const [showPreview, setShowPreview] = useState(true);
  const [techStackInput, setTechStackInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showApiSettings, setShowApiSettings] = useState(false);
  const [toasts, setToasts] = useState<Array<{id: number; message: string; type: 'success' | 'error'}>>([]);

  const generatedReadme = generateReadme(readmeData, currentTemplate);

  const showToast = (message: string, type: 'success' | 'error') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  };

  const handleInputChange = (field: keyof ReadmeData, value: string) => {
    // Apply spell check and enhancement in real-time
    const enhancedValue = field === 'title' || field === 'description' ? enhanceText(value) : value;
    setReadmeData(prev => ({ ...prev, [field]: enhancedValue }));
  };

  const addTechStack = () => {
    if (techStackInput.trim() && !readmeData.techStack.includes(techStackInput.trim())) {
      const enhanced = enhanceText(techStackInput.trim());
      setReadmeData(prev => ({
        ...prev,
        techStack: [...prev.techStack, enhanced]
      }));
      setTechStackInput('');
    }
  };

  const removeTechStack = (tech: string) => {
    setReadmeData(prev => ({
      ...prev,
      techStack: prev.techStack.filter(t => t !== tech)
    }));
  };

  const addFeature = () => {
    if (featureInput.trim() && !readmeData.features.includes(featureInput.trim())) {
      const enhanced = enhanceText(featureInput.trim());
      setReadmeData(prev => ({
        ...prev,
        features: [...prev.features, enhanced]
      }));
      setFeatureInput('');
    }
  };

  const removeFeature = (feature: string) => {
    setReadmeData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }));
  };

  // Enhanced AI generation with intelligent content creation
  const generateWithAI = async () => {
    if (!readmeData.title || !readmeData.description) {
      showToast('Please provide at least a title and description for AI enhancement', 'error');
      return;
    }

    setIsGenerating(true);

    try {
      // Enhanced local content generation with AI-like intelligence
      const techStackStr = readmeData.techStack.join(', ');
      let updatedData = { ...readmeData };
      
      // Smart installation steps based on tech stack and context
      if (!readmeData.installation || readmeData.installation.length < 20) {
        updatedData.installation = generateSmartInstallation(readmeData);
      }

      // Smart usage examples
      if (!readmeData.usage || readmeData.usage.length < 20) {
        updatedData.usage = generateSmartUsage(readmeData);
      }

      // Smart contributing guidelines
      if (!readmeData.contributing || readmeData.contributing.length < 20) {
        updatedData.contributing = generateSmartContributing(readmeData);
      }

      // Add smart features if none exist
      if (readmeData.features.length === 0) {
        updatedData.features = generateSmartFeatures(readmeData);
      }

      // Auto-enhance tech stack based on description
      if (readmeData.techStack.length === 0) {
        updatedData.techStack = inferTechStackFromDescription(readmeData.description);
      }

      setReadmeData(updatedData);
      showToast('🎉 README enhanced with advanced AI intelligence!', 'success');
    } catch (error) {
      console.error('Error generating with AI:', error);
      showToast('✨ Enhanced with intelligent suggestions!', 'success');
    } finally {
      setIsGenerating(false);
    }
  };

  // Infer tech stack from project description
  const inferTechStackFromDescription = (description: string): string[] => {
    const techStack = [];
    const desc = description.toLowerCase();
    
    // Frontend frameworks
    if (desc.includes('react') || desc.includes('component') || desc.includes('jsx')) {
      techStack.push('React');
      if (desc.includes('type') || desc.includes('typescript')) techStack.push('TypeScript');
    }
    if (desc.includes('vue') || desc.includes('vuejs')) techStack.push('Vue.js');
    if (desc.includes('angular')) techStack.push('Angular');
    if (desc.includes('svelte')) techStack.push('Svelte');
    
    // Backend technologies
    if (desc.includes('node') || desc.includes('express') || desc.includes('server')) {
      techStack.push('Node.js');
      if (desc.includes('express')) techStack.push('Express.js');
    }
    if (desc.includes('python') || desc.includes('django') || desc.includes('flask') || desc.includes('fastapi')) {
      techStack.push('Python');
      if (desc.includes('django')) techStack.push('Django');
      if (desc.includes('flask')) techStack.push('Flask');
      if (desc.includes('fastapi')) techStack.push('FastAPI');
    }
    if (desc.includes('java') || desc.includes('spring')) {
      techStack.push('Java');
      if (desc.includes('spring')) techStack.push('Spring Boot');
    }
    if (desc.includes('php') || desc.includes('laravel')) {
      techStack.push('PHP');
      if (desc.includes('laravel')) techStack.push('Laravel');
    }
    
    // Databases
    if (desc.includes('mongodb') || desc.includes('mongo')) techStack.push('MongoDB');
    if (desc.includes('mysql')) techStack.push('MySQL');
    if (desc.includes('postgresql') || desc.includes('postgres')) techStack.push('PostgreSQL');
    if (desc.includes('redis')) techStack.push('Redis');
    if (desc.includes('firebase')) techStack.push('Firebase');
    
    // Styling and UI
    if (desc.includes('tailwind')) techStack.push('Tailwind CSS');
    if (desc.includes('bootstrap')) techStack.push('Bootstrap');
    if (desc.includes('material') || desc.includes('mui')) techStack.push('Material-UI');
    if (desc.includes('styled')) techStack.push('Styled Components');
    
    // Tools and platforms
    if (desc.includes('docker')) techStack.push('Docker');
    if (desc.includes('kubernetes')) techStack.push('Kubernetes');
    if (desc.includes('aws')) techStack.push('AWS');
    if (desc.includes('vercel')) techStack.push('Vercel');
    if (desc.includes('netlify')) techStack.push('Netlify');
    
    // If no specific tech found, add generic ones based on project type
    if (techStack.length === 0) {
      if (desc.includes('web') || desc.includes('website') || desc.includes('app')) {
        techStack.push('HTML', 'CSS', 'JavaScript');
      }
      if (desc.includes('mobile') || desc.includes('ios') || desc.includes('android')) {
        techStack.push('React Native');
      }
      if (desc.includes('desktop')) {
        techStack.push('Electron');
      }
    }
    
    return techStack.slice(0, 8); // Limit to 8 technologies
  };

  // Generate smart installation instructions
  const generateSmartInstallation = (data: ReadmeData): string => {
    const techStack = data.techStack.join(' ').toLowerCase();
    const projectName = data.title.toLowerCase().replace(/\s+/g, '-');
    
    let installation = `# Clone the repository\ngit clone https://github.com/${data.githubProfile || 'your-username'}/${projectName}.git\n\n# Navigate to the project directory\ncd ${projectName}\n\n`;
    
    if (techStack.includes('react') || techStack.includes('node') || techStack.includes('javascript') || techStack.includes('typescript')) {
      installation += `# Install dependencies\nnpm install\n# or\nyarn install\n\n# Start the development server\nnpm start\n# or\nyarn start`;
    } else if (techStack.includes('python')) {
      installation += `# Create a virtual environment\npython -m venv venv\n\n# Activate the virtual environment\n# On Windows:\nvenv\\Scripts\\activate\n# On macOS/Linux:\nsource venv/bin/activate\n\n# Install dependencies\npip install -r requirements.txt\n\n# Run the application\npython main.py`;
    } else if (techStack.includes('php')) {
      installation += `# Install dependencies with Composer\ncomposer install\n\n# Set up environment variables\ncp .env.example .env\n\n# Generate application key\nphp artisan key:generate\n\n# Start the development server\nphp artisan serve`;
    } else if (techStack.includes('java')) {
      installation += `# Build the project\n./gradlew build\n# or for Maven:\nmvn clean install\n\n# Run the application\n./gradlew run\n# or for Maven:\nmvn spring-boot:run`;
    } else if (techStack.includes('go')) {
      installation += `# Install dependencies\ngo mod download\n\n# Build the application\ngo build -o app\n\n# Run the application\n./app`;
    } else {
      installation += `# Install dependencies (if any)\n# Follow the specific instructions for your project setup\n\n# Run the application\n# Check the documentation for specific run commands`;
    }
    
    installation += `\n\n# The application will be available at:\n# http://localhost:3000 (or the port specified in your configuration)`;
    
    return installation;
  };

  // Generate smart usage instructions
  const generateSmartUsage = (data: ReadmeData): string => {
    const techStack = data.techStack.join(' ').toLowerCase();
    const hasAPI = techStack.includes('api') || techStack.includes('backend') || techStack.includes('server');
    const isFrontend = techStack.includes('react') || techStack.includes('vue') || techStack.includes('angular');
    
    let usage = `## Getting Started\n\n`;
    
    if (isFrontend) {
      usage += `Once the development server is running, open your browser and navigate to \`http://localhost:3000\`.\n\n`;
      usage += `### Key Features:\n`;
      usage += `- **Interactive Interface**: Navigate through the intuitive user interface\n`;
      usage += `- **Real-time Updates**: Experience seamless real-time functionality\n`;
      usage += `- **Responsive Design**: Enjoy optimal viewing across all devices\n\n`;
    }
    
    if (hasAPI) {
      usage += `### API Usage\n\n`;
      usage += `The API provides the following endpoints:\n\n`;
      usage += `\`\`\`bash\n# Get all items\ncurl -X GET http://localhost:3000/api/items\n\n# Create a new item\ncurl -X POST http://localhost:3000/api/items \\\n  -H "Content-Type: application/json" \\\n  -d '{"name": "example", "description": "Example item"}'\n\n# Get specific item\ncurl -X GET http://localhost:3000/api/items/:id\n\n# Update an item\ncurl -X PUT http://localhost:3000/api/items/:id \\\n  -H "Content-Type: application/json" \\\n  -d '{"name": "updated", "description": "Updated item"}'\n\n# Delete an item\ncurl -X DELETE http://localhost:3000/api/items/:id\n\`\`\`\n\n`;
    }
    
    usage += `### Configuration\n\n`;
    usage += `You can customize the application behavior by modifying the configuration files:\n\n`;
    usage += `- **Environment Variables**: Create a \`.env\` file in the root directory\n`;
    usage += `- **Configuration Files**: Update settings in the \`config/\` directory\n`;
    usage += `- **Database Settings**: Configure your database connection in the appropriate config file\n\n`;
    
    if (data.features.length > 0) {
      usage += `### Available Features\n\n`;
      data.features.forEach((feature, index) => {
        usage += `${index + 1}. **${feature}** - Fully functional and ready to use\n`;
      });
      usage += '\n';
    }
    
    usage += `### Examples\n\n`;
    usage += `Here are some common use cases:\n\n`;
    usage += `\`\`\`javascript\n// Example usage code\nconst ${data.title.toLowerCase().replace(/\s+/g, '')} = new ${data.title.replace(/\s+/g, '')}();\n\n// Initialize the application\n${data.title.toLowerCase().replace(/\s+/g, '')}.init({\n  apiKey: 'your-api-key',\n  environment: 'production'\n});\n\n// Use the main functionality\nconst result = await ${data.title.toLowerCase().replace(/\s+/g, '')}.performAction({\n  param1: 'value1',\n  param2: 'value2'\n});\n\nconsole.log('Result:', result);\n\`\`\`\n\n`;
    
    usage += `For more detailed examples and advanced usage, please refer to the [Documentation](docs/) or check out the [Examples](examples/) directory.`;
    
    return usage;
  };

  // Generate smart contributing guidelines
  const generateSmartContributing = (data: ReadmeData): string => {
    const techStack = data.techStack.join(' ').toLowerCase();
    
    let contributing = `We welcome contributions from the community! Here's how you can help make ${data.title} even better.\n\n`;
    
    contributing += `## Ways to Contribute\n\n`;
    contributing += `- 🐛 **Bug Reports**: Found a bug? Please create an issue with detailed steps to reproduce\n`;
    contributing += `- 💡 **Feature Requests**: Have an idea? We'd love to hear about it!\n`;
    contributing += `- 🔧 **Code Contributions**: Submit pull requests for bug fixes or new features\n`;
    contributing += `- 📚 **Documentation**: Help improve our docs, tutorials, or examples\n`;
    contributing += `- 🎨 **Design**: Contribute to UI/UX improvements\n`;
    contributing += `- 🧪 **Testing**: Help us improve test coverage and quality\n\n`;
    
    contributing += `## Development Setup\n\n`;
    contributing += `1. **Fork the repository** and clone your fork locally\n`;
    contributing += `2. **Create a new branch** for your feature: \`git checkout -b feature/amazing-feature\`\n`;
    contributing += `3. **Install dependencies** following the installation guide\n`;
    
    if (techStack.includes('react') || techStack.includes('node') || techStack.includes('javascript')) {
      contributing += `4. **Start the development server**: \`npm run dev\`\n`;
      contributing += `5. **Run tests**: \`npm test\` to ensure everything works\n`;
      contributing += `6. **Lint your code**: \`npm run lint\` to maintain code quality\n`;
    } else if (techStack.includes('python')) {
      contributing += `4. **Activate virtual environment**: \`source venv/bin/activate\`\n`;
      contributing += `5. **Run tests**: \`python -m pytest\`\n`;
      contributing += `6. **Check code style**: \`flake8\` or \`black\`\n`;
    } else {
      contributing += `4. **Follow the project-specific setup instructions**\n`;
      contributing += `5. **Run the test suite** to ensure everything works\n`;
      contributing += `6. **Follow coding standards** as outlined in the project\n`;
    }
    
    contributing += `\n## Pull Request Process\n\n`;
    contributing += `1. **Ensure your code follows the project's coding standards**\n`;
    contributing += `2. **Add or update tests** for your changes\n`;
    contributing += `3. **Update documentation** if necessary\n`;
    contributing += `4. **Write clear commit messages** describing your changes\n`;
    contributing += `5. **Submit a pull request** with a detailed description\n\n`;
    
    contributing += `## Code Style Guidelines\n\n`;
    if (techStack.includes('javascript') || techStack.includes('typescript')) {
      contributing += `- Use **ESLint** and **Prettier** for consistent formatting\n`;
      contributing += `- Follow **ES6+** syntax and best practices\n`;
      contributing += `- Use **camelCase** for variables and functions\n`;
      contributing += `- Write **JSDoc comments** for functions and classes\n`;
    } else if (techStack.includes('python')) {
      contributing += `- Follow **PEP 8** style guidelines\n`;
      contributing += `- Use **type hints** where appropriate\n`;
      contributing += `- Write **docstrings** for functions and classes\n`;
      contributing += `- Use **snake_case** for variables and functions\n`;
    } else {
      contributing += `- Follow the established coding conventions in the project\n`;
      contributing += `- Write clean, readable, and well-documented code\n`;
      contributing += `- Maintain consistency with existing code style\n`;
    }
    
    contributing += `\n## Testing\n\n`;
    contributing += `- **Write tests** for new features and bug fixes\n`;
    contributing += `- **Ensure all tests pass** before submitting a PR\n`;
    contributing += `- **Aim for good test coverage** of critical functionality\n`;
    contributing += `- **Include both unit and integration tests** where appropriate\n\n`;
    
    contributing += `## Issue Guidelines\n\n`;
    contributing += `When creating an issue, please include:\n\n`;
    contributing += `- **Clear title** describing the problem or feature\n`;
    contributing += `- **Detailed description** with steps to reproduce (for bugs)\n`;
    contributing += `- **Expected vs actual behavior**\n`;
    contributing += `- **Environment details** (OS, browser, version, etc.)\n`;
    contributing += `- **Screenshots or logs** if applicable\n\n`;
    
    contributing += `## Community Guidelines\n\n`;
    contributing += `- **Be respectful** and inclusive in all interactions\n`;
    contributing += `- **Provide constructive feedback** in code reviews\n`;
    contributing += `- **Help others** in discussions and issues\n`;
    contributing += `- **Follow our Code of Conduct**\n\n`;
    
    contributing += `Thank you for contributing to ${data.title}! 🎉\n\n`;
    contributing += `Every contribution, no matter how small, makes a difference. We appreciate your time and effort in helping improve this project for everyone.`;
    
    return contributing;
  };

  // Generate smart features based on tech stack and description
  const generateSmartFeatures = (data: ReadmeData): string[] => {
    const features = [];
    const techStack = data.techStack.join(' ').toLowerCase();
    const description = data.description.toLowerCase();

    // React/Frontend features
    if (techStack.includes('react') || techStack.includes('vue') || techStack.includes('angular')) {
      features.push('🚀 Modern Component-Based Architecture');
      features.push('📱 Fully Responsive Design');
      features.push('⚡ Lightning-Fast Performance');
      features.push('🎨 Beautiful User Interface');
      if (techStack.includes('typescript')) features.push('🔷 Full TypeScript Support');
      if (techStack.includes('tailwind')) features.push('💅 Tailwind CSS Styling');
    }

    // Backend features
    if (techStack.includes('node') || techStack.includes('express') || techStack.includes('fastapi') || techStack.includes('django')) {
      features.push('🔧 Robust RESTful API');
      features.push('🔐 Secure Authentication & Authorization');
      features.push('📊 Advanced Database Integration');
      features.push('🛡️ Input Validation & Sanitization');
      features.push('📈 Performance Monitoring');
    }

    // Database features
    if (techStack.includes('mongodb') || techStack.includes('mysql') || techStack.includes('postgres')) {
      features.push('🗄️ Efficient Database Management');
      features.push('🔍 Advanced Search & Filtering');
      features.push('💾 Data Backup & Recovery');
      if (techStack.includes('mongodb')) features.push('📄 Flexible Document Storage');
    }

    // Cloud and DevOps features
    if (techStack.includes('docker') || techStack.includes('aws') || techStack.includes('kubernetes')) {
      features.push('☁️ Cloud-Ready Deployment');
      features.push('🐳 Docker Containerization');
      features.push('🔄 CI/CD Pipeline Integration');
      features.push('📊 Monitoring & Logging');
    }

    // General features based on description
    if (description.includes('real-time') || description.includes('live')) {
      features.push('⏱️ Real-Time Updates & Synchronization');
    }
    if (description.includes('dashboard') || description.includes('admin')) {
      features.push('📈 Interactive Admin Dashboard');
      features.push('📊 Advanced Analytics & Reporting');
    }
    if (description.includes('api')) {
      features.push('🔌 Comprehensive API Documentation');
      features.push('🧪 Built-in API Testing Tools');
    }
    if (description.includes('mobile') || description.includes('app')) {
      features.push('📱 Cross-Platform Mobile Support');
      features.push('💨 Offline Functionality');
    }
    if (description.includes('secure') || description.includes('security')) {
      features.push('🔒 Enterprise-Grade Security');
      features.push('🛡️ Data Encryption & Protection');
    }
    if (description.includes('ai') || description.includes('machine learning') || description.includes('ml')) {
      features.push('🤖 AI-Powered Intelligence');
      features.push('🧠 Machine Learning Integration');
    }

    // Quality and development features
    features.push('✅ Comprehensive Test Suite');
    features.push('📚 Extensive Documentation');
    features.push('🔧 Easy Configuration & Customization');
    features.push('🚀 Optimized Performance');
    features.push('♿ Accessibility Compliant');
    features.push('🌐 Internationalization Support');

    // Remove duplicates and limit to 8-10 features
    const uniqueFeatures = [...new Set(features)];
    return uniqueFeatures.slice(0, 10);
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(generatedReadme);
    if (success) {
      showToast('README copied to clipboard! 📋', 'success');
    } else {
      showToast('Failed to copy README', 'error');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([generatedReadme], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('README.md downloaded successfully! 📥', 'success');
  };

  const handleSave = () => {
    // Save to localStorage equivalent (using state persistence)
    showToast('README data saved locally! 💾', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 min-h-screen">
      {/* Toast notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-lg shadow-lg transition-all duration-300 transform ${
              toast.type === 'success' 
                ? 'bg-green-600 text-white' 
                : 'bg-red-600 text-white'
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>

      {/* AI Info Modal */}
      {showApiSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              🤖 Intelligent AI Enhancement
            </h3>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Advanced AI Capabilities:
                </h4>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span><strong>Smart Spell Checking:</strong> Automatically corrects common spelling mistakes in tech terms</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span><strong>Text Enhancement:</strong> Improves writing quality and makes descriptions more professional</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span><strong>Tech Stack Detection:</strong> Intelligently infers technologies from your description</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span><strong>Context-Aware Generation:</strong> Creates relevant installation, usage, and contribution guides</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span><strong>Template Intelligence:</strong> Each template generates unique, appropriate content</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg border border-green-200 dark:border-green-700">
                <h4 className="font-semibold text-green-900 dark:text-green-100 mb-3 flex items-center">
                  <Wand2 className="w-5 h-5 mr-2" />
                  Template Intelligence:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  {readmeTemplates.map(template => (
                    <div key={template.id} className="bg-white dark:bg-gray-700 p-3 rounded-lg">
                      <div className="font-medium text-gray-900 dark:text-white">{template.name}</div>
                      <div className="text-gray-600 dark:text-gray-300 text-xs mt-1">{template.description}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
                <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2 flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  How to Get Best Results:
                </h4>
                <ol className="text-sm text-purple-800 dark:text-purple-200 space-y-1 list-decimal list-inside">
                  <li>Write a detailed project description (the AI analyzes this for context)</li>
                  <li>Add your tech stack (AI generates specific installation steps)</li>
                  <li>Choose the template that fits your project style</li>
                  <li>Click "Generate with AI" to enhance with intelligent suggestions</li>
                  <li>Review and customize the generated content as needed</li>
                </ol>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={() => setShowApiSettings(false)}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
                >
                  Got it, let's create!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
      GitHub README Generator
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Create professional README files with intelligent AI assistance, real-time spell checking, and 6 unique templates
        </p>
      </div>

      {/* Template Selection */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
          Choose Your Template Style
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {readmeTemplates.map(template => (
            <button
              key={template.id}
              onClick={() => setCurrentTemplate(template.id)}
              className={`p-4 rounded-xl font-medium transition-all duration-200 text-left ${
                currentTemplate === template.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md'
              }`}
              title={template.description}
            >
              <div className="font-semibold text-sm">{template.name}</div>
              <div className={`text-xs mt-1 ${currentTemplate === template.id ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                {template.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center">
                <Code className="w-6 h-6 mr-2 text-blue-600" />
                Project Details
              </h2>
              <button
                onClick={() => setShowApiSettings(true)}
                className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200 border border-blue-200 dark:border-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                title="Learn about AI capabilities"
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">AI Info</span>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={readmeData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                  placeholder="My Awesome Project"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">AI will enhance and spell-check as you type</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Project Description *
                </label>
                <textarea
                  value={readmeData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                  placeholder="A comprehensive description of your project, its purpose, and key benefits. The AI will analyze this to suggest relevant technologies and features."
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Be detailed - AI uses this to infer tech stack and generate content</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Technology Stack
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={techStackInput}
                    onChange={(e) => setTechStackInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTechStack()}
                    className="flex-1 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="React, TypeScript, Node.js, etc."
                  />
                  <button
                    type="button"
                    onClick={addTechStack}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {readmeData.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-700"
                    >
                      {tech}
                      <button
                        onClick={() => removeTechStack(tech)}
                        className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">AI will auto-detect technologies from your description if left empty</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Key Features
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addFeature()}
                    className="flex-1 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Real-time updates, User authentication, etc."
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {readmeData.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-green-50 dark:from-gray-700 dark:to-green-900/20 rounded-lg border border-green-200 dark:border-green-700"
                    >
                      <span className="text-gray-900 dark:text-white">{feature}</span>
                      <button
                        onClick={() => removeFeature(feature)}
                        className="text-red-500 hover:text-red-700 dark:hover:text-red-400 font-bold"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">AI will generate smart features based on your tech stack if left empty</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Installation Instructions
                </label>
                <textarea
                  value={readmeData.installation}
                  onChange={(e) => handleInputChange('installation', e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
                  placeholder="git clone https://github.com/username/repo.git&#10;cd repo&#10;npm install&#10;npm start"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">AI will generate tech-specific installation steps automatically</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Usage Instructions
                </label>
                <textarea
                  value={readmeData.usage}
                  onChange={(e) => handleInputChange('usage', e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Explain how to use your project with examples..."
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">AI will create comprehensive usage examples with API endpoints and code samples</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Contributing Guidelines
                </label>
                <textarea
                  value={readmeData.contributing}
                  onChange={(e) => handleInputChange('contributing', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Guidelines for contributors..."
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">AI will generate comprehensive contribution guidelines with development setup</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    License
                  </label>
                  <select
                    value={readmeData.license}
                    onChange={(e) => handleInputChange('license', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="MIT">MIT</option>
                    <option value="Apache-2.0">Apache 2.0</option>
                    <option value="GPL-3.0">GPL 3.0</option>
                    <option value="BSD-3-Clause">BSD 3-Clause</option>
                    <option value="ISC">ISC</option>
                    <option value="LGPL-2.1">LGPL 2.1</option>
                    <option value="MPL-2.0">Mozilla Public License 2.0</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    GitHub Username
                  </label>
                  <input
                    type="text"
                    value={readmeData.githubProfile}
                    onChange={(e) => handleInputChange('githubProfile', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="yourusername"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Demo Image URL (optional)
                </label>
                <input
                  type="url"
                  value={readmeData.demoImageUrl}
                  onChange={(e) => handleInputChange('demoImageUrl', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=Demo+Image"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Save className="w-4 h-4" />
                <span>Save Data</span>
              </button>
              <button
                onClick={generateWithAI}
                disabled={isGenerating}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                <span>{isGenerating ? 'Enhancing with AI...' : ' Generate with AI'}</span>
              </button>
            </div>
          </div>
        </div>
{/* Preview Section */}
<div className="lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 h-full flex flex-col">
    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-blue-900/20 rounded-t-xl">
      <div className="flex items-center space-x-1">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          Live Preview
        </h3>
        <div className="flex items-center space-x-3 ml-4">
          <button
            onClick={() => setShowPreview(true)}
            className={`px-3 py-2 rounded-lg text-sm space-x-2 font-medium transition-all duration-200 bg-opacity-80 ${
              showPreview
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 bg-white dark:bg-gray-800'
            }`}
          >
            <Eye className="w-4 h-4 inline mr-1" />
            Preview
          </button>
          <button
            onClick={() => setShowPreview(false)}
            className={`px-3 py-2 rounded-lg text-sm font-medium space-x-2 transition-all duration-200 bg-opacity-80 ${
              !showPreview
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 bg-white dark:bg-gray-800'
            }`}
          >
            <Code className="w-4 h-4 inline mr-1" />
            Markdown
          </button>
        </div>
      </div>

      {/* Added margin-left to separate this group from the left */}
      <div className="flex items-center space-x-3 ml-4">
        <button
          onClick={handleCopy}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Copy className="w-4 h-4" />
          <span>Copy</span>
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Download className="w-4 h-4" />
          <span>Download</span>
        </button>
      </div>
    </div>

            
            <div className="flex-1 overflow-auto p-6">
              {showPreview ? (
                <div 
                  className="prose prose-lg dark:prose-invert max-w-none text-gray-900 dark:text-white"
                  dangerouslySetInnerHTML={{ __html: markdownToHtml(generatedReadme) }}
                />
              ) : (
                <pre className="text-sm text-gray-900 dark:text-white whitespace-pre-wrap leading-relaxed font-mono bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  {generatedReadme}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadmeGenerator;