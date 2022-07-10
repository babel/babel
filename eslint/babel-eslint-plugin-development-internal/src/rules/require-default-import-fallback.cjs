module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "",
    },
    fixable: "code",
  },
  create(ctx) {
    return {
      ImportDeclaration(node) {
        const filename = ctx.getFilename();
        const src = node.source.value;
        if (
          // Not a source file in the monorepo
          (!src.includes("/lib/") && !src.startsWith("@babel/")) ||
          // This package already always uses the ESM entrypoint.
          src === "@babel/helper-plugin-test-runner" ||
          // Unclear if we'll convert this or it will stay as JSON.
          src.startsWith("@babel/compat-data") ||
          // This will not become an ESM file.
          src.endsWith(".cjs") ||
          // @babel/core automatically unwraps .default from plugins/presets.
          /^@babel\/(plugin|preset)-/.test(src) ||
          (src.endsWith("./lib/index.js") &&
            /babel-(plugin|preset)-/.test(filename))
        ) {
          return;
        }

        const defaultSpecifier = node.specifiers.find(
          spec => spec.type === "ImportDefaultSpecifier",
        );
        if (!defaultSpecifier) return;

        const scope = ctx.getScope();

        const { name: local } = defaultSpecifier.local;
        const { references } = scope.variables.find(v => v.name === local);

        const isRef = node => node.type === "Identifier" && node.name === local;
        const isRefDefault = node =>
          node.type === "MemberExpression" &&
          !node.computed &&
          node.property.name === "default" &&
          isRef(node.object);

        for (const { identifier } of references) {
          const base =
            identifier.parent.type === "MemberExpression"
              ? identifier.parent.parent
              : identifier.parent;

          if (
            base.type !== "LogicalExpression" ||
            base.operator !== "||" ||
            !isRefDefault(base.left) ||
            !isRef(base.right)
          ) {
            const expected = `${local}.default || ${local}`;
            ctx.report({
              node: identifier,
              message: `Default imports of source files must be used with an explicit fallback: \`${expected}\``,
              fix(fixer) {
                const base = isRefDefault(identifier.parent)
                  ? identifier.parent
                  : identifier;
                return fixer.replaceText(base, `(${expected})`);
              },
            });
          }
        }
      },
    };
  },
};
