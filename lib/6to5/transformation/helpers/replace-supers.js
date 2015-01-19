"use strict";

module.exports = ReplaceSupers;

var traverse = require("../../traverse");
var t        = require("../../types");

/**
 * Description
 *
 * @param {Object} methodNode
 * @param {Object} className
 * @param {Object} superName
 * @param {Boolean} isLoose
 * @param {File} file
 */

function ReplaceSupers(methodNode, className, superName, isLoose, file) {
  this.topLevelThisReference = null;
  this.methodNode            = methodNode;
  this.className             = className;
  this.superName             = superName;
  this.isLoose               = isLoose;
  this.file                  = file;
}

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

ReplaceSupers.prototype.superProperty = function (property, isStatic, isComputed, thisExpression) {
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

ReplaceSupers.prototype.looseSuperProperty = function (methodNode, id, parent) {
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
 */

ReplaceSupers.prototype.replace = function () {
  this.traverseLevel(this.methodNode.value, true);
};

/**
 * Description
 *
 * @param {Object} node
 * @param {Boolean} topLevel
 */

ReplaceSupers.prototype.traverseLevel = function (node, topLevel) {
  var self = this;

  traverse(node, {
    enter: function (node, parent, scope, context) {
      if (t.isFunction(node) && !t.isArrowFunctionExpression(node)) {
        // we need to call traverseLevel again so we're context aware
        self.traverseLevel(node, false);
        return context.skip();
      }

      if (t.isProperty(node, { method: true }) || t.isMethodDefinition(node)) {
        // break on object methods
        return context.skip();
      }

      var getThisReference = function () {
        if (topLevel) {
          // top level so `this` is the instance
          return t.thisExpression();
        } else {
          // not in the top level so we need to create a reference
          return self.getThisReference();
        }
      };

      var callback = self.specHandle;
      if (self.isLoose) callback = self.looseHandle;
      return callback.call(self, getThisReference, node, parent);
    }
  });
};

/**
 * Description
 */

ReplaceSupers.prototype.getThisReference = function () {
  if (this.topLevelThisReference) {
    return this.topLevelThisReference;
  } else {
    var ref = this.topLevelThisReference = this.file.generateUidIdentifier("this");
    this.methodNode.value.body.body.unshift(t.variableDeclaration("var", [
      t.variableDeclarator(this.topLevelThisReference, t.thisExpression())
    ]));
    return ref;
  }
};

/**
 * Description
 *
 * @param {Function} getThisReference
 * @param {Object} node
 * @param {Object} parent
 */

ReplaceSupers.prototype.looseHandle = function (getThisReference, node, parent) {
  if (t.isIdentifier(node, { name: "super" })) {
    return this.looseSuperProperty(this.methodNode, node, parent);
  } else if (t.isCallExpression(node)) {
    var callee = node.callee;
    if (!t.isMemberExpression(callee)) return;
    if (callee.object.name !== "super") return;

    // super.test(); -> ClassName.prototype.MethodName.call(this);
    t.appendToMemberExpression(callee, t.identifier("call"));
    node.arguments.unshift(getThisReference());
  }
};

/**
 * Description
 *
 * @param {Function} getThisReference
 * @param {Object} node
 * @param {Object} parent
 */

ReplaceSupers.prototype.specHandle = function (getThisReference, node, parent) {
  var methodNode = this.methodNode;
  var property;
  var computed;
  var args;

  if (t.isIdentifier(node, { name: "super" })) {
    if (!(t.isMemberExpression(parent) && !parent.computed && parent.property === node)) {
      throw this.file.errorWithNode(node, "illegal use of bare super");
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
  var superProperty = this.superProperty(property, methodNode.static, computed, thisReference);
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
};
