var traverse = require("../traverse");
var util     = require("../util");
var _        = require("lodash");

exports.ClassDeclaration = function (node) {
  var superName = node.superClass;
  var className = node.id;

  var root = util.template("class", {
    CLASS_NAME: className
  }, true);

  var container = root.declarations[0].init;
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

  return root;
};

var buildClassBody = function (body, className, superName, node) {
  var mutatorMap = {};

  var classBody = node.body.body;
  _.each(classBody, function (bodyNode) {
    if (bodyNode.type !== "MethodDefinition") return;

    var methodName = bodyNode.key.name;
    var method     = bodyNode.value;

    replaceInstanceSuperReferences(superName, method);

    if (methodName === "constructor") {
      if (bodyNode.kind === "") {
        addConstructor(body[0], method);
      } else {
        throw new Error("unknown kind for constructor method");
      }
    } else {
      if (bodyNode.kind === "") {
        addInstanceMethod(body, className, methodName, method);
      } else {
        util.pushMutatorMap(mutatorMap, methodName, bodyNode.kind, bodyNode);
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
  if (!superName) return;

  node.name = superName.name;

  // super(); -> ClassName.call(this);
  if (parent.type === "CallExpression" && parent.callee === node) {
    node.name += ".call";
    parent.arguments.unshift({
      type: "ThisExpression"
    });
  }
};

var replaceInstanceSuperReferences = function (superName, method) {
  traverse(method, function (node, parent) {
    if (node.type === "Identifier" && node.name === "super") {
      superIdentifier(superName, node, parent);
    } else if (node.type === "MemberExpression") {
      // no accessing of super properties


      if (isAccessingSuperProperties(parent, node)) {
        throw new Error("cannot access super properties");
      } else {
        return;
      }
    } else if (node.type === "CallExpression") {
      var callee = node.callee;
      if (callee.type !== "MemberExpression") return;
      if (callee.object.name !== "super") return;

      callee.property.name = "prototype." + callee.property.name + ".call";
      node.arguments.unshift({
        type: "ThisExpression"
      });
    } else {
      return;
    }

    if (!superName) {
      throw new Error("cannot access super as this class has none");
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
