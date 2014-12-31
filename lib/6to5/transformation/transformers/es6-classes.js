var traverse = require("../../traverse");
var util     = require("../../util");
var t        = require("../../types");

exports.ClassDeclaration = function (node, parent, file, scope) {
  var closure = true;
  if (t.isProgram(parent) || t.isBlockStatement(parent)) {
    closure = false;
  }

  var factory = new Class(node, file, scope, closure);
  var newNode = factory.run();
  if (factory.closure) {
    if (closure) {
      // declaration in an expression context...
      // export default class Foo {}
      scope.push({
        kind: "var",
        key: node.id.key,
        id: node.id
      });
      return t.assignmentExpression("=", node.id, newNode);
    } else {
      // likely has a PrivateDeclaration etc
      return t.variableDeclaration("let", [
        t.variableDeclarator(node.id, newNode)
      ]);
    }
  } else {
    return newNode;
  }
};

exports.ClassExpression = function (node, parent, file, scope) {
  return new Class(node, file, scope, true).run();
};

/**
 * Description
 *
 * @param {Node} node
 * @param {File} file
 * @param {Scope} scope
 * @param {Boolean} closure
 */

function Class(node, file, scope, closure) {
  this.closure = closure;
  this.scope   = scope;
  this.node    = node;
  this.file    = file;

  this.hasInstanceMutators = false;
  this.hasStaticMutators   = false;

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
  var superName = this.superName;
  var className = this.className;
  var file      = this.file;

  //

  var body = this.body = [];

  var constructor = t.functionExpression(null, [], t.blockStatement([]));
  if (this.node.id) constructor.id = className;
  this.constructor = constructor;

  body.push(t.variableDeclaration("let", [
    t.variableDeclarator(className, constructor)
  ]));

  //

  if (superName && t.isDynamic(superName)) {
    // so we're only evaluating it once
    var superRefName = "super";
    if (className) superRefName = className.name + "Super";

    var superRef = file.generateUidIdentifier(superRefName, this.scope);
    body.unshift(t.variableDeclaration("var", [
      t.variableDeclarator(superRef, superName)
    ]));
    superName = superRef;
  }

  this.superName = superName;

  //

  if (superName) {
    this.closure = true;
    body.push(t.expressionStatement(t.callExpression(file.addDeclaration("inherits"), [className, superName])));
  }

  this.buildBody();

  t.inheritsComments(body[0], this.node);

  if (this.closure) {
    if (body.length === 1) {
      // only a constructor so no need for a closure container
      return constructor;
    } else {
      body.push(t.returnStatement(className));
      return t.callExpression(
        t.functionExpression(null, [], t.blockStatement(body)),
        []
      );
    }
  } else {
    return body;
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

  for (var i in classBody) {
    var node = classBody[i];
    if (t.isMethodDefinition(node)) {
      self.replaceInstanceSuperReferences(node);

      if (node.key.name === "constructor") {
        self.pushConstructor(node);
      } else {
        self.pushMethod(node);
      }
    } else if (t.isPrivateDeclaration(node)) {
      self.closure = true;
      body.unshift(node);
    }
  }

  if (!this.hasConstructor && superName && !t.isFalsyExpression(superName)) {
    constructor.body.body.push(util.template("class-super-constructor-call", {
      SUPER_NAME: superName
    }, true));
  }

  var instanceProps;
  var staticProps;

  if (this.hasInstanceMutators) {
    var protoId = util.template("prototype-identifier", {
      CLASS_NAME: className
    });

    instanceProps = util.buildDefineProperties(this.instanceMutatorMap, protoId);
  }

  if (this.hasStaticMutators) {
    staticProps = util.buildDefineProperties(this.staticMutatorMap, className);
  }

  if (instanceProps || staticProps) {
    staticProps = staticProps || t.literal(null);

    var args = [className, staticProps];
    if (instanceProps) args.push(instanceProps);

    body.push(t.expressionStatement(
      t.callExpression(this.file.addDeclaration("prototype-properties"), args)
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

  var kind = node.kind;

  if (kind === "") {
    // method

    var className = this.className;
    if (!node.static) className = t.memberExpression(className, t.identifier("prototype"));
    methodName = t.memberExpression(className, methodName, node.computed);

    var expr = t.expressionStatement(t.assignmentExpression("=", methodName, node.value));
    t.inheritsComments(expr, node);
    this.body.push(expr);
  } else {
    // mutator
    var mutatorMap = this.instanceMutatorMap;
    if (node.static) {
      this.hasStaticMutators = true;
      mutatorMap = this.staticMutatorMap;
    } else {
      this.hasInstanceMutators = true;
    }
    util.pushMutatorMap(mutatorMap, methodName, kind, node);
  }
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

  traverse(method, {
    enter: function (node, parent) {
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
