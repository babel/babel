const ruleComposer = require("eslint-rule-composer");
const eslint = require("eslint");
const eslintVersion = eslint.ESLint.version;

const rule = (
  parseInt(eslintVersion, 10) >= 9
    ? require("eslint/use-at-your-own-risk").builtinRules
    : new eslint.Linter().getRules()
).get("object-curly-spacing");

module.exports = ruleComposer.filterReports(rule, problem => {
  const node = problem.node;

  // Allow exportDefaultFrom syntax:
  // export x from '...';
  if (
    node.type === "ExportNamedDeclaration" &&
    node.specifiers.length === 1 &&
    node.specifiers[0].type === "ExportDefaultSpecifier"
  ) {
    return false;
  }

  return true;
});
