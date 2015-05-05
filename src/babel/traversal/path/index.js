import PathHoister from "./hoister";
import * as virtualTypes from "./virtual-types";
import isBoolean from "lodash/lang/isBoolean";
import isNumber from "lodash/lang/isNumber";
import isRegExp from "lodash/lang/isRegExp";
import isString from "lodash/lang/isString";
import codeFrame from "../../helpers/code-frame";
import parse from "../../helpers/parse";
import { explode } from "../visitors";
import traverse from "../index";
import includes from "lodash/collection/includes";
import assign from "lodash/object/assign";
import extend from "lodash/object/extend";
import Scope from "../scope";
import * as t from "../../types";

var hoistVariablesVisitor = explode({
  Function() {
    this.skip();
  },

  VariableDeclaration(node, parent, scope) {
    if (node.kind !== "var") return;

      var bindings = this.getBindingIdentifiers();
    for (var key in bindings) {
      scope.push({ id: bindings[key] });
    }

    var exprs = [];

    for (var i = 0; i < node.declarations.length; i++) {
      var declar = node.declarations[i];
      if (declar.init) {
        exprs.push(t.expressionStatement(
          t.assignmentExpression("=", declar.id, declar.init)
        ));
      }
    }

    return exprs;
  }
});

export default class TraversalPath {
  constructor(parent, container) {
    this.container = container;
    this.parent    = parent;
    this.data      = {};
  }

  /**
   * Description
   */

  static get(parentPath: TraversalPath, context?: TraversalContext, parent, container, key, file?: File) {
    var targetNode = container[key];
    var paths = container._paths = container._paths || [];
    var path;

    for (var i = 0; i < paths.length; i++) {
      var pathCheck = paths[i];
      if (pathCheck.node === targetNode) {
        path = pathCheck;
        break;
      }
    }

    if (!path) {
      path = new TraversalPath(parent, container);
      paths.push(path);
    }

    path.setContext(parentPath, context, key, file);

    return path;
  }

  /**
   * Description
   */

  static getScope(path: TraversalPath, scope: Scope, file?: File) {
    var ourScope = scope;

    // we're entering a new scope so let's construct it!
    if (path.isScope()) {
      ourScope = new Scope(path, scope, file);
    }

    return ourScope;
  }

  /**
   * Description
   */

  getAncestry() {
    var ancestry = [];

    var path = this.parentPath;
    while (path) {
      ancestry.push(path.node);
      path = path.parentPath;
    }

    return ancestry;
  }

  /**
   * Description
   */

  queueNode(path) {
    if (this.context) {
      this.context.queue.push(path);
    }
  }

  /**
   * Description
   */

  insertBefore(nodes) {
    nodes = this._verifyNodeList(nodes);

    if (this.parentPath.isExpressionStatement() || this.parentPath.isLabeledStatement()) {
      return this.parentPath.insertBefore(nodes);
    } else if (this.isPreviousType("Expression") || (this.parentPath.isForStatement() && this.key === "init")) {
      if (this.node) nodes.push(this.node);
      this.replaceExpressionWithStatements(nodes);
    } else if (this.isPreviousType("Statement") || !this.type) {
      this._maybePopFromStatements(nodes);
      if (Array.isArray(this.container)) {
        this._containerInsertBefore(nodes);
      } else if (this.isStatementOrBlock()) {
        if (this.node) nodes.push(this.node);
        this.container[this.key] = t.blockStatement(nodes);
        this.checkSelf();
      } else {
        throw new Error("We don't know what to do with this node type. We were previously a Statement but we can't fit in here?");
      }
    } else {
      throw new Error("No clue what to do with this node type.");
    }
  }

  _containerInsert(from, nodes) {
    this.updateSiblingKeys(from, nodes.length);

    var paths = [];

    for (var i = 0; i < nodes.length; i++) {
      var to = from + i;
      var node = nodes[i];
      this.container.splice(to, 0, node);

      if (this.context) {
        var path = this.context.create(this.parent, this.container, to);
        paths.push(path);
        this.queueNode(path);
      } else {
        paths.push(TraversalPath.get(this, null, node, this.container, to));
      }
    }

    this.checkPaths(paths);
  }

