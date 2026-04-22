export function filterReports(rule, predicate) {
  return Object.freeze({
    create(context) {
      return rule.create(
        Object.freeze(
          Object.create(context, {
            report: {
              enumerable: true,
              value(...args) {
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
