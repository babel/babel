"use strict";

var ReplaceSupers = require("../../helpers/replace-supers");
var nameMethod    = require("../../helpers/name-method");
var defineMap     = require("../../helpers/define-map");
var messages      = require("../../../messages");
var util          = require("../../../util");
var t             = require("../../../types");

exports.check = t.isClass;

exports.ClassDeclaration = function (node, parent, scope, file) {
  return new ClassTransformer(node, file, scope, true).run();
};

exports.ClassExpression = function (node, parent, scope, file) {
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

  return new ClassTransformer(node, file, scope, false).run();
};

/**
 * Description
 *
 * @param {Node} node
 * @param {File} file
 * @param {Scope} scope
 * @param {Boolean} isStatement
 */

function ClassTransformer(node, file, scope, isStatement) {
  this.isStatement = isStatement;
  this.scope       = scope;
  this.node        = node;
  this.file        = file;

  this.hasInstanceMutators = false;
  this.hasStaticMutators   = false;

  this.instanceMutatorMap = {};
  this.staticMutatorMap   = {};
  this.hasConstructor     = false;
  this.className          = node.id || scope.generateUidIdentifier("class");
  this.superName          = node.superClass || t.identifier("Function");
  this.hasSuper           = !!node.superClass;
  this.isLoose            = file.isLoose("es6.classes");
}

/**
 * Description
 *
 * @returns {Array}
 */

ClassTransformer.prototype.run = function () {
  var superName = this.superName;
  var className = this.className;
  var file      = this.file;

  //

  var body = this.body = [];

  var constructorBody = t.blockStatement([
    t.expressionStatement(t.callExpression(file.addHelper("class-call-check"), [
      t.thisExpression(),
      className
    ]))
  ]);
  var constructor;

  if (this.node.id) {
    constructor = t.functionDeclaration(className, [], constructorBody);
    body.push(constructor);
  } else {
    constructor = t.functionExpression(null, [], constructorBody);
    body.push(t.variableDeclaration("var", [
      t.variableDeclarator(className, constructor)
    ]));
  }
  this.constructor = constructor;

  var closureParams = [];
  var closureArgs = [];

  //

  if (this.hasSuper) {
    closureArgs.push(superName);

    if (!t.isIdentifier(superName)) {
      superName = this.scope.generateUidBasedOnNode(superName, this.file);
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

ClassTransformer.prototype.buildBody = function () {
  var constructor = this.constructor;
  var className   = this.className;
  var superName   = this.superName;
  var classBody   = this.node.body.body;
  var body        = this.body;

  for (var i = 0; i < classBody.length; i++) {
    var node = classBody[i];
    if (t.isMethodDefinition(node)) {
      var replaceSupers = new ReplaceSupers({
        methodNode: node,
        className:  this.className,
        superName:  this.superName,
        isStatic:   node.static,
        isLoose:    this.isLoose,
        scope:      this.scope,
        file:       this.file
      }, true);
      replaceSupers.replace();

      if ((!node.computed && t.isIdentifier(node.key, { name: "constructor" })) || t.isLiteral(node.key, { value: "constructor" })) {
        this.pushConstructor(node);
      } else {
        this.pushMethod(node);
      }
    } else if (t.isPrivateDeclaration(node)) {
      this.closure = true;
      body.unshift(node);
    } else if (t.isClassProperty(node)) {
      this.pushProperty(node);
    }
  }

  // we have no constructor, we have a super, and the super doesn't appear to be falsy
  if (!this.hasConstructor && this.hasSuper && !t.isFalsyExpression(superName)) {
    var helperName = "class-super-constructor-call";
    if (this.isLoose) helperName += "-loose";
    constructor.body.body.push(util.template(helperName, {
      CLASS_NAME: className,
      SUPER_NAME: this.superName
    }, true));
  }

  var instanceProps;
  var staticProps;

  if (this.hasInstanceMutators) {
    instanceProps = defineMap.build(this.instanceMutatorMap);
  }

  if (this.hasStaticMutators) {
    staticProps = defineMap.build(this.staticMutatorMap);
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
 * Push a method to its respective mutatorMap.
 *
 * @param {Node} node MethodDefinition
 */

ClassTransformer.prototype.pushMethod = function (node) {
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

  defineMap.push(mutatorMap, methodName, kind, node.computed, node);
  defineMap.push(mutatorMap, methodName, "enumerable", node.computed, false);
};

/**
 * Description
 *
 * @param {Node} node
 */

ClassTransformer.prototype.pushProperty = function (node) {
  if (!node.value) return;

  var key;

  if (node.static) {
    key = t.memberExpression(this.className, node.key);
    this.body.push(
      t.expressionStatement(t.assignmentExpression("=", key, node.value))
    );
  } else {
    key = t.memberExpression(t.thisExpression(), node.key);
    this.constructor.body.body.unshift(
      t.expressionStatement(t.assignmentExpression("=", key, node.value))
    );
  }
};

/**
 * Replace the constructor body of our class.
 *
 * @param {Node} method MethodDefinition
 */

ClassTransformer.prototype.pushConstructor = function (method) {
  if (method.kind) {
    throw this.file.errorWithNode(method, messages.get("classesIllegalConstructorKind"));
  }

  var construct = this.constructor;
  var fn        = method.value;

  this.hasConstructor = true;

  t.inherits(construct, fn);
  t.inheritsComments(construct, method);

  construct._ignoreUserWhitespace = true;
  construct.params                = fn.params;
  construct.body.body             = construct.body.body.concat(fn.body.body);
};
