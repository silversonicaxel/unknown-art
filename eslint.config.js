import js from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'


export default tseslint.config(
  {
    ignores: ['**/node_modules', 'dist/', '.next/']
  },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      importPlugin.flatConfigs.recommended,
    ],
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser
      },
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      sourceType: 'module',
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          'args': 'all',
          'argsIgnorePattern': '^_',
          'caughtErrors': 'all',
          'caughtErrorsIgnorePattern': '^_',
          'destructuredArrayIgnorePattern': '^_',
          'varsIgnorePattern': '^_',
          'ignoreRestSiblings': true
        }
      ],
      '@typescript-eslint/unbound-method': 'off',
      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      'import/newline-after-import': ['error', { 'count': 2 }],
      'import/no-unresolved': 'off',
      'import/order': [
        'error',
        {
          'alphabetize': {
            'caseInsensitive': true,
            'order': 'asc'
          },
          'newlines-between': 'never'
        }
      ],
      'indent': ['error', 2],
      'jsx-quotes': ['error', 'prefer-double'],
      'max-len': [
        'error',
        {
          'code': 100,
          'ignoreUrls': true
        }
      ],
      'no-trailing-spaces': 'error',
      'no-unused-vars': 'off',
      'quotes': ['error', 'single'],
      'react/prop-types': 'off',
      'react-refresh/only-export-components': 'off',
      'semi': ['error', 'never'],
    },
    settings: { react: { version: '18.3' } },
  },
)
