import type { File } from "@babel/core";
import environmentVisitor from "@babel/helper-environment-visitor";
import memberExpressionToFunctions from "@babel/helper-member-expression-to-functions";
import type { HandlerState } from "@babel/helper-member-expression-to-functions";
import optimiseCall from "@babel/helper-optimise-call-expression";
import template from "@babel/template";
import traverse from "@babel/traverse";
import type { NodePath, Scope } from "@babel/traverse";
import {
  assignmentExpression,
  booleanLiteral,
  callExpression,
  cloneNode,
  identifier,
  memberExpression,
  sequenceExpression,
  stringLiteral,
  thisExpression,
} from "@babel/types";
import type * as t from "@babel/types";

if (!process.env.BABEL_8_BREAKING) {
  if (!USE_ESM) {
    if (!IS_STANDALONE) {
      // eslint-disable-next-line no-restricted-globals
      const ns = require("@babel/helper-environment-visitor");
      // eslint-disable-next-line no-restricted-globals
      exports.environmentVisitor = ns.default;
      // eslint-disable-next-line no-restricted-globals
      exports.skipAllButComputedKey = ns.skipAllButComputedKey;
    }
  }
}

type ThisRef =
  | {
      memo: t.AssignmentExpression;
      this: t.Identifier;
    }
  | { this: t.ThisExpression };
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
function getPrototypeOfExpression(
  objectRef: t.Identifier,
  isStatic: boolean,
  file: File,
  isPrivateMethod: boolean,
) {
  objectRef = cloneNode(objectRef);
  const targetRef =
    isStatic || isPrivateMethod
      ? objectRef
      : memberExpression(objectRef, identifier("prototype"));

  return callExpression(file.addHelper("getPrototypeOf"), [targetRef]);
}

const visitor = traverse.visitors.merge<
  HandlerState<ReplaceState> & ReplaceState
>([
  environmentVisitor,
  {
    Super(path, state) {
      const { node, parentPath } = path;
      if (!parentPath.isMemberExpression({ object: node })) return;
      state.handle(parentPath);
    },
  },
]);

