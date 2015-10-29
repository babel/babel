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
  for (let KEY in OBJECT) {
    if (KEY === "default") continue;

    Object.defineProperty(exports, KEY, {
      enumerable: true,
      get: function () {
        return OBJECT[KEY];
      }
    });
  }
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
        path.replaceWith(t.sequenceExpression([t.numberLiteral(0), remap]));
      } else {
        path.replaceWith(remap);
      }
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
    },

    UpdateExpression(path) {
      let arg = path.get("argument");
      if (!arg.isIdentifier()) return;

      let name = arg.node.name;
      let exports = this.exports[name];
      if (!exports) return;

      // redeclared in this scope
      if (this.scope.getBinding(name) !== path.scope.getBinding(name)) return;

      let node = t.assignmentExpression(path.node.operator[0] + "=", arg.node, t.numberLiteral(1));

      if ((path.parentPath.isExpressionStatement() && !path.isCompletionRecord()) || path.node.prefix) {
        return path.replaceWith(node);
      }

      let nodes = [];
      nodes.push(node);

      let operator;
      if (path.node.operator === "--") {
        operator = "+";
      } else { // "++"
        operator = "-";
      }
      nodes.push(t.binaryExpression(operator, arg.node, t.numberLiteral(1)));

      path.replaceWithMultiple(t.sequenceExpression(nodes));
    }
  };

  return {
    visitor: {
      ThisExpression(path) {
        if (!path.findParent((path) => !path.is("shadow") && THIS_BREAK_KEYS.indexOf(path.type) >= 0)) {
          path.replaceWith(t.identifier("undefined"));
        }
      },

      Program: {
        exit(path) {
          let strict = !!this.opts.strict;

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

          let requires = Object.create(null);

          function addRequire(source) {
            let cached = requires[source];
            if (cached) return cached;

            let ref = path.scope.generateUidIdentifier(basename(source, extname(source)));

            topNodes.push(t.variableDeclaration("var", [
              t.variableDeclarator(ref, buildRequire(t.stringLiteral(source)).expression)
            ]));

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
                  throw specifier.buildCodeFrameError(`Illegal export "__esModule"`);
                }
              }
            }

            if (path.isImportDeclaration()) {
              hasImports = true;
              addTo(imports, path.node.source.value, path.node.specifiers);
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
                }
              } else {
                path.replaceWith(buildExportsAssignment(t.identifier("default"), declaration.node));
              }
            } else if (path.isExportNamedDeclaration()) {
              let declaration = path.get("declaration");
              if (declaration.node) {
                if (declaration.isFunctionDeclaration()) {
                  let id = declaration.node.id;
                  addTo(exports, id.name, id);
                  topNodes.push(buildExportsAssignment(id, id));
                  path.replaceWith(declaration.node);
                } else if (declaration.isClassDeclaration()) {
                  let id = declaration.node.id;
                  addTo(exports, id.name, id);
                  path.replaceWithMultiple([
                    declaration.node,
                    buildExportsAssignment(id, id)
                  ]);
                  nonHoistedExportNames[id.name] = true;
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
                    } else {
                      // todo
                    }
                  }
                  path.replaceWith(declaration.node);
                }
                continue;
              }

              let specifiers = path.get("specifiers");
              if (specifiers.length) {
                let nodes = [];
                let source = path.node.source
                if (source) {
                  let ref = addRequire(source.value);

                  for (let specifier of specifiers) {
                    if (specifier.isExportNamespaceSpecifier()) {
                      // todo
                    } else if (specifier.isExportDefaultSpecifier()) {
                      // todo
                    } else if (specifier.isExportSpecifier()) {
                      topNodes.push(buildExportsFrom(t.stringLiteral(specifier.node.exported.name), t.memberExpression(ref, specifier.node.local)));
                      nonHoistedExportNames[specifier.node.exported.name] = true;
                    }
                  }
                } else {
                  for (let specifier of specifiers) {
                    if (specifier.isExportSpecifier()) {
                      addTo(exports, specifier.node.local.name, specifier.node.exported);
                      nonHoistedExportNames[specifier.node.exported.name] = true;
                      nodes.push(buildExportsAssignment(specifier.node.exported, specifier.node.local));
                    }
                  }
                }
                path.replaceWithMultiple(nodes);
              }
            } else if (path.isExportAllDeclaration()) {
              topNodes.push(buildExportAll({
                KEY: path.scope.generateUidIdentifier("key"),
                OBJECT: addRequire(path.node.source.value)
              }));
              path.remove();
            }
          }

          for (let source in imports) {
            let specifiers = imports[source];
            if (specifiers.length) {
              let uid = addRequire(source);

              let wildcard;

              for (let i = 0; i < specifiers.length; i++) {
                let specifier = specifiers[i];
                if (t.isImportNamespaceSpecifier(specifier)) {
                  if (strict) {
                    remaps[specifier.local.name] = uid;
                  } else {
                    topNodes.push(t.variableDeclaration("var", [
                      t.variableDeclarator(specifier.local, t.callExpression(this.addHelper("interopRequireWildcard"), [uid]))
                    ]));
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
                      topNodes.push(t.variableDeclaration("var", [
                        t.variableDeclarator(target, t.callExpression(this.addHelper("interopRequireDefault"), [uid]))
                      ]));
                    }
                  }
                  remaps[specifier.local.name] = t.memberExpression(target, specifier.imported);
                }
              }
            } else {
              // bare import
              topNodes.push(buildRequire(t.stringLiteral(source)));
            }
          }

          if (hasImports && Object.keys(nonHoistedExportNames).length) {
            let hoistedExportsNode = t.identifier("undefined");

            for (let name in nonHoistedExportNames) {
              hoistedExportsNode = buildExportsAssignment(t.identifier(name), hoistedExportsNode).expression;
            }

            topNodes.unshift(t.expressionStatement(hoistedExportsNode));
          }

          // add __esModule declaration if this file has any exports
          if (hasExports && !strict) {
            let buildTemplate = buildExportsModuleDeclaration;
            if (this.opts.loose) buildTemplate = buildLooseExportsModuleDeclaration;
            topNodes.unshift(buildTemplate());
          }

          path.unshiftContainer("body", topNodes);
          path.traverse(reassignmentVisitor, { remaps, scope, exports });
        }
      }
    }
  };
}
