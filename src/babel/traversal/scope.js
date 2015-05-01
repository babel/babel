import includes from "lodash/collection/includes";
import explode from "./explode";
import traverse from "./index";
import defaults from "lodash/object/defaults";
import * as messages from "../messages";
import Binding from "./binding";
import globals from "globals";
import flatten from "lodash/array/flatten";
import extend from "lodash/object/extend";
import object from "../helpers/object";
import each from "lodash/collection/each";
import * as t from "../types";

var functionVariableVisitor = {
  enter(node, parent, scope, state) {
    if (t.isFor(node)) {
      each(t.FOR_INIT_KEYS, (key) => {
        var declar = this.get(key);
        if (declar.isVar()) state.scope.registerBinding("var", declar);
      });
    }

    // this block is a function so we'll stop since none of the variables
    // declared within are accessible
    if (this.isFunction()) return this.skip();

    // function identifier doesn't belong to this scope
    if (state.blockId && node === state.blockId) return;

    // delegate block scope handling to the `blockVariableVisitor`
    if (this.isBlockScoped()) return;

    // this will be hit again once we traverse into it after this iteration
    if (this.isExportDeclaration() && t.isDeclaration(node.declaration)) return;

    // we've ran into a declaration!
    if (this.isDeclaration()) state.scope.registerDeclaration(this);
  }
};

var programReferenceVisitor = {
  enter(node, parent, scope, state) {
    if (t.isReferencedIdentifier(node, parent)) {
      var bindingInfo = scope.getBinding(node.name);
      if (bindingInfo) {
        bindingInfo.reference();
      } else {
        state.addGlobal(node);
      }
    } else if (t.isLabeledStatement(node)) {
      state.addGlobal(node);
    } else if (t.isAssignmentExpression(node)) {
      scope.registerConstantViolation(this.get("left"), this.get("right"));
    } else if (t.isUpdateExpression(node)) {
      scope.registerConstantViolation(this.get("argument"), null);
    } else if (t.isUnaryExpression(node) && node.operator === "delete") {
      scope.registerConstantViolation(this.get("left"), null);
    }
  }
};

var blockVariableVisitor = {
  enter(node, parent, scope, state) {
    if (this.isFunctionDeclaration() || this.isBlockScoped()) {
      state.registerDeclaration(this);
    }
    if (this.isScope()) {
      this.skip();
    }
  }
};

var renameVisitor = explode({
  Identifier(node, parent, scope, state) {
    if (this.isReferenced() && node.name === state.oldName) {
      if (this.parentPath.isProperty() && this.key === "key" && parent.shorthand) {
        var value = t.identifier(state.newName);;

        if (parent.value === state.binding) {
          state.info.identifier = state.binding = value;
        }

        parent.shorthand = false;
        parent.value = value;
        parent.key = t.identifier(state.oldName);
      } else {
        node.name = state.newName;
      }
    }
  },

  Declaration(node, parent, scope, state) {
    var ids = {};

    var matchesLocal = (node, key) => {
      return node.local === node[key] && (node.local.name === state.oldName || node.local.name === state.newName);
    };

    if (this.isExportDeclaration() && this.has("specifiers")) {
      var specifiers = this.get("specifiers");
      for (var specifier of (specifiers: Array)) {
        if (specifier.isExportSpecifier() && matchesLocal(specifier.node, "exported")) {
          specifier.get("exported").replaceWith(t.identifier(state.oldName));
        }
      }
    } else if (this.isImportDeclaration() && this.has("specifiers")) {
      var specifiers = this.get("specifiers");
      for (var specifier of (specifiers: Array)) {
        if (specifier.isImportSpecifier() && matchesLocal(specifier.node, "imported")) {
          state.binding = state.info.identifier = t.identifier(state.newName);
          specifier.get("local").replaceWith(state.binding);
        } else {
          extend(ids, specifier.getBindingIdentifiers());
        }
      }
    } else {
      ids = this.getBindingIdentifiers();
    }

    for (var name in ids) {
      if (name === state.oldName) ids[name].name = state.newName;
    }
  },

  Scopable(node, parent, scope, state) {
    if (this.isScope()) {
      if (!scope.bindingIdentifierEquals(state.oldName, state.binding)) {
        this.skip();
      }
    }
  }
});

export default class Scope {

