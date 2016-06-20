/* eslint max-len: 0 */

import type { NodePath, Scope } from "babel-traverse";
import optimiseCall from "babel-helper-optimise-call-expression";
import * as messages from "babel-messages";
import * as t from "babel-types";

// ✌️
let HARDCORE_THIS_REF = Symbol();

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
  Function(path) {
    if (!path.inShadow("this")) {
      path.skip();
    }
  },

  ReturnStatement(path, state) {
    if (!path.inShadow("this")) {
      state.returns.push(path);
    }
  },

  ThisExpression(path, state) {
    if (!path.node[HARDCORE_THIS_REF]) {
      state.thises.push(path);
    }
  },

  enter(path, state) {
    let callback = state.specHandle;
    if (state.isLoose) callback = state.looseHandle;

    let isBareSuper = path.isCallExpression() && path.get("callee").isSuper();

    let result = callback.call(state, path);

    if (result) {
      state.hasSuper = true;
    }

    if (isBareSuper) {
      state.bareSupers.push(path);
    }

    if (result === true) {
      path.requeue();
    }

    if (result !== true && result) {
      if (Array.isArray(result)) {
        path.replaceWithMultiple(result);
      } else {
        path.replaceWith(result);
      }
    }
  }
};

export default class ReplaceSupers {
  constructor(opts: Object, inClass?: boolean = false) {
    this.forceSuperMemoisation = opts.forceSuperMemoisation;
    this.methodPath            = opts.methodPath;
    this.methodNode            = opts.methodNode;
    this.superRef              = opts.superRef;
    this.isStatic              = opts.isStatic;
    this.hasSuper              = false;
    this.inClass               = inClass;
    this.isLoose               = opts.isLoose;
    this.scope                 = this.methodPath.scope;
    this.file                  = opts.file;
    this.opts                  = opts;

    this.bareSupers = [];
    this.returns    = [];
    this.thises     = [];
  }

  forceSuperMemoisation: boolean;
  methodPath: NodePath;
  methodNode: Object;
  superRef: Object;
  isStatic: boolean;
  hasSuper: boolean;
  inClass: boolean;
  isLoose: boolean;
  scope: Scope;
  file;
  opts: {
    forceSuperMemoisation: boolean;
    getObjetRef: Function;
    methodPath: NodePath;
    methodNode: Object;
    superRef: Object;
    isStatic: boolean;
    isLoose: boolean;
    file: any;
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

  setSuperProperty(property: Object, value: Object, isComputed: boolean): Object {
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
        t.thisExpression()
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

  getSuperProperty(property: Object, isComputed: boolean): Object {
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
        t.thisExpression()
      ]
    );
  }

  replace() {
    this.methodPath.traverse(visitor, this);
  }

  getLooseSuperProperty(id: Object, parent: Object) {
    let methodNode = this.methodNode;
    let superRef   = this.superRef || t.identifier("Function");

    if (parent.property === id) {
      return;
    } else if (t.isCallExpression(parent, { callee: id })) {
      return;
    } else if (t.isMemberExpression(parent) && !methodNode.static) {
      // super.test -> objectRef.prototype.test
      return t.memberExpression(superRef, t.identifier("prototype"));
    } else {
      return superRef;
    }
  }

  looseHandle(path: NodePath) {
    let node = path.node;
    if (path.isSuper()) {
      return this.getLooseSuperProperty(node, path.parent);
    } else if (path.isCallExpression()) {
      let callee = node.callee;
      if (!t.isMemberExpression(callee)) return;
      if (!t.isSuper(callee.object)) return;

      // super.test(); -> objectRef.prototype.MethodName.call(this);
      // do the super -> objectRef.prototype here to distingish from member access that specHandle will handle
      callee.object = this.getLooseSuperProperty(callee.object, callee);
      t.appendToMemberExpression(callee, t.identifier("call"));
      node.arguments.unshift(t.thisExpression());
      // no need to requeue, now that everything is converted
    } else {
      // if it is not a call expression, fall back to the spec handle for member access and assignments
      return this.specHandle(path);
    }
  }

  specHandleAssignmentExpression(ref, path, node) {
    if (node.operator === "=") {
      // super.name = "val"; -> _set(Object.getPrototypeOf(objectRef.prototype), "name", this);
      return this.setSuperProperty(node.left.property, node.right, node.left.computed);
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

  specHandle(path: NodePath) {
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
        return;
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
      let binary = t.binaryExpression(node.operator[0], node.argument, t.numericLiteral(1));
      if (node.prefix) {
        // ++super.foo; -> super.foo += 1;
        return this.specHandleAssignmentExpression(null, path, binary);
      } else {
        // super.foo++; -> let _ref = super.foo; super.foo = _ref + 1;
        let ref = path.scope.generateUidIdentifier("ref");
        return this.specHandleAssignmentExpression(ref, path, binary).concat(t.expressionStatement(ref));
      }
    } else if (t.isAssignmentExpression(node) && isMemberExpressionSuper(node.left)) {
      return this.specHandleAssignmentExpression(null, path, node);
    }

    if (!property) return;

    let superProperty = this.getSuperProperty(property, computed, thisReference);

    if (args) {
      return this.optimiseCall(superProperty, args);
    } else {
      return superProperty;
    }
  }

  optimiseCall(callee, args) {
    let thisNode = t.thisExpression();
    thisNode[HARDCORE_THIS_REF] = true;
    return optimiseCall(callee, thisNode, args);
  }
}
