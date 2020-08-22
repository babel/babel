import ruleComposer from "eslint-rule-composer";
import eslint from "eslint";

const noInvalidThisRule = new eslint.Linter().getRules().get("no-invalid-this");

export default ruleComposer.filterReports(noInvalidThisRule, problem => {
  let inClassElement = false;
  let node = problem.node;

  while (node) {
    if (
      node.type === "ClassPrivateMethod" ||
      node.type === "ClassPrivateProperty" ||
      node.type === "ClassProperty"
    ) {
      inClassElement = true;
      return;
    }

    node = node.parent;
  }

  return !inClassElement;
});
