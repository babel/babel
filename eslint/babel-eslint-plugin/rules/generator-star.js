/**
 * @fileoverview Rule to check for the position of the * in your generator functions
 * @author Jamund Ferguson
 * @copyright 2014 Jamund Ferguson. All rights reserved.
 */

"use strict";

var parse = require('../helpers').parse

module.exports = function(context) {

    var position = context.options[0] || "end";

    function isAsyncGenerator(node){
        return context.getFirstToken(node, 2).value === '*'
    }

    /**
     * Check the position of the star compared to the expected position.
     * @param {ASTNode} node - the entire function node
     * @returns {void}
     */
    function checkStarPosition(node) {

        var first = context.getFirstToken(node)
          , isAsync = first.value === 'async'
          , starToken;


        if (!node.generator || (isAsync && !isAsyncGenerator(node))) {
            return;
        }

        // Blocked, pending decision to fix or work around in eslint/espree#36
        if (context.getAncestors().pop().method) {
            return;
        }

        starToken = context.getFirstToken(node, isAsync ? 2 : 1);

        //console.log(declaration, starToken)

        // check for function *name() {}
        if (position === "end") {
            if (starToken.range[1] !== context.getTokenAfter(starToken).range[0]) {
                // * starts where the next identifier begins
                context.report(node, "Expected a space before *.");
            }
        }

        // check for function* name() {}
        if (position === "start") {

            // * begins where the previous identifier ends
            if (starToken.range[0] !== context.getTokenBefore(starToken).range[1]) {
                context.report(node, "Expected no space before *.");
            }
        }

        // check for function * name() {}
        if (position === "middle") {

            // must be a space before and afer the *
            if (starToken.range[0] <= context.getTokenBefore(starToken).range[1] ||
                starToken.range[1] >= context.getTokenAfter(starToken).range[0]) {
                context.report(node, "Expected spaces around *.");
            }
        }

    }

    return {
        "FunctionDeclaration": checkStarPosition,
        "FunctionExpression": checkStarPosition
    };

};

module.exports.schema = [
    {
        "enum": ["start", "middle", "end"]
    }
];