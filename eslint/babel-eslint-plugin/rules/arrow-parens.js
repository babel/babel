/**
 * @fileoverview Rule to require parens in arrow function arguments.
 * @author Jxck
 * @copyright 2015 Jxck. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {
    var message = "Expected parentheses around arrow function argument.";
    var asNeededMessage = "Unexpected parentheses around single function argument";
    var asNeeded = context.options[0] === "as-needed";

    /**
     * Determines whether a arrow function argument end with `)`
     * @param {ASTNode} node The arrow function node.
     * @returns {void}
     */
    function parens(node) {
        var token = context.getFirstToken(node);
        if (node.async) token = context.getTokenAfter(token);

        // as-needed: x => x
        if (asNeeded && node.params.length === 1
                && node.params[0].type === "Identifier"
                && node.params[0].typeAnnotation === undefined) {
            if (token.type === "Punctuator" && token.value === "(") {
                context.report({
                    node: node,
                    message: asNeededMessage,
                    fix: function(fixer) {
                      var paramToken = context.getTokenAfter(token);
                      var closingParenToken = context.getTokenAfter(paramToken);
                      return fixer.replaceTextRange([
                        token.range[0],
                        closingParenToken.range[1]
                      ], paramToken.value);
                    }
                });
            }
            return;
        }

        if (token.type === "Identifier") {
            var after = context.getTokenAfter(token);

            // (x) => x
            if (after.value !== ")") {
                context.report({
                    node: node,
                    message: message,
                    fix: function(fixer) {
                        return fixer.replaceText(token, '(' + token.value + ')');
                    }
                });
            }
        }
    }

    return {
        "ArrowFunctionExpression": parens
    };
};

module.exports.schema = [
    {
        "enum": ["always", "as-needed"]
    }
];
