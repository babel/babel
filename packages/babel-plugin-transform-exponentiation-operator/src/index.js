import build from "@babel/helper-builder-binary-assignment-operator-visitor";

export default function({ types: t }) {
  return {
    visitor: build({
      operator: "**",

      build(left, right) {
        return t.callExpression(
          t.memberExpression(t.identifier("Math"), t.identifier("pow")),
          [left, right],
        );
      },
    }),
  };
}
