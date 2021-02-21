import ruleComposer from "eslint-rule-composer";
import eslint from "eslint";

const noInvalidThisRule = new eslint.Linter().getRules().get("no-invalid-this");

export default ruleComposer.filterReports(noInvalidThisRule, problem => {
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
      return;
    }

    node = node.parent;
  }

  return !inClassMember;
});
