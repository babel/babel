import type { NodePath, Scope, Visitor } from "@babel/traverse";
import { types as t, template } from "@babel/core";
import ReplaceSupers from "@babel/helper-replace-supers";
import splitExportDeclaration from "@babel/helper-split-export-declaration";
import * as charCodes from "charcodes";
import type { PluginAPI, PluginObject, PluginPass } from "@babel/core";
import { skipTransparentExprWrappers } from "@babel/helper-skip-transparent-expression-wrappers";
import {
  privateNameVisitorFactory,
  type PrivateNameVisitorState,
} from "./fields.ts";

interface Options {
  /** @deprecated use `constantSuper` assumption instead. Only supported in 2021-12 version. */
  loose?: boolean;
}

type ClassDecoratableElement =
  | t.ClassMethod
  | t.ClassPrivateMethod
  | t.ClassProperty
  | t.ClassPrivateProperty
  | t.ClassAccessorProperty;

type ClassElement =
  | ClassDecoratableElement
  | t.TSDeclareMethod
  | t.TSIndexSignature
  | t.StaticBlock;

// TODO(Babel 8): Only keep 2023-11
export type DecoratorVersionKind =
  | "2023-11"
  | "2023-05"
  | "2023-01"
  | "2022-03"
  | "2021-12";

function incrementId(id: number[], idx = id.length - 1): void {
  // If index is -1, id needs an additional character, unshift A
  if (idx === -1) {
    id.unshift(charCodes.uppercaseA);
    return;
  }

  const current = id[idx];

  if (current === charCodes.uppercaseZ) {
    // if current is Z, skip to a
    id[idx] = charCodes.lowercaseA;
  } else if (current === charCodes.lowercaseZ) {
    // if current is z, reset to A and carry the 1
    id[idx] = charCodes.uppercaseA;
    incrementId(id, idx - 1);
  } else {
    // else, increment by one
    id[idx] = current + 1;
  }
}

/**
 * Generates a new private name that is unique to the given class. This can be
 * used to create extra class fields and methods for the implementation, while
 * keeping the length of those names as small as possible. This is important for
 * minification purposes (though private names can generally be minified,
 * transpilations and polyfills cannot yet).
 */
function createPrivateUidGeneratorForClass(
  classPath: NodePath<t.ClassDeclaration | t.ClassExpression>,
): () => t.PrivateName {
  const currentPrivateId: number[] = [];
  const privateNames = new Set<string>();

  classPath.traverse({
    PrivateName(path) {
      privateNames.add(path.node.id.name);
    },
  });

  return (): t.PrivateName => {
    let reifiedId;
    do {
      incrementId(currentPrivateId);
      reifiedId = String.fromCharCode(...currentPrivateId);
    } while (privateNames.has(reifiedId));

    return t.privateName(t.identifier(reifiedId));
  };
}

/**
 * Wraps the above generator function so that it's run lazily the first time
 * it's actually required. Several types of decoration do not require this, so it
 * saves iterating the class elements an additional time and allocating the space
 * for the Sets of element names.
 */
function createLazyPrivateUidGeneratorForClass(
  classPath: NodePath<t.ClassDeclaration | t.ClassExpression>,
): () => t.PrivateName {
  let generator: () => t.PrivateName;

  return (): t.PrivateName => {
    if (!generator) {
      generator = createPrivateUidGeneratorForClass(classPath);
    }

    return generator();
  };
}

/**
 * Takes a class definition and the desired class name if anonymous and
 * replaces it with an equivalent class declaration (path) which is then
 * assigned to a local variable (id). This allows us to reassign the local variable with the
 * decorated version of the class. The class definition retains its original
 * name so that `toString` is not affected, other references to the class
 * are renamed instead.
 */
function replaceClassWithVar(
  path: NodePath<t.ClassDeclaration | t.ClassExpression>,
  className: string | t.Identifier | t.StringLiteral | undefined,
): {
  id: t.Identifier;
  path: NodePath<t.ClassDeclaration | t.ClassExpression>;
} {
  if (path.type === "ClassDeclaration") {
    const id = path.node.id;
    const className = id.name;
    const varId = path.scope.generateUidIdentifierBasedOnNode(id);
    const classId = t.identifier(className);

    path.scope.rename(className, varId.name);

    path.get("id").replaceWith(classId);

    return { id: t.cloneNode(varId), path };
  } else {
    let varId: t.Identifier;

    if (path.node.id) {
      className = path.node.id.name;
      varId = path.scope.parent.generateDeclaredUidIdentifier(className);
      path.scope.rename(className, varId.name);
    } else {
      varId = path.scope.parent.generateDeclaredUidIdentifier(
        typeof className === "string" ? className : "decorated_class",
      );
    }

    const newClassExpr = t.classExpression(
      typeof className === "string" ? t.identifier(className) : null,
      path.node.superClass,
      path.node.body,
    );

    const [newPath] = path.replaceWith(
      t.sequenceExpression([newClassExpr, varId]),
    );

    return {
      id: t.cloneNode(varId),
      path: newPath.get("expressions.0") as NodePath<t.ClassExpression>,
    };
  }
}

function generateClassProperty(
  key: t.PrivateName | t.Identifier,
  value: t.Expression | undefined,
  isStatic: boolean,
): t.ClassPrivateProperty | t.ClassProperty {
  if (key.type === "PrivateName") {
    return t.classPrivateProperty(key, value, undefined, isStatic);
  } else {
    return t.classProperty(key, value, undefined, undefined, isStatic);
  }
}

function addProxyAccessorsFor(
  className: t.Identifier,
  element: NodePath<ClassDecoratableElement>,
  originalKey: t.PrivateName | t.Expression,
  targetKey: t.PrivateName,
  version: DecoratorVersionKind,
  isComputed: boolean,
  isStatic: boolean,
): void {
  const thisArg =
    (version === "2023-11" ||
      (!process.env.BABEL_8_BREAKING && version === "2023-05")) &&
    isStatic
      ? className
      : t.thisExpression();

  const getterBody = t.blockStatement([
    t.returnStatement(
      t.memberExpression(t.cloneNode(thisArg), t.cloneNode(targetKey)),
    ),
  ]);

  const setterBody = t.blockStatement([
    t.expressionStatement(
      t.assignmentExpression(
        "=",
        t.memberExpression(t.cloneNode(thisArg), t.cloneNode(targetKey)),
        t.identifier("v"),
      ),
    ),
  ]);

  let getter: t.ClassMethod | t.ClassPrivateMethod,
    setter: t.ClassMethod | t.ClassPrivateMethod;

  if (originalKey.type === "PrivateName") {
    getter = t.classPrivateMethod(
      "get",
      t.cloneNode(originalKey),
      [],
      getterBody,
      isStatic,
    );
    setter = t.classPrivateMethod(
      "set",
      t.cloneNode(originalKey),
      [t.identifier("v")],
      setterBody,
      isStatic,
    );
  } else {
    getter = t.classMethod(
      "get",
      t.cloneNode(originalKey),
      [],
      getterBody,
      isComputed,
      isStatic,
    );
    setter = t.classMethod(
      "set",
      t.cloneNode(originalKey),
      [t.identifier("v")],
      setterBody,
      isComputed,
      isStatic,
    );
  }

  element.insertAfter(setter);
  element.insertAfter(getter);
}

