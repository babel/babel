import type { NodePath, Scope, File } from "@babel/core";
import ReplaceSupers from "@babel/helper-replace-supers";
import { template, types as t } from "@babel/core";
import { visitors } from "@babel/traverse";
import annotateAsPure from "@babel/helper-annotate-as-pure";

import addCallSuperHelper from "./inline-callSuper-helpers.ts";

type ClassAssumptions = {
  setClassMethods: boolean;
  constantSuper: boolean;
  superIsCallableConstructor: boolean;
  noClassCalls: boolean;
};

type ClassConstructor = t.ClassMethod & { kind: "constructor" };

function buildConstructor(
  classRef: t.Identifier,
  constructorBody: t.BlockStatement,
  node: t.Class,
) {
  const func = t.functionDeclaration(
    t.cloneNode(classRef),
    [],
    constructorBody,
  );
  t.inherits(func, node);
  return func;
}

type Descriptor = {
  key: t.Expression;
  get?: t.Expression | null;
  set?: t.Expression | null;
  value?: t.Expression | null;
  constructor?: t.Expression | null;
};

type State = {
  parent: t.Node;
  scope: Scope;
  node: t.Class;
  path: NodePath<t.Class>;
  file: File;

  classId: t.Identifier | void;
  classRef: t.Identifier;
  superName: t.Expression | null;
  superReturns: NodePath<t.ReturnStatement>[];
  isDerived: boolean;
  extendsNative: boolean;

  construct: t.FunctionDeclaration;
  constructorBody: t.BlockStatement;
  userConstructor: ClassConstructor;
  userConstructorPath: NodePath<ClassConstructor>;
  hasConstructor: boolean;

  body: t.Statement[];
  superThises: NodePath<t.ThisExpression>[];
  pushedInherits: boolean;
  pushedCreateClass: boolean;
  protoAlias: t.Identifier | null;
  isLoose: boolean;

  dynamicKeys: Map<string, t.Expression>;

  methods: {
    // 'list' is in the same order as the elements appear in the class body.
    // if there aren't computed keys, we can safely reorder class elements
    // and use 'map' to merge duplicates.
    instance: {
      hasComputed: boolean;
      list: Descriptor[];
      map: Map<string, Descriptor>;
    };
    static: {
      hasComputed: boolean;
      list: Descriptor[];
      map: Map<string, Descriptor>;
    };
  };
};

type PropertyInfo = {
  instance: t.ObjectExpression[] | null;
  static: t.ObjectExpression[] | null;
};

