/* eslint max-len: 0 */

import { basename, extname } from "path";
import template from "babel-template";
import * as t from "babel-types";

let buildRequire = template(`
  require($0);
`);

let buildExportsModuleDeclaration = template(`
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
`);

let buildExportsFrom = template(`
  Object.defineProperty(exports, $0, {
    enumerable: true,
    get: function () {
      return $1;
    }
  });
`);

let buildLooseExportsModuleDeclaration = template(`
  exports.__esModule = true;
`);

let buildExportsAssignment = template(`
  exports.$0 = $1;
`);

let buildExportAll = template(`
  Object.keys(OBJECT).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    if (EXPORT_NAMES.indexOf(key) !== -1) return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return OBJECT[key];
      }
    });
  });
`);

let buildExportNames = template(`
  var $0 = $1;
`);

const THIS_BREAK_KEYS = ["FunctionExpression", "FunctionDeclaration", "ClassProperty", "ClassMethod", "ObjectMethod"];

export default function () {
  let REASSIGN_REMAP_SKIP = Symbol();

  let reassignmentVisitor = {
    ReferencedIdentifier(path) {
      let name = path.node.name;
      let remap = this.remaps[name];
      if (!remap) return;

      // redeclared in this scope
      if (this.scope.getBinding(name) !== path.scope.getBinding(name)) return;

      if (path.parentPath.isCallExpression({ callee: path.node })) {
        path.replaceWith(t.sequenceExpression([t.numericLiteral(0), remap]));
      } else {
        path.replaceWith(remap);
      }
      this.requeueInParent(path);
    },

    AssignmentExpression(path) {
      let node = path.node;
      if (node[REASSIGN_REMAP_SKIP]) return;

      let left = path.get("left");
      if (!left.isIdentifier()) return;

      let name = left.node.name;
      let exports = this.exports[name];
      if (!exports) return;

      // redeclared in this scope
      if (this.scope.getBinding(name) !== path.scope.getBinding(name)) return;

      node[REASSIGN_REMAP_SKIP] = true;

      for (let reid of exports) {
        node = buildExportsAssignment(reid, node).expression;
      }

      path.replaceWith(node);
      this.requeueInParent(path);
    },

    UpdateExpression(path) {
      let arg = path.get("argument");
      if (!arg.isIdentifier()) return;

      let name = arg.node.name;
      let exports = this.exports[name];
      if (!exports) return;

      // redeclared in this scope
      if (this.scope.getBinding(name) !== path.scope.getBinding(name)) return;

      let node = t.assignmentExpression(path.node.operator[0] + "=", arg.node, t.numericLiteral(1));

      if ((path.parentPath.isExpressionStatement() && !path.isCompletionRecord()) || path.node.prefix) {
        path.replaceWith(node);
        this.requeueInParent(path);
        return;
      }

      let nodes = [];
      nodes.push(node);

      let operator;
      if (path.node.operator === "--") {
        operator = "+";
      } else { // "++"
        operator = "-";
      }
      nodes.push(t.binaryExpression(operator, arg.node, t.numericLiteral(1)));

      path.replaceWithMultiple(t.sequenceExpression(nodes));
    }
  };

  return {
    inherits: require("babel-plugin-transform-strict-mode"),

    visitor: {
      ThisExpression(path, state) {
        // If other plugins run after this plugin's Program#exit handler, we allow them to
        // insert top-level `this` values. This allows the AMD and UMD plugins to
        // function properly.
        if (this.ranCommonJS) return;

        if (
          state.opts.allowTopLevelThis !== true &&
          !path.findParent((path) => !path.is("shadow") &&
          THIS_BREAK_KEYS.indexOf(path.type) >= 0)
        ) {
          path.replaceWith(t.identifier("undefined"));
        }
      },

      Program: {
        enter(path) {
          this.exportNamesIdentifier = path.scope.generateUidIdentifier("exportNames");
        },
        exit(path) {
          this.ranCommonJS = true;

          let strict = !!this.opts.strict;

          let { scope } = path;

          // rename these commonjs variables if they're declared in the file
          scope.rename("module");
          scope.rename("exports");
          scope.rename("require");

          let hasExports = false;
          let hasImports = false;

          let needsExportNames = false;

          let body: Array<Object> = path.get("body");
          let imports = Object.create(null);
          let exports = Object.create(null);

          let allExportNames = Object.create(null);
          let nonHoistedExportNames = Object.create(null);

          let topNodes = [];
          let remaps = Object.create(null);

          let requires = Object.create(null);

          function addRequire(source, blockHoist) {
            let cached = requires[source];
            if (cached) return cached;

            let ref = path.scope.generateUidIdentifier(basename(source, extname(source)));

            let varDecl = t.variableDeclaration("var", [
              t.variableDeclarator(ref, buildRequire(
                t.stringLiteral(source)
              ).expression)
            ]);

            // Copy location from the original import statement for sourcemap
            // generation.
            if (imports[source]) {
              varDecl.loc = imports[source].loc;
            }

            if (typeof blockHoist === "number" && blockHoist > 0) {
              varDecl._blockHoist = blockHoist;
            }

            topNodes.push(varDecl);

            return requires[source] = ref;
          }

          function addTo(obj, key, arr) {
            let existing = obj[key] || [];
            obj[key] = existing.concat(arr);
          }

          for (let path of body) {
            if (path.isExportDeclaration()) {
              hasExports = true;

              let specifiers = [].concat(path.get("declaration"), path.get("specifiers"));
              for (let specifier of specifiers) {
                let ids = specifier.getBindingIdentifiers();
                if (ids.__esModule) {
                  throw specifier.buildCodeFrameError("Illegal export \"__esModule\"");
                }
              }
            }

            if (path.isImportDeclaration()) {
              hasImports = true;

              let key = path.node.source.value;
              let importsEntry = imports[key] || {
                specifiers: [],
                maxBlockHoist: 0,
                loc: path.node.loc,
              };

              importsEntry.specifiers.push(...path.node.specifiers);

              if (typeof path.node._blockHoist === "number") {
                importsEntry.maxBlockHoist = Math.max(
                  path.node._blockHoist,
                  importsEntry.maxBlockHoist
                );
              }

              imports[key] = importsEntry;

              path.remove();
            } else if (path.isExportDefaultDeclaration()) {
              let declaration = path.get("declaration");
              if (declaration.isFunctionDeclaration()) {
                let id = declaration.node.id;
                let defNode = t.identifier("default");
                if (id) {
                  addTo(exports, id.name, defNode);
                  topNodes.push(buildExportsAssignment(defNode, id));
                  path.replaceWith(declaration.node);
                } else {
                  topNodes.push(buildExportsAssignment(defNode, t.toExpression(declaration.node)));
                  path.remove();
                }
              } else if (declaration.isClassDeclaration()) {
                let id = declaration.node.id;
                let defNode = t.identifier("default");
                if (id) {
                  addTo(exports, id.name, defNode);
                  path.replaceWithMultiple([
                    declaration.node,
                    buildExportsAssignment(defNode, id)
                  ]);
                } else {
                  path.replaceWith(buildExportsAssignment(defNode, t.toExpression(declaration.node)));

                  // Manualy re-queue `export default class {}` expressions so that the ES3 transform
                  // has an opportunity to convert them. Ideally this would happen automatically from the
                  // replaceWith above. See #4140 for more info.
                  path.parentPath.requeue(path.get("expression.left"));
                }
              } else {
                path.replaceWith(buildExportsAssignment(t.identifier("default"), declaration.node));

                // Manualy re-queue `export default foo;` expressions so that the ES3 transform
                // has an opportunity to convert them. Ideally this would happen automatically from the
                // replaceWith above. See #4140 for more info.
                path.parentPath.requeue(path.get("expression.left"));
              }
            } else if (path.isExportNamedDeclaration()) {
              let declaration = path.get("declaration");
              if (declaration.node) {
                if (declaration.isFunctionDeclaration()) {
                  let id = declaration.node.id;
                  addTo(exports, id.name, id);
                  topNodes.push(buildExportsAssignment(id, id));
                  path.replaceWith(declaration.node);
                  allExportNames[id.name] = true;
                } else if (declaration.isClassDeclaration()) {
                  let id = declaration.node.id;
                  addTo(exports, id.name, id);
                  path.replaceWithMultiple([
                    declaration.node,
                    buildExportsAssignment(id, id)
                  ]);
                  nonHoistedExportNames[id.name] = true;
                  allExportNames[id.name] = true;
                } else if (declaration.isVariableDeclaration()) {
                  let declarators = declaration.get("declarations");
                  for (let decl of declarators) {
                    let id = decl.get("id");

                    let init = decl.get("init");
                    if (!init.node) init.replaceWith(t.identifier("undefined"));

                    if (id.isIdentifier()) {
                      addTo(exports, id.node.name, id.node);
                      init.replaceWith(buildExportsAssignment(id.node, init.node).expression);
                      nonHoistedExportNames[id.node.name] = true;
                      allExportNames[id.node.name] = true;
                    } else {
                      // todo
                    }
                  }
                  path.replaceWith(declaration.node);
                }
                continue;
              }

              let specifiers = path.get("specifiers");
              let nodes = [];
              let source = path.node.source;
              if (source) {
                let ref = addRequire(source.value, path.node._blockHoist);

                for (let specifier of specifiers) {
                  if (specifier.isExportNamespaceSpecifier()) {
                    // todo
                  } else if (specifier.isExportDefaultSpecifier()) {
                    // todo
                  } else if (specifier.isExportSpecifier()) {
                    if (specifier.node.local.name === "default") {
                      topNodes.push(buildExportsFrom(t.stringLiteral(specifier.node.exported.name), t.memberExpression(t.callExpression(this.addHelper("interopRequireDefault"), [ref]), specifier.node.local)));
                    } else {
                      topNodes.push(buildExportsFrom(t.stringLiteral(specifier.node.exported.name), t.memberExpression(ref, specifier.node.local)));
                    }
                    if (specifier.node.exported.name !== "default") {
                      allExportNames[specifier.node.exported.name] = true;
                    }
                    nonHoistedExportNames[specifier.node.exported.name] = true;
                  }
                }
              } else {
                for (let specifier of specifiers) {
                  if (specifier.isExportSpecifier()) {
                    addTo(exports, specifier.node.local.name, specifier.node.exported);
                    nodes.push(buildExportsAssignment(specifier.node.exported, specifier.node.local));
                    if (specifier.node.exported.name !== "default") {
                      allExportNames[specifier.node.exported.name] = true;
                    }
                    nonHoistedExportNames[specifier.node.exported.name] = true;
                  }
                }
              }
              path.replaceWithMultiple(nodes);
            } else if (path.isExportAllDeclaration()) {
              let exportNode = buildExportAll({
                OBJECT: addRequire(path.node.source.value, path.node._blockHoist),
                EXPORT_NAMES: this.exportNamesIdentifier
              });
              needsExportNames = true;
              exportNode.loc = path.node.loc;
              topNodes.push(exportNode);
              path.remove();
            }
          }

          for (let source in imports) {
            let {specifiers, maxBlockHoist} = imports[source];
            if (specifiers.length) {
              let uid = addRequire(source, maxBlockHoist);

              let wildcard;

              for (let i = 0; i < specifiers.length; i++) {
                let specifier = specifiers[i];
                if (t.isImportNamespaceSpecifier(specifier)) {
                  if (strict) {
                    remaps[specifier.local.name] = uid;
                  } else {
                    const varDecl = t.variableDeclaration("var", [
                      t.variableDeclarator(
                        specifier.local,
                        t.callExpression(
                          this.addHelper("interopRequireWildcard"),
                          [uid]
                        )
                      )
                    ]);

                    if (maxBlockHoist > 0) {
                      varDecl._blockHoist = maxBlockHoist;
                    }

                    topNodes.push(varDecl);
                  }
                  wildcard = specifier.local;
                } else if (t.isImportDefaultSpecifier(specifier)) {
                  specifiers[i] = t.importSpecifier(specifier.local, t.identifier("default"));
                }
              }

              for (let specifier of specifiers) {
                if (t.isImportSpecifier(specifier)) {
                  let target = uid;
                  if (specifier.imported.name === "default") {
                    if (wildcard) {
                      target = wildcard;
                    } else {
                      target = wildcard = path.scope.generateUidIdentifier(uid.name);
                      const varDecl = t.variableDeclaration("var", [
                        t.variableDeclarator(
                          target,
                          t.callExpression(
                            this.addHelper("interopRequireDefault"),
                            [uid]
                          )
                        )
                      ]);

                      if (maxBlockHoist > 0) {
                        varDecl._blockHoist = maxBlockHoist;
                      }

                      topNodes.push(varDecl);
                    }
                  }
                  remaps[specifier.local.name] = t.memberExpression(target, t.cloneWithoutLoc(specifier.imported));
                }
              }
            } else {
              // bare import
              let requireNode = buildRequire(t.stringLiteral(source));
              requireNode.loc = imports[source].loc;
              topNodes.push(requireNode);
            }
          }

          if (hasImports && Object.keys(nonHoistedExportNames).length) {
            let hoistedExportsNode = t.identifier("undefined");

            for (let name in nonHoistedExportNames) {
              hoistedExportsNode = buildExportsAssignment(t.identifier(name), hoistedExportsNode).expression;
            }

            const node = t.expressionStatement(hoistedExportsNode);
            node._blockHoist = 3;

            topNodes.unshift(node);
          }

          if (needsExportNames) {
            topNodes.unshift(buildExportNames(this.exportNamesIdentifier, t.valueToNode(Object.keys(allExportNames))));
          }

          // add __esModule declaration if this file has any exports
          if (hasExports && !strict) {
            let buildTemplate = buildExportsModuleDeclaration;
            if (this.opts.loose) buildTemplate = buildLooseExportsModuleDeclaration;

            const declar = buildTemplate();
            declar._blockHoist = 3;

            topNodes.unshift(declar);
          }

          path.unshiftContainer("body", topNodes);
          path.traverse(reassignmentVisitor, {
            remaps,
            scope,
            exports,
            requeueInParent: (newPath) => path.requeue(newPath),
          });
        }
      }
    }
  };
}
