"use strict";

const isInIncludedFolder = filename => {
  return /(?:packages|codemods|experimental)\/babel-/.test(filename);
};

const message =
  "t.clone() and t.cloneDeep() are deprecated. Use t.cloneNode() instead.";

module.exports = {
  meta: {
    schema: [],
  },
  fixable: "code",
  create(context) {
    if (!isInIncludedFolder(context.getFilename())) {
      return {};
    }

    return {
      CallExpression(node) {
        const callee = node.callee;

        if (callee.type !== "MemberExpression") return;
        if (callee.computed) return;

        const object = callee.object;
        if (object.type !== "Identifier" || object.name !== "t") return;

        const property = callee.property;
        if (property.type !== "Identifier") return;
        if (property.name !== "clone" && property.name !== "cloneDeep") return;

        context.report({
          node,
          message,
          fix(fixer) {
            fixer.replaceText(property, "cloneNode");
          },
        });
      },
    };
  },
};