function extractProxyAccessorsFor(
  targetKey: t.PrivateName,
  version: DecoratorVersionKind,
): (t.FunctionExpression | t.ArrowFunctionExpression)[] {
  if (version !== "2023-11" && version !== "2023-05" && version !== "2023-01") {
    return [
      template.expression.ast`
        function () {
          return this.${t.cloneNode(targetKey)};
        }
      ` as t.FunctionExpression,
      template.expression.ast`
        function (value) {
          this.${t.cloneNode(targetKey)} = value;
        }
      ` as t.FunctionExpression,
    ];
  }
  return [
    template.expression.ast`
      o => o.${t.cloneNode(targetKey)}
    ` as t.ArrowFunctionExpression,
    template.expression.ast`
      (o, v) => o.${t.cloneNode(targetKey)} = v
    ` as t.ArrowFunctionExpression,
  ];
}

/**
 * Prepend expressions to the field initializer. If the initializer is not defined,
 * this function will wrap the last expression within a `void` unary expression.
 *
 * @param {t.Expression[]} expressions
 * @param {(NodePath<
 *     t.ClassProperty | t.ClassPrivateProperty | t.ClassAccessorProperty
 *   >)} fieldPath
 */
function prependExpressionsToFieldInitializer(
  expressions: t.Expression[],
  fieldPath: NodePath<
    t.ClassProperty | t.ClassPrivateProperty | t.ClassAccessorProperty
  >,
) {
  const initializer = fieldPath.get("value");
  if (initializer.node) {
    expressions.push(initializer.node);
  } else if (expressions.length > 0) {
    expressions[expressions.length - 1] = t.unaryExpression(
      "void",
      expressions[expressions.length - 1],
    );
  }
  initializer.replaceWith(maybeSequenceExpression(expressions));
}

function prependExpressionsToStaticBlock(
  expressions: t.Expression[],
  blockPath: NodePath<t.StaticBlock>,
) {
  blockPath.unshiftContainer(
    "body",
    t.expressionStatement(maybeSequenceExpression(expressions)),
  );
}

function prependExpressionsToConstructor(
  expressions: t.Expression[],
  constructorPath: NodePath<t.ClassMethod>,
) {
  constructorPath.node.body.body.unshift(
    t.expressionStatement(maybeSequenceExpression(expressions)),
  );
}

function isProtoInitCallExpression(
  expression: t.Expression,
  protoInitCall: t.Identifier,
) {
  return (
    t.isCallExpression(expression) &&
    t.isIdentifier(expression.callee, { name: protoInitCall.name })
  );
}

/**
 * Optimize super call and its following expressions
 *
 * @param {t.Expression[]} expressions Mutated by this function. The first element must by a super call
 * @param {t.Identifier} protoInitLocal The generated protoInit id
 * @returns optimized expression
 */
function optimizeSuperCallAndExpressions(
  expressions: t.Expression[],
  protoInitLocal: t.Identifier,
) {
  // Merge `super(), protoInit(this)` into `protoInit(super())`
  if (
    expressions.length >= 2 &&
    isProtoInitCallExpression(expressions[1], protoInitLocal)
  ) {
    const mergedSuperCall = t.callExpression(t.cloneNode(protoInitLocal), [
      expressions[0],
    ]);
    expressions.splice(0, 2, mergedSuperCall);
  }
  // Merge `protoInit(super()), this` into `protoInit(super())`
  if (
    expressions.length >= 2 &&
    t.isThisExpression(expressions[expressions.length - 1]) &&
    isProtoInitCallExpression(
      expressions[expressions.length - 2],
      protoInitLocal,
    )
  ) {
    expressions.splice(expressions.length - 1, 1);
  }
  return maybeSequenceExpression(expressions);
}

/**
 * Insert expressions immediately after super() and optimize the output if possible.
 * This function will preserve the completion result using the trailing this expression.
 *
 * @param {t.Expression[]} expressions
 * @param {NodePath<t.ClassMethod>} constructorPath
 * @param {t.Identifier} protoInitLocal The generated protoInit id
 * @returns
 */
function insertExpressionsAfterSuperCallAndOptimize(
  expressions: t.Expression[],
  constructorPath: NodePath<t.ClassMethod>,
  protoInitLocal: t.Identifier,
) {
  constructorPath.traverse({
    CallExpression: {
      exit(path) {
        if (!path.get("callee").isSuper()) return;
        const newNodes = [
          path.node,
          ...expressions.map(expr => t.cloneNode(expr)),
        ];
        // preserve completion result if super() is in an RHS or a return statement
        if (path.isCompletionRecord()) {
          newNodes.push(t.thisExpression());
        }
        path.replaceWith(
          optimizeSuperCallAndExpressions(newNodes, protoInitLocal),
        );

        path.skip();
      },
    },
    ClassMethod(path) {
      if (path.node.kind === "constructor") {
        path.skip();
      }
    },
  });
}

/**
 * Build a class constructor node from the given expressions. If the class is
 * derived, the constructor will call super() first to ensure that `this`
 * in the expressions work as expected.
 *
 * @param {t.Expression[]} expressions
 * @param {boolean} isDerivedClass
 * @returns The class constructor node
 */
function createConstructorFromExpressions(
  expressions: t.Expression[],
  isDerivedClass: boolean,
) {
  const body: t.Statement[] = [
    t.expressionStatement(maybeSequenceExpression(expressions)),
  ];
  if (isDerivedClass) {
    body.unshift(
      t.expressionStatement(
        t.callExpression(t.super(), [t.spreadElement(t.identifier("args"))]),
      ),
    );
  }
  return t.classMethod(
    "constructor",
    t.identifier("constructor"),
    isDerivedClass ? [t.restElement(t.identifier("args"))] : [],
    t.blockStatement(body),
  );
}

function createStaticBlockFromExpressions(expressions: t.Expression[]) {
  return t.staticBlock([
    t.expressionStatement(maybeSequenceExpression(expressions)),
  ]);
}

// 3 bits reserved to this (0-7)
const FIELD = 0;
const ACCESSOR = 1;
const METHOD = 2;
const GETTER = 3;
const SETTER = 4;

const STATIC_OLD_VERSION = 5; // Before 2023-05
const STATIC = 8; // 1 << 3
const DECORATORS_HAVE_THIS = 16; // 1 << 4

function getElementKind(element: NodePath<ClassDecoratableElement>): number {
  switch (element.node.type) {
    case "ClassProperty":
    case "ClassPrivateProperty":
      return FIELD;
    case "ClassAccessorProperty":
      return ACCESSOR;
    case "ClassMethod":
    case "ClassPrivateMethod":
      if (element.node.kind === "get") {
        return GETTER;
      } else if (element.node.kind === "set") {
        return SETTER;
      } else {
        return METHOD;
      }
  }
}

// Information about the decorators applied to an element
interface DecoratorInfo {
  // An array of applied decorators or a memoised identifier
  decoratorsArray: t.Identifier | t.ArrayExpression | t.Expression;
  decoratorsHaveThis: boolean;

  // The kind of the decorated value, matches the kind value passed to applyDecs
  kind: number;

  // whether or not the field is static
  isStatic: boolean;

  // The name of the decorator
  name: t.StringLiteral | t.Expression;

