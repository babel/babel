import { declare } from "@babel/helper-plugin-utils";
import syntaxPlugin from "@babel/plugin-syntax-private-property-in-object";
import {
  enableFeature,
  FEATURES,
  injectInitialization as injectConstructorInit,
  buildCheckInRHS,
} from "@babel/helper-create-class-features-plugin";
import annotateAsPure from "@babel/helper-annotate-as-pure";
import type * as t from "@babel/types";
import type { NodePath, Scope } from "@babel/traverse";

export interface Options {
  loose?: boolean;
}
export default declare((api, opt: Options) => {
  api.assertVersion(7);
  const { types: t, template } = api;
  const { loose } = opt;

  // NOTE: When using the class fields or private methods plugins,
  // they will also take care of '#priv in obj' checks when visiting
  // the ClassExpression or ClassDeclaration nodes.
  // The visitor of this plugin is only effective when not compiling
  // private fields and methods.

  const classWeakSets: WeakMap<t.Class, t.Identifier> = new WeakMap();
  const fieldsWeakSets: WeakMap<
    t.ClassPrivateProperty | t.ClassPrivateMethod,
    t.Identifier
  > = new WeakMap();

  function unshadow(name: string, targetScope: Scope, scope: Scope) {
    while (scope !== targetScope) {
      if (scope.hasOwnBinding(name)) scope.rename(name);
      scope = scope.parent;
    }
  }

  function injectToFieldInit(
    fieldPath: NodePath<t.ClassPrivateProperty | t.ClassProperty>,
    expr: t.Expression,
    before = false,
  ) {
    if (fieldPath.node.value) {
      const value = fieldPath.get("value");
      if (before) {
        value.insertBefore(expr);
      } else {
        value.insertAfter(expr);
      }
    } else {
      fieldPath.set("value", t.unaryExpression("void", expr));
    }
  }

  function injectInitialization(
    classPath: NodePath<t.Class>,
    init: t.Expression,
  ) {
    let firstFieldPath;
    let constructorPath;

    for (const el of classPath.get("body.body")) {
      if (
        (el.isClassProperty() || el.isClassPrivateProperty()) &&
        !el.node.static
      ) {
        firstFieldPath = el;
        break;
      }
      if (!constructorPath && el.isClassMethod({ kind: "constructor" })) {
        constructorPath = el;
      }
    }

    if (firstFieldPath) {
      injectToFieldInit(firstFieldPath, init, true);
    } else {
      injectConstructorInit(classPath, constructorPath, [
        t.expressionStatement(init),
      ]);
    }
  }

  function getWeakSetId<Ref extends t.Node>(
    weakSets: WeakMap<Ref, t.Identifier>,
    outerClass: NodePath<t.Class>,
    reference: NodePath<Ref>,
    name = "",
    inject: (
      reference: NodePath<Ref>,
      expression: t.Expression,
      before?: boolean,
    ) => void,
  ) {
    let id = weakSets.get(reference.node);

    if (!id) {
      id = outerClass.scope.generateUidIdentifier(`${name || ""} brandCheck`);
      weakSets.set(reference.node, id);

      inject(reference, template.expression.ast`${t.cloneNode(id)}.add(this)`);

      const newExpr = t.newExpression(t.identifier("WeakSet"), []);
      annotateAsPure(newExpr);

      outerClass.insertBefore(template.ast`var ${id} = ${newExpr}`);
    }

    return t.cloneNode(id);
  }

  return {
    name: "transform-private-property-in-object",
    inherits: syntaxPlugin.default,
    pre() {
      // Enable this in @babel/helper-create-class-features-plugin, so that it
      // can be handled by the private fields and methods transform.
      enableFeature(this.file, FEATURES.privateIn, loose);
    },
    visitor: {
      BinaryExpression(path, state) {
        const { node } = path;
        const { file } = state;
        if (node.operator !== "in") return;
        if (!t.isPrivateName(node.left)) return;

        const { name } = node.left.id;

        let privateElement: NodePath<
          t.ClassPrivateMethod | t.ClassPrivateProperty
        >;
        const outerClass = path.findParent(path => {
          if (!path.isClass()) return false;

          privateElement = path.get("body.body").find(
            ({ node }) =>
              // fixme: Support class accessor property
              t.isPrivate(node) && node.key.id.name === name,
          ) as NodePath<t.ClassPrivateMethod | t.ClassPrivateProperty>;

          return !!privateElement;
        }) as NodePath<t.Class>;

        if (outerClass.parentPath.scope.path.isPattern()) {
          outerClass.replaceWith(
            template.ast`(() => ${outerClass.node})()` as t.Statement,
          );
          // The injected class will be queued and eventually transformed when visited
          return;
        }

        if (privateElement.node.type === "ClassPrivateMethod") {
          if (privateElement.node.static) {
            if (outerClass.node.id) {
              unshadow(outerClass.node.id.name, outerClass.scope, path.scope);
            } else {
              outerClass.set("id", path.scope.generateUidIdentifier("class"));
            }
            path.replaceWith(
              template.expression.ast`
                ${t.cloneNode(outerClass.node.id)} === ${buildCheckInRHS(
                  node.right,
                  file,
                )}
              `,
            );
          } else {
            const id = getWeakSetId(
              classWeakSets,
              outerClass,
              outerClass,
              outerClass.node.id?.name,
              injectInitialization,
            );

            path.replaceWith(
              template.expression.ast`${id}.has(${buildCheckInRHS(
                node.right,
                file,
              )})`,
            );
          }
        } else {
          // Private fields might not all be initialized: see the 'halfConstructed'
          // example at https://v8.dev/features/private-brand-checks.

          const id = getWeakSetId<t.ClassPrivateProperty>(
            fieldsWeakSets,
            outerClass,
            privateElement as NodePath<t.ClassPrivateProperty>,
            privateElement.node.key.id.name,
            injectToFieldInit,
          );

          path.replaceWith(
            template.expression.ast`${id}.has(${buildCheckInRHS(
              node.right,
              file,
            )})`,
          );
        }
      },
    },
  };
});
