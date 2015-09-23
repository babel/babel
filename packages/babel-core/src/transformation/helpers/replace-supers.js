/* @flow */

import type File from "../file";
import type { NodePath, Scope } from "babel-traverse";
import * as messages from "babel-messages";
import * as t from "babel-types";

function isIllegalBareSuper(node, parent) {
  if (!t.isSuper(node)) return false;
  if (t.isMemberExpression(parent, { computed: false })) return false;
  if (t.isCallExpression(parent, { callee: node })) return false;
  return true;
}

function isMemberExpressionSuper(node) {
  return t.isMemberExpression(node) && t.isSuper(node.object);
}

let visitor = {
  enter(path, state) {
    let topLevel = state.topLevel;
    let self = state.self;

    if (path.isFunction() && !path.isArrowFunctionExpression()) {
      // we need to call traverseLevel again so we're context aware
      self.traverseLevel(path, false);
      return path.skip();
    }

    if (path.isProperty({ method: true }) || path.isMethodDefinition()) {
      // break on object methods
      return path.skip();
    }

    let getThisReference = topLevel ?
      // top level so `this` is the instance
      t.thisExpression :
      // not in the top level so we need to create a reference
      self.getThisReference.bind(self);

    let callback = self.specHandle;
    if (self.isLoose) callback = self.looseHandle;
    let result = callback.call(self, path, getThisReference);
    if (result) path.hasSuper = true;
    if (result === true) return;
    return result;
  }
};

export default class ReplaceSupers {
  constructor(opts: Object, inClass?: boolean = false) {
    this.topLevelThisReference = opts.topLevelThisReference;
    this.methodPath            = opts.methodPath;
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

  topLevelThisReference: ?Object;
  methodPath: NodePath;
  methodNode: Object;
  superRef: Object;
  isStatic: boolean;
  hasSuper: boolean;
  inClass: boolean;
  isLoose: boolean;
  scope: Scope;
  file: File;
  opts: {
    getObjetRef: Function;
    topLevelThisReference: Object;
    methodPath: NodePath;
    methodNode: Object;
    superRef: Object;
    isStatic: boolean;
    isLoose: boolean;
    scope: Scope;
    file: File;
  };

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
        isComputed ? property : t.stringLiteral(property.name),
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
        isComputed ? property : t.stringLiteral(property.name),
        thisExpression
      ]
    );
  }

  replace() {
    this.traverseLevel(this.methodPath.get("value"), true);
  }

  traverseLevel(path: NodePath, topLevel: boolean) {
    let state = { self: this, topLevel: topLevel };
    path.traverse(visitor, state);
  }

  getThisReference() {
    if (this.topLevelThisReference) {
      return this.topLevelThisReference;
    } else {
      let ref = this.topLevelThisReference = this.scope.generateUidIdentifier("this");
      this.methodNode.value.body.body.unshift(t.variableDeclaration("var", [
        t.variableDeclarator(this.topLevelThisReference, t.thisExpression())
      ]));
      return ref;
    }
  }

  getLooseSuperProperty(id: Object, parent: Object) {
    let methodNode = this.methodNode;
    let methodName = methodNode.key;
    let superRef   = this.superRef || t.identifier("Function");

    if (parent.property === id) {
      return;
    } else if (t.isCallExpression(parent, { callee: id })) {
      // super(); -> objectRef.prototype.MethodName.call(this);
      parent.arguments.unshift(t.thisExpression());

      if (methodName.name === "constructor") {
        // constructor() { super(); }
        if (parent.arguments.length === 2 && t.isSpreadElement(parent.arguments[1]) && t.isIdentifier(parent.arguments[1].argument, { name: "arguments" })) {
          // special case single arguments spread
          parent.arguments[1] = parent.arguments[1].argument;
          return t.memberExpression(superRef, t.identifier("apply"));
        } else {
          return t.memberExpression(superRef, t.identifier("call"));
        }
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

  looseHandle(path: NodePath, getThisReference: Function) {
    let node = path.node;
    if (path.isSuper()) {
      return this.getLooseSuperProperty(node, path.parent);
    } else if (path.isCallExpression()) {
      let callee = node.callee;
      if (!t.isMemberExpression(callee)) return;
      if (!t.isSuper(callee.object)) return;

      // super.test(); -> objectRef.prototype.MethodName.call(this);
      t.appendToMemberExpression(callee, t.identifier("call"));
      node.arguments.unshift(getThisReference());
      return true;
    }
  }

  specHandleAssignmentExpression(ref, path, node, getThisReference) {
    if (node.operator === "=") {
      // super.name = "val"; -> _set(Object.getPrototypeOf(objectRef.prototype), "name", this);
      return this.setSuperProperty(node.left.property, node.right, node.left.computed, getThisReference());
    } else {
      // super.age += 2; -> let _ref = super.age; super.age = _ref + 2;
      ref = ref || path.scope.generateUidIdentifier("ref");
      return [
        t.variableDeclaration("var", [
          t.variableDeclarator(ref, node.left)
        ]),
        t.expressionStatement(
          t.assignmentExpression("=", node.left, t.binaryExpression(node.operator[0], ref, node.right))
        )
      ];
    }
  }

  specHandle(path: NodePath, getThisReference: Function) {
    let methodNode = this.methodNode;
    let property;
    let computed;
    let args;
    let thisReference;

    let parent = path.parent;
    let node = path.node;

    if (isIllegalBareSuper(node, parent)) {
      throw path.buildCodeFrameError(messages.get("classesIllegalBareSuper"));
    }

    if (t.isCallExpression(node)) {
      let callee = node.callee;
      if (t.isSuper(callee)) {
        // super(); -> _get(Object.getPrototypeOf(objectRef), "MethodName", this).call(this);
        property = methodNode.key;
        computed = methodNode.computed;
        args = node.arguments;

        // bare `super` call is illegal inside non-constructors
        //  - https://esdiscuss.org/topic/super-call-in-methods
        //  - https://twitter.com/wycats/status/544553184396836864
        if (methodNode.key.name !== "constructor" || !this.inClass) {
          let methodName = methodNode.key.name || "METHOD_NAME";
          throw this.file.buildCodeFrameError(node, messages.get("classesIllegalSuperCall", methodName));
        }
      } else if (isMemberExpressionSuper(callee)) {
        // super.test(); -> _get(Object.getPrototypeOf(objectRef.prototype), "test", this).call(this);
        property = callee.property;
        computed = callee.computed;
        args = node.arguments;
      }
    } else if (t.isMemberExpression(node) && t.isSuper(node.object)) {
      // super.name; -> _get(Object.getPrototypeOf(objectRef.prototype), "name", this);
      property = node.property;
      computed = node.computed;
    } else if (t.isUpdateExpression(node) && isMemberExpressionSuper(node.argument)) {
      let binary = t.binaryExpression(node.operator[0], node.argument, t.numberLiteral(1));
      if (node.prefix) {
        // ++super.foo; -> super.foo += 1;
        return this.specHandleAssignmentExpression(null, path, binary, getThisReference);
      } else {
        // super.foo++; -> let _ref = super.foo; super.foo = _ref + 1;
        let ref = path.scope.generateUidIdentifier("ref");
        return this.specHandleAssignmentExpression(ref, path, binary, getThisReference).concat(t.expressionStatement(ref));
      }
    } else if (t.isAssignmentExpression(node) && isMemberExpressionSuper(node.left)) {
      return this.specHandleAssignmentExpression(null, path, node, getThisReference);
    }

    if (!property) return;

    thisReference = getThisReference();
    let superProperty = this.getSuperProperty(property, computed, thisReference);
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
