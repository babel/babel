import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";
import type { NodePath, PluginPass } from "@babel/core";
import { visitors } from "@babel/traverse";
import { skipTransparentExprWrapperNodes } from "@babel/helper-skip-transparent-expression-wrappers";

// https://tc39.es/ecma262/#sec-isanonymousfunctiondefinition
function isAnonymousFunctionDefinition(
  node: t.Node,
): node is
  t.ClassExpression | t.ArrowFunctionExpression | t.FunctionExpression {
  return (
    t.isArrowFunctionExpression(node) ||
    ((t.isFunctionExpression(node) || t.isClassExpression(node)) && !node.id)
  );
}

// Literal keys that do not need to be memoized, and their property key
function getLiteralKey(node: t.Node): string | undefined {
  switch (node.type) {
    case "StringLiteral":
      return node.value;
    case "NumericLiteral":
      return String(node.value);
    case "BigIntLiteral":
      return String(BigInt(node.value));
  }
}

function getStaticKey(member: {
  computed?: boolean;
  key: t.Expression | t.PrivateName;
}) {
  if (!member.computed && member.key.type === "Identifier") {
    return member.key.name;
  }
  return getLiteralKey(member.key);
}

const findBareSupers = visitors.environmentVisitor<
  NodePath<t.CallExpression>[]
>({
  Super(path) {
    const { node, parentPath } = path;
    if (parentPath.isCallExpression({ callee: node })) {
      this.push(parentPath);
    }
  },
});

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION("^8.1.0"));

  return {
    name: "proposal-structs",
    manipulateOptions: (_, parser) => parser.plugins.push("structs"),

    visitor: {
      Program(path, state) {
        // Transform structs before other plugins visit the program, so that
        // they only see classes (e.g. block-scoping must know that the
        // struct body captures loop bindings).
        // Struct declarations cannot contain escapes, so the source contains
        // "struct". When it does not (e.g. the AST was built by a tool),
        // look for structs with a cheaper traversal.
        const { code } = state.file;
        if (
          (!code || !/\bstruct\b/.test(code)) &&
          !t.traverseFast(path.node, node =>
            node.type === "StructDeclaration" ? t.traverseFast.stop : undefined,
          )
        ) {
          return;
        }

        let transformed = false;
        path.traverse({
          StructDeclaration: {
            exit(path) {
              if (transformStruct(path, state)) transformed = true;
            },
          },
        });
        // The struct body has been moved into new nodes: rebuild the bindings
        // so that their references point to the new paths.
        if (transformed) path.scope.crawl();
      },
    },
  };
});

function isComputedNonLiteral(member: { computed?: boolean; key: t.Node }) {
  return !!member.computed && getLiteralKey(member.key) === undefined;
}

// Methods defined via DefineMethod, which are wrapped by struct method exotic
// objects
function isPlainMethod(
  member: t.ClassBody["body"][number],
): member is t.ClassMethod | t.ClassPrivateMethod {
  return (
    (member.type === "ClassMethod" || member.type === "ClassPrivateMethod") &&
    !member.static &&
    member.kind === "method" &&
    !member.generator &&
    !member.async
  );
}

// When a computed key can match another key, defineStruct needs the keys of
// all the instance methods in definition order, to know which definition of
// each key is the last one.
function hasOrderedMethodKeys(node: t.StructDeclaration) {
  let hasPlainMethod = false;
  let hasComputedMethod = false;
  for (const member of node.body.body) {
    if (
      (member.type === "ClassMethod" && member.kind !== "constructor") ||
      member.type === "ClassAccessorProperty"
    ) {
      if (isPlainMethod(member)) hasPlainMethod = true;
      if (!member.static && isComputedNonLiteral(member)) {
        hasComputedMethod = true;
      }
    }
  }
  return hasPlainMethod && hasComputedMethod;
}

