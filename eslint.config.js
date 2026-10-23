import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'src/generated', 'playwright-report', 'test-results', 'ba'] },
  {
    files: ['**/*.{ts,tsx,js}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2023,
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: { 'react-hooks': reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },
  {
    // The rules module stays pure: no React, no storage, no DOM (Tech Approach, "The four layers").
    files: ['src/rules/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            { group: ['react', 'react-dom', 'react/*', 'react-dom/*'], message: 'The rules module must not use React.' },
            { group: ['**/storage/**', '**/ui/**'], message: 'The rules module must not depend on storage or UI code.' },
          ],
        },
      ],
      'no-restricted-globals': ['error', 'window', 'document', 'localStorage', 'sessionStorage'],
    },
  },
);
