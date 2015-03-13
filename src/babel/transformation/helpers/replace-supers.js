module.exports = ReplaceSupers;

import * as messages from "../../messages";
import * as t from "../../types";


function isIllegalBareSuper(node, parent) {
  if (!isSuper(node, parent)) return false;
  if (t.isMemberExpression(parent, { computed: false })) return false;
  if (t.isCallExpression(parent, { callee: node })) return false;
  return true;
}

function isSuper(node, parent) {
  return t.isIdentifier(node, { name: "super" }) && t.isReferenced(node, parent);
}

var visitor = {
  enter(node, parent, scope, state) {
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

export default class ReplaceSupers {

  /**
   * Description
   */

  constructor(opts: Object, inClass?: boolean = false) {
    this.topLevelThisReference = opts.topLevelThisReference;
    this.methodNode            = opts.methodNode;
    this.superRef              = opts.superRef;
    this.isStatic              = opts.isStatic;
    this.hasSuper              = false;
    this.inClass               = inClass;
    this.isLoose               = opts.isLoose;
    this.scope                 = opts.scope;
    this.file                  = opts.file;
    this.opts                  = opts;
  }

  getObjectRef() {
    return this.opts.objectRef || this.opts.getObjectRef();
  }

  /**
   * Sets a super class value of the named property.
   *
   * @example
   *
   *   _set(Object.getPrototypeOf(CLASS.prototype), "METHOD", "VALUE", this)
   *
   */

  setSuperProperty(property: Object, value: Object, isComputed: boolean, thisExpression: Object): Object {
    return t.callExpression(
      this.file.addHelper("set"),
      [
        t.callExpression(
          t.memberExpression(t.identifier("Object"), t.identifier("getPrototypeOf")),
          [
            this.isStatic ? this.getObjectRef() : t.memberExpression(this.getObjectRef(), t.identifier("prototype"))
          ]
        ),
        isComputed ? property : t.literal(property.name),
        value,
        thisExpression
      ]
    );
  }

  /**
   * Gets a node representing the super class value of the named property.
   *
   * @example
   *
   *   _get(Object.getPrototypeOf(CLASS.prototype), "METHOD", this)
   *
   */

  getSuperProperty(property: Object, isComputed: boolean, thisExpression: Object): Object {
    return t.callExpression(
      this.file.addHelper("get"),
      [
        t.callExpression(
          t.memberExpression(t.identifier("Object"), t.identifier("getPrototypeOf")),
          [
            this.isStatic ? this.getObjectRef() : t.memberExpression(this.getObjectRef(), t.identifier("prototype"))
          ]
        ),
        isComputed ? property : t.literal(property.name),
        thisExpression
      ]
    );
  }

  /**
   * Description
   */

  replace() {
    this.traverseLevel(this.methodNode.value, true);
  }

  /**
   * Description
   */

  traverseLevel(node: Object, topLevel: boolean) {
    var state = { self: this, topLevel: topLevel };
    this.scope.traverse(node, visitor, state);
  }

  /**
   * Description
   */

  getThisReference() {
    if (this.topLevelThisReference) {
      return this.topLevelThisReference;
    } else {
      var ref = this.topLevelThisReference = this.scope.generateUidIdentifier("this");
      this.methodNode.value.body.body.unshift(t.variableDeclaration("var", [
        t.variableDeclarator(this.topLevelThisReference, t.thisExpression())
      ]));
      return ref;
    }
  }

  /**
   * Description
   */

  getLooseSuperProperty(id: Object, parent: Object) {
    var methodNode = this.methodNode;
    var methodName = methodNode.key;
    var superRef   = this.superRef || t.identifier("Function");

    if (parent.property === id) {
      return;
    } else if (t.isCallExpression(parent, { callee: id })) {
      // super(); -> objectRef.prototype.MethodName.call(this);
      parent.arguments.unshift(t.thisExpression());

      if (methodName.name === "constructor") {
        // constructor() { super(); }
        return t.memberExpression(superRef, t.identifier("call"));
      } else {
        id = superRef;

        // foo() { super(); }
        if (!methodNode.static) {
          id = t.memberExpression(id, t.identifier("prototype"));
        }

        id = t.memberExpression(id, methodName, methodNode.computed);
        return t.memberExpression(id, t.identifier("call"));
      }
    } else if (t.isMemberExpression(parent) && !methodNode.static) {
      // super.test -> objectRef.prototype.test
      return t.memberExpression(superRef, t.identifier("prototype"));
    } else {
      return superRef;
    }
  }

  /**
   * Description
   */

  looseHandle(getThisReference: Function, node: Object, parent: Object) {
    if (t.isIdentifier(node, { name: "super" })) {
      this.hasSuper = true;
      return this.getLooseSuperProperty(node, parent);
    } else if (t.isCallExpression(node)) {
      var callee = node.callee;
      if (!t.isMemberExpression(callee)) return;
      if (callee.object.name !== "super") return;

      // super.test(); -> objectRef.prototype.MethodName.call(this);
      this.hasSuper = true;
      t.appendToMemberExpression(callee, t.identifier("call"));
      node.arguments.unshift(getThisReference());
    }
  }

  /**
   * Description
   */

  specHandle(getThisReference: Function, node: Object, parent: Object) {
    var methodNode = this.methodNode;
    var property;
    var computed;
    var args;
    var thisReference;

    if (isIllegalBareSuper(node, parent)) {
      throw this.errorWithNode(messages.get("classesIllegalBareSuper"));
    }

    if (t.isCallExpression(node)) {
      var callee = node.callee;
      if (isSuper(callee, node)) {
        // super(); -> _get(Object.getPrototypeOf(objectRef), "MethodName", this).call(this);
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
        // super.test(); -> _get(Object.getPrototypeOf(objectRef.prototype), "test", this).call(this);
        property = callee.property;
        computed = callee.computed;
        args = node.arguments;
      }
    } else if (t.isMemberExpression(node) && isSuper(node.object, node)) {
      // super.name; -> _get(Object.getPrototypeOf(objectRef.prototype), "name", this);
      property = node.property;
      computed = node.computed;
    } else if (t.isAssignmentExpression(node) && isSuper(node.left.object, node.left) && methodNode.kind === "set") {
      // super.name = "val"; -> _set(Object.getPrototypeOf(objectRef.prototype), "name", this);
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
          [thisReference, ...args]
        );
      }
    } else {
      return superProperty;
    }
  }
}
