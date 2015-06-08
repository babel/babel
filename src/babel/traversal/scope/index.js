import includes from "lodash/collection/includes";
import repeating from "repeating";
import type NodePath from "../path";
import traverse from "../index";
import defaults from "lodash/object/defaults";
import * as messages from "../../messages";
import Binding from "./binding";
import globals from "globals";
import flatten from "lodash/array/flatten";
import extend from "lodash/object/extend";
import object from "../../helpers/object";
import * as t from "../../types";

var collectorVisitor = {
  For(node, parent, scope) {
    for (var key of (t.FOR_INIT_KEYS: Array)) {
      var declar = this.get(key);
      if (declar.isVar()) scope.getFunctionParent().registerBinding("var", declar);
    }
  },

  Declaration(node, parent, scope) {
    // delegate block scope handling to the `blockVariableVisitor`
    if (this.isBlockScoped()) return;

    // this will be hit again once we traverse into it after this iteration
    if (this.isExportDeclaration() && this.get("declaration").isDeclaration()) return;

    // we've ran into a declaration!
    scope.getFunctionParent().registerDeclaration(this);
  },

  ReferencedIdentifier(node) {
    var bindingInfo = this.scope.getBinding(node.name);
    if (bindingInfo) {
      bindingInfo.reference();
    } else {
      this.scope.getProgramParent().addGlobal(node);
    }
  },

  ForXStatement() {
    var left = this.get("left");
    if (left.isPattern() || left.isIdentifier()) {
      this.scope.registerConstantViolation(left, left);
    }
  },

  ExportDeclaration: {
    exit(node) {
      var declar = node.declaration;
      if (t.isClassDeclaration(declar) || t.isFunctionDeclaration(declar)) {
        this.scope.getBinding(declar.id.name).reference();
      } else if (t.isVariableDeclaration(declar)) {
        for (var decl of (declar.declarations: Array)) {
          var ids = t.getBindingIdentifiers(decl);
          for (var name in ids) {
            this.scope.getBinding(name).reference();
          }
        }
      }
    }
  },

  LabeledStatement(node) {
    this.scope.getProgramParent().addGlobal(node);
  },

  AssignmentExpression() {
    // register undeclared bindings as globals
    var ids = this.getBindingIdentifiers();
    var programParent;
    for (var name in ids) {
      if (this.scope.getBinding(name)) continue;

      programParent = programParent ||  this.scope.getProgramParent();
      programParent.addGlobal(ids[name]);
    }

    // register as constant violation
    this.scope.registerConstantViolation(this, this.get("left"), this.get("right"));
  },

  UpdateExpression(node, parent, scope) {
    scope.registerConstantViolation(this, this.get("argument"), null);
  },

  UnaryExpression(node, parent, scope) {
    if (node.operator === "delete") scope.registerConstantViolation(this, this.get("left"), null);
  },

  BlockScoped(node, parent, scope) {
    if (scope.path === this) scope = scope.parent;
    scope.getBlockParent().registerDeclaration(this);
  },

  ClassDeclaration(node, parent, scope) {
    var name = node.id.name;
    scope.bindings[name] = scope.getBinding(name);
  },

  Block(node, parent, scope) {
    var paths = this.get("body");
    for (var path of (paths: Array)) {
      if (path.isFunctionDeclaration()) {
        scope.getBlockParent().registerDeclaration(path);
      }
    }
  }
};

var renameVisitor = {
  ReferencedIdentifier(node, parent, scope, state) {
    if (node.name === state.oldName) {
      node.name = state.newName;
    }
  },

  Scope(node, parent, scope, state) {
    if (!scope.bindingIdentifierEquals(state.oldName, state.binding)) {
      this.skip();
    }
  }
};

renameVisitor.AssignmentExpression =
renameVisitor.Declaration = function (node, parent, scope, state) {
  var ids = this.getBindingIdentifiers();

  for (var name in ids) {
    if (name === state.oldName) ids[name].name = state.newName;
  }
};

export default class Scope {

  /**
   * This searches the current "scope" and collects all references/bindings
   * within.
   */

