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
  unaryExpression,
} from "@babel/types";
import type * as t from "@babel/types";
import nameFunction from "@babel/helper-function-name";
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
    listKey ? parentPath.node[listKey] : parentPath.node,
    listKey,
    key,
  );

  return this.node;
}

/**
 * Keeping this for backward-compatibility. You should use arrowFunctionToExpression() for >=7.x.
 */
// TODO(Babel 8): Remove this
export function arrowFunctionToShadowed(this: NodePath) {
  if (!this.isArrowFunctionExpression()) return;

  this.arrowFunctionToExpression();
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

/**
 * Convert a given arrow function into a normal ES5 function expression.
 */
export function arrowFunctionToExpression(
  this: NodePath,
  {
    allowInsertArrow = true,
    /** @deprecated Use `noNewArrows` instead */
    specCompliant = false,
    // TODO(Babel 8): Consider defaulting to `false` for spec compliancy
    noNewArrows = !specCompliant,
  } = {},
) {
  if (!this.isArrowFunctionExpression()) {
    throw this.buildCodeFrameError(
      "Cannot convert non-arrow function to a function expression.",
    );
  }

  const thisBinding = hoistFunctionEnvironment(
    this,
    noNewArrows,
    allowInsertArrow,
  );

  this.ensureBlock();
  // @ts-expect-error todo(flow->ts): avoid mutating nodes
  this.node.type = "FunctionExpression";
  if (!noNewArrows) {
    const checkBinding = thisBinding
      ? null
      : this.parentPath.scope.generateUidIdentifier("arrowCheckId");
    if (checkBinding) {
      this.parentPath.scope.push({
        id: checkBinding,
        init: objectExpression([]),
      });
    }

    this.get("body").unshiftContainer(
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

    this.replaceWith(
      callExpression(
        memberExpression(
          nameFunction(this, true) || this.node,
          identifier("bind"),
        ),
        [checkBinding ? identifier(checkBinding.name) : thisExpression()],
      ),
    );
  }
}

/**
 * Given a function, traverse its contents, and if there are references to "this", "arguments", "super",
 * or "new.target", ensure that these references reference the parent environment around this function.
 */
function hoistFunctionEnvironment(
  fnPath,
  // TODO(Babel 8): Consider defaulting to `false` for spec compliancy
  noNewArrows = true,
  allowInsertArrow = true,
) {
  const thisEnvFn = fnPath.findParent(p => {
    return (
      (p.isFunction() && !p.isArrowFunctionExpression()) ||
      p.isProgram() ||
      p.isClassProperty({ static: false })
    );
  });
  const inConstructor = thisEnvFn?.node.kind === "constructor";

  if (thisEnvFn.isClassProperty()) {
    throw fnPath.buildCodeFrameError(
      "Unable to transform arrow inside class property",
    );
  }

  const { thisPaths, argumentsPaths, newTargetPaths, superProps, superCalls } =
    getScopeInformation(fnPath);

  // Convert all super() calls in the constructor, if super is used in an arrow.
  if (inConstructor && superCalls.length > 0) {
    if (!allowInsertArrow) {
      throw superCalls[0].buildCodeFrameError(
        "Unable to handle nested super() usage in arrow",
      );
    }
    const allSuperCalls = [];
    thisEnvFn.traverse({
      Function(child) {
        if (child.isArrowFunctionExpression()) return;
        child.skip();
      },
      ClassProperty(child) {
        child.skip();
      },
      CallExpression(child) {
        if (!child.get("callee").isSuper()) return;
        allSuperCalls.push(child);
      },
    });
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
        "Unable to handle nested super.prop usage",
      );
    }

    const flatSuperProps = superProps.reduce(
      (acc, superProp) => acc.concat(standardizeSuperProperty(superProp)),
      [],
    );

    flatSuperProps.forEach(superProp => {
      const key = superProp.node.computed
        ? ""
        : superProp.get("property").node.name;

      const isAssignment = superProp.parentPath.isAssignmentExpression({
        left: superProp.node,
      });
      const isCall = superProp.parentPath.isCallExpression({
        callee: superProp.node,
      });
      const superBinding = getSuperPropBinding(thisEnvFn, isAssignment, key);

      const args = [];
      if (superProp.node.computed) {
        args.push(superProp.get("property").node);
      }

      if (isAssignment) {
        const value = superProp.parentPath.node.right;
        args.push(value);
      }

      const call = callExpression(identifier(superBinding), args);

      if (isCall) {
        superProp.parentPath.unshiftContainer("arguments", thisExpression());
        superProp.replaceWith(memberExpression(call, identifier("call")));

        thisPaths.push(superProp.parentPath.get("arguments.0"));
      } else if (isAssignment) {
        // Replace not only the super.prop, but the whole assignment
        superProp.parentPath.replaceWith(call);
      } else {
        superProp.replaceWith(call);
      }
    });
  }

  // Convert all "this" references in the arrow to point at the alias.
  let thisBinding;
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

  return thisBinding;
}

