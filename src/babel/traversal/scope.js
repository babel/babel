import includes from "lodash/collection/includes";
import traverse from "./index";
import defaults from "lodash/object/defaults";
import * as messages from "../messages";
import globals from "globals";
import flatten from "lodash/array/flatten";
import extend from "lodash/object/extend";
import object from "../helpers/object";
import each from "lodash/collection/each";
import * as t from "../types";

var functionVariableVisitor = {
  enter(node, parent, scope, state) {
    if (t.isFor(node)) {
      each(t.FOR_INIT_KEYS, function (key) {
        var declar = node[key];
        if (t.isVar(declar)) state.scope.registerBinding("var", declar);
      });
    }

    // this block is a function so we'll stop since none of the variables
    // declared within are accessible
    if (t.isFunction(node)) return this.skip();

    // function identifier doesn't belong to this scope
    if (state.blockId && node === state.blockId) return;

    // delegate block scope handling to the `blockVariableVisitor`
    if (t.isBlockScoped(node)) return;

    // this will be hit again once we traverse into it after this iteration
    if (t.isExportDeclaration(node) && t.isDeclaration(node.declaration)) return;

    // we've ran into a declaration!
    if (t.isDeclaration(node)) state.scope.registerDeclaration(node);
  }
};

var programReferenceVisitor = {
  enter(node, parent, scope, state) {
    if (t.isReferencedIdentifier(node, parent) && !scope.hasBinding(node.name)) {
      state.addGlobal(node);
    } else if (t.isLabeledStatement(node)) {
      state.addGlobal(node);
    } else if (t.isAssignmentExpression(node) || t.isUpdateExpression(node) || (t.isUnaryExpression(node) && node.operator === "delete")) {
      scope.registerBindingReassignment(node);
    }
  }
};

var blockVariableVisitor = {
  enter(node, parent, scope, state) {
    if (t.isFunctionDeclaration(node) || t.isBlockScoped(node)) {
      state.registerDeclaration(node);
    } else if (t.isScope(node, parent)) {
      this.skip();
    }
  }
};

export default class Scope {

  /**
   * This searches the current "scope" and collects all references/bindings
   * within.
   */

  constructor(block: Object, parentBlock: Object, parent?: Scope, file?: File) {
    this.parent = parent;
    this.file   = parent ? parent.file : file;

    this.parentBlock = parentBlock;
    this.block       = block;

    this.crawl();
  }

  static globals = flatten([globals.builtin, globals.browser, globals.node].map(Object.keys));
  static contextVariables = ["this", "arguments", "super"];

  /**
   * Description
   */

  traverse(node: Object, opts: Object, state?) {
    traverse(node, opts, this, state);
  }

  /**
   * Description
   */

  generateTemp(name: string = "temp") {
    var id = this.generateUidIdentifier(name);
    this.push({
      key: id.name,
      id: id
    });
    return id;
  }

  /**
   * Description
   */

  generateUidIdentifier(name: string) {
    var id = t.identifier(this.generateUid(name));
    this.getFunctionParent().registerBinding("uid", id);
    return id;
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
    } while (this.hasBinding(uid) || this.hasGlobal(uid));
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

  generateUidBasedOnNode(parent: Object):  Object {
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
      if (t.isMemberExpression(node)) {
        add(node.object);
        add(node.property);
      } else if (t.isIdentifier(node)) {
        parts.push(node.name);
      } else if (t.isLiteral(node)) {
        parts.push(node.value);
      } else if (t.isCallExpression(node)) {
        add(node.callee);
      }
    };

    add(node);

    var id = parts.join("$");
    id = id.replace(/^_/, "") || "ref";

