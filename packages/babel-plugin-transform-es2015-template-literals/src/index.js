export default function ({ types: t }) {
  function isString(node) {
    return t.isLiteral(node) && typeof node.value === "string";
  }

  function buildBinaryExpression(left, right) {
    return t.binaryExpression("+", left, right);
  }

  return {
    visitor: {
      TaggedTemplateExpression(path, state) {
        const { node } = path;
        const quasi = node.quasi;
        let args  = [];

        let strings = [];
        let raw     = [];

        for (const elem of (quasi.quasis: Array)) {
          strings.push(t.stringLiteral(elem.value.cooked));
          raw.push(t.stringLiteral(elem.value.raw));
        }

        strings = t.arrayExpression(strings);
        raw = t.arrayExpression(raw);

        let templateName = "taggedTemplateLiteral";
        if (state.opts.loose) templateName += "Loose";

        const templateObject = state.file.addTemplateObject(templateName, strings, raw);
        args.push(templateObject);

        args = args.concat(quasi.expressions);

        path.replaceWith(t.callExpression(node.tag, args));
      },

      TemplateLiteral(path, state) {
        let nodes: Array<Object> = [];

        const expressions = path.get("expressions");

        for (const elem of (path.node.quasis: Array)) {
          nodes.push(t.stringLiteral(elem.value.cooked));

          const expr = expressions.shift();
          if (expr) {
            if (state.opts.spec && !expr.isBaseType("string") && !expr.isBaseType("number"))  {
              nodes.push(t.callExpression(t.identifier("String"), [expr.node]));
            } else {
              nodes.push(expr.node);
            }
          }
        }

        // filter out empty string literals
        nodes = nodes.filter((n) => !t.isLiteral(n, { value: "" }));

        // since `+` is left-to-right associative
        // ensure the first node is a string if first/second isn't
        if (!isString(nodes[0]) && !isString(nodes[1])) {
          nodes.unshift(t.stringLiteral(""));
        }

        if (nodes.length > 1) {
          let root = buildBinaryExpression(nodes.shift(), nodes.shift());

          for (const node of nodes) {
            root = buildBinaryExpression(root, node);
          }

          path.replaceWith(root);
        } else {
          path.replaceWith(nodes[0]);
        }
      }
    }
  };
}
