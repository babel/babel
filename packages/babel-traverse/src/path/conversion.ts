// This file contains methods that convert the path node into another node or some other type of data.

import {
  arrowFunctionExpression,
  assignmentExpression,
  binaryExpression,
  blockStatement,
  callExpression,
  conditionalExpression,
  expressionStatement,
  identifier,
  isIdentifier,
  jsxIdentifier,
  logicalExpression,
  LOGICAL_OPERATORS,
  memberExpression,
  metaProperty,
  numericLiteral,
  objectExpression,
  restElement,
  returnStatement,
  sequenceExpression,
  spreadElement,
  stringLiteral,
  super as _super,
  thisExpression,
  toExpression,
  unaryExpression,
} from "@babel/types";
import type * as t from "@babel/types";
import environmentVisitor from "@babel/helper-environment-visitor";
import nameFunction from "@babel/helper-function-name";
import { merge as mergeVisitors } from "../visitors";
import type NodePath from "./index";

export function toComputedKey(this: NodePath) {
  let key;
  if (this.isMemberExpression()) {
    key = this.node.property;
  } else if (this.isProperty() || this.isMethod()) {
    key = this.node.key;
  } else {
    throw new ReferenceError("todo");
  }

  // @ts-expect-error todo(flow->ts) computed does not exist in ClassPrivateProperty
  if (!this.node.computed) {
    if (isIdentifier(key)) key = stringLiteral(key.name);
  }

  return key;
}

export function ensureBlock(
  this: NodePath<
    t.Loop | t.WithStatement | t.Function | t.LabeledStatement | t.CatchClause
  >,
) {
  const body = this.get("body");
  const bodyNode = body.node;

  if (Array.isArray(body)) {
    throw new Error("Can't convert array path to a block statement");
  }
  if (!bodyNode) {
    throw new Error("Can't convert node without a body");
  }

  if (body.isBlockStatement()) {
    return bodyNode;
  }

  const statements: Array<t.Statement> = [];

  let stringPath = "body";
  let key;
  let listKey;
  if (body.isStatement()) {
    listKey = "body";
    key = 0;
    statements.push(body.node);
  } else {
    stringPath += ".body.0";
    if (this.isFunction()) {
      key = "argument";
      statements.push(returnStatement(body.node as t.Expression));
    } else {
      key = "expression";
      statements.push(expressionStatement(body.node as t.Expression));
    }
  }

  this.node.body = blockStatement(statements);
  const parentPath = this.get(stringPath) as NodePath;
  body.setup(
    parentPath,
    listKey
      ? // @ts-expect-error listKey must present in parent path
        parentPath.node[listKey]
      : parentPath.node,
    listKey,
    key,
  );

  return this.node;
}

if (!process.env.BABEL_8_BREAKING) {
  if (!USE_ESM) {
    /**
     * Keeping this for backward-compatibility. You should use arrowFunctionToExpression() for >=7.x.
     */
    // eslint-disable-next-line no-restricted-globals
    exports.arrowFunctionToShadowed = function (this: NodePath) {
      if (!this.isArrowFunctionExpression()) return;

      this.arrowFunctionToExpression();
    };
  }
}

/**
 * Given an arbitrary function, process its content as if it were an arrow function, moving references
 * to "this", "arguments", "super", and such into the function's parent scope. This method is useful if
 * you have wrapped some set of items in an IIFE or other function, but want "this", "arguments", and super"
 * to continue behaving as expected.
 */
export function unwrapFunctionEnvironment(this: NodePath) {
  if (
    !this.isArrowFunctionExpression() &&
    !this.isFunctionExpression() &&
    !this.isFunctionDeclaration()
  ) {
    throw this.buildCodeFrameError(
      "Can only unwrap the environment of a function.",
    );
  }

  hoistFunctionEnvironment(this);
}

function setType<N extends t.Node, T extends N["type"]>(
  path: NodePath<N>,
  type: T,
): asserts path is NodePath<Extract<N, { type: T }>> {
  path.node.type = type;
}

/**
 * Convert a given arrow function into a normal ES5 function expression.
 */
