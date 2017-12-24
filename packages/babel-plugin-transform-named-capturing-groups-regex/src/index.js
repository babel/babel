import regexpTree from "regexp-tree";

export default function({ types: t }, options) {
  const { runtime = true } = options;
  if (typeof runtime !== "boolean") {
    throw new Error(".runtime must be boolean");
  }

  return {
    name: "transform-named-capturing-groups-regex",

    visitor: {
      RegExpLiteral(path) {
        const node = path.node;
        if (node.pattern.indexOf("(?<") === -1) {
          // Return early if there are no named groups.
          // The .indexOf check may have false positives (e.g. /\(?</); in
          // this case we parse the regex and regexp-tree won't transform it.
          return;
        }

        const result = regexpTree.compatTranspile(node.extra.raw, [
          "namedCapturingGroups",
        ]);
        const { namedCapturingGroups } = result.getExtra();

        if (
          namedCapturingGroups &&
          Object.keys(namedCapturingGroups).length > 0
        ) {
          node.pattern = result.getSource();

          if (runtime && !isRegExpTest(path)) {
            path.replaceWith(
              t.callExpression(this.addHelper("wrapRegExp"), [
                node,
                t.valueToNode(namedCapturingGroups),
              ]),
            );
          }
        }
      },
    },
  };
}

function isRegExpTest(path) {
  return (
    path.parentPath.isMemberExpression({
      object: path.node,
      computed: false,
    }) && path.parentPath.get("property").isIdentifier({ name: "test" })
  );
}