function getUsedHelpers(node: t.StructDeclaration, hasSuperCalls: boolean) {
  const helpers = new Set([
    "structHeritage",
    "constructStruct",
    "defineStruct",
  ]);
  if (hasSuperCalls) helpers.add("structSuper");
  const orderedMethodKeys = hasOrderedMethodKeys(node);
  for (const member of node.body.body) {
    if (member.type === "StaticBlock" || member.type === "TSIndexSignature") {
      if (member.type === "StaticBlock") helpers.add("sealStruct");
      continue;
    }
    if (
      member.static &&
      member.type !== "ClassMethod" &&
      member.type !== "ClassPrivateMethod" &&
      member.type !== "TSDeclareMethod"
    ) {
      helpers.add("sealStruct");
    }
    switch (member.type) {
      case "ClassMethod":
        if (
          !member.static &&
          member.kind !== "constructor" &&
          getStaticKey(member) === undefined &&
          (orderedMethodKeys || isPlainMethod(member))
        ) {
          helpers.add("toPropertyKey");
        }
        break;
      case "ClassPrivateMethod":
        if (isPlainMethod(member)) helpers.add("structPrivateMethod");
        break;
      case "ClassProperty":
      case "ClassPrivateProperty":
      case "ClassAccessorProperty": {
        // Static accessors are not modified
        if (member.static && member.type === "ClassAccessorProperty") break;
        const fn =
          member.value && skipTransparentExprWrapperNodes(member.value);
        const isAnonymousFunction = !!fn && isAnonymousFunctionDefinition(fn);
        if (
          isComputedNonLiteral(member) &&
          (member.static
            ? isAnonymousFunction
            : member.type === "ClassAccessorProperty" || !!member.value)
        ) {
          helpers.add("toPropertyKey");
        }
        if (isAnonymousFunction && fn.type !== "ClassExpression") {
          helpers.add("setFunctionName");
        }
        break;
      }
    }
  }
  return helpers;
}