  constructor(path: NodePath, parent?: Scope) {
    if (parent && parent.block === path.node) {
      return parent;
    }

    var cached = path.getData("scope");
    if (cached && cached.parent === parent) {
      return cached;
    } else {
      path.setData("scope", this);
    }

    this.parent = parent;
    this.hub    = path.hub;

    this.parentBlock = path.parent;
    this.block       = path.node;
    this.path        = path;
  }

  static globals = flatten([globals.builtin, globals.browser, globals.node].map(Object.keys));

  static contextVariables = [
    "arguments",
    "undefined",
    "Infinity",
    "NaN"
  ];

  /**
   * Description
   */

  traverse(node: Object, opts: Object, state?) {
    traverse(node, opts, this, state, this.path);
  }

  /**
   * Description
   */

  generateDeclaredUidIdentifier(name: string = "temp") {
    var id = this.generateUidIdentifier(name);
    this.push({ id });
    return id;
  }

  /**
   * Description
   */

  generateUidIdentifier(name: string) {
    return t.identifier(this.generateUid(name));
  }

  /**
   * Description
   */

  generateUid(name: string) {
    name = t.toIdentifier(name).replace(/^_+/, "");

    var uid;
    var i = 0;
    do {
      uid = this._generateUid(name, i);
      i++;
    } while (this.hasBinding(uid) || this.hasGlobal(uid) || this.hasReference(uid));


    var program = this.getProgramParent();
    program.references[uid] = true;
    program.uids[uid] = true;

    return uid;
  }

  _generateUid(name, i) {
    var id = name;
    if (i > 1) id += i;
    return `_${id}`;
  }

  /*
   * Description
   */

  generateUidIdentifierBasedOnNode(parent: Object, defaultName?: String):  Object {
    var node = parent;

    if (t.isAssignmentExpression(parent)) {
      node = parent.left;
    } else if (t.isVariableDeclarator(parent)) {
      node = parent.id;
    } else if (t.isProperty(node)) {
      node = node.key;
    }

    var parts = [];

    var add = function (node) {
      if (t.isModuleDeclaration(node)) {
        if (node.source) {
          add(node.source);
        } else if (node.specifiers && node.specifiers.length) {
          for (var specifier of (node.specifiers: Array)) {
            add(specifier);
          }
        } else if (node.declaration) {
          add(node.declaration);
        }
      } else if (t.isModuleSpecifier(node)) {
        add(node.local);
      } else if (t.isMemberExpression(node)) {
        add(node.object);
        add(node.property);
      } else if (t.isIdentifier(node)) {
        parts.push(node.name);
      } else if (t.isLiteral(node)) {
        parts.push(node.value);
      } else if (t.isCallExpression(node)) {
        add(node.callee);
      } else if (t.isObjectExpression(node) || t.isObjectPattern(node)) {
        for (var prop of (node.properties: Array)) {
          add(prop.key || prop.argument);
        }
      }
    };

    add(node);

    var id = parts.join("$");
    id = id.replace(/^_/, "") || defaultName || "ref";

    return this.generateUidIdentifier(id);
  }

  /**
   * Determine whether evaluating the specific input `node` is a consequenceless reference. ie.
   * evaluating it wont result in potentially arbitrary code from being ran. The following are
   * whitelisted and determined not cause side effects:
   *
   *  - `this` expressions
   *  - `super` expressions
   *  - Bound identifiers
   */

  isStatic(node: Object): boolean {
    if (t.isThisExpression(node) || t.isSuper(node)) {
      return true;
    }

    if (t.isIdentifier(node) && this.hasBinding(node.name)) {
      return true;
    }

    return false;
  }

  /**
   * Description
   */

  maybeGenerateMemoised(node: Object, dontPush?: boolean): ?Object {
    if (this.isStatic(node)) {
      return null;
    } else {
      var id = this.generateUidIdentifierBasedOnNode(node);
      if (!dontPush) this.push({ id });
      return id;
    }
  }

  /**
   * Description
   */

  checkBlockScopedCollisions(local, kind: string, name: string, id: Object) {
    // ignore parameters
    if (kind === "param") return;

    // ignore hoisted functions if there's also a local let
    if (kind === "hoisted" && local.kind === "let") return;

    var duplicate = false;

    // don't allow duplicate bindings to exist alongside
    if (!duplicate) duplicate = kind === "let" || local.kind === "let" || local.kind === "const" || local.kind === "module";

    // don't allow a local of param with a kind of let
    if (!duplicate) duplicate = local.kind === "param" && (kind === "let" || kind === "const");

    if (duplicate) {
      throw this.hub.file.errorWithNode(id, messages.get("scopeDuplicateDeclaration", name), TypeError);
    }
  }

