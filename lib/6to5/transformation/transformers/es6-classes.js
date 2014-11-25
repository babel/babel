var traverse = require("../../traverse");
var util     = require("../../util");
var t        = require("../../types");
var _        = require("lodash");

exports.ClassDeclaration = function (node, parent, file, scope) {
  var built = new Class(node, file, scope).run();

  var declar = t.variableDeclaration("let", [
    t.variableDeclarator(node.id, built)
  ]);
  t.inheritsComments(declar, node);
  return declar;
};

exports.ClassExpression = function (node, parent, file, scope) {
  return new Class(node, file, scope).run();
};

var getMemberExpressionObject = function (node) {
  while (t.isMemberExpression(node)) {
    node = node.object;
  }
  return node;
};

/**
 * Description
 *
 * @param {Node} node
 * @param {File} file
 * @param {Scope} scope
 */

function Class(node, file, scope) {
  this.scope = scope;
  this.node  = node;
  this.file  = file;

  this.instanceMutatorMap = {};
  this.staticMutatorMap   = {};
  this.hasConstructor     = false;
  this.className          = node.id || file.generateUidIdentifier("class", scope);
  this.superName          = node.superClass;
}

/**
 * Description
 *
 * @returns {Array}
 */

Class.prototype.run = function () {
  var superClassArgument = this.superName;
  var superClassCallee   = this.superName;
  var superName          = this.superName;
  var className          = this.className;
  var file               = this.file;

  if (superName) {
    if (t.isMemberExpression(superName)) {
      superClassArgument = superClassCallee = getMemberExpressionObject(superName);
    } else if (!t.isIdentifier(superName)) {
      superClassArgument = superName;
      superClassCallee   = superName = file.generateUidIdentifier("ref", this.scope);
    }
  }

  this.superName = superName;

  var container = util.template("class", {
    CLASS_NAME: className
  });

  var block       = container.callee.expression.body;
  var body        = this.body = block.body;
  var constructor = this.constructor = body[0].declarations[0].init;

  if (this.node.id) constructor.id = className;

  var returnStatement = body.pop();

  if (superName) {
    body.push(t.expressionStatement(t.callExpression(file.addDeclaration("extends"), [className, superName])));

    container.arguments.push(superClassArgument);
    container.callee.expression.params.push(superClassCallee);
  }

  this.buildBody();

  if (body.length === 1) {
    // only a constructor so no need for a closure container
    return constructor;
  } else {
    body.push(returnStatement);
    return container;
  }
};

/**
 * Description
 */

Class.prototype.buildBody = function () {
  var constructor = this.constructor;
  var className   = this.className;
  var superName   = this.superName;
  var classBody   = this.node.body.body;
  var body        = this.body;
  var self        = this;

  _.each(classBody, function (node) {
    self.replaceInstanceSuperReferences(node);

    if (node.key.name === "constructor") {
      self.pushConstructor(node);
    } else {
      self.pushMethod(node);
    }
  });

  if (!this.hasConstructor && superName) {
    constructor.body.body.push(util.template("class-super-constructor-call", {
      SUPER_NAME: superName
    }, true));
  }

  var instanceProps;
  var staticProps;

  if (!_.isEmpty(this.instanceMutatorMap)) {
    var protoId = util.template("prototype-identifier", {
      CLASS_NAME: className
    });

    instanceProps = util.buildDefineProperties(this.instanceMutatorMap, protoId);
  }

  if (!_.isEmpty(this.staticMutatorMap)) {
    staticProps = util.buildDefineProperties(this.staticMutatorMap, className);
  }

  if (instanceProps || staticProps) {
    staticProps = staticProps || t.literal(null);

    var args = [className, staticProps];
    if (instanceProps) args.push(instanceProps);

    body.push(t.expressionStatement(
      t.callExpression(this.file.addDeclaration("class-props"), args)
    ));
  }
};

/**
 * Push a method to it's respective mutatorMap.
 *
 * @param {Node} node MethodDefinition
 */

Class.prototype.pushMethod = function (node) {
  var methodName = node.key;

  var mutatorMap = this.instanceMutatorMap;
  if (node.static) mutatorMap = this.staticMutatorMap;

  var kind = node.kind;

  if (kind === "") {
    kind = "value";
    util.pushMutatorMap(mutatorMap, methodName, "writable", t.identifier("true"));
  }

  util.pushMutatorMap(mutatorMap, methodName, kind, node);
};

/**
 * Given a `methodNode`, produce a `MemberExpression` super class reference.
 *
 * @param {Node} methodNode MethodDefinition
 * @param {Node} node Identifier
 * @param {Node} parent
 *
 * @returns {Node}
 */

Class.prototype.superIdentifier = function (methodNode, id, parent) {
  var methodName = methodNode.key;
  var superName  = this.superName || t.identifier("Function");

  if (parent.property === id) {
    return;
  } else if (t.isCallExpression(parent, { callee: id })) {
    // super(); -> ClassName.prototype.MethodName.call(this);
    parent.arguments.unshift(t.thisExpression());

    if (methodName.name === "constructor") {
      // constructor() { super(); }
      return t.memberExpression(superName, t.identifier("call"));
    } else {
      id = superName;

      // foo() { super(); }
      if (!methodNode.static) {
        id = t.memberExpression(id, t.identifier("prototype"));
      }

      id = t.memberExpression(id, methodName, methodNode.computed);
      return t.memberExpression(id, t.identifier("call"));
    }
  } else if (t.isMemberExpression(parent) && !methodNode.static) {
    // super.test -> ClassName.prototype.test
    return t.memberExpression(superName, t.identifier("prototype"));
  } else {
    return superName;
  }
};

/**
 * Replace all `super` references with a reference to our `superClass`.
 *
 * @param {Node} methodNode MethodDefinition
 */

Class.prototype.replaceInstanceSuperReferences = function (methodNode) {
  var method = methodNode.value;
  var self = this;

  traverse(method, function (node, parent) {
    if (t.isIdentifier(node, { name: "super" })) {
      return self.superIdentifier(methodNode, node, parent);
    } else if (t.isCallExpression(node)) {
      var callee = node.callee;
      if (!t.isMemberExpression(callee)) return;
      if (callee.object.name !== "super") return;

      // super.test(); -> ClassName.prototype.MethodName.call(this);
      callee.property = t.memberExpression(callee.property, t.identifier("call"));
      node.arguments.unshift(t.thisExpression());
    }
  });
};

/**
 * Replace the constructor body of our class.
 *
 * @param {Node} method MethodDefinition
 */

Class.prototype.pushConstructor = function (method) {
  if (method.kind !== "") {
    throw this.file.errorWithNode(method, "illegal kind for constructor method");
  }

  var construct = this.constructor;
  var fn        = method.value;

  this.hasConstructor = true;
  t.inherits(construct, fn);
  t.inheritsComments(construct, method);

  construct.defaults = fn.defaults;
  construct.params   = fn.params;
  construct.body     = fn.body;
  construct.rest     = fn.rest;
};
