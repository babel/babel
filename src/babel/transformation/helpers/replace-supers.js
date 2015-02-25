"use strict";

module.exports = ReplaceSupers;

var messages = require("../../messages");
var t        = require("../../types");

/**
 * Description
 *
 * @param {Object} opts
 * @param {Boolean} [inClass]
 */

function ReplaceSupers(opts, inClass) {
  this.topLevelThisReference = opts.topLevelThisReference;
  this.methodNode            = opts.methodNode;
  this.className             = opts.className;
  this.superName             = opts.superName;
  this.isStatic              = opts.isStatic;
  this.hasSuper              = false;
  this.inClass               = inClass;
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
 * @param {Node} value
 * @param {Boolean} isComputed
 * @param {Node} thisExpression
 *
 * @returns {Node}
 */

ReplaceSupers.prototype.setSuperProperty = function (property, value, isComputed, thisExpression) {
  return t.callExpression(
    this.file.addHelper("set"),
    [
      t.callExpression(
        t.memberExpression(t.identifier("Object"), t.identifier("getPrototypeOf")),
        [
          this.isStatic ? this.className : t.memberExpression(this.className, t.identifier("prototype"))
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
 * @param {Boolean} isComputed
 * @param {Node} thisExpression
 *
 * @returns {Node}
 */

ReplaceSupers.prototype.getSuperProperty = function (property, isComputed, thisExpression) {
  return t.callExpression(
    this.file.addHelper("get"),
    [
      t.callExpression(
        t.memberExpression(t.identifier("Object"), t.identifier("getPrototypeOf")),
        [
          this.isStatic ? this.className : t.memberExpression(this.className, t.identifier("prototype"))
        ]
      ),
      isComputed ? property : t.literal(property.name),
      thisExpression
    ]
  );
};

/**
 * Description
 */

ReplaceSupers.prototype.replace = function () {
  this.traverseLevel(this.methodNode.value, true);
};

var visitor = {
  enter: function (node, parent, scope, state) {
    var topLevel = state.topLevel;
    var self = state.self;

    if (t.isFunction(node) && !t.isArrowFunctionExpression(node)) {
      // we need to call traverseLevel again so we're context aware
      self.traverseLevel(node, false);
      return this.skip();
    }

    if (t.isProperty(node, { method: true }) || t.isMethodDefinition(node)) {
      // break on object methods
      return this.skip();
    }

    var getThisReference = topLevel ?
      // top level so `this` is the instance
      t.thisExpression :
      // not in the top level so we need to create a reference
      self.getThisReference.bind(self);

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
  this.scope.traverse(node, visitor, state);
};

/**
 * Description
 */

ReplaceSupers.prototype.getThisReference = function () {
  if (this.topLevelThisReference) {
    return this.topLevelThisReference;
  } else {
    var ref = this.topLevelThisReference = this.scope.generateUidIdentifier("this");
    this.methodNode.value.body.body.unshift(t.variableDeclaration("var", [
      t.variableDeclarator(this.topLevelThisReference, t.thisExpression())
    ]));
    return ref;
  }
};

/**
 * Description
 *
 * @param {Object} node
 * @param {Object} id
 * @param {Object} parent
 * @returns {Object}
 */

ReplaceSupers.prototype.getLooseSuperProperty = function (id, parent) {
  var methodNode = this.methodNode;
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
 * @param {Function} getThisReference
 * @param {Object} node
 * @param {Object} parent
 */

ReplaceSupers.prototype.looseHandle = function (getThisReference, node, parent) {
  if (t.isIdentifier(node, { name: "super" })) {
    this.hasSuper = true;
    return this.getLooseSuperProperty(node, parent);
  } else if (t.isCallExpression(node)) {
    var callee = node.callee;
    if (!t.isMemberExpression(callee)) return;
    if (callee.object.name !== "super") return;

    // super.test(); -> ClassName.prototype.MethodName.call(this);
    this.hasSuper = true;
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

  if (isIllegalBareSuper(node, parent)) {
    throw this.file.errorWithNode(node, messages.get("classesIllegalBareSuper"));
  }

  if (t.isCallExpression(node)) {
    var callee = node.callee;
    if (isSuper(callee, node)) {
      // super(); -> _get(Object.getPrototypeOf(ClassName), "MethodName", this).call(this);
      property = methodNode.key;
      computed = methodNode.computed;
      args = node.arguments;

      // bare `super` call is illegal inside non-constructors
      //  - https://esdiscuss.org/topic/super-call-in-methods
      //  - https://twitter.com/wycats/status/544553184396836864
      if (methodNode.key.name !== "constructor" || !this.inClass) {
        var methodName = methodNode.key.name || "METHOD_NAME";
        throw this.file.errorWithNode(node, messages.get("classesIllegalSuperCall", methodName));
      }
    } else if (t.isMemberExpression(callee) && isSuper(callee.object, callee)) {
      // super.test(); -> _get(Object.getPrototypeOf(ClassName.prototype), "test", this).call(this);
      property = callee.property;
      computed = callee.computed;
      args = node.arguments;
    }
  } else if (t.isMemberExpression(node) && isSuper(node.object, node)) {
    // super.name; -> _get(Object.getPrototypeOf(ClassName.prototype), "name", this);
    property = node.property;
    computed = node.computed;
  } else if (t.isAssignmentExpression(node) && isSuper(node.left.object, node.left) && methodNode.kind === "set") {
    // super.name = "val"; -> _set(Object.getPrototypeOf(ClassName.prototype), "name", this);
    this.hasSuper = true;
    return this.setSuperProperty(node.left.property, node.right, node.left.computed, getThisReference());
  }

  if (!property) return;

  this.hasSuper = true;

  thisReference = getThisReference();
  var superProperty = this.getSuperProperty(property, computed, thisReference);
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

var isIllegalBareSuper = function (node, parent) {
  if (!isSuper(node, parent)) return false;
  if (t.isMemberExpression(parent, { computed: false })) return false;
  if (t.isCallExpression(parent, { callee: node })) return false;
  return true;
};

var isSuper = function (node, parent) {
  return t.isIdentifier(node, { name: "super" }) && t.isReferenced(node, parent);
};