  /**
   * Description
   */

  rename(oldName: string, newName: string, block?) {
    newName = newName || this.generateUidIdentifier(oldName).name;

    var info = this.getBinding(oldName);
    if (!info) return;

    var state = {
      newName: newName,
      oldName: oldName,
      binding: info.identifier,
      info:    info
    };

    var scope = info.scope;
    scope.traverse(block || scope.block, renameVisitor, state);

    if (!block) {
      scope.removeOwnBinding(oldName);
      scope.bindings[newName] = info;
      state.binding.name = newName;
    }

    var file = this.hub.file;
    if (file) {
      this._renameFromMap(file.moduleFormatter.localImports, oldName, newName, state.binding);
      //this._renameFromMap(file.moduleFormatter.localExports, oldName, newName);
    }
  }

  _renameFromMap(map, oldName, newName, value) {
    if (map[oldName]) {
      map[newName] = value;
      map[oldName] = null;
    }
  }

  /**
   * Description
   */

  dump() {
    var sep = repeating("-", 60);
    console.log(sep);
    var scope = this;
    do {
      console.log("#", scope.block.type);
      for (var name in scope.bindings) {
        var binding = scope.bindings[name];
        console.log(" -", name, {
          constant: binding.constant,
          references: binding.references
        });
      }
    } while(scope = scope.parent);
    console.log(sep);
  }

  /**
   * Description
   */

  toArray(node: Object, i?: number) {
    var file = this.hub.file;

    if (t.isIdentifier(node)) {
      var binding = this.getBinding(node.name);
      if (binding && binding.constant && binding.path.isGenericType("Array")) return node;
    }

    if (t.isArrayExpression(node)) {
      return node;
    }

    if (t.isIdentifier(node, { name: "arguments" })) {
      return t.callExpression(t.memberExpression(file.addHelper("slice"), t.identifier("call")), [node]);
    }

    var helperName = "to-array";
    var args = [node];
    if (i === true) {
      helperName = "to-consumable-array";
    } else if (i) {
      args.push(t.literal(i));
      helperName = "sliced-to-array";
      if (this.hub.file.isLoose("es6.forOf")) helperName += "-loose";
    }
    return t.callExpression(file.addHelper(helperName), args);
  }

  /**
   * Description
   */

  registerDeclaration(path: NodePath) {
    if (path.isFunctionDeclaration()) {
      this.registerBinding("hoisted", path);
    } else if (path.isVariableDeclaration()) {
      var declarations = path.get("declarations");
      for (var declar of (declarations: Array)) {
        this.registerBinding(path.node.kind, declar);
      }
    } else if (path.isClassDeclaration()) {
      this.registerBinding("let", path);
    } else if (path.isImportDeclaration() || path.isExportDeclaration()) {
      this.registerBinding("module", path);
    } else if (path.isFlowDeclaration()) {
      this.registerBinding("type", path);
    } else {
      this.registerBinding("unknown", path);
    }
  }

  /**
   * Description
   */

  registerConstantViolation(root: NodePath, left: NodePath, right: NodePath) {
    var ids = left.getBindingIdentifiers();
    for (var name in ids) {
      var binding = this.getBinding(name);
      if (!binding) continue;

      if (right) {
        var rightType = right.typeAnnotation;
        if (rightType && binding.isCompatibleWithType(rightType)) continue;
      }

      binding.reassign(root, left, right);
    }
  }

  /**
   * Description
   */

  registerBinding(kind: string, path: NodePath) {
    if (!kind) throw new ReferenceError("no `kind`");

    if (path.isVariableDeclaration()) {
      var declarators = path.get("declarations");
      for (var declar of (declarators: Array)) {
        this.registerBinding(kind, declar);
      }
      return;
    }

    var parent = this.getProgramParent();
    var ids = path.getBindingIdentifiers();

    for (var name in ids) {
      var id = ids[name];

      var local = this.getOwnBindingInfo(name);
      if (local) {
        // don't ever let a type alias shadow a local binding
        if (kind === "type") continue;

        // same identifier so continue safely as we're likely trying to register it
        // multiple times
        if (local.identifier === id) continue;

        this.checkBlockScopedCollisions(local, kind, name, id);
      }

      parent.references[name] = true;

      this.bindings[name] = new Binding({
        identifier: id,
        scope:      this,
        path:       path,
        kind:       kind
      });
    }
  }

