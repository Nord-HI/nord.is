module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  rules: {
    'new-cap': 0,
    'no-param-reassign': 0,
    // underscore is used to represent an unused function parameter
    'no-unused-vars': [2, { 'args': 'after-used', 'argsIgnorePattern': '^_' }],
    semi: [2, 'never'],
    'react/prop-types': 0,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.local.config.js',
      },
    },
  },
  globals: {
    c: true, // console is aliased to c in server/index.js
  },
}
