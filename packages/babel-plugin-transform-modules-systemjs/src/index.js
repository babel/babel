import { declare } from "@babel/helper-plugin-utils";
import hoistVariables from "@babel/helper-hoist-variables";
import { template, types as t } from "@babel/core";

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

const TYPE_IMPORT = "Import";

export default declare((api, options) => {
  api.assertVersion(7);

  const { systemGlobal = "System" } = options;
  const IGNORE_REASSIGNMENT_SYMBOL = Symbol();

  const reassignmentVisitor = {
    "AssignmentExpression|UpdateExpression"(path) {
      if (path.node[IGNORE_REASSIGNMENT_SYMBOL]) return;
      path.node[IGNORE_REASSIGNMENT_SYMBOL] = true;

      const arg = path.get(path.isAssignmentExpression() ? "left" : "argument");
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
    visitor: {
      CallExpression(path, state) {
        if (path.node.callee.type === TYPE_IMPORT) {
          path.replaceWith(
            t.callExpression(
              t.memberExpression(
                t.identifier(state.contextIdent),
                t.identifier("import"),
              ),
              path.node.arguments,
            ),
          );
        }
      },

      ReferencedIdentifier(path, state) {
        if (
          path.node.name == "__moduleName" &&
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
        },
        exit(path, state) {
          const exportIdent = path.scope.generateUid("export");
          const contextIdent = state.contextIdent;

          const exportNames = Object.create(null);
          const modules = [];

          let beforeBody = [];
          const setters = [];
          const sources = [];
          const variableIds = [];
          const removedPaths = [];

          function addExportName(key, val) {
            exportNames[key] = exportNames[key] || [];
            exportNames[key].push(val);
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

          const body: Array<Object> = path.get("body");

          let canHoist = true;
          for (let path of body) {
            if (path.isExportDeclaration()) path = path.get("declaration");
            if (path.isVariableDeclaration() && path.node.kind !== "var") {
              canHoist = false;
              break;
            }
          }

          for (const path of body) {
            if (canHoist && path.isFunctionDeclaration()) {
              beforeBody.push(path.node);
              removedPaths.push(path);
            } else if (path.isImportDeclaration()) {
              const source = path.node.source.value;
              pushModule(source, "imports", path.node.specifiers);
              for (const name in path.getBindingIdentifiers()) {
                path.scope.removeBinding(name);
                variableIds.push(t.identifier(name));
              }
              path.remove();
            } else if (path.isExportAllDeclaration()) {
              pushModule(path.node.source.value, "exports", path.node);
              path.remove();
            } else if (path.isExportDefaultDeclaration()) {
              const declar = path.get("declaration");
              if (
                declar.isClassDeclaration() ||
                declar.isFunctionDeclaration()
              ) {
                const id = declar.node.id;
                const nodes = [];

                if (id) {
                  nodes.push(declar.node);
                  nodes.push(buildExportCall("default", t.cloneNode(id)));
                  addExportName(id.name, "default");
                } else {
                  nodes.push(
                    buildExportCall("default", t.toExpression(declar.node)),
                  );
                }

                if (!canHoist || declar.isClassDeclaration()) {
                  path.replaceWithMultiple(nodes);
                } else {
                  beforeBody = beforeBody.concat(nodes);
                  removedPaths.push(path);
                }
              } else {
                path.replaceWith(buildExportCall("default", declar.node));
              }
            } else if (path.isExportNamedDeclaration()) {
              const declar = path.get("declaration");

              if (declar.node) {
                path.replaceWith(declar);

                const nodes = [];
                let bindingIdentifiers;
                if (path.isFunction()) {
                  const node = declar.node;
                  const name = node.id.name;
                  if (canHoist) {
                    addExportName(name, name);
                    beforeBody.push(node);
                    beforeBody.push(
                      buildExportCall(name, t.cloneNode(node.id)),
                    );
                    removedPaths.push(path);
                  } else {
                    bindingIdentifiers = { [name]: node.id };
                  }
                } else {
                  bindingIdentifiers = declar.getBindingIdentifiers();
                }
                for (const name in bindingIdentifiers) {
                  addExportName(name, name);
                  nodes.push(buildExportCall(name, t.identifier(name)));
                }
                path.insertAfter(nodes);
              } else {
                const specifiers = path.node.specifiers;
                if (specifiers && specifiers.length) {
                  if (path.node.source) {
                    pushModule(path.node.source.value, "exports", specifiers);
                    path.remove();
                  } else {
                    const nodes = [];

                    for (const specifier of specifiers) {
                      nodes.push(
                        buildExportCall(
                          specifier.exported.name,
                          specifier.local,
                        ),
                      );
                      addExportName(
                        specifier.local.name,
                        specifier.exported.name,
                      );
                    }

                    path.replaceWithMultiple(nodes);
                  }
                }
              }
            }
          }

          modules.forEach(function(specifiers) {
            const setterBody = [];
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
              const exportObj = path.scope.generateUid("exportObj");

              setterBody.push(
                t.variableDeclaration("var", [
                  t.variableDeclarator(
                    t.identifier(exportObj),
                    t.objectExpression([]),
                  ),
                ]),
              );

              for (const node of specifiers.exports) {
                if (t.isExportAllDeclaration(node)) {
                  setterBody.push(
                    buildExportAll({
                      KEY: path.scope.generateUidIdentifier("key"),
                      EXPORT_OBJ: t.identifier(exportObj),
                      TARGET: t.identifier(target),
                    }),
                  );
                } else if (t.isExportSpecifier(node)) {
                  setterBody.push(
                    t.expressionStatement(
                      t.assignmentExpression(
                        "=",
                        t.memberExpression(
                          t.identifier(exportObj),
                          node.exported,
                        ),
                        t.memberExpression(t.identifier(target), node.local),
                      ),
                    ),
                  );
                } else {
                  // todo
                }
              }

              setterBody.push(
                t.expressionStatement(
                  t.callExpression(t.identifier(exportIdent), [
                    t.identifier(exportObj),
                  ]),
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

          let moduleName = this.getModuleName();
          if (moduleName) moduleName = t.stringLiteral(moduleName);

          if (canHoist) {
            hoistVariables(path, id => variableIds.push(id));
          }

          if (variableIds.length) {
            beforeBody.unshift(
              t.variableDeclaration(
                "var",
                variableIds.map(id => t.variableDeclarator(id)),
              ),
            );
          }

          path.traverse(reassignmentVisitor, {
            exports: exportNames,
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