  /**
   * Description
   */

  addGlobal(node: Object) {
    this.globals[node.name] = node;
  }

  /**
   * Description
   */

  hasUid(name): boolean {
    var scope = this;

    do {
      if (scope.uids[name]) return true;
    } while (scope = scope.parent);

    return false;
  }

  /**
   * Description
   */

  hasGlobal(name: string): boolean {
    var scope = this;

    do {
      if (scope.globals[name]) return true;
    } while (scope = scope.parent);

    return false;
  }

  /**
   * Description
   */

  hasReference(name: string): boolean {
    var scope = this;

    do {
      if (scope.references[name]) return true;
    } while (scope = scope.parent);

    return false;
  }

  /**
   * Description
   */

  isPure(node, constantsOnly?: boolean) {
    if (t.isIdentifier(node)) {
      var binding = this.getBinding(node.name);
      if (!binding) return false;
      if (constantsOnly) return binding.constant;
      return true;
    } else if (t.isClass(node)) {
      return !node.superClass || this.isPure(node.superClass, constantsOnly);
    } else if (t.isBinary(node)) {
      return this.isPure(node.left, constantsOnly) && this.isPure(node.right, constantsOnly);
    } else if (t.isArrayExpression(node)) {
      for (var elem of (node.elements: Array)) {
        if (!this.isPure(elem, constantsOnly)) return false;
      }
      return true;
    } else if (t.isObjectExpression(node)) {
      for (var prop of (node.properties: Array)) {
        if (!this.isPure(prop, constantsOnly)) return false;
      }
      return true;
    } else if (t.isProperty(node)) {
      if (node.computed && !this.isPure(node.key, constantsOnly)) return false;
      return this.isPure(node.value, constantsOnly);
    } else {
      return t.isPure(node);
    }
  }

  /**
   * Description
   */

  init() {
    if (!this.references) this.crawl();
  }

  /**
   * Description
   */

  crawl() {
    var path = this.path;

    //

    var info = this.block._scopeInfo;
    if (info) return extend(this, info);

    info = this.block._scopeInfo = {
      references: object(),
      bindings:   object(),
      globals:    object(),
      uids:       object(),
    };

    extend(this, info);

    // ForStatement - left, init

    if (path.isLoop()) {
      for (let key of (t.FOR_INIT_KEYS: Array)) {
        var node = path.get(key);
        if (node.isBlockScoped()) this.registerBinding(node.node.kind, node);
      }
    }

    // FunctionExpression - id

    if (path.isFunctionExpression() && path.has("id")) {
      if (!t.isProperty(path.parent, { method: true })) {
        this.registerBinding("var", path);
      }
    }

    // Class

    if (path.isClassExpression() && path.has("id")) {
      this.registerBinding("var", path);
    }

    // Function - params, rest

    if (path.isFunction()) {
      var params = path.get("params");
      for (let param of (params: Array)) {
        this.registerBinding("param", param);
      }
    }

    // CatchClause - param

    if (path.isCatchClause()) {
      this.registerBinding("let", path);
    }

    // ComprehensionExpression - blocks

    if (path.isComprehensionExpression()) {
      this.registerBinding("let", path);
    }

    // Program

    var parent = this.getProgramParent();
    if (parent.crawling) return;

    this.crawling = true;
    path.traverse(collectorVisitor);
    this.crawling = false;
  }

  /**
   * Description
   */

  push(opts: Object) {
    var path = this.path;

    if (path.isSwitchStatement()) {
      path = this.getFunctionParent().path;
    }

    if (path.isLoop() || path.isCatchClause() || path.isFunction()) {
      t.ensureBlock(path.node);
      path = path.get("body");
    }

    if (!path.isBlockStatement() && !path.isProgram()) {
      path = this.getBlockParent().path;
    }

    var unique = opts.unique;
    var kind   = opts.kind || "var";

    var dataKey = `declaration:${kind}`;
    var declar  = !unique && path.getData(dataKey);

    if (!declar) {
      declar = t.variableDeclaration(kind, []);
      declar._generated = true;
      declar._blockHoist = 2;

      this.hub.file.attachAuxiliaryComment(declar);

      var [declarPath] = path.unshiftContainer("body", [declar]);
      this.registerBinding(kind, declarPath);
      if (!unique) path.setData(dataKey, declar);
    }

    declar.declarations.push(t.variableDeclarator(opts.id, opts.init));
  }

