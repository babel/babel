import ruleComposer from "eslint-rule-composer";
import eslint from "eslint";

const quotesRule = new eslint.Linter().getRules().get("quotes");

export default ruleComposer.filterReports(quotesRule, problem => {
  // Workaround for JSX fragment syntax until
  // https://github.com/eslint/eslint/issues/9662
  if (problem.node.parent.type === "JSXFragment") {
    return false;
  }

  return true;
});
