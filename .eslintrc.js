module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  rules: {
    'new-cap': 0,
    'no-param-reassign': 0,
    semi: [2, 'never'],
    'react/prop-types': 0,
  },
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'webpack.local.config.js',
      },
    },
  },
}