  /**
   * Walk up to the top of the scope tree and get the `Program`.
   */

  getProgramParent() {
    var scope = this;
    do {
      if (scope.path.isProgram()) {
        return scope;
      }
    } while (scope = scope.parent);
    throw new Error("We couldn't find a Function or Program...");
  }

  /**
   * Walk up the scope tree until we hit either a Function or reach the
   * very top and hit Program.
   */

  getFunctionParent() {
    var scope = this;
    do {
      if (scope.path.isFunctionParent()) {
        return scope;
      }
    } while (scope = scope.parent);
    throw new Error("We couldn't find a Function or Program...");
  }

  /**
   * Walk up the scope tree until we hit either a BlockStatement/Loop/Program/Function/Switch or reach the
   * very top and hit Program.
   */

  getBlockParent() {
    var scope = this;
    do {
      if (scope.path.isBlockParent()) {
        return scope;
      }
    } while (scope = scope.parent);
    throw new Error("We couldn't find a BlockStatement, For, Switch, Function, Loop or Program...");
  }

  /**
   * Walks the scope tree and gathers **all** bindings.
   */

  getAllBindings(): Object {
    var ids = object();

    var scope = this;
    do {
      defaults(ids, scope.bindings);
      scope = scope.parent;
    } while (scope);

    return ids;
  }

  /**
   * Walks the scope tree and gathers all declarations of `kind`.
   */

  getAllBindingsOfKind(): Object {
    var ids = object();

    for (let kind of (arguments: Array)) {
      var scope = this;
      do {
        for (var name in scope.bindings) {
          var binding = scope.bindings[name];
          if (binding.kind === kind) ids[name] = binding;
        }
        scope = scope.parent;
      } while (scope);
    }

    return ids;
  }

  /**
   * Description
   */

  bindingIdentifierEquals(name: string, node: Object): boolean {
    return this.getBindingIdentifier(name) === node;
  }

  /**
   * Description
   */

  getBinding(name: string) {
    var scope = this;

    do {
      var binding = scope.getOwnBindingInfo(name);
      if (binding) return binding;
    } while (scope = scope.parent);
  }

  /**
   * Description
   */

  getOwnBindingInfo(name: string) {
    return this.bindings[name];
  }

  /**
   * Description
   */

  getBindingIdentifier(name: string) {
    var info = this.getBinding(name);
    return info && info.identifier;
  }

  /**
   * Description
   */

  getOwnBindingIdentifier(name: string) {
    var binding = this.bindings[name];
    return binding && binding.identifier;
  }

  /**
   * Description
   */

  hasOwnBinding(name: string) {
    return !!this.getOwnBindingInfo(name);
  }

  /**
   * Description
   */

  hasBinding(name: string, noGlobals?) {
    if (!name) return false;
    if (this.hasOwnBinding(name)) return true;
    if (this.parentHasBinding(name, noGlobals)) return true;
    if (this.hasUid(name)) return true;
    if (!noGlobals && includes(Scope.globals, name)) return true;
    if (!noGlobals && includes(Scope.contextVariables, name)) return true;
    return false;
  }

  /**
   * Description
   */

  parentHasBinding(name: string, noGlobals?) {
    return this.parent && this.parent.hasBinding(name, noGlobals);
  }

  /**
   * Move a binding of `name` to another `scope`.
   */

  moveBindingTo(name, scope) {
    var info = this.getBinding(name);
    if (info) {
      info.scope.removeOwnBinding(name);
      info.scope = scope;
      scope.bindings[name] = info;
    }
  }

  /**
   * Description
   */

  removeOwnBinding(name: string) {
    delete this.bindings[name];
  }

  /**
   * Description
   */

  removeBinding(name: string) {
    var info = this.getBinding(name);
    if (info) info.scope.removeOwnBinding(name);
  }
}
