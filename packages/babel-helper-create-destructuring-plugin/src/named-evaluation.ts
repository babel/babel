import { types as t } from "@babel/core";
import type { File, Scope } from "@babel/core";
import { isAnonymousFunctionDefinition } from "./util.ts";

interface NamingContext {
  scope: Scope;
  addHelper: File["addHelper"];
  hoisted: t.Identifier[];
}

/** Infer default names before class static initialization. */
export function buildNamedDefault(
  left: t.LVal,
  right: t.Expression,
  context: NamingContext,
): t.Expression {
  let defaultValue = right;
  if (t.isIdentifier(left) && isAnonymousFunctionDefinition(right)) {
    // https://tc39.es/ecma262/#sec-runtime-semantics-namedevaluation
    if (t.isClassExpression(right) && left.name === "__proto__") {
      // An object property with this name would set the prototype.
      // Keep references to the outer binding outside the class's scope.
      if (context.scope.getBinding(left.name)) {
        context.scope.rename(left.name);
      } else {
        const outer = context.scope.generateUidIdentifier("outer");
        context.hoisted.push(outer);
        context.scope.path.traverse({
          ClassExpression(path) {
            if (path.node !== right) return;
            path.traverse({
              "TypeAnnotation|TSTypeAnnotation|TypeParameterDeclaration|TSTypeParameterDeclaration"(
                path,
              ) {
                path.skip();
              },
              "ReferencedIdentifier|BindingIdentifier"(path) {
                if (
                  path.node.name === "__proto__" &&
                  !path.scope.getBinding("__proto__")
                ) {
                  path.replaceWith(
                    t.memberExpression(
                      t.cloneNode(outer),
                      t.identifier("value"),
                    ),
                  );
                }
              },
            });
            path.stop();
          },
        });
        const setterBody = t.blockStatement([
          t.expressionStatement(
            t.assignmentExpression(
              "=",
              t.identifier("__proto__"),
              t.identifier("value"),
            ),
          ),
        ]);
        setterBody.directives = [t.directive(t.directiveLiteral("use strict"))];
        defaultValue = t.sequenceExpression([
          t.assignmentExpression(
            "=",
            t.cloneNode(outer),
            t.objectExpression([
              t.objectMethod(
                "get",
                t.identifier("value"),
                [],
                t.blockStatement([
                  t.returnStatement(t.identifier("__proto__")),
                ]),
              ),
              t.objectMethod(
                "set",
                t.identifier("value"),
                [t.identifier("value")],
                setterBody,
              ),
            ]),
          ),
          right,
        ]);
      }
      right.id = t.identifier("__proto__");
    } else {
      defaultValue = t.isClassExpression(right)
        ? // Property definitions infer the name before static initialization.
          t.memberExpression(
            t.objectExpression([t.objectProperty(t.cloneNode(left), right)]),
            t.cloneNode(left),
          )
        : t.callExpression(context.addHelper("setFunctionName"), [
            right,
            t.stringLiteral(left.name),
          ]);
    }
  }

  return defaultValue;
}
