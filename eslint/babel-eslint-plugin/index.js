'use strict';

module.exports = {
  rules: {
    'block-scoped-var': require('./rules/block-scoped-var'),
    'object-shorthand': require('./rules/object-shorthand'),
    'generator-star-spacing': require('./rules/generator-star-spacing'),
    'generator-star': require('./rules/generator-star'),
    'new-cap': require('./rules/new-cap')
  },
  rulesConfig: {
    'block-scoped-var': 0,
    'generator-star-spacing': 0,
    'generator-star': 0,
    'object-shorthand': 0,
    'new-cap': 0
  }
};
