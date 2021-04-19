import syntaxPlugin from "@babel/plugin-syntax-private-property-in-object";
import { injectInitialization as injectConstructorInit } from "@babel/helper-create-class-features-plugin";

export default function pluginPrivateIn({ types: t, template }) {
  const classWeakSets = new WeakMap();
  const fieldsWeakSets = new WeakMap();

  function unshadow(name, targetScope, scope) {
    while (scope !== targetScope) {
      if (scope.hasOwnBinding(name)) scope.rename(name);
      scope = scope.parent;
    }
  }

  function injectToFieldInit(fieldPath, expr, before = false) {
    if (fieldPath.node.value) {
      if (before) {
        fieldPath.get("value").insertBefore(expr);
      } else {
        fieldPath.get("value").insertAfter(expr);
      }
    } else {
      fieldPath.set("value", t.unaryExpression("void", expr));
    }
  }

  function injectInitialization(classPath, init) {
    let firstFieldPath;
    let consturctorPath;

    for (const el of classPath.get("body.body")) {
      if (
        (el.isClassProperty() || el.isClassPrivateProperty()) &&
        !el.node.static
      ) {
        firstFieldPath = el;
        break;
      }
      if (!consturctorPath && el.isClassMethod({ kind: "constructor" })) {
        consturctorPath = el;
      }
    }

    if (firstFieldPath) {
      injectToFieldInit(firstFieldPath, init, true);
    } else {
      injectConstructorInit(classPath, consturctorPath, [
        t.expressionStatement(init),
      ]);
    }
  }

  function getWeakSetId(weakSets, outerClass, reference, name = "", inject) {
    let id = classWeakSets.get(reference.node);

    if (!id) {
      id = outerClass.scope.generateUidIdentifier(`${name || ""} brandCheck`);
      classWeakSets.set(reference.node, id);

      inject(reference, template.expression.ast`${t.cloneNode(id)}.add(this)`);

      outerClass.insertBefore(template.ast`var ${id} = new WeakSet()`);
    }

    return t.cloneNode(id);
  }

  return {
    name: "proposal-private-property-in-object",
    inherits: syntaxPlugin,
    visitor: {
      BinaryExpression(path) {
        const { node } = path;
        if (node.operator !== "in") return;
        if (!t.isPrivateName(node.left)) return;

        const { name } = node.left.id;

        let privateElement;
        const outerClass = path.findParent(path => {
          if (!path.isClass()) return false;

          privateElement = path
            .get("body.body")
            .find(({ node }) => t.isPrivate(node) && node.key.id.name === name);

          return !!privateElement;
        });

        if (outerClass.parentPath.scope.path.isPattern()) {
          outerClass.replaceWith(template.ast`(() => ${outerClass.node})()`);
          // The injected class will be queued and eventually transformed when visited
          return;
        }

        if (privateElement.isMethod()) {
          if (privateElement.node.static) {
            if (outerClass.node.id) {
              unshadow(outerClass.node.id.name, outerClass.scope, path.scope);
            } else {
              outerClass.set("id", path.scope.generateUidIdentifier("class"));
            }
            path.replaceWith(
              template.expression.ast`
                ${t.cloneNode(outerClass.node.id)} === ${path.node.right}
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
              template.expression.ast`${id}.has(${path.node.right})`,
            );
          }
        } else {
          // Private fields might not all be initialized: see the 'halfConstructed'
          // example at https://v8.dev/features/private-brand-checks.

          const id = getWeakSetId(
            fieldsWeakSets,
            outerClass,
            privateElement,
            privateElement.node.key.id.name,
            injectToFieldInit,
          );

          path.replaceWith(
            template.expression.ast`${id}.has(${path.node.right})`,
          );
        }
      },
    },
  };
}
