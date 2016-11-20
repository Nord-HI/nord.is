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
    'import/no-unresolved': 0,
  },
  settings: {},
  globals: {
    c: true, // console is aliased to c in server/index.js
    __DEV__: true, // boolean, true if NODE_ENV=development
    __PROD__: true, // boolean, true if NODE_ENV=production
    __NORD_DATA__: true, // global var injected into index.html. Available anywhere on client.
    test: true, // global provided by jest
    expect: true, // global provided by jest
    afterEach: true,
    beforeEach: true,
    it: true,
    describe: true,
  },
}