  privateMethods:
    | (t.FunctionExpression | t.ArrowFunctionExpression)[]
    | undefined;

  // The names of local variables that will be used/returned from the decoration
  locals: t.Identifier | t.Identifier[] | undefined;
}

/**
 * Sort decoration info in the application order:
 * - static non-fields
 * - instance non-fields
 * - static fields
 * - instance fields
 *
 * @param {DecoratorInfo[]} info
 * @returns {DecoratorInfo[]} Sorted decoration info
 */
function toSortedDecoratorInfo(info: DecoratorInfo[]): DecoratorInfo[] {
  return [
    ...info.filter(
      el => el.isStatic && el.kind >= ACCESSOR && el.kind <= SETTER,
    ),
    ...info.filter(
      el => !el.isStatic && el.kind >= ACCESSOR && el.kind <= SETTER,
    ),
    ...info.filter(el => el.isStatic && el.kind === FIELD),
    ...info.filter(el => !el.isStatic && el.kind === FIELD),
  ];
}

type GenerateDecorationListResult = {
  // The zipped decorators array that will be passed to generateDecorationExprs
  decs: t.Expression[];
  // Whether there are non-empty decorator this values
  haveThis: boolean;
};
/**
 * Zip decorators and decorator this values into an array
 *
 * @param {t.Expression[]} decorators
 * @param {((t.Expression | undefined)[])} decoratorsThis decorator this values
 * @param {DecoratorVersionKind} version
 * @returns {GenerateDecorationListResult}
 */
function generateDecorationList(
  decorators: t.Expression[],
  decoratorsThis: (t.Expression | undefined)[],
  version: DecoratorVersionKind,
): GenerateDecorationListResult {
  const decsCount = decorators.length;
  const haveOneThis = decoratorsThis.some(Boolean);
  const decs: t.Expression[] = [];
  for (let i = 0; i < decsCount; i++) {
    if (
      (version === "2023-11" ||
        (!process.env.BABEL_8_BREAKING && version === "2023-05")) &&
      haveOneThis
    ) {
      decs.push(
        decoratorsThis[i] || t.unaryExpression("void", t.numericLiteral(0)),
      );
    }
    decs.push(decorators[i]);
  }

  return { haveThis: haveOneThis, decs };
}

function generateDecorationExprs(
  decorationInfo: DecoratorInfo[],
  version: DecoratorVersionKind,
): t.ArrayExpression {
  return t.arrayExpression(
    decorationInfo.map(el => {
      let flag = el.kind;
      if (el.isStatic) {
        flag +=
          version === "2023-11" ||
          (!process.env.BABEL_8_BREAKING && version === "2023-05")
            ? STATIC
            : STATIC_OLD_VERSION;
      }
      if (el.decoratorsHaveThis) flag += DECORATORS_HAVE_THIS;

      return t.arrayExpression([
        el.decoratorsArray,
        t.numericLiteral(flag),
        el.name,
        ...(el.privateMethods || []),
      ]);
    }),
  );
}

function extractElementLocalAssignments(decorationInfo: DecoratorInfo[]) {
  const localIds: t.Identifier[] = [];

  for (const el of decorationInfo) {
    const { locals } = el;

    if (Array.isArray(locals)) {
      localIds.push(...locals);
    } else if (locals !== undefined) {
      localIds.push(locals);
    }
  }

  return localIds;
}

function addCallAccessorsFor(
  version: DecoratorVersionKind,
  element: NodePath,
  key: t.PrivateName,
  getId: t.Identifier,
  setId: t.Identifier,
  isStatic: boolean,
) {
  element.insertAfter(
    t.classPrivateMethod(
      "get",
      t.cloneNode(key),
      [],
      t.blockStatement([
        t.returnStatement(
          t.callExpression(
            t.cloneNode(getId),
            (process.env.BABEL_8_BREAKING || version === "2023-11") && isStatic
              ? []
              : [t.thisExpression()],
          ),
        ),
      ]),
      isStatic,
    ),
  );

  element.insertAfter(
    t.classPrivateMethod(
      "set",
      t.cloneNode(key),
      [t.identifier("v")],
      t.blockStatement([
        t.expressionStatement(
          t.callExpression(
            t.cloneNode(setId),
            (process.env.BABEL_8_BREAKING || version === "2023-11") && isStatic
              ? [t.identifier("v")]
              : [t.thisExpression(), t.identifier("v")],
          ),
        ),
      ]),
      isStatic,
    ),
  );
}

function movePrivateAccessor(
  element: NodePath<t.ClassPrivateMethod>,
  key: t.PrivateName,
  methodLocalVar: t.Identifier,
  isStatic: boolean,
) {
  let params: (t.Identifier | t.RestElement)[];
  let block: t.Statement[];

  if (element.node.kind === "set") {
    params = [t.identifier("v")];
    block = [
      t.expressionStatement(
        t.callExpression(methodLocalVar, [
          t.thisExpression(),
          t.identifier("v"),
        ]),
      ),
    ];
  } else {
    params = [];
    block = [
      t.returnStatement(t.callExpression(methodLocalVar, [t.thisExpression()])),
    ];
  }

  element.replaceWith(
    t.classPrivateMethod(
      element.node.kind,
      t.cloneNode(key),
      params,
      t.blockStatement(block),
      isStatic,
    ),
  );
}

function isClassDecoratableElementPath(
  path: NodePath<ClassElement>,
): path is NodePath<ClassDecoratableElement> {
  const { type } = path;

  return (
    type !== "TSDeclareMethod" &&
    type !== "TSIndexSignature" &&
    type !== "StaticBlock"
  );
}

function staticBlockToIIFE(block: t.StaticBlock) {
  return t.callExpression(
    t.arrowFunctionExpression([], t.blockStatement(block.body)),
    [],
  );
}

function maybeSequenceExpression(exprs: t.Expression[]) {
  if (exprs.length === 0) return t.unaryExpression("void", t.numericLiteral(0));
  if (exprs.length === 1) return exprs[0];
  return t.sequenceExpression(exprs);
}

/**
 * Create FunctionExpression from a ClassPrivateMethod.
 * The returned FunctionExpression node takes ownership of the private method's body and params.
 *
 * @param {t.ClassPrivateMethod} node
 * @returns
 */
function createFunctionExpressionFromPrivateMethod(node: t.ClassPrivateMethod) {
  const { params, body, generator: isGenerator, async: isAsync } = node;
  return t.functionExpression(
    undefined,
    // @ts-expect-error todo: Improve typings: TSParameterProperty is only allowed in constructor
    params,
    body,
    isGenerator,
    isAsync,
  );
}

function createSetFunctionNameCall(
  state: PluginPass,
  className: t.Identifier | t.StringLiteral,
) {
  return t.callExpression(state.addHelper("setFunctionName"), [
    t.thisExpression(),
    className,
  ]);
}

function createToPropertyKeyCall(state: PluginPass, propertyKey: t.Expression) {
  return t.callExpression(state.addHelper("toPropertyKey"), [propertyKey]);
}

function createPrivateBrandCheckClosure(brandName: t.PrivateName) {
  return t.arrowFunctionExpression(
    [t.identifier("_")],
    t.binaryExpression("in", t.cloneNode(brandName), t.identifier("_")),
  );
}

