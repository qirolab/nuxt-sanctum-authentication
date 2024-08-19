// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

// Run `npx @eslint/config-inspector` to inspect the resolved config interactively
export default createConfigForNuxt({
  features: {
    // Rules for module authors
    tooling: true,
    // Rules for formatting
    stylistic: true,
  },
  dirs: {
    src: ['./playground'],
  },
}).append({
  plugins: {
    prettier: prettierPlugin,
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@stylistic/semi': ['error', 'always'],
    '@stylistic/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
        multilineDetection: 'brackets',
      },
    ],
    'prettier/prettier': 'error',
  },
  settings: {
    ...prettierConfig.rules, // Ensure Prettier rules are applied correctly
  },
});
