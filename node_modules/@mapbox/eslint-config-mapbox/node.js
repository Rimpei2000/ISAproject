'use strict';

module.exports = {
  extends: require.resolve('./base'),
  env: {
    node: true
  },
  plugins: ['node'],
  rules: {
    'node/no-unsupported-features/es-builtins': ['error'],
    'node/no-unsupported-features/es-syntax': ['error'],
    'node/no-unsupported-features/node-builtins': ['error'],
    'node/no-missing-require': 'error'
  }
};