// Check if the expression does not reference function-specific
// context or the given identifier name.
// `true` means "maybe" and `false` means "no".
function usesFunctionContext(expression: t.Node) {
  try {
    t.traverseFast(expression, node => {
      if (
        t.isThisExpression(node) ||
        t.isSuper(node) ||
        t.isIdentifier(node, { name: "arguments" }) ||
        (t.isMetaProperty(node) && node.meta.name !== "import")
      ) {
        // TODO: Add early return support to t.traverseFast
        throw null;
      }
    });
    return false;
  } catch {
    return true;
  }
}

function usesPrivateField(expression: t.Node) {
  try {
    t.traverseFast(expression, node => {
      if (t.isPrivateName(node)) {
        // TODO: Add early return support to t.traverseFast
        throw null;
      }
    });
    return false;
  } catch {
    return true;
  }
}

function checkPrivateMethodUpdateError(
  path: NodePath<t.Class>,
  decoratedPrivateMethods: Set<string>,
) {
  const privateNameVisitor = privateNameVisitorFactory<
    PrivateNameVisitorState<null>,
    null
  >({
    PrivateName(path, state) {
      if (!state.privateNamesMap.has(path.node.id.name)) return;

      const parentPath = path.parentPath;
      const parentParentPath = parentPath.parentPath;

      if (
        // this.bar().#x = 123;
        (parentParentPath.node.type === "AssignmentExpression" &&
          parentParentPath.node.left === parentPath.node) ||
        // this.#x++;
        parentParentPath.node.type === "UpdateExpression" ||
        // ([...this.#x] = foo);
        parentParentPath.node.type === "RestElement" ||
        // ([this.#x] = foo);
        parentParentPath.node.type === "ArrayPattern" ||
        // ({ a: this.#x } = bar);
        (parentParentPath.node.type === "ObjectProperty" &&
          parentParentPath.node.value === parentPath.node &&
          parentParentPath.parentPath.type === "ObjectPattern") ||
        // for (this.#x of []);
        (parentParentPath.node.type === "ForOfStatement" &&
          parentParentPath.node.left === parentPath.node)
      ) {
        throw path.buildCodeFrameError(
          `Decorated private methods are read-only, but "#${path.node.id.name}" is updated via this expression.`,
        );
      }
    },
  });
  const privateNamesMap = new Map<string, null>();
  for (const name of decoratedPrivateMethods) {
    privateNamesMap.set(name, null);
  }
  path.traverse(privateNameVisitor, {
    privateNamesMap: privateNamesMap,
  });
}

