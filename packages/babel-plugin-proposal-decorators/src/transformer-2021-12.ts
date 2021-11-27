import type { NodePath } from "@babel/traverse";
import { types as t } from "@babel/core";
import syntaxDecorators from "@babel/plugin-syntax-decorators";
import ReplaceSupers from "@babel/helper-replace-supers";
import * as charCodes from "charcodes";

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

type classUidGenerator = <B extends boolean>(
  isPrivate: B,
) => B extends true ? t.PrivateName : t.Identifier;

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
 * Generates a new element name that is unique to the given class. This can be
 * used to create extra class fields and methods for the implementation, while
 * keeping the length of those names as small as possible. This is important for
 * minification purposes, since public names cannot be safely renamed/minified.
 *
 * Names are split into two namespaces, public and private. Static and non-static
 * names are shared in the same namespace, because this is true for private names
 * (you cannot have #x and static #x in the same class) and it's not worth the
 * extra complexity for public names.
 */
function createUidGeneratorForClass(
  body: NodePath<ClassElement>[],
): (isPrivate: boolean) => t.Identifier | t.PrivateName {
  let currentPublicId: number[], currentPrivateId: number[];

  const publicNames = new Set<string>();
  const privateNames = new Set<string>();

  for (const element of body) {
    if (
      element.node.type === "TSIndexSignature" ||
      element.node.type === "StaticBlock"
    ) {
      continue;
    }

    const { key } = element.node;

    if (key.type === "PrivateName") {
      privateNames.add(key.id.name);
    } else if (key.type === "Identifier") {
      publicNames.add(key.name);
    }
  }

  return (isPrivate: boolean): t.Identifier | t.PrivateName => {
    let currentId: number[], names: Set<String>;

    if (isPrivate) {
      if (!currentPrivateId) {
        currentPrivateId = [charCodes.uppercaseA];
      }

      currentId = currentPrivateId;
      names = privateNames;
    } else {
      if (!currentPublicId) {
        currentPublicId = [charCodes.uppercaseA];
      }

      currentId = currentPublicId;
      names = publicNames;
    }

    let reifiedId = String.fromCharCode(...currentId);

    while (names.has(reifiedId)) {
      incrementId(currentId);
      reifiedId = String.fromCharCode(...currentId);
    }

    incrementId(currentId);

    if (isPrivate) {
      return t.privateName(t.identifier(reifiedId));
    } else {
      return t.identifier(reifiedId);
    }
  };
}

/**
 * Wraps the above generator function so that it's run lazily the first time
 * it's actually required. Several types of decoration do not require this, so it
 * saves iterating the class elements an additional time and allocating the space
 * for the Sets of element names.
 */
function createLazyUidGeneratorForClass(
  body: NodePath<ClassElement>[],
): classUidGenerator {
  let generator: (isPrivate: boolean) => t.Identifier | t.PrivateName;

  const lazyGenerator = (isPrivate: boolean): t.Identifier | t.PrivateName => {
    if (!generator) {
      generator = createUidGeneratorForClass(body);
    }

    return generator(isPrivate);
  };

  return lazyGenerator as unknown as classUidGenerator;
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
): [t.Identifier, NodePath<t.ClassDeclaration | t.ClassExpression>] {
  if (path.type === "ClassDeclaration") {
    const varId = path.scope.generateUidIdentifierBasedOnNode(path.node.id);
    const classId = t.identifier(path.node.id.name);

    path.scope.rename(classId.name, varId.name);

    path.insertBefore(
      t.variableDeclaration("let", [t.variableDeclarator(varId)]),
    );
    path.get("id").replaceWith(classId);

    return [t.cloneNode(varId), path];
  } else {
    let className: string;
    let varId: t.Identifier;

    if (path.node.id) {
      className = path.node.id.name;
      varId = generateLocalVarId(path, className);
      path.scope.rename(className, varId.name);
    } else if (
      path.parentPath.node.type === "VariableDeclarator" &&
      path.parentPath.node.id.type === "Identifier"
    ) {
      className = path.parentPath.node.id.name;
      varId = generateLocalVarId(path, className);
    } else {
      varId = generateLocalVarId(path, "decorated_class");
    }

    const newClassExpr = t.classExpression(
      className && t.identifier(className),
      path.node.superClass,
      path.node.body,
    );

    const [newPath] = path.replaceWith(
      t.sequenceExpression([newClassExpr, varId]),
    );

    return [t.cloneNode(varId), newPath.get("expressions.0")];
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

function generateLocalVarId(path: NodePath, name: string): t.Identifier {
  const varId = path.scope.generateUidIdentifier(name);
  path.scope.parent.push({ id: varId });
  return t.cloneNode(varId);
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

function generateDecorationExprs(
  info: (DecoratorInfo | ComputedPropInfo)[],
): t.ArrayExpression {
  return t.arrayExpression(
    info.filter(isDecoratorInfo).map(el => {
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
  const locals: t.Identifier[] = [];

  for (const el of decorationInfo) {
    if ("locals" in el && el.locals) {
      if (Array.isArray(el.locals)) {
        locals.push(...el.locals);
      } else {
        locals.push(el.locals);
      }
    }
  }

  return locals;
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
        t.expressionStatement(
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

function transformClass(
  path: NodePath<t.ClassExpression | t.ClassDeclaration>,
  state: any,
  constantSuper: boolean,
): NodePath {
  const body = path.get("body.body");

  const classDecorators = path.node.decorators;
  let hasElementDecorators = false;

  const generateClassUid = createLazyUidGeneratorForClass(body);

  // Iterate over the class to see if we need to decorate it, and also to
  // transform simple auto accessors which are not decorated
  for (const element of body) {
    if (!isClassDecoratableElementPath(element)) {
      continue;
    }

    if (element.node.decorators) {
      hasElementDecorators = true;
    } else if (element.node.type === "ClassAccessorProperty") {
      const { key, value, static: isStatic } = element.node;

      const newId = generateClassUid(true);

      const valueNode = value ? t.cloneNode(value) : undefined;

      const newField = generateClassProperty(newId, valueNode, isStatic);

      const [newPath] = element.replaceWith(newField);
      addProxyAccessorsFor(newPath, key, newId, element.node.computed);
    }
  }

  // If nothing is decorated, return
  if (!classDecorators && !hasElementDecorators) return;

  const elementDecoratorInfo: (DecoratorInfo | ComputedPropInfo)[] = [];

  let firstFieldPath:
    | NodePath<t.ClassProperty | t.ClassPrivateProperty>
    | undefined;
  let constructorPath: NodePath<t.ClassMethod> | undefined;
  let requiresProtoInit = false;
  let requiresStaticInit = false;
  let hasComputedProps = false;
  const decoratedPrivateMethods = new Set<string>();

  let protoInitLocal: t.Identifier,
    staticInitLocal: t.Identifier,
    classInitLocal: t.Identifier,
    classLocal: t.Identifier;

  if (classDecorators) {
    classInitLocal = generateLocalVarId(path, "initClass");

    const [localId, classPath] = replaceClassWithVar(path);
    path = classPath;
    classLocal = localId;

    path.node.decorators = null;
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

      let { key } = element.node;
      const kind = getElementKind(element);
      const decorators = element.get("decorators");

      const isPrivate = key.type === "PrivateName";
      const isComputed =
        "computed" in element.node && element.node.computed === true;
      const isStatic = !!element.node.static;

      let name = "computedKey";

      if (isPrivate) {
        name = (key as t.PrivateName).id.name;
      } else if (key.type === "Identifier") {
        name = key.name;
      }

      if (
        element.node.type === "ClassMethod" &&
        element.node.kind === "constructor"
      ) {
        constructorPath = element as NodePath<t.ClassMethod>;
      }

      if (isComputed) {
        const keyPath = element.get("key");
        const localComputedNameId = generateLocalVarId(keyPath, name);
        keyPath.replaceWith(localComputedNameId);

        elementDecoratorInfo.push({
          localComputedNameId: t.cloneNode(localComputedNameId),
          keyNode: t.cloneNode(key as t.Expression),
        });

        key = localComputedNameId;
        hasComputedProps = true;
      }

      if (Array.isArray(decorators)) {
        let locals: t.Identifier | t.Identifier[];
        let privateMethods: t.FunctionExpression | t.FunctionExpression[];

        if (kind === ACCESSOR) {
          const { value } = element.node as t.ClassAccessorProperty;

          const params: t.Expression[] = [t.thisExpression()];

          if (value) {
            params.push(t.cloneNode(value));
          }

          const newId = generateClassUid(true);
          const newFieldInitId = generateLocalVarId(element, `init_${name}`);
          const newValue = t.callExpression(
            t.cloneNode(newFieldInitId),
            params,
          );

          const newField = generateClassProperty(newId, newValue, isStatic);
          const [newPath] = element.replaceWith(newField);

          if (isPrivate) {
            privateMethods = extractProxyAccessorsFor(newId);

            const getId = generateLocalVarId(newPath, `get_${name}`);
            const setId = generateLocalVarId(newPath, `set_${name}`);

            addCallAccessorsFor(newPath, key as t.PrivateName, getId, setId);

            locals = [newFieldInitId, getId, setId];
          } else {
            addProxyAccessorsFor(newPath, key, newId, isComputed);
            locals = newFieldInitId;
          }
        } else if (kind === FIELD) {
          const initId = generateLocalVarId(element, `init_${name}`);
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
          locals = generateLocalVarId(element, `call_${name}`);

          const replaceSupers = new ReplaceSupers({
            constantSuper,
            methodPath: element,
            objectRef: classLocal,
            superRef: path.node.superClass,
            file: state,
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
          nameExpr = t.cloneNode(key as t.Expression);
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

        if (!firstFieldPath && (kind === FIELD || kind === ACCESSOR)) {
          firstFieldPath = element as NodePath<
            t.ClassProperty | t.ClassPrivateProperty
          >;
        }
      }
    }
  }

  if (hasComputedProps) {
    const assignments: t.AssignmentExpression[] = [];

    for (const info of elementDecoratorInfo) {
      if (isDecoratorInfo(info)) {
        const { decorators } = info;
        const newDecorators: t.Identifier[] = [];

        for (const decorator of decorators) {
          const localComputedNameId = generateLocalVarId(path, "dec");
          assignments.push(
            t.assignmentExpression("=", localComputedNameId, decorator),
          );
          newDecorators.push(t.cloneNode(localComputedNameId));
        }

        info.decorators = newDecorators;
      } else {
        assignments.push(
          t.assignmentExpression("=", info.localComputedNameId, info.keyNode),
        );
      }
    }

    path.insertBefore(assignments);
  }

  const elementDecorations = generateDecorationExprs(elementDecoratorInfo);
  const classDecorations = t.arrayExpression(
    (classDecorators || []).map(d => d.expression),
  );

  const locals: t.Identifier[] =
    extractElementLocalAssignments(elementDecoratorInfo);

  if (classDecorators) {
    locals.push(classLocal, classInitLocal);
  }

  if (requiresProtoInit) {
    protoInitLocal = generateLocalVarId(path, "initProto");
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
        let found = false;

        path.traverse({
          Super(path) {
            const { parentPath } = path;

            if (found || parentPath.node.type !== "CallExpression") return;

            found = true;

            const prop = generateLocalVarId(path, "super");
            parentPath.replaceWith(
              t.sequenceExpression([
                t.assignmentExpression("=", t.cloneNode(prop), parentPath.node),
                protoInitCall,
                t.cloneNode(prop),
              ]),
            );
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
    staticInitLocal = generateLocalVarId(path, "initStatic");
    locals.push(staticInitLocal);
  }

  const staticBlock = t.staticBlock(
    [
      t.expressionStatement(
        t.assignmentExpression(
          "=",
          t.arrayPattern(locals),
          t.callExpression(state.addHelper("applyDecs"), [
            t.thisExpression(),
            elementDecorations,
            classDecorations,
          ]),
        ),
      ),
      requiresStaticInit &&
        t.expressionStatement(
          t.callExpression(t.cloneNode(staticInitLocal), [t.thisExpression()]),
        ),
    ].filter(v => v),
  );

  path.node.body.body.unshift(staticBlock as unknown as ClassElement);

  if (classInitLocal) {
    path.node.body.body.push(
      t.staticBlock([
        t.expressionStatement(
          t.callExpression(t.cloneNode(classInitLocal), []),
        ),
      ]),
    );
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

  // Recrawl the scope to make sure new identifiers are properly synced
  path.scope.crawl();

  return path;
}

export default function (
  { assertVersion, assumption },
  { decoratorsBeforeExport, loose },
) {
  assertVersion("^7.16.0");

  const VISITED = new WeakSet<NodePath>();
  const constantSuper = assumption("constantSuper") ?? loose;

  return {
    name: "proposal-decorators",
    inherits: syntaxDecorators,
    manipulateOptions({ generatorOpts }) {
      generatorOpts.decoratorsBeforeExport = decoratorsBeforeExport;
    },

    visitor: {
      ClassDeclaration(path: NodePath<t.ClassDeclaration>, state: any) {
        if (VISITED.has(path)) return;

        const newPath = transformClass(path, state, constantSuper);

        if (newPath) {
          VISITED.add(newPath);
        }
      },

      ClassExpression(path: NodePath<t.ClassExpression>, state: any) {
        if (VISITED.has(path)) return;

        const newPath = transformClass(path, state, constantSuper);

        if (newPath) {
          VISITED.add(newPath);
        }
      },
    },
  };
}
