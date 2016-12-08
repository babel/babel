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
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return OBJECT[key];
      }
    });
  });
`);

const specBuildNamespace = template(`
  $0 = $1 = Object.create(null, { __esModule: { value: true } });
  if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
    Object.defineProperty($0, Symbol.toStringTag, { value: "Module" });
  }
`);

const specBuildFunctionNameWrapper = template(`
  ({ default: $0 }).default
`);

// The descriptors are as specified in https://tc39.github.io/ecma262/#sec-module-namespace-exotic-objects-getownproperty-p
const specBuildExportDefault = template(`
  Object.defineProperty(EXPORTS, "default", { enumerable: true, writable: true, value: VALUE });
`);

// Unfortunately, regular objects can't synthesize a value descriptor every time they're read,
// so a getter needs to be used for live bindings.
const specBuildExport = template(`
  Object.defineProperty(EXPORTS, NAME, { enumerable: true, get() { return VALUE; } });
`);

const specBuildNamespaceReexport = template(`
  Object.defineProperty(EXPORTS, NAME, { enumerable: true, writable: true, value: VALUE });
`);

const specBuildNamespaceSpread = template(`
  Object.keys(OBJECT).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(EXPORTS, key, {
      enumerable: true,
      get() {
        return OBJECT[key];
      }
    });
  });
`);

const specBuildTempExportDescriptor = template(`
  const $0 = { enumerable: true, writable: true, value: undefined };
`);

const specBuildTempExportProperty = (id, descriptorId) => t.objectProperty(id, descriptorId);

const specBuildTempExport = template(`
  Object.defineProperties($0, $1);
`);

const specFinishNamespaceExport = template(`
  Object.freeze($0);
