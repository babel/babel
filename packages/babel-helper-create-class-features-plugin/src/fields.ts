import { template, types as t } from "@babel/core";
import type { File, NodePath, Visitor, Scope } from "@babel/core";
import { visitors } from "@babel/traverse";
import ReplaceSupers from "@babel/helper-replace-supers";
import memberExpressionToFunctions from "@babel/helper-member-expression-to-functions";
import type {
  Handler,
  HandlerState,
} from "@babel/helper-member-expression-to-functions";
import optimiseCall from "@babel/helper-optimise-call-expression";
import annotateAsPure from "@babel/helper-annotate-as-pure";
import { skipTransparentExprWrapperNodes } from "@babel/helper-skip-transparent-expression-wrappers";

import * as ts from "./typescript.ts";

interface PrivateNameMetadata {
  id: t.Identifier;
  static: boolean;
  method: boolean;
  getId?: t.Identifier;
  setId?: t.Identifier;
  methodId?: t.Identifier;
  initAdded?: boolean;
  getterDeclared?: boolean;
  setterDeclared?: boolean;
}

type PrivateNamesMapGeneric<V> = Map<string, V>;

type PrivateNamesMap = PrivateNamesMapGeneric<PrivateNameMetadata>;

if (!process.env.BABEL_8_BREAKING) {
  // eslint-disable-next-line no-var
  var newHelpers = (file: File) => {
    if (!process.env.IS_PUBLISH) {
      const { comments } = file.ast;
      // This is needed for the test in
      // babel-plugin-transform-class-properties/test/fixtures/regression/old-helpers
      if (comments?.some(c => c.value.includes("@force-old-private-helpers"))) {
        return false;
      }
    }
    return file.availableHelper("classPrivateFieldGet2");
  };
}

export function buildPrivateNamesMap(
  className: string,
  privateFieldsAsSymbolsOrProperties: boolean,
  props: PropPath[],
  file: File,
) {
  const privateNamesMap: PrivateNamesMap = new Map();
  let classBrandId: t.Identifier;
  for (const prop of props) {
    if (prop.isPrivate()) {
      const { name } = prop.node.key.id;
      let update: PrivateNameMetadata = privateNamesMap.get(name);
      if (!update) {
        const isMethod = !prop.isProperty();
        const isStatic = prop.node.static;
        let initAdded = false;
        let id: t.Identifier;
        if (
          !privateFieldsAsSymbolsOrProperties &&
          (process.env.BABEL_8_BREAKING || newHelpers(file)) &&
          isMethod &&
          !isStatic
        ) {
          initAdded = !!classBrandId;
          classBrandId ??= prop.scope.generateUidIdentifier(
            `${className}_brand`,
          );
          id = classBrandId;
        } else {
          id = prop.scope.generateUidIdentifier(name);
        }
        update = { id, static: isStatic, method: isMethod, initAdded };
        privateNamesMap.set(name, update);
      }
      if (prop.isClassPrivateMethod()) {
        if (prop.node.kind === "get") {
          const { body } = prop.node.body;
          let $: t.Node;
          if (
            // If we have
            //   get #foo() { return _some_fn(this); }
            // we can use _some_fn directly.
            body.length === 1 &&
            t.isReturnStatement(($ = body[0])) &&
            t.isCallExpression(($ = $.argument)) &&
            $.arguments.length === 1 &&
            t.isThisExpression($.arguments[0]) &&
            t.isIdentifier(($ = $.callee))
          ) {
            update.getId = t.cloneNode($);
            update.getterDeclared = true;
          } else {
            update.getId = prop.scope.generateUidIdentifier(`get_${name}`);
          }
        } else if (prop.node.kind === "set") {
          const { params } = prop.node;
          const { body } = prop.node.body;
          let $: t.Node;
          if (
            // If we have
            //   set #foo(val) { _some_fn(this, val); }
            // we can use _some_fn directly.
            body.length === 1 &&
            t.isExpressionStatement(($ = body[0])) &&
            t.isCallExpression(($ = $.expression)) &&
            $.arguments.length === 2 &&
            t.isThisExpression($.arguments[0]) &&
            t.isIdentifier($.arguments[1], {
              name: (params[0] as t.Identifier).name,
            }) &&
            t.isIdentifier(($ = $.callee))
          ) {
            update.setId = t.cloneNode($);
            update.setterDeclared = true;
          } else {
            update.setId = prop.scope.generateUidIdentifier(`set_${name}`);
          }
        } else if (prop.node.kind === "method") {
          update.methodId = prop.scope.generateUidIdentifier(name);
        }
      }
      privateNamesMap.set(name, update);
    }
  }
  return privateNamesMap;
}

export function buildPrivateNamesNodes(
  privateNamesMap: PrivateNamesMap,
  privateFieldsAsProperties: boolean,
  privateFieldsAsSymbols: boolean,
  state: File,
) {
  const initNodes: t.Statement[] = [];

  const injectedIds = new Set<string>();

  for (const [name, value] of privateNamesMap) {
    // - When the privateFieldsAsProperties assumption is enabled,
    //   both static and instance fields are transpiled using a
    //   secret non-enumerable property. Hence, we also need to generate that
    //   key (using the classPrivateFieldLooseKey helper).
    // - When the privateFieldsAsSymbols assumption is enabled,
    //   both static and instance fields are transpiled using a
    //   unique Symbol to define a non-enumerable property.
    // - In spec mode, only instance fields need a "private name" initializer
    //   because static fields are directly assigned to a variable in the
    //   buildPrivateStaticFieldInitSpec function.
    const { static: isStatic, method: isMethod, getId, setId } = value;
    const isGetterOrSetter = getId || setId;
    const id = t.cloneNode(value.id);

    let init: t.Expression;

    if (privateFieldsAsProperties) {
      init = t.callExpression(state.addHelper("classPrivateFieldLooseKey"), [
        t.stringLiteral(name),
      ]);
    } else if (privateFieldsAsSymbols) {
      init = t.callExpression(t.identifier("Symbol"), [t.stringLiteral(name)]);
    } else if (!isStatic) {
      if (injectedIds.has(id.name)) continue;
      injectedIds.add(id.name);

      init = t.newExpression(
        t.identifier(
          isMethod &&
            (process.env.BABEL_8_BREAKING ||
              !isGetterOrSetter ||
              newHelpers(state))
            ? "WeakSet"
            : "WeakMap",
        ),
        [],
      );
    }

    if (init) {
      if (!privateFieldsAsSymbols) {
        annotateAsPure(init);
      }
      initNodes.push(template.statement.ast`var ${id} = ${init}`);
    }
  }

  return initNodes;
}

export interface PrivateNameVisitorState<V> {
  privateNamesMap: PrivateNamesMapGeneric<V>;
  redeclared?: string[];
}

