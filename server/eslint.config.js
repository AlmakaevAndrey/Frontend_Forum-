import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: { globals: globals.browser },
    plugins: { js, prettier },
    extends: [
      ...tseslint.configs.recommended,
      pluginReact.configs.flat.recommended,
      'plugin:prettier/recommended',
    ],
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      semi: ['error', 'always'],
      'prettier/prettier': ['error'],
    },
  },
]);
