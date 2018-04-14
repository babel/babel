import type { NodePath, Scope } from "@babel/traverse";
import traverse from "@babel/traverse";
import optimiseCall from "@babel/helper-optimise-call-expression";
import * as t from "@babel/types";

// ✌️
const HARDCORE_THIS_REF = new WeakSet();

/**
 * Creates an expression which result is the proto of objectRef.
 *
 * @example <caption>isStatic === true</caption>
 *
 *   helpers.getPrototypeOf(CLASS)
 *
 * @example <caption>isStatic === false</caption>
 *
 *   helpers.getPrototypeOf(CLASS.prototype)
 */
function getPrototypeOfExpression(objectRef, isStatic, file) {
  objectRef = t.cloneNode(objectRef);
  const targetRef = isStatic
    ? objectRef
    : t.memberExpression(objectRef, t.identifier("prototype"));

  return t.callExpression(file.addHelper("getPrototypeOf"), [targetRef]);
}

function skipAllButComputedKey(path) {
  // If the path isn't computed, just skip everything.
  if (!path.node.computed) {
    path.skip();
    return;
  }

  // So it's got a computed key. Make sure to skip every other key the
  // traversal would visit.
  const keys = t.VISITOR_KEYS[path.type];
  for (const key of keys) {
    if (key !== "key") path.skipKey(key);
  }
}

export const environmentVisitor = {
  Function(path) {
    // Methods will be handled by the Method visit
    if (path.isMethod()) return;
    // Arrow functions inherit their parent's environment
    if (path.isArrowFunctionExpression()) return;
    path.skip();
  },

  Method(path) {
    skipAllButComputedKey(path);
  },

  "ClassProperty|ClassPrivateProperty"(path) {
    // If the property is computed, we need to visit everything.
    if (path.node.static) return;
    skipAllButComputedKey(path);
  },
};

const visitor = traverse.visitors.merge([
  environmentVisitor,
  {
    ReturnStatement(path, state) {
      if (!path.getFunctionParent().isArrowFunctionExpression()) {
        state.returns.push(path);
      }
    },

    ThisExpression(path, state) {
      if (!HARDCORE_THIS_REF.has(path.node)) {
        state.thises.push(path);
      }
    },

    Super(path, state) {
      state.hasSuper = true;

      const { node, parentPath } = path;
      if (parentPath.isCallExpression({ callee: node })) {
        state.bareSupers.add(parentPath);
        return;
      }
      state[state.isLoose ? "looseHandle" : "specHandle"](path);
    },
  },
]);

export default class ReplaceSupers {
  constructor(opts: Object, inClass?: boolean = false) {
    this.forceSuperMemoisation = opts.forceSuperMemoisation;
    this.methodPath = opts.methodPath;
    this.methodNode = opts.methodNode;
    this.superRef = opts.superRef;
    this.isStatic = opts.isStatic;
    this.hasSuper = false;
    this.inClass = inClass;
    this.inConstructor = opts.inConstructor;
    this.isLoose = opts.isLoose;
    this.scope = this.methodPath.scope;
    this.file = opts.file;
    this.opts = opts;

    this.bareSupers = new Set();
    this.returns = [];
    this.thises = [];
  }

  forceSuperMemoisation: boolean;
  methodPath: NodePath;
  methodNode: Object;
  superRef: Object;
  isStatic: boolean;
  hasSuper: boolean;
  inClass: boolean;
  inConstructor: boolean;
  isLoose: boolean;
  scope: Scope;
  file;
  opts: {
    forceSuperMemoisation: boolean,
    getObjetRef: Function,
    methodPath: NodePath,
    methodNode: Object,
    superRef: Object,
    inConstructor: boolean,
    isStatic: boolean,
    isLoose: boolean,
    file: any,
  };

  getObjectRef() {
    return t.cloneNode(this.opts.objectRef || this.opts.getObjectRef());
  }

  /**
   * Sets a super class value of the named property.
   *
   * @example
   *
   *   _set(Object.getPrototypeOf(CLASS.prototype), "METHOD", "VALUE", this, isStrict)
   *
   */

  setSuperProperty(
    property: Object,
    value: Object,
    isComputed: boolean,
    isStrict: boolean,
  ): Object {
    return t.callExpression(this.file.addHelper("set"), [
      getPrototypeOfExpression(this.getObjectRef(), this.isStatic, this.file),
      isComputed ? property : t.stringLiteral(property.name),
      value,
      t.thisExpression(),
      t.booleanLiteral(isStrict),
    ]);
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
    let thisExpr = t.thisExpression();
    if (this.inConstructor) {
      thisExpr = t.callExpression(
        this.file.addHelper("assertThisInitialized"),
        [thisExpr],
      );
    }

    return t.callExpression(this.file.addHelper("get"), [
      getPrototypeOfExpression(this.getObjectRef(), this.isStatic, this.file),
      isComputed ? property : t.stringLiteral(property.name),
      thisExpr,
    ]);
  }