// Traverses the class scope, handling private name references. If an inner
// class redeclares the same private name, it will hand off traversal to the
// restricted visitor (which doesn't traverse the inner class's inner scope).
export function privateNameVisitorFactory<S, V>(
  visitor: Visitor<PrivateNameVisitorState<V & PrivateNameMetadata> & S>,
) {
  // Traverses the outer portion of a class, without touching the class's inner
  // scope, for private names.
  const nestedVisitor = visitors.environmentVisitor({ ...visitor });

  const privateNameVisitor: Visitor<
    PrivateNameVisitorState<V & PrivateNameMetadata> & S
  > = {
    ...visitor,

    Class(path) {
      const { privateNamesMap } = this;
      const body = path.get("body.body");

      const visiblePrivateNames = new Map(privateNamesMap);
      const redeclared = [];
      for (const prop of body) {
        if (!prop.isPrivate()) continue;
        const { name } = prop.node.key.id;
        visiblePrivateNames.delete(name);
        redeclared.push(name);
      }

      // If the class doesn't redeclare any private fields, we can continue with
      // our overall traversal.
      if (!redeclared.length) {
        return;
      }

      // This class redeclares some private field. We need to process the outer
      // environment with access to all the outer privates, then we can process
      // the inner environment with only the still-visible outer privates.
      path.get("body").traverse(nestedVisitor, {
        ...this,
        redeclared,
      });
      path.traverse(privateNameVisitor, {
        ...this,
        privateNamesMap: visiblePrivateNames,
      });

      // We'll eventually hit this class node again with the overall Class
      // Features visitor, which'll process the redeclared privates.
      path.skipKey("body");
    },
  };

  return privateNameVisitor;
}

interface PrivateNameState {
  privateNamesMap: PrivateNamesMap;
  classRef: t.Identifier;
  file: File;
  noDocumentAll: boolean;
  noUninitializedPrivateFieldAccess: boolean;
  innerBinding?: t.Identifier;
}

const privateNameVisitor = privateNameVisitorFactory<
  HandlerState<PrivateNameState> & PrivateNameState,
  PrivateNameMetadata
>({
  PrivateName(path, { noDocumentAll }) {
    const { privateNamesMap, redeclared } = this;
    const { node, parentPath } = path;

    if (
      !parentPath.isMemberExpression({ property: node }) &&
      !parentPath.isOptionalMemberExpression({ property: node })
    ) {
      return;
    }
    const { name } = node.id;
    if (!privateNamesMap.has(name)) return;
    if (redeclared?.includes(name)) return;

    this.handle(parentPath, noDocumentAll);
  },
});

// rename all bindings that shadows innerBinding
function unshadow(
  name: string,
  scope: Scope,
  innerBinding: t.Identifier | undefined,
) {
  // in some cases, scope.getBinding(name) === undefined
  // so we check hasBinding to avoid keeping looping
  // see: https://github.com/babel/babel/pull/13656#discussion_r686030715
  while (
    scope?.hasBinding(name) &&
    !scope.bindingIdentifierEquals(name, innerBinding)
  ) {
    scope.rename(name);
    scope = scope.parent;
  }
}

export function buildCheckInRHS(
  rhs: t.Expression,
  file: File,
  inRHSIsObject?: boolean,
) {
  if (inRHSIsObject || !file.availableHelper?.("checkInRHS")) return rhs;
  return t.callExpression(file.addHelper("checkInRHS"), [rhs]);
}

const privateInVisitor = privateNameVisitorFactory<
  {
    classRef: t.Identifier;
    file: File;
    innerBinding?: t.Identifier;
    privateFieldsAsProperties: boolean;
  },
  PrivateNameMetadata
>({
  BinaryExpression(path, { file }) {
    const { operator, left, right } = path.node;
    if (operator !== "in") return;
    if (!t.isPrivateName(left)) return;

    const { privateFieldsAsProperties, privateNamesMap, redeclared } = this;

    const { name } = left.id;

    if (!privateNamesMap.has(name)) return;
    if (redeclared?.includes(name)) return;

    // if there are any local variable shadowing classRef, unshadow it
    // see #12960
    unshadow(this.classRef.name, path.scope, this.innerBinding);

    if (privateFieldsAsProperties) {
      const { id } = privateNamesMap.get(name);
      path.replaceWith(template.expression.ast`
        Object.prototype.hasOwnProperty.call(${buildCheckInRHS(
          right,
          file,
        )}, ${t.cloneNode(id)})
      `);
      return;
    }

    const { id, static: isStatic } = privateNamesMap.get(name);

    if (isStatic) {
      path.replaceWith(
        template.expression.ast`${buildCheckInRHS(
          right,
          file,
        )} === ${t.cloneNode(this.classRef)}`,
      );
      return;
    }

    path.replaceWith(
      template.expression.ast`${t.cloneNode(id)}.has(${buildCheckInRHS(
        right,
        file,
      )})`,
    );
  },
});

interface Receiver {
  receiver(
    this: HandlerState<PrivateNameState> & PrivateNameState,
    member: NodePath<t.MemberExpression | t.OptionalMemberExpression>,
  ): t.Expression;
}

function readOnlyError(file: File, name: string) {
  return t.callExpression(file.addHelper("readOnlyError"), [
    t.stringLiteral(`#${name}`),
  ]);
}

function writeOnlyError(file: File, name: string) {
  if (
    !process.env.BABEL_8_BREAKING &&
    !file.availableHelper("writeOnlyError")
  ) {
    console.warn(
      `@babel/helpers is outdated, update it to silence this warning.`,
    );
    return t.buildUndefinedNode();
  }
  return t.callExpression(file.addHelper("writeOnlyError"), [
    t.stringLiteral(`#${name}`),
  ]);
}

function buildStaticPrivateFieldAccess<N extends t.Expression>(
  expr: N,
  noUninitializedPrivateFieldAccess: boolean,
) {
  if (noUninitializedPrivateFieldAccess) return expr;
  return t.memberExpression(expr, t.identifier("_"));
}

function autoInherits<Fn extends Function>(fn: Fn): Fn {
  return function (this: any, member: any) {
    return t.inherits(fn.apply(this, arguments as any), member.node);
  } as unknown as Fn;
}