function transformClass(
  path: NodePath<t.Class>,
  state: PluginPass,
  constantSuper: boolean,
  version: DecoratorVersionKind,
  className: string | t.Identifier | t.StringLiteral | undefined,
  propertyVisitor: Visitor<PluginPass>,
): NodePath {
  const body = path.get("body.body");

  const classDecorators = path.node.decorators;
  let hasElementDecorators = false;
  let hasComputedKeysSideEffects = false;
  let elemDecsUseFnContext = false;

  const generateClassPrivateUid = createLazyPrivateUidGeneratorForClass(path);

  const assignments: t.AssignmentExpression[] = [];
  const scopeParent: Scope = path.scope.parent;
  const memoiseExpression = (expression: t.Expression, hint: string) => {
    const localEvaluatedId = scopeParent.generateDeclaredUidIdentifier(hint);
    assignments.push(t.assignmentExpression("=", localEvaluatedId, expression));
    return t.cloneNode(localEvaluatedId);
  };

  let protoInitLocal: t.Identifier;
  let staticInitLocal: t.Identifier;
  // Iterate over the class to see if we need to decorate it, and also to
  // transform simple auto accessors which are not decorated, and handle inferred
  // class name when the initializer of the class field is a class expression
  for (const element of body) {
    if (!isClassDecoratableElementPath(element)) {
      continue;
    }

    if (isDecorated(element.node)) {
      switch (element.node.type) {
        case "ClassProperty":
          // @ts-expect-error todo: propertyVisitor.ClassProperty should be callable. Improve typings.
          propertyVisitor.ClassProperty(
            element as NodePath<t.ClassProperty>,
            state,
          );
          break;
        case "ClassPrivateProperty":
          // @ts-expect-error todo: propertyVisitor.ClassPrivateProperty should be callable. Improve typings.
          propertyVisitor.ClassPrivateProperty(
            element as NodePath<t.ClassPrivateProperty>,
            state,
          );
          break;
        case "ClassAccessorProperty":
          // @ts-expect-error todo: propertyVisitor.ClassAccessorProperty should be callable. Improve typings.
          propertyVisitor.ClassAccessorProperty(
            element as NodePath<t.ClassAccessorProperty>,
            state,
          );
          if (version === "2023-11") {
            break;
          }
        /* fallthrough */
        default:
          if (element.node.static) {
            staticInitLocal ??=
              scopeParent.generateDeclaredUidIdentifier("initStatic");
          } else {
            protoInitLocal ??=
              scopeParent.generateDeclaredUidIdentifier("initProto");
          }
          break;
      }
      hasElementDecorators = true;
      elemDecsUseFnContext ||=
        element.node.decorators.some(usesFunctionContext);
    } else if (element.node.type === "ClassAccessorProperty") {
      // @ts-expect-error todo: propertyVisitor.ClassAccessorProperty should be callable. Improve typings.
      propertyVisitor.ClassAccessorProperty(
        element as NodePath<t.ClassAccessorProperty>,
        state,
      );
      const { key, value, static: isStatic, computed } = element.node;

      const newId = generateClassPrivateUid();
      const newField = generateClassProperty(newId, value, isStatic);
      const keyPath = element.get("key");
      const [newPath] = element.replaceWith(newField);

      addProxyAccessorsFor(
        path.node.id,
        newPath,
        computed && !keyPath.isConstantExpression()
          ? memoiseExpression(
              createToPropertyKeyCall(state, key as t.Expression),
              "computedKey",
            )
          : key,
        newId,
        version,
        computed,
        isStatic,
      );
    }

    if ("computed" in element.node && element.node.computed) {
      hasComputedKeysSideEffects ||= !scopeParent.isStatic(element.node.key);
    }
  }

  if (!classDecorators && !hasElementDecorators) {
    // If nothing is decorated but we have assignments, it must be the memoised
    // computed keys of class accessors
    if (assignments.length > 0) {
      path.insertBefore(assignments.map(expr => t.expressionStatement(expr)));

      // Recrawl the scope to make sure new identifiers are properly synced
      path.scope.crawl();
    }
    // If nothing is decorated and no assignments inserted, return
    return;
  }

  const elementDecoratorInfo: DecoratorInfo[] = [];

  let constructorPath: NodePath<t.ClassMethod> | undefined;
  const decoratedPrivateMethods = new Set<string>();

  let classInitLocal: t.Identifier, classIdLocal: t.Identifier;
  let decoratorReceiverId: t.Identifier | null = null;

  // Memoise the this value `a.b` of decorator member expressions `@a.b.dec`,
  type HandleDecoratorExpressionsResult = {
    // whether the whole decorator list requires memoisation
    hasSideEffects: boolean;
    usesFnContext: boolean;
    // the this value of each decorator if applicable
    decoratorsThis: (t.Expression | undefined)[];
  };
  function handleDecoratorExpressions(
    expressions: t.Expression[],
  ): HandleDecoratorExpressionsResult {
    let hasSideEffects = false;
    let usesFnContext = false;
    const decoratorsThis: (t.Expression | null)[] = [];
    for (const expression of expressions) {
      let object;
      if (
        (version === "2023-11" ||
          (!process.env.BABEL_8_BREAKING && version === "2023-05")) &&
        t.isMemberExpression(expression)
      ) {
        if (t.isSuper(expression.object)) {
          object = t.thisExpression();
        } else if (scopeParent.isStatic(expression.object)) {
          object = t.cloneNode(expression.object);
        } else {
          decoratorReceiverId ??=
            scopeParent.generateDeclaredUidIdentifier("obj");
          object = t.assignmentExpression(
            "=",
            t.cloneNode(decoratorReceiverId),
            expression.object,
          );
          expression.object = t.cloneNode(decoratorReceiverId);
        }
      }
      decoratorsThis.push(object);
      hasSideEffects ||= !scopeParent.isStatic(expression);
      usesFnContext ||= usesFunctionContext(expression);
    }
    return { hasSideEffects, usesFnContext, decoratorsThis };
  }

  const willExtractSomeElemDecs =
    hasComputedKeysSideEffects ||
    (process.env.BABEL_8_BREAKING
      ? elemDecsUseFnContext
      : elemDecsUseFnContext || version !== "2023-11");

  let needsDeclaraionForClassBinding = false;
  let classDecorationsFlag = 0;
  let classDecorations: t.Expression[] = [];
  let classDecorationsId: t.Identifier;
  if (classDecorators) {
    classInitLocal = scopeParent.generateDeclaredUidIdentifier("initClass");
    needsDeclaraionForClassBinding = path.isClassDeclaration();
    ({ id: classIdLocal, path } = replaceClassWithVar(path, className));

    path.node.decorators = null;

    const decoratorExpressions = classDecorators.map(el => el.expression);
    const classDecsUsePrivateName = decoratorExpressions.some(usesPrivateField);
    const { hasSideEffects, decoratorsThis } =
      handleDecoratorExpressions(decoratorExpressions);

    const { haveThis, decs } = generateDecorationList(
      decoratorExpressions,
      decoratorsThis,
      version,
    );
    classDecorationsFlag = haveThis ? 1 : 0;
    classDecorations = decs;

    if (
      (hasSideEffects && willExtractSomeElemDecs) ||
      classDecsUsePrivateName
    ) {
      classDecorationsId = memoiseExpression(
        t.arrayExpression(classDecorations),
        "classDecs",
      );
    }
  } else {
    if (!path.node.id) {
      path.node.id = path.scope.generateUidIdentifier("Class");
    }
    classIdLocal = t.cloneNode(path.node.id);
  }

  let lastInstancePrivateName: t.PrivateName;
  let needsInstancePrivateBrandCheck = false;

  let fieldInitializerExpressions = [];
  let staticFieldInitializerExpressions: t.Expression[] = [];

  if (hasElementDecorators) {
    if (protoInitLocal) {
      const protoInitCall = t.callExpression(t.cloneNode(protoInitLocal), [
        t.thisExpression(),
      ]);
      fieldInitializerExpressions.push(protoInitCall);
    }
    for (const element of body) {
      if (!isClassDecoratableElementPath(element)) {
        if (
          staticFieldInitializerExpressions.length > 0 &&
          element.isStaticBlock()
        ) {
          prependExpressionsToStaticBlock(
            staticFieldInitializerExpressions,
            element,
          );
          staticFieldInitializerExpressions = [];
        }
        continue;
      }

      const { node } = element;
      const decorators = node.decorators;

      const hasDecorators = !!decorators?.length;

      const isComputed = "computed" in node && node.computed;

      let name = "computedKey";

      if (node.key.type === "PrivateName") {
        name = node.key.id.name;
      } else if (!isComputed && node.key.type === "Identifier") {
        name = node.key.name;
      }
      let decoratorsArray: t.Identifier | t.ArrayExpression | t.Expression;
      let decoratorsHaveThis;

      if (hasDecorators) {
        const decoratorExpressions = decorators.map(d => d.expression);
        const { hasSideEffects, usesFnContext, decoratorsThis } =
          handleDecoratorExpressions(decoratorExpressions);
        const { decs, haveThis } = generateDecorationList(
          decoratorExpressions,
          decoratorsThis,
          version,
        );
        decoratorsHaveThis = haveThis;
        decoratorsArray = decs.length === 1 ? decs[0] : t.arrayExpression(decs);
        if (usesFnContext || (hasSideEffects && willExtractSomeElemDecs)) {
          decoratorsArray = memoiseExpression(decoratorsArray, name + "Decs");
        }
      }

      if (isComputed) {
        if (!element.get("key").isConstantExpression()) {
          node.key = memoiseExpression(
            createToPropertyKeyCall(state, node.key as t.Expression),
            "computedKey",
          );
        }
      }

      const { key, static: isStatic } = node;

      const isPrivate = key.type === "PrivateName";

      const kind = getElementKind(element);

      if (isPrivate && !isStatic) {
        if (hasDecorators) {
          needsInstancePrivateBrandCheck = true;
        }
        if (t.isClassPrivateProperty(node) || !lastInstancePrivateName) {
          lastInstancePrivateName = key;
        }
      }

      if (element.isClassMethod({ kind: "constructor" })) {
        constructorPath = element;
      }

      let locals: t.Identifier[];
      if (hasDecorators) {
        let privateMethods: Array<
          t.FunctionExpression | t.ArrowFunctionExpression
        >;

        if (kind === ACCESSOR) {
          const { value } = element.node as t.ClassAccessorProperty;

          const params: t.Expression[] =
            (process.env.BABEL_8_BREAKING || version === "2023-11") && isStatic
              ? []
              : [t.thisExpression()];

          if (value) {
            params.push(t.cloneNode(value));
          }

          const newId = generateClassPrivateUid();
          const newFieldInitId =
            element.scope.parent.generateDeclaredUidIdentifier(`init_${name}`);
          const newValue = t.callExpression(
            t.cloneNode(newFieldInitId),
            params,
          );

          const newField = generateClassProperty(newId, newValue, isStatic);
          const [newPath] = element.replaceWith(newField);

          if (isPrivate) {
            privateMethods = extractProxyAccessorsFor(newId, version);

            const getId = newPath.scope.parent.generateDeclaredUidIdentifier(
              `get_${name}`,
            );
            const setId = newPath.scope.parent.generateDeclaredUidIdentifier(
              `set_${name}`,
            );

            addCallAccessorsFor(version, newPath, key, getId, setId, isStatic);

            locals = [newFieldInitId, getId, setId];
          } else {
            addProxyAccessorsFor(
              path.node.id,
              newPath,
              key,
              newId,
              version,
              isComputed,
              isStatic,
            );
            locals = [newFieldInitId];
          }
        } else if (kind === FIELD) {
          const initId = element.scope.parent.generateDeclaredUidIdentifier(
            `init_${name}`,
          );
          const valuePath = (
            element as NodePath<t.ClassProperty | t.ClassPrivateProperty>
          ).get("value");

          const args: t.Expression[] =
            (process.env.BABEL_8_BREAKING || version === "2023-11") && isStatic
              ? []
              : [t.thisExpression()];
          if (valuePath.node) args.push(valuePath.node);

          valuePath.replaceWith(t.callExpression(t.cloneNode(initId), args));

          locals = [initId];

          if (isPrivate) {
            privateMethods = extractProxyAccessorsFor(key, version);
          }
        } else if (isPrivate) {
          const callId = element.scope.parent.generateDeclaredUidIdentifier(
            `call_${name}`,
          );
          locals = [callId];

          const replaceSupers = new ReplaceSupers({
            constantSuper,
            methodPath: element as NodePath<t.ClassPrivateMethod>,
            objectRef: classIdLocal,
            superRef: path.node.superClass,
            file: state.file,
            refToPreserve: classIdLocal,
          });

          replaceSupers.replace();

          privateMethods = [
            createFunctionExpressionFromPrivateMethod(
              element.node as t.ClassPrivateMethod,
            ),
          ];

          if (kind === GETTER || kind === SETTER) {
            movePrivateAccessor(
              element as NodePath<t.ClassPrivateMethod>,
              t.cloneNode(key),
              t.cloneNode(callId),
              isStatic,
            );
          } else {
            const node = element.node as t.ClassPrivateMethod;

            // Unshift
            path.node.body.body.unshift(
              t.classPrivateProperty(key, t.cloneNode(callId), [], node.static),
            );

            decoratedPrivateMethods.add(key.id.name);

            element.remove();
          }
        }

        let nameExpr: t.Expression;

        if (isComputed) {
          nameExpr = t.cloneNode(key as t.Expression);
        } else if (key.type === "PrivateName") {
          nameExpr = t.stringLiteral(key.id.name);
        } else if (key.type === "Identifier") {
          nameExpr = t.stringLiteral(key.name);
        } else {
          nameExpr = t.cloneNode(key as t.Expression);
        }

        elementDecoratorInfo.push({
          kind,
          decoratorsArray,
          decoratorsHaveThis,
          name: nameExpr,
          isStatic,
          privateMethods,
          locals,
        });

        if (element.node) {
          element.node.decorators = null;
        }
      }

      if (
        fieldInitializerExpressions.length > 0 &&
        !isStatic &&
        (kind === FIELD || kind === ACCESSOR)
      ) {
        prependExpressionsToFieldInitializer(
          fieldInitializerExpressions,
          element as NodePath<t.ClassProperty | t.ClassPrivateProperty>,
        );
        fieldInitializerExpressions = [];
      }

      if (
        staticFieldInitializerExpressions.length > 0 &&
        isStatic &&
        (kind === FIELD || kind === ACCESSOR)
      ) {
        prependExpressionsToFieldInitializer(
          staticFieldInitializerExpressions,
          element as NodePath<t.ClassProperty | t.ClassPrivateProperty>,
        );
        staticFieldInitializerExpressions = [];
      }

      if (hasDecorators && version === "2023-11") {
        if (kind === FIELD || kind === ACCESSOR) {
          const initExtraId = scopeParent.generateDeclaredUidIdentifier(
            `init_extra_${name}`,
          );
          locals.push(initExtraId);
          const initExtraCall = t.callExpression(
            t.cloneNode(initExtraId),
            isStatic ? [] : [t.thisExpression()],
          );
          if (!isStatic) {
            fieldInitializerExpressions.push(initExtraCall);
          } else {
            staticFieldInitializerExpressions.push(initExtraCall);
          }
        }
      }
    }
  }

  if (fieldInitializerExpressions.length > 0) {
    const isDerivedClass = !!path.node.superClass;
    if (constructorPath) {
      if (isDerivedClass) {
        insertExpressionsAfterSuperCallAndOptimize(
          fieldInitializerExpressions,
          constructorPath,
          protoInitLocal,
        );
      } else {
        prependExpressionsToConstructor(
          fieldInitializerExpressions,
          constructorPath,
        );
      }
    } else {
      path.node.body.body.unshift(
        createConstructorFromExpressions(
          fieldInitializerExpressions,
          isDerivedClass,
        ),
      );
    }
    fieldInitializerExpressions = [];
  }

  if (staticFieldInitializerExpressions.length > 0) {
    path.node.body.body.push(
      createStaticBlockFromExpressions(staticFieldInitializerExpressions),
    );
    staticFieldInitializerExpressions = [];
  }

  const sortedElementDecoratorInfo =
    toSortedDecoratorInfo(elementDecoratorInfo);

  const elementDecorations = generateDecorationExprs(
    process.env.BABEL_8_BREAKING || version === "2023-11"
      ? elementDecoratorInfo
      : sortedElementDecoratorInfo,
    version,
  );

  const elementLocals: t.Identifier[] = extractElementLocalAssignments(
    sortedElementDecoratorInfo,
  );

  if (protoInitLocal) {
    elementLocals.push(protoInitLocal);
  }

  if (staticInitLocal) {
    elementLocals.push(staticInitLocal);
  }

  const classLocals: t.Identifier[] = [];
  let classInitInjected = false;
  const classInitCall =
    classInitLocal && t.callExpression(t.cloneNode(classInitLocal), []);

  const originalClass = path.node;

  if (classDecorators) {
    classLocals.push(classIdLocal, classInitLocal);
    const statics: (
      | t.ClassProperty
      | t.ClassPrivateProperty
      | t.ClassPrivateMethod
    )[] = [];
    path.get("body.body").forEach(element => {
      // Static blocks cannot be compiled to "instance blocks", but we can inline
      // them as IIFEs in the next property.
      if (element.isStaticBlock()) {
        staticFieldInitializerExpressions.push(staticBlockToIIFE(element.node));
        element.remove();
        return;
      }

      const isProperty =
        element.isClassProperty() || element.isClassPrivateProperty();

      if (
        (isProperty || element.isClassPrivateMethod()) &&
        element.node.static
      ) {
        if (isProperty && staticFieldInitializerExpressions.length > 0) {
          prependExpressionsToFieldInitializer(
            staticFieldInitializerExpressions,
            element,
          );
          staticFieldInitializerExpressions = [];
        }

        element.node.static = false;
        statics.push(element.node);
        element.remove();
      }
    });

    if (statics.length > 0 || staticFieldInitializerExpressions.length > 0) {
      const staticsClass = template.expression.ast`
        class extends ${state.addHelper("identity")} {}
      ` as t.ClassExpression;
      staticsClass.body.body = [
        t.staticBlock([
          t.toStatement(originalClass, true) ||
            // If toStatement returns false, originalClass must be an anonymous ClassExpression,
            // because `export default @dec ...` has been handled in the export visitor before.
            t.expressionStatement(originalClass as t.ClassExpression),
        ]),
        ...statics,
      ];

      const constructorBody: t.Expression[] = [];

      const newExpr = t.newExpression(staticsClass, []);

      if (staticFieldInitializerExpressions.length > 0) {
        constructorBody.push(...staticFieldInitializerExpressions);
      }
      if (classInitCall) {
        classInitInjected = true;
        constructorBody.push(classInitCall);
      }
      if (constructorBody.length > 0) {
        constructorBody.unshift(
          t.callExpression(t.super(), [t.cloneNode(classIdLocal)]),
        );

        // set isDerivedClass to false as we have already prepended super call
        staticsClass.body.body.push(
          createConstructorFromExpressions(
            constructorBody,
            /* isDerivedClass */ false,
          ),
        );
      } else {
        newExpr.arguments.push(t.cloneNode(classIdLocal));
      }

      path.replaceWith(newExpr);
    }
  }
  if (!classInitInjected && classInitCall) {
    path.node.body.body.push(
      t.staticBlock([t.expressionStatement(classInitCall)]),
    );
  }

  let { superClass } = originalClass;
  if (
    superClass &&
    (process.env.BABEL_8_BREAKING ||
      version === "2023-11" ||
      version === "2023-05")
  ) {
    const id = path.scope.maybeGenerateMemoised(superClass);
    if (id) {
      originalClass.superClass = t.assignmentExpression("=", id, superClass);
      superClass = id;
    }
  }
  originalClass.body.body.unshift(
    t.staticBlock(
      [
        t.expressionStatement(
          createLocalsAssignment(
            elementLocals,
            classLocals,
            elementDecorations,
            classDecorationsId ?? t.arrayExpression(classDecorations),
            t.numericLiteral(classDecorationsFlag),
            needsInstancePrivateBrandCheck ? lastInstancePrivateName : null,
            typeof className === "object" ? className : undefined,
            t.cloneNode(superClass),
            state,
            version,
          ),
        ),
        staticInitLocal &&
          t.expressionStatement(
            t.callExpression(t.cloneNode(staticInitLocal), [
              t.thisExpression(),
            ]),
          ),
      ].filter(Boolean),
    ),
  );

  // When path is a ClassExpression, path.insertBefore will convert `path`
  // into a SequenceExpression
  path.insertBefore(assignments.map(expr => t.expressionStatement(expr)));

  if (needsDeclaraionForClassBinding) {
    path.insertBefore(
      t.variableDeclaration("let", [
        t.variableDeclarator(t.cloneNode(classIdLocal)),
      ]),
    );
  }

  if (decoratedPrivateMethods.size > 0) {
    checkPrivateMethodUpdateError(path, decoratedPrivateMethods);
  }

  // Recrawl the scope to make sure new identifiers are properly synced
  path.scope.crawl();

  return path;
}

