module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  env: {
    jest: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended', // Make this the last element so prettier config overrides other formatting rules
    'prettier'
  ],
  rules: {
    'react/react-in-jsx-scope': 'off'
  },
  plugins: ["react", "react-hooks",],
};
