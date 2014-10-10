var traverse = require("../traverse");
var util     = require("../util");
var b        = require("ast-types").builders;
var _        = require("lodash");

exports.ClassDeclaration = function (node, parent, opts, generateUid) {
  return b.variableDeclaration("var", [
    b.variableDeclarator(node.id, buildClass(node, generateUid))
  ]);
};

exports.ClassExpression = function (node, parent, opts, generateUid) {
  return buildClass(node, generateUid);
};

var getMemberExpressionObject = function (node) {
  while (node.type === "MemberExpression") {
    node = node.object;
  }
  return node;
};

var buildClass = function (node, generateUid) {
  var superName = node.superClass;
  var className = node.id || b.identifier("Anonymous");

  var superClassArgument = node.superClass;
  var superClassCallee   = node.superClass;

  if (superName) {
    if (superName.type === "MemberExpression") {
      superClassArgument = superClassCallee = getMemberExpressionObject(superName);
    } else if (superName.type !== "Identifier") {
      superClassArgument = superName;
      superClassCallee = superName = b.identifier(generateUid("ref"));
    }
  }

  var container = util.template("class", {
    CLASS_NAME: className
  });

  var block     = container.callee.body;
  var body      = block.body;

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

  var construct = body[0];
  var classBody = node.body.body;

  _.each(classBody, function (node) {
    var methodName = node.key.name;
    var method     = node.value;

    replaceInstanceSuperReferences(superName, method, methodName);

    if (methodName === "constructor") {
      if (node.kind === "") {
        hasConstructor = true;
        addConstructor(construct, method);
      } else {
        throw util.errorWithNode(node, "unknown kind for constructor method");
      }
    } else {
      var add = addInstanceMethod;
      var mutatorMap = instanceMutatorMap;

      if (node.static) {
        add = addStaticMethod;
        mutatorMap = staticMutatorMap
      }

      if (node.kind === "") {
        add(body, className, methodName, method);
      } else {
        util.pushMutatorMap(mutatorMap, methodName, node.kind, node);
      }
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

var superIdentifier = function (superName, methodName, node, parent) {
  if (parent.property === node) return;

  node.name = superName.name || superName.value;

  // super(); -> ClassName.prototype.MethodName.call(this);
  if (parent.type === "CallExpression" && parent.callee === node) {
    if (methodName === "constructor") {
      // constructor() { super(); }
      node.name += ".call";
    } else {
      // foo() { super(); }
      node.name += ".prototype." + methodName + ".call";
    }

    parent.arguments.unshift(b.thisExpression());
  } else if (parent.type === "MemberExpression") {
    // super.test -> ClassName.prototype.test
    node.name += ".prototype";
  }
};

var replaceInstanceSuperReferences = function (superName, method, methodName) {
  superName = superName || b.literal("Function");

  traverse(method, function (node, parent) {
    if (node.type === "Identifier" && node.name === "super") {
      superIdentifier(superName, methodName, node, parent);
    } else if (node.type === "CallExpression") {
      var callee = node.callee;
      if (callee.type !== "MemberExpression") return;
      if (callee.object.name !== "super") return;

      //  super.test(); -> Classname.prototype.MethodName.call(this);
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

var addStaticMethod = function (body, className, methodName, method) {
  body.push(util.template("class-static-method", {
    METHOD_NAME: methodName,
    CLASS_NAME: className,
    FUNCTION: method
  }, true));
};

var addInstanceMethod = function (body, className, methodName, method) {
  body.push(util.template("class-method", {
    METHOD_NAME: methodName,
    CLASS_NAME: className,
    FUNCTION: method
  }, true));
};