export default function transformClass(
  path: NodePath<t.Class>,
  file: File,
  builtinClasses: ReadonlySet<string>,
  isLoose: boolean,
  assumptions: ClassAssumptions,
  supportUnicodeId: boolean,
) {
  const classState: State = {
    parent: undefined,
    scope: undefined,
    node: undefined,
    path: undefined,
    file: undefined,

    classId: undefined,
    classRef: undefined,
    superName: null,
    superReturns: [],
    isDerived: false,
    extendsNative: false,

    construct: undefined,
    constructorBody: undefined,
    userConstructor: undefined,
    userConstructorPath: undefined,
    hasConstructor: false,

    body: [],
    superThises: [],
    pushedInherits: false,
    pushedCreateClass: false,
    protoAlias: null,
    isLoose: false,

    dynamicKeys: new Map(),

    methods: {
      instance: {
        hasComputed: false,
        list: [],
        map: new Map(),
      },
      static: {
        hasComputed: false,
        list: [],
        map: new Map(),
      },
    },
  };

  const setState = (newState: Partial<State>) => {
    Object.assign(classState, newState);
  };

  const findThisesVisitor = visitors.environmentVisitor({
    ThisExpression(path) {
      classState.superThises.push(path);
    },
  });

  function createClassHelper(args: t.Expression[]) {
    return t.callExpression(classState.file.addHelper("createClass"), args);
  }

  /**
   * Creates a class constructor or bail out if there is one
   */
  function maybeCreateConstructor() {
    const classBodyPath = classState.path.get("body");
    for (const path of classBodyPath.get("body")) {
      if (path.isClassMethod({ kind: "constructor" })) return;
    }

    let params: t.FunctionExpression["params"], body;

    if (classState.isDerived) {
      const constructor = template.expression.ast`
        (function () {
          super(...arguments);
        })
      ` as t.FunctionExpression;
      params = constructor.params;
      body = constructor.body;
    } else {
      params = [];
      body = t.blockStatement([]);
    }

    classBodyPath.unshiftContainer(
      "body",
      t.classMethod("constructor", t.identifier("constructor"), params, body),
    );
  }

  function buildBody() {
    maybeCreateConstructor();
    pushBody();
    verifyConstructor();

    if (classState.userConstructor) {
      const { constructorBody, userConstructor, construct } = classState;

      constructorBody.body.push(...userConstructor.body.body);
      t.inherits(construct, userConstructor);
      t.inherits(constructorBody, userConstructor.body);
    }

    pushDescriptors();
  }

  function pushBody() {
    const classBodyPaths: Array<any> = classState.path.get("body.body");

    for (const path of classBodyPaths) {
      const node = path.node;

      if (path.isClassProperty() || path.isClassPrivateProperty()) {
        throw path.buildCodeFrameError("Missing class properties transform.");
      }

      if (node.decorators) {
        throw path.buildCodeFrameError(
          "Method has decorators, put the decorator plugin before the classes one.",
        );
      }

      if (t.isClassMethod(node)) {
        const isConstructor = node.kind === "constructor";

        const replaceSupers = new ReplaceSupers({
          methodPath: path,
          objectRef: classState.classRef,
          superRef: classState.superName,
          constantSuper: assumptions.constantSuper,
          file: classState.file,
          refToPreserve: classState.classRef,
        });

        replaceSupers.replace();

        const superReturns: NodePath<t.ReturnStatement>[] = [];
        path.traverse(
          visitors.environmentVisitor({
            ReturnStatement(path) {
              if (!path.getFunctionParent().isArrowFunctionExpression()) {
                superReturns.push(path);
              }
            },
          }),
        );

        if (isConstructor) {
          pushConstructor(superReturns, node as ClassConstructor, path);
        } else {
          if (!process.env.BABEL_8_BREAKING && !USE_ESM && !IS_STANDALONE) {
            // polyfill when being run by an older Babel version
            path.ensureFunctionName ??=
              // eslint-disable-next-line no-restricted-globals
              require("@babel/traverse").NodePath.prototype.ensureFunctionName;
          }
          path.ensureFunctionName(supportUnicodeId);
          let wrapped;
          if (node !== path.node) {
            wrapped = path.node;
            // The node has been wrapped. Reset it to the original once, but store the wrapper.
            path.replaceWith(node);
          }

          pushMethod(node, wrapped);
        }
      }
    }
  }

  function pushDescriptors() {
    pushInheritsToBody();

    const { body } = classState;

    const props: PropertyInfo = {
      instance: null,
      static: null,
    };

    for (const placement of ["static", "instance"] as const) {
      if (classState.methods[placement].list.length) {
        props[placement] = classState.methods[placement].list.map(desc => {
          const obj = t.objectExpression([
            t.objectProperty(t.identifier("key"), desc.key),
          ]);

          for (const kind of ["get", "set", "value"] as const) {
            if (desc[kind] != null) {
              obj.properties.push(
                t.objectProperty(t.identifier(kind), desc[kind]),
              );
            }
          }

          return obj;
        });
      }
    }

    if (props.instance || props.static) {
      let args = [
        t.cloneNode(classState.classRef), // Constructor
        props.instance ? t.arrayExpression(props.instance) : t.nullLiteral(), // instanceDescriptors
        props.static ? t.arrayExpression(props.static) : t.nullLiteral(), // staticDescriptors
      ];

      let lastNonNullIndex = 0;
      for (let i = 0; i < args.length; i++) {
        if (!t.isNullLiteral(args[i])) lastNonNullIndex = i;
      }
      args = args.slice(0, lastNonNullIndex + 1);

      body.push(t.returnStatement(createClassHelper(args)));
      classState.pushedCreateClass = true;
    }
  }

  function wrapSuperCall(
    bareSuper: NodePath<t.CallExpression>,
    superRef: t.Expression,
    thisRef: () => t.Identifier,
    body: NodePath<t.BlockStatement>,
  ) {
    const bareSuperNode = bareSuper.node;
    let call;

    if (assumptions.superIsCallableConstructor) {
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

      call = t.logicalExpression("||", bareSuperNode, t.thisExpression());
    } else {
      const args: t.Expression[] = [
        t.thisExpression(),
        t.cloneNode(classState.classRef),
      ];
      if (bareSuperNode.arguments?.length) {
        const bareSuperNodeArguments = bareSuperNode.arguments as (
          | t.Expression
          | t.SpreadElement
        )[];

        /**
         * test262/test/language/expressions/super/call-spread-err-sngl-err-itr-get-get.js
         *
         * var iter = {};
         * Object.defineProperty(iter, Symbol.iterator, {
         *   get: function() {
         *     throw new Test262Error();
         *   }
         * })
         * super(...iter);
         */

        if (
          bareSuperNodeArguments.length === 1 &&
          t.isSpreadElement(bareSuperNodeArguments[0]) &&
          t.isIdentifier(bareSuperNodeArguments[0].argument, {
            name: "arguments",
          })
        ) {
          args.push(bareSuperNodeArguments[0].argument);
        } else {
          args.push(t.arrayExpression(bareSuperNodeArguments));
        }
      }
      call = t.callExpression(addCallSuperHelper(classState.file), args);
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

    const constructorBody = path.get("body");

    let maxGuaranteedSuperBeforeIndex = constructorBody.node.body.length;

    path.traverse(findThisesVisitor);

    let thisRef = function () {
      const ref = path.scope.generateDeclaredUidIdentifier("this");
      maxGuaranteedSuperBeforeIndex++;
      thisRef = () => t.cloneNode(ref);
      return ref;
    };

    const buildAssertThisInitialized = function () {
      return t.callExpression(
        classState.file.addHelper("assertThisInitialized"),
        [thisRef()],
      );
    };

    const bareSupers: NodePath<t.CallExpression>[] = [];
    path.traverse(
      visitors.environmentVisitor({
        Super(path) {
          const { node, parentPath } = path;
          if (parentPath.isCallExpression({ callee: node })) {
            bareSupers.unshift(parentPath);
          }
        },
      }),
    );

    for (const bareSuper of bareSupers) {
      wrapSuperCall(bareSuper, classState.superName, thisRef, body);

      if (maxGuaranteedSuperBeforeIndex >= 0) {
        let lastParentPath: NodePath;
        bareSuper.find(function (parentPath) {
          // hit top so short circuit
          if (parentPath === constructorBody) {
            maxGuaranteedSuperBeforeIndex = Math.min(
              maxGuaranteedSuperBeforeIndex,
              lastParentPath.key as number,
            );
            return true;
          }

          const { type } = parentPath;
          switch (type) {
            case "ExpressionStatement":
            case "SequenceExpression":
            case "AssignmentExpression":
            case "BinaryExpression":
            case "MemberExpression":
            case "CallExpression":
            case "NewExpression":
            case "VariableDeclarator":
            case "VariableDeclaration":
            case "BlockStatement":
            case "ArrayExpression":
            case "ObjectExpression":
            case "ObjectProperty":
            case "TemplateLiteral":
              lastParentPath = parentPath;
              return false;
            default:
              if (
                (type === "LogicalExpression" &&
                  parentPath.node.left === lastParentPath.node) ||
                (parentPath.isConditional() &&
                  parentPath.node.test === lastParentPath.node) ||
                (type === "OptionalCallExpression" &&
                  parentPath.node.callee === lastParentPath.node) ||
                (type === "OptionalMemberExpression" &&
                  parentPath.node.object === lastParentPath.node)
              ) {
                lastParentPath = parentPath;
                return false;
              }
          }

          maxGuaranteedSuperBeforeIndex = -1;
          return true;
        });
      }
    }

    const guaranteedCalls = new Set<NodePath>();

    for (const thisPath of classState.superThises) {
      const { node, parentPath } = thisPath;
      if (parentPath.isMemberExpression({ object: node })) {
        thisPath.replaceWith(thisRef());
        continue;
      }

      let thisIndex: number;
      thisPath.find(function (parentPath) {
        if (parentPath.parentPath === constructorBody) {
          thisIndex = parentPath.key as number;
          return true;
        }
      });

      let exprPath: NodePath = thisPath.parentPath.isSequenceExpression()
        ? thisPath.parentPath
        : thisPath;
      if (
        exprPath.listKey === "arguments" &&
        (exprPath.parentPath.isCallExpression() ||
          exprPath.parentPath.isOptionalCallExpression())
      ) {
        exprPath = exprPath.parentPath;
      } else {
        exprPath = null;
      }

      if (
        (maxGuaranteedSuperBeforeIndex !== -1 &&
          thisIndex > maxGuaranteedSuperBeforeIndex) ||
        guaranteedCalls.has(exprPath)
      ) {
        thisPath.replaceWith(thisRef());
      } else {
        if (exprPath) {
          guaranteedCalls.add(exprPath);
        }
        thisPath.replaceWith(buildAssertThisInitialized());
      }
    }

    let wrapReturn;

    if (classState.isLoose) {
      wrapReturn = (returnArg: t.Expression | void) => {
        const thisExpr = buildAssertThisInitialized();
        return returnArg
          ? t.logicalExpression("||", returnArg, thisExpr)
          : thisExpr;
      };
    } else {
      wrapReturn = (returnArg: t.Expression | undefined) => {
        const returnParams: t.Expression[] = [thisRef()];
        if (returnArg != null) {
          returnParams.push(returnArg);
        }
        return t.callExpression(
          classState.file.addHelper("possibleConstructorReturn"),
          returnParams,
        );
      };
    }

    // if we have a return as the last node in the body then we've already caught that
    // return
    const bodyPaths = body.get("body");
    const guaranteedSuperBeforeFinish =
      maxGuaranteedSuperBeforeIndex !== -1 &&
      maxGuaranteedSuperBeforeIndex < bodyPaths.length;
    if (!bodyPaths.length || !bodyPaths.pop().isReturnStatement()) {
      body.pushContainer(
        "body",
        t.returnStatement(
          guaranteedSuperBeforeFinish
            ? thisRef()
            : buildAssertThisInitialized(),
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
  function pushMethod(node: t.ClassMethod, wrapped?: t.Expression) {
    if (node.kind === "method") {
      if (processMethod(node)) return;
    }

    const placement = node.static ? "static" : "instance";
    const methods = classState.methods[placement];

    const descKey = node.kind === "method" ? "value" : node.kind;
    const key =
      t.isNumericLiteral(node.key) || t.isBigIntLiteral(node.key)
        ? t.stringLiteral(String(node.key.value))
        : t.toComputedKey(node);
    methods.hasComputed = !t.isStringLiteral(key);

    const fn: t.Expression = wrapped ?? t.toExpression(node);

    let descriptor: Descriptor;
    if (
      !methods.hasComputed &&
      methods.map.has((key as t.StringLiteral).value)
    ) {
      descriptor = methods.map.get((key as t.StringLiteral).value);
      descriptor[descKey] = fn;

      if (descKey === "value") {
        descriptor.get = null;
        descriptor.set = null;
      } else {
        descriptor.value = null;
      }
    } else {
      descriptor = {
        key:
          // private name has been handled in class-properties transform
          key as t.Expression,
        [descKey]: fn,
      } as Descriptor;
      methods.list.push(descriptor);

      if (!methods.hasComputed) {
        methods.map.set((key as t.StringLiteral).value, descriptor);
      }
    }
  }

  function processMethod(node: t.ClassMethod) {
    if (assumptions.setClassMethods && !node.decorators) {
      // use assignments instead of define properties for loose classes
      let { classRef } = classState;
      if (!node.static) {
        insertProtoAliasOnce();
        classRef = classState.protoAlias;
      }
      const methodName = t.memberExpression(
        t.cloneNode(classRef),
        node.key,
        node.computed || t.isLiteral(node.key),
      );

      const func: t.Expression = t.functionExpression(
        // @ts-expect-error We actually set and id through .ensureFunctionName
        node.id,
        // @ts-expect-error Fixme: should throw when we see TSParameterProperty
        node.params,
        node.body,
        node.generator,
        node.async,
      );
      t.inherits(func, node);

      const expr = t.expressionStatement(
        t.assignmentExpression("=", methodName, func),
      );
      t.inheritsComments(expr, node);
      classState.body.push(expr);
      return true;
    }

    return false;
  }

  function insertProtoAliasOnce() {
    if (classState.protoAlias === null) {
      setState({ protoAlias: classState.scope.generateUidIdentifier("proto") });
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
    superReturns: NodePath<t.ReturnStatement>[],
    method: ClassConstructor,
    path: NodePath<ClassConstructor>,
  ) {
    setState({
      userConstructorPath: path,
      userConstructor: method,
      hasConstructor: true,
      superReturns,
    });

    const { construct } = classState;

    t.inheritsComments(construct, method);

    // @ts-expect-error Fixme: should throw when we see TSParameterProperty
    construct.params = method.params;

    t.inherits(construct.body, method.body);
    construct.body.directives = method.body.directives;

    // we haven't pushed any descriptors yet
    // @ts-expect-error todo(flow->ts) maybe remove this block - properties from condition are not used anywhere else
    if (classState.hasInstanceDescriptors || classState.hasStaticDescriptors) {
      pushDescriptors();
    }

    pushInheritsToBody();
  }

  /**
   * Push inherits helper to body.
   */
  function pushInheritsToBody() {
    if (!classState.isDerived || classState.pushedInherits) return;

    classState.pushedInherits = true;

    // Unshift to ensure that the constructor inheritance is set up before
    // any properties can be assigned to the prototype.

    classState.body.unshift(
      t.expressionStatement(
        t.callExpression(
          classState.file.addHelper(
            classState.isLoose ? "inheritsLoose" : "inherits",
          ),
          [t.cloneNode(classState.classRef), t.cloneNode(classState.superName)],
        ),
      ),
    );
  }

  function extractDynamicKeys() {
    const { dynamicKeys, node, scope } = classState;

    for (const elem of node.body.body) {
      if (!t.isClassMethod(elem) || !elem.computed) continue;
      if (scope.isPure(elem.key, /* constants only*/ true)) continue;

      const id = scope.generateUidIdentifierBasedOnNode(elem.key);
      dynamicKeys.set(id.name, elem.key);

      elem.key = id;
    }
  }

  function setupClosureParamsArgs() {
    const { superName, dynamicKeys } = classState;
    const closureParams = [];
    const closureArgs = [];

    if (classState.isDerived) {
      let arg = t.cloneNode(superName);
      if (classState.extendsNative) {
        arg = t.callExpression(classState.file.addHelper("wrapNativeSuper"), [
          arg,
        ]);
        annotateAsPure(arg);
      }

      const param =
        classState.scope.generateUidIdentifierBasedOnNode(superName);

      closureParams.push(param);
      closureArgs.push(arg);

      setState({ superName: t.cloneNode(param) });
    }

    for (const [name, value] of dynamicKeys) {
      closureParams.push(t.identifier(name));
      closureArgs.push(value);
    }

    return { closureParams, closureArgs };
  }

  function classTransformer(
    path: NodePath<t.Class>,
    file: File,
    builtinClasses: ReadonlySet<string>,
    isLoose: boolean,
  ) {
    setState({
      parent: path.parent,
      scope: path.scope,
      node: path.node,
      path,
      file,
      isLoose,
    });

    setState({
      classId: classState.node.id,
      // this is the name of the binding that will **always** reference the class we've constructed
      classRef: classState.node.id
        ? t.identifier(classState.node.id.name)
        : classState.scope.generateUidIdentifier("class"),
      superName: classState.node.superClass,
      isDerived: !!classState.node.superClass,
      constructorBody: t.blockStatement([]),
    });

    setState({
      extendsNative:
        t.isIdentifier(classState.superName) &&
        builtinClasses.has(classState.superName.name) &&
        !classState.scope.hasBinding(
          classState.superName.name,
          /* noGlobals */ true,
        ),
    });

    const { classRef, node, constructorBody } = classState;

    setState({
      construct: buildConstructor(classRef, constructorBody, node),
    });

    extractDynamicKeys();

    const { body } = classState;
    const { closureParams, closureArgs } = setupClosureParamsArgs();

    buildBody();

    // make sure this class isn't directly called (with A() instead new A())
    if (!assumptions.noClassCalls) {
      constructorBody.body.unshift(
        t.expressionStatement(
          t.callExpression(classState.file.addHelper("classCallCheck"), [
            t.thisExpression(),
            t.cloneNode(classState.classRef),
          ]),
        ),
      );
    }

    const isStrict = path.isInStrictMode();
    let constructorOnly = body.length === 0;
    if (constructorOnly && !isStrict) {
      for (const param of classState.construct.params) {
        // It's illegal to put a use strict directive into the body of a function
        // with non-simple parameters for some reason. So, we have to use a strict
        // wrapper function.
        if (!t.isIdentifier(param)) {
          constructorOnly = false;
          break;
        }
      }
    }

    const directives = constructorOnly
      ? classState.construct.body.directives
      : [];
    if (!isStrict) {
      directives.push(t.directive(t.directiveLiteral("use strict")));
    }

    if (constructorOnly) {
      // named class with only a constructor
      const expr = t.toExpression(classState.construct);
      return classState.isLoose ? expr : createClassHelper([expr]);
    }

    if (!classState.pushedCreateClass) {
      body.push(
        t.returnStatement(
          classState.isLoose
            ? t.cloneNode(classState.classRef)
            : createClassHelper([t.cloneNode(classState.classRef)]),
        ),
      );
    }

    body.unshift(classState.construct);

    const container = t.arrowFunctionExpression(
      closureParams,
      t.blockStatement(body, directives),
    );
    return t.callExpression(container, closureArgs);
  }

  return classTransformer(path, file, builtinClasses, isLoose);
}
