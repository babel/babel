"use strict";

const ruleComposer = require('eslint-rule-composer');
const eslint = require('eslint');
const newCapRule = new eslint.Linter().getRules().get('new-cap');

/**
 * Returns whether a node is under a decorator or not.
 * @param  {ASTNode}  node CallExpression node
 * @returns {Boolean} Returns true if the node is under a decorator.
 */
function isDecorator(node) {
    return node.parent.type === "Decorator";
}

module.exports = ruleComposer.filterReports(
    newCapRule,
    (problem, metadata) => !isDecorator(problem.node)
);
