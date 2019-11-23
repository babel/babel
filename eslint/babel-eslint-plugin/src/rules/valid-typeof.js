import ruleComposer from "eslint-rule-composer";
import eslint from "eslint";

const validTypeOf = new eslint.Linter().getRules().get("valid-typeof");

export default ruleComposer.filterReports(validTypeOf, problem => {
  return problem.node.value !== "bigint";
});