const privateNameHandlerSpec: Handler<PrivateNameState & Receiver> & Receiver =
  {
    memoise(member, count) {
      const { scope } = member;
      const { object } = member.node as { object: t.Expression };

      const memo = scope.maybeGenerateMemoised(object);
      if (!memo) {
        return;
      }

      this.memoiser.set(object, memo, count);
    },

    receiver(member) {
      const { object } = member.node as { object: t.Expression };

      if (this.memoiser.has(object)) {
        return t.cloneNode(this.memoiser.get(object));
      }

      return t.cloneNode(object);
    },

    get: autoInherits(function (member) {
      const {
        classRef,
        privateNamesMap,
        file,
        innerBinding,
        noUninitializedPrivateFieldAccess,
      } = this;
      const privateName = member.node.property as t.PrivateName;
      const { name } = privateName.id;
      const {
        id,
        static: isStatic,
        method: isMethod,
        methodId,
        getId,
        setId,
      } = privateNamesMap.get(name);
      const isGetterOrSetter = getId || setId;

      const cloneId = (id: t.Identifier) =>
        t.inherits(t.cloneNode(id), privateName);

      if (isStatic) {
        // if there are any local variable shadowing classRef, unshadow it
        // see #12960
        unshadow(classRef.name, member.scope, innerBinding);

        if (!process.env.BABEL_8_BREAKING && !newHelpers(file)) {
          // NOTE: This package has a peerDependency on @babel/core@^7.0.0, but these
          // helpers have been introduced in @babel/helpers@7.1.0.
          const helperName =
            isMethod && !isGetterOrSetter
              ? "classStaticPrivateMethodGet"
              : "classStaticPrivateFieldSpecGet";

          return t.callExpression(file.addHelper(helperName), [
            this.receiver(member),
            t.cloneNode(classRef),
            cloneId(id),
          ]);
        }

        const receiver = this.receiver(member);
        const skipCheck =
          t.isIdentifier(receiver) && receiver.name === classRef.name;

        if (!isMethod) {
          if (skipCheck) {
            return buildStaticPrivateFieldAccess(
              cloneId(id),
              noUninitializedPrivateFieldAccess,
            );
          }

          return buildStaticPrivateFieldAccess(
            t.callExpression(file.addHelper("assertClassBrand"), [
              t.cloneNode(classRef),
              receiver,
              cloneId(id),
            ]),
            noUninitializedPrivateFieldAccess,
          );
        }

        if (getId) {
          if (skipCheck) {
            return t.callExpression(cloneId(getId), [receiver]);
          }
          return t.callExpression(file.addHelper("classPrivateGetter"), [
            t.cloneNode(classRef),
            receiver,
            cloneId(getId),
          ]);
        }

        if (setId) {
          const err = t.buildUndefinedNode(); // TODO: writeOnlyError(file, name)
          if (skipCheck) return err;
          return t.sequenceExpression([
            t.callExpression(file.addHelper("assertClassBrand"), [
              t.cloneNode(classRef),
              receiver,
            ]),
            err,
          ]);
        }

        if (skipCheck) return cloneId(id);
        return t.callExpression(file.addHelper("assertClassBrand"), [
          t.cloneNode(classRef),
          receiver,
          cloneId(id),
        ]);
      }

      if (isMethod) {
        if (isGetterOrSetter) {
          if (!getId) {
            return t.sequenceExpression([
              this.receiver(member),
              writeOnlyError(file, name),
            ]);
          }
          if (!process.env.BABEL_8_BREAKING && !newHelpers(file)) {
            return t.callExpression(file.addHelper("classPrivateFieldGet"), [
              this.receiver(member),
              cloneId(id),
            ]);
          }
          return t.callExpression(file.addHelper("classPrivateGetter"), [
            t.cloneNode(id),
            this.receiver(member),
            cloneId(getId),
          ]);
        }
        if (!process.env.BABEL_8_BREAKING && !newHelpers(file)) {
          return t.callExpression(file.addHelper("classPrivateMethodGet"), [
            this.receiver(member),
            t.cloneNode(id),
            cloneId(methodId),
          ]);
        }
        return t.callExpression(file.addHelper("assertClassBrand"), [
          t.cloneNode(id),
          this.receiver(member),
          cloneId(methodId),
        ]);
      }
      if (process.env.BABEL_8_BREAKING || newHelpers(file)) {
        return t.callExpression(file.addHelper("classPrivateFieldGet2"), [
          cloneId(id),
          this.receiver(member),
        ]);
      }

      return t.callExpression(file.addHelper("classPrivateFieldGet"), [
        this.receiver(member),
        cloneId(id),
      ]);
    }),

    boundGet(member) {
      this.memoise(member, 1);

      return t.callExpression(
        t.memberExpression(this.get(member), t.identifier("bind")),
        [this.receiver(member)],
      );
    },

    set: autoInherits(function (member, value) {
      const {
        classRef,
        privateNamesMap,
        file,
        noUninitializedPrivateFieldAccess,
      } = this;
      const privateName = member.node.property as t.PrivateName;
      const { name } = privateName.id;
      const {
        id,
        static: isStatic,
        method: isMethod,
        setId,
        getId,
      } = privateNamesMap.get(name);
      const isGetterOrSetter = getId || setId;

      const cloneId = (id: t.Identifier) =>
        t.inherits(t.cloneNode(id), privateName);

      if (isStatic) {
        if (!process.env.BABEL_8_BREAKING && !newHelpers(file)) {
          const helperName =
            isMethod && !isGetterOrSetter
              ? "classStaticPrivateMethodSet"
              : "classStaticPrivateFieldSpecSet";

          return t.callExpression(file.addHelper(helperName), [
            this.receiver(member),
            t.cloneNode(classRef),
            cloneId(id),
            value,
          ]);
        }

        const receiver = this.receiver(member);
        const skipCheck =
          t.isIdentifier(receiver) && receiver.name === classRef.name;

        if (isMethod && !setId) {
          const err = readOnlyError(file, name);
          if (skipCheck) return t.sequenceExpression([value, err]);
          return t.sequenceExpression([
            value,
            t.callExpression(file.addHelper("assertClassBrand"), [
              t.cloneNode(classRef),
              receiver,
            ]),
            readOnlyError(file, name),
          ]);
        }

        if (setId) {
          if (skipCheck) {
            return t.callExpression(t.cloneNode(setId), [receiver, value]);
          }
          return t.callExpression(file.addHelper("classPrivateSetter"), [
            t.cloneNode(classRef),
            cloneId(setId),
            receiver,
            value,
          ]);
        }
        return t.assignmentExpression(
          "=",
          buildStaticPrivateFieldAccess(
            cloneId(id),
            noUninitializedPrivateFieldAccess,
          ),
          skipCheck
            ? value
            : t.callExpression(file.addHelper("assertClassBrand"), [
                t.cloneNode(classRef),
                receiver,
                value,
              ]),
        );
      }
      if (isMethod) {
        if (setId) {
          if (!process.env.BABEL_8_BREAKING && !newHelpers(file)) {
            return t.callExpression(file.addHelper("classPrivateFieldSet"), [
              this.receiver(member),
              cloneId(id),
              value,
            ]);
          }
          return t.callExpression(file.addHelper("classPrivateSetter"), [
            t.cloneNode(id),
            cloneId(setId),
            this.receiver(member),
            value,
          ]);
        }
        return t.sequenceExpression([
          this.receiver(member),
          value,
          readOnlyError(file, name),
        ]);
      }

      if (process.env.BABEL_8_BREAKING || newHelpers(file)) {
        return t.callExpression(file.addHelper("classPrivateFieldSet2"), [
          cloneId(id),
          this.receiver(member),
          value,
        ]);
      }

      return t.callExpression(file.addHelper("classPrivateFieldSet"), [
        this.receiver(member),
        cloneId(id),
        value,
      ]);
    }),

    destructureSet(member) {
      const {
        classRef,
        privateNamesMap,
        file,
        noUninitializedPrivateFieldAccess,
      } = this;
      const privateName = member.node.property as t.PrivateName;
      const { name } = privateName.id;
      const {
        id,
        static: isStatic,
        method: isMethod,
        setId,
      } = privateNamesMap.get(name);

      const cloneId = (id: t.Identifier) =>
        t.inherits(t.cloneNode(id), privateName);

      if (!process.env.BABEL_8_BREAKING && !newHelpers(file)) {
        if (isStatic) {
          try {
            // classStaticPrivateFieldDestructureSet was introduced in 7.13.10
            // eslint-disable-next-line no-var
            var helper = file.addHelper(
              "classStaticPrivateFieldDestructureSet",
            );
          } catch {
            throw new Error(
              "Babel can not transpile `[C.#p] = [0]` with @babel/helpers < 7.13.10, \n" +
                "please update @babel/helpers to the latest version.",
            );
          }
          return t.memberExpression(
            t.callExpression(helper, [
              this.receiver(member),
              t.cloneNode(classRef),
              cloneId(id),
            ]),
            t.identifier("value"),
          );
        }

        return t.memberExpression(
          t.callExpression(file.addHelper("classPrivateFieldDestructureSet"), [
            this.receiver(member),
            cloneId(id),
          ]),
          t.identifier("value"),
        );
      }

      if (isMethod && !setId) {
        return t.memberExpression(
          t.sequenceExpression([
            // @ts-ignore(Babel 7 vs Babel 8) member.node.object is not t.Super
            member.node.object,
            readOnlyError(file, name),
          ]),
          t.identifier("_"),
        );
      }

      if (isStatic && !isMethod) {
        const getCall = this.get(member);
        if (
          !noUninitializedPrivateFieldAccess ||
          !t.isCallExpression(getCall)
        ) {
          return getCall;
        }
        const ref = getCall.arguments.pop();
        getCall.arguments.push(template.expression.ast`(_) => ${ref} = _`);
        return t.memberExpression(
          t.callExpression(file.addHelper("toSetter"), [getCall]),
          t.identifier("_"),
        );
      }

      const setCall = this.set(member, t.identifier("_"));
      if (
        !t.isCallExpression(setCall) ||
        !t.isIdentifier(setCall.arguments[setCall.arguments.length - 1], {
          name: "_",
        })
      ) {
        throw member.buildCodeFrameError(
          "Internal Babel error while compiling this code. This is a Babel bug. " +
            "Please report it at https://github.com/babel/babel/issues.",
        );
      }

      // someHelper(foo, bar, _) -> someHelper, [foo, bar]
      // aFn.call(foo, bar, _) -> aFn, [bar], foo
      let args: t.Expression[];
      if (
        t.isMemberExpression(setCall.callee, { computed: false }) &&
        t.isIdentifier(setCall.callee.property) &&
        setCall.callee.property.name === "call"
      ) {
        args = [
          // @ts-ignore(Babel 7 vs Babel 8) member.node.object is not t.Super
          setCall.callee.object,
          t.arrayExpression(
            // Remove '_'
            (setCall.arguments as t.Expression[]).slice(1, -1),
          ),
          setCall.arguments[0] as t.Expression,
        ];
      } else {
        args = [
          setCall.callee as t.Expression,
          t.arrayExpression(
            // Remove '_'
            (setCall.arguments as t.Expression[]).slice(0, -1),
          ),
        ];
      }

      return t.memberExpression(
        t.callExpression(file.addHelper("toSetter"), args),
        t.identifier("_"),
      );
    },

    call(member, args: (t.Expression | t.SpreadElement)[]) {
      // The first access (the get) should do the memo assignment.
      this.memoise(member, 1);

      return optimiseCall(this.get(member), this.receiver(member), args, false);
    },

    optionalCall(member, args: (t.Expression | t.SpreadElement)[]) {
      this.memoise(member, 1);

      return optimiseCall(this.get(member), this.receiver(member), args, true);
    },

    delete() {
      throw new Error(
        "Internal Babel error: deleting private elements is a parsing error.",
      );
    },
  };

