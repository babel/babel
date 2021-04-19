import syntaxPlugin from "@babel/plugin-syntax-private-property-in-object";
import { injectInitialization as injectConstructorInit } from "@babel/helper-create-class-features-plugin";

export default function pluginPrivateIn({ types: t, template }) {
  const ids = new WeakMap();

  function unshadow(name, targetScope, scope) {
    while (scope !== targetScope) {
      if (scope.hasOwnBinding(name)) scope.rename(name);
      scope = scope.parent;
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
      if (firstFieldPath.node.value) {
        firstFieldPath.set(
          "value",
          t.sequenceExpression([init, firstFieldPath.node.value]),
        );
      } else {
        firstFieldPath.set("value", t.unaryExpression("void", init));
      }
    } else {
      injectConstructorInit(classPath, consturctorPath, [
        t.expressionStatement(init),
      ]);
    }
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

        let isStatic;
        const outerClass = path.findParent(path => {
          if (!path.isClass()) return false;

          const privateElement = path.node.body.body.find(
            node => t.isPrivate(node) && node.key.id.name === name,
          );
          if (!privateElement) return false;

          isStatic = privateElement.static;
          return true;
        });

        if (outerClass.parentPath.scope.path.isPattern()) {
          outerClass.replaceWith(template.ast`(() => ${outerClass.node})()`);
          // The injected class will be queued and eventually transformed when visited
          return;
        }

        if (isStatic) {
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
          return;
        }

        let id = ids.get(outerClass.node);
        if (!id) {
          id = outerClass.scope.generateUidIdentifier(
            `${outerClass.node.id?.name || ""} brandCheck`,
          );
          ids.set(outerClass.node, id);

          injectInitialization(
            outerClass,
            template.expression.ast`${t.cloneNode(id)}.add(this)`,
          );

          outerClass.insertBefore(template.ast`var ${id} = new WeakSet()`);
        }

        path.replaceWith(
          template.expression.ast`${t.cloneNode(id)}.has(${path.node.right})`,
        );
      },
    },
  };
}