  _containerInsertBefore(nodes) {
    this._containerInsert(this.key, nodes);
  }

  _containerInsertAfter(nodes) {
    this._containerInsert(this.key + 1, nodes);
  }

  _maybePopFromStatements(nodes) {
    var last = nodes[nodes.length - 1];
    if (t.isExpressionStatement(last) && t.isIdentifier(last.expression) && !this.isCompletionRecord()) {
      nodes.pop();
    }
  }

  /**
   * Description
   */

  isCompletionRecord() {
    var path = this;

    do {
      var container = path.container;
      if (Array.isArray(container) && path.key !== container.length - 1) {
        return false;
      }
    } while (path = path.parentPath && !path.isProgram());

    return true;
  }

  /**
   * Description
   */

  isStatementOrBlock() {
    if (t.isLabeledStatement(this.parent) || t.isBlockStatement(this.container)) {
      return false;
    } else {
      return includes(t.STATEMENT_OR_BLOCK_KEYS, this.key);
    }
  }

  /**
   * Description
   */

  insertAfter(nodes) {
    nodes = this._verifyNodeList(nodes);

    if (this.parentPath.isExpressionStatement() || this.parentPath.isLabeledStatement()) {
      return this.parentPath.insertAfter(nodes);
    } else if (this.isPreviousType("Expression") || (this.parentPath.isForStatement() && this.key === "init")) {
      if (this.node) {
        var temp = this.scope.generateTemp();
        nodes.unshift(t.expressionStatement(t.assignmentExpression("=", temp, this.node)));
        nodes.push(t.expressionStatement(temp));
      }
      this.replaceExpressionWithStatements(nodes);
    } else if (this.isPreviousType("Statement") || !this.type) {
      this._maybePopFromStatements(nodes);
      if (Array.isArray(this.container)) {
        this._containerInsertAfter(nodes);
      } else if (this.isStatementOrBlock()) {
        if (this.node) nodes.unshift(this.node);
        this.container[this.key] = t.blockStatement(nodes);
        this.checkSelf();
      } else {
        throw new Error("We don't know what to do with this node type. We were previously a Statement but we can't fit in here?");
      }
    } else {
      throw new Error("No clue what to do with this node type.");
    }
  }

  /**
   * Description
   */

  updateSiblingKeys(fromIndex, incrementBy) {
    var paths = this.container._paths;
    for (var i = 0; i < paths.length; i++) {
      let path = paths[i];
      if (path.key >= fromIndex) {
        path.key += incrementBy;
      }
    }
  }

  /**
   * Description
   */

  setData(key, val) {
    return this.data[key] = val;
  }

  /**
   * Description
   */

  getData(key, def) {
    var val = this.data[key];
    if (!val && def) val = this.data[key] = def;
    return val;
  }

  /**
   * Description
   */

  setScope(file?) {
    var target = this.context || this.parentPath;
    this.scope = TraversalPath.getScope(this, target && target.scope, file);
  }

  /**
   * Description
   */

  clearContext() {
    this.context = null;
  }

  /**
   * Description
   */

  setContext(parentPath, context, key, file?) {
    this.shouldSkip = false;
    this.shouldStop = false;
    this.removed    = false;

    this.parentPath = parentPath || this.parentPath;
    this.key        = key;

    if (context) {
      this.context = context;
      this.state   = context.state;
      this.opts    = context.opts;
    }

    this.type = this.node && this.node.type;

    var log = file && this.type === "Program";
    if (log) file.log.debug("Start scope building");
    this.setScope(file);
    if (log) file.log.debug("End scope building");
  }

  _remove() {
    if (Array.isArray(this.container)) {
      this.container.splice(this.key, 1);
      this.updateSiblingKeys(this.key, -1);
    } else {
      this.container[this.key] = null;
    }
  }

  /**
   * Description
   */