const privateNameHandlerLoose: Handler<PrivateNameState> = {
  get(member) {
    const { privateNamesMap, file } = this;
    const { object } = member.node;
    const { name } = (member.node.property as t.PrivateName).id;

    return template.expression`BASE(REF, PROP)[PROP]`({
      BASE: file.addHelper("classPrivateFieldLooseBase"),
      REF: t.cloneNode(object),
      PROP: t.cloneNode(privateNamesMap.get(name).id),
    });
  },

  set() {
    // noop
    throw new Error("private name handler with loose = true don't need set()");
  },

  boundGet(member) {
    return t.callExpression(
      t.memberExpression(this.get(member), t.identifier("bind")),
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      [t.cloneNode(member.node.object as t.Expression)],
    );
  },

  simpleSet(member) {
    return this.get(member);
  },

  destructureSet(member) {
    return this.get(member);
  },

  call(member, args) {
    return t.callExpression(this.get(member), args);
  },

  optionalCall(member, args) {
    return t.optionalCallExpression(this.get(member), args, true);
  },

  delete() {
    throw new Error(
      "Internal Babel error: deleting private elements is a parsing error.",
    );
  },
};

export function transformPrivateNamesUsage(
  ref: t.Identifier,
  path: NodePath<t.Class>,
  privateNamesMap: PrivateNamesMap,
  {
    privateFieldsAsProperties,
    noUninitializedPrivateFieldAccess,
    noDocumentAll,
    innerBinding,
  }: {
    privateFieldsAsProperties: boolean;
    noUninitializedPrivateFieldAccess: boolean;
    noDocumentAll: boolean;
    innerBinding: t.Identifier;
  },
  state: File,
) {
  if (!privateNamesMap.size) return;

  const body = path.get("body");
  const handler = privateFieldsAsProperties
    ? privateNameHandlerLoose
    : privateNameHandlerSpec;

  memberExpressionToFunctions<PrivateNameState>(body, privateNameVisitor, {
    privateNamesMap,
    classRef: ref,
    file: state,
    ...handler,
    noDocumentAll,
    noUninitializedPrivateFieldAccess,
    innerBinding,
  });
  body.traverse(privateInVisitor, {
    privateNamesMap,
    classRef: ref,
    file: state,
    privateFieldsAsProperties,
    innerBinding,
  });
}