export function arrowFunctionToExpression(
  this: NodePath<t.ArrowFunctionExpression>,
  {
    allowInsertArrow = true,
    allowInsertArrowWithRest = allowInsertArrow,
    noNewArrows = process.env.BABEL_8_BREAKING
      ? // TODO(Babel 8): Consider defaulting to `false` for spec compliancy
        true
      : !arguments[0]?.specCompliant,
  }: {
    allowInsertArrow?: boolean | void;
    allowInsertArrowWithRest?: boolean | void;
    noNewArrows?: boolean;
  } = {},
): NodePath<
  Exclude<t.Function, t.Method | t.ArrowFunctionExpression> | t.CallExpression
> {
  if (!this.isArrowFunctionExpression()) {
    throw (this as NodePath).buildCodeFrameError(
      "Cannot convert non-arrow function to a function expression.",
    );
  }

  const { thisBinding, fnPath: fn } = hoistFunctionEnvironment(
    this,
    noNewArrows,
    allowInsertArrow,
    allowInsertArrowWithRest,
  );

  // @ts-expect-error TS requires explicit fn type annotation
  fn.ensureBlock();
  setType(fn, "FunctionExpression");

  if (!noNewArrows) {
    const checkBinding = thisBinding
      ? null
      : fn.scope.generateUidIdentifier("arrowCheckId");
    if (checkBinding) {
      fn.parentPath.scope.push({
        id: checkBinding,
        init: objectExpression([]),
      });
    }

    fn.get("body").unshiftContainer(
      "body",
      expressionStatement(
        callExpression(this.hub.addHelper("newArrowCheck"), [
          thisExpression(),
          checkBinding
            ? identifier(checkBinding.name)
            : identifier(thisBinding),
        ]),
      ),
    );

    fn.replaceWith(
      callExpression(
        memberExpression(
          // @ts-expect-error TS can't infer nameFunction returns CallExpression | ArrowFunctionExpression here
          nameFunction(this, true) || fn.node,
          identifier("bind"),
        ),
        [checkBinding ? identifier(checkBinding.name) : thisExpression()],
      ),
    );

    return fn.get("callee.object");
  }

  return fn;
}

const getSuperCallsVisitor = mergeVisitors<{
  allSuperCalls: NodePath<t.CallExpression>[];
}>([
  {
    CallExpression(child, { allSuperCalls }) {
      if (!child.get("callee").isSuper()) return;
      allSuperCalls.push(child);
    },
  },
  environmentVisitor,
]);

/**
 * Given a function, traverse its contents, and if there are references to "this", "arguments", "super",
 * or "new.target", ensure that these references reference the parent environment around this function.
 *
 * @returns `thisBinding`: the name of the injected reference to `this`; for example "_this"
 * @returns `fnPath`: the new path to the function node. This is different from the fnPath
 *                    parameter when the function node is wrapped in another node.
 */
