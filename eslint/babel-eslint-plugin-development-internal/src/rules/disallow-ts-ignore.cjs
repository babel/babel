module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "",
    },
    fixable: "code",
  },
  create(ctx) {
    const sourceCode = ctx.getSourceCode();

    return {
      Program() {
        for (const comment of sourceCode.getAllComments()) {
          if (
            /^\s*@ts-ignore(?!\(Babel \d vs Babel \d\))/.test(comment.value)
          ) {
            ctx.report({
              node: comment,
              message:
                "`@ts-ignore` is only allowed for differences between Babel 7 and Babel 8, and it must be marked" +
                " as `@ts-ignore(Babel 7 vs Babel 8)`. Use `@ts-expect-error` instead.",
            });
          }
        }
      },
    };
  },
};
