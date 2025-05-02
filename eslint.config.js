import globals from 'globals';
import js from '@eslint/js';
import react from 'eslint-plugin-react';
import stylisticJs from '@stylistic/eslint-plugin-js';
import tseslint from 'typescript-eslint';

export default [
  {
    files: ['src/**/*.{ts,tsx}'],
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      '@stylistic/js': stylisticJs,
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
      ...react.configs.flat.recommended.rules,
      '@stylistic/js/no-extra-semi': 'error',
      '@stylistic/js/no-multi-spaces': ['error', { ignoreEOLComments: true }],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-curly-newline': 'error',
      'sort-imports': ['error', { ignoreDeclarationSort: true }],
    },
  },
  ...tseslint.configs.recommended,
];