function createLocalsAssignment(
  elementLocals: t.Identifier[],
  classLocals: t.Identifier[],
  elementDecorations: t.ArrayExpression | t.Identifier,
  classDecorations: t.ArrayExpression | t.Identifier,
  classDecorationsFlag: t.NumericLiteral,
  maybePrivateBrandName: t.PrivateName | null,
  setClassName: t.Identifier | t.StringLiteral | undefined,
  superClass: null | t.Expression,
  state: PluginPass,
  version: DecoratorVersionKind,
) {
  let lhs, rhs;
  const args: t.Expression[] = [
    setClassName
      ? createSetFunctionNameCall(state, setClassName)
      : t.thisExpression(),
    classDecorations,
    elementDecorations,
  ];

  if (!process.env.BABEL_8_BREAKING) {
    if (version !== "2023-11") {
      args.splice(1, 2, elementDecorations, classDecorations);
    }
    if (
      version === "2021-12" ||
      (version === "2022-03" && !state.availableHelper("applyDecs2203R"))
    ) {
      lhs = t.arrayPattern([...elementLocals, ...classLocals]);
      rhs = t.callExpression(
        state.addHelper(version === "2021-12" ? "applyDecs" : "applyDecs2203"),
        args,
      );
      return t.assignmentExpression("=", lhs, rhs);
    } else if (version === "2022-03") {
      rhs = t.callExpression(state.addHelper("applyDecs2203R"), args);
    } else if (version === "2023-01") {
      if (maybePrivateBrandName) {
        args.push(createPrivateBrandCheckClosure(maybePrivateBrandName));
      }
      rhs = t.callExpression(state.addHelper("applyDecs2301"), args);
    } else if (version === "2023-05") {
      if (
        maybePrivateBrandName ||
        superClass ||
        classDecorationsFlag.value !== 0
      ) {
        args.push(classDecorationsFlag);
      }
      if (maybePrivateBrandName) {
        args.push(createPrivateBrandCheckClosure(maybePrivateBrandName));
      } else if (superClass) {
        args.push(t.unaryExpression("void", t.numericLiteral(0)));
      }
      if (superClass) args.push(superClass);
      rhs = t.callExpression(state.addHelper("applyDecs2305"), args);
    }
  }
  if (process.env.BABEL_8_BREAKING || version === "2023-11") {
    if (
      maybePrivateBrandName ||
      superClass ||
      classDecorationsFlag.value !== 0
    ) {
      args.push(classDecorationsFlag);
    }
    if (maybePrivateBrandName) {
      args.push(createPrivateBrandCheckClosure(maybePrivateBrandName));
    } else if (superClass) {
      args.push(t.unaryExpression("void", t.numericLiteral(0)));
    }
    if (superClass) args.push(superClass);
    rhs = t.callExpression(state.addHelper("applyDecs2311"), args);
  }

  // optimize `{ c: [classLocals] } = applyDecsHelper(...)` to
  // `[classLocals] = applyDecsHelper(...).c`
  if (elementLocals.length > 0) {
    if (classLocals.length > 0) {
      lhs = t.objectPattern([
        t.objectProperty(t.identifier("e"), t.arrayPattern(elementLocals)),
        t.objectProperty(t.identifier("c"), t.arrayPattern(classLocals)),
      ]);
    } else {
      lhs = t.arrayPattern(elementLocals);
      rhs = t.memberExpression(rhs, t.identifier("e"), false, false);
    }
  } else {
    // invariant: classLocals.length > 0
    lhs = t.arrayPattern(classLocals);
    rhs = t.memberExpression(rhs, t.identifier("c"), false, false);
  }

  return t.assignmentExpression("=", lhs, rhs);
}

