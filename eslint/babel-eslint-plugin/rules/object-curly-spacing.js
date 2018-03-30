"use strict";

const ruleComposer = require('eslint-rule-composer');
const eslint = require('eslint');
const objectCurlySpacingRule = new eslint.Linter().getRules().get('object-curly-spacing');

module.exports = ruleComposer.filterReports(
    objectCurlySpacingRule,
    (problem, metadata) => {
        const node = problem.node;

        // Allow `exportNamespaceFrom` and `exportDefaultFrom` syntax:
        // export * as x from '...';
        // export x from '...';
        if (
            node.type === 'ExportNamedDeclaration' &&
            node.specifiers.length > 0 &&
            metadata.sourceCode.getTokenBefore(node.specifiers[0]).value === "export"
        ) {
            return false;
        }

        return true;
    }
);
