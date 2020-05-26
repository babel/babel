import { declare } from "@babel/helper-plugin-utils";
import hoistVariables from "@babel/helper-hoist-variables";
import { template, types as t } from "@babel/core";
import { getImportSource } from "babel-plugin-dynamic-import-node/utils";
import { rewriteThis, getModuleName } from "@babel/helper-module-transforms";

const buildTemplate = template(`
  SYSTEM_REGISTER(MODULE_NAME, SOURCES, function (EXPORT_IDENTIFIER, CONTEXT_IDENTIFIER) {
    "use strict";
    BEFORE_BODY;
    return {
      setters: SETTERS,
      execute: function () {
        BODY;
      }
    };
  });
`);

const buildExportAll = template(`
  for (var KEY in TARGET) {
    if (KEY !== "default" && KEY !== "__esModule") EXPORT_OBJ[KEY] = TARGET[KEY];
  }
`);

const MISSING_PLUGIN_WARNING = `\
WARNING: Dynamic import() transformation must be enabled using the
         @babel/plugin-proposal-dynamic-import plugin. Babel 8 will
         no longer transform import() without using that plugin.
`;

function constructExportCall(
  path,
  exportIdent,
  exportNames,
  exportValues,
  exportStarTarget,
) {
  const statements = [];
  if (exportNames.length === 1) {
    statements.push(
      t.expressionStatement(
        t.callExpression(exportIdent, [
          t.stringLiteral(exportNames[0]),
          exportValues[0],
        ]),
      ),
    );
  } else if (!exportStarTarget) {
    const objectProperties = [];
    for (let i = 0; i < exportNames.length; i++) {
      const exportName = exportNames[i];
      const exportValue = exportValues[i];
      objectProperties.push(
        t.objectProperty(t.identifier(exportName), exportValue),
      );
    }
    statements.push(
      t.expressionStatement(
        t.callExpression(exportIdent, [t.objectExpression(objectProperties)]),
      ),
    );
  } else {
    const exportObj = path.scope.generateUid("exportObj");

    statements.push(
      t.variableDeclaration("var", [
        t.variableDeclarator(t.identifier(exportObj), t.objectExpression([])),
      ]),
    );

    statements.push(
      buildExportAll({
        KEY: path.scope.generateUidIdentifier("key"),
        EXPORT_OBJ: t.identifier(exportObj),
        TARGET: exportStarTarget,
      }),
    );

    for (let i = 0; i < exportNames.length; i++) {
      const exportName = exportNames[i];
      const exportValue = exportValues[i];

      statements.push(
        t.expressionStatement(
          t.assignmentExpression(
            "=",
            t.memberExpression(
              t.identifier(exportObj),
              t.identifier(exportName),
            ),
            exportValue,
          ),
        ),
      );
    }

    statements.push(
      t.expressionStatement(
        t.callExpression(exportIdent, [t.identifier(exportObj)]),
      ),
    );
  }
  return statements;
}

