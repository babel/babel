'use strict';

// Based on https://github.com/eslint/eslint/blob/v2.11.1/lib/rules/comma-dangle.js

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

function last(arr) {
  return arr.length !== 0 ? arr[arr.length - 1] : undefined;
}

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {
    var mode = context.options[0];
    var UNEXPECTED_MESSAGE = 'Unexpected trailing comma.';
    var MISSING_MESSAGE = 'Missing trailing comma.';

    function isMultiline(node) {
      var lastItem = last(node.params || node.arguments);

      if (!lastItem) {
        return false;
      }

      var sourceCode = context.getSourceCode();
      var penultimateToken = sourceCode.getLastToken(lastItem);
      var lastToken = sourceCode.getTokenAfter(penultimateToken);

      if (lastToken.value === ',') {
        penultimateToken = lastToken;
        lastToken = sourceCode.getTokenAfter(lastToken);
      }

      return lastToken.loc.end.line !== penultimateToken.loc.end.line;
    }

    function forbidTrailingComma(node) {
      var lastItem = last(node.params || node.arguments);

      if (!lastItem) {
        return;
      }

      var sourceCode = context.getSourceCode();
      var trailingToken = sourceCode.getTokenAfter(lastItem);

      if (trailingToken.value === ',') {
        context.report({
          node: lastItem,
          loc: trailingToken.loc.start,
          message: UNEXPECTED_MESSAGE,
          fix: function(fixer) {
            return fixer.remove(trailingToken);
          }
        });
      }
    }

    function forceTrailingComma(node) {
      var lastItem = last(node.params || node.arguments);

      if (!lastItem) {
        return;
      }

      // `f(...a,)` is ok, but `function f(...a,) {}` is invalid syntax.
      if (lastItem.type === 'RestElement') {
        return;
      }

      var sourceCode = context.getSourceCode();
      var penultimateToken = lastItem;
      var trailingToken = sourceCode.getTokenAfter(lastItem);

      // `f = a, => {}` is invalid syntax.
      if (node.type === 'ArrowFunctionExpression' &&
          node.params.length === 1 &&
          sourceCode.getTokenBefore(lastItem).value !== '(') {
        return;
      }

      if (trailingToken.value !== ',') {
        context.report({
          node: lastItem,
          loc: lastItem.loc.end,
          message: MISSING_MESSAGE,
          fix: function(fixer) {
            return fixer.insertTextAfter(penultimateToken, ',');
          }
        });
      }
    }

    function forceTrailingCommaIfMultiline(node) {
      if (isMultiline(node)) {
        forceTrailingComma(node);
      } else {
        forbidTrailingComma(node);
      }
    }

    function allowTrailingCommaIfMultiline(node) {
      if (!isMultiline(node)) {
        forbidTrailingComma(node);
      }
    }

    var checkForTrailingComma;
    if (mode === 'always') {
      checkForTrailingComma = forceTrailingComma;
    } else if (mode === 'always-multiline') {
      checkForTrailingComma = forceTrailingCommaIfMultiline;
    } else if (mode === 'only-multiline') {
      checkForTrailingComma = allowTrailingCommaIfMultiline;
    } else {
      checkForTrailingComma = forbidTrailingComma;
    }

    return {
      ArrowFunctionExpression: checkForTrailingComma,
      FunctionDeclaration: checkForTrailingComma,
      FunctionExpression: checkForTrailingComma,
      CallExpression: checkForTrailingComma,
      NewExpression: checkForTrailingComma,
    };
};

module.exports.fixable = 'code';
module.exports.schema =  [
  {
    enum: ['always', 'always-multiline', 'only-multiline', 'never']
  }
];
