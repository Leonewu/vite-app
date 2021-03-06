module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard',
    'plugin:react/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  rules: {
    'space-before-function-paren': ['off'],
    'comma-dangle': ['off'],
    'no-use-before-define': ['off'],
    'no-unused-vars': ['off'],
    'camelcase': ['off'],
    "react/display-name": ['off'],
    "react/prop-types": ['off'],
    "indent": ["off"],
    "no-extra-parens": ["off"],
    "no-tabs": ["off"],
    "eol-last": ["off"],
    "no-undef": ["off"]
  }
}
