module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: ['plugin:react/recommended', 'airbnb', 'plugin:i18next/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'i18next', 'react-hooks', 'prod-path-plugin', 'unused-imports'],
  rules: {
    'unused-imports/no-unused-imports': 'error',
    semi: [2, 'never'],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', 'tsx']
      }
    ],
    'react/react-in-jsx-scope': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'warn',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'warn',
    'react/function-component-definition': 'off',
    'no-shadow': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'warn',
    'no-underscore-dangle': 'off',
    'comma-dangle': ['error', 'never'],
    'i18next/no-literal-string': [
      'error',
      {
        markupOnly: true,
        ignoreAttribute: [
          'data-testid',
          'to',
          'target',
          'feature',
          'justify',
          'align',
          'direction',
          'gap',
          'border',
          'role',
          'as',
          'color',
          'variant',
          'size',
          'wrap'
        ]
      }
    ],
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'no-param-reassign': 'off',
    'react/prop-types': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'no-undef': 'off',
    'react/no-array-index-key': 'off',
    'prod-path-plugin/path-checker': ['error', { alias: '@' }],
    'prod-path-plugin/public-api-imports': [
      'error',
      {
        alias: '@',
        testFilesPatterns: ['**/*.test.*', '**/*.stories.*', '**/StoreDecorator.tsx']
      }
    ],
    'prod-path-plugin/layer-imports': [
      'error',
      {
        alias: '@',
        ignoreImportPatterns: ['**/StoreProvider', '**/testing']
      }
    ],
    'react/jsx-max-props-per-line': ['warn', { maximum: 3 }],
    'react/no-unstable-nested-components': 'warn'
  },
  globals: {
    __IS_DEV__: true,
    __API__: true,
    __PROJECT: true
  },
  overrides: [
    {
      files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
      rules: {
        'i18next/no-literal-string': 'off',
        'max-len': 'off'
      }
    }
  ]
}
