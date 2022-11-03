import type { NodePath, Scope, Visitor } from "@babel/traverse";
import { types as t, template } from "@babel/core";
import syntaxDecorators from "@babel/plugin-syntax-decorators";
import ReplaceSupers from "@babel/helper-replace-supers";
import splitExportDeclaration from "@babel/helper-split-export-declaration";
import * as charCodes from "charcodes";
import type { PluginAPI, PluginObject, PluginPass } from "@babel/core";
import type { Options } from "./index";
import { skipTransparentExprWrappers } from "@babel/helper-skip-transparent-expression-wrappers";

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
 * Takes a class definition and replaces it with an equivalent class declaration
 * which is then assigned to a local variable. This allows us to reassign the
 * local variable with the decorated version of the class. The class definition
 * retains its original name so that `toString` is not affected, other
 * references to the class are renamed instead.
 */
function replaceClassWithVar(
  path: NodePath<t.ClassDeclaration | t.ClassExpression>,
  className: string | t.Identifier | t.StringLiteral | undefined,
): [t.Identifier, NodePath<t.ClassDeclaration | t.ClassExpression>] {
  if (path.type === "ClassDeclaration") {
    const id = path.node.id;
    const className = id.name;
    const varId = path.scope.generateUidIdentifierBasedOnNode(path.node.id);
    const classId = t.identifier(className);

    path.scope.rename(className, varId.name);

    path.insertBefore(
      t.variableDeclaration("let", [t.variableDeclarator(varId)]),
    );
    path.get("id").replaceWith(classId);

    return [t.cloneNode(varId), path];
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

    return [
      t.cloneNode(varId),
      newPath.get("expressions.0") as NodePath<t.ClassExpression>,
    ];
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
  element: NodePath<ClassDecoratableElement>,
  originalKey: t.PrivateName | t.Expression,
  targetKey: t.PrivateName,
  isComputed = false,
): void {
  const { static: isStatic } = element.node;

  const getterBody = t.blockStatement([
    t.returnStatement(
      t.memberExpression(t.thisExpression(), t.cloneNode(targetKey)),
    ),
  ]);

  const setterBody = t.blockStatement([
    t.expressionStatement(
      t.assignmentExpression(
        "=",
        t.memberExpression(t.thisExpression(), t.cloneNode(targetKey)),
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
): t.FunctionExpression[] {
  return [
    t.functionExpression(
      undefined,
      [],
      t.blockStatement([
        t.returnStatement(
          t.memberExpression(t.thisExpression(), t.cloneNode(targetKey)),
        ),
      ]),
    ),
    t.functionExpression(
      undefined,
      [t.identifier("value")],
      t.blockStatement([
        t.expressionStatement(
          t.assignmentExpression(
            "=",
            t.memberExpression(t.thisExpression(), t.cloneNode(targetKey)),
            t.identifier("value"),
          ),
        ),
      ]),
    ),
  ];
}

const FIELD = 0;
const ACCESSOR = 1;
const METHOD = 2;
const GETTER = 3;
const SETTER = 4;

const STATIC = 5;

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
  // The expressions of the decorators themselves
  decorators: t.Expression[];

  // The kind of the decorated value, matches the kind value passed to applyDecs
  kind: number;

  // whether or not the field is static
  isStatic: boolean;

  // The name of the decorator
  name: t.StringLiteral | t.Expression;

  privateMethods: t.FunctionExpression | t.FunctionExpression[] | undefined;

  // The names of local variables that will be used/returned from the decoration
  locals: t.Identifier | t.Identifier[] | undefined;
}

// Information about a computed property key. These must be evaluated
// interspersed with decorator expressions, which is why they get added to the
// array of DecoratorInfos later on.
interface ComputedPropInfo {
  localComputedNameId: t.Identifier;
  keyNode: t.Expression;
}

function isDecoratorInfo(
  info: DecoratorInfo | ComputedPropInfo,
): info is DecoratorInfo {
  return "decorators" in info;
}

function filteredOrderedDecoratorInfo(
  info: (DecoratorInfo | ComputedPropInfo)[],
): DecoratorInfo[] {
  const filtered = info.filter(isDecoratorInfo);

  return [
    ...filtered.filter(
      el => el.isStatic && el.kind >= ACCESSOR && el.kind <= SETTER,
    ),
    ...filtered.filter(
      el => !el.isStatic && el.kind >= ACCESSOR && el.kind <= SETTER,
    ),
    ...filtered.filter(el => el.isStatic && el.kind === FIELD),
    ...filtered.filter(el => !el.isStatic && el.kind === FIELD),
  ];
}

function generateDecorationExprs(
  info: (DecoratorInfo | ComputedPropInfo)[],
): t.ArrayExpression {
  return t.arrayExpression(
    filteredOrderedDecoratorInfo(info).map(el => {
      const decs =
        el.decorators.length > 1
          ? t.arrayExpression(el.decorators)
          : el.decorators[0];

      const kind = el.isStatic ? el.kind + STATIC : el.kind;

      const decInfo = [decs, t.numericLiteral(kind), el.name];

      const { privateMethods } = el;

      if (Array.isArray(privateMethods)) {
        decInfo.push(...privateMethods);
      } else if (privateMethods) {
        decInfo.push(privateMethods);
      }

      return t.arrayExpression(decInfo);
    }),
  );
}

function extractElementLocalAssignments(
  decorationInfo: (DecoratorInfo | ComputedPropInfo)[],
) {
  const localIds: t.Identifier[] = [];

  for (const el of filteredOrderedDecoratorInfo(decorationInfo)) {
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
  element: NodePath,
  key: t.PrivateName,
  getId: t.Identifier,
  setId: t.Identifier,
) {
  element.insertAfter(
    t.classPrivateMethod(
      "get",
      t.cloneNode(key),
      [],
      t.blockStatement([
        t.returnStatement(
          t.callExpression(t.cloneNode(getId), [t.thisExpression()]),
        ),
      ]),
    ),
  );

  element.insertAfter(
    t.classPrivateMethod(
      "set",
      t.cloneNode(key),
      [t.identifier("v")],
      t.blockStatement([
        t.expressionStatement(
          t.callExpression(t.cloneNode(setId), [
            t.thisExpression(),
            t.identifier("v"),
          ]),
        ),
      ]),
    ),
  );
}

function isNotTsParameter(
  node: t.Identifier | t.Pattern | t.RestElement | t.TSParameterProperty,
): node is t.Identifier | t.Pattern | t.RestElement {
  return node.type !== "TSParameterProperty";
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

function injectSetFunctionName(
  state: PluginPass,
  className: t.Identifier | t.StringLiteral,
) {
  return t.expressionStatement(
    t.callExpression(state.addHelper("setFunctionName"), [
      t.thisExpression(),
      className,
    ]),
  );
}

function transformClass(
  path: NodePath<t.ClassExpression | t.ClassDeclaration>,
  state: PluginPass,
  constantSuper: boolean,
  version: "2022-03" | "2021-12",
  className: string | t.Identifier | t.StringLiteral | undefined,
): NodePath {
  const body = path.get("body.body");

  const classDecorators = path.node.decorators;
  let hasElementDecorators = false;

  const generateClassPrivateUid = createLazyPrivateUidGeneratorForClass(path);

  // Iterate over the class to see if we need to decorate it, and also to
  // transform simple auto accessors which are not decorated
  for (const element of body) {
    if (!isClassDecoratableElementPath(element)) {
      continue;
    }

    if (element.node.decorators && element.node.decorators.length > 0) {
      hasElementDecorators = true;
    } else if (element.node.type === "ClassAccessorProperty") {
      const { key, value, static: isStatic, computed } = element.node;

      const newId = generateClassPrivateUid();

      const valueNode = value ? t.cloneNode(value) : undefined;

      const newField = generateClassProperty(newId, valueNode, isStatic);

      const [newPath] = element.replaceWith(newField);
      addProxyAccessorsFor(newPath, key, newId, computed);
    }
  }

  // If nothing is decorated, return
  if (!classDecorators && !hasElementDecorators) return;

  const elementDecoratorInfo: (DecoratorInfo | ComputedPropInfo)[] = [];

  // The initializer of the first non-static field will be injected with the protoInit call
  let firstFieldPath:
    | NodePath<t.ClassProperty | t.ClassPrivateProperty>
    | undefined;
  let constructorPath: NodePath<t.ClassMethod> | undefined;
  let requiresProtoInit = false;
  let requiresStaticInit = false;
  const decoratedPrivateMethods = new Set<string>();

  let protoInitLocal: t.Identifier,
    staticInitLocal: t.Identifier,
    classInitLocal: t.Identifier,
    classLocal: t.Identifier;
  const assignments: t.AssignmentExpression[] = [];
  const scopeParent: Scope = path.scope.parent;

  const memoiseExpression = (expression: t.Expression, hint: string) => {
    const localEvaluatedId = scopeParent.generateDeclaredUidIdentifier(hint);
    assignments.push(t.assignmentExpression("=", localEvaluatedId, expression));
    return t.cloneNode(localEvaluatedId);
  };

  if (classDecorators) {
    classInitLocal = scopeParent.generateDeclaredUidIdentifier("initClass");

    const [localId, classPath] = replaceClassWithVar(path, className);
    path = classPath;
    classLocal = localId;

    path.node.decorators = null;

    for (const classDecorator of classDecorators) {
      if (!scopeParent.isStatic(classDecorator.expression)) {
        classDecorator.expression = memoiseExpression(
          classDecorator.expression,
          "dec",
        );
      }
    }
  } else {
    if (!path.node.id) {
      path.node.id = path.scope.generateUidIdentifier("Class");
    }
    classLocal = t.cloneNode(path.node.id);
  }

  if (hasElementDecorators) {
    for (const element of body) {
      if (!isClassDecoratableElementPath(element)) {
        continue;
      }

      const { node } = element;
      const decorators = element.get("decorators");

      const hasDecorators = Array.isArray(decorators) && decorators.length > 0;

      if (hasDecorators) {
        for (const decoratorPath of decorators) {
          if (!scopeParent.isStatic(decoratorPath.node.expression)) {
            decoratorPath.node.expression = memoiseExpression(
              decoratorPath.node.expression,
              "dec",
            );
          }
        }
      }

      const isComputed =
        "computed" in element.node && element.node.computed === true;
      if (isComputed) {
        if (!scopeParent.isStatic(node.key)) {
          node.key = memoiseExpression(node.key as t.Expression, "computedKey");
        }
      }

      const kind = getElementKind(element);
      const { key } = node;

      const isPrivate = key.type === "PrivateName";

      const isStatic = !!element.node.static;

      let name = "computedKey";

      if (isPrivate) {
        name = (key as t.PrivateName).id.name;
      } else if (!isComputed && key.type === "Identifier") {
        name = key.name;
      }

      if (element.isClassMethod({ kind: "constructor" })) {
        constructorPath = element;
      }

      if (hasDecorators) {
        let locals: t.Identifier | t.Identifier[];
        let privateMethods: t.FunctionExpression | t.FunctionExpression[];

        if (kind === ACCESSOR) {
          const { value } = element.node as t.ClassAccessorProperty;

          const params: t.Expression[] = [t.thisExpression()];

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
            privateMethods = extractProxyAccessorsFor(newId);

            const getId = newPath.scope.parent.generateDeclaredUidIdentifier(
              `get_${name}`,
            );
            const setId = newPath.scope.parent.generateDeclaredUidIdentifier(
              `set_${name}`,
            );

            addCallAccessorsFor(newPath, key as t.PrivateName, getId, setId);

            locals = [newFieldInitId, getId, setId];
          } else {
            addProxyAccessorsFor(newPath, key, newId, isComputed);
            locals = newFieldInitId;
          }
        } else if (kind === FIELD) {
          const initId = element.scope.parent.generateDeclaredUidIdentifier(
            `init_${name}`,
          );
          const valuePath = (
            element as NodePath<t.ClassProperty | t.ClassPrivateProperty>
          ).get("value");

          valuePath.replaceWith(
            t.callExpression(
              t.cloneNode(initId),
              [t.thisExpression(), valuePath.node].filter(v => v),
            ),
          );

          locals = initId;

          if (isPrivate) {
            privateMethods = extractProxyAccessorsFor(key as t.PrivateName);
          }
        } else if (isPrivate) {
          locals = element.scope.parent.generateDeclaredUidIdentifier(
            `call_${name}`,
          ) as t.Identifier;

          const replaceSupers = new ReplaceSupers({
            constantSuper,
            methodPath: element as NodePath<t.ClassPrivateMethod>,
            objectRef: classLocal,
            superRef: path.node.superClass,
            file: state.file,
            refToPreserve: classLocal,
          });

          replaceSupers.replace();

          const {
            params,
            body,
            async: isAsync,
          } = element.node as t.ClassPrivateMethod;

          privateMethods = t.functionExpression(
            undefined,
            params.filter(isNotTsParameter),
            body,
            isAsync,
          );

          if (kind === GETTER || kind === SETTER) {
            movePrivateAccessor(
              element as NodePath<t.ClassPrivateMethod>,
              t.cloneNode(key as t.PrivateName),
              t.cloneNode(locals),
              isStatic,
            );
          } else {
            const node = element.node as t.ClassPrivateMethod;

            // Unshift
            path.node.body.body.unshift(
              t.classPrivateProperty(
                key as t.PrivateName,
                t.cloneNode(locals),
                [],
                node.static,
              ),
            );

            decoratedPrivateMethods.add((key as t.PrivateName).id.name);

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
          nameExpr = t.stringLiteral(
            (key as t.StringLiteral | t.NumericLiteral | t.BigIntLiteral)
              .value + "",
          );
        }

        elementDecoratorInfo.push({
          kind,
          decorators: decorators.map(d => d.node.expression),
          name: nameExpr,
          isStatic,
          privateMethods,
          locals,
        });

        if (kind !== FIELD) {
          if (isStatic) {
            requiresStaticInit = true;
          } else {
            requiresProtoInit = true;
          }
        }

        if (element.node) {
          element.node.decorators = null;
        }

        if (
          !firstFieldPath &&
          !isStatic &&
          (kind === FIELD || kind === ACCESSOR)
        ) {
          firstFieldPath = element as NodePath<
            t.ClassProperty | t.ClassPrivateProperty
          >;
        }
      }
    }
  }

  const elementDecorations = generateDecorationExprs(elementDecoratorInfo);
  const classDecorations = t.arrayExpression(
    (classDecorators || []).map(d => d.expression),
  );

  const locals: t.Identifier[] =
    extractElementLocalAssignments(elementDecoratorInfo);

  if (requiresProtoInit) {
    protoInitLocal = scopeParent.generateDeclaredUidIdentifier("initProto");
    locals.push(protoInitLocal);

    const protoInitCall = t.callExpression(t.cloneNode(protoInitLocal), [
      t.thisExpression(),
    ]);

    if (firstFieldPath) {
      const value = firstFieldPath.get("value");
      const body: t.Expression[] = [protoInitCall];

      if (value.node) {
        body.push(value.node);
      }

      value.replaceWith(t.sequenceExpression(body));
    } else if (constructorPath) {
      if (path.node.superClass) {
        path.traverse({
          CallExpression: {
            exit(path) {
              if (!path.get("callee").isSuper()) return;

              path.replaceWith(
                t.callExpression(t.cloneNode(protoInitLocal), [path.node]),
              );

              path.skip();
            },
          },
        });
      } else {
        constructorPath.node.body.body.unshift(
          t.expressionStatement(protoInitCall),
        );
      }
    } else {
      const body: t.Statement[] = [t.expressionStatement(protoInitCall)];

      if (path.node.superClass) {
        body.unshift(
          t.expressionStatement(
            t.callExpression(t.super(), [
              t.spreadElement(t.identifier("args")),
            ]),
          ),
        );
      }

      path.node.body.body.unshift(
        t.classMethod(
          "constructor",
          t.identifier("constructor"),
          [t.restElement(t.identifier("args"))],
          t.blockStatement(body),
        ),
      );
    }
  }

  if (requiresStaticInit) {
    staticInitLocal = scopeParent.generateDeclaredUidIdentifier("initStatic");
    locals.push(staticInitLocal);
  }

  if (decoratedPrivateMethods.size > 0) {
    path.traverse({
      PrivateName(path) {
        if (!decoratedPrivateMethods.has(path.node.id.name)) return;

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
            `Decorated private methods are not updatable, but "#${path.node.id.name}" is updated via this expression.`,
          );
        }
      },
    });
  }

  let classInitInjected = false;
  const classInitCall =
    classInitLocal && t.callExpression(t.cloneNode(classInitLocal), []);

  const originalClass = path.node;

  if (classDecorators) {
    locals.push(classLocal, classInitLocal);
    const statics: (
      | t.ClassProperty
      | t.ClassPrivateProperty
      | t.ClassPrivateMethod
    )[] = [];
    let staticBlocks: t.StaticBlock[] = [];
    path.get("body.body").forEach(element => {
      // Static blocks cannot be compiled to "instance blocks", but we can inline
      // them as IIFEs in the next property.
      if (element.isStaticBlock()) {
        staticBlocks.push(element.node);
        element.remove();
        return;
      }

      const isProperty =
        element.isClassProperty() || element.isClassPrivateProperty();

      if (
        (isProperty || element.isClassPrivateMethod()) &&
        element.node.static
      ) {
        if (isProperty && staticBlocks.length > 0) {
          const allValues: t.Expression[] = staticBlocks.map(staticBlockToIIFE);
          if (element.node.value) allValues.push(element.node.value);
          element.node.value = maybeSequenceExpression(allValues);
          staticBlocks = [];
        }

        element.node.static = false;
        statics.push(element.node);
        element.remove();
      }
    });

    if (statics.length > 0 || staticBlocks.length > 0) {
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

      if (staticBlocks.length > 0) {
        constructorBody.push(...staticBlocks.map(staticBlockToIIFE));
      }
      if (classInitCall) {
        classInitInjected = true;
        constructorBody.push(classInitCall);
      }
      if (constructorBody.length > 0) {
        constructorBody.unshift(
          t.callExpression(t.super(), [t.cloneNode(classLocal)]),
        );

        staticsClass.body.body.push(
          t.classMethod(
            "constructor",
            t.identifier("constructor"),
            [],
            t.blockStatement([
              t.expressionStatement(t.sequenceExpression(constructorBody)),
            ]),
          ),
        );
      } else {
        newExpr.arguments.push(t.cloneNode(classLocal));
      }

      path.replaceWith(newExpr);
    }
  }
  if (!classInitInjected && classInitCall) {
    path.node.body.body.push(
      t.staticBlock([t.expressionStatement(classInitCall)]),
    );
  }

  const requiresSetFunctionName = typeof className === "object";

  originalClass.body.body.unshift(
    t.staticBlock(
      [
        requiresSetFunctionName && injectSetFunctionName(state, className),
        t.expressionStatement(
          t.assignmentExpression(
            "=",
            t.arrayPattern(locals),
            t.callExpression(
              state.addHelper(
                version === "2021-12" ? "applyDecs" : "applyDecs2203",
              ),
              [t.thisExpression(), elementDecorations, classDecorations],
            ),
          ),
        ),
        requiresStaticInit &&
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

  // Recrawl the scope to make sure new identifiers are properly synced
  path.scope.crawl();

  return path;
}

function isProtoSetter(
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
  return (
    isDecorated(node) ||
    node.body.body.some(node => shouldTransformElement(node))
  );
}

// Todo: unify name references logic with helper-function-name
function NamedEvaluationVisitoryFactory(
  isAnonymous: (path: NodePath) => boolean,
  visitor: (
    path: NodePath,
    state: PluginPass,
    name: string | t.Identifier | t.StringLiteral,
  ) => void,
) {
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
            if (!isProtoSetter(id as t.StringLiteral | t.Identifier)) {
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
            const ref = propertyPath.scope.maybeGenerateMemoised(id);
            (propertyPath as NodePath<t.ObjectProperty>).get("key").replaceWith(
              // ObjectProperty under ObjectExpression must not be a private name
              t.assignmentExpression("=", ref, id as t.Expression),
            );
            visitor(initializer, state, t.cloneNode(ref));
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
    // Fixme: This visitor is not active because we transpiled accessor property before the visitor is executed
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
          const ref = path.scope.maybeGenerateMemoised(id);
          path
            .get("key")
            .replaceWith(t.assignmentExpression("=", ref, id as t.Expression));
          visitor(initializer, state, t.cloneNode(ref));
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
          const ref = path.scope.maybeGenerateMemoised(id);
          path.get("key").replaceWith(t.assignmentExpression("=", ref, id));
          visitor(initializer, state, t.cloneNode(ref));
        }
      }
    },
  } as Visitor<PluginPass>;
}

function isDecoratedAnonymousClassExpression(path: NodePath) {
  return (
    path.isClassExpression({ id: null }) && shouldTransformClass(path.node)
  );
}

export default function (
  { assertVersion, assumption }: PluginAPI,
  { loose }: Options,
  version: "2022-03" | "2021-12",
): PluginObject {
  assertVersion(version === "2021-12" ? "^7.16.0" : "^7.19.0");

  const VISITED = new WeakSet<NodePath>();
  const constantSuper = assumption("constantSuper") ?? loose;

  const namedEvaluationVisitor = NamedEvaluationVisitoryFactory(
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
    );
    if (newPath) {
      VISITED.add(newPath);
      return;
    }
    VISITED.add(path);
  }

  return {
    name: "proposal-decorators",
    inherits: syntaxDecorators,

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