function buildPrivateFieldInitLoose(
  ref: t.Expression,
  prop: NodePath<t.ClassPrivateProperty>,
  privateNamesMap: PrivateNamesMap,
) {
  const { id } = privateNamesMap.get(prop.node.key.id.name);
  const value = prop.node.value || prop.scope.buildUndefinedNode();

  return inheritPropComments(
    template.statement.ast`
      Object.defineProperty(${ref}, ${t.cloneNode(id)}, {
        // configurable is false by default
        // enumerable is false by default
        writable: true,
        value: ${value}
      });
    ` as t.ExpressionStatement,
    prop,
  );
}

function buildPrivateInstanceFieldInitSpec(
  ref: t.Expression,
  prop: NodePath<t.ClassPrivateProperty>,
  privateNamesMap: PrivateNamesMap,
  state: File,
) {
  const { id } = privateNamesMap.get(prop.node.key.id.name);
  const value = prop.node.value || prop.scope.buildUndefinedNode();

  if (!process.env.BABEL_8_BREAKING) {
    if (!state.availableHelper("classPrivateFieldInitSpec")) {
      return inheritPropComments(
        template.statement.ast`${t.cloneNode(id)}.set(${ref}, {
          // configurable is always false for private elements
          // enumerable is always false for private elements
          writable: true,
          value: ${value},
        })` as t.ExpressionStatement,
        prop,
      );
    }
  }

  const helper = state.addHelper("classPrivateFieldInitSpec");
  return inheritLoc(
    inheritPropComments(
      t.expressionStatement(
        t.callExpression(helper, [
          t.thisExpression(),
          inheritLoc(t.cloneNode(id), prop.node.key),
          process.env.BABEL_8_BREAKING || newHelpers(state)
            ? value
            : template.expression.ast`{ writable: true, value: ${value} }`,
        ]),
      ),
      prop,
    ),
    prop.node,
  );
}

function buildPrivateStaticFieldInitSpec(
  prop: NodePath<t.ClassPrivateProperty>,
  privateNamesMap: PrivateNamesMap,
  noUninitializedPrivateFieldAccess: boolean,
) {
  const privateName = privateNamesMap.get(prop.node.key.id.name);

  const value = noUninitializedPrivateFieldAccess
    ? prop.node.value
    : template.expression.ast`{
        _: ${prop.node.value || t.buildUndefinedNode()}
      }`;

  return inheritPropComments(
    t.variableDeclaration("var", [
      t.variableDeclarator(t.cloneNode(privateName.id), value),
    ]),
    prop,
  );
}

if (!process.env.BABEL_8_BREAKING) {
  // eslint-disable-next-line no-var
  var buildPrivateStaticFieldInitSpecOld = function (
    prop: NodePath<t.ClassPrivateProperty>,
    privateNamesMap: PrivateNamesMap,
  ) {
    const privateName = privateNamesMap.get(prop.node.key.id.name);
    const { id, getId, setId, initAdded } = privateName;
    const isGetterOrSetter = getId || setId;

    if (!prop.isProperty() && (initAdded || !isGetterOrSetter)) return;

    if (isGetterOrSetter) {
      privateNamesMap.set(prop.node.key.id.name, {
        ...privateName,
        initAdded: true,
      });

      return inheritPropComments(
        template.statement.ast`
          var ${t.cloneNode(id)} = {
            // configurable is false by default
            // enumerable is false by default
            // writable is false by default
            get: ${getId ? getId.name : prop.scope.buildUndefinedNode()},
            set: ${setId ? setId.name : prop.scope.buildUndefinedNode()}
          }
        `,
        prop,
      );
    }

    const value = prop.node.value || prop.scope.buildUndefinedNode();
    return inheritPropComments(
      template.statement.ast`
        var ${t.cloneNode(id)} = {
          // configurable is false by default
          // enumerable is false by default
          writable: true,
          value: ${value}
        };
      `,
      prop,
    );
  };
}

function buildPrivateMethodInitLoose(
  ref: t.Expression,
  prop: NodePath<t.ClassPrivateMethod>,
  privateNamesMap: PrivateNamesMap,
) {
  const privateName = privateNamesMap.get(prop.node.key.id.name);
  const { methodId, id, getId, setId, initAdded } = privateName;
  if (initAdded) return;

  if (methodId) {
    return inheritPropComments(
      template.statement.ast`
        Object.defineProperty(${ref}, ${id}, {
          // configurable is false by default
          // enumerable is false by default
          // writable is false by default
          value: ${methodId.name}
        });
      ` as t.ExpressionStatement,
      prop,
    );
  }
  const isGetterOrSetter = getId || setId;
  if (isGetterOrSetter) {
    privateNamesMap.set(prop.node.key.id.name, {
      ...privateName,
      initAdded: true,
    });

    return inheritPropComments(
      template.statement.ast`
        Object.defineProperty(${ref}, ${id}, {
          // configurable is false by default
          // enumerable is false by default
          // writable is false by default
          get: ${getId ? getId.name : prop.scope.buildUndefinedNode()},
          set: ${setId ? setId.name : prop.scope.buildUndefinedNode()}
        });
      ` as t.ExpressionStatement,
      prop,
    );
  }
}

function buildPrivateInstanceMethodInitSpec(
  ref: t.Expression,
  prop: NodePath<t.ClassPrivateMethod>,
  privateNamesMap: PrivateNamesMap,
  state: File,
) {
  const privateName = privateNamesMap.get(prop.node.key.id.name);

  if (privateName.initAdded) return;

  if (!process.env.BABEL_8_BREAKING && !newHelpers(state)) {
    const isGetterOrSetter = privateName.getId || privateName.setId;
    if (isGetterOrSetter) {
      return buildPrivateAccessorInitialization(
        ref,
        prop,
        privateNamesMap,
        state,
      );
    }
  }

  return buildPrivateInstanceMethodInitialization(
    ref,
    prop,
    privateNamesMap,
    state,
  );
}