export default declare((api, options) => {
  api.assertVersion(7);

  const { systemGlobal = "System", allowTopLevelThis = false } = options;
  const IGNORE_REASSIGNMENT_SYMBOL = Symbol();

  const reassignmentVisitor = {
    "AssignmentExpression|UpdateExpression"(path) {
      if (path.node[IGNORE_REASSIGNMENT_SYMBOL]) return;
      path.node[IGNORE_REASSIGNMENT_SYMBOL] = true;

      const arg = path.get(path.isAssignmentExpression() ? "left" : "argument");

      if (arg.isObjectPattern() || arg.isArrayPattern()) {
        const exprs = [path.node];
        for (const name of Object.keys(arg.getBindingIdentifiers())) {
          if (this.scope.getBinding(name) !== path.scope.getBinding(name)) {
            return;
          }
          const exportedNames = this.exports[name];
          if (!exportedNames) return;
          for (const exportedName of exportedNames) {
            exprs.push(
              this.buildCall(exportedName, t.identifier(name)).expression,
            );
          }
        }
        path.replaceWith(t.sequenceExpression(exprs));
        return;
      }

      if (!arg.isIdentifier()) return;

      const name = arg.node.name;

      // redeclared in this scope
      if (this.scope.getBinding(name) !== path.scope.getBinding(name)) return;

      const exportedNames = this.exports[name];
      if (!exportedNames) return;

      let node = path.node;

      // if it is a non-prefix update expression (x++ etc)
      // then we must replace with the expression (_export('x', x + 1), x++)
      // in order to ensure the same update expression value
      const isPostUpdateExpression = path.isUpdateExpression({ prefix: false });
      if (isPostUpdateExpression) {
        node = t.binaryExpression(
          node.operator[0],
          t.unaryExpression("+", t.cloneNode(node.argument)),
          t.numericLiteral(1),
        );
      }

      for (const exportedName of exportedNames) {
        node = this.buildCall(exportedName, node).expression;
      }

      if (isPostUpdateExpression) {
        node = t.sequenceExpression([node, path.node]);
      }

      path.replaceWith(node);
    },
  };

  return {
    name: "transform-modules-systemjs",

    pre() {
      this.file.set("@babel/plugin-transform-modules-*", "systemjs");
    },

    visitor: {
      CallExpression(path, state) {
        if (t.isImport(path.node.callee)) {
          if (!this.file.has("@babel/plugin-proposal-dynamic-import")) {
            console.warn(MISSING_PLUGIN_WARNING);
          }

          path.replaceWith(
            t.callExpression(
              t.memberExpression(
                t.identifier(state.contextIdent),
                t.identifier("import"),
              ),
              [getImportSource(t, path.node)],
            ),
          );
        }
      },

      MetaProperty(path, state) {
        if (
          path.node.meta.name === "import" &&
          path.node.property.name === "meta"
        ) {
          path.replaceWith(
            t.memberExpression(
              t.identifier(state.contextIdent),
              t.identifier("meta"),
            ),
          );
        }
      },

      ReferencedIdentifier(path, state) {
        if (
          path.node.name === "__moduleName" &&
          !path.scope.hasBinding("__moduleName")
        ) {
          path.replaceWith(
            t.memberExpression(
              t.identifier(state.contextIdent),
              t.identifier("id"),
            ),
          );
        }
      },

      Program: {
        enter(path, state) {
          state.contextIdent = path.scope.generateUid("context");
          if (!allowTopLevelThis) {
            rewriteThis(path);
          }
        },
        exit(path, state) {
          const undefinedIdent = path.scope.buildUndefinedNode();
          const exportIdent = path.scope.generateUid("export");
          const contextIdent = state.contextIdent;

          const exportMap = Object.create(null);
          const modules = [];

          let beforeBody = [];
          const setters = [];
          const sources = [];
          const variableIds = [];
          const removedPaths = [];

          function addExportName(key, val) {
            exportMap[key] = exportMap[key] || [];
            exportMap[key].push(val);
          }

          function pushModule(source, key, specifiers) {
            let module;
            modules.forEach(function(m) {
              if (m.key === source) {
                module = m;
              }
            });
            if (!module) {
              modules.push(
                (module = { key: source, imports: [], exports: [] }),
              );
            }
            module[key] = module[key].concat(specifiers);
          }

          function buildExportCall(name, val) {
            return t.expressionStatement(
              t.callExpression(t.identifier(exportIdent), [
                t.stringLiteral(name),
                val,
              ]),
            );
          }

          const exportNames = [];
          const exportValues = [];

          const body: Array<Object> = path.get("body");

          for (const path of body) {
            if (path.isFunctionDeclaration()) {
              beforeBody.push(path.node);
              removedPaths.push(path);
            } else if (path.isClassDeclaration()) {
              variableIds.push(path.node.id);
              path.replaceWith(
                t.expressionStatement(
                  t.assignmentExpression(
                    "=",
                    t.cloneNode(path.node.id),
                    t.toExpression(path.node),
                  ),
                ),
              );
            } else if (path.isImportDeclaration()) {
              const source = path.node.source.value;
              pushModule(source, "imports", path.node.specifiers);
              for (const name of Object.keys(path.getBindingIdentifiers())) {
                path.scope.removeBinding(name);
                variableIds.push(t.identifier(name));
              }
              path.remove();
            } else if (path.isExportAllDeclaration()) {
              pushModule(path.node.source.value, "exports", path.node);
              path.remove();
            } else if (path.isExportDefaultDeclaration()) {
              const declar = path.get("declaration");
              const id = declar.node.id;
              if (declar.isClassDeclaration()) {
                if (id) {
                  exportNames.push("default");
                  exportValues.push(undefinedIdent);
                  variableIds.push(id);
                  addExportName(id.name, "default");
                  path.replaceWith(
                    t.expressionStatement(
                      t.assignmentExpression(
                        "=",
                        t.cloneNode(id),
                        t.toExpression(declar.node),
                      ),
                    ),
                  );
                } else {
                  exportNames.push("default");
                  exportValues.push(t.toExpression(declar.node));
                  removedPaths.push(path);
                }
              } else if (declar.isFunctionDeclaration()) {
                if (id) {
                  beforeBody.push(declar.node);
                  exportNames.push("default");
                  exportValues.push(t.cloneNode(id));
                  addExportName(id.name, "default");
                } else {
                  exportNames.push("default");
                  exportValues.push(t.toExpression(declar.node));
                }
                removedPaths.push(path);
              } else {
                path.replaceWith(buildExportCall("default", declar.node));
              }
            } else if (path.isExportNamedDeclaration()) {
              const declar = path.get("declaration");

              if (declar.node) {
                path.replaceWith(declar);

                if (path.isFunction()) {
                  const node = declar.node;
                  const name = node.id.name;
                  addExportName(name, name);
                  beforeBody.push(node);
                  exportNames.push(name);
                  exportValues.push(t.cloneNode(node.id));
                  removedPaths.push(path);
                } else if (path.isClass()) {
                  const name = declar.node.id.name;
                  exportNames.push(name);
                  exportValues.push(undefinedIdent);
                  variableIds.push(declar.node.id);
                  path.replaceWith(
                    t.expressionStatement(
                      t.assignmentExpression(
                        "=",
                        t.cloneNode(declar.node.id),
                        t.toExpression(declar.node),
                      ),
                    ),
                  );
                  addExportName(name, name);
                } else {
                  for (const name of Object.keys(
                    declar.getBindingIdentifiers(),
                  )) {
                    addExportName(name, name);
                  }
                }
              } else {
                const specifiers = path.node.specifiers;
                if (specifiers?.length) {
                  if (path.node.source) {
                    pushModule(path.node.source.value, "exports", specifiers);
                    path.remove();
                  } else {
                    const nodes = [];

                    for (const specifier of specifiers) {
                      const binding = path.scope.getBinding(
                        specifier.local.name,
                      );
                      // hoisted function export
                      if (
                        binding &&
                        t.isFunctionDeclaration(binding.path.node)
                      ) {
                        exportNames.push(specifier.exported.name);
                        exportValues.push(t.cloneNode(specifier.local));
                      }
                      // only globals also exported this way
                      else if (!binding) {
                        nodes.push(
                          buildExportCall(
                            specifier.exported.name,
                            specifier.local,
                          ),
                        );
                      }
                      addExportName(
                        specifier.local.name,
                        specifier.exported.name,
                      );
                    }

                    path.replaceWithMultiple(nodes);
                  }
                } else {
                  path.remove();
                }
              }
            }
          }

          modules.forEach(function(specifiers) {
            let setterBody = [];
            const target = path.scope.generateUid(specifiers.key);

            for (let specifier of specifiers.imports) {
              if (t.isImportNamespaceSpecifier(specifier)) {
                setterBody.push(
                  t.expressionStatement(
                    t.assignmentExpression(
                      "=",
                      specifier.local,
                      t.identifier(target),
                    ),
                  ),
                );
              } else if (t.isImportDefaultSpecifier(specifier)) {
                specifier = t.importSpecifier(
                  specifier.local,
                  t.identifier("default"),
                );
              }

              if (t.isImportSpecifier(specifier)) {
                setterBody.push(
                  t.expressionStatement(
                    t.assignmentExpression(
                      "=",
                      specifier.local,
                      t.memberExpression(
                        t.identifier(target),
                        specifier.imported,
                      ),
                    ),
                  ),
                );
              }
            }

            if (specifiers.exports.length) {
              const exportNames = [];
              const exportValues = [];
              let hasExportStar = false;

              for (const node of specifiers.exports) {
                if (t.isExportAllDeclaration(node)) {
                  hasExportStar = true;
                } else if (t.isExportSpecifier(node)) {
                  exportNames.push(node.exported.name);
                  exportValues.push(
                    t.memberExpression(t.identifier(target), node.local),
                  );
                } else {
                  // todo
                }
              }

              setterBody = setterBody.concat(
                constructExportCall(
                  path,
                  t.identifier(exportIdent),
                  exportNames,
                  exportValues,
                  hasExportStar ? t.identifier(target) : null,
                ),
              );
            }

            sources.push(t.stringLiteral(specifiers.key));
            setters.push(
              t.functionExpression(
                null,
                [t.identifier(target)],
                t.blockStatement(setterBody),
              ),
            );
          });

          let moduleName = getModuleName(this.file.opts, options);
          if (moduleName) moduleName = t.stringLiteral(moduleName);

          hoistVariables(
            path,
            (id, name, hasInit) => {
              variableIds.push(id);
              if (!hasInit) {
                exportNames.push(name);
                exportValues.push(undefinedIdent);
              }
            },
            null,
          );

          if (variableIds.length) {
            beforeBody.unshift(
              t.variableDeclaration(
                "var",
                variableIds.map(id => t.variableDeclarator(id)),
              ),
            );
          }

          if (exportNames.length) {
            beforeBody = beforeBody.concat(
              constructExportCall(
                path,
                t.identifier(exportIdent),
                exportNames,
                exportValues,
                null,
              ),
            );
          }

          path.traverse(reassignmentVisitor, {
            exports: exportMap,
            buildCall: buildExportCall,
            scope: path.scope,
          });

          for (const path of removedPaths) {
            path.remove();
          }

          path.node.body = [
            buildTemplate({
              SYSTEM_REGISTER: t.memberExpression(
                t.identifier(systemGlobal),
                t.identifier("register"),
              ),
              BEFORE_BODY: beforeBody,
              MODULE_NAME: moduleName,
              SETTERS: t.arrayExpression(setters),
              SOURCES: t.arrayExpression(sources),
              BODY: path.node.body,
              EXPORT_IDENTIFIER: t.identifier(exportIdent),
              CONTEXT_IDENTIFIER: t.identifier(contextIdent),
            }),
          ];
        },
      },
    },
  };
});
