import { declare } from "@babel/helper-plugin-utils";
import {
  isModule,
  rewriteModuleStatementsAndPrepareHeader,
  type RewriteModuleStatementsAndPrepareHeaderOptions,
  isSideEffectImport,
  buildNamespaceInitStatements,
  ensureStatementsHoisted,
  wrapInterop,
  getModuleName,
} from "@babel/helper-module-transforms";
import simplifyAccess from "@babel/helper-simple-access";
import { template, types as t } from "@babel/core";
import type { PluginOptions } from "@babel/helper-module-transforms";
import type { Visitor, Scope, NodePath } from "@babel/traverse";

import { transformDynamicImport } from "./dynamic-import";

export interface Options extends PluginOptions {
  allowCommonJSExports?: boolean;
  allowTopLevelThis?: boolean;
  importInterop?: RewriteModuleStatementsAndPrepareHeaderOptions["importInterop"];
  lazy?: RewriteModuleStatementsAndPrepareHeaderOptions["lazy"];
  loose?: boolean;
  mjsStrictNamespace?: boolean;
  noInterop?: boolean;
  strict?: boolean;
  strictMode?: boolean;
  strictNamespace?: boolean;
}

export default declare((api, options: Options) => {
  api.assertVersion(7);

  const {
    // 'true' for imports to strictly have .default, instead of having
    // destructuring-like behavior for their properties. This matches the behavior
    // of the initial Node.js (v12) behavior when importing a CommonJS without
    // the __esMoule property.
    // .strictNamespace is for non-mjs files, mjsStrictNamespace if for mjs files.
    strictNamespace = false,
    mjsStrictNamespace = strictNamespace,

    allowTopLevelThis,
    strict,
    strictMode,
    noInterop,
    importInterop,
    lazy = false,
    // Defaulting to 'true' for now. May change before 7.x major.
    allowCommonJSExports = true,
    loose = false,
  } = options;

  const constantReexports = api.assumption("constantReexports") ?? loose;
  const enumerableModuleMeta = api.assumption("enumerableModuleMeta") ?? loose;
  const noIncompleteNsImportDetection =
    api.assumption("noIncompleteNsImportDetection") ?? false;

  if (
    typeof lazy !== "boolean" &&
    typeof lazy !== "function" &&
    (!Array.isArray(lazy) || !lazy.every(item => typeof item === "string"))
  ) {
    throw new Error(`.lazy must be a boolean, array of strings, or a function`);
  }

  if (typeof strictNamespace !== "boolean") {
    throw new Error(`.strictNamespace must be a boolean, or undefined`);
  }
  if (typeof mjsStrictNamespace !== "boolean") {
    throw new Error(`.mjsStrictNamespace must be a boolean, or undefined`);
  }

  const getAssertion = (localName: string) => template.expression.ast`
    (function(){
      throw new Error(
        "The CommonJS '" + "${localName}" + "' variable is not available in ES6 modules." +
        "Consider setting setting sourceType:script or sourceType:unambiguous in your " +
        "Babel config for this file.");
    })()
  `;

  const moduleExportsVisitor: Visitor<{ scope: Scope }> = {
    ReferencedIdentifier(path) {
      const localName = path.node.name;
      if (localName !== "module" && localName !== "exports") return;

      const localBinding = path.scope.getBinding(localName);
      const rootBinding = this.scope.getBinding(localName);

      if (
        // redeclared in this scope
        rootBinding !== localBinding ||
        (path.parentPath.isObjectProperty({ value: path.node }) &&
          path.parentPath.parentPath.isObjectPattern()) ||
        path.parentPath.isAssignmentExpression({ left: path.node }) ||
        path.isAssignmentExpression({ left: path.node })
      ) {
        return;
      }

      path.replaceWith(getAssertion(localName));
    },

    UpdateExpression(path) {
      const arg = path.get("argument");
      if (!arg.isIdentifier()) return;
      const localName = arg.node.name;
      if (localName !== "module" && localName !== "exports") return;

      const localBinding = path.scope.getBinding(localName);
      const rootBinding = this.scope.getBinding(localName);

      // redeclared in this scope
      if (rootBinding !== localBinding) return;

      path.replaceWith(
        t.assignmentExpression(
          path.node.operator[0] + "=",
          arg.node,
          getAssertion(localName),
        ),
      );
    },

    AssignmentExpression(path) {
      const left = path.get("left");
      if (left.isIdentifier()) {
        const localName = left.node.name;
        if (localName !== "module" && localName !== "exports") return;

        const localBinding = path.scope.getBinding(localName);
        const rootBinding = this.scope.getBinding(localName);

        // redeclared in this scope
        if (rootBinding !== localBinding) return;

        const right = path.get("right");
        right.replaceWith(
          t.sequenceExpression([right.node, getAssertion(localName)]),
        );
      } else if (left.isPattern()) {
        const ids = left.getOuterBindingIdentifiers();
        const localName = Object.keys(ids).filter(localName => {
          if (localName !== "module" && localName !== "exports") return false;

          return (
            this.scope.getBinding(localName) ===
            path.scope.getBinding(localName)
          );
        })[0];

        if (localName) {
          const right = path.get("right");
          right.replaceWith(
            t.sequenceExpression([right.node, getAssertion(localName)]),
          );
        }
      }
    },
  };

  return {
    name: "transform-modules-commonjs",

    pre() {
      this.file.set("@babel/plugin-transform-modules-*", "commonjs");
    },

    visitor: {
      CallExpression(path) {
        if (!this.file.has("@babel/plugin-proposal-dynamic-import")) return;
        if (!t.isImport(path.node.callee)) return;

        let { scope } = path;
        do {
          scope.rename("require");
        } while ((scope = scope.parent));

        transformDynamicImport(path, noInterop, this.file);
      },

      Program: {
        exit(path, state) {
          if (!isModule(path)) return;

          // Rename the bindings auto-injected into the scope so there is no
          // risk of conflict between the bindings.
          path.scope.rename("exports");
          path.scope.rename("module");
          path.scope.rename("require");
          path.scope.rename("__filename");
          path.scope.rename("__dirname");

          // Rewrite references to 'module' and 'exports' to throw exceptions.
          // These objects are specific to CommonJS and are not available in
          // real ES6 implementations.
          if (!allowCommonJSExports) {
            if (process.env.BABEL_8_BREAKING) {
              simplifyAccess(path, new Set(["module", "exports"]));
            } else {
              // @ts-ignore(Babel 7 vs Babel 8) The third param has been removed in Babel 8.
              simplifyAccess(path, new Set(["module", "exports"]), false);
            }
            path.traverse(moduleExportsVisitor, {
              scope: path.scope,
            });
          }

          let moduleName = getModuleName(this.file.opts, options);
          // @ts-expect-error todo(flow->ts): do not reuse variables
          if (moduleName) moduleName = t.stringLiteral(moduleName);

          const { meta, headers } = rewriteModuleStatementsAndPrepareHeader(
            path,
            {
              exportName: "exports",
              constantReexports,
              enumerableModuleMeta,
              strict,
              strictMode,
              allowTopLevelThis,
              noInterop,
              importInterop,
              lazy,
              esNamespaceOnly:
                typeof state.filename === "string" &&
                /\.mjs$/.test(state.filename)
                  ? mjsStrictNamespace
                  : strictNamespace,
              noIncompleteNsImportDetection,
              filename: this.file.opts.filename,
            },
          );

          function addPrivateHelper(
            path: NodePath<t.Program>,
            name: string,
            buildFn: () => t.FunctionExpression,
          ) {
            const { scope } = path;
            const key = PACKAGE_JSON.name + "." + name;
            let id = path.getData(key);
            if (id) {
              return t.cloneNode(id);
            }
            if (name.startsWith("_")) {
              let uid;
              let i = 1;
              do {
                uid = scope._generateUid(name, i);
                i++;
              } while (
                scope.hasLabel(uid) ||
                scope.hasBinding(uid) ||
                scope.hasGlobal(uid) ||
                scope.hasReference(uid)
              );

              scope.references[uid] = true;
              scope.uids[uid] = true;

              id = t.identifier(uid);
            } else {
              id = scope.generateUidIdentifier(name);
            }
            path.setData(key, id);

            const fn = buildFn();
            const [fnPath] = path.unshiftContainer(
              "body",
              t.functionDeclaration(id, fn.params, fn.body),
            );
            path.scope.registerBinding("hoisted", fnPath);

            return t.cloneNode(id);
          }

          const interopTypes = new Map<number, t.CallExpression>();
          const exportStarFnBody = t.blockStatement([]);
          let reexports: t.CallExpression;

          let interopTypeId: t.Identifier;
          let lastInteropType: number;
          let lastRequired: t.Identifier;
          const props = new Map<string, t.ObjectProperty>();

          for (const [source, metadata] of meta.source) {
            const loadExpr = t.callExpression(t.identifier("require"), [
              t.stringLiteral(source),
            ]);

            let header: t.Statement;
            if (isSideEffectImport(metadata)) {
              if (metadata.lazy) throw new Error("Assertion failure");

              header = t.expressionStatement(loadExpr);
            } else {
              // A lazy import that is never referenced can be safely
              // omitted, since it wouldn't be executed anyway.
              if (metadata.lazy && !metadata.referenced) {
                continue;
              }

              const init =
                wrapInterop(path, loadExpr, metadata.interop) || loadExpr;

              if (metadata.lazy) {
                header = template.statement.ast`
                  function ${metadata.name}() {
                    const data = ${init};
                    ${metadata.name} = function(){ return data; };
                    return data;
                  }
                `;
              } else {
                header = template.statement.ast`
                  var ${metadata.name} = ${init};
                `;
              }
            }
            header.loc = metadata.loc;

            if (metadata.reexportAll && t.isVariableDeclaration(header)) {
              const interopType = (
                {
                  none: 0,
                  "node-default": 0,
                  namespace: 1,
                  "node-namespace": 2,
                  default: 3,
                } as const
              )[metadata.interop];

              const needInitVar =
                metadata.imports.size || metadata.reexports.size;

              if (needInitVar && !lastRequired) {
                lastRequired = path.scope.generateUidIdentifier("lastRequired");
                path.scope.push({
                  id: lastRequired,
                  kind: "var",
                });
              }

              if (lastInteropType == null && interopType !== 0) {
                interopTypeId = path.scope.generateUidIdentifier("interop");
                path.scope.push({
                  id: interopTypeId,
                  kind: "var",
                });
              }

              if (lastInteropType !== interopType && interopTypeId) {
                lastInteropType = interopType;
                headers.push(
                  t.expressionStatement(
                    t.assignmentExpression(
                      "=",
                      t.cloneNode(interopTypeId),
                      t.numericLiteral(interopType),
                    ),
                  ),
                );
              }

              headers.push(
                ...buildNamespaceInitStatements(
                  meta,
                  metadata,
                  constantReexports,
                  reexportsCall => {
                    reexports ??= reexportsCall;

                    if (interopType && !interopTypes.has(interopType)) {
                      interopTypes.set(
                        interopType,
                        wrapInterop(
                          path,
                          t.identifier("mod"),
                          metadata.interop,
                        ),
                      );
                    }

                    const exportStarHelper = addPrivateHelper(
                      path,
                      "_exportStar",
                      () =>
                        t.functionExpression(
                          null,
                          [t.identifier("mod")],
                          exportStarFnBody,
                        ),
                    );

                    const interopRequire = t.callExpression(exportStarHelper, [
                      loadExpr,
                    ]);
                    interopRequire.loc = metadata.loc;

                    return interopRequire;
                  },
                ),
              );

              if (needInitVar) {
                headers.push(template.statement.ast`
                  var ${metadata.name} = ${t.cloneNode(lastRequired)};
                `);
              }
            } else {
              headers.push(header);
              headers.push(
                ...buildNamespaceInitStatements(
                  meta,
                  metadata,
                  constantReexports,
                ),
              );
            }

            if (!constantReexports) {
              metadata.reexports.forEach((importName, exportName) => {
                props.set(
                  exportName,
                  t.objectProperty(
                    meta.stringSpecifiers.has(exportName)
                      ? t.stringLiteral(exportName)
                      : t.identifier(exportName),
                    t.identifier("_"),
                  ),
                );
              });
            }
          }

          let cond: t.Identifier | t.ConditionalExpression =
            t.identifier("mod");
          interopTypes.forEach((call, type) => {
            if (!interopTypeId) return;
            cond = t.conditionalExpression(
              t.binaryExpression(
                "==",
                t.cloneNode(interopTypeId),
                t.numericLiteral(type),
              ),
              call,
              cond,
            );
          });

          if (reexports) {
            reexports.arguments[1] = lastRequired
              ? t.assignmentExpression("=", t.cloneNode(lastRequired), cond)
              : cond;

            exportStarFnBody.body.push(t.returnStatement(reexports));
          }

          if (props.size) {
            const object = t.objectExpression(Array.from(props.values()));
            // @ts-expect-error Undocumented property
            object._compact = true;
            headers.unshift(template.statement.ast`
              0 && (module.exports = ${object});
            `);
          }

          ensureStatementsHoisted(headers);

          (
            path.unshiftContainer("body", headers) as NodePath<t.Statement>[]
          ).forEach(path => {
            if (path.isVariableDeclaration()) {
              path.scope.registerDeclaration(path);
            }
          });
        },
      },
    },
  };
});