    return this.generateUidIdentifier(id);
  }

  /**
   * Description
   */

  generateTempBasedOnNode(node: Object): ?Object {
    if (t.isIdentifier(node) && this.hasBinding(node.name)) {
      return null;
    }

    var id = this.generateUidBasedOnNode(node);
    this.push({
      key: id.name,
      id: id
    });
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

    if (local.kind === "let" || local.kind === "const" || local.kind === "module") {
      throw this.file.errorWithNode(id, messages.get("scopeDuplicateDeclaration", name), TypeError);
    }
  }

  /**
   * Description
   */

  rename(oldName: string, newName: string) {
    newName ||= this.generateUidIdentifier(oldName).name;

    var info = this.getBindingInfo(oldName);
    if (!info) return;

    var binding = info.identifier;
    var scope = info.scope;

    scope.traverse(scope.block, {
      enter(node, parent, scope) {
        if (t.isReferencedIdentifier(node, parent) && node.name === oldName) {
          node.name = newName;
        } else if (t.isDeclaration(node)) {
          var ids = t.getBindingIdentifiers(node);
          for (var name in ids) {
            if (name === oldName) ids[name].name = newName;
          }
        } else if (t.isScope(node, parent)) {
          if (!scope.bindingIdentifierEquals(oldName, binding)) {
            this.skip();
          }
        }
      }
    });

    scope.removeOwnBinding(oldName);
    scope.bindings[newName] = info;

    binding.name = newName;
  }

  /**
   * Description
   */

  inferType(node: Object) {
    var target;

    if (t.isVariableDeclarator(node)) {
      target = node.init;
    }

    if (t.isArrayExpression(target)) {
      return t.genericTypeAnnotation(t.identifier("Array"));
    }

    if (t.isObjectExpression(target)) {
      return;
    }

    if (t.isLiteral(target)) {
      return;
    }

    if (t.isCallExpression(target) && t.isIdentifier(target.callee)) {
      var funcInfo = this.getBindingInfo(target.callee.name);
      if (funcInfo) {
        var funcNode = funcInfo.node;
        return !funcInfo.reassigned && t.isFunction(funcNode) && node.returnType;
      }
    }

    if (t.isIdentifier(target)) {
      return;
    }
  }

  /**
   * Description
   */

  isTypeGeneric(name: string, genericName: string) {
    var info = this.getBindingInfo(name);
    if (!info) return false;

    var type = info.typeAnnotation;
    return t.isGenericTypeAnnotation(type) && t.isIdentifier(type.id, { name: genericName });
  }

  /**
   * Description
   */

  assignTypeGeneric(name: string, type: Object) {
    this.assignType(name, t.genericTypeAnnotation(t.identifier(type)));
  }

  /**
   * Description
   */

  assignType(name: string, type: Object) {
    var info = this.getBindingInfo(name);
    if (!info) return;

    info.typeAnnotation = type;
  }

  /**
   * Description
   */

  getTypeAnnotation(id: Object, node: Object): Object {
    var info = {
      annotation: null,
      inferred: false
    };

    var type;

    if (id.typeAnnotation) {
      type = id.typeAnnotation;
    }

    if (!type) {
      info.inferred = true;
      type = this.inferType(node);
    }

    if (type) {
      if (t.isTypeAnnotation(type)) type = type.typeAnnotation;
      info.annotation = type;
    }

    return info;
  }

  /**
   * Description
   */

  toArray(node: Object, i?: number) {
    var file = this.file;

    if (t.isIdentifier(node) && this.isTypeGeneric(node.name, "Array")) {
      return node;
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
    }
    return t.callExpression(file.addHelper(helperName), args);
  }

  /**
   * Description
   */

  refreshDeclaration(node: Object) {
    if (t.isBlockScoped(node)) {
      this.getBlockParent().registerDeclaration(node);
    } else if (t.isVariableDeclaration(node, { kind: "var" })) {
      this.getFunctionParent().registerDeclaration(node);
    } else if (node === this.block) {
      this.recrawl();
    }
  }

  /**
   * Description
   */

  registerDeclaration(node: Object) {
    if (t.isFunctionDeclaration(node)) {
      this.registerBinding("hoisted", node);
    } else if (t.isVariableDeclaration(node)) {
      for (var i = 0; i < node.declarations.length; i++) {
        this.registerBinding(node.kind, node.declarations[i]);
      }
    } else if (t.isClassDeclaration(node)) {
      this.registerBinding("let", node);
    } else if (t.isImportDeclaration(node) || t.isExportDeclaration(node)) {
      this.registerBinding("module", node);
    } else {
      this.registerBinding("unknown", node);
    }
  }

  /**
   * Description
   */

  registerBindingReassignment(node: Object) {
    var ids = t.getBindingIdentifiers(node);
    for (var name in ids) {
      var info = this.getBindingInfo(name);
      if (info) {
        info.reassigned = true;

        if (info.typeAnnotationInferred) {
          // destroy the inferred typeAnnotation
          info.typeAnnotation = null;
        }
      }
    }
  }

  /**
   * Description
   */

  registerBinding(kind: string, node: Object) {
    if (!kind) throw new ReferenceError("no `kind`");

    var ids = t.getBindingIdentifiers(node);

    for (var name in ids) {
      var id = ids[name];

      this.checkBlockScopedCollisions(kind, name, id);

      var typeInfo = this.getTypeAnnotation(id, node);

      this.bindings[name] = {
        typeAnnotationInferred: typeInfo.inferred,
        typeAnnotation:         typeInfo.annotation,
        reassigned:             false,
        identifier:             id,
        scope:                  this,
        node:                   node,
        kind:                   kind
      };
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
    this.block._scopeInfo = null;
    this.crawl();
  }

  /**
   * Description
   */

  crawl() {
    var block  = this.block;
    var i;

    //

    var info = block._scopeInfo;
    if (info) {
      extend(this, info);
      return;
    }

    info = block._scopeInfo = {
      bindings: object(),
      globals:  object()
    };

    extend(this, info);

    // ForStatement - left, init

    if (t.isLoop(block)) {
      for (i = 0; i < t.FOR_INIT_KEYS.length; i++) {
        var node = block[t.FOR_INIT_KEYS[i]];
        if (t.isBlockScoped(node)) this.registerBinding("let", node);
      }

      if (t.isBlockStatement(block.body)) {
        block = block.body;
      }
    }

    // FunctionExpression - id

    if (t.isFunctionExpression(block) && block.id) {
      if (!t.isProperty(this.parentBlock, { method: true })) {
        this.registerBinding("var", block.id);
      }
    }

    // Class

    if (t.isClass(block) && block.id) {
      this.registerBinding("var", block.id);
    }

    // Function - params, rest

    if (t.isFunction(block)) {
      for (i = 0; i < block.params.length; i++) {
        this.registerBinding("param", block.params[i]);
      }
      this.traverse(block.body, blockVariableVisitor, this);
    }

    // Program, BlockStatement, Function - let variables

    if (t.isBlockStatement(block) || t.isProgram(block)) {
      this.traverse(block, blockVariableVisitor, this);
    }

    // CatchClause - param

    if (t.isCatchClause(block)) {
      this.registerBinding("let", block.param);
    }

    // ComprehensionExpression - blocks

    if (t.isComprehensionExpression(block)) {
      this.registerBinding("let", block);
    }

    // Program, Function - var variables

    if (t.isProgram(block) || t.isFunction(block)) {
      this.traverse(block, functionVariableVisitor, {
        blockId: block.id,
        scope:   this
      });
    }

    // Program

    if (t.isProgram(block)) {
      this.traverse(block, programReferenceVisitor, this);
    }
  }

  /**
   * Description
   */

  push(opts: Object) {
    var block = this.block;

    if (t.isLoop(block) || t.isCatchClause(block) || t.isFunction(block)) {
      t.ensureBlock(block);
      block = block.body;
    }

    if (!t.isBlockStatement(block) && !t.isProgram(block)) {
      block = this.getBlockParent().block;
    }

    block._declarations ||= {};
    block._declarations[opts.key || opts.id.name] = {
      kind: opts.kind || "var",
      id: opts.id,
      init: opts.init
    };
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

  getAllBindingsOfKind(kind: string): Object {
    var ids = object();

    var scope = this;
    do {
      for (var name in scope.bindings) {
        var binding = scope.bindings[name];
        if (binding.kind === kind) ids[name] = binding;
      }
      scope = scope.parent;
    } while (scope);

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

  getBindingInfo(name: string) {
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
    var info = this.getBindingInfo(name);
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

  getOwnImmutableBindingValue(name: string) {
    return this._immutableBindingInfoToValue(this.getOwnBindingInfo(name));
  }

  /**
   * Description
   */

  getImmutableBindingValue(name: string) {
    return this._immutableBindingInfoToValue(this.getBindingInfo(name));
  }

  _immutableBindingInfoToValue(info) {
    if (!info) return;

    // can't guarantee this value is the same
    if (info.reassigned) return;

    var node = info.node;
    if (t.isVariableDeclarator(node)) {
      if (t.isIdentifier(node.id)) {
        node = node.init;
      } else {
        // otherwise it's probably a destructuring like:
        // var { foo } = "foo";
        return;
      }
    }

    if (t.isImmutable(node)) {
      return node;
    }
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
    this.bindings[name] = null;
  }

  /**
   * Description
   */

  removeBinding(name: string) {
    var info = this.getBindingInfo(name);
    if (info) info.scope.removeOwnBinding(name);
  }
}
