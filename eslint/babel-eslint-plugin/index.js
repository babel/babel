'use strict';

module.exports = {
  rules: {
    'array-bracket-spacing': require('./rules/array-bracket-spacing'),
    'arrow-parens': require('./rules/arrow-parens'),
    'flow-object-type': require('./rules/flow-object-type'),
    'func-params-comma-dangle': require('./rules/func-params-comma-dangle'),
    'generator-star-spacing': require('./rules/generator-star-spacing'),
    'new-cap': require('./rules/new-cap'),
    'no-await-in-loop': require('./rules/no-await-in-loop'),
    'no-invalid-this': require('./rules/no-invalid-this'),
    'object-curly-spacing': require('./rules/object-curly-spacing'),
    'object-shorthand': require('./rules/object-shorthand'),
    'quotes': require('./rules/quotes'),
    'semi': require('./rules/semi'),
    'no-unused-expressions': require('./rules/no-unused-expressions'),
  },
  rulesConfig: {
    'generator-star-spacing': 0,
    'new-cap': 0,
    'object-curly-spacing': 0,
    'array-bracket-spacing': 0,
    'object-shorthand': 0,
    'arrow-parens': 0,
    'no-await-in-loop': 0,
    'flow-object-type': 0,
    'func-params-comma-dangle': 0,
    'no-invalid-this': 0,
    'quotes': 0,
    'semi': 0,
    'no-unused-expressions': 0,
  }
};
