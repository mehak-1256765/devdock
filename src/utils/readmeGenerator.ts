import { ReadmeData } from '../types';

export const generateReadme = (data: ReadmeData, templateId: string): string => {
  const {
    title,
    description,
    techStack,
    features,
    installation,
    usage,
    contributing,
    license,
    githubProfile,
    demoImageUrl
  } = data;

  switch (templateId) {
    case 'minimal':
      return `# ${title}

${description}

## Tech Stack

${techStack.map(tech => `- ${tech}`).join('\n')}

## Installation

\`\`\`bash
${installation}
\`\`\`

## Usage

${usage}

## License

This project is licensed under the ${license} License.

## Author

Created by [@${githubProfile}](https://github.com/${githubProfile})
`;

    case 'comprehensive':
      return `# ${title}

${description}

${demoImageUrl ? `![Demo](${demoImageUrl})` : ''}

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

## ✨ Features

${features.map(feature => `- ${feature}`).join('\n')}

## 🛠️ Tech Stack

${techStack.map(tech => `- **${tech}**`).join('\n')}

## 🚀 Installation

\`\`\`bash
${installation}
\`\`\`

## 💻 Usage

${usage}

## 🤝 Contributing

${contributing}

## 📄 License

This project is licensed under the ${license} License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**[@${githubProfile}](https://github.com/${githubProfile})**

---

⭐️ If you found this project helpful, please give it a star!
`;

    case 'modern':
      return `<div align="center">

# ${title}

${description}

${demoImageUrl ? `![Demo](${demoImageUrl})` : ''}

[![License](https://img.shields.io/badge/license-${license}-blue.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/${githubProfile}/${title.toLowerCase().replace(/\s+/g, '-')}.svg)](https://github.com/${githubProfile}/${title.toLowerCase().replace(/\s+/g, '-')}/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/${githubProfile}/${title.toLowerCase().replace(/\s+/g, '-')}.svg)](https://github.com/${githubProfile}/${title.toLowerCase().replace(/\s+/g, '-')}/network)

</div>

## 🚀 Features

${features.map(feature => `✅ ${feature}`).join('\n')}

## 🛠️ Built With

${techStack.map(tech => `![${tech}](https://img.shields.io/badge/-${tech}-05122A?style=flat&logo=${tech.toLowerCase()})`).join(' ')}

## 📦 Installation

\`\`\`bash
${installation}
\`\`\`

## 🎯 Usage

${usage}

## 🤝 Contributing

${contributing}

## 📝 License

This project is licensed under the ${license} License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

<div align="center">

**[${githubProfile}](https://github.com/${githubProfile})**

Made with ❤️ by [@${githubProfile}](https://github.com/${githubProfile})

</div>

---

<div align="center">

**[⬆ Back to Top](#${title.toLowerCase().replace(/\s+/g, '-')})**

</div>
`;

    default:
      return generateReadme(data, 'minimal');
  }
};