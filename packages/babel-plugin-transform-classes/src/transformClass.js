// @flow
import type { NodePath } from "@babel/traverse";
import nameFunction from "@babel/helper-function-name";
import ReplaceSupers from "@babel/helper-replace-supers";
import optimiseCall from "@babel/helper-optimise-call-expression";
import * as defineMap from "@babel/helper-define-map";
import { traverse, template, types as t } from "@babel/core";

type ReadonlySet<T> = Set<T> | { has(val: T): boolean };

const noMethodVisitor = {
  "FunctionExpression|FunctionDeclaration"(path) {
    path.skip();
  },

  Method(path) {
    path.skip();
  },
};

export default function transformClass(
  path: NodePath,
  file: any,
  builtinClasses: ReadonlySet<string>,
  isLoose: boolean,
) {
  const classState = {
    parent: undefined,
    scope: undefined,
    node: undefined,
    path: undefined,
    file: undefined,

    classId: undefined,
    classRef: undefined,
    superName: undefined,
    superReturns: [],
    isDerived: false,
    extendsNative: false,

    construct: undefined,
    constructorBody: undefined,
    userConstructor: undefined,
    userConstructorPath: undefined,
    hasConstructor: false,

    instancePropBody: [],
    instancePropRefs: {},
    staticPropBody: [],
    body: [],
    bareSupers: [],
    superThises: [],
    pushedConstructor: false,
    pushedInherits: false,
    protoAlias: null,
    isLoose: false,
    hasBareSuper: false,

    instanceInitializersId: undefined,
    staticInitializersId: undefined,
    hasInstanceDescriptors: false,
    hasStaticDescriptors: false,
    instanceMutatorMap: {},
    staticMutatorMap: {},
  };

  const setState = newState => {
    Object.assign(classState, newState);
  };

  const verifyConstructorVisitor = traverse.visitors.merge([
    noMethodVisitor,
    {
      CallExpression: {
        exit(path) {
          if (path.get("callee").isSuper()) {
            classState.hasBareSuper = true;

            if (!classState.isDerived) {
              throw path.buildCodeFrameError(
                "super() is only allowed in a derived constructor",
              );
            }
          }
        },
      },

      ThisExpression(path) {
        if (classState.isDerived) {
          if (path.parentPath.isMemberExpression({ object: path.node })) {
            // In cases like this.foo or this[foo], there is no need to add
            // assertThisInitialized, since they already throw if this is
            // undefined.
            return;
          }

          const assertion = t.callExpression(
            classState.file.addHelper("assertThisInitialized"),
            [path.node],
          );
          path.replaceWith(assertion);
          path.skip();
        }
      },
    },
  ]);

  const findThisesVisitor = traverse.visitors.merge([
    noMethodVisitor,
    {
      ThisExpression(path) {
        classState.superThises.push(path);
      },
    },
  ]);

  function buildConstructor() {
    const func = t.functionDeclaration(
      t.cloneNode(classState.classRef),
      [],
      classState.constructorBody,
    );
    t.inherits(func, classState.node);
    return func;
  }

  function pushToMap(node, enumerable, kind = "value", scope?) {
    let mutatorMap;
    if (node.static) {
      classState.hasStaticDescriptors = true;
      mutatorMap = classState.staticMutatorMap;
    } else {
      classState.hasInstanceDescriptors = true;
      mutatorMap = classState.instanceMutatorMap;
    }

    const map = defineMap.push(mutatorMap, node, kind, classState.file, scope);

    if (enumerable) {
      map.enumerable = t.booleanLiteral(true);
    }

    return map;
  }

  /**
   * [Please add a description.]
   * https://www.youtube.com/watch?v=fWNaR-rxAic
   */
  function constructorMeMaybe() {
    let hasConstructor = false;
    const paths = classState.path.get("body.body");
    for (const path of paths) {
      hasConstructor = path.equals("kind", "constructor");
      if (hasConstructor) break;
    }
    if (hasConstructor) return;

    let params, body;

    if (classState.isDerived) {
      const constructor = template.expression.ast`
        (function () {
          super(...arguments);
        })
      `;
      params = constructor.params;
      body = constructor.body;
    } else {
      params = [];
      body = t.blockStatement([]);
    }

    classState.path
      .get("body")
      .unshiftContainer(
        "body",
        t.classMethod("constructor", t.identifier("constructor"), params, body),
      );
  }

  function buildBody() {
    constructorMeMaybe();
    pushBody();
    verifyConstructor();

    if (classState.userConstructor) {
      const constructorBody = classState.constructorBody;
      constructorBody.body = constructorBody.body.concat(
        classState.userConstructor.body.body,
      );
      t.inherits(classState.construct, classState.userConstructor);
      t.inherits(constructorBody, classState.userConstructor.body);
    }

    pushDescriptors();
  }

  function pushBody() {
    const classBodyPaths: Array<Object> = classState.path.get("body.body");

    for (const path of classBodyPaths) {
      const node = path.node;

      if (path.isClassProperty()) {
        throw path.buildCodeFrameError("Missing class properties transform.");
      }

      if (node.decorators) {
        throw path.buildCodeFrameError(
          "Method has decorators, put the decorator plugin before the classes one.",
        );
      }

      if (t.isClassMethod(node)) {
        const isConstructor = node.kind === "constructor";

        if (isConstructor) {
          path.traverse(verifyConstructorVisitor);
        }

        const replaceSupers = new ReplaceSupers(
          {
            forceSuperMemoisation: isConstructor,
            methodPath: path,
            methodNode: node,
            objectRef: classState.classRef,
            superRef: classState.superName,
            inConstructor: isConstructor,
            isStatic: node.static,
            isLoose: classState.isLoose,
            scope: classState.scope,
            file: classState.file,
          },
          true,
        );

        replaceSupers.replace();

        if (isConstructor) {
          pushConstructor(replaceSupers, node, path);
        } else {
          pushMethod(node, path);
        }
      }
    }
  }

  function clearDescriptors() {
    classState.hasInstanceDescriptors = false;
    classState.hasStaticDescriptors = false;

    classState.instanceMutatorMap = {};
    classState.staticMutatorMap = {};
  }

  function pushDescriptors() {
    pushInheritsToBody();

    const body = classState.body;

    let instanceProps;
    let staticProps;

    if (classState.hasInstanceDescriptors) {
      instanceProps = defineMap.toClassObject(classState.instanceMutatorMap);
    }

    if (classState.hasStaticDescriptors) {
      staticProps = defineMap.toClassObject(classState.staticMutatorMap);
    }

    if (instanceProps || staticProps) {
      if (instanceProps) {
        instanceProps = defineMap.toComputedObjectFromClass(instanceProps);
      }
      if (staticProps) {
        staticProps = defineMap.toComputedObjectFromClass(staticProps);
      }

      let args = [
        t.cloneNode(classState.classRef), // Constructor
        t.nullLiteral(), // instanceDescriptors
        t.nullLiteral(), // staticDescriptors
        t.nullLiteral(), // instanceInitializers
        t.nullLiteral(), // staticInitializers
      ];

      if (instanceProps) args[1] = instanceProps;
      if (staticProps) args[2] = staticProps;

      if (classState.instanceInitializersId) {
        args[3] = classState.instanceInitializersId;
        body.unshift(buildObjectAssignment(classState.instanceInitializersId));
      }

      if (classState.staticInitializersId) {
        args[4] = classState.staticInitializersId;
        body.unshift(buildObjectAssignment(classState.staticInitializersId));
      }

      let lastNonNullIndex = 0;
      for (let i = 0; i < args.length; i++) {
        if (!t.isNullLiteral(args[i])) lastNonNullIndex = i;
      }
      args = args.slice(0, lastNonNullIndex + 1);

      body.push(
        t.expressionStatement(
          t.callExpression(classState.file.addHelper("createClass"), args),
        ),
      );
    }

    clearDescriptors();
  }

  function buildObjectAssignment(id) {
    return t.variableDeclaration("var", [
      t.variableDeclarator(id, t.objectExpression([])),
    ]);
  }

  function wrapSuperCall(bareSuper, superRef, thisRef, body) {
    let bareSuperNode = bareSuper.node;

    if (classState.isLoose) {
      bareSuperNode.arguments.unshift(t.thisExpression());
      if (
        bareSuperNode.arguments.length === 2 &&
        t.isSpreadElement(bareSuperNode.arguments[1]) &&
        t.isIdentifier(bareSuperNode.arguments[1].argument, {
          name: "arguments",
        })
      ) {
        // special case single arguments spread
        bareSuperNode.arguments[1] = bareSuperNode.arguments[1].argument;
        bareSuperNode.callee = t.memberExpression(
          t.cloneNode(superRef),
          t.identifier("apply"),
        );
      } else {
        bareSuperNode.callee = t.memberExpression(
          t.cloneNode(superRef),
          t.identifier("call"),
        );
      }
    } else {
      bareSuperNode = optimiseCall(
        t.logicalExpression(
          "||",
          t.memberExpression(
            t.cloneNode(classState.classRef),
            t.identifier("__proto__"),
          ),
          t.callExpression(
            t.memberExpression(
              t.identifier("Object"),
              t.identifier("getPrototypeOf"),
            ),
            [t.cloneNode(classState.classRef)],
          ),
        ),
        t.thisExpression(),
        bareSuperNode.arguments,
      );
    }

    let call;

    if (classState.isLoose) {
      call = t.logicalExpression("||", bareSuperNode, t.thisExpression());
    } else {
      call = t.callExpression(
        classState.file.addHelper("possibleConstructorReturn"),
        [t.thisExpression(), bareSuperNode],
      );
    }

    if (
      bareSuper.parentPath.isExpressionStatement() &&
      bareSuper.parentPath.container === body.node.body &&
      body.node.body.length - 1 === bareSuper.parentPath.key
    ) {
      // this super call is the last statement in the body so we can just straight up
      // turn it into a return

      if (classState.superThises.length) {
        call = t.assignmentExpression("=", thisRef(), call);
      }

      bareSuper.parentPath.replaceWith(t.returnStatement(call));
    } else {
      bareSuper.replaceWith(t.assignmentExpression("=", thisRef(), call));
    }
  }

  function verifyConstructor() {
    if (!classState.isDerived) return;

    const path = classState.userConstructorPath;
    const body = path.get("body");

    path.traverse(findThisesVisitor);

    let guaranteedSuperBeforeFinish = !!classState.bareSupers.length;

    const superRef = classState.superName || t.identifier("Function");
    let thisRef = function() {
      const ref = path.scope.generateDeclaredUidIdentifier("this");
      thisRef = () => t.cloneNode(ref);
      return ref;
    };

    for (const bareSuper of classState.bareSupers) {
      wrapSuperCall(bareSuper, superRef, thisRef, body);

      if (guaranteedSuperBeforeFinish) {
        bareSuper.find(function(parentPath) {
          // hit top so short circuit
          if (parentPath === path) {
            return true;
          }

          if (
            parentPath.isLoop() ||
            parentPath.isConditional() ||
            parentPath.isArrowFunctionExpression()
          ) {
            guaranteedSuperBeforeFinish = false;
            return true;
          }
        });
      }
    }

    for (const thisPath of classState.superThises) {
      thisPath.replaceWith(thisRef());
    }

    let wrapReturn;

    if (classState.isLoose) {
      wrapReturn = returnArg => {
        const thisExpr = t.callExpression(
          classState.file.addHelper("assertThisInitialized"),
          [thisRef()],
        );
        return returnArg
          ? t.logicalExpression("||", returnArg, thisExpr)
          : thisExpr;
      };
    } else {
      wrapReturn = returnArg =>
        t.callExpression(
          classState.file.addHelper("possibleConstructorReturn"),
          [thisRef()].concat(returnArg || []),
        );
    }

    // if we have a return as the last node in the body then we've already caught that
    // return
    const bodyPaths = body.get("body");
    if (!bodyPaths.length || !bodyPaths.pop().isReturnStatement()) {
      body.pushContainer(
        "body",
        t.returnStatement(
          guaranteedSuperBeforeFinish ? thisRef() : wrapReturn(),
        ),
      );
    }

    for (const returnPath of classState.superReturns) {
      returnPath
        .get("argument")
        .replaceWith(wrapReturn(returnPath.node.argument));
    }
  }

  /**
   * Push a method to its respective mutatorMap.
   */
  function pushMethod(node: { type: "ClassMethod" }, path?: NodePath) {
    const scope = path ? path.scope : classState.scope;

    if (node.kind === "method") {
      if (_processMethod(node, scope)) return;
    }

    pushToMap(node, false, null, scope);
  }

  function _processMethod(node, scope) {
    if (classState.isLoose === false) {
      return false;
    }

    if (!node.decorators) {
      // use assignments instead of define properties for loose classes

      let classRef = classState.classRef;
      if (!node.static) {
        _insertProtoAliasOnce();
        classRef = classState.protoAlias;
      }
      const methodName = t.memberExpression(
        t.cloneNode(classRef),
        node.key,
        node.computed || t.isLiteral(node.key),
      );

      let func = t.functionExpression(
        null,
        node.params,
        node.body,
        node.generator,
        node.async,
      );
      func.returnType = node.returnType;
      const key = t.toComputedKey(node, node.key);
      if (t.isStringLiteral(key)) {
        func = nameFunction({
          node: func,
          id: key,
          scope,
        });
      }

      const expr = t.expressionStatement(
        t.assignmentExpression("=", methodName, func),
      );
      t.inheritsComments(expr, node);
      classState.body.push(expr);
      return true;
    }

    return false;
  }

  function _insertProtoAliasOnce() {
    if (!classState.protoAlias) {
      classState.protoAlias = classState.scope.generateUidIdentifier("proto");
      const classProto = t.memberExpression(
        classState.classRef,
        t.identifier("prototype"),
      );
      const protoDeclaration = t.variableDeclaration("var", [
        t.variableDeclarator(classState.protoAlias, classProto),
      ]);

      classState.body.push(protoDeclaration);
    }
  }

  /**
   * Replace the constructor body of our class.
   */
  function pushConstructor(
    replaceSupers,
    method: { type: "ClassMethod" },
    path: NodePath,
  ) {
    classState.bareSupers = replaceSupers.bareSupers;
    classState.superReturns = replaceSupers.returns;

    // https://github.com/babel/babel/issues/1077
    if (path.scope.hasOwnBinding(classState.classRef.name)) {
      path.scope.rename(classState.classRef.name);
    }

    const construct = classState.construct;

    classState.userConstructorPath = path;
    classState.userConstructor = method;
    classState.hasConstructor = true;

    t.inheritsComments(construct, method);

    construct.params = method.params;

    t.inherits(construct.body, method.body);
    construct.body.directives = method.body.directives;

    // push constructor to body
    _pushConstructor();
  }

  function _pushConstructor() {
    if (classState.pushedConstructor) return;
    classState.pushedConstructor = true;

    // we haven't pushed any descriptors yet
    if (classState.hasInstanceDescriptors || classState.hasStaticDescriptors) {
      pushDescriptors();
    }

    classState.body.push(classState.construct);

    pushInheritsToBody();
  }

  /**
   * Push inherits helper to body.
   */
  function pushInheritsToBody() {
    if (!classState.isDerived || classState.pushedInherits) return;

    // Unshift to ensure that the constructor inheritance is set up before
    // any properties can be assigned to the prototype.
    classState.pushedInherits = true;
    classState.body.unshift(
      t.expressionStatement(
        t.callExpression(
          classState.isLoose
            ? classState.file.addHelper("inheritsLoose")
            : classState.file.addHelper("inherits"),
          [t.cloneNode(classState.classRef), t.cloneNode(classState.superName)],
        ),
      ),
    );
  }

  function classTransformer(
    path: NodePath,
    file,
    builtinClasses: ReadonlySet<string>,
    isLoose: boolean,
  ) {
    setState({
      parent: path.parent,
      scope: path.scope,
      node: path.node,
      path: path,
      file: file,
      isLoose: isLoose || classState.isLoose,
    });

    setState({
      classId: classState.node.id,
      // this is the name of the binding that will **always** reference the class we've constructed
      classRef: classState.node.id
        ? t.identifier(classState.node.id.name)
        : classState.scope.generateUidIdentifier("class"),
      superName: classState.node.superClass || t.identifier("Function"),
      isDerived: !!classState.node.superClass,
    });

    setState({
      extendsNative:
        classState.isDerived &&
        builtinClasses.has(classState.superName.name) &&
        !classState.scope.hasBinding(
          classState.superName.name,
          /* noGlobals */ true,
        ),
    });

    // run()
    let { superName, body } = classState;

    const constructorBody = (classState.constructorBody = t.blockStatement([]));
    classState.construct = buildConstructor();

    const closureParams = [];
    const closureArgs = [];

    if (classState.isDerived) {
      if (classState.extendsNative) {
        closureArgs.push(
          t.callExpression(classState.file.addHelper("wrapNativeSuper"), [
            t.cloneNode(superName),
          ]),
        );
      } else {
        closureArgs.push(t.cloneNode(superName));
      }

      superName = classState.scope.generateUidIdentifierBasedOnNode(superName);
      closureParams.push(superName);

      classState.superName = t.cloneNode(superName);
    }

    buildBody();

    // make sure this class isn't directly called (with A() instead new A())
    if (!classState.isLoose) {
      constructorBody.body.unshift(
        t.expressionStatement(
          t.callExpression(classState.file.addHelper("classCallCheck"), [
            t.thisExpression(),
            t.cloneNode(classState.classRef),
          ]),
        ),
      );
    }

    body = body.concat(
      classState.staticPropBody.map(fn => fn(t.cloneNode(classState.classRef))),
    );

    if (classState.classId) {
      // named class with only a constructor
      if (body.length === 1) return t.toExpression(body[0]);
    }

    //
    body.push(t.returnStatement(t.cloneNode(classState.classRef)));

    const container = t.arrowFunctionExpression(
      closureParams,
      t.blockStatement(body),
    );
    return t.callExpression(container, closureArgs);
  }

  return classTransformer(path, file, builtinClasses, isLoose);
}
