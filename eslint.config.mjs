import { FlatCompat } from '@eslint/eslintrc';
import * as reactHooks from 'eslint-plugin-react-hooks';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  reactHooks.configs.recommended,
  ...compat.config({
    extends: [
      'plugin:@next/next/recommended',
      'plugin:@typescript-eslint/recommended',
      '@feature-sliced/eslint-config/rules/import-order',
      '@feature-sliced/eslint-config/rules/public-api',
      '@feature-sliced/eslint-config/rules/layers-slices',
      'prettier',
    ],
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'import/order': 'off',
      'boundaries/element-types': 'off',
      'react-hooks/react-compiler': 'error',
    },
  }),
];

export default eslintConfig;
