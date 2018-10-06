module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
    parser: 'babel-eslint'
  },
  env: {
    browser: true
  },
  extends: ['plugin:prettier/recommended', 'plugin:vue/recommended'],
  plugins: ['vue', 'prettier'],
  rules: {
    'vue/require-default-prop': 0,
    'prettier/prettier': ['error', {
      singleQuote: true,
      trailingComma: 'es5'
    }],
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 3,
        multiline: {
          max: 1,
          allowFirstLine: false,
        },
      },
    ],
  }
};