`);

const THIS_BREAK_KEYS = ["FunctionExpression", "FunctionDeclaration", "ClassProperty", "ClassMethod", "ObjectMethod"];

export default function () {
  let REASSIGN_REMAP_SKIP = Symbol();

  const moduleExports = t.memberExpression(t.identifier("module"), t.identifier("exports"));
  moduleExports[REASSIGN_REMAP_SKIP] = true;
  const exportsObj = t.identifier("exports");
  exportsObj[REASSIGN_REMAP_SKIP] = true;

  const isModuleExports = t.buildMatchMemberExpression("module.exports", true);

  let reassignmentVisitor = {
    ReferencedIdentifier(path, state) {
      const spec = isSpec(state);
      let name = path.node.name;
      let remap = this.remaps[name];
      if (!spec && !remap) return;

      // redeclared in this scope
      if (this.scope.getBinding(name) !== path.scope.getBinding(name)) return;

      if (spec) {
        if (name === "exports" && !path.node[REASSIGN_REMAP_SKIP]) {
          remap = this.remaps[".exports"] = this.remaps[".exports"] || path.scope.generateUidIdentifier("exports");
          path.replaceWith(remap);
          return;
        }
        if (isModuleExports(path.parent) && !path.parent[REASSIGN_REMAP_SKIP]) {
          remap = this.remaps[".module.exports"] = this.remaps[".module.exports"] || path.scope.generateUidIdentifier("module.exports");
          path.parentPath.replaceWith(remap);
          return;
        }

        if (!remap) return;
      }

      if (path.parentPath.isCallExpression({ callee: path.node })) {
        path.replaceWith(t.sequenceExpression([t.numericLiteral(0), remap]));
      } else if (path.isJSXIdentifier() && t.isMemberExpression(remap)) {
        const { object, property } = remap;
        path.replaceWith(t.JSXMemberExpression(t.JSXIdentifier(object.name), t.JSXIdentifier(property.name)));
      } else {
        path.replaceWith(remap);
      }
      this.requeueInParent(path);
    },

    AssignmentExpression(path, state) {
      if (isSpec(state)) {
        return;
      }

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

    UpdateExpression(path, state) {
      if (isSpec(state)) {
        return;
      }

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
        exit(path, state) {
          this.ranCommonJS = true;

          let strict = !!this.opts.strict;
          const spec = isSpec(state);

          let { scope } = path;

          // rename these commonjs variables if they're declared in the file
          scope.rename("module");
          scope.rename("exports");
          scope.rename("require");

          let hasExports = false;
          let hasImports = false;

          let body: Array<Object> = path.get("body");
          let imports = Object.create(null);
          let exports = Object.create(null);

          let nonHoistedExportNames = Object.create(null);

          let topNodes = [];
          let remaps = Object.create(null);
          const namespaceImports = new Set();

          let requires = Object.create(null);

          const addRequire = (source, spec, blockHoist) => {
            let cached = requires[source];
            if (cached) return cached;

            let ref = path.scope.generateUidIdentifier(basename(source, extname(source)));

            const req = buildRequire(
              t.stringLiteral(source)
            ).expression;

            let varDecl = t.variableDeclaration("var", [
              t.variableDeclarator(ref,
                spec
                ? t.callExpression(this.addHelper("specRequireInterop"), [req])
                : req
              )
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
          };

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

              if (spec) {
                path.node.specifiers
                .filter((s) => t.isImportNamespaceSpecifier(s))
                .map((specifier) => specifier.local.name)
                .forEach((name) => { namespaceImports.add(name); });
              }

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
                  topNodes.push(spec ? specBuildExportDefault({ EXPORTS: exportsObj, VALUE: id }) : buildExportsAssignment(defNode, id));
                  path.replaceWith(declaration.node);
                } else if (spec) {
                  const expr = specBuildFunctionNameWrapper(t.toExpression(declaration.node)).expression;
                  topNodes.push(specBuildExportDefault({ EXPORTS: exportsObj, VALUE: expr }));
                  path.remove();
                } else {
                  const expr = t.toExpression(declaration.node);
                  topNodes.push(buildExportsAssignment(defNode, expr));
                  path.remove();
                }
              } else if (declaration.isClassDeclaration()) {
                let id = declaration.node.id;
                let defNode = t.identifier("default");
                if (id) {
                  addTo(exports, id.name, defNode);
                  path.replaceWithMultiple([
                    declaration.node,
                    spec ? specBuildExportDefault({ EXPORTS: exportsObj, VALUE: id }) : buildExportsAssignment(defNode, id)
                  ]);
                } else if (spec) {
                  const expr = specBuildFunctionNameWrapper(t.toExpression(declaration.node)).expression;
                  path.replaceWith(specBuildExportDefault({ EXPORTS: exportsObj, VALUE: expr }));

                  // Manually re-queue the expression so other transforms can get to it.
                  // Ideally this would happen automatically from the replaceWith above.
                  // See #4140 for more info.
                  path.parentPath.requeue(path.get("expression.arguments.2"));
                } else {
                  const expr = t.toExpression(declaration.node);
                  path.replaceWith(buildExportsAssignment(defNode, expr));

                  // Manualy re-queue `export default class {}` expressions so that the ES3 transform
                  // has an opportunity to convert them. Ideally this would happen automatically from the
                  // replaceWith above. See #4140 for more info.
                  path.parentPath.requeue(path.get("expression.left"));
                }
              } else {
                const defNode = t.identifier("default");
                if (spec) {
                  path.replaceWith(specBuildExportDefault({ EXPORTS: exportsObj, VALUE: declaration.node }));

                  // Manually re-queue the expression so other transforms can get to it.
                  // Ideally this would happen automatically from the replaceWith above.
                  // See #4140 for more info.
                  path.parentPath.requeue(path.get("expression.arguments.2"));
                } else {
                  path.replaceWith(buildExportsAssignment(defNode, declaration.node));

                  // Manualy re-queue `export default foo;` expressions so that the ES3 transform
                  // has an opportunity to convert them. Ideally this would happen automatically from the
                  // replaceWith above. See #4140 for more info.
                  path.parentPath.requeue(path.get("expression.left"));
                }
              }
            } else if (path.isExportNamedDeclaration()) {
              let declaration = path.get("declaration");
              if (declaration.node) {
                if (declaration.isFunctionDeclaration()) {
                  let id = declaration.node.id;
                  addTo(exports, id.name, id);
                  topNodes.push(spec
                    ? specBuildExport({ EXPORTS: exportsObj, NAME: t.stringLiteral(id.name), VALUE: id })
                    : buildExportsAssignment(id, id));
                  path.replaceWith(declaration.node);
                } else if (declaration.isClassDeclaration()) {
                  let id = declaration.node.id;
                  addTo(exports, id.name, id);
                  path.replaceWithMultiple([
                    declaration.node,
                    spec
                    ? specBuildExport({ EXPORTS: exportsObj, NAME: t.stringLiteral(id.name), VALUE: id })
                    : buildExportsAssignment(id, id)
                  ]);
                  nonHoistedExportNames[id.name] = true;
                } else if (declaration.isVariableDeclaration()) {
                  let declarators = declaration.get("declarations");
                  const toExport = spec && new Set();
                  for (let decl of declarators) {
                    let id = decl.get("id");

                    let init = decl.get("init");
                    if (!init.node) init.replaceWith(t.identifier("undefined"));

                    if (spec) {
                      toExport.add(id.node);
                      nonHoistedExportNames[id.node.name] = true;
                      continue;
                    }

                    if (id.isIdentifier()) {
                      addTo(exports, id.node.name, id.node);
                      if (spec) {
                      } else {
                        init.replaceWith(buildExportsAssignment(id.node, init.node).expression);
                      }
                      nonHoistedExportNames[id.node.name] = true;
                    } else {
                      // todo
                    }
                  }
                  if (spec) {
                    path.replaceWithMultiple([
                      declaration.node
                    ].concat(
                      Array.from(toExport)
                      .map((id) => specBuildExport({ EXPORTS: exportsObj, NAME: t.stringLiteral(id.name), VALUE: id}))
                    )
                  );
                  } else {
                    path.replaceWith(declaration.node);
                  }
                }
                continue;
              }

              let specifiers = path.get("specifiers");
              let nodes = [];
              let source = path.node.source;
              if (source) {
                let ref = addRequire(source.value, spec, path.node._blockHoist);

                for (let specifier of specifiers) {
                  if (specifier.isExportNamespaceSpecifier()) {
                    // todo
                  } else if (specifier.isExportDefaultSpecifier()) {
                    // todo
                  } else if (specifier.isExportSpecifier()) {
                    if (spec) {
                      topNodes.push(specBuildExport({ EXPORTS: exportsObj, NAME: t.stringLiteral(specifier.node.exported.name), VALUE: t.memberExpression(ref, specifier.node.local) }));
                    } else if (specifier.node.local.name === "default") {
                      topNodes.push(buildExportsFrom(t.stringLiteral(specifier.node.exported.name), t.memberExpression(t.callExpression(this.addHelper("interopRequireDefault"), [ref]), specifier.node.local)));
                    } else {
                      topNodes.push(buildExportsFrom(t.stringLiteral(specifier.node.exported.name), t.memberExpression(ref, specifier.node.local)));
                    }
                    nonHoistedExportNames[specifier.node.exported.name] = true;
                  }
                }
              } else {
                for (let specifier of specifiers) {
                  if (specifier.isExportSpecifier()) {
                    addTo(exports, specifier.node.local.name, specifier.node.exported);
                    nonHoistedExportNames[specifier.node.exported.name] = true;

                    if (spec) {
                      if (namespaceImports.has(specifier.node.local.name)) {
                        // it's a namespace, doesn't go through a getter, safe to reexport as a value
                        nodes.push(specBuildNamespaceReexport({ EXPORTS: exportsObj, NAME: t.stringLiteral(specifier.node.exported.name), VALUE: specifier.node.local }));
                      } else {
                        nodes.push(specBuildExport({ EXPORTS: exportsObj, NAME: t.stringLiteral(specifier.node.exported.name), VALUE: specifier.node.local }));
                      }
                    } else {
                      nodes.push(buildExportsAssignment(specifier.node.exported, specifier.node.local));
                    }
                  }
                }
              }
              path.replaceWithMultiple(nodes);
            } else if (path.isExportAllDeclaration()) {
              let exportNode = spec
                ? specBuildNamespaceSpread({
                  EXPORTS: exportsObj,
                  OBJECT: addRequire(path.node.source.value, spec, path.node._blockHoist)
                })
                : buildExportAll({
                  OBJECT: addRequire(path.node.source.value, spec, path.node._blockHoist)
                });
              exportNode.loc = path.node.loc;
              topNodes.push(exportNode);
              path.remove();
            }
          }

          for (let source in imports) {
            let {specifiers, maxBlockHoist} = imports[source];
            if (specifiers.length) {
              const uid = addRequire(source, spec, maxBlockHoist);

              if (spec) {
                for (const specifier of specifiers) {
                  if (t.isImportNamespaceSpecifier(specifier)) {
                    remaps[specifier.local.name] = uid;
                  } else if (t.isImportDefaultSpecifier(specifier)) {
                    remaps[specifier.local.name] = t.memberExpression(uid, t.identifier("default"));
                  } else {
                    remaps[specifier.local.name] = t.memberExpression(uid, t.cloneWithoutLoc(specifier.imported));
                  }
                }
              } else {
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

            if (spec) {
              const descId = path.scope.generateUidIdentifier("undefined");
              const desc = specBuildTempExportDescriptor(descId);
              desc._blockHoist = 3;

              const expr = t.objectExpression(
                Object.keys(nonHoistedExportNames).map((name) =>
                  specBuildTempExportProperty(t.identifier(name), descId)
                )
              );
              const node = specBuildTempExport(exportsObj, expr);
              node._blockHoist = 3;

              topNodes.unshift(node);
              topNodes.unshift(desc);
            } else {
              for (let name in nonHoistedExportNames) {
                hoistedExportsNode = buildExportsAssignment(t.identifier(name), hoistedExportsNode).expression;
              }

              const node = t.expressionStatement(hoistedExportsNode);
              node._blockHoist = 3;

              topNodes.unshift(node);
            }
          }

          // add __esModule declaration if this file has any exports
          if (hasExports && !strict && !spec) {
            let buildTemplate = buildExportsModuleDeclaration;
            if (state.opts.loose) buildTemplate = buildLooseExportsModuleDeclaration;

            const declar = buildTemplate();
            declar._blockHoist = 3;

            topNodes.unshift(declar);
          }

          path.unshiftContainer("body", topNodes);

          if (hasExports && spec) {
            const decls = specBuildNamespace(moduleExports, exportsObj);
            decls.forEach((decl) => { decl._blockHoist = 3; });

            path.unshiftContainer("body", decls);
            path.pushContainer("body", [specFinishNamespaceExport(exportsObj)]);
          }

          path.traverse(reassignmentVisitor, {
            remaps,
            scope,
            exports,
            opts: state.opts,
            requeueInParent: (newPath) => path.requeue(newPath),
          });
        }
      }
    }
  };
}

function isSpec (state) {
  return state && state.opts && !!state.opts.spec;
}
