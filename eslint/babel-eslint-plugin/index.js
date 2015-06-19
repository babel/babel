'use strict';

module.exports = {
  rules: {
    'object-shorthand': require('./rules/object-shorthand'),
    'generator-star-spacing': require('./rules/generator-star-spacing'),
    'generator-star': require('./rules/generator-star')
  },
  rulesConfig: {
    'generator-star-spacing': 0,
    'generator-star': 0,
    'object-shorthand': 0
  }
};