function buildPrivateAccessorInitialization(
  ref: t.Expression,
  prop: NodePath<t.ClassPrivateMethod>,
  privateNamesMap: PrivateNamesMap,
  state: File,
) {
  const privateName = privateNamesMap.get(prop.node.key.id.name);
  const { id, getId, setId } = privateName;

  privateNamesMap.set(prop.node.key.id.name, {
    ...privateName,
    initAdded: true,
  });

  if (!process.env.BABEL_8_BREAKING) {
    if (!state.availableHelper("classPrivateFieldInitSpec")) {
      return inheritPropComments(
        template.statement.ast`
          ${id}.set(${ref}, {
            get: ${getId ? getId.name : prop.scope.buildUndefinedNode()},
            set: ${setId ? setId.name : prop.scope.buildUndefinedNode()}
          });
        ` as t.ExpressionStatement,
        prop,
      );
    }
  }

  const helper = state.addHelper("classPrivateFieldInitSpec");
  return inheritLoc(
    inheritPropComments(
      template.statement.ast`${helper}(
      ${t.thisExpression()},
      ${t.cloneNode(id)},
      {
        get: ${getId ? getId.name : prop.scope.buildUndefinedNode()},
        set: ${setId ? setId.name : prop.scope.buildUndefinedNode()}
      },
    )` as t.ExpressionStatement,
      prop,
    ),
    prop.node,
  );
}

function buildPrivateInstanceMethodInitialization(
  ref: t.Expression,
  prop: NodePath<t.ClassPrivateMethod>,
  privateNamesMap: PrivateNamesMap,
  state: File,
) {
  const privateName = privateNamesMap.get(prop.node.key.id.name);
  const { id } = privateName;

  if (!process.env.BABEL_8_BREAKING) {
    if (!state.availableHelper("classPrivateMethodInitSpec")) {
      return inheritPropComments(
        template.statement.ast`${id}.add(${ref})` as t.ExpressionStatement,
        prop,
      );
    }
  }

  const helper = state.addHelper("classPrivateMethodInitSpec");
  return inheritPropComments(
    template.statement.ast`${helper}(
      ${t.thisExpression()},
      ${t.cloneNode(id)}
    )` as t.ExpressionStatement,
    prop,
  );
}

function buildPublicFieldInitLoose(
  ref: t.Expression,
  prop: NodePath<t.ClassProperty>,
) {
  const { key, computed } = prop.node;
  const value = prop.node.value || prop.scope.buildUndefinedNode();

  return inheritPropComments(
    t.expressionStatement(
      t.assignmentExpression(
        "=",
        t.memberExpression(ref, key, computed || t.isLiteral(key)),
        value,
      ),
    ),
    prop,
  );
}

function buildPublicFieldInitSpec(
  ref: t.Expression,
  prop: NodePath<t.ClassProperty>,
  state: File,
) {
  const { key, computed } = prop.node;
  const value = prop.node.value || prop.scope.buildUndefinedNode();

  return inheritPropComments(
    t.expressionStatement(
      t.callExpression(state.addHelper("defineProperty"), [
        ref,
        computed || t.isLiteral(key)
          ? key
          : t.stringLiteral((key as t.Identifier).name),
        value,
      ]),
    ),
    prop,
  );
}

function buildPrivateStaticMethodInitLoose(
  ref: t.Expression,
  prop: NodePath<t.ClassPrivateMethod>,
  state: File,
  privateNamesMap: PrivateNamesMap,
) {
  const privateName = privateNamesMap.get(prop.node.key.id.name);
  const { id, methodId, getId, setId, initAdded } = privateName;

  if (initAdded) return;

  const isGetterOrSetter = getId || setId;
  if (isGetterOrSetter) {
    privateNamesMap.set(prop.node.key.id.name, {
      ...privateName,
      initAdded: true,
    });

    return inheritPropComments(
      template.statement.ast`
        Object.defineProperty(${ref}, ${id}, {
          // configurable is false by default
          // enumerable is false by default
          // writable is false by default
          get: ${getId ? getId.name : prop.scope.buildUndefinedNode()},
          set: ${setId ? setId.name : prop.scope.buildUndefinedNode()}
        })
      `,
      prop,
    );
  }

  return inheritPropComments(
    template.statement.ast`
      Object.defineProperty(${ref}, ${id}, {
        // configurable is false by default
        // enumerable is false by default
        // writable is false by default
        value: ${methodId.name}
      });
    `,
    prop,
  );
}

function buildPrivateMethodDeclaration(
  file: File,
  prop: NodePath<t.ClassPrivateMethod>,
  privateNamesMap: PrivateNamesMap,
  privateFieldsAsSymbolsOrProperties = false,
) {
  const privateName = privateNamesMap.get(prop.node.key.id.name);
  const {
    id,
    methodId,
    getId,
    setId,
    getterDeclared,
    setterDeclared,
    static: isStatic,
  } = privateName;
  const { params, body, generator, async } = prop.node;
  const isGetter = getId && params.length === 0;
  const isSetter = setId && params.length > 0;

  if ((isGetter && getterDeclared) || (isSetter && setterDeclared)) {
    privateNamesMap.set(prop.node.key.id.name, {
      ...privateName,
      initAdded: true,
    });
    return null;
  }

  if (
    (process.env.BABEL_8_BREAKING || newHelpers(file)) &&
    (isGetter || isSetter) &&
    !privateFieldsAsSymbolsOrProperties
  ) {
    const scope = prop.get("body").scope;
    const thisArg = scope.generateUidIdentifier("this");
    const state: ReplaceThisState = {
      thisRef: thisArg,
      argumentsPath: [],
    };
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    prop.traverse(thisContextVisitor, state);
    if (state.argumentsPath.length) {
      const argumentsId = scope.generateUidIdentifier("arguments");
      scope.push({
        id: argumentsId,
        init: template.expression.ast`[].slice.call(arguments, 1)`,
      });
      for (const path of state.argumentsPath) {
        path.replaceWith(t.cloneNode(argumentsId));
      }
    }

    params.unshift(t.cloneNode(thisArg));
  }

  let declId = methodId;

  if (isGetter) {
    privateNamesMap.set(prop.node.key.id.name, {
      ...privateName,
      getterDeclared: true,
      initAdded: true,
    });
    declId = getId;
  } else if (isSetter) {
    privateNamesMap.set(prop.node.key.id.name, {
      ...privateName,
      setterDeclared: true,
      initAdded: true,
    });
    declId = setId;
  } else if (isStatic && !privateFieldsAsSymbolsOrProperties) {
    declId = id;
  }

  return inheritPropComments(
    t.functionDeclaration(
      t.cloneNode(declId),
      // @ts-expect-error params for ClassMethod has TSParameterProperty
      params,
      body,
      generator,
      async,
    ),
    prop,
  );
}

type ReplaceThisState = {
  thisRef: t.Identifier;
  needsClassRef?: boolean;
  innerBinding?: t.Identifier | null;
  argumentsPath?: NodePath<t.Identifier>[];
};

type ReplaceInnerBindingReferenceState = ReplaceThisState;