function hoistFunctionEnvironment(
  fnPath: NodePath<t.Function>,
  // TODO(Babel 8): Consider defaulting to `false` for spec compliancy
  noNewArrows: boolean | void = true,
  allowInsertArrow: boolean | void = true,
  allowInsertArrowWithRest: boolean | void = true,
): { thisBinding: string; fnPath: NodePath<t.Function> } {
  let arrowParent;
  let thisEnvFn: NodePath<t.Function> = fnPath.findParent(p => {
    if (p.isArrowFunctionExpression()) {
      arrowParent ??= p;
      return false;
    }
    return (
      p.isFunction() ||
      p.isProgram() ||
      p.isClassProperty({ static: false }) ||
      p.isClassPrivateProperty({ static: false })
    );
  }) as NodePath<t.Function>;
  const inConstructor = thisEnvFn.isClassMethod({ kind: "constructor" });

  if (thisEnvFn.isClassProperty() || thisEnvFn.isClassPrivateProperty()) {
    if (arrowParent) {
      thisEnvFn = arrowParent;
    } else if (allowInsertArrow) {
      // It's safe to wrap this function in another and not hoist to the
      // top level because the 'this' binding is constant in class
      // properties (since 'super()' has already been called), so we don't
      // need to capture/reassign it at the top level.
      fnPath.replaceWith(
        callExpression(
          arrowFunctionExpression([], toExpression(fnPath.node)),
          [],
        ),
      );
      thisEnvFn = fnPath.get("callee") as NodePath<t.ArrowFunctionExpression>;
      fnPath = thisEnvFn.get("body") as NodePath<t.FunctionExpression>;
    } else {
      throw fnPath.buildCodeFrameError(
        "Unable to transform arrow inside class property",
      );
    }
  }

  const { thisPaths, argumentsPaths, newTargetPaths, superProps, superCalls } =
    getScopeInformation(fnPath);

  // Convert all super() calls in the constructor, if super is used in an arrow.
  if (inConstructor && superCalls.length > 0) {
    if (!allowInsertArrow) {
      throw superCalls[0].buildCodeFrameError(
        "When using '@babel/plugin-transform-arrow-functions', " +
          "it's not possible to compile `super()` in an arrow function without compiling classes.\n" +
          "Please add '@babel/plugin-transform-classes' to your Babel configuration.",
      );
    }
    if (!allowInsertArrowWithRest) {
      // preset-env with target `since 2017` enables `transform-parameters` without `transform-classes`.
      throw superCalls[0].buildCodeFrameError(
        "When using '@babel/plugin-transform-parameters', " +
          "it's not possible to compile `super()` in an arrow function with default or rest parameters without compiling classes.\n" +
          "Please add '@babel/plugin-transform-classes' to your Babel configuration.",
      );
    }
    const allSuperCalls: NodePath<t.CallExpression>[] = [];
    thisEnvFn.traverse(getSuperCallsVisitor, { allSuperCalls });
    const superBinding = getSuperBinding(thisEnvFn);
    allSuperCalls.forEach(superCall => {
      const callee = identifier(superBinding);
      callee.loc = superCall.node.callee.loc;

      superCall.get("callee").replaceWith(callee);
    });
  }

  // Convert all "arguments" references in the arrow to point at the alias.
  if (argumentsPaths.length > 0) {
    const argumentsBinding = getBinding(thisEnvFn, "arguments", () => {
      const args = () => identifier("arguments");
      if (thisEnvFn.scope.path.isProgram()) {
        return conditionalExpression(
          binaryExpression(
            "===",
            unaryExpression("typeof", args()),
            stringLiteral("undefined"),
          ),
          thisEnvFn.scope.buildUndefinedNode(),
          args(),
        );
      } else {
        return args();
      }
    });

    argumentsPaths.forEach(argumentsChild => {
      const argsRef = identifier(argumentsBinding);
      argsRef.loc = argumentsChild.node.loc;

      argumentsChild.replaceWith(argsRef);
    });
  }

  // Convert all "new.target" references in the arrow to point at the alias.
  if (newTargetPaths.length > 0) {
    const newTargetBinding = getBinding(thisEnvFn, "newtarget", () =>
      metaProperty(identifier("new"), identifier("target")),
    );

    newTargetPaths.forEach(targetChild => {
      const targetRef = identifier(newTargetBinding);
      targetRef.loc = targetChild.node.loc;

      targetChild.replaceWith(targetRef);
    });
  }

  // Convert all "super.prop" references to point at aliases.
  if (superProps.length > 0) {
    if (!allowInsertArrow) {
      throw superProps[0].buildCodeFrameError(
        "When using '@babel/plugin-transform-arrow-functions', " +
          "it's not possible to compile `super.prop` in an arrow function without compiling classes.\n" +
          "Please add '@babel/plugin-transform-classes' to your Babel configuration.",
      );
    }

    const flatSuperProps: NodePath<t.MemberExpression>[] = superProps.reduce(
      (acc, superProp) => acc.concat(standardizeSuperProperty(superProp)),
      [],
    );

    flatSuperProps.forEach(superProp => {
      const key = superProp.node.computed
        ? ""
        : // @ts-expect-error super property must not contain private name
          superProp.get("property").node.name;

      const superParentPath = superProp.parentPath;

      const isAssignment = superParentPath.isAssignmentExpression({
        left: superProp.node,
      });
      const isCall = superParentPath.isCallExpression({
        callee: superProp.node,
      });
      const isTaggedTemplate = superParentPath.isTaggedTemplateExpression({
        tag: superProp.node,
      });
      const superBinding = getSuperPropBinding(thisEnvFn, isAssignment, key);

      const args: t.Expression[] = [];
      if (superProp.node.computed) {
        // SuperProperty must not be a private name
        args.push(superProp.get("property").node as t.Expression);
      }

      if (isAssignment) {
        const value = superParentPath.node.right;
        args.push(value);
      }

      const call = callExpression(identifier(superBinding), args);

      if (isCall) {
        superParentPath.unshiftContainer("arguments", thisExpression());
        superProp.replaceWith(memberExpression(call, identifier("call")));

        thisPaths.push(
          superParentPath.get("arguments.0") as NodePath<t.ThisExpression>,
        );
      } else if (isAssignment) {
        // Replace not only the super.prop, but the whole assignment
        superParentPath.replaceWith(call);
      } else if (isTaggedTemplate) {
        superProp.replaceWith(
          callExpression(memberExpression(call, identifier("bind"), false), [
            thisExpression(),
          ]),
        );

        thisPaths.push(
          superProp.get("arguments.0") as NodePath<t.ThisExpression>,
        );
      } else {
        superProp.replaceWith(call);
      }
    });
  }

  // Convert all "this" references in the arrow to point at the alias.
  let thisBinding: string | null;
  if (thisPaths.length > 0 || !noNewArrows) {
    thisBinding = getThisBinding(thisEnvFn, inConstructor);

    if (
      noNewArrows ||
      // In subclass constructors, still need to rewrite because "this" can't be bound in spec mode
      // because it might not have been initialized yet.
      (inConstructor && hasSuperClass(thisEnvFn))
    ) {
      thisPaths.forEach(thisChild => {
        const thisRef = thisChild.isJSX()
          ? jsxIdentifier(thisBinding)
          : identifier(thisBinding);

        thisRef.loc = thisChild.node.loc;
        thisChild.replaceWith(thisRef);
      });

      if (!noNewArrows) thisBinding = null;
    }
  }

  return { thisBinding, fnPath };
}

