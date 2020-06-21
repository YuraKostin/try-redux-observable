module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    'no-unused-vars': ['error', { argsIgnorePattern: '^_$' }],
    'arrow-parens': ['error', 'as-needed'],
    'import/extensions': [0],
    'import/prefer-default-export': [0],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'memo', // For reduce accumulators
          'config', // For hook useAuthValidation
        ],
      },
    ],
    'object-curly-newline': [0],
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
    'jsx-a11y/anchor-has-content': [0],
    'jsx-a11y/click-events-have-key-events': [0],
    'jsx-a11y/no-noninteractive-element-interactions': [0],
    'jsx-a11y/no-autofocus': [0],
    'react/jsx-curly-spacing': [2, { when: 'never' }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  },
};