const unshadowSuperBindingVisitor = traverse.visitors.merge<{
  refName: string;
}>([
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

type SharedState = {
  file: File;
  scope: Scope;
  isDerivedConstructor: boolean;
  isStatic: boolean;
  isPrivateMethod: boolean;
  getObjectRef: () => t.Identifier;
  getSuperRef: () => t.Identifier;
  // we dont need boundGet here, but memberExpressionToFunctions handler needs it.
  boundGet: HandlerState["get"];
};

type Handler = HandlerState<SharedState> & SharedState;
type SuperMember = NodePath<
  t.MemberExpression & {
    object: t.Super;
    property: Exclude<t.MemberExpression["property"], t.PrivateName>;
  }
>;

interface SpecHandler
  extends Pick<
    Handler,
    | "memoise"
    | "get"
    | "set"
    | "destructureSet"
    | "call"
    | "optionalCall"
    | "delete"
  > {
  _get(
    this: Handler & SpecHandler,
    superMember: SuperMember,
    thisRefs: ThisRef,
  ): t.CallExpression;
  _getThisRefs(): ThisRef;
  prop(this: Handler & SpecHandler, superMember: SuperMember): t.Expression;
}

const specHandlers: SpecHandler = {
  memoise(
    this: Handler & SpecHandler,
    superMember: SuperMember,
    count: number,
  ) {
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

  prop(this: Handler & SpecHandler, superMember: SuperMember) {
    const { computed, property } = superMember.node;
    if (this.memoiser.has(property)) {
      return cloneNode(this.memoiser.get(property));
    }

    if (computed) {
      return cloneNode(property);
    }

    return stringLiteral((property as t.Identifier).name);
  },

  get(this: Handler & SpecHandler, superMember: SuperMember) {
    return this._get(superMember, this._getThisRefs());
  },

  _get(
    this: Handler & SpecHandler,
    superMember: SuperMember,
    thisRefs: ThisRef,
  ) {
    const proto = getPrototypeOfExpression(
      this.getObjectRef(),
      this.isStatic,
      this.file,
      this.isPrivateMethod,
    );
    return callExpression(this.file.addHelper("get"), [
      // @ts-expect-error memo does not exist when this.isDerivedConstructor is false
      thisRefs.memo ? sequenceExpression([thisRefs.memo, proto]) : proto,
      this.prop(superMember),
      thisRefs.this,
    ]);
  },

  _getThisRefs(this: Handler & SpecHandler): ThisRef {
    if (!this.isDerivedConstructor) {
      return { this: thisExpression() };
    }
    const thisRef = this.scope.generateDeclaredUidIdentifier("thisSuper");
    return {
      memo: assignmentExpression("=", thisRef, thisExpression()),
      this: cloneNode(thisRef),
    };
  },

  set(
    this: Handler & SpecHandler,
    superMember: SuperMember,
    value: t.Expression,
  ) {
    const thisRefs = this._getThisRefs();
    const proto = getPrototypeOfExpression(
      this.getObjectRef(),
      this.isStatic,
      this.file,
      this.isPrivateMethod,
    );
    return callExpression(this.file.addHelper("set"), [
      // @ts-expect-error memo does not exist when this.isDerivedConstructor is false
      thisRefs.memo ? sequenceExpression([thisRefs.memo, proto]) : proto,
      this.prop(superMember),
      value,
      thisRefs.this,
      booleanLiteral(superMember.isInStrictMode()),
    ]);
  },

  destructureSet(this: Handler & SpecHandler, superMember: SuperMember) {
    throw superMember.buildCodeFrameError(
      `Destructuring to a super field is not supported yet.`,
    );
  },

  call(
    this: Handler & SpecHandler,
    superMember: SuperMember,
    args: t.CallExpression["arguments"],
  ) {
    const thisRefs = this._getThisRefs();
    return optimiseCall(
      this._get(superMember, thisRefs),
      cloneNode(thisRefs.this),
      args,
      false,
    );
  },

  optionalCall(
    this: Handler & SpecHandler,
    superMember: SuperMember,
    args: t.CallExpression["arguments"],
  ) {
    const thisRefs = this._getThisRefs();
    return optimiseCall(
      this._get(superMember, thisRefs),
      cloneNode(thisRefs.this),
      args,
      true,
    );
  },

  delete(this: Handler & SpecHandler, superMember: SuperMember) {
    if (superMember.node.computed) {
      return sequenceExpression([
        callExpression(this.file.addHelper("toPropertyKey"), [
          cloneNode(superMember.node.property),
        ]),
        template.expression.ast`
          function () { throw new ReferenceError("'delete super[expr]' is invalid"); }()
        `,
      ]);
    } else {
      return template.expression.ast`
        function () { throw new ReferenceError("'delete super.prop' is invalid"); }()
      `;
    }
  },
};

const looseHandlers = {
  ...specHandlers,

  prop(this: Handler & typeof specHandlers, superMember: SuperMember) {
    const { property } = superMember.node;
    if (this.memoiser.has(property)) {
      return cloneNode(this.memoiser.get(property));
    }

    return cloneNode(property);
  },

  get(this: Handler & typeof specHandlers, superMember: SuperMember) {
    const { isStatic, getSuperRef } = this;
    const { computed } = superMember.node;
    const prop = this.prop(superMember);

    let object;
    if (isStatic) {
      object =
        getSuperRef() ??
        memberExpression(identifier("Function"), identifier("prototype"));
    } else {
      object = memberExpression(
        getSuperRef() ?? identifier("Object"),
        identifier("prototype"),
      );
    }

    return memberExpression(object, prop, computed);
  },

  set(
    this: Handler & typeof specHandlers,
    superMember: SuperMember,
    value: t.Expression,
  ) {
    const { computed } = superMember.node;
    const prop = this.prop(superMember);

    return assignmentExpression(
      "=",
      memberExpression(thisExpression(), prop, computed),
      value,
    );
  },

  destructureSet(
    this: Handler & typeof specHandlers,
    superMember: SuperMember,
  ) {
    const { computed } = superMember.node;
    const prop = this.prop(superMember);

    return memberExpression(thisExpression(), prop, computed);
  },

  call(
    this: Handler & typeof specHandlers,
    superMember: SuperMember,
    args: t.CallExpression["arguments"],
  ) {
    return optimiseCall(this.get(superMember), thisExpression(), args, false);
  },

  optionalCall(
    this: Handler & typeof specHandlers,
    superMember: SuperMember,
    args: t.CallExpression["arguments"],
  ) {
    return optimiseCall(this.get(superMember), thisExpression(), args, true);
  },
};

type ReplaceSupersOptionsBase = {
  methodPath: NodePath<
    | t.ClassMethod
    | t.ClassProperty
    | t.ObjectMethod
    | t.ClassPrivateMethod
    | t.ClassPrivateProperty
    | t.StaticBlock
  >;
  constantSuper?: boolean;
  file: File;
  // objectRef might have been shadowed in child scopes,
  // in that case, we need to rename related variables.
  refToPreserve?: t.Identifier;
};

type ReplaceSupersOptions = ReplaceSupersOptionsBase &
  (
    | { objectRef?: undefined; getObjectRef: () => t.Node }
    | { objectRef: t.Node; getObjectRef?: undefined }
  ) &
  (
    | { superRef?: undefined; getSuperRef: () => t.Node }
    | { superRef: t.Node; getSuperRef?: undefined }
  );

interface ReplaceState {
  file: File;
  scope: Scope;
  isDerivedConstructor: boolean;
  isStatic: boolean;
  isPrivateMethod: boolean;
  getObjectRef: ReplaceSupers["getObjectRef"];
  getSuperRef: ReplaceSupers["getSuperRef"];
}

export default class ReplaceSupers {
  constructor(opts: ReplaceSupersOptions) {
    const path = opts.methodPath;

    this.methodPath = path;
    this.isDerivedConstructor =
      path.isClassMethod({ kind: "constructor" }) && !!opts.superRef;
    this.isStatic =
      path.isObjectMethod() ||
      // @ts-expect-error static is not in ClassPrivateMethod
      path.node.static ||
      path.isStaticBlock?.();
    this.isPrivateMethod = path.isPrivate() && path.isMethod();

    this.file = opts.file;
    this.constantSuper = process.env.BABEL_8_BREAKING
      ? opts.constantSuper
      : // Fallback to isLoose for backward compatibility
        opts.constantSuper ?? (opts as any).isLoose;
    this.opts = opts;
  }

  declare file: File;
  declare isDerivedConstructor: boolean;
  declare constantSuper: boolean;
  declare isPrivateMethod: boolean;
  declare isStatic: boolean;
  declare methodPath: NodePath;
  declare opts: ReplaceSupersOptions;

  getObjectRef() {
    return cloneNode(this.opts.objectRef || this.opts.getObjectRef());
  }

  getSuperRef() {
    if (this.opts.superRef) return cloneNode(this.opts.superRef);
    if (this.opts.getSuperRef) {
      return cloneNode(this.opts.getSuperRef());
    }
  }

  replace() {
    // https://github.com/babel/babel/issues/11994
    if (this.opts.refToPreserve) {
      this.methodPath.traverse(unshadowSuperBindingVisitor, {
        refName: this.opts.refToPreserve.name,
      });
    }

    const handler = this.constantSuper ? looseHandlers : specHandlers;

    memberExpressionToFunctions<ReplaceState>(this.methodPath, visitor, {
      file: this.file,
      scope: this.methodPath.scope,
      isDerivedConstructor: this.isDerivedConstructor,
      isStatic: this.isStatic,
      isPrivateMethod: this.isPrivateMethod,
      getObjectRef: this.getObjectRef.bind(this),
      getSuperRef: this.getSuperRef.bind(this),
      // we dont need boundGet here, but memberExpressionToFunctions handler needs it.
      boundGet: handler.get,
      ...handler,
    });
  }
}
