var traverse = require("../traverse");
var util     = require("../util");
var b        = require("ast-types").builders;
var _        = require("lodash");

exports.ClassDeclaration = function (node) {
  return b.variableDeclaration("var", [
    b.variableDeclarator(node.id, buildClass(node))
  ]);
};

exports.ClassExpression = function (node) {
  return buildClass(node);
};

var buildClass = function (node) {
  var superName = node.superClass;
  var className = node.id;

  var container = util.template("class", {
    CLASS_NAME: className
  });

  var block     = container.callee.body;
  var body      = block.body;

  var returnStatement = body.pop();

  if (superName) {
    body.push(util.template("inherits", {
      SUPER_NAME: superName,
      CLASS_NAME: className
    }, true));

    container.arguments.push(superName);
    container.callee.params.push(superName);
  }

  buildClassBody(body, className, superName, node);

  body.push(returnStatement);

  return container;
};

var buildClassBody = function (body, className, superName, node) {
  var mutatorMap = {};

  var classBody = node.body.body;
  _.each(classBody, function (node) {
    var methodName = node.key.name;
    var method     = node.value;

    replaceInstanceSuperReferences(superName, method);

    if (methodName === "constructor") {
      if (node.kind === "") {
        addConstructor(body[0], method);
      } else {
        throw util.errorWithNode(node, "unknown kind for constructor method");
      }
    } else {
      if (node.kind === "") {
        addInstanceMethod(body, className, methodName, method);
      } else {
        util.pushMutatorMap(mutatorMap, methodName, node.kind, node);
      }
    }
  });

  if (!_.isEmpty(mutatorMap)) {
    var protoId = util.template("prototype-identifier", {
      CLASS_NAME: className
    });

    body.push(util.buildDefineProperties(mutatorMap, protoId));
  }
};

var superIdentifier = function (superName, node, parent) {
  if (parent.property === node) return;

  node.name = superName.name || superName.value;

  // super(); -> ClassName.call(this);
  if (parent.type === "CallExpression" && parent.callee === node) {
    node.name += ".call";
    parent.arguments.unshift(b.thisExpression());
  }
};

var replaceInstanceSuperReferences = function (superName, method) {
  superName = superName || b.literal("Function");

  traverse(method, function (node, parent) {
    if (node.type === "Identifier" && node.name === "super") {
      superIdentifier(superName, node, parent);
    } else if (node.type === "MemberExpression") {
      // no accessing of super properties

      if (isAccessingSuperProperties(parent, node)) {
        throw util.errorWithNode(node, "cannot access super properties");
      } else {
        return;
      }
    } else if (node.type === "CallExpression") {
      var callee = node.callee;
      if (callee.type !== "MemberExpression") return;
      if (callee.object.name !== "super") return;

      callee.property.name = "prototype." + callee.property.name + ".call";
      node.arguments.unshift(b.thisExpression());
    } else {
      return;
    }
  });
};

var isAccessingSuperProperties = function (parent, node) {
  var obj = node.object;
  return obj.type === "Identifier" && obj.name === "super" &&
         parent.object === node;
};

var addConstructor = function (construct, method) {
  construct.defaults = method.defaults;
  construct.params   = method.params;
  construct.body     = method.body;
};

var addInstanceMethod = function (body, className, methodName, method) {
  body.push(util.template("class-method", {
    METHOD_NAME: methodName,
    CLASS_NAME: className,
    FUNCTION: method
  }, true));
};
