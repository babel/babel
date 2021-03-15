// @flow
import type { HubInterface, NodePath } from "@babel/traverse";
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
function getPrototypeOfExpression(objectRef, isStatic, file, isPrivateMethod) {
  objectRef = t.cloneNode(objectRef);
  const targetRef =
    isStatic || isPrivateMethod
      ? objectRef
      : t.memberExpression(objectRef, t.identifier("prototype"));

  return t.callExpression(file.addHelper("getPrototypeOf"), [targetRef]);
}

export function skipAllButComputedKey(path: NodePath) {
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

// environmentVisitor should be used when traversing the whole class and not for specific class elements/methods.
// For perf reasons, the environmentVisitor will be traversed with `{ noScope: true }`, which means `path.scope` is undefined.
// Avoid using `path.scope` here
export const environmentVisitor = {
  // todo (Babel 8): remove StaticBlock brand checks
  [`${t.staticBlock ? "StaticBlock|" : ""}ClassPrivateProperty|TypeAnnotation`](
    path: NodePath,
  ) {
    path.skip();
  },

  Function(path: NodePath) {
    // Methods will be handled by the Method visit
    if (path.isMethod()) return;
    // Arrow functions inherit their parent's environment
    if (path.isArrowFunctionExpression()) return;
    path.skip();
  },

  "Method|ClassProperty"(path: NodePath) {
    skipAllButComputedKey(path);
  },
};

const visitor = traverse.visitors.merge([
  environmentVisitor,
  {
    Super(path, state) {
      const { node, parentPath } = path;
      if (!parentPath.isMemberExpression({ object: node })) return;
      state.handle(parentPath);
    },
  },
]);

const unshadowSuperBindingVisitor = traverse.visitors.merge([
  environmentVisitor,
  {
    Scopable(path, { refName }) {
      // https://github.com/Zzzen/babel/pull/1#pullrequestreview-564833183
      const binding = path.scope.getOwnBinding(refName);
      if (binding && binding.identifier.name === refName) {
        path.scope.rename(refName);
      }
    },
  },
]);

const specHandlers = {
  memoise(superMember, count) {
    const { scope, node } = superMember;
    const { computed, property } = node;
    if (!computed) {
      return;
    }

    const memo = scope.maybeGenerateMemoised(property);
    if (!memo) {
      return;
    }

    this.memoiser.set(property, memo, count);
  },

  prop(superMember) {
    const { computed, property } = superMember.node;
    if (this.memoiser.has(property)) {
      return t.cloneNode(this.memoiser.get(property));
    }

    if (computed) {
      return t.cloneNode(property);
    }

    return t.stringLiteral(property.name);
  },

  get(superMember) {
    return this._get(superMember, this._getThisRefs());
  },

  _get(superMember, thisRefs) {
    const proto = getPrototypeOfExpression(
      this.getObjectRef(),
      this.isStatic,
      this.file,
      this.isPrivateMethod,
    );
    return t.callExpression(this.file.addHelper("get"), [
      thisRefs.memo ? t.sequenceExpression([thisRefs.memo, proto]) : proto,
      this.prop(superMember),
      thisRefs.this,
    ]);
  },

  _getThisRefs() {
    if (!this.isDerivedConstructor) {
      return { this: t.thisExpression() };
    }
    const thisRef = this.scope.generateDeclaredUidIdentifier("thisSuper");
    return {
      memo: t.assignmentExpression("=", thisRef, t.thisExpression()),
      this: t.cloneNode(thisRef),
    };
  },

  set(superMember, value) {
    const thisRefs = this._getThisRefs();
    const proto = getPrototypeOfExpression(
      this.getObjectRef(),
      this.isStatic,
      this.file,
      this.isPrivateMethod,
    );
    return t.callExpression(this.file.addHelper("set"), [
      thisRefs.memo ? t.sequenceExpression([thisRefs.memo, proto]) : proto,
      this.prop(superMember),
      value,
      thisRefs.this,
      t.booleanLiteral(superMember.isInStrictMode()),
    ]);
  },

  destructureSet(superMember) {
    throw superMember.buildCodeFrameError(
      `Destructuring to a super field is not supported yet.`,
    );
  },

  call(superMember, args) {
    const thisRefs = this._getThisRefs();
    return optimiseCall(
      this._get(superMember, thisRefs),
      t.cloneNode(thisRefs.this),
      args,
      false,
    );
  },

  optionalCall(superMember, args) {
    const thisRefs = this._getThisRefs();
    return optimiseCall(
      this._get(superMember, thisRefs),
      t.cloneNode(thisRefs.this),
      args,
      true,
    );
  },
};

const looseHandlers = {
  ...specHandlers,

  prop(superMember) {
    const { property } = superMember.node;
    if (this.memoiser.has(property)) {
      return t.cloneNode(this.memoiser.get(property));
    }

    return t.cloneNode(property);
  },

  get(superMember) {
    const { isStatic, superRef } = this;
    const { computed } = superMember.node;
    const prop = this.prop(superMember);

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

    return t.memberExpression(object, prop, computed);
  },

  set(superMember, value) {
    const { computed } = superMember.node;
    const prop = this.prop(superMember);

    return t.assignmentExpression(
      "=",
      t.memberExpression(t.thisExpression(), prop, computed),
      value,
    );
  },

  destructureSet(superMember) {
    const { computed } = superMember.node;
    const prop = this.prop(superMember);

    return t.memberExpression(t.thisExpression(), prop, computed);
  },

  call(superMember, args) {
    return optimiseCall(this.get(superMember), t.thisExpression(), args, false);
  },

  optionalCall(superMember, args) {
    return optimiseCall(this.get(superMember), t.thisExpression(), args, true);
  },
};

type ReplaceSupersOptionsBase = {|
  methodPath: NodePath,
  superRef: Object,
  constantSuper: boolean,
  file: any,
  // objectRef might have been shadowed in child scopes,
  // in that case, we need to rename related variables.
  refToPreserve?: BabelNodeIdentifier,
|};

type ReplaceSupersOptions =
  | {|
      ...ReplaceSupersOptionsBase,
      getObjectRef: () => BabelNode,
    |}
  | {|
      ...ReplaceSupersOptionsBase,
      objectRef: BabelNode,
    |};

export default class ReplaceSupers {
  constructor(opts: ReplaceSupersOptions) {
    const path = opts.methodPath;

    this.methodPath = path;
    this.isDerivedConstructor =
      path.isClassMethod({ kind: "constructor" }) && !!opts.superRef;
    this.isStatic = path.isObjectMethod() || path.node.static;
    this.isPrivateMethod = path.isPrivate() && path.isMethod();

    this.file = opts.file;
    this.superRef = opts.superRef;
    this.constantSuper = process.env.BABEL_8_BREAKING
      ? opts.constantSuper
      : // Fallback to isLoose for backward compatibility
        opts.constantSuper ?? (opts: any).isLoose;
    this.opts = opts;
  }

  declare file: HubInterface;
  declare isDerivedConstructor: boolean;
  declare constantSuper: boolean;
  declare isPrivateMethod: boolean;
  declare isStatic: boolean;
  declare methodPath: NodePath;
  declare opts: ReplaceSupersOptions;
  declare superRef: Object;

  getObjectRef() {
    return t.cloneNode(this.opts.objectRef || this.opts.getObjectRef());
  }

  replace() {
    // https://github.com/babel/babel/issues/11994
    if (this.opts.refToPreserve) {
      this.methodPath.traverse(unshadowSuperBindingVisitor, {
        refName: this.opts.refToPreserve.name,
      });
    }

    const handler = this.constantSuper ? looseHandlers : specHandlers;

    memberExpressionToFunctions(this.methodPath, visitor, {
      file: this.file,
      scope: this.methodPath.scope,
      isDerivedConstructor: this.isDerivedConstructor,
      isStatic: this.isStatic,
      isPrivateMethod: this.isPrivateMethod,
      getObjectRef: this.getObjectRef.bind(this),
      superRef: this.superRef,
      ...handler,
    });
  }
}
