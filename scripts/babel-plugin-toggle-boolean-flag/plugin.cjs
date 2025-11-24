module.exports = pluginToggleBooleanFlag;

/**
 * If `value` is null, it will leave the conditions in code. It will remove
 * them in attributes by replacing them with <if true> || <if false>
 *
 * @param {import("@babel/core")} pluginAPI
 * @returns {import("@babel/core").PluginObject}
 */
function pluginToggleBooleanFlag({ types: t, template }, { name, value }) {
  if (typeof value !== "boolean" && value !== null) {
    throw new Error(`.value must be a boolean, or null`);
  }

  function parseExpression(source) {
    // eslint-disable-next-line regexp/no-useless-assertions
    return template.expression(source, { placeholderPattern: /(?!.)./ })({});
  }

  /**
   * @param {import("@babel/core").types.Expression} test
   */
  function evaluate(test, value) {
    const res = {
      replace: replacement => ({ replacement, value: null, unrelated: false }),
      value: value => ({ replacement: null, value, unrelated: false }),
      unrelated: () => ({ replacement: test, value: null, unrelated: true }),
    };

    if (t.isIdentifier(test, { name }) || t.matchesPattern(test, name)) {
      return res.value(value);
    }

    if (t.isUnaryExpression(test, { operator: "!" })) {
      const arg = evaluate(test.argument, value);
      return arg.unrelated
        ? res.unrelated()
        : arg.replacement
          ? res.replacement(t.unaryExpression("!", arg.replacement))
          : res.value(!arg.value);
    }

    if (t.isLogicalExpression(test, { operator: "||" })) {
      const left = evaluate(test.left, value);
      const right = evaluate(test.right, value);

      if (left.value === true || right.value === true) return res.value(true);
      if (left.value === false && right.value === false) {
        return res.value(false);
      }
      if (left.value === false) return res.replace(right.replacement);
      if (right.value === false) return res.replace(left.replacement);
      if (left.unrelated && right.unrelated) return res.unrelated();
      return res.replace(
        t.logicalExpression("||", left.replacement, right.replacement)
      );
    }

    if (t.isLogicalExpression(test, { operator: "&&" })) {
      const left = evaluate(test.left, value);
      const right = evaluate(test.right, value);

      if (left.value === true && right.value === true) return res.value(true);
      if (left.value === false || right.value === false) {
        return res.value(false);
      }
      if (left.value === true) return res.replace(right.replacement);
      if (right.value === true) return res.replace(left.replacement);
      if (left.unrelated && right.unrelated) return res.unrelated();
      return res.replace(
        t.logicalExpression("&&", left.replacement, right.replacement)
      );
    }

    return res.unrelated();
  }

  return {
    visitor: {
      "IfStatement|ConditionalExpression"(path) {
        if (value === null) return;

        let test = path.get("test");

        // yarn-plugin-conditions injects bool(process.env.BABEL_8_BREAKING)
        // tests, to properly cast the env variable to a boolean.
        if (
          test.isCallExpression() &&
          test.get("callee").isIdentifier({ name: "bool" }) &&
          test.get("arguments").length === 1
        ) {
          test = test.get("arguments")[0];
        }

        const res = evaluate(test.node, value);

        if (res.unrelated) return;
        if (res.replacement) {
          path.get("test").replaceWith(res.replacement);
        } else {
          path.replaceWith(
            res.value
              ? path.node.consequent
              : path.node.alternate || t.emptyStatement()
          );
        }
      },
      LogicalExpression(path) {
        if (value === null) return;

        const res = evaluate(path.node, value);
        if (res.unrelated) return;
        if (res.replacement) {
          path.replaceWith(res.replacement);
        } else {
          path.replaceWith(t.booleanLiteral(res.value));
        }
      },
      MemberExpression(path) {
        if (value === null) return;

        if (path.matchesPattern(name)) {
          throw path.buildCodeFrameError("This check could not be stripped.");
        }
      },
      ReferencedIdentifier(path) {
        if (value === null) return;

        if (path.node.name === name) {
          throw path.buildCodeFrameError("This check could not be stripped.");
        }
      },
      ImportDeclaration(path) {
        if (!path.node.attributes) return;

        /** @type {null | import("@babel/core").NodePath<import("@babel/core").types.ImportAttribute>} */
        const ifAttribute = path
          .get("attributes")
          .find(attr => attr.node.key.name === "if");
        if (ifAttribute == null) {
          return;
        }

        const condition = parseExpression(ifAttribute.node.value.value);

        let res;
        res_block: if (value !== null) {
          res = evaluate(condition, value);
        } else {
          const ifTrue = evaluate(condition, true);
          if (ifTrue.unrelated || ifTrue.value === true) {
            res = ifTrue;
            break res_block;
          }
          const ifFalse = evaluate(condition, false);
          if (ifFalse.unrelated) throw new Error("Cannot be unrelated");
          if (ifFalse.value === true) {
            res = ifFalse;
            break res_block;
          }

          if (ifTrue.value === false) {
            res = ifFalse;
            break res_block;
          }
          if (ifTrue.value === false) {
            res = ifTrue;
            break res_block;
          }

          if (!ifTrue.replacement && !ifFalse.replacement) {
            throw new Error("Expected two replacements");
          }

          res = {
            replacement: t.binaryExpression(
              "||",
              ifTrue.replacement,
              ifFalse.replacement
            ),
            value: null,
            unrelated: false,
          };
        }

        if (res.unrelated) return;
        if (res.replacement) {
          ifAttribute
            .get("value")
            .replaceWith(
              t.stringLiteral(
                ifAttribute.toString.call({ node: res.replacement })
              )
            );
        } else if (res.value === true) {
          ifAttribute.remove();
          if (path.node.attributes.length === 0) {
            path.node.attributes = null;
          }
        } else if (res.value === false) {
          path.remove();
        }
      },
    },
  };
}
