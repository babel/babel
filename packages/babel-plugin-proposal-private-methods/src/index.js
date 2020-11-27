/* eslint-disable @babel/development/plugin-name */

import { declare } from "@babel/helper-plugin-utils";
import {
  createClassFeaturePlugin,
  enableFeatureIfCompilingFields,
  FEATURES,
} from "@babel/helper-create-class-features-plugin";
import ReplaceSupers, {
  environmentVisitor,
} from "@babel/helper-replace-supers";
import { isRequired } from "@babel/helper-compilation-targets";

export default declare((api, options) => {
  api.assertVersion(7);

  if (isRequired("proposal-class-properties", api.targets())) {
    return createClassFeaturePlugin({
      name: "proposal-private-methods",

      feature: FEATURES.privateMethods,
      loose: options.loose,

      manipulateOptions(opts, parserOpts) {
        parserOpts.plugins.push("classPrivateMethods");
      },
    });
  }

  const { types: t, template, traverse } = api;

  function readOnlyError(member, file) {
    return t.callExpression(file.addHelper("readOnlyError"), [
      t.stringLiteral(`#${member.property.id.name}`),
    ]);
  }

  function isKnownPrivate(node, readonlyNames) {
    return (
      (t.isMemberExpression(node) || t.isOptionalMemberExpression(node)) &&
      t.isPrivateName(node.property) &&
      readonlyNames.has(node.property.id.name)
    );
  }

  function toMemoizedFunction(node, scope, hint) {
    if (node.static) return t.toExpression(node);

    const tmpId = scope.generateUidIdentifier(hint);
    scope.push({ id: tmpId });

    return template.expression.ast`
        ${t.cloneNode(tmpId)} || (
          ${t.cloneNode(tmpId)} = ${t.toExpression(node)}
        )
      `;
  }

  const hasSideEffects = path =>
    !(path.isThisExpression() || path.isSuper() || path.isPure());

  const privateUsageVisitor = {
    AssignmentExpression(path, { readonly, file }) {
      const { left, right } = path.node;
      if (isKnownPrivate(left, readonly)) {
        const seq = [];

        if (hasSideEffects(path.get("left.object"))) seq.push(left.object);
        if (hasSideEffects(path.get("right"))) seq.push(right);
        seq.push(readOnlyError(left, file));

        path.replaceWith(t.sequenceExpression(seq));
      }
    },
    UpdateExpression(path, { readonly, file }) {
      const { argument } = path.node;
      if (isKnownPrivate(argument, readonly)) {
        const seq = [];

        if (hasSideEffects(path.get("argument.object"))) {
          seq.push(argument.object);
        }
        seq.push(readOnlyError(argument, file));

        path.replaceWith(t.sequenceExpression(seq));
      }
    },
    "MemberExpression|OptionalMemberExpression": {
      exit(path, { accessors }) {
        if (isKnownPrivate(path.node, accessors)) {
          path.replaceWith(
            path.type === "MemberExpression"
              ? t.memberExpression(path.node, t.identifier("_"))
              : t.optionalMemberExpression(
                  path.node,
                  t.identifier("_"),
                  false,
                  false,
                ),
          );
          path.skip();
        }
      },
    },

    // Don't transform usage of shadowed private names
    ClassBody(path, outerState) {
      const innerState = {
        ...outerState,
        readonly: new Set(outerState.readonly),
        accessors: new Set(outerState.accessors),
        rootClassBody: path.node,
      };

      for (const elt of path.get("body")) {
        if (elt.isPrivate()) {
          const { name } = elt.node.key.id;
          innerState.readonly.delete(name);
          innerState.accessors.delete(name);
        }
      }

      path.traverse(privateUsageOuterEnvironmentVisitor, outerState);
      path.traverse(privateUsageInnerEnvironmentVisitor, innerState);

      path.skip();
    },
  };

  const privateUsageInnerEnvironmentVisitor = traverse.visitors.merge([
    {
      "Method|ClassProperty"(path, state) {
        if (path.parentPath.node === state.rootClassBody) path.skipKey("key");
      },
    },
    privateUsageVisitor,
  ]);

  const privateUsageOuterEnvironmentVisitor = traverse.visitors.merge([
    environmentVisitor,
    privateUsageVisitor,
  ]);

  const accessorThisUsageVisitor = traverse.visitors.merge([
    environmentVisitor,
    {
      ThisExpression(path) {
        path.replaceWith(template.expression.ast`this.t`);
        path.skip();
      },
    },
  ]);

  return {
    name: "proposal-private-methods",

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push("classPrivateMethods");
    },

    pre() {
      // If helper-create-class-features-plugin is enabled by
      // a different plugin and if it needs to compile private
      // methods, let it do it.
      enableFeatureIfCompilingFields(
        this.file,
        FEATURES.privateMethods,
        options.loose,
      );
    },

    visitor: {
      ClassBody(path, file) {
        const methods = new Map();
        const getters = new Map();
        const setters = new Map();
        const accessors = new Set();

        for (const element of path.get("body")) {
          if (element.isClassPrivateMethod()) {
            const { kind } = element.node;
            const { name } = element.node.key.id;

            if (kind === "method") {
              methods.set(name, element);
            } else if (kind === "get") {
              getters.set(name, element);
              accessors.add(name);
            } else if (kind === "set") {
              setters.set(name, element);
              accessors.add(name);
            }

            if (path.parent.superClass) {
              new ReplaceSupers({
                methodPath: element,
                isLoose: options.loose,
                superRef: path.parent.superClass,
                file,
                getObjectRef() {
                  let { id } = path.parent;
                  if (!id) {
                    id = path.scope.generateUidIdentifier();
                    path.parentPath.set("id", id);
                  }
                  id = t.cloneNode(id);

                  return element.node.static
                    ? id
                    : t.memberExpression(id, t.identifier("prototype"));
                },
              }).replace();
            }
          }
        }

        if (methods.size === 0 && accessors.size === 0) return;

        const readonly = new Set(methods.keys());
        for (const name of getters.keys()) {
          if (!setters.has(name)) readonly.add(name);
        }
        path.traverse(privateUsageInnerEnvironmentVisitor, {
          readonly,
          accessors,
          file,
          rootClassBody: path.node,
        });

        const newElements = [];

        for (const methodPath of methods.values()) {
          const { key, static: isStatic } = methodPath.node;

          newElements.push(
            t.classPrivateProperty(
              key,
              toMemoizedFunction(methodPath.node, path.scope, key.id.name),
              null,
              isStatic,
            ),
          );

          methodPath.remove();
        }

        for (const name of accessors) {
          const getter = getters.get(name);
          const setter = setters.get(name);

          getter?.traverse(accessorThisUsageVisitor);
          setter?.traverse(accessorThisUsageVisitor);

          const isStatic = (getter ?? setter).node.static;

          const descriptor = t.objectExpression([]);

          if (getter) {
            descriptor.properties.push(
              t.objectMethod(
                "get",
                t.identifier("_"),
                getter.node.params,
                getter.node.body,
              ),
            );
            getter.remove();
          }
          if (setter) {
            descriptor.properties.push(
              t.objectMethod(
                "set",
                t.identifier("_"),
                setter.node.params,
                setter.node.body,
              ),
            );
            setter.remove();
          }

          let initializer;

          if (isStatic) {
            descriptor.properties.push(
              t.objectProperty(t.identifier("t"), t.thisExpression()),
            );
            initializer = descriptor;
          } else {
            const tmpId = path.scope.generateUidIdentifier(name);
            path.scope.push({ id: tmpId });

            initializer = template.expression.ast`
              {
                __proto__: ${t.cloneNode(tmpId)} || (
                  ${t.cloneNode(tmpId)} = ${descriptor}
                ),
                t: this
              }
            `;
          }

          newElements.push(
            t.classPrivateProperty(
              t.privateName(t.identifier(name)),
              initializer,
              null,
              isStatic,
            ),
          );
        }

        path.unshiftContainer("body", newElements);
      },
    },
  };
});