  remove() {
    this._remove();
    this.removed = true;

    var parentPath = this.parentPath;
    var parent = this.parent;
    if (!parentPath) return;

    // we've just removed the last declarator of a variable declaration so there's no point in
    // keeping it
    if (parentPath.isVariableDeclaration() && parent.declarations.length === 0) {
      return parentPath.remove();
    }

    // we're the child of an expression statement so we should remove the parent
    if (parentPath.isExpressionStatement()) {
      return parentPath.remove();
    }

    // we've just removed the second element of a sequence expression so let's turn that sequence
    // expression into a regular expression
    if (parentPath.isSequenceExpression() && parent.expressions.length === 1) {
      parentPath.replaceWith(parent.expressions[0]);
    }

    // we're in a binary expression, better remove it and replace it with the last expression
    if (parentPath.isBinary()) {
      if (this.key === "left") {
        parentPath.replaceWith(parent.right);
      } else { // key === "right"
        parentPath.replaceWith(parent.left);
      }
    }
  }

  /**
   * Description
   */

  skip() {
    this.shouldSkip = true;
  }

  /**
   * Description
   */

  stop() {
    this.shouldStop = true;
    this.shouldSkip = true;
  }

  /**
   * Description
   */

  errorWithNode(msg, Error = SyntaxError) {
    var loc = this.node.loc.start;
    var err = new Error(`Line ${loc.line}: ${msg}`);
    err.loc = loc;
    return err;
  }

  get node() {
    if (this.removed) {
      return null;
    } else {
      return this.container[this.key];
    }
  }

  set node(replacement) {
    throw new Error("Don't use `path.node = newNode;`, use `path.replaceWith(newNode)` or `path.replaceWithMultiple([newNode])`");
  }

  /**
   * Description
   */

  replaceInline(nodes) {
    if (Array.isArray(nodes)) {
      if (Array.isArray(this.container)) {
        nodes = this._verifyNodeList(nodes);
        this._containerInsertAfter(nodes);
        return this.remove();
      } else {
        return this.replaceWithMultiple(nodes);
      }
    } else {
      return this.replaceWith(nodes);
    }
  }

  /**
   * Description
   */

  _verifyNodeList(nodes) {
    if (nodes.constructor !== Array) {
      nodes = [nodes];
    }

    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (!node) {
        throw new Error(`Node list has falsy node with the index of ${i}`);
      } else if (typeof node !== "object") {
        throw new Error(`Node list contains a non-object node with the index of ${i}`);
      } else if (!node.type) {
        throw new Error(`Node list contains a node without a type with the index of ${i}`);
      }
    }