const thisContextVisitor = visitors.environmentVisitor<ReplaceThisState>({
  Identifier(path, state) {
    if (state.argumentsPath && path.node.name === "arguments") {
      state.argumentsPath.push(path);
    }
  },
  UnaryExpression(path) {
    // Replace `delete this` with `true`
    const { node } = path;
    if (node.operator === "delete") {
      const argument = skipTransparentExprWrapperNodes(node.argument);
      if (t.isThisExpression(argument)) {
        path.replaceWith(t.booleanLiteral(true));
      }
    }
  },
  ThisExpression(path, state) {
    state.needsClassRef = true;
    path.replaceWith(t.cloneNode(state.thisRef));
  },
  MetaProperty(path) {
    const { node, scope } = path;
    // if there are `new.target` in static field
    // we should replace it with `undefined`
    if (node.meta.name === "new" && node.property.name === "target") {
      path.replaceWith(scope.buildUndefinedNode());
    }
  },
});

const innerReferencesVisitor: Visitor<ReplaceInnerBindingReferenceState> = {
  ReferencedIdentifier(path, state) {
    if (
      path.scope.bindingIdentifierEquals(path.node.name, state.innerBinding)
    ) {
      state.needsClassRef = true;
      path.node.name = state.thisRef.name;
    }
  },
};

function replaceThisContext(
  path: PropPath,
  ref: t.Identifier,
  innerBindingRef: t.Identifier | null,
) {
  const state: ReplaceThisState = {
    thisRef: ref,
    needsClassRef: false,
    innerBinding: innerBindingRef,
  };
  if (!path.isMethod()) {
    // replace `this` in property initializers and static blocks
    path.traverse(thisContextVisitor, state);
  }

  // todo: use innerBinding.referencePaths to avoid full traversal
  if (
    innerBindingRef != null &&
    state.thisRef?.name &&
    state.thisRef.name !== innerBindingRef.name
  ) {
    path.traverse(innerReferencesVisitor, state);
  }

  return state.needsClassRef;
}

export type PropNode =
  | t.ClassProperty
  | t.ClassPrivateMethod
  | t.ClassPrivateProperty
  | t.StaticBlock;
export type PropPath = NodePath<PropNode>;

function isNameOrLength({ key, computed }: t.ClassProperty) {
  if (key.type === "Identifier") {
    return !computed && (key.name === "name" || key.name === "length");
  }
  if (key.type === "StringLiteral") {
    return key.value === "name" || key.value === "length";
  }
  return false;
}

/**
 * Inherit comments from class members. This is a reduced version of
 * t.inheritsComments: the trailing comments are not inherited because
 * for most class members except the last one, their trailing comments are
 * the next sibling's leading comments.
 *
 * @template T transformed class member type
 * @param {T} node transformed class member
 * @param {PropPath} prop class member
 * @returns transformed class member type with comments inherited
 */
function inheritPropComments<T extends t.Node>(node: T, prop: PropPath) {
  t.inheritLeadingComments(node, prop.node);
  t.inheritInnerComments(node, prop.node);
  return node;
}

function inheritLoc<T extends t.Node>(node: T, original: t.Node) {
  node.start = original.start;
  node.end = original.end;
  node.loc = original.loc;
  return node;
}

/**
 * ClassRefFlag records the requirement of the class binding reference.
 *
 * @enum {number}
 */
const enum ClassRefFlag {
  None,
  /**
   * When this flag is enabled, the binding reference can be the class id,
   * if exists, or the uid identifier generated for class expression. The
   * reference is safe to be consumed by [[Define]].
   */
  ForDefine = 1 << 0,
  /**
   * When this flag is enabled, the reference must be a uid, because the outer
   * class binding can be mutated by user codes.
   * E.g.
   * class C { static p = C }; const oldC = C; C = null; oldC.p;
   * we must memoize class `C` before defining the property `p`.
   */
  ForInnerBinding = 1 << 1,
}

