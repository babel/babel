/**
 * @fileoverview Disallows or enforces spaces inside of array brackets.
 * @author Jamund Ferguson
 * @copyright 2015 Jamund Ferguson. All rights reserved.
 * @copyright 2014 Brandyn Bennett. All rights reserved.
 * @copyright 2014 Michael Ficarra. No rights reserved.
 * @copyright 2014 Vignesh Anand. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {
    var spaced = context.options[0] === "always",
        sourceCode = context.getSourceCode();

    /**
     * Determines whether an option is set, relative to the spacing option.
     * If spaced is "always", then check whether option is set to false.
     * If spaced is "never", then check whether option is set to true.
     * @param {Object} option - The option to exclude.
     * @returns {boolean} Whether or not the property is excluded.
     */
    function isOptionSet(option) {
        return context.options[1] ? context.options[1][option] === !spaced : false;
    }

    var options = {
        spaced: spaced,
        singleElementException: isOptionSet("singleValue"),
        objectsInArraysException: isOptionSet("objectsInArrays"),
        arraysInArraysException: isOptionSet("arraysInArrays")
    };

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    /**
     * Determines whether two adjacent tokens are on the same line.
     * @param {Object} left - The left token object.
     * @param {Object} right - The right token object.
     * @returns {boolean} Whether or not the tokens are on the same line.
     */
    function isSameLine(left, right) {
        return left.loc.start.line === right.loc.start.line;
    }

    /**
    * Reports that there shouldn't be a space after the first token
    * @param {ASTNode} node - The node to report in the event of an error.
    * @param {Token} token - The token to use for the report.
    * @returns {void}
    */
    function reportNoBeginningSpace(node, token) {
        context.report({
            node: node,
            loc: token.loc.start,
            message: "There should be no space after '" + token.value + "'",
            fix: function(fixer) {
                var nextToken = sourceCode.getTokenAfter(token);
                return fixer.removeRange([token.range[1], nextToken.range[0]]);
            }
        });
    }

    /**
    * Reports that there shouldn't be a space before the last token
    * @param {ASTNode} node - The node to report in the event of an error.
    * @param {Token} token - The token to use for the report.
    * @returns {void}
    */
    function reportNoEndingSpace(node, token) {
        context.report({
            node: node,
            loc: token.loc.start,
            message: "There should be no space before '" + token.value + "'",
            fix: function(fixer) {
                var previousToken = sourceCode.getTokenBefore(token);
                return fixer.removeRange([previousToken.range[1], token.range[0]]);
            }
        });
    }

    /**
    * Reports that there should be a space after the first token
    * @param {ASTNode} node - The node to report in the event of an error.
    * @param {Token} token - The token to use for the report.
    * @returns {void}
    */
    function reportRequiredBeginningSpace(node, token) {
        context.report({
            node: node,
            loc: token.loc.start,
            message: "A space is required after '" + token.value + "'",
            fix: function(fixer) {
                return fixer.insertTextAfter(token, " ");
            }
        });
    }

    /**
    * Reports that there should be a space before the last token
    * @param {ASTNode} node - The node to report in the event of an error.
    * @param {Token} token - The token to use for the report.
    * @returns {void}
    */
    function reportRequiredEndingSpace(node, token) {
        context.report({
            node: node,
            loc: token.loc.start,
            message: "A space is required before '" + token.value + "'",
            fix: function(fixer) {
                return fixer.insertTextBefore(token, " ");
            }
        });
    }

    /**
    * Determines if a node is an object type
    * @param {ASTNode} node - The node to check.
    * @returns {boolean} Whether or not the node is an object type.
    */
    function isObjectType(node) {
        return node && (node.type === "ObjectExpression" || node.type === "ObjectPattern");
    }

    /**
    * Determines if a node is an array type
    * @param {ASTNode} node - The node to check.
    * @returns {boolean} Whether or not the node is an array type.
    */
    function isArrayType(node) {
        return node && (node.type === "ArrayExpression" || node.type === "ArrayPattern");
    }

    /**
     * Validates the spacing around array brackets
     * @param {ASTNode} node - The node we're checking for spacing
     * @returns {void}
     */
    function validateArraySpacing(node) {
        if (options.spaced && node.elements.length === 0) {
            return;
        }

        var first = sourceCode.getFirstToken(node),
            second = sourceCode.getFirstToken(node, 1),
            last = sourceCode.getLastToken(node),
            firstElement = node.elements[0],
            lastElement = node.elements[node.elements.length - 1];

        while (last.type !== "Punctuation" && last.value !== "]") {
            last = sourceCode.getTokenBefore(last);
        }

        var penultimate = sourceCode.getTokenBefore(last);

        var openingBracketMustBeSpaced =
            options.objectsInArraysException && isObjectType(firstElement) ||
            options.arraysInArraysException && isArrayType(firstElement) ||
            options.singleElementException && node.elements.length === 1
                ? !options.spaced : options.spaced;

        var closingBracketMustBeSpaced =
            options.objectsInArraysException && isObjectType(lastElement) ||
            options.arraysInArraysException && isArrayType(lastElement) ||
            options.singleElementException && node.elements.length === 1
                ? !options.spaced : options.spaced;

        if (isSameLine(first, second)) {
            if (openingBracketMustBeSpaced && !sourceCode.isSpaceBetweenTokens(first, second)) {
                reportRequiredBeginningSpace(node, first);
            }
            if (!openingBracketMustBeSpaced && sourceCode.isSpaceBetweenTokens(first, second)) {
                reportNoBeginningSpace(node, first);
            }
        }

        if (first !== penultimate && isSameLine(penultimate, last)) {
            if (closingBracketMustBeSpaced && !sourceCode.isSpaceBetweenTokens(penultimate, last)) {
                reportRequiredEndingSpace(node, last);
            }
            if (!closingBracketMustBeSpaced && sourceCode.isSpaceBetweenTokens(penultimate, last)) {
                reportNoEndingSpace(node, last);
            }
        }
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        ArrayPattern: validateArraySpacing,
        ArrayExpression: validateArraySpacing
    };

};

module.exports.schema = [
    {
        "enum": ["always", "never"]
    },
    {
        "type": "object",
        "properties": {
            "singleValue": {
                "type": "boolean"
            },
            "objectsInArrays": {
                "type": "boolean"
            },
            "arraysInArrays": {
                "type": "boolean"
            }
        },
        "additionalProperties": false
    }
];
