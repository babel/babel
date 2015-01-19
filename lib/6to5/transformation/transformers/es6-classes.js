"use strict";

var ReplaceSupers = require("../helpers/replace-supers");
var nameMethod    = require("../helpers/name-method");
var util          = require("../../util");
var t             = require("../../types");

exports.ClassDeclaration = function (node, parent, scope, context, file) {
  return new Class(node, file, scope, true).run();
};

exports.ClassExpression = function (node, parent, scope, context, file) {
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

  for (var i = 0; i < classBody.length; i++) {
    var node = classBody[i];
    if (t.isMethodDefinition(node)) {
      var replaceSupers = new ReplaceSupers(node, this.className, this.superName, this.isLoose, this.file);
      replaceSupers.replace();

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
    nameMethod.property(node, this.file, this.scope);

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
