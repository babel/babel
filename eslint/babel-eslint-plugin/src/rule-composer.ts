import type { Rule } from "eslint";
import type { Violation, RefinedReportParameters } from "./types.ts";

export function filterReports(
  rule: Rule.RuleModule,
  predicate: (violation: Violation, context: Rule.RuleContext) => boolean,
): Rule.RuleModule {
  return Object.freeze({
    create(context: Rule.RuleContext) {
      return rule.create(
        Object.freeze(
          Object.create(context, {
            report: {
              enumerable: true,
              value(...args: RefinedReportParameters) {
                const violation = args[0];
                if (predicate(violation, context)) {
                  context.report(...args);
                }
              },
            },
          }),
        ),
      );
    },
    meta: rule.meta,
  });
}