type LogicalOp = Parameters<typeof logicalExpression>[0];
type BinaryOp = Parameters<typeof binaryExpression>[0];

function isLogicalOp(op: string): op is LogicalOp {
  return LOGICAL_OPERATORS.includes(op);
}

function standardizeSuperProperty(
  superProp: NodePath<t.MemberExpression>,
):
  | [NodePath<t.MemberExpression>]
  | [NodePath<t.MemberExpression>, NodePath<t.MemberExpression>] {
  if (
    superProp.parentPath.isAssignmentExpression() &&
    superProp.parentPath.node.operator !== "="
  ) {
    const assignmentPath = superProp.parentPath;

    const op = assignmentPath.node.operator.slice(0, -1) as
      | LogicalOp
      | BinaryOp;

    const value = assignmentPath.node.right;

    const isLogicalAssignment = isLogicalOp(op);

    if (superProp.node.computed) {
      // from: super[foo] **= 4;
      // to:   super[tmp = foo] = super[tmp] ** 4;

      // from: super[foo] ??= 4;
      // to:   super[tmp = foo] ?? super[tmp] = 4;

      const tmp = superProp.scope.generateDeclaredUidIdentifier("tmp");

      const object = superProp.node.object;
      const property = superProp.node.property as t.Expression;

      assignmentPath
        .get("left")
        .replaceWith(
          memberExpression(
            object,
            assignmentExpression("=", tmp, property),
            true /* computed */,
          ),
        );

      assignmentPath
        .get("right")
        .replaceWith(
          rightExpression(
            isLogicalAssignment ? "=" : op,
            memberExpression(object, identifier(tmp.name), true /* computed */),
            value,
          ),
        );
    } else {
      // from: super.foo **= 4;
      // to:   super.foo = super.foo ** 4;

      // from: super.foo ??= 4;
      // to:   super.foo ?? super.foo = 4;

      const object = superProp.node.object;
      const property = superProp.node.property as t.Identifier;

      assignmentPath
        .get("left")
        .replaceWith(memberExpression(object, property));

      assignmentPath
        .get("right")
        .replaceWith(
          rightExpression(
            isLogicalAssignment ? "=" : op,
            memberExpression(object, identifier(property.name)),
            value,
          ),
        );
    }

    if (isLogicalAssignment) {
      assignmentPath.replaceWith(
        logicalExpression(
          op,
          assignmentPath.node.left as t.MemberExpression,
          assignmentPath.node.right,
        ),
      );
    } else {
      assignmentPath.node.operator = "=";
    }

    return [
      assignmentPath.get("left") as NodePath<t.MemberExpression>,
      assignmentPath.get("right").get("left"),
    ];
  } else if (superProp.parentPath.isUpdateExpression()) {
    const updateExpr = superProp.parentPath;

    const tmp = superProp.scope.generateDeclaredUidIdentifier("tmp");
    const computedKey = superProp.node.computed
      ? superProp.scope.generateDeclaredUidIdentifier("prop")
      : null;

    const parts: t.Expression[] = [
      assignmentExpression(
        "=",
        tmp,
        memberExpression(
          superProp.node.object,
          computedKey
            ? assignmentExpression(
                "=",
                computedKey,
                superProp.node.property as t.Expression,
              )
            : superProp.node.property,
          superProp.node.computed,
        ),
      ),
      assignmentExpression(
        "=",
        memberExpression(
          superProp.node.object,
          computedKey ? identifier(computedKey.name) : superProp.node.property,
          superProp.node.computed,
        ),
        binaryExpression(
          // map `++` to `+`, and `--` to `-`
          superProp.parentPath.node.operator[0] as "+" | "-",
          identifier(tmp.name),
          numericLiteral(1),
        ),
      ),
    ];

    if (!superProp.parentPath.node.prefix) {
      parts.push(identifier(tmp.name));
    }

    updateExpr.replaceWith(sequenceExpression(parts));

    const left = updateExpr.get(
      "expressions.0.right",
    ) as NodePath<t.MemberExpression>;
    const right = updateExpr.get(
      "expressions.1.left",
    ) as NodePath<t.MemberExpression>;
    return [left, right];
  }

  return [superProp];

  function rightExpression(
    op: BinaryOp | "=",
    left: t.MemberExpression,
    right: t.Expression,
  ) {
    if (op === "=") {
      return assignmentExpression("=", left, right);
    } else {
      return binaryExpression(op, left, right);
    }
  }
}

