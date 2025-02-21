module.exports = pluginBabelBitDecorator;

/** @param {{ types: import("@babel/types") }} api */
function pluginBabelBitDecorator({ types: t, template }) {
  const bodyTemplate = template.statement({ allowReturnOutsideFunction: true });

  return {
    manipulateOptions({ parserOpts }) {
      parserOpts.plugins.push("decorators", "decoratorAutoAccessors");
    },
    visitor: {
      Class(path) {
        let storageField;
        let storageName;

        for (const element of path.get("body.body")) {
          if (
            (element.isClassProperty() || element.isClassPrivateProperty()) &&
            element.node.decorators &&
            element.node.decorators.some(dec =>
              t.matchesPattern(dec.expression, "bit.storage")
            )
          ) {
            element.node.decorators = element.node.decorators.filter(
              dec => !t.matchesPattern(dec.expression, "bit.storage")
            );
            storageField = element;
            storageName = element.node.key;
            break;
          }
        }

        let initial = 0;
        let nextMask = 1;

        for (const element of path.get("body.body")) {
          let dec;
          if (
            element.isClassAccessorProperty() &&
            (dec =
              element.node.decorators &&
              element
                .get("decorators")
                .find(
                  ({ node: dec }) =>
                    t.isIdentifier(dec.expression, { name: "bit" }) ||
                    (t.isCallExpression(dec.expression) &&
                      t.isIdentifier(dec.expression.callee, { name: "bit" }))
                ))
          ) {
            if (element.node.static || t.isPrivateName(element.node.key)) {
              throw element.buildCodeFrameError(
                "@bit cannot be used on static or private fields"
              );
            }
            if (element.node.decorators.length > 1) {
              throw element.buildCodeFrameError(
                "@bit cannot be used with other decorators"
              );
            }
            if (!t.isBooleanLiteral(element.node.value)) {
              throw element.buildCodeFrameError(
                "@bit fields must be initialized to a boolean literal"
              );
            }
            if (!storageName) {
              throw path.buildCodeFrameError(
                "Cannot use @bit without also declaring a @bit.storage field"
              );
            }
            if (nextMask === 0) {
              // overflow
              throw path.buildCodeFrameError(
                "A class can contain at most 32 @bit decorators"
              );
            }

            let val;
            if (
              t.isCallExpression(dec.node.expression) &&
              dec.node.expression.arguments.length > 0 &&
              (val = dec.get("expression.arguments.0").evaluate().value) !==
                nextMask
            ) {
              throw dec.buildCodeFrameError(
                `Bit mask is ${nextMask.toString(2)}, but found ${val.toString(2)} (or couldn't evaluate)`
              );
            }

            if (element.node.value.value) {
              initial |= nextMask;
            }

            element.replaceWithMultiple([
              t.classMethod(
                "get",
                element.node.key,
                [],
                bodyTemplate.ast`{
                  return (
                    this.${t.cloneNode(storageName)} & ${t.numericLiteral(nextMask)}
                  ) > 0;
                }`
              ),
              t.classMethod(
                "set",
                element.node.key,
                [t.identifier("v")],
                bodyTemplate.ast`{
                  if (v) this.${t.cloneNode(storageName)} |= ${t.numericLiteral(nextMask)};
                  else this.${t.cloneNode(storageName)} &= ${t.valueToNode(~nextMask)};
                }`
              ),
            ]);

            nextMask <<= 1;
          }
        }

        if (storageField) {
          storageField.node.value = t.numericLiteral(initial);
        }
      },
    },
  };
}
