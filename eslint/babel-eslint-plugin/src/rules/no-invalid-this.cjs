const ruleComposer = require("eslint-rule-composer");
const eslint = require("eslint");
const eslintVersion = eslint.ESLint.version;

const noInvalidThisRule = (
  parseInt(eslintVersion, 10) >= 9
    ? require("eslint/use-at-your-own-risk").builtinRules
    : new eslint.Linter().getRules()
).get("no-invalid-this");

if (parseInt(eslintVersion, 10) >= 8) {
  // ESLint 8 supports class properties / private methods natively
  // so we simply forward the original rule
  module.exports = noInvalidThisRule;
} else {
  module.exports = ruleComposer.filterReports(noInvalidThisRule, problem => {
    let inClassMember = false;
    let node = problem.node;

    while (node) {
      if (
        node.type === "ClassPrivateMethod" ||
        node.type === "ClassPrivateProperty" ||
        node.type === "ClassProperty" ||
        node.type === "PropertyDefinition" ||
        (node.type === "MethodDefinition" &&
          node.key.type === "PrivateIdentifier")
      ) {
        inClassMember = true;
        break;
      } else if (
        node.type === "FunctionDeclaration" ||
        node.type === "FunctionExpression"
      ) {
        inClassMember = false;
        break;
      }

      node = node.parent;
    }

    return !inClassMember;
  });
}
