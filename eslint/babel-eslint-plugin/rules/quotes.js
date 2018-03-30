'use strict';

const ruleComposer = require('eslint-rule-composer');
const eslint = require('eslint');
const quotesRule = new eslint.Linter().getRules().get('quotes');

module.exports = ruleComposer.filterReports(
  quotesRule,
  (problem, metadata) => {
    // Workaround for JSX fragment syntax until
    // https://github.com/eslint/eslint/issues/9662
    if (problem.node.parent.type === "JSXFragment") {
      return false;
    }

    return true;
  }
);
