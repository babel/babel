export default function ({ types: t }) {
  function isString(node) {
    return t.isLiteral(node) && typeof node.value === "string";
  }

  function buildBinaryExpression(left, right) {
    var node = t.binaryExpression("+", left, right);
    node._templateLiteralProduced = true;
    return node;
  }

  function crawl(path) {
    if (path.is("_templateLiteralProduced")) {
      crawl(path.get("left"));
      crawl(path.get("right"));
    } else if (!path.isBaseType("string") && !path.isBaseType("number")) {
      path.replaceWith(t.callExpression(t.identifier("String"), [path.node]));
    }
  }

  return {
    metadata: {
      group: "builtin-pre"
    },

    visitor: {
      TaggedTemplateExpression(node, parent, scope, file) {
        var quasi = node.quasi;
        var args  = [];

        var strings = [];
        var raw     = [];

        for (var elem of (quasi.quasis: Array)) {
          strings.push(t.stringLiteral(elem.value.cooked));
          raw.push(t.stringLiteral(elem.value.raw));
        }

        strings = t.arrayExpression(strings);
        raw = t.arrayExpression(raw);

        var templateName = "tagged-template-literal";
        if (file.isLoose("es6.templateLiterals")) templateName += "-loose";

        var templateObject = file.addTemplateObject(templateName, strings, raw);
        args.push(templateObject);

        args = args.concat(quasi.expressions);

        return t.callExpression(node.tag, args);
      },

      TemplateLiteral(node, parent, scope, file) {
        var nodes = [];

        for (let elem of (node.quasis: Array)) {
          nodes.push(t.stringLiteral(elem.value.cooked));

          var expr = node.expressions.shift();
          if (expr) nodes.push(expr);
        }

        // filter out empty string literals
        nodes = nodes.filter(n => !t.isLiteral(n, { value: "" }));

        // since `+` is left-to-right associative
        // ensure the first node is a string if first/second isn't
        if (!isString(nodes[0]) && !isString(nodes[1])) {
          nodes.unshift(t.stringLiteral(""));
        }

        if (nodes.length > 1) {
          var root = buildBinaryExpression(nodes.shift(), nodes.shift());

          for (let node of (nodes: Array)) {
            root = buildBinaryExpression(root, node);
          }

          this.replaceWith(root);
          crawl(this);
        } else {
          return nodes[0];
        }
      }
    }
  };
}
