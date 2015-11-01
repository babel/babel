'use strict';

module.exports = {
  rules: {
    'generator-star-spacing': require('./rules/generator-star-spacing'),
    'new-cap': require('./rules/new-cap'),
    'object-curly-spacing': require('./rules/object-curly-spacing'),
    'object-shorthand': require('./rules/object-shorthand'),
    'arrow-parens': require('./rules/arrow-parens'),
    'no-await-in-loop': require('./rules/no-await-in-loop'),
  },
  rulesConfig: {
    'generator-star-spacing': 0,
    'new-cap': 0,
    'object-curly-spacing': 0,
    'object-shorthand': 0,
    'arrow-parens': 0,
    'no-await-in-loop': 0,
  }
};
