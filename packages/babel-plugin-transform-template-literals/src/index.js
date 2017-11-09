import annotateAsPure from "@babel/helper-annotate-as-pure";
import { types as t } from "@babel/core";

import CACHE_KEY from "./_cache-key";
export { CACHE_KEY };

export default function(api, options) {
  const { loose } = options;

  let helperName = "taggedTemplateLiteral";
  if (loose) helperName += "Loose";

  /**
   * This function groups the objects into multiple calls to `.concat()` in
   * order to preserve execution order of the primitive conversion, e.g.
   *
   *   "".concat(obj.foo, "foo", obj2.foo, "foo2")
   *
   * would evaluate both member expressions _first_ then, `concat` will
   * convert each one to a primitive, whereas
   *
   *   "".concat(obj.foo, "foo").concat(obj2.foo, "foo2")
   *
   * would evaluate the member, then convert it to a primitive, then evaluate
   * the second member and convert that one, which reflects the spec behavior
   * of template literals.
   */
  function buildConcatCallExressions(items) {
    let avail = true;
    return items.reduce(function(left, right) {
      let canBeInserted = t.isLiteral(right);

      if (!canBeInserted && avail) {
        canBeInserted = true;
        avail = false;
      }
      if (canBeInserted && t.isCallExpression(left)) {
        left.arguments.push(right);
        return left;
      }
      return t.callExpression(
        t.memberExpression(left, t.identifier("concat")),
        [right],
      );
    });
  }

  return {
    cacheKey: CACHE_KEY,
    pre() {
      this.templates = new Map();
    },
    visitor: {
      TaggedTemplateExpression(path) {
        const { node } = path;
        const { quasi } = node;

        const strings = [];
        const raws = [];

        for (const elem of (quasi.quasis: Array)) {
          const { raw, cooked } = elem.value;
          const value =
            cooked == null
              ? path.scope.buildUndefinedNode()
              : t.stringLiteral(cooked);

          strings.push(value);
          raws.push(t.stringLiteral(raw));
        }

        // Generate a unique name based on the string literals so we dedupe
        // identical strings used in the program.
        const rawParts = raws.map(s => s.value).join(",");
        const name = `${helperName}_${raws.length}_${rawParts}`;

        let templateObject = this.templates.get(name);
        if (templateObject) {
          templateObject = t.clone(templateObject);
        } else {
          const programPath = path.find(p => p.isProgram());
          templateObject = programPath.scope.generateUidIdentifier(
            "templateObject",
          );
          this.templates.set(name, templateObject);

          const helperId = this.addHelper(helperName);
          const init = t.callExpression(helperId, [
            t.arrayExpression(strings),
            t.arrayExpression(raws),
          ]);
          annotateAsPure(init);
          init._compact = true;
          programPath.scope.push({
            id: templateObject,
            init,
            // This ensures that we don't fail if not using function expression helpers
            _blockHoist: 1.9,
          });
        }

        path.replaceWith(
          t.callExpression(node.tag, [templateObject, ...quasi.expressions]),
        );
      },

      TemplateLiteral(path) {
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
            if (!t.isStringLiteral(node, { value: "" })) {
              nodes.push(node);
            }
          }
        }

        // since `+` is left-to-right associative
        // ensure the first node is a string if first/second isn't
        const considerSecondNode = !loose || !t.isStringLiteral(nodes[1]);
        if (!t.isStringLiteral(nodes[0]) && considerSecondNode) {
          nodes.unshift(t.stringLiteral(""));
        }
        let root = nodes[0];

        if (loose) {
          for (let i = 1; i < nodes.length; i++) {
            root = t.binaryExpression("+", root, nodes[i]);
          }
        } else if (nodes.length > 1) {
          root = buildConcatCallExressions(nodes);
        }

        path.replaceWith(root);
      },
    },
  };
}
