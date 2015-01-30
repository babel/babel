"use strict";

module.exports = ReplaceSupers;

var traverse = require("../../traverse");
var t        = require("../../types");

/**
 * Description
 *
 * @param {Object} opts
 */

function ReplaceSupers(opts) {
  this.topLevelThisReference = null;
  this.methodNode            = opts.methodNode;
  this.className             = opts.className;
  this.superName             = opts.superName;
  this.isLoose               = opts.isLoose;
  this.scope                 = opts.scope;
  this.file                  = opts.file;
}

/**
 * Sets a super class value of the named property.
 *
 * @example
 *
 *   _set(Object.getPrototypeOf(CLASS.prototype), "METHOD", "VALUE", this)
 *
 * @param {Node} property
 * @param {boolean} isStatic
 * @param {boolean} isComputed
 *
 * @returns {Node}
 */
ReplaceSupers.prototype.setSuperProperty = function (property, value, isStatic, isComputed, thisExpression) {
  return t.callExpression(
    this.file.addHelper("set"),
    [
      t.callExpression(
        t.memberExpression(t.identifier("Object"), t.identifier("getPrototypeOf")),
        [
          isStatic ? this.className : t.memberExpression(this.className, t.identifier("prototype"))
        ]
      ),
      isComputed ? property : t.literal(property.name),
      value,
      thisExpression
    ]
  );
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

var visitor = {
  enter: function (node, parent, scope, context, state) {
    var topLevel = state.topLevel;
    var self = state.self;

    if (t.isFunction(node) && !t.isArrowFunctionExpression(node)) {
      // we need to call traverseLevel again so we're context aware
      self.traverseLevel(node, false);
      return context.skip();
    }

    if (t.isProperty(node, { method: true }) || t.isMethodDefinition(node)) {
      // break on object methods
      return context.skip();
    }

    var getThisReference = topLevel ?
      // top level so `this` is the instance
      t.thisExpression :
      // not in the top level so we need to create a reference
      self.getThisReference;

    var callback = self.specHandle;
    if (self.isLoose) callback = self.looseHandle;
    return callback.call(self, getThisReference, node, parent);
  }
};

/**
 * Description
 *
 * @param {Object} node
 * @param {Boolean} topLevel
 */

ReplaceSupers.prototype.traverseLevel = function (node, topLevel) {
  var state = { self: this, topLevel: topLevel };
  traverse(node, visitor, this.scope, state);
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
  var thisReference;

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

      // bare `super` call is illegal inside non-constructors
      //  - https://esdiscuss.org/topic/super-call-in-methods
      //  - https://twitter.com/wycats/status/544553184396836864
      if (methodNode.key.name !== "constructor") {
        var methodName = methodNode.key.name || "METHOD_NAME";
        throw this.file.errorWithNode(node, "Direct super call is illegal in non-constructor, use super." + methodName + "() instead");
      }
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
  } else if (t.isAssignmentExpression(node)) {
    if (!t.isIdentifier(node.left.object, { name: "super" })) return;
    if (methodNode.kind !== "set") return;

    thisReference = getThisReference();
    // super.name = "val"; -> _set(Object.getPrototypeOf(ClassName.prototype), "name", this);
    return this.setSuperProperty(node.left.property, node.right, methodNode.static, node.left.computed, thisReference);
  }

  if (!property) return;

  thisReference = getThisReference();
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