  /**
   * This searches the current "scope" and collects all references/bindings
   * within.
   */

  constructor(path: TraversalPath, parent?: Scope, file?: File) {
    if (parent && parent.block === path.node) {
      return parent;
    }

    var cached = path.getData("scope");
    if (cached && cached.parent === parent) {
      return cached;
    } else {
      //path.setData("scope", this);
    }

    this.parent = parent;
    this.file   = parent ? parent.file : file;

    this.parentBlock = path.parent;
    this.block       = path.node;
    this.path        = path;

    this.crawl();
  }

  static globals = flatten([globals.builtin, globals.browser, globals.node].map(Object.keys));
  static contextVariables = ["this", "arguments", "super"];

  /**
   * Description
   */

  traverse(node: Object, opts: Object, state?) {
    traverse(node, opts, this, state, this.path);
  }

  /**
   * Description
   */

  generateTemp(name: string = "temp") {
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
    } while (this.hasBinding(uid) || this.hasGlobal(uid) || this.hasUid(uid));
    this.file.uids[uid] = true;
    return uid;
  }

  _generateUid(name, i) {
    var id = name;
    if (i > 1) id += i;
    return `_${id}`;
  }

  /**
   * Description
   */

  hasUid(name): boolean {
    var scope = this;
    do {
      if (scope.file.uids[name]) return true;
      scope = scope.parent;
    } while (scope);
    return false;
  }

  /*
   * Description
   */

  generateUidBasedOnNode(parent: Object, defaultName?: String):  Object {
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
        if (node.specifiers && node.specifiers.length) {
          for (var i = 0; i < node.specifiers.length; i++) {
            add(node.specifiers[i]);
          }
        } else {
          add(node.source);
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
        for (var i = 0; i < node.properties.length; i++) {
          var prop = node.properties[i];
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
   * Description
   */

  generateMemoisedReference(node: Object, dontPush?: boolean): ?Object {
    if (t.isThisExpression(node) || t.isSuper(node)) {
      return null;
    }

    if (t.isIdentifier(node) && this.hasBinding(node.name)) {
      return null;
    }

    var id = this.generateUidBasedOnNode(node);
    if (!dontPush) this.push({ id });
    return id;
  }

  /**
   * Description
   */

  checkBlockScopedCollisions(kind: string, name: string, id: Object) {
    var local = this.getOwnBindingInfo(name);
    if (!local) return;


    if (kind === "param") return;
    if (kind === "hoisted" && local.kind === "let") return;

    var duplicate = false;
    if (!duplicate) duplicate = kind === "let" || kind === "const" || local.kind === "let" || local.kind === "const" || local.kind === "module";
    if (!duplicate) duplicate = local.kind === "param" && (kind === "let" || kind === "const");

    if (duplicate) {
      throw this.file.errorWithNode(id, messages.get("scopeDuplicateDeclaration", name), TypeError);
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

    var file = this.file;
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
    var scope = this;
    do {
      console.log(scope.block.type, "Bindings:", Object.keys(scope.bindings));
    } while(scope = scope.parent);
    console.log("-------------");
  }

  /**
   * Description
   */

  toArray(node: Object, i?: number) {
    var file = this.file;

    if (t.isIdentifier(node)) {
      var binding = this.getBinding(node.name);
      if (binding && binding.isTypeGeneric("Array", { inference: false })) return node;
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
      if (this.file.isLoose("es6.forOf")) helperName += "-loose";
    }
    return t.callExpression(file.addHelper(helperName), args);
  }

  /**
   * Description
   */

  registerDeclaration(path: TraversalPath) {
    var node = path.node;
    if (t.isFunctionDeclaration(node)) {
      this.registerBinding("hoisted", path);
    } else if (t.isVariableDeclaration(node)) {
      var declarations = path.get("declarations");
      for (var i = 0; i < declarations.length; i++) {
        this.registerBinding(node.kind, declarations[i]);
      }
    } else if (t.isClassDeclaration(node)) {
      this.registerBinding("let", path);
    } else if (t.isImportDeclaration(node) || t.isExportDeclaration(node)) {
      this.registerBinding("module", path);
    } else {
      this.registerBinding("unknown", path);
    }
  }

  /**
   * Description
   */

  registerConstantViolation(left: TraversalPath, right: TraversalPath) {
    var ids = left.getBindingIdentifiers();
    for (var name in ids) {
      var binding = this.getBinding(name);
      if (!binding) continue;
      if (right) {
        var rightType = right.typeAnnotation;
        if (rightType && binding.isCompatibleWithType(rightType)) continue;
      }
      binding.reassign();
    }
  }

  /**
   * Description
   */

  registerBinding(kind: string, path: TraversalPath) {
    if (!kind) throw new ReferenceError("no `kind`");

    var ids = path.getBindingIdentifiers();

    for (var name in ids) {
      var id = ids[name];

      this.checkBlockScopedCollisions(kind, name, id);

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

  recrawl() {
    this.path.setData("scopeInfo", null);
    this.crawl();
  }

  /**
   * Description
   */

  isPure(node) {
    if (t.isIdentifier(node)) {
      var bindingInfo = this.getBinding(node.name);
      return bindingInfo.constant;
    } else {
      return t.isPure(node);
    }
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
      bindings: object(),
      globals:  object()
    };

    extend(this, info);

    // ForStatement - left, init

    if (path.isLoop()) {
      for (let i = 0; i < t.FOR_INIT_KEYS.length; i++) {
        var node = path.get(t.FOR_INIT_KEYS[i]);
        if (node.isBlockScoped()) this.registerBinding(node.node.kind, node);
      }
    }

    // FunctionExpression - id

    if (path.isFunctionExpression() && path.has("id")) {
      if (!t.isProperty(path.parent, { method: true })) {
        this.registerBinding("var", path.get("id"));
      }
    }

    // Class

    if (path.isClass() && path.has("id")) {
      this.registerBinding("var", path.get("id"));
    }

    // Function - params, rest

    if (path.isFunction()) {
      var params = path.get("params");
      for (let i = 0; i < params.length; i++) {
        this.registerBinding("param", params[i]);
      }
      this.traverse(path.get("body").node, blockVariableVisitor, this);
    }

    // Program, Function - var variables

    if (path.isProgram() || path.isFunction()) {
      this.traverse(path.node, functionVariableVisitor, {
        blockId: path.get("id").node,
        scope:   this
      });
    }

    // Program, BlockStatement, Function - let variables

    if (path.isBlockStatement() || path.isProgram()) {
      this.traverse(path.node, blockVariableVisitor, this);
    }

    // CatchClause - param

    if (path.isCatchClause()) {
      this.registerBinding("let", path.get("param"));
    }

    // ComprehensionExpression - blocks

    if (path.isComprehensionExpression()) {
      this.registerBinding("let", path);
    }

    // Program

    if (path.isProgram()) {
      this.traverse(path.node, programReferenceVisitor, this);
    }
  }

  /**
   * Description
   */

  push(opts: Object) {
    var path = this.path;

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
      declar = t.variableDeclaration(opts.kind || "var", []);
      declar._generated = true;
      declar._blockHoist = 2;

      this.file.attachAuxiliaryComment(declar);

      path.get("body")[0]._containerInsertBefore([declar]);
      if (!unique) path.setData(dataKey, declar);
    }

    declar.declarations.push(t.variableDeclarator(opts.id, opts.init));
  }

  /**
   * Walk up the scope tree until we hit either a Function or reach the
   * very top and hit Program.
   */

  getFunctionParent() {
    var scope = this;
    while (scope.parent && !t.isFunction(scope.block)) {
      scope = scope.parent;
    }
    return scope;
  }

  /**
   * Walk up the scope tree until we hit either a BlockStatement/Loop or reach the
   * very top and hit Program.
   */

  getBlockParent() {
    var scope = this;
    while (scope.parent && !t.isFunction(scope.block) && !t.isLoop(scope.block) && !t.isFunction(scope.block)) {
      scope = scope.parent;
    }
    return scope;
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

    for (let i = 0; i < arguments.length; i++) {
      var kind = arguments[i];
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

  hasBinding(name: string) {
    if (!name) return false;
    if (this.hasOwnBinding(name)) return true;
    if (this.parentHasBinding(name)) return true;
    if (this.file.uids[name]) return true;
    if (includes(Scope.globals, name)) return true;
    if (includes(Scope.contextVariables, name)) return true;
    return false;
  }

  /**
   * Description
   */

  parentHasBinding(name: string) {
    return this.parent && this.parent.hasBinding(name);
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
