var nameMethod = require("../helpers/name-method");
var traverse   = require("../../traverse");
var util       = require("../../util");
var t          = require("../../types");

exports.ClassDeclaration = function (node, parent, file, scope) {
  return new Class(node, file, scope, true).run();
};

exports.ClassExpression = function (node, parent, file, scope) {
  if (!node.id) {
    if (t.isProperty(parent) && parent.value === node && !parent.computed && t.isIdentifier(parent.key)) {
      // var o = { foo: class {} };
      node.id = parent.key;
    }

    if (t.isVariableDeclarator(parent) && t.isIdentifier(parent.id)) {
      // var foo = class {};
      node.id = parent.id;
    }
  }

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
  this.isLoose            = file.isLoose("classes");
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

  var constructor;
  if (this.node.id) {
    constructor = t.functionDeclaration(className, [], t.blockStatement([]));
    body.push(constructor);
  } else {
    constructor = t.functionExpression(null, [], t.blockStatement([]));
    body.push(t.variableDeclaration("var", [
      t.variableDeclarator(className, constructor)
    ]));
  }
  this.constructor = constructor;

  var closureParams = [];
  var closureArgs = [];

  //

  if (superName) {
    closureArgs.push(superName);

    if (!t.isIdentifier(superName)) {
      var superRef = this.scope.generateUidBasedOnNode(superName, this.file);
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
    init = t.toExpression(constructor);
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

  for (var i in classBody) {
    var node = classBody[i];
    if (t.isMethodDefinition(node)) {
      this.replaceSuperReferences(node);

      if (node.key.name === "constructor") {
        this.pushConstructor(node);
      } else {
        this.pushMethod(node);
      }
    } else if (t.isPrivateDeclaration(node)) {
      this.closure = true;
      body.unshift(node);
    }
  }

  // we have no constructor, we have a super, and the super doesn't appear to be falsy
  if (!this.hasConstructor && superName && !t.isFalsyExpression(superName)) {
    var defaultConstructorTemplate = "class-super-constructor-call";
    if (this.isLoose) defaultConstructorTemplate += "-loose";

    constructor.body.body.push(util.template(defaultConstructorTemplate, {
      CLASS_NAME: className,
      SUPER_NAME: this.superName
    }, true));
  }

  var instanceProps;
  var staticProps;

  if (this.hasInstanceMutators) {
    instanceProps = util.buildDefineProperties(this.instanceMutatorMap);
  }

  if (this.hasStaticMutators) {
    staticProps = util.buildDefineProperties(this.staticMutatorMap);
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
    nameMethod(node, this.file, this.scope);

    if (this.isLoose) {
      // use assignments instead of define properties for loose classes

      var className = this.className;
      if (!node.static) className = t.memberExpression(className, t.identifier("prototype"));
      methodName = t.memberExpression(className, methodName, node.computed);

      var expr = t.expressionStatement(t.assignmentExpression("=", methodName, node.value));
      t.inheritsComments(expr, node);
      this.body.push(expr);
      return;
    }

    kind = "value";
  }

  var mutatorMap = this.instanceMutatorMap;
  if (node.static) {
    this.hasStaticMutators = true;
    mutatorMap = this.staticMutatorMap;
  } else {
    this.hasInstanceMutators = true;
  }

  util.pushMutatorMap(mutatorMap, methodName, kind, node.computed, node);
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

Class.prototype.superProperty = function (property, isStatic, isComputed, thisExpression) {
  return t.callExpression(
    this.file.addHelper("get"),
    [
      t.callExpression(
        t.memberExpression(t.identifier("Object"), t.identifier("getPrototypeOf")),
        [
          isStatic ? this.className : t.memberExpression(this.className, t.identifier("prototype"))
        ]
      ),
      isComputed ? property : t.literal(property.name),
      thisExpression
    ]
  );
};

/**
 * Description
 *
 * @param {Object} node
 * @param {Object} id
 * @param {Object} parent
 * @returns {Object}
 */

Class.prototype.looseSuperProperty = function (methodNode, id, parent) {
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

Class.prototype.replaceSuperReferences = function (methodNode) {
  var method = methodNode.value;
  var self   = this;

  var topLevelThisReference;

  traverseLevel(method, true);

  if (topLevelThisReference) {
    method.body.body.unshift(t.variableDeclaration("var", [
      t.variableDeclarator(topLevelThisReference, t.thisExpression())
    ]));
  }

  function traverseLevel(node, topLevel) {
    traverse(node, {
      enter: function (node, parent) {
        if (t.isFunction(node) && !t.isArrowFunctionExpression(node)) {
          // we need to call traverseLevel again so we're context aware
          traverseLevel(node, false);
          return this.skip();
        }

        if (t.isProperty(node, { method: true }) || t.isMethodDefinition(node)) {
          // break on object methods
          return this.skip();
        }

        var getThisReference = function () {
          if (topLevel) {
            // top level so `this` is the instance
            return t.thisExpression();
          } else {
            // not in the top level so we need to create a reference
            return topLevelThisReference = topLevelThisReference || self.file.generateUidIdentifier("this");
          }
        };

        var callback = specHandle;
        if (self.isLoose) callback = looseHandle;
        return callback(getThisReference, node, parent);
      }
    });
  }

  function looseHandle(getThisReference, node, parent) {
    if (t.isIdentifier(node, { name: "super" })) {
      return self.looseSuperProperty(methodNode, node, parent);
    } else if (t.isCallExpression(node)) {
      var callee = node.callee;
      if (!t.isMemberExpression(callee)) return;
      if (callee.object.name !== "super") return;

      // super.test(); -> ClassName.prototype.MethodName.call(this);
      t.appendToMemberExpression(callee, t.identifier("call"));
      node.arguments.unshift(getThisReference());
    }
  }

  function specHandle(getThisReference, node, parent) {
    var property;
    var computed;
    var args;

    if (t.isIdentifier(node, { name: "super" })) {
      if (!(t.isMemberExpression(parent) && !parent.computed && parent.property === node)) {
        throw self.file.errorWithNode(node, "illegal use of bare super");
      }
    } else if (t.isCallExpression(node)) {
      var callee = node.callee;
      if (t.isIdentifier(callee, { name: "super" })) {
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

    if (!property) return;

    var thisReference = getThisReference();
    var superProperty = self.superProperty(property, methodNode.static, computed, thisReference);
    if (args) {
      if (args.length === 1 && t.isSpreadElement(args[0])) {
        // super(...arguments);
        return t.callExpression(
          t.memberExpression(superProperty, t.identifier("apply")),
          [thisReference, args[0].argument]
        );
      } else {
        return t.callExpression(
          t.memberExpression(superProperty, t.identifier("call")),
          [thisReference].concat(args)
        );
      }
    } else {
      return superProperty;
    }
  }
};

/**
 * Replace the constructor body of our class.
 *
 * @param {Node} method MethodDefinition
 */

Class.prototype.pushConstructor = function (method) {
  if (method.kind) {
    throw this.file.errorWithNode(method, "illegal kind for constructor method");
  }

  var construct = this.constructor;
  var fn        = method.value;

  this.hasConstructor = true;

  t.inherits(construct, fn);
  t.inheritsComments(construct, method);

  construct._ignoreUserWhitespace = true;
  construct.defaults              = fn.defaults;
  construct.params                = fn.params;
  construct.body                  = fn.body;
  construct.rest                  = fn.rest;
};
