import type { NodePath, types as t } from "@babel/core";
import type { Rule } from "eslint";

export type BabelESTreeNode<T extends t.Node = t.Node> = T & {
  parent: BabelESTreeNode<NodePath<T>["parent"]>;
};
type ReportParameters = Parameters<Rule.RuleContext["report"]>;
// The RuleContext["report"] also allows { loc: Location } as a Violation, but the official ESLint
// rules always pass { node }, so we can be more specific here.
export type Violation = ReportParameters[0] & { node: BabelESTreeNode };
// As of ESLint 10 the report parameters are [violation], here we pass through the rest of the parameters as well to be future proof.
export type RefinedReportParameters = [Violation, ...Tail<ReportParameters>];
type Tail<T extends any[]> = T extends [any, ...infer Rest] ? Rest : never;
