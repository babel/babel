export default function ({ types: t }) {
  return {
    visitor: {
      TaggedTemplateExpression(path, state) {
        const { node } = path;
        const { quasi } = node;

        const strings = [];
        const raws = [];

        for (const elem of (quasi.quasis: Array)) {
          const { raw, cooked } = elem.value;
          const value = cooked == null
            ? path.scope.buildUndefinedNode()
            : t.stringLiteral(cooked);

          strings.push(value);
          raws.push(t.stringLiteral(raw));
        }

        let templateName = "taggedTemplateLiteral";
        if (state.opts.loose) templateName += "Loose";

        const templateObject = state.file.addTemplateObject(
          templateName,
          t.arrayExpression(strings),
          t.arrayExpression(raws)
        );

        const args = [templateObject].concat(quasi.expressions);

        path.replaceWith(t.callExpression(node.tag, args));
      },

      TemplateLiteral(path, state) {
        const nodes = [];
        const expressions = path.get("expressions");

        let index = 0;
        for (const elem of (path.node.quasis: Array)) {
          if (elem.value.cooked) {
            nodes.push(t.stringLiteral(elem.value.cooked));
          }

          if (index < expressions.length) {
            const expr = expressions[index++];
            const node = expr.node;
            if (state.opts.spec && !expr.isBaseType("string") && !expr.isBaseType("number")) {
              nodes.push(t.callExpression(t.identifier("String"), [node]));
            } else if (!t.isStringLiteral(node, { value: "" })) {
              nodes.push(node);
            }
          }
        }

        // since `+` is left-to-right associative
        // ensure the first node is a string if first/second isn't
        if (!t.isStringLiteral(nodes[0]) && !t.isStringLiteral(nodes[1])) {
          nodes.unshift(t.stringLiteral(""));
        }

        let root = nodes[0];
        for (let i = 1; i < nodes.length; i++) {
          root = t.binaryExpression("+", root, nodes[i]);
        }

        path.replaceWith(root);
      },
    },
  };
}