    return nodes;
  }

  /**
   * Description
   */

  unshiftContainer(containerKey, nodes) {
    nodes = this._verifyNodeList(nodes);

    // get the first path and insert our nodes before it, if it doesn't exist then it
    // doesn't matter, our nodes will be inserted anyway

    var container = this.node[containerKey];
    var path      = TraversalPath.get(this, null, this.node, container, 0);

    return path.insertBefore(nodes);
  }

  /**
   * Description
   */

  pushContainer(containerKey, nodes) {
    nodes = this._verifyNodeList(nodes);

    // get an invisible path that represents the last node + 1 and replace it with our
    // nodes, effectively inlining it

    var container = this.node[containerKey];
    var i         = container.length;
    var path      = TraversalPath.get(this, null, this.node, container, i);

    return path.replaceWith(nodes, true);
  }

  /**
   * Description
   */

  replaceWithMultiple(nodes: Array<Object>) {
    nodes = this._verifyNodeList(nodes);
    t.inheritsComments(nodes[0], this.node);
    this.container[this.key] = null;
    this.insertAfter(nodes);
    if (!this.node) this.remove();
  }

  /**
   * Description
   */

  replaceWithSourceString(replacement) {
    try {
      replacement = `(${replacement})`;
      replacement = parse(replacement);
    } catch (err) {
      var loc = err.loc;
      if (loc) {
        err.message += " - make sure this is an expression.";
        err.message += "\n" + codeFrame(replacement, loc.line, loc.column + 1);
      }
      throw err;
    }

    replacement = replacement.program.body[0].expression;
    traverse.removeProperties(replacement);
    return this.replaceWith(replacement);
  }

  /**
   * Description
   */

  replaceWith(replacement, whateverAllowed) {
    if (this.removed) {
      throw new Error("You can't replace this node, we've already removed it");
    }

    if (!replacement) {
      throw new Error("You passed `path.replaceWith()` a falsy node, use `path.remove()` instead");
    }

    if (this.node === replacement) {
      return this.checkSelf();
    }

    // normalise inserting an entire AST
    if (t.isProgram(replacement)) {
      replacement = replacement.body;
      whateverAllowed = true;
    }

    if (Array.isArray(replacement)) {
      if (whateverAllowed) {
        return this.replaceWithMultiple(replacement);
      } else {
        throw new Error("Don't use `path.replaceWith()` with an array of nodes, use `path.replaceWithMultiple()`");
      }
    }

    if (typeof replacement === "string") {
      if (whateverAllowed) {
        return this.replaceWithSourceString(replacement);
      } else {
        throw new Error("Don't use `path.replaceWith()` with a string, use `path.replaceWithSourceString()`");
      }
    }

    // replacing a statement with an expression so wrap it in an expression statement
    if (this.isPreviousType("Statement") && t.isExpression(replacement)) {
      replacement = t.expressionStatement(replacement);
    }

    // replacing an expression with a statement so let's explode it
    if (this.isPreviousType("Expression") && t.isStatement(replacement)) {
      return this.replaceExpressionWithStatements([replacement]);
    }

    var oldNode = this.node;
    if (oldNode) t.inheritsComments(replacement, oldNode);

    // replace the node
    this.container[this.key] = replacement;
    this.type = replacement.type;

    // potentially create new scope
    this.setScope();

    this.checkSelf();
  }

  /**
   * Description
   */

  checkSelf() {
    this.checkPaths(this);
  }

  /**
   * Description
   */

  checkPaths(paths) {
    var scope = this.scope;
    var file  = scope && scope.file;
    if (file) file.checkPath(paths);
  }

  /**
   * Description
   */

  getStatementParent(): ?TraversalPath {
    var path = this;

    do {
      if (!path.parentPath || (Array.isArray(path.container) && path.isStatement())) {
        break;
      } else {
        path = path.parentPath;
      }
    } while (path);

    if (path && (path.isProgram() || path.isFile())) {
      throw new Error("File/Program node, we can't possibly find a statement parent to this");
    }

    return path;
  }

  /**
   * Description
   */

  getLastStatements(): Array<TraversalPath> {
    var paths = [];

    var add = function (path) {
      if (path) paths = paths.concat(path.getLastStatements());
    };

    if (this.isIfStatement()) {
      add(this.get("consequent"));
      add(this.get("alternate"));
    } else if (this.isDoExpression()) {
      add(this.get("body"));
    } else if (this.isProgram() || this.isBlockStatement()) {
      add(this.get("body").pop());
    } else {
      paths.push(this);
    }

    return paths;
  }

  /**
   * Description
   */

  replaceExpressionWithStatements(nodes: Array) {
    var toSequenceExpression = t.toSequenceExpression(nodes, this.scope);

    if (toSequenceExpression) {
      return this.replaceWith(toSequenceExpression);
    } else {
      var container = t.functionExpression(null, [], t.blockStatement(nodes));
      container.shadow = true;

      // add implicit returns to all ending expression statements
      var last = this.getLastStatements();
      for (var i = 0; i < last.length; i++) {
        var lastNode = last[i];
        if (lastNode.isExpressionStatement()) {
          lastNode.replaceWith(t.returnStatement(lastNode.node.expression));
        }
      }

      this.replaceWith(t.callExpression(container, []));

      this.traverse(hoistVariablesVisitor);

      return this.node;
    }
  }

  /**
   * Description
   */

  call(key) {
    var node = this.node;
    if (!node) return;

    var opts = this.opts;
    var fns  = [].concat(opts[key]);

    if (opts[node.type]) {
      fns = fns.concat(opts[node.type][key]);
    }

    for (var fn of (fns: Array)) {
      if (!fn) continue;

      // call the function with the params (node, parent, scope, state)
      var replacement = fn.call(this, node, this.parent, this.scope, this.state);
      if (replacement) this.replaceWith(replacement, true);

      if (this.shouldStop) break;
    }
  }

  /**
   * Description
   */

  isBlacklisted(): boolean {
    var blacklist = this.opts.blacklist;
    return blacklist && blacklist.indexOf(this.node.type) > -1;
  }

  /**
   * Description
   */

  visit(): boolean {
    if (this.isBlacklisted()) return false;
    if (this.opts.shouldSkip(this)) return false;

    this.call("enter");

    if (this.shouldSkip) {
      return this.shouldStop;
    }

    var node = this.node;
    var opts = this.opts;

    if (node) {
      if (Array.isArray(node)) {
        // traverse over these replacement nodes we purposely don't call exitNode
        // as the original node has been destroyed
        for (var i = 0; i < node.length; i++) {
          traverse.node(node[i], opts, this.scope, this.state, this);
        }
      } else {
        traverse.node(node, opts, this.scope, this.state, this);
        this.call("exit");
      }
    }

    return this.shouldStop;
  }

  /**
   * Description
   */

  getSibling(key) {
    return TraversalPath.get(this.parentPath, null, this.parent, this.container, key, this.file);
  }

  /**
   * Description
   */

  get(key: string): TraversalPath {
    var parts = key.split(".");
    if (parts.length === 1) { // "foo"
      return this._getKey(key);
    } else { // "foo.bar"
      return this._getPattern(parts);
    }
  }

  /**
   * Description
   */

  _getKey(key) {
    var node      = this.node;
    var container = node[key];

    if (Array.isArray(container)) {
      // requested a container so give them all the paths
      return container.map((_, i) => {
        return TraversalPath.get(this, null, node, container, i);
      });
    } else {
      return TraversalPath.get(this, null, node, node, key);
    }
  }

  /**
   * Description
   */

  _getPattern(parts) {
    var path = this;
    for (var i = 0; i > parts.length; i++) {
      var part = parts[i];
      if (part === ".") {
        path = path.parentPath;
      } else {
        if (Array.isArray(path)) {
          path = path[part];
        } else {
          path = path.get(part);
        }
      }
    }
    return path;
  }

  /**
   * Description
   */

  has(key): boolean {
    var val = this.node[key];
    if (val && Array.isArray(val)) {
      return !!val.length;
    } else {
      return !!val;
    }
  }

  /**
   * Description
   */

  is(key): boolean {
    return this.has(key);
  }

  /**
   * Description
   */

  isnt(key): boolean {
    return !this.has(key);
  }

  /**
   * Description
   */

  getTypeAnnotation(): {
    inferred: boolean;
    annotation: ?Object;
  } {
    if (this.typeInfo) {
      return this.typeInfo;
    }

    var info = this.typeInfo = {
      inferred: false,
      annotation: null
    };

    var type = this.node.typeAnnotation;

    if (!type) {
      info.inferred = true;
      type = this.inferType(this);
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

  resolve(): ?TraversalPath {
    if (this.isVariableDeclarator()) {
      if (this.get("id").isIdentifier()) {
        return this.get("init").resolve();
      } else {
        // otherwise it's a request for a destructuring declarator and i'm not
        // ready to resolve those just yet
      }
    } else if (this.isIdentifier()) {
      var binding = this.scope.getBinding(this.node.name);
      if (!binding || !binding.constant) return;

      // todo: take into consideration infinite recursion #1149
      return;

      if (binding.path === this) {
        return this;
      } else {
        return binding.path.resolve();
      }
    } else if (this.isMemberExpression()) {
      // this is dangerous, as non-direct target assignments will mutate it's state
      // making this resolution inaccurate

      var targetKey = this.toComputedKey();
      if (!t.isLiteral(targetKey)) return;
      var targetName = targetKey.value;

      var target = this.get("object").resolve();
      if (!target || !target.isObjectExpression()) return;

      var props = target.get("properties");
      for (var i = 0; i < props.length; i++) {
        var prop = props[i];
        if (!prop.isProperty()) continue;

        var key = prop.get("key");

        // { foo: obj }
        var match = prop.isnt("computed") && key.isIdentifier({ name: targetName });

        // { "foo": "obj" } or { ["foo"]: "obj" }
        match = match || key.isLiteral({ value: targetName });

        if (match) return prop.get("value");
      }
    } else {
      return this;
    }
  }

  /**
   * Description
   */

  inferType(path: TraversalPath): ?Object {
    path = path.resolve();
    if (!path) return;

    if (path.isRestElement() || path.parentPath.isRestElement() || path.isArrayExpression()) {
      return t.genericTypeAnnotation(t.identifier("Array"));
    }

    if (path.parentPath.isTypeCastExpression()) {
      return path.parentPath.node.typeAnnotation;
    }

    if (path.isTypeCastExpression()) {
      return path.node.typeAnnotation;
    }

    if (path.isObjectExpression()) {
      return t.genericTypeAnnotation(t.identifier("Object"));
    }

    if (path.isFunction()) {
      return t.identifier("Function");
    }

    if (path.isLiteral()) {
      var value = path.node.value;
      if (isString(value)) return t.stringTypeAnnotation();
      if (isNumber(value)) return t.numberTypeAnnotation();
      if (isBoolean(value)) return t.booleanTypeAnnotation();
    }

    if (path.isCallExpression()) {
      var callee = path.get("callee").resolve();
      if (callee && callee.isFunction()) return callee.node.returnType;
    }
  }

  /**
   * Description
   */

  isPreviousType(type: string): boolean {
    return t.isType(this.type, type);
  }

  /**
   * Description
   */

  isTypeGeneric(genericName: string, opts = {}): boolean {
    var typeInfo = this.getTypeAnnotation();
    var type     = typeInfo.annotation;
    if (!type) return false;

    if (type.inferred && opts.inference === false) {
      return false;
    }

    if (!t.isGenericTypeAnnotation(type) || !t.isIdentifier(type.id, { name: genericName })) {
      return false;
    }

    if (opts.requireTypeParameters && !type.typeParameters) {
      return false;
    }

    return true;
  }

  /**
   * Description
   */

  getBindingIdentifiers() {
    return t.getBindingIdentifiers(this.node);
  }

  /**
   * Description
   */

  traverse(visitor, state) {
    traverse(this.node, visitor, this.scope, state, this);
  }

  /**
   * Description
   */

  hoist(scope = this.scope) {
    var hoister = new PathHoister(this, scope);
    return hoister.run();
  }

  /**
   * Match the current node if it matches the provided `pattern`.
   *
   * For example, given the match `React.createClass` it would match the
   * parsed nodes of `React.createClass` and `React["createClass"]`.
   */

  matchesPattern(pattern: string, allowPartial?: boolean): boolean {
   var parts = pattern.split(".");

    // not a member expression
    if (!this.isMemberExpression()) return false;

    var search = [this.node];
    var i = 0;

    function matches(name) {
      var part = parts[i];
      return part === "*" || name === part;
    }

    while (search.length) {
      var node = search.shift();

      if (allowPartial && i === parts.length) {
        return true;
      }

      if (t.isIdentifier(node)) {
        // this part doesn't match
        if (!matches(node.name)) return false;
      } else if (t.isLiteral(node)) {
        // this part doesn't match
        if (!matches(node.value)) return false;
      } else if (t.isMemberExpression(node)) {
        if (node.computed && !t.isLiteral(node.property)) {
          // we can't deal with this
          return false;
        } else {
          search.push(node.object);
          search.push(node.property);
          continue;
        }
      } else {
        // we can't deal with this
        return false;
      }

      // too many parts
      if (++i > parts.length) {
        return false;
      }
    }

    return true;
  }
}

assign(TraversalPath.prototype, require("./evaluation"));
assign(TraversalPath.prototype, require("./conversion"));

for (let type in virtualTypes) {
  if (type[0] === "_") continue;

  TraversalPath.prototype[`is${type}`] = function (opts) {
    return virtualTypes[type].checkPath(this, opts);
  };
}

for (let type of (t.TYPES: Array)) {
  let typeKey = `is${type}`;
  TraversalPath.prototype[typeKey] = function (opts) {
    return t[typeKey](this.node, opts);
  };
}
