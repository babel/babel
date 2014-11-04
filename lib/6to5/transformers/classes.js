var traverse = require("../traverse");
var util     = require("../util");
var t        = require("../types");
var _        = require("lodash");

exports.ClassDeclaration = function (node, parent, file, scope) {
  return t.variableDeclaration("var", [
    t.variableDeclarator(node.id, buildClass(node, file, scope))
  ]);
};

exports.ClassExpression = function (node, parent, file, scope) {
  return buildClass(node, file, scope);
};

var getMemberExpressionObject = function (node) {
  while (t.isMemberExpression(node)) {
    node = node.object;
  }
  return node;
};

var buildClass = function (node, file, scope) {
  var superName = node.superClass;
  var className = node.id || t.identifier(file.generateUid("class", scope));

  var superClassArgument = node.superClass;
  var superClassCallee   = node.superClass;

  if (superName) {
    if (t.isMemberExpression(superName)) {
      superClassArgument = superClassCallee = getMemberExpressionObject(superName);
    } else if (!t.isIdentifier(superName)) {
      superClassArgument = superName;
      superClassCallee   = superName = t.identifier(file.generateUid("ref", scope));
    }
  }

  var container = util.template("class", {
    CLASS_NAME: className
  });

  var block       = container.callee.body;
  var body        = block.body;
  var constructor = body[0].declarations[0].init;

  if (node.id) constructor.id = className;

  var returnStatement = body.pop();

  if (superName) {
    body.push(t.expressionStatement(t.callExpression(file.addDeclaration("extends"), [className, superName])));

    container.arguments.push(superClassArgument);
    container.callee.params.push(superClassCallee);
  }

  buildClassBody({
    file:        file,
    body:        body,
    node:        node,
    className:   className,
    superName:   superName,
    constructor: constructor,
  });

  if (body.length === 1) {
    // only a constructor so no need for a closure container
    return constructor;
  } else {
    body.push(returnStatement);
    return container;
  }
};

var buildClassBody = function (opts) {
  var file        = opts.file;
  var body        = opts.body;
  var node        = opts.node;
  var constructor = opts.constructor;
  var className   = opts.className;
  var superName   = opts.superName;

  var instanceMutatorMap = {};
  var staticMutatorMap   = {};
  var hasConstructor     = false;

  var classBody = node.body.body;

  _.each(classBody, function (node) {
    var methodName = node.key;
    var method     = node.value;

    replaceInstanceSuperReferences(superName, node);

    if (node.key.name === "constructor") {
      if (node.kind === "") {
        hasConstructor = true;
        addConstructor(constructor, method);
      } else {
        throw file.errorWithNode(node, "illegal kind for constructor method");
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

  if (!hasConstructor && superName) {
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
      t.callExpression(file.addDeclaration("class-props"), args)
    ));
  }
};

var superIdentifier = function (superName, methodNode, node, parent) {
  var methodName = methodNode.key;

  if (parent.property === node) {
    return;
  } else if (t.isCallExpression(parent) && parent.callee === node) {
    // super(); -> ClassName.prototype.MethodName.call(this);
    parent.arguments.unshift(t.thisExpression());

    if (methodName.name === "constructor") {
      // constructor() { super(); }
      return t.memberExpression(superName, t.identifier("call"));
    } else {
      node = superName;

      // foo() { super(); }
      if (!methodNode.static) {
        node = t.memberExpression(node, t.identifier("prototype"));
      }

      node = t.memberExpression(node, methodName, methodNode.computed);
      return t.memberExpression(node, t.identifier("call"));
    }
  } else if (t.isMemberExpression(parent) && !methodNode.static) {
    // super.test -> ClassName.prototype.test
    return t.memberExpression(superName, t.identifier("prototype"));
  } else {
    return superName;
  }
};

var replaceInstanceSuperReferences = function (superName, methodNode) {
  var methodName = methodNode.key;
  var method     = methodNode.value;

  superName = superName || t.identifier("Function");

  traverse(method, function (node, parent) {
    if (t.isIdentifier(node) && node.name === "super") {
      return superIdentifier(superName, methodNode, node, parent);
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

var addConstructor = function (construct, method) {
  construct.defaults = method.defaults;
  construct.params   = method.params;
  construct.body     = method.body;
  construct.rest     = method.rest;

  t.inherits(construct, method);
};
