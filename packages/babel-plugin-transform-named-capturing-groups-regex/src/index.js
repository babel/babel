import rewritePattern from "regexpu-core";

export default function({ types: t }, options) {
  const { runtime = true } = options;
  if (typeof runtime !== "boolean") {
    throw new Error("The 'runtime' option must be boolean");
  }

  return {
    name: "transform-named-capturing-groups-regex",

    visitor: {
      RegExpLiteral(path) {
        const node = path.node;
        if (!/\(\?<(?![=!])/.test(node.pattern)) {
          // Return early if there are no named groups.
          // The .indexOf check may have false positives (e.g. /\(?</); in
          // this case we parse the regex and regexp-tree won't transform it.
          return;
        }

        const namedCapturingGroups = {};
        const result = rewritePattern(node.pattern, node.flags, {
          namedGroup: true,
          //todo: consider refactor `lookbehind` true as modular plugin
          lookbehind: true,
          onNamedGroup(name, index) {
            namedCapturingGroups[name] = index;
          },
        });

        if (Object.keys(namedCapturingGroups).length > 0) {
          node.pattern = result;

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