function isProtoKey(
  node: t.Identifier | t.StringLiteral | t.BigIntLiteral | t.NumericLiteral,
) {
  return node.type === "Identifier"
    ? node.name === "__proto__"
    : node.value === "__proto__";
}

function isDecorated(node: t.Class | ClassDecoratableElement) {
  return node.decorators && node.decorators.length > 0;
}

function shouldTransformElement(node: ClassElement) {
  switch (node.type) {
    case "ClassAccessorProperty":
      return true;
    case "ClassMethod":
    case "ClassProperty":
    case "ClassPrivateMethod":
    case "ClassPrivateProperty":
      return isDecorated(node);
    default:
      return false;
  }
}

function shouldTransformClass(node: t.Class) {
  return isDecorated(node) || node.body.body.some(shouldTransformElement);
}

// Todo: unify name references logic with helper-function-name
function NamedEvaluationVisitoryFactory(
  isAnonymous: (path: NodePath) => boolean,
  visitor: (
    path: NodePath,
    state: PluginPass,
    name:
      | string
      | t.Identifier
      | t.StringLiteral
      | t.NumericLiteral
      | t.BigIntLiteral,
  ) => void,
) {
  function handleComputedProperty(
    propertyPath: NodePath<
      t.ObjectProperty | t.ClassProperty | t.ClassAccessorProperty
    >,
    key: t.Expression,
    state: PluginPass,
  ): t.StringLiteral | t.Identifier {
    switch (key.type) {
      case "StringLiteral":
        return t.stringLiteral(key.value);
      case "NumericLiteral":
      case "BigIntLiteral": {
        const keyValue = key.value + "";
        propertyPath.get("key").replaceWith(t.stringLiteral(keyValue));
        return t.stringLiteral(keyValue);
      }
      default: {
        const ref = propertyPath.scope.maybeGenerateMemoised(key);
        propertyPath
          .get("key")
          .replaceWith(
            t.assignmentExpression(
              "=",
              ref,
              createToPropertyKeyCall(state, key),
            ),
          );
        return t.cloneNode(ref);
      }
    }
  }
  return {
    VariableDeclarator(path, state) {
      const id = path.node.id;
      if (id.type === "Identifier") {
        const initializer = skipTransparentExprWrappers(path.get("init"));
        if (isAnonymous(initializer)) {
          const name = id.name;
          visitor(initializer, state, name);
        }
      }
    },
    AssignmentExpression(path, state) {
      const id = path.node.left;
      if (id.type === "Identifier") {
        const initializer = skipTransparentExprWrappers(path.get("right"));
        if (isAnonymous(initializer)) {
          switch (path.node.operator) {
            case "=":
            case "&&=":
            case "||=":
            case "??=":
              visitor(initializer, state, id.name);
          }
        }
      }
    },
    AssignmentPattern(path, state) {
      const id = path.node.left;
      if (id.type === "Identifier") {
        const initializer = skipTransparentExprWrappers(path.get("right"));
        if (isAnonymous(initializer)) {
          const name = id.name;
          visitor(initializer, state, name);
        }
      }
    },
    // We listen on ObjectExpression so that we don't have to visit
    // the object properties under object patterns
    ObjectExpression(path, state) {
      for (const propertyPath of path.get("properties")) {
        const { node } = propertyPath;
        if (node.type !== "ObjectProperty") continue;
        const id = node.key;
        const initializer = skipTransparentExprWrappers(
          propertyPath.get("value"),
        );
        if (isAnonymous(initializer)) {
          if (!node.computed) {
            // 13.2.5.5 RS: PropertyDefinitionEvaluation
            if (!isProtoKey(id as t.StringLiteral | t.Identifier)) {
              if (id.type === "Identifier") {
                visitor(initializer, state, id.name);
              } else {
                const className = t.stringLiteral(
                  (id as t.StringLiteral | t.NumericLiteral | t.BigIntLiteral)
                    .value + "",
                );
                visitor(initializer, state, className);
              }
            }
          } else {
            const ref = handleComputedProperty(
              propertyPath as NodePath<t.ObjectProperty>,
              // The key of a computed object property must not be a private name
              id as t.Expression,
              state,
            );
            visitor(initializer, state, ref);
          }
        }
      }
    },
    ClassPrivateProperty(path, state) {
      const { node } = path;
      const initializer = skipTransparentExprWrappers(path.get("value"));
      if (isAnonymous(initializer)) {
        const className = t.stringLiteral("#" + node.key.id.name);
        visitor(initializer, state, className);
      }
    },
    ClassAccessorProperty(path, state) {
      const { node } = path;
      const id = node.key;
      const initializer = skipTransparentExprWrappers(path.get("value"));
      if (isAnonymous(initializer)) {
        if (!node.computed) {
          if (id.type === "Identifier") {
            visitor(initializer, state, id.name);
          } else if (id.type === "PrivateName") {
            const className = t.stringLiteral("#" + id.id.name);
            visitor(initializer, state, className);
          } else {
            const className = t.stringLiteral(
              (id as t.StringLiteral | t.NumericLiteral | t.BigIntLiteral)
                .value + "",
            );
            visitor(initializer, state, className);
          }
        } else {
          const ref = handleComputedProperty(
            path,
            // The key of a computed accessor property must not be a private name
            id as t.Expression,
            state,
          );
          visitor(initializer, state, ref);
        }
      }
    },
    ClassProperty(path, state) {
      const { node } = path;
      const id = node.key;
      const initializer = skipTransparentExprWrappers(path.get("value"));
      if (isAnonymous(initializer)) {
        if (!node.computed) {
          if (id.type === "Identifier") {
            visitor(initializer, state, id.name);
          } else {
            const className = t.stringLiteral(
              (id as t.StringLiteral | t.NumericLiteral | t.BigIntLiteral)
                .value + "",
            );
            visitor(initializer, state, className);
          }
        } else {
          const ref = handleComputedProperty(path, id, state);
          visitor(initializer, state, ref);
        }
      }
    },
  } satisfies Visitor<PluginPass>;
}