  replace() {
    this.methodPath.traverse(visitor, this);
  }

  getLooseSuperProperty(path) {
    const { isStatic, superRef } = this;

    let object;
    if (isStatic) {
      object = superRef
        ? t.cloneNode(superRef)
        : t.memberExpression(
            t.identifier("Function"),
            t.identifier("prototype"),
          );
    } else {
      object = superRef
        ? t.memberExpression(t.cloneNode(superRef), t.identifier("prototype"))
        : t.memberExpression(t.identifier("Object"), t.identifier("prototype"));
    }
    path.get("object").replaceWith(object);
  }

  looseHandle(path: NodePath) {
    const { node, parentPath } = path;

    // super.test
    if (parentPath.isMemberExpression({ object: node })) {
      this.getLooseSuperProperty(parentPath);
    }

    // super.test()
    // though, it's SUPER.prototype.test() after the above.
    const grandParentPath = parentPath.parentPath;
    const callee = parentPath.node;
    if (grandParentPath.isCallExpression({ callee })) {
      grandParentPath
        .get("callee")
        .replaceWith(t.memberExpression(callee, t.identifier("call")));
      grandParentPath.node.arguments.unshift(t.thisExpression());
    }
  }

  specHandleAssignmentExpression(path) {
    const { node } = path;
    const { operator } = node;
    const { computed, property } = node.left;
    if (operator === "=") {
      // super.name = "val"
      // to
      // _set(Object.getPrototypeOf(CLASS.prototype), "name", this);
      const setter = this.setSuperProperty(
        property,
        node.right,
        computed,
        path.isInStrictMode(),
      );
      return [setter];
    }

    // super.age += 2;
    // to
    // _set(
    //   Object.getPrototypeOf(CLASS.prototype),
    //   "name",
    //   _get(Object.getPrototypeOf(CLASS.prototype), "METHOD", this) + 2,
    //   this,
    //   true,
    // );
    // TODO this needs cleanup. Should be a single proto lookup
    const ref = path.scope.generateDeclaredUidIdentifier("ref");
    const setter = this.setSuperProperty(
      property,
      t.binaryExpression(operator.slice(0, -1), t.cloneNode(ref), node.right),
      computed,
      path.isInStrictMode(),
    );
    return [
      t.assignmentExpression(
        "=",
        t.cloneNode(ref),
        this.getSuperProperty(property, computed),
      ),
      setter,
    ];
  }

  specHandle(path: NodePath) {
    const { node, parentPath } = path;
    const grandParentPath = parentPath.parentPath;
    let parent = parentPath.node;

    if (grandParentPath.isUpdateExpression({ argument: parent })) {
      const { operator, prefix } = grandParentPath.node;
      const assignment = t.assignmentExpression(
        operator[0] + "=",
        parent,
        t.numericLiteral(1),
      );
      grandParentPath.replaceWith(assignment);

      // ++super.foo;
      // to
      // _ref = Number(super.foo), super.foo = _ref + 1
      // super.foo++;
      // to
      // _ref = Number(super.foo), super.foo = _ref + 1, _ref
      const nodes = this.specHandleAssignmentExpression(grandParentPath);
      const [first] = nodes;
      first.right = t.callExpression(t.identifier("Number"), [first.right]);

      // Postfix returns the old value, not the new.
      if (!prefix) {
        nodes.push(t.cloneNode(first.left));
      }
      grandParentPath.replaceWith(t.sequenceExpression(nodes));
      return;
    }

    if (grandParentPath.isAssignmentExpression({ left: parent })) {
      grandParentPath.replaceWithMultiple(
        this.specHandleAssignmentExpression(grandParentPath),
      );
      return;
    }

    if (parentPath.isMemberExpression({ object: node })) {
      // super.name;
      // to
      // _get(Object.getPrototypeOf(CLASS.prototype), "name", this);
      const { node } = parentPath;
      const { computed, property } = node;

      parent = this.getSuperProperty(property, computed);
      parentPath.replaceWith(parent);
    }

    if (grandParentPath.isCallExpression({ callee: parent })) {
      // _get(Object.getPrototypeOf(CLASS.prototype), "test", this)();
      // to
      // _get(Object.getPrototypeOf(CLASS.prototype), "test", this).call(this);
      const call = this.optimiseCall(parent, grandParentPath.node.arguments);
      grandParentPath.replaceWith(call);
      return;
    }
  }

  optimiseCall(callee, args) {
    const thisNode = t.thisExpression();
    HARDCORE_THIS_REF.add(thisNode);
    return optimiseCall(callee, thisNode, args);
  }
}
