import type { NodePath, Scope } from "@babel/traverse";
import traverse from "@babel/traverse";
import memberExpressionToFunctions from "@babel/helper-member-expression-to-functions";
import optimiseCall from "@babel/helper-optimise-call-expression";
import * as t from "@babel/types";

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
      // TODO get this shit out of here
      if (!path.getFunctionParent().isArrowFunctionExpression()) {
        state.returns.push(path);
      }
    },

    Super(path, state) {
      const { node, parentPath } = path;
      if (parentPath.isCallExpression({ callee: node })) {
        state.bareSupers.add(parentPath);
        return;
      }
      state.handle(parentPath);
    },
  },
]);

const specHandlers = {
  get(superMember) {
    const { computed, property } = superMember.node;
    let thisExpr = t.thisExpression();

    // TODO Remove
    if (this.inConstructor) {
      thisExpr = t.callExpression(
        this.file.addHelper("assertThisInitialized"),
        [thisExpr],
      );
    }

    return t.callExpression(this.file.addHelper("get"), [
      getPrototypeOfExpression(this.getObjectRef(), this.isStatic, this.file),
      computed ? property : t.stringLiteral(property.name),
      thisExpr,
    ]);
  },

  set(superMember, value) {
    const { computed, property } = superMember.node;

    return t.callExpression(this.file.addHelper("set"), [
      getPrototypeOfExpression(this.getObjectRef(), this.isStatic, this.file),
      computed ? property : t.stringLiteral(property.name),
      value,
      t.thisExpression(),
      t.booleanLiteral(superMember.isInStrictMode()),
    ]);
  },

  call(superMember, args) {
    return optimiseCall(this.get(superMember), t.thisExpression(), args);
  },
};

const looseHandlers = {
  get(superMember) {
    const { isStatic, superRef } = this;
    const { property, computed } = superMember.node;
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

    return t.memberExpression(object, property, computed);
  },

  set(superMember, value) {
    // TODO https://github.com/babel/babel/pull/7553#issuecomment-381434519
    return t.assignmentExpression("=", this.get(superMember), value);
  },

  call(superMember, args) {
    return t.callExpression(
      t.memberExpression(this.get(superMember), t.identifier("call")),
      [t.thisExpression(), ...args],
    );
  },
};

export default class ReplaceSupers {
  constructor(opts: Object) {
    const path = opts.methodPath;

    this.methodPath = path;
    this.isStatic =
      path.isClassMethod({ static: true }) || path.isObjectMethod();
    this.inClass = path.isClassMethod();
    this.inConstructor = path.isClassMethod({ kind: "constructor" });
    this.scope = this.methodPath.scope;

    this.file = opts.file;
    this.superRef = opts.superRef;
    this.isLoose = opts.isLoose;
    this.opts = opts;

    this.bareSupers = new Set();
    this.returns = [];
  }

  methodPath: NodePath;
  superRef: Object;
  isStatic: boolean;
  inClass: boolean;
  inConstructor: boolean;
  isLoose: boolean;
  scope: Scope;
  file;
  opts: {
    getObjetRef: Function,
    methodPath: NodePath,
    superRef: Object,
    isLoose: boolean,
    file: any,
  };

  getObjectRef() {
    return t.cloneNode(this.opts.objectRef || this.opts.getObjectRef());
  }

  replace() {
    const { get, set, call } = this.isLoose ? looseHandlers : specHandlers;

    memberExpressionToFunctions(this.methodPath, visitor, {
      get,
      set,
      call,

      // Necessary state
      file: this.file,
      isStatic: this.isStatic,
      getObjectRef: this.getObjectRef.bind(this),
      superRef: this.superRef,

      // TODO Remove this shit.
      inConstructor: this.inConstructor,
      returns: this.returns,
      bareSupers: this.bareSupers,
    });
  }
}