// Returns whether the struct has been transformed
function transformStruct(
  path: NodePath<t.StructDeclaration>,
  state: PluginPass,
): boolean {
  const { node } = path;
  const outerScope = path.scope.parent!;

  // TypeScript's `declare struct`, or a struct in an ambient context such as
  // `declare namespace`, `declare module "m"` or `declare global`: they are
  // type-only, and removed by the TypeScript plugin.
  if (
    node.declare ||
    path.findParent(p => p.isTSModuleDeclaration() && !!p.node.declare)
  ) {
    return false;
  }

  // `export default struct {}` is transformed to an anonymous class, so that
  // its name is "default", and the class is stored in a variable when it is
  // defined.
  const anonymous = !node.id;
  // Not named `_default`, which module transforms use for default exports
  const id = node.id ?? outerScope.generateUidIdentifier("struct");
  if (anonymous) outerScope.push({ id: t.cloneNode(id), kind: "let" });
  const structRef = () => t.cloneNode(id);

  // Collect the private names used in the struct body (including the ones
  // declared by enclosing classes), to generate unique ones
  const privateNames = new Set<string>();
  t.traverseFast(node.body, node => {
    if (node.type === "PrivateName") privateNames.add(node.id.name);
  });
  const generatePrivateName = (name: string) => {
    let uid = name;
    for (let i = 2; privateNames.has(uid); i++) uid = name + i;
    privateNames.add(uid);
    return t.privateName(t.identifier(uid));
  };

  // Computed keys are memoized in variables when the struct is defined. The
  // ones used by the field initializers are then captured by defineStruct and
  // passed to #fields as parameters with the same name, since the variables
  // could be overwritten before an instance is created (e.g. when the struct
  // is in a loop).
  const fieldKeyVars: t.Identifier[] = [];
  const memoizeKey = (key: t.Expression) => {
    if (getLiteralKey(key) !== undefined) {
      const ref = () => t.cloneNode(key);
      return { key, ref, fieldRef: ref };
    }
    const memo = outerScope.generateUidIdentifierBasedOnNode(key);
    outerScope.push({ id: t.cloneNode(memo) });
    return {
      key: t.assignmentExpression(
        "=",
        t.cloneNode(memo),
        t.callExpression(state.addHelper("toPropertyKey"), [key]),
      ),
      ref: () => t.cloneNode(memo),
      fieldRef: () => {
        if (!fieldKeyVars.includes(memo)) fieldKeyVars.push(memo);
        return t.cloneNode(memo);
      },
    };
  };

  // The target of the field assignment
  const getFieldTarget = (
    key: t.Expression | t.PrivateName,
    computedRef: (() => t.Expression) | null,
  ): t.MemberExpression => {
    if (computedRef) {
      return t.memberExpression(t.thisExpression(), computedRef(), true);
    }
    return t.memberExpression(
      t.thisExpression(),
      t.cloneNode(key),
      key.type !== "Identifier" && key.type !== "PrivateName",
    );
  };

  // The name used for SetFunctionName
  const getFieldName = (
    key: t.Expression | t.PrivateName,
    computedRef: (() => t.Expression) | null,
  ): t.Expression => {
    const literalKey = getLiteralKey(key);
    if (literalKey !== undefined) return t.stringLiteral(literalKey);
    if (computedRef) return computedRef();
    if (key.type === "PrivateName") return t.stringLiteral("#" + key.id.name);
    if (key.type === "Identifier") return t.stringLiteral(key.name);
    throw new Error(`Unexpected key type: ${key.type}`);
  };

  // NamedEvaluation of field initializers, which are moved out of the field
  // or are not preserved when lowering static blocks
  const nameAnonymousFunction = (
    value: t.Expression,
    getName: () => t.Expression,
  ): t.Expression => {
    const fn = skipTransparentExprWrapperNodes(value);
    if (fn.type === "ClassExpression" && !fn.id) {
      const name = getName();
      // The name must be set before the static elements are evaluated, as
      // they could define a "name" property: use the NamedEvaluation of
      // object literal properties, i.e. `({ [name]: class {} })[name]`.
      const identifierKey =
        t.isStringLiteral(name) &&
        name.value !== "__proto__" &&
        t.isValidIdentifier(name.value, false)
          ? name.value
          : null;
      const isIdentifierKey = identifierKey !== null;
      const propertyKey = () =>
        isIdentifierKey ? t.identifier(identifierKey) : t.cloneNode(name);
      value = t.memberExpression(
        t.objectExpression([
          t.objectProperty(propertyKey(), value, !isIdentifierKey),
        ]),
        propertyKey(),
        !isIdentifierKey,
      );
    } else if (isAnonymousFunctionDefinition(fn)) {
      value = t.callExpression(state.addHelper("setFunctionName"), [
        value,
        getName(),
      ]);
    }
    return value;
  };

  const fieldInitializers: t.Statement[] = [];
  const addFieldInitializer = (
    key: t.Expression | t.PrivateName,
    computedRef: (() => t.Expression) | null,
    value: t.Expression,
    // For auto-accessors, the field is the private storage
    storage?: t.PrivateName,
  ) => {
    fieldInitializers.push(
      t.expressionStatement(
        t.assignmentExpression(
          "=",
          storage
            ? t.memberExpression(t.thisExpression(), t.cloneNode(storage))
            : getFieldTarget(key, computedRef),
          nameAnonymousFunction(value, () => getFieldName(key, computedRef)),
        ),
      ),
    );
  };

  // Keys of the methods to wrap with a brand check: only methods defined via
  // DefineMethod, i.e. not getters, setters, generators and async methods.
  // Only the last definition of a key matters: when computed keys could
  // match other keys, the keys of the other methods are listed too, wrapped
  // in an array.
  const orderedMethodKeys = hasOrderedMethodKeys(node);
  const methodKeys: t.Expression[] = [];
  const staticKeyIsPlainMethod = new Map<string, boolean>();

  let initializer: t.ClassPrivateMethod | undefined;
  let initializerName: t.PrivateName | undefined;
  let superName: t.PrivateName | undefined;
  const members: t.ClassBody["body"] = [];
  const bodyPaths = path.get("body.body");

  // super(...args) calls the parent struct's initializer
  const supers: NodePath<t.CallExpression>[] = [];
  bodyPaths
    .find(p => p.isClassMethod({ kind: "constructor" }))
    ?.traverse(findBareSupers, supers);

  const hasStaticElements = node.body.body.some(
    member =>
      member.type === "StaticBlock" ||
      (member.static &&
        member.type !== "ClassMethod" &&
        member.type !== "ClassPrivateMethod" &&
        member.type !== "TSDeclareMethod" &&
        member.type !== "TSIndexSignature"),
  );

  // Inlined helpers can rename the bindings conflicting with their globals,
  // which only works for the nodes still in the AST: add them before
  // modifying the struct body.
  for (const name of getUsedHelpers(node, supers.length > 0)) {
    state.addHelper(name);
  }

  for (const memberPath of bodyPaths) {
    const member = memberPath.node;

    // TypeScript constructor overloads: the constructor is moved to #init
    if (member.type === "TSDeclareMethod" && member.kind === "constructor") {
      continue;
    }

    if (member.type === "StaticBlock" || member.static) {
      if (
        (member.type === "ClassProperty" ||
          member.type === "ClassPrivateProperty") &&
        member.value &&
        isAnonymousFunctionDefinition(
          skipTransparentExprWrapperNodes(member.value),
        )
      ) {
        let computedRef = null;
        if (member.type === "ClassProperty" && member.computed) {
          const memo = memoizeKey(member.key);
          member.key = memo.key;
          computedRef = memo.ref;
        }
        const { key } = member;
        member.value = nameAnonymousFunction(member.value, () =>
          getFieldName(key, computedRef),
        );
      }
      members.push(member);
      continue;
    }

    switch (member.type) {
      case "ClassMethod": {
        if (member.kind !== "constructor") {
          const isPlain = isPlainMethod(member);
          const staticKey = getStaticKey(member);
          let key: t.Expression | undefined;
          if (staticKey === undefined) {
            if (isPlain || orderedMethodKeys) {
              const memo = memoizeKey(member.key);
              member.key = memo.key;
              key = memo.ref();
            }
          } else if (orderedMethodKeys) {
            key = t.stringLiteral(staticKey);
          } else {
            staticKeyIsPlainMethod.set(staticKey, isPlain);
          }
          if (key) methodKeys.push(isPlain ? key : t.arrayExpression([key]));
          members.push(member);
          break;
        }
        for (const param of memberPath.get("params") as NodePath[]) {
          if (param.isTSParameterProperty()) {
            throw param.buildCodeFrameError(
              "TypeScript parameter properties are not supported in struct constructors, " +
                "since all the struct fields must be declared in the struct body.",
            );
          }
        }
        // super(...) is replaced by a call to a generated private method,
        // which can reference the struct without being affected by bindings
        // in the constructor shadowing its name. Replace the innermost calls
        // first, in case of `super(super())`.
        if (supers.length > 0) {
          superName = generatePrivateName("super");
          for (const superCall of supers.reverse()) {
            // super(...) -> this.#super()(...)
            superCall
              .get("callee")
              .replaceWith(
                t.callExpression(
                  t.memberExpression(
                    t.thisExpression(),
                    t.cloneNode(superName),
                  ),
                  [],
                ),
              );
          }
        }
        initializerName = generatePrivateName("init");
        initializer = t.inherits(
          t.classPrivateMethod(
            "method",
            initializerName,
            member.params as t.FunctionParameter[],
            member.body,
          ),
          member,
        );
        break;
      }

      case "ClassPrivateMethod": {
        if (isPlainMethod(member)) {
          // #m() {}
          //   -> #m2() {} get #m() { return _structPrivateMethod(S, this.#m2, "#m"); }
          const { key } = member;
          const method = generatePrivateName(key.id.name);
          member.key = method;
          members.push(
            member,
            t.classPrivateMethod(
              "get",
              t.cloneNode(key),
              [],
              t.blockStatement([
                t.returnStatement(
                  t.callExpression(state.addHelper("structPrivateMethod"), [
                    structRef(),
                    t.memberExpression(t.thisExpression(), t.cloneNode(method)),
                    t.stringLiteral("#" + key.id.name),
                  ]),
                ),
              ]),
            ),
          );
        } else {
          members.push(member);
        }
        break;
      }

      case "ClassProperty":
      case "ClassPrivateProperty": {
        if (member.type === "ClassProperty" && member.declare) {
          throw memberPath.buildCodeFrameError(
            "Fields with the 'declare' modifier are not supported in structs, since all the struct fields exist at runtime.",
          );
        }
        if (member.value) {
          let computedRef = null;
          if (member.type === "ClassProperty" && member.computed) {
            const memo = memoizeKey(member.key);
            member.key = memo.key;
            computedRef = memo.fieldRef;
          }
          addFieldInitializer(member.key, computedRef, member.value);
          member.value = null;
        }
        members.push(member);
        break;
      }

      case "ClassAccessorProperty": {
        // accessor x = v
        //   -> #x; get x() { return this.#x; } set x(v) { this.#x = v; }
        const storage = generatePrivateName(
          member.key.type === "PrivateName"
            ? member.key.id.name
            : member.key.type === "Identifier" && !member.computed
              ? member.key.name
              : "accessor",
        );
        let getterKey: t.Expression | t.PrivateName = member.key;
        let setterKey: t.Expression | t.PrivateName = t.cloneNode(member.key);
        let computedRef = null;
        let memoRef: (() => t.Expression) | undefined;
        if (member.computed) {
          const memo = memoizeKey(member.key);
          getterKey = memo.key;
          setterKey = memo.ref();
          memoRef = memo.ref;
          computedRef = memo.fieldRef;
        }
        const storageRef = () =>
          t.memberExpression(t.thisExpression(), t.cloneNode(storage));
        const value = t.identifier("value");

        // The getter and setter replace the methods with the same key
        if (member.key.type !== "PrivateName") {
          const staticKey = getStaticKey(member);
          if (staticKey === undefined) {
            if (orderedMethodKeys) {
              methodKeys.push(t.arrayExpression([memoRef!()]));
            }
          } else if (orderedMethodKeys) {
            methodKeys.push(t.arrayExpression([t.stringLiteral(staticKey)]));
          } else {
            staticKeyIsPlainMethod.set(staticKey, false);
          }
        }

        members.push(t.inherits(t.classPrivateProperty(storage), member));
        const makeAccessor = (
          kind: "get" | "set",
          key: t.Expression | t.PrivateName,
          params: t.Identifier[],
          body: t.Statement,
        ) =>
          key.type === "PrivateName"
            ? t.classPrivateMethod(kind, key, params, t.blockStatement([body]))
            : t.classMethod(
                kind,
                key,
                params,
                t.blockStatement([body]),
                member.computed,
              );
        members.push(
          makeAccessor("get", getterKey, [], t.returnStatement(storageRef())),
          makeAccessor(
            "set",
            setterKey,
            [value],
            t.expressionStatement(
              t.assignmentExpression("=", storageRef(), t.cloneNode(value)),
            ),
          ),
        );
        if (member.value) {
          addFieldInitializer(member.key, computedRef, member.value, storage);
        }
        break;
      }

      default:
        members.push(member);
    }
  }

  for (const [key, isPlain] of staticKeyIsPlainMethod) {
    if (isPlain) methodKeys.push(t.stringLiteral(key));
  }

  let fieldsName: t.PrivateName | undefined;
  if (fieldInitializers.length > 0) {
    fieldsName = generatePrivateName("fields");
    members.push(
      t.classPrivateMethod(
        "method",
        fieldsName,
        fieldKeyVars.map(id => t.cloneNode(id)),
        t.blockStatement(fieldInitializers),
      ),
    );
  }
  if (initializer) members.push(initializer);
  if (superName) {
    // #super() { return _structSuper(S, this); }
    // It returns a function calling the parent initializer: the parent is
    // read before evaluating the super() arguments.
    members.push(
      t.classPrivateMethod(
        "method",
        superName,
        [],
        t.blockStatement([
          t.returnStatement(
            t.callExpression(state.addHelper("structSuper"), [
              structRef(),
              t.thisExpression(),
            ]),
          ),
        ]),
      ),
    );
  }

  const instance = t.identifier("o");
  const defineStructArgs: t.Expression[] = [
    structRef(),
    // When there are no static elements, the prototype can be sealed
    // immediately. Otherwise, sealStruct is called after them.
    t.booleanLiteral(!hasStaticElements),
    // o => o.#fields
    fieldsName
      ? t.arrowFunctionExpression(
          [instance],
          t.memberExpression(t.cloneNode(instance), t.cloneNode(fieldsName)),
        )
      : t.buildUndefinedNode(),
    // o => o.#init
    initializerName
      ? t.arrowFunctionExpression(
          [t.cloneNode(instance)],
          t.memberExpression(
            t.cloneNode(instance),
            t.cloneNode(initializerName),
          ),
        )
      : t.buildUndefinedNode(),
    methodKeys.length > 0
      ? t.arrayExpression(methodKeys)
      : t.buildUndefinedNode(),
    fieldKeyVars.length > 0
      ? t.arrayExpression(fieldKeyVars.map(id => t.cloneNode(id)))
      : t.buildUndefinedNode(),
  ];
  while (t.isUnaryExpression(defineStructArgs.at(-1), { operator: "void" })) {
    defineStructArgs.pop();
  }
  const defineStruct = t.callExpression(
    state.addHelper("defineStruct"),
    defineStructArgs,
  );

  members.unshift(
    t.classMethod(
      "constructor",
      t.identifier("constructor"),
      [],
      t.blockStatement([
        t.returnStatement(
          t.logicalExpression(
            "||",
            t.callExpression(state.addHelper("constructStruct"), [
              structRef(),
              t.metaProperty(t.identifier("new"), t.identifier("target")),
              t.identifier("arguments"),
            ]),
            t.callExpression(t.super(), []),
          ),
        ),
      ]),
    ),
  );
  const definition: t.Statement[] = [t.expressionStatement(defineStruct)];
  if (anonymous) {
    definition.unshift(
      t.expressionStatement(
        t.assignmentExpression("=", structRef(), t.thisExpression()),
      ),
    );
  }
  members.unshift(t.staticBlock(definition));
  if (hasStaticElements) {
    members.push(
      t.staticBlock([
        t.expressionStatement(
          t.callExpression(state.addHelper("sealStruct"), [structRef()]),
        ),
      ]),
    );
  }

  const classDeclaration = t.inherits(
    t.classDeclaration(
      anonymous ? null : id,
      t.callExpression(
        state.addHelper("structHeritage"),
        node.superClass ? [node.superClass] : [],
      ),
      t.inherits(t.classBody(members), node.body),
    ),
    node,
  );
  // TypeScript and Flow annotations
  classDeclaration.typeParameters = node.typeParameters;
  classDeclaration.superTypeArguments = node.superTypeArguments;
  classDeclaration.implements = node.implements;

  path.replaceWith(classDeclaration);
  return true;
}
