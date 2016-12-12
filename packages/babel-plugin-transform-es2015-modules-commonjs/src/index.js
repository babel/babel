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
  const $0 = $1 = Object.create ? Object.create(null, { __esModule: { value: true } }) : { __esModule: true };
  if (typeof Symbol === "function" && Symbol.toStringTag) {
    Object.defineProperty($0, Symbol.toStringTag, { value: "Module" });
  }
`);

const specBuildFunctionNameWrapper = template(`
  ({ default: $0 }).default
`);

const specBuildOwnExports = template(`
  const $0 = Object.keys($1)
`);

const specBuildNamespaceSpread = template(`
  Object.keys(OBJECT).forEach(function (key) {
    if (key === "__esModule" || key === "default" || OWN_EXPORTS.indexOf(key) >= 0) return;
    if (key in EXPORTS && (EXPORTS[key] === OBJECT[key] || typeof EXPORTS[key] === 'number' && isNaN(EXPORTS[key]))) return;
    Object.defineProperty(EXPORTS, key, {
      enumerable: true,
      get() {
        return OBJECT[key];
      }
    });
  });
`);

// Unfortunately, regular objects can't synthesize a value descriptor every time they're read,
// so a getter needs to be used for live bindings.
// It's also not allowed to specify writable when using getters/setters.
// Even if it was a value, getOwnPropertyDescriptor would return writable: false after
// the exports are frozen by specFinishNamespaceExport.
//
// Accessing a non-hoisted export should cause a DMZ error instead of just
// returning undefined, so a getter is also needed for that.
//
// This is as close as we can get to https://tc39.github.io/ecma262/#sec-module-namespace-exotic-objects-getownproperty-p
const specBuildHoistedExportDescriptor = template(`
  ({ enumerable: true, get() { return $0; } })
`);

const specBuildHoistedExportProperty = (id, descriptorId) =>
  t.objectProperty(id, specBuildHoistedExportDescriptor(descriptorId).expression);

const specBuildHoistedExport = template(`
  Object.defineProperties($0, $1);
`);

const specFinishNamespaceExport = template(`
  (Object.freeze || Object)($0);
