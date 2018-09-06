"use strict";

const ruleComposer = require('eslint-rule-composer');
const eslint = require('eslint');
const validTypeOf = new eslint.Linter().getRules().get('valid-typeof');

module.exports = ruleComposer.filterReports(
  validTypeOf,
  (problem, metadata) => {
    return problem.node.value !== 'bigint';
  }
)
