import { declare } from "@babel/helper-plugin-utils";
import type { types as t, NodePath, Scope } from "@babel/core";

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION("^8.1.0"));
  const t: typeof api.types = api.types;
  const { template } = api;

  function getName(name: t.Identifier | t.StringLiteral) {
    return name.type === "Identifier" ? name.name : name.value;
  }

  // Whether `options`, an object literal, might have an `exports` property.
  // The name of a property key, or null if it's not statically known.
  function getStaticKeyName(property: t.ObjectProperty | t.ObjectMethod) {
    const { key } = property;
    if (
      key.type === "StringLiteral" ||
      key.type === "NumericLiteral" ||
      key.type === "BigIntLiteral"
    ) {
      return String(key.value);
    }
    if (key.type === "Identifier" && !property.computed) return key.name;
    return null;
  }

  // Whether `options`, an object literal, might have an `exports` property.
  function mayHaveExports(options: t.ObjectExpression) {
    return options.properties.some(property => {
      if (property.type === "SpreadElement") return true;
      const name = getStaticKeyName(property);
      return name === null || name === "exports";
    });
  }

  // If `options` is an object literal whose only `exports` property is an
  // array of string literals, returns that property and the names.
  function getStaticExports(options: t.ObjectExpression) {
    let property: t.ObjectProperty | undefined;
    for (const prop of options.properties) {
      if (prop.type === "SpreadElement") return null;
      const name = getStaticKeyName(prop);
      if (name === null) return null;
      if (name !== "exports") continue;
      if (property || prop.type !== "ObjectProperty") return null;
      property = prop;
    }
    if (!property || !t.isArrayExpression(property.value)) return null;

    const names: string[] = [];
    for (const element of property.value.elements) {
      if (!t.isStringLiteral(element)) return null;
      names.push(element.value);
    }
    return { property, names };
  }

  function containsAwaitOrYield(path: NodePath) {
    if (path.isAwaitExpression() || path.isYieldExpression()) return true;
    let found = false;
    path.traverse({
      "AwaitExpression|YieldExpression"(path) {
        found = true;
        path.stop();
      },
      Function(path) {
        path.skip();
      },
    });
    return found;
  }

  const processedDynamicImports = new WeakSet<t.Node>();

  return {
    name: "proposal-filtered-namespaces",

    manipulateOptions: (_, parser) =>
      parser.plugins.push("namespaceImportFilter"),

    visitor: {
      // Run in program so that it runs before any modules transform
      Program(path) {
        const declarations: t.VariableDeclarator[] = [];
        const bindings: ReturnType<Scope["getBinding"]>[] = [];

        for (let i = 0; i < path.node.body.length; i++) {
          const node = path.node.body[i];
          if (
            t.isExportNamedDeclaration(node) &&
            node.source &&
            node.exportKind !== "type"
          ) {
            // Convert
            //   export { x, y } as ns from "..."
            // to
            //   import { x, y } as _ns from "..."
            //   export { _ns as ns };

            // With the `export default from` proposal, we could have
            // `export foo, { x } as ns from "..."`.
            const specifier = node.specifiers.at(-1);
            if (
              specifier?.type !== "ExportNamespaceSpecifier" ||
              !specifier.exportsFilter
            ) {
              continue;
            }

            if (node.phase === "defer") {
              throw path.buildCodeFrameError(
                "Transforming `export defer { x, y } as ns from '...'` is not supported yet.",
              );
            }

            const local = path.scope.generateUidIdentifier(
              getName(specifier.exported),
            );
            const newExportDecl = t.exportNamedDeclaration(null, [
              t.exportSpecifier(local, specifier.exported),
            ]);
            if (node.specifiers.length === 1) {
              path.node.body[i] = newExportDecl;
            } else {
              node.specifiers.pop();
              path.node.body.push(newExportDecl);
            }

            const importNamespace = t.importNamespaceSpecifier(
              t.cloneNode(local),
            );
            importNamespace.exportsFilter = specifier.exportsFilter;
            path.node.body.push(
              t.importDeclaration(
                [importNamespace],
                t.cloneNode(node.source),
                node.attributes?.map(attribute => t.cloneNode(attribute)),
              ),
            );

            continue; // The injected import will be visited later.
          }

          if (
            !t.isImportDeclaration(node) ||
            node.importKind === "type" ||
            node.importKind === "typeof"
          ) {
            continue;
          }

          // Convert
          //   import { x, y } as _ns from "..."
          // to
          //   import { x as _x, y as _y } from "..."
          //   _ns = Object.freeze({ ... getters ... });
          //
          // The` _ns = ...` declaration is actually injected after the loop.

          // It could be preceeded by a default import
          const specifier = node.specifiers.at(-1);
          if (
            specifier?.type !== "ImportNamespaceSpecifier" ||
            !specifier.exportsFilter
          ) {
            continue;
          }
          if (node.phase === "defer") {
            throw path.buildCodeFrameError(
              "Transforming `import defer { x, y } as ns from '...'` is not supported yet.",
            );
          }

          const names = specifier.exportsFilter
            .map(name => {
              const rawName = getName(name);
              return {
                name,
                rawName,
                local: path.scope.generateUidIdentifier(rawName),
              };
            })
            // Sort like in module namespace objects.
            .sort((a, b) => {
              const nameA = a.rawName;
              const nameB = b.rawName;
              return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
            });

          node.specifiers.splice(
            -1,
            1,
            ...names.map(({ name, local }) =>
              t.importSpecifier(local, t.cloneNode(name)),
            ),
          );

          const object = t.objectExpression([
            t.objectProperty(t.identifier("__proto__"), t.nullLiteral()),
            ...names.map(({ name, local }) =>
              t.objectMethod(
                "get",
                t.cloneNode(name),
                [],
                t.blockStatement([t.returnStatement(t.cloneNode(local))]),
              ),
            ),
          ]);
          declarations.push(
            t.variableDeclarator(
              specifier.local,
              template.expression.ast`
                Object.freeze(
                  Object.defineProperty(${object}, Symbol.toStringTag, {
                    value: "Module",
                  })
                )
              `,
            ),
          );

          // Keep scope in sync. The namespace binding is updated after the
          // loop (it doesn't exist yet for imports injected for re-exports).
          bindings.push(path.scope.getBinding(specifier.local.name));
          path.scope.registerDeclaration(path.get("body")[i]);
        }

        if (declarations.length === 0) return;

        const [declPath] = path.unshiftContainer(
          "body",
          t.variableDeclaration("const", declarations),
        );
        // Update the existing bindings in place, to preserve their references.
        declPath.get("declarations").forEach((declarator, i) => {
          const binding = bindings[i];
          if (binding) {
            binding.kind = "const";
            binding.path = declarator;
          }
        });
        // This registers the bindings that didn't exist yet, and skips the
        // ones that we just updated since they have the same identifier.
        path.scope.registerDeclaration(declPath);
      },
      ImportExpression(path, state) {
        // Convert
        //    import(specifier, options)
        // to
        //     _filterModuleNamespace(_extractExports =>
        //       import(specifier, _extractExports(options))
        //     )
        //
        // or, when `options.exports` is statically known:
        //    import(specifier, { exports: ["b", "a"] })
        // to
        //    import(specifier, { exports: _exports = ["a", "b"] })
        //       .then(_createModuleNsFilter(_exports))

        const { node, scope } = path;
        let { source, options } = node;
        if (
          !options ||
          // import.defer() and import.source()
          node.phase != null ||
          processedDynamicImports.has(node)
        ) {
          return;
        }

        if (t.isObjectExpression(options)) {
          if (!mayHaveExports(options)) return;

          const staticExports = getStaticExports(options);
          if (staticExports) {
            const names = staticExports.names.sort();
            const exportsId = scope.generateDeclaredUidIdentifier("exports");
            staticExports.property.value = t.assignmentExpression(
              "=",
              exportsId,
              t.arrayExpression(names.map(name => t.stringLiteral(name))),
            );
            processedDynamicImports.add(node);
            path.replaceWith(
              t.callExpression(t.memberExpression(node, t.identifier("then")), [
                t.callExpression(state.addHelper("createModuleNsFilter"), [
                  t.cloneNode(exportsId),
                ]),
              ]),
            );
            return;
          }
        }

        const assignments: t.Expression[] = [];
        if (
          // Very annoying. If there is a yield/await we cannot move
          // them inside the arrow function.
          containsAwaitOrYield(path.get("source")) ||
          containsAwaitOrYield(path.get("options") as NodePath<t.Expression>)
        ) {
          const sourceId = scope.generateDeclaredUidIdentifier("specifier");
          const optionsId = scope.generateDeclaredUidIdentifier("options");
          assignments.push(
            t.assignmentExpression("=", sourceId, source),
            t.assignmentExpression("=", optionsId, options),
          );
          source = t.cloneNode(sourceId);
          options = t.cloneNode(optionsId);
        }

        const extractExports = scope.generateUidIdentifier("extractExports");
        const importExpression = t.importExpression(
          source,
          t.callExpression(t.cloneNode(extractExports), [options]),
        );
        processedDynamicImports.add(importExpression);

        const filtered = t.callExpression(
          state.addHelper("filterModuleNamespace"),
          [t.arrowFunctionExpression([extractExports], importExpression)],
        );
        path.replaceWith(
          assignments.length
            ? t.sequenceExpression([...assignments, filtered])
            : filtered,
        );
      },
    },
  };
});