function standardizeSuperProperty(superProp) {
  if (
    superProp.parentPath.isAssignmentExpression() &&
    superProp.parentPath.node.operator !== "="
  ) {
    const assignmentPath = superProp.parentPath;

    const op = assignmentPath.node.operator.slice(0, -1);
    const value = assignmentPath.node.right;

    assignmentPath.node.operator = "=";
    if (superProp.node.computed) {
      const tmp = superProp.scope.generateDeclaredUidIdentifier("tmp");

      assignmentPath
        .get("left")
        .replaceWith(
          memberExpression(
            superProp.node.object,
            assignmentExpression("=", tmp, superProp.node.property),
            true /* computed */,
          ),
        );

      assignmentPath
        .get("right")
        .replaceWith(
          binaryExpression(
            op,
            memberExpression(
              superProp.node.object,
              identifier(tmp.name),
              true /* computed */,
            ),
            value,
          ),
        );
    } else {
      assignmentPath
        .get("left")
        .replaceWith(
          memberExpression(superProp.node.object, superProp.node.property),
        );

      assignmentPath
        .get("right")
        .replaceWith(
          binaryExpression(
            op,
            memberExpression(
              superProp.node.object,
              identifier(superProp.node.property.name),
            ),
            value,
          ),
        );
    }
    return [
      assignmentPath.get("left"),
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
            ? assignmentExpression("=", computedKey, superProp.node.property)
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
        binaryExpression("+", identifier(tmp.name), numericLiteral(1)),
      ),
    ];

    if (!superProp.parentPath.node.prefix) {
      parts.push(identifier(tmp.name));
    }

    updateExpr.replaceWith(sequenceExpression(parts));

    const left = updateExpr.get("expressions.0.right");
    const right = updateExpr.get("expressions.1.left");
    return [left, right];
  }

  return [superProp];
}

function hasSuperClass(thisEnvFn) {
  return (
    thisEnvFn.isClassMethod() &&
    !!thisEnvFn.parentPath.parentPath.node.superClass
  );
}

// Create a binding that evaluates to the "this" of the given function.
function getThisBinding(thisEnvFn, inConstructor) {
  return getBinding(thisEnvFn, "this", thisBinding => {
    if (!inConstructor || !hasSuperClass(thisEnvFn)) return thisExpression();

    const supers = new WeakSet();
    thisEnvFn.traverse({
      Function(child) {
        if (child.isArrowFunctionExpression()) return;
        child.skip();
      },
      ClassProperty(child) {
        child.skip();
      },
      CallExpression(child) {
        if (!child.get("callee").isSuper()) return;
        if (supers.has(child.node)) return;
        supers.add(child.node);

        child.replaceWithMultiple([
          child.node,
          assignmentExpression(
            "=",
            identifier(thisBinding),
            identifier("this"),
          ),
        ]);
      },
    });
  });
}

// Create a binding for a function that will call "super()" with arguments passed through.
function getSuperBinding(thisEnvFn) {
  return getBinding(thisEnvFn, "supercall", () => {
    const argsBinding = thisEnvFn.scope.generateUidIdentifier("args");
    return arrowFunctionExpression(
      [restElement(argsBinding)],
      callExpression(_super(), [spreadElement(identifier(argsBinding.name))]),
    );
  });
}

// Create a binding for a function that will call "super.foo" or "super[foo]".
function getSuperPropBinding(thisEnvFn, isAssignment, propName) {
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

function getBinding(thisEnvFn, key, init) {
  const cacheKey = "binding:" + key;
  let data = thisEnvFn.getData(cacheKey);
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

function getScopeInformation(fnPath) {
  const thisPaths = [];
  const argumentsPaths = [];
  const newTargetPaths = [];
  const superProps = [];
  const superCalls = [];

  fnPath.traverse({
    ClassProperty(child) {
      child.skip();
    },
    Function(child) {
      if (child.isArrowFunctionExpression()) return;
      child.skip();
    },
    ThisExpression(child) {
      thisPaths.push(child);
    },
    JSXIdentifier(child) {
      if (child.node.name !== "this") return;
      if (
        !child.parentPath.isJSXMemberExpression({ object: child.node }) &&
        !child.parentPath.isJSXOpeningElement({ name: child.node })
      ) {
        return;
      }

      thisPaths.push(child);
    },
    CallExpression(child) {
      if (child.get("callee").isSuper()) superCalls.push(child);
    },
    MemberExpression(child) {
      if (child.get("object").isSuper()) superProps.push(child);
    },
    ReferencedIdentifier(child) {
      if (child.node.name !== "arguments") return;

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
    MetaProperty(child) {
      if (!child.get("meta").isIdentifier({ name: "new" })) return;
      if (!child.get("property").isIdentifier({ name: "target" })) return;

      newTargetPaths.push(child);
    },
  });

  return {
    thisPaths,
    argumentsPaths,
    newTargetPaths,
    superProps,
    superCalls,
  };
}
