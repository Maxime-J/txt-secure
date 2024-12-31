import globals from 'globals';
import js from '@eslint/js';
import react from 'eslint-plugin-react';

export default [
  {
    files: ['src/**/*.{js,jsx}'],
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      react,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/prop-types': 'off',
    },
  },
];