function hasSuperClass(thisEnvFn: NodePath<t.Function>) {
  return (
    thisEnvFn.isClassMethod() &&
    !!(thisEnvFn.parentPath.parentPath.node as t.Class).superClass
  );
}

const assignSuperThisVisitor = mergeVisitors<{
  supers: WeakSet<t.CallExpression>;
  thisBinding: string;
}>([
  {
    CallExpression(child, { supers, thisBinding }) {
      if (!child.get("callee").isSuper()) return;
      if (supers.has(child.node)) return;
      supers.add(child.node);

      child.replaceWithMultiple([
        child.node,
        assignmentExpression("=", identifier(thisBinding), identifier("this")),
      ]);
    },
  },
  environmentVisitor,
]);

// Create a binding that evaluates to the "this" of the given function.
function getThisBinding(
  thisEnvFn: NodePath<t.Function>,
  inConstructor: boolean,
) {
  return getBinding(thisEnvFn, "this", thisBinding => {
    if (!inConstructor || !hasSuperClass(thisEnvFn)) return thisExpression();

    thisEnvFn.traverse(assignSuperThisVisitor, {
      supers: new WeakSet(),
      thisBinding,
    });
  });
}

// Create a binding for a function that will call "super()" with arguments passed through.
function getSuperBinding(thisEnvFn: NodePath<t.Function>) {
  return getBinding(thisEnvFn, "supercall", () => {
    const argsBinding = thisEnvFn.scope.generateUidIdentifier("args");
    return arrowFunctionExpression(
      [restElement(argsBinding)],
      callExpression(_super(), [spreadElement(identifier(argsBinding.name))]),
    );
  });
}