`);

const THIS_BREAK_KEYS = ["FunctionExpression", "FunctionDeclaration", "ClassProperty", "ClassMethod", "ObjectMethod"];

export default function () {
  let REASSIGN_REMAP_SKIP = Symbol();

  const exportsObj = t.identifier("exports");
  exportsObj[REASSIGN_REMAP_SKIP] = true;
  const moduleObj = t.identifier("module");
  moduleObj[REASSIGN_REMAP_SKIP] = true;
  const module = t.memberExpression(moduleObj, exportsObj);
  module[REASSIGN_REMAP_SKIP] = true;

  const isModuleObj = t.buildMatchMemberExpression("module", true);
  const isExports = t.buildMatchMemberExpression("exports", true);

  let commonjsExportsMasked = null;

  let reassignmentVisitor = {
    ReferencedIdentifier(path, state) {
      const spec = isSpec(state);
      let name = path.node.name;
      let remap = this.remaps[name];
      if (!spec && !remap) return;

      // redeclared in this scope
      if (this.scope.getBinding(name) !== path.scope.getBinding(name)) return;

      if (spec) {
        if (name === "exports" && !path.node[REASSIGN_REMAP_SKIP] &&
          // Apparently replacing "module.exports" still visits the ".exports" here
          !(this.remaps[".module"] && t.isIdentifier(path.parent, this.remaps[".module"])) &&
          // Avoid entering when it's just some other object key named export
          !(isExports(path.parent) && t.isMemberExpression(path.parent.parent))) {
          remap = this.remaps[".exports"] = this.remaps[".exports"] || path.scope.generateUidIdentifier("exports");
          path.replaceWith(remap);
          commonjsExportsMasked.exports = remap;
          return;
        }
        if (name === "module" && !path.node[REASSIGN_REMAP_SKIP] &&
          !(isModuleObj(path.parent) && !path.parent[REASSIGN_REMAP_SKIP] && !t.isMemberExpression(path.parent.parent))) {
          remap = this.remaps[".module"] = this.remaps[".module"] || path.scope.generateUidIdentifier("module");
          path.replaceWith(remap);
          commonjsExportsMasked.module = remap;
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
        if (remap.nameSet) {
          if (t.isMemberExpression(remap)) {
            const name = t.isIdentifier(remap.property)
              ? remap.property.name
              : t.isStringLiteral(remap.property)
              ? remap.property.value
              : undefined;
            if (name == null) {
              throw new Error(`Unexpected ${remap.type}`);
            }
            remap.nameSet.add(name);
          } else if (t.isIdentifier(remap)) {
            if (t.isMemberExpression(path.parent)) {
              const { property, computed } = path.parent;

              const name = !computed && t.isIdentifier(property)
                ? property.name
                : t.isStringLiteral(property)
                ? property.value
                : undefined;

              if (name !== undefined) {
                remap.nameSet.add(name);
              } else {
                path.parentPath.replaceWith(
                  t.callExpression(
                    this.addHelper("specNamespaceGet"),
                    [ remap, property ]
                  )
                );
                return;
              }
            }
          } else {
            throw new Error(`Unexpected ${remap.type}`);
          }
        }
        path.replaceWith(remap);
      }
      this.requeueInParent(path);
    },

    AssignmentExpression(path, state) {
      if (isSpec(state)) {
        if (!path.node[REASSIGN_REMAP_SKIP]) {
          const target = t.isIdentifier(path.node.left)
            ? path.node.left
            : t.isMemberExpression(path.node.left) && t.isIdentifier(path.node.left.object)
              ? path.node.left.object : null;
          const name = target && target.name;

          if (target[REASSIGN_REMAP_SKIP] || this.scope.getBinding(name) !== path.scope.getBinding(name)) {
            return;
          }

          let remap = null;
          if (name === "exports") {
            remap = this.remaps[".exports"] = this.remaps[".exports"] || path.scope.generateUidIdentifier("exports");
            commonjsExportsMasked.exports = remap;
          }
          if (name === "module") {
            remap = this.remaps[".module"] = this.remaps[".module"] || path.scope.generateUidIdentifier("module");
            commonjsExportsMasked.module = remap;
          }

          if (remap) {
            if (t.isIdentifier(path.node.left)) {
              path.get("left").replaceWith(remap);
            } else {
              path.get("left.object").replaceWith(remap);
            }
          }
        }
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
          const specImport = isSpecImport(state);

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

          const hoistedExports = spec && new Map();
          let defaultExportUid = null;
          let ownExportsUid = null;

          let requires = Object.create(null);

          const addRequire = (source, blockHoist) => {
            let cached = requires[source];
            if (cached) return cached;

            let ref = path.scope.generateUidIdentifier(basename(source, extname(source)));

            const req = buildRequire(
              t.stringLiteral(source)
            ).expression;

            let varDecl = t.variableDeclaration(specImport ? "const" : "var", [
              t.variableDeclarator(ref,
                specImport
                ? t.callExpression(this.addHelper("specRequireInterop"), [req])
                : req
              )
            ]);

            // Copy location from the original import statement for sourcemap
            // generation.
            if (imports[source]) {
              varDecl.loc = imports[source].loc;
            }

            if (specImport) {
              blockHoist = Math.max(
                imports[source] && imports[source].maxBlockHoist || 0,
                blockHoist || 0
              );
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
                  if (spec) {
                    hoistedExports.set("default", id);
                  } else {
                    topNodes.push(buildExportsAssignment(defNode, id));
                  }
                  path.replaceWith(declaration.node);
                } else if (spec) {
                  defaultExportUid = path.scope.generateUidIdentifier("default");
                  hoistedExports.set("default", defaultExportUid);
                  const expr = specBuildFunctionNameWrapper(t.toExpression(declaration.node)).expression;
                  const decl = t.variableDeclaration("let", [
                    t.variableDeclarator(defaultExportUid, expr)
                  ]);
                  decl.loc = declaration.node.loc;
                  decl._blockHoist = 3;
                  topNodes.unshift(decl);
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
                  if (spec) {
                    hoistedExports.set("default", id);
                    path.replaceWith(declaration.node);
                  } else {
                    path.replaceWithMultiple([
                      declaration.node,
                      buildExportsAssignment(defNode, id)
                    ]);
                  }
                } else if (spec) {
                  defaultExportUid = path.scope.generateUidIdentifier("default");
                  hoistedExports.set("default", defaultExportUid);

                  const expr = specBuildFunctionNameWrapper(t.toExpression(declaration.node)).expression;

                  path.replaceWith(t.variableDeclaration("let", [
                    t.variableDeclarator(defaultExportUid, expr)
                  ]));

                  // Manually re-queue the expression so other transforms can get to it.
                  // Ideally this would happen automatically from the replaceWith above.
                  // See #4140 for more info.
                  path.parentPath.requeue(path.get("declarations.init"));
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
                  defaultExportUid = path.scope.generateUidIdentifier("default");
                  hoistedExports.set("default", defaultExportUid);

                  path.replaceWith(t.variableDeclaration("let", [
                    t.variableDeclarator(defaultExportUid, declaration.node)
                  ]));

                  // Manually re-queue the expression so other transforms can get to it.
                  // Ideally this would happen automatically from the replaceWith above.
                  // See #4140 for more info.
                  path.parentPath.requeue(path.get("declarations.init"));
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
                  if (spec) {
                    hoistedExports.set(id.name, id);
                  } else {
                    topNodes.push(buildExportsAssignment(id, id));
                  }
                  path.replaceWith(declaration.node);
                } else if (declaration.isClassDeclaration()) {
                  let id = declaration.node.id;
                  addTo(exports, id.name, id);
                  if (spec) {
                    hoistedExports.set(id.name, id);
                    path.replaceWith(declaration.node);
                  } else {
                    path.replaceWithMultiple([
                      declaration.node,
                      buildExportsAssignment(id, id)
                    ]);
                    nonHoistedExportNames[id.name] = true;
                  }
                } else if (declaration.isVariableDeclaration()) {
                  let declarators = declaration.get("declarations");
                  for (let decl of declarators) {
                    let id = decl.get("id");

                    if (spec) {
                      hoistedExports.set(id.node.name, id.node);
                      continue;
                    }

                    let init = decl.get("init");
                    if (!init.node) init.replaceWith(t.identifier("undefined"));

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
                  path.replaceWith(declaration.node);
                }
                continue;
              }

              let specifiers = path.get("specifiers");
              let nodes = [];
              let source = path.node.source;
              if (source) {
                let ref, importsEntry;
                if (specImport) {
                  let key = path.node.source.value;
                  importsEntry = imports[key] || {
                    specifiers: [],
                    maxBlockHoist: 0,
                    loc: path.node.loc,
                  };
                  importsEntry.reexports = importsEntry.reexports || new Map(),

                  importsEntry.specifiers.push(...path.node.specifiers);

                  if (typeof path.node._blockHoist === "number") {
                    importsEntry.maxBlockHoist = Math.max(
                      path.node._blockHoist,
                      importsEntry.maxBlockHoist
                    );
                  }

                  imports[key] = importsEntry;
                } else {
                  ref = addRequire(source.value, path.node._blockHoist);
                }

                for (let specifier of specifiers) {
                  if (specifier.isExportNamespaceSpecifier()) {
                    // todo
                  } else if (specifier.isExportDefaultSpecifier()) {
                    // todo
                  } else if (specifier.isExportSpecifier()) {
                    if (specImport) {
                      importsEntry.reexports.set(specifier.node.exported.name, specifier.node.local);
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
                      hoistedExports.set(specifier.node.exported.name, specifier.node.local);
                    } else {
                      nodes.push(buildExportsAssignment(specifier.node.exported, specifier.node.local));
                    }
                  }
                }
              }
              path.replaceWithMultiple(nodes);
            } else if (path.isExportAllDeclaration()) {
              let exportNode;
              if (spec) {
                if (ownExportsUid == null) {
                  ownExportsUid = path.scope.generateUidIdentifier("ownExports");
                  const ownExportsNode = specBuildOwnExports(ownExportsUid, exportsObj);
                  ownExportsNode._blockHoist = 3;
                  topNodes.push(ownExportsNode);
                }

                // Unfortunately, the namespace spread needs to happen _before_
                // the namespace is frozen. This _will_ result in out-of-order
                // imports, with the 'export * from' imports all running before
                // any of the other imports.

                exportNode = specBuildNamespaceSpread({
                  EXPORTS: exportsObj,
                  OWN_EXPORTS: ownExportsUid,
                  OBJECT: addRequire(path.node.source.value, 3)
                });
                exportNode._blockHoist = 3;
              } else {
                const ref = addRequire(path.node.source.value, path.node._blockHoist);
                exportNode = buildExportAll({
                  OBJECT: ref
                });
                if (specImport) {
                  exportNode._blockHoist = ref._blockHoist;
                }
              }
              exportNode.loc = path.node.loc;
              topNodes.push(exportNode);
              path.remove();
            }
          }

          const checkedImportMap = specImport && new Map();
          for (let source in imports) {
            let {specifiers, maxBlockHoist} = imports[source];
            if (specifiers.length) {
              const uid = addRequire(source, maxBlockHoist);

              if (specImport) {
                if (!checkedImportMap.has(uid)) {
                  const nameSet = new Set(
                    Array.from(new Set(specifiers))
                    .filter((specifier) => !t.isImportNamespaceSpecifier(specifier))
                    .map((specifier) => {
                      if (t.isImportDefaultSpecifier(specifier)) {
                        return "default";
                      }
                      if (t.isExportSpecifier(specifier)) {
                        return specifier.local.name;
                      }
                      return specifier.imported.name;
                    })
                  );
                  nameSet.source = source;

                  const names = Array.from(nameSet).map((name) => t.stringLiteral(name));
                  const namesExpr = t.arrayExpression(names);

                  const node =
                    t.expressionStatement(
                      t.callExpression(
                        this.addHelper("specImportCheck"),
                        [
                          uid,
                          namesExpr
                        ]
                      )
                    );

                  node.loc = imports[source].loc;

                  checkedImportMap.set(uid, {
                    nameSet,
                    node,
                    updateNode: () => {
                      if (nameSet.size === names.length) return;

                      const current = new Set(names.map((name) => name.value));

                      for (const name of nameSet) {
                        if (!current.has(name)) {
                          names.push(t.stringLiteral(name));
                        }
                      }
                    },
                    isEmpty: () => {
                      return names.length < 1;
                    }
                  });

                  topNodes.push(node);
                }
              }

              if (imports[source].reexports) {
                if (!spec) {
                  for (const [name, local] of imports[source].reexports.entries()) {
                    if (name === "default") {
                      topNodes.push(buildExportsFrom(t.stringLiteral(name), t.memberExpression(t.callExpression(this.addHelper("interopRequireDefault"), [uid]), local)));
                    } else {
                      topNodes.push(buildExportsFrom(t.stringLiteral(name), t.memberExpression(uid, local)));
                    }
                  }
                } else {
                  for (const [name, local] of imports[source].reexports.entries()) {
                    hoistedExports.set(name, t.memberExpression(uid, local));
                  }
                }
              }

              if (specImport) {
                for (const specifier of specifiers) {
                  if (t.isImportNamespaceSpecifier(specifier)) {
                    remaps[specifier.local.name] = uid;
                  } else if (t.isImportDefaultSpecifier(specifier)) {
                    remaps[specifier.local.name] = t.memberExpression(uid, t.identifier("default"));
                  } else if (specImport && t.isExportSpecifier(specifier)) {
                    // do nothing
                  } else {
                    remaps[specifier.local.name] = t.memberExpression(uid, t.cloneWithoutLoc(specifier.imported));
                  }
                  if (specImport && !t.isExportSpecifier(specifier)) {
                    remaps[specifier.local.name].nameSet = checkedImportMap.get(uid).nameSet;
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

          if (spec) {
            const entries = Array.from(hoistedExports.entries()).map(([name, id]) => {
              if (name === "default" && id === null) {
                // explicit export is generated
                return;
              }
              return specBuildHoistedExportProperty(t.identifier(name), id);
            }).filter(Boolean);

            if (entries.length > 0) {
              const expr = t.objectExpression(entries);
              const node = specBuildHoistedExport(exportsObj, expr);
              node._blockHoist = 3;

              topNodes.unshift(node);
            }

            if (hasExports) {
              const node = specFinishNamespaceExport(exportsObj);
              node._blockHoist = 3;
              topNodes.push(node);
            }
          } else {
            if (hasImports && Object.keys(nonHoistedExportNames).length) {
              let hoistedExportsNode = t.identifier("undefined");

              for (let name in nonHoistedExportNames) {
                hoistedExportsNode = buildExportsAssignment(t.identifier(name), hoistedExportsNode).expression;
              }

              const node = t.expressionStatement(hoistedExportsNode);
              node._blockHoist = 3;

              topNodes.unshift(node);
            }

            // add __esModule declaration if this file has any exports
            if (hasExports && !strict) {
              let buildTemplate = buildExportsModuleDeclaration;
              if (state.opts.loose) buildTemplate = buildLooseExportsModuleDeclaration;

              const declar = buildTemplate();
              declar._blockHoist = 3;

              topNodes.unshift(declar);
            }
          }

          path.unshiftContainer("body", topNodes);

          if (hasExports && spec) {
            const decls = specBuildNamespace(exportsObj, module);
            decls.forEach((decl) => { decl._blockHoist = 3; });

            path.unshiftContainer("body", decls);
          }

          if (spec) {
            commonjsExportsMasked = {};
          }

          path.traverse(reassignmentVisitor, {
            remaps,
            scope,
            exports,
            opts: state.opts,
            addHelper: this.addHelper.bind(this),
            requeueInParent: (newPath) => path.requeue(newPath),
          });

          if (specImport && hasImports) {
            const toRemove = new Set();
            for (const check of checkedImportMap.values()) {
              check.updateNode();

              if (check.isEmpty()) {
                toRemove.add(check.node);
              }
            }

            if (toRemove.size) {
              path.traverse({
                ExpressionStatement (path) {
                  if (toRemove.has(path.node)) {
                    path.remove();
                    return;
                  }
                  path.skip();
                }
              });
            }
          }

          if (spec && (commonjsExportsMasked.exports || commonjsExportsMasked.module)) {
            path.pushContainer("body", [
              t.variableDeclaration("let", [
                commonjsExportsMasked.exports && t.variableDeclarator(commonjsExportsMasked.exports),
                commonjsExportsMasked.module && t.variableDeclarator(commonjsExportsMasked.module)
              ].filter(Boolean))
            ]);
          }
        }
      }
    }
  };
}

function isSpec (state) {
  return state && state.opts && !!state.opts.spec;
}

function isSpecImport (state) {
  return state && state.opts && (!!state.opts.spec || !!state.opts.specImport);
}