export function buildFieldsInitNodes(
  ref: t.Identifier | null,
  superRef: t.Expression | undefined,
  props: PropPath[],
  privateNamesMap: PrivateNamesMap,
  file: File,
  setPublicClassFields: boolean,
  privateFieldsAsSymbolsOrProperties: boolean,
  noUninitializedPrivateFieldAccess: boolean,
  constantSuper: boolean,
  innerBindingRef: t.Identifier | null,
) {
  let classRefFlags = ClassRefFlag.None;
  let injectSuperRef: t.Identifier;
  const staticNodes: t.Statement[] = [];
  const instanceNodes: t.ExpressionStatement[] = [];
  let lastInstanceNodeReturnsThis = false;
  // These nodes are pure and can be moved to the closest statement position
  const pureStaticNodes: t.FunctionDeclaration[] = [];
  let classBindingNode: t.ExpressionStatement | null = null;

  const getSuperRef = t.isIdentifier(superRef)
    ? () => superRef
    : () => {
        injectSuperRef ??=
          props[0].scope.generateUidIdentifierBasedOnNode(superRef);
        return injectSuperRef;
      };

  const classRefForInnerBinding =
    ref ??
    props[0].scope.generateUidIdentifier(innerBindingRef?.name || "Class");
  ref ??= t.cloneNode(innerBindingRef);

  for (const prop of props) {
    if (prop.isClassProperty()) {
      ts.assertFieldTransformed(prop);
    }

    // @ts-expect-error: TS doesn't infer that prop.node is not a StaticBlock
    const isStatic = !t.isStaticBlock?.(prop.node) && prop.node.static;
    const isInstance = !isStatic;
    const isPrivate = prop.isPrivate();
    const isPublic = !isPrivate;
    const isField = prop.isProperty();
    const isMethod = !isField;
    const isStaticBlock = prop.isStaticBlock?.();

    if (isStatic) classRefFlags |= ClassRefFlag.ForDefine;

    if (isStatic || (isMethod && isPrivate) || isStaticBlock) {
      new ReplaceSupers({
        methodPath: prop,
        constantSuper,
        file: file,
        refToPreserve: innerBindingRef,
        getSuperRef,
        getObjectRef() {
          classRefFlags |= ClassRefFlag.ForInnerBinding;
          if (isStatic || isStaticBlock) {
            return classRefForInnerBinding;
          } else {
            return t.memberExpression(
              classRefForInnerBinding,
              t.identifier("prototype"),
            );
          }
        },
      }).replace();

      const replaced = replaceThisContext(
        prop,
        classRefForInnerBinding,
        innerBindingRef,
      );
      if (replaced) {
        classRefFlags |= ClassRefFlag.ForInnerBinding;
      }
    }

    lastInstanceNodeReturnsThis = false;

    // TODO(ts): there are so many `ts-expect-error` inside cases since
    // ts can not infer type from pre-computed values (or a case test)
    // even change `isStaticBlock` to `t.isStaticBlock(prop)` will not make prop
    // a `NodePath<t.StaticBlock>`
    // this maybe a bug for ts
    switch (true) {
      case isStaticBlock: {
        const blockBody = prop.node.body;
        // We special-case the single expression case to avoid the iife, since
        // it's common.
        if (blockBody.length === 1 && t.isExpressionStatement(blockBody[0])) {
          staticNodes.push(inheritPropComments(blockBody[0], prop));
        } else {
          staticNodes.push(
            t.inheritsComments(
              template.statement.ast`(() => { ${blockBody} })()`,
              prop.node,
            ),
          );
        }
        break;
      }
      case isStatic &&
        isPrivate &&
        isField &&
        privateFieldsAsSymbolsOrProperties:
        staticNodes.push(
          buildPrivateFieldInitLoose(t.cloneNode(ref), prop, privateNamesMap),
        );
        break;
      case isStatic &&
        isPrivate &&
        isField &&
        !privateFieldsAsSymbolsOrProperties:
        if (!process.env.BABEL_8_BREAKING && !newHelpers(file)) {
          staticNodes.push(
            buildPrivateStaticFieldInitSpecOld(prop, privateNamesMap),
          );
        } else {
          staticNodes.push(
            buildPrivateStaticFieldInitSpec(
              prop,
              privateNamesMap,
              noUninitializedPrivateFieldAccess,
            ),
          );
        }
        break;
      case isStatic && isPublic && isField && setPublicClassFields:
        // Functions always have non-writable .name and .length properties,
        // so we must always use [[Define]] for them.
        // It might still be possible to a computed static fields whose resulting
        // key is "name" or "length", but the assumption is telling us that it's
        // not going to happen.
        if (!isNameOrLength(prop.node)) {
          staticNodes.push(buildPublicFieldInitLoose(t.cloneNode(ref), prop));
          break;
        }
      // falls through
      case isStatic && isPublic && isField && !setPublicClassFields:
        staticNodes.push(
          buildPublicFieldInitSpec(t.cloneNode(ref), prop, file),
        );
        break;
      case isInstance &&
        isPrivate &&
        isField &&
        privateFieldsAsSymbolsOrProperties:
        instanceNodes.push(
          buildPrivateFieldInitLoose(t.thisExpression(), prop, privateNamesMap),
        );
        break;
      case isInstance &&
        isPrivate &&
        isField &&
        !privateFieldsAsSymbolsOrProperties:
        instanceNodes.push(
          buildPrivateInstanceFieldInitSpec(
            t.thisExpression(),
            prop,
            privateNamesMap,
            file,
          ),
        );
        break;
      case isInstance &&
        isPrivate &&
        isMethod &&
        privateFieldsAsSymbolsOrProperties:
        instanceNodes.unshift(
          buildPrivateMethodInitLoose(
            t.thisExpression(),
            prop,
            privateNamesMap,
          ),
        );
        pureStaticNodes.push(
          buildPrivateMethodDeclaration(
            file,
            prop,
            privateNamesMap,
            privateFieldsAsSymbolsOrProperties,
          ),
        );
        break;
      case isInstance &&
        isPrivate &&
        isMethod &&
        !privateFieldsAsSymbolsOrProperties:
        instanceNodes.unshift(
          buildPrivateInstanceMethodInitSpec(
            t.thisExpression(),
            prop,
            privateNamesMap,
            file,
          ),
        );
        pureStaticNodes.push(
          buildPrivateMethodDeclaration(
            file,
            prop,
            privateNamesMap,
            privateFieldsAsSymbolsOrProperties,
          ),
        );
        break;
      case isStatic &&
        isPrivate &&
        isMethod &&
        !privateFieldsAsSymbolsOrProperties:
        if (!process.env.BABEL_8_BREAKING && !newHelpers(file)) {
          staticNodes.unshift(
            // @ts-expect-error checked in switch
            buildPrivateStaticFieldInitSpecOld(prop, privateNamesMap),
          );
        }
        pureStaticNodes.push(
          buildPrivateMethodDeclaration(
            file,
            prop,
            privateNamesMap,
            privateFieldsAsSymbolsOrProperties,
          ),
        );
        break;
      case isStatic &&
        isPrivate &&
        isMethod &&
        privateFieldsAsSymbolsOrProperties:
        staticNodes.unshift(
          buildPrivateStaticMethodInitLoose(
            t.cloneNode(ref),
            prop,
            file,
            privateNamesMap,
          ),
        );
        pureStaticNodes.push(
          buildPrivateMethodDeclaration(
            file,
            prop,
            privateNamesMap,
            privateFieldsAsSymbolsOrProperties,
          ),
        );
        break;
      case isInstance && isPublic && isField && setPublicClassFields:
        instanceNodes.push(buildPublicFieldInitLoose(t.thisExpression(), prop));
        break;
      case isInstance && isPublic && isField && !setPublicClassFields:
        lastInstanceNodeReturnsThis = true;
        instanceNodes.push(
          buildPublicFieldInitSpec(t.thisExpression(), prop, file),
        );
        break;
      default:
        throw new Error("Unreachable.");
    }
  }

  if (classRefFlags & ClassRefFlag.ForInnerBinding && innerBindingRef != null) {
    classBindingNode = t.expressionStatement(
      t.assignmentExpression(
        "=",
        t.cloneNode(classRefForInnerBinding),
        t.cloneNode(innerBindingRef),
      ),
    );
  }

  return {
    staticNodes: staticNodes.filter(Boolean),
    instanceNodes: instanceNodes.filter(Boolean),
    lastInstanceNodeReturnsThis,
    pureStaticNodes: pureStaticNodes.filter(Boolean),
    classBindingNode,
    wrapClass(path: NodePath<t.Class>) {
      for (const prop of props) {
        // Delete leading comments so that they don't get attached as
        // trailing comments of the previous sibling.
        // When transforming props, we explicitly attach their leading
        // comments to the transformed node with `inheritPropComments`
        // above.
        prop.node.leadingComments = null;
        prop.remove();
      }

      if (injectSuperRef) {
        path.scope.push({ id: t.cloneNode(injectSuperRef) });
        path.set(
          "superClass",
          t.assignmentExpression("=", injectSuperRef, path.node.superClass),
        );
      }

      if (classRefFlags !== ClassRefFlag.None) {
        if (path.isClassExpression()) {
          path.scope.push({ id: ref });
          path.replaceWith(
            t.assignmentExpression("=", t.cloneNode(ref), path.node),
          );
        } else {
          if (innerBindingRef == null) {
            // export anonymous class declaration
            path.node.id = ref;
          }
          if (classBindingNode != null) {
            path.scope.push({ id: classRefForInnerBinding });
          }
        }
      }

      return path;
    },
  };
}
