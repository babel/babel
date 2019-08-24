"use strict";

const ruleComposer = require('eslint-rule-composer');
const eslint = require('eslint');
const noInvalidThisRule = new eslint.Linter().getRules().get('no-invalid-this');

module.exports = ruleComposer.filterReports(
    noInvalidThisRule,
    (problem, metadata) => {
        let inClassProperty = false;
        let node = problem.node;

        while (node) {
            if (node.type === "ClassProperty" ||
                node.type === "ClassPrivateProperty") {
                inClassProperty = true;
                return;
            }

            node = node.parent;
        }

        return !inClassProperty;
    }
);
