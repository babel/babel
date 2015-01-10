var traverse = require("../../traverse");
var util     = require("../../util");
var t        = require("../../types");

exports.ClassDeclaration = function (node, parent, file, scope) {
  return new Class(node, file, scope, true).run();
};

exports.ClassExpression = function (node, parent, file, scope) {
  return new Class(node, file, scope, false).run();
};

/**
 * Description
 *
 * @param {Node} node
 * @param {File} file
 * @param {Scope} scope
 * @param {Boolean} closure
 */

function Class(node, file, scope, isStatement) {
  this.isStatement = isStatement;
  this.scope       = scope;
  this.node        = node;
  this.file        = file;

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

  var closureArgs = [];
  var closureParams = [];

  //

  if (superName) {
    closureArgs.push(superName);

    if (!t.isIdentifier(superName)) {
      var superRef = this.scope.generateUidBasedOnNode(superName, this.file);
      body.unshift(t.variableDeclaration("var", [
        t.variableDeclarator(superRef, superName)
      ]));
      superName = superRef;
    }

    closureParams.push(superName);

    this.superName = superName;
    body.push(t.expressionStatement(t.callExpression(file.addHelper("inherits"), [className, superName])));
  }

  this.buildBody();

  t.inheritsComments(body[0], this.node);

  var init;

  if (body.length === 1) {
    // only a constructor so no need for a closure container
    init = constructor;
  } else {
    body.push(t.returnStatement(className));
    init = t.callExpression(
      t.functionExpression(null, closureParams, t.blockStatement(body)),
      closureArgs
    );
  }

  if (this.isStatement) {
    return t.variableDeclaration("let", [
      t.variableDeclarator(className, init)
    ]);
  } else {
    return init;
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
      CLASS_NAME: className
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
      t.callExpression(this.file.addHelper("prototype-properties"), args)
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
    util.pushMutatorMap(mutatorMap, methodName, kind, node.computed, node);
  }
};

/**
 * Gets a node representing the super class value of the named property.
 *
 * @example
 *
 *   _get(Object.getPrototypeOf(CLASS.prototype), "METHOD", this)
 *
 * @param {Node} property
 * @param {boolean} isStatic
 * @param {boolean} isComputed
 *
 * @returns {Node}
 */

Class.prototype.superProperty = function (property, isStatic, isComputed) {
  return t.callExpression(
    this.file.addHelper("get"),
    [
      t.callExpression(
        t.memberExpression(t.identifier("Object"), t.identifier("getPrototypeOf")),
        [
          isStatic ? this.className : t.memberExpression(this.className, t.identifier("prototype"))
        ]
      ),
      isComputed ? property : t.literal(property.name), t.thisExpression()
    ]
  );
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
      var property;
      var computed;
      var args;

      if (t.isIdentifier(node, { name: "super" })) {
        if (!(t.isMemberExpression(parent) && !parent.computed && parent.property === node)) {
          throw self.file.errorWithNode(node, "illegal use of bare super");
        }
      } else if (t.isCallExpression(node)) {
        var callee = node.callee;
        if (t.isIdentifier(callee) && callee.name === "super") {
          // super(); -> _get(Object.getPrototypeOf(ClassName), "MethodName", this).call(this);
          property = methodNode.key;
          computed = methodNode.computed;
          args = node.arguments;
        } else {
          if (!t.isMemberExpression(callee)) return;
          if (callee.object.name !== "super") return;

          // super.test(); -> _get(Object.getPrototypeOf(ClassName.prototype), "test", this).call(this);
          property = callee.property;
          computed = callee.computed;
          args = node.arguments;
        }
      } else if (t.isMemberExpression(node)) {
        if (!t.isIdentifier(node.object, { name: "super" })) return;

        // super.name; -> _get(Object.getPrototypeOf(ClassName.prototype), "name", this);
        property = node.property;
        computed = node.computed;
      }

      if (property) {
        var superProperty = self.superProperty(property, methodNode.static, computed);
        if (args) {
          return t.callExpression(
            t.memberExpression(superProperty, t.identifier("call"), false),
            [t.thisExpression()].concat(args)
          );
        } else {
          return superProperty;
        }
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
