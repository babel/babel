var traverse = require("../../traverse");
var util     = require("../../util");
var t        = require("../../types");
var _        = require("lodash");

exports.ClassDeclaration = function (node, parent, file, scope) {
  return t.variableDeclaration("var", [
    t.variableDeclarator(node.id, new Class(node, file, scope).run())
  ]);
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

  this.hasConstructor = false;

  this.className = node.id || t.identifier(file.generateUid("class", scope));
  this.superName = node.superClass;
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
      superClassCallee   = superName = t.identifier(file.generateUid("ref", this.scope));
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

  var instanceMutatorMap = {};
  var staticMutatorMap   = {};

  _.each(classBody, function (node) {
    var methodName = node.key;
    var method     = node.value;

    self.replaceInstanceSuperReferences(node);

    if (node.key.name === "constructor") {
      if (node.kind === "") {
        self.addConstructor(method);
      } else {
        throw self.file.errorWithNode(node, "illegal kind for constructor method");
      }
    } else {
      var mutatorMap = instanceMutatorMap;
      if (node.static) mutatorMap = staticMutatorMap;

      var kind = node.kind;

      if (kind === "") {
        kind = "value";
        util.pushMutatorMap(mutatorMap, methodName, "writable", t.identifier("true"));
      }

      util.pushMutatorMap(mutatorMap, methodName, kind, node);
    }
  });

  if (!this.hasConstructor && superName) {
    constructor.body.body.push(util.template("class-super-constructor-call", {
      SUPER_NAME: superName
    }, true));
  }

  var instanceProps;
  var staticProps;

  if (!_.isEmpty(instanceMutatorMap)) {
    var protoId = util.template("prototype-identifier", {
      CLASS_NAME: className
    });

    instanceProps = util.buildDefineProperties(instanceMutatorMap, protoId);
  }

  if (!_.isEmpty(staticMutatorMap)) {
    staticProps = util.buildDefineProperties(staticMutatorMap, className);
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
 * Description
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
 * Description
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

      //  super.test(); -> ClassName.prototype.MethodName.call(this);
      callee.property.name = callee.property.name + ".call";
      node.arguments.unshift(t.thisExpression());
    }
  });
};

/**
 * Description
 */

Class.prototype.addConstructor = function (method) {
  this.hasConstructor = true;

  var construct = this.constructor;
  t.inherits(construct, method);

  construct.defaults = method.defaults;
  construct.params   = method.params;
  construct.body     = method.body;
  construct.rest     = method.rest;
};