// Create a binding for a function that will call "super.foo" or "super[foo]".
function getSuperPropBinding(
  thisEnvFn: NodePath<t.Function>,
  isAssignment: boolean,
  propName: string,
) {
  const op = isAssignment ? "set" : "get";

  return getBinding(thisEnvFn, `superprop_${op}:${propName || ""}`, () => {
    const argsList = [];

    let fnBody;
    if (propName) {
      // () => super.foo
      fnBody = memberExpression(_super(), identifier(propName));
    } else {
      const method = thisEnvFn.scope.generateUidIdentifier("prop");
      // (method) => super[method]
      argsList.unshift(method);
      fnBody = memberExpression(
        _super(),
        identifier(method.name),
        true /* computed */,
      );
    }

    if (isAssignment) {
      const valueIdent = thisEnvFn.scope.generateUidIdentifier("value");
      argsList.push(valueIdent);

      fnBody = assignmentExpression("=", fnBody, identifier(valueIdent.name));
    }

    return arrowFunctionExpression(argsList, fnBody);
  });
}

function getBinding(
  thisEnvFn: NodePath,
  key: string,
  init: (name: string) => t.Expression,
) {
  const cacheKey = "binding:" + key;
  let data: string | undefined = thisEnvFn.getData(cacheKey);
  if (!data) {
    const id = thisEnvFn.scope.generateUidIdentifier(key);
    data = id.name;
    thisEnvFn.setData(cacheKey, data);

    thisEnvFn.scope.push({
      id: id,
      init: init(data),
    });
  }

  return data;
}

type ScopeInfo = {
  thisPaths: NodePath<t.ThisExpression | t.JSXIdentifier>[];
  superCalls: NodePath<t.CallExpression>[];
  superProps: NodePath<t.MemberExpression>[];
  argumentsPaths: NodePath<t.Identifier | t.JSXIdentifier>[];
  newTargetPaths: NodePath<t.MetaProperty>[];
};

const getScopeInformationVisitor = mergeVisitors<ScopeInfo>([
  {
    ThisExpression(child, { thisPaths }) {
      thisPaths.push(child);
    },
    JSXIdentifier(child, { thisPaths }) {
      if (child.node.name !== "this") return;
      if (
        !child.parentPath.isJSXMemberExpression({ object: child.node }) &&
        !child.parentPath.isJSXOpeningElement({ name: child.node })
      ) {
        return;
      }

      thisPaths.push(child);
    },
    CallExpression(child, { superCalls }) {
      if (child.get("callee").isSuper()) superCalls.push(child);
    },
    MemberExpression(child, { superProps }) {
      if (child.get("object").isSuper()) superProps.push(child);
    },
    Identifier(child, { argumentsPaths }) {
      if (!child.isReferencedIdentifier({ name: "arguments" })) return;

      let curr = child.scope;
      do {
        if (curr.hasOwnBinding("arguments")) {
          curr.rename("arguments");
          return;
        }
        if (curr.path.isFunction() && !curr.path.isArrowFunctionExpression()) {
          break;
        }
      } while ((curr = curr.parent));

      argumentsPaths.push(child);
    },
    MetaProperty(child, { newTargetPaths }) {
      if (!child.get("meta").isIdentifier({ name: "new" })) return;
      if (!child.get("property").isIdentifier({ name: "target" })) return;

      newTargetPaths.push(child);
    },
  },
  environmentVisitor,
]);

function getScopeInformation(fnPath: NodePath) {
  const thisPaths: ScopeInfo["thisPaths"] = [];
  const argumentsPaths: ScopeInfo["argumentsPaths"] = [];
  const newTargetPaths: ScopeInfo["newTargetPaths"] = [];
  const superProps: ScopeInfo["superProps"] = [];
  const superCalls: ScopeInfo["superCalls"] = [];

  fnPath.traverse(getScopeInformationVisitor, {
    thisPaths,
    argumentsPaths,
    newTargetPaths,
    superProps,
    superCalls,
  });

  return {
    thisPaths,
    argumentsPaths,
    newTargetPaths,
    superProps,
    superCalls,
  };
}
