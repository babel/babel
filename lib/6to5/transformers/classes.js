var traverse = require("../traverse");
var util     = require("../util");
var b        = require("ast-types").builders;
var _        = require("lodash");

exports.ClassDeclaration = function (node, parent, file) {
  return b.variableDeclaration("var", [
    b.variableDeclarator(node.id, buildClass(node, file))
  ]);
};

exports.ClassExpression = function (node, parent, file) {
  return buildClass(node, file);
};

var getMemberExpressionObject = function (node) {
  while (node.type === "MemberExpression") {
    node = node.object;
  }
  return node;
};

var buildClass = function (node, file) {
  var superName = node.superClass;
  var className = node.id || b.identifier(file.generateUid("class"));

  var superClassArgument = node.superClass;
  var superClassCallee   = node.superClass;

  if (superName) {
    if (superName.type === "MemberExpression") {
      superClassArgument = superClassCallee = getMemberExpressionObject(superName);
    } else if (superName.type !== "Identifier") {
      superClassArgument = superName;
      superClassCallee = superName = b.identifier(file.generateUid("ref"));
    }
  }

  var container = util.template("class", {
    CLASS_NAME: className
  });

  var block     = container.callee.body;
  var body      = block.body;

  if (node.id) {
    body[0].declarations[0].init.id = className;
  }

  var returnStatement = body.pop();

  if (superName) {
    // inherit prototype
    body.push(util.template("class-inherits-prototype", {
      SUPER_NAME: superName,
      CLASS_NAME: className
    }, true));

    // inherit static properties
    body.push(util.template("class-inherits-properties", {
      SUPER_NAME: superName,
      CLASS_NAME: className
    }, true));

    container.arguments.push(superClassArgument);
    container.callee.params.push(superClassCallee);
  }

  buildClassBody(body, className, superName, node);

  body.push(returnStatement);

  return container;
};

var buildClassBody = function (body, className, superName, node) {
  var instanceMutatorMap = {};
  var staticMutatorMap   = {};
  var hasConstructor     = false;

  var construct = body[0].declarations[0].init;
  var classBody = node.body.body;

  _.each(classBody, function (node) {
    var methodName = node.key.name;
    var method     = node.value;

    replaceInstanceSuperReferences(superName, method, node, methodName);

    if (methodName === "constructor") {
      if (node.kind === "") {
        hasConstructor = true;
        addConstructor(construct, method);
      } else {
        throw util.errorWithNode(node, "unknown kind for constructor method");
      }
    } else {
      var mutatorMap = instanceMutatorMap;
      if (node.static) mutatorMap = staticMutatorMap;

      var kind = node.kind;

      if (kind === "") {
        kind = "value";
        util.pushMutatorMap(mutatorMap, methodName, "writable", b.identifier("true"));
      }

      util.pushMutatorMap(mutatorMap, methodName, kind, node);
    }
  });

  if (!hasConstructor && superName) {
    construct.body.body.push(util.template("class-super-constructor-call", {
      SUPER_NAME: superName
    }, true));
  }

  if (!_.isEmpty(instanceMutatorMap)) {
    var protoId = util.template("prototype-identifier", {
      CLASS_NAME: className
    });

    body.push(util.buildDefineProperties(instanceMutatorMap, protoId));
  }

  if (!_.isEmpty(staticMutatorMap)) {
    body.push(util.buildDefineProperties(staticMutatorMap, className));
  }
};

var superIdentifier = function (superName, methodNode, methodName, node, parent) {
  if (parent.property === node) {
    return;
  } else if (parent.type === "CallExpression" && parent.callee === node) {
    // super(); -> ClassName.prototype.MethodName.call(this);
    parent.arguments.unshift(b.thisExpression());

    if (methodName === "constructor") {
      // constructor() { super(); }
      return b.memberExpression(superName, b.identifier("call"), false);
    } else {
      node = superName;

      // foo() { super(); }
      if (!methodNode.static) {
        node = b.memberExpression(node, b.identifier("prototype"), false);
      }

      node = b.memberExpression(node, b.identifier(methodName), false);
      return b.memberExpression(node, b.identifier("call"), false);
    }
  } else if (parent.type === "MemberExpression" && !methodNode.static) {
    // super.test -> ClassName.prototype.test
    return b.memberExpression(superName, b.identifier("prototype"), false);
  } else {
    return superName;
  }
};

var replaceInstanceSuperReferences = function (superName, method, methodNode, methodName) {
  superName = superName || b.identifier("Function");

  traverse(method, function (node, parent) {
    if (node.type === "Identifier" && node.name === "super") {
      return superIdentifier(superName, methodNode, methodName, node, parent);
    } else if (node.type === "CallExpression") {
      var callee = node.callee;
      if (callee.type !== "MemberExpression") return;
      if (callee.object.name !== "super") return;

      //  super.test(); -> ClassName.prototype.MethodName.call(this);
      callee.property.name = callee.property.name + ".call";
      node.arguments.unshift(b.thisExpression());
    }
  });
};

var addConstructor = function (construct, method) {
  construct.defaults = method.defaults;
  construct.params   = method.params;
  construct.body     = method.body;
  construct.rest     = method.rest;
};