function isDecoratedAnonymousClassExpression(path: NodePath) {
  return (
    path.isClassExpression({ id: null }) && shouldTransformClass(path.node)
  );
}

export default function (
  { assertVersion, assumption }: PluginAPI,
  { loose }: Options,
  version: DecoratorVersionKind,
  inherits: PluginObject["inherits"],
): PluginObject {
  if (process.env.BABEL_8_BREAKING) {
    assertVersion(process.env.IS_PUBLISH ? PACKAGE_JSON.version : "^7.21.0");
  } else {
    if (
      version === "2023-11" ||
      version === "2023-05" ||
      version === "2023-01"
    ) {
      assertVersion("^7.21.0");
    } else if (version === "2021-12") {
      assertVersion("^7.16.0");
    } else {
      assertVersion("^7.19.0");
    }
  }

  const VISITED = new WeakSet<NodePath>();
  const constantSuper = assumption("constantSuper") ?? loose;

  const namedEvaluationVisitor: Visitor<PluginPass> =
    NamedEvaluationVisitoryFactory(
      isDecoratedAnonymousClassExpression,
      visitClass,
    );

  function visitClass(
    path: NodePath<t.Class>,
    state: PluginPass,
    className: string | t.Identifier | t.StringLiteral | undefined,
  ) {
    if (VISITED.has(path)) return;
    const { node } = path;
    className ??= node.id?.name;
    const newPath = transformClass(
      path,
      state,
      constantSuper,
      version,
      className,
      namedEvaluationVisitor,
    );
    if (newPath) {
      VISITED.add(newPath);
      return;
    }
    VISITED.add(path);
  }

  return {
    name: "proposal-decorators",
    inherits: inherits,

    visitor: {
      ExportDefaultDeclaration(path, state) {
        const { declaration } = path.node;
        if (
          declaration?.type === "ClassDeclaration" &&
          // When compiling class decorators we need to replace the class
          // binding, so we must split it in two separate declarations.
          isDecorated(declaration)
        ) {
          const isAnonymous = !declaration.id;
          const updatedVarDeclarationPath = splitExportDeclaration(
            path,
          ) as unknown as NodePath<t.ClassDeclaration>;
          if (isAnonymous) {
            visitClass(
              updatedVarDeclarationPath,
              state,
              t.stringLiteral("default"),
            );
          }
        }
      },
      ExportNamedDeclaration(path) {
        const { declaration } = path.node;
        if (
          declaration?.type === "ClassDeclaration" &&
          // When compiling class decorators we need to replace the class
          // binding, so we must split it in two separate declarations.
          isDecorated(declaration)
        ) {
          splitExportDeclaration(path);
        }
      },

      Class(path, state) {
        visitClass(path, state, undefined);
      },

      ...namedEvaluationVisitor,
    },
  };
}
