import type {
  PluginObject,
  NodePath,
  types as t,
  PluginAPI,
} from "@babel/core";
// eslint-disable-next-line import/no-extraneous-dependencies
import type { Scope } from "@babel/traverse";

type Methods = Record<
  string,
  {
    id: t.Identifier;
    func: t.ClassMethod;
  }
>;

type ClassInfo = {
  name: string;
  path: NodePath<t.Class>;
  methods: Methods;
  dummyConstructor?: t.ClassMethod;
};

export default function ({
  types: t,
  traverse,
  template,
}: PluginAPI): PluginObject {
  function processClass(
    scope: Scope,
    className: string,
    classPath: NodePath<t.Class> | null = scope.getBinding(className)
      .path as NodePath<t.Class>,
    methodNames = new Set<string>(),
  ): ClassInfo[] {
    classPath.assertClass();

    const methods: Methods = {
      __proto__: null,
    };
    classPath.node.body.body.forEach(element => {
      switch (element.type) {
        case "ClassMethod":
          if (element.kind === "method" || element.kind === "constructor") {
            if (!t.isIdentifier(element.key)) {
              throw new Error("Method name must be an identifier");
            }
            const methodName = element.key.name;
            if (methodName !== "constructor" && methodNames.has(methodName)) {
              throw new Error(`Duplicate method name: ${methodName}`);
            }
            methodNames.add(methodName);
            const id = scope.generateUidIdentifier(
              `${className}_${methodName}`,
            );
            methods[element.key.name] = {
              id,
              func: element,
            };
          } else {
            throw new Error(`Unsupported method kind: ${element.kind}`);
          }

          break;

        default:
          throw new Error(`Unsupported element type: ${element.type}`);
      }
    });

    const superClass = classPath.get("superClass");
    return [
      {
        name: className,
        path: classPath,
        methods,
      },
      ...(t.isIdentifier(superClass.node) &&
      scope.hasBinding(superClass.node.name)
        ? processClass(
            superClass.scope,
            superClass.node.name,
            undefined,
            methodNames,
          )
        : []),
    ];
  }

  return {
    visitor: {
      Program: {
        exit(programPath) {
          const className = "Parser";
          const exportedMethods = ["parse", "parseExpression"];

          const programScope = programPath.scope;

          const inheritedClasses: ClassInfo[] = [];
          [
            "estree",
            "jsx",
            "flow",
            "typescript",
            "v8intrinsic",
            "placeholders",
          ].forEach(name => {
            const binding = programScope.getBinding(name);
            if (!binding) return;
            inheritedClasses.push(
              processClass(
                programScope,
                name,
                binding.path.get("init.body"),
              )[0],
            );
          });

          const classes = processClass(programScope, className);

          const countMap = new Map<string, number>();
          for (const { methods } of [...classes, ...inheritedClasses]) {
            for (const methodName of Object.keys(methods)) {
              const count = countMap.get(methodName) || 0;
              countMap.set(methodName, count + 1);
            }
          }

          const baseMethods = classes.reduce(
            (acc, { methods }) => ({
              __proto__: null,
              ...acc,
              ...methods,
            }),
            {} as Methods,
          );

          let newFuncs: t.FunctionDeclaration[] = [];
          const newThis = programScope.generateUidIdentifier(
            className + "_this",
          );
          const dynamicFuncs: Record<string, t.Identifier> = {
            __proto__: null,
          };

          countMap.forEach((count, name) => {
            if (count > 1) {
              dynamicFuncs[name] = programScope.generateUidIdentifier(
                `${className}_${name}_dynamic`,
              );
            }
          });

          programScope.push({
            id: newThis,
            kind: "var",
          });

          function findLastMethodId(
            methodName: string,
            startClassIndex: number = 0,
          ) {
            let method;
            for (
              let i2 = startClassIndex;
              i2 < classes.length && !method;
              i2++
            ) {
              method = classes[i2].methods[methodName];
            }
            if (!method) {
              throw new Error(`Cannot find super method ${methodName}`);
            }
            return t.cloneNode(method.id);
          }

          for (let i = classes.length - 1; i >= 0; i--) {
            const { path, methods } = classes[i];

            for (const methodName of Object.keys(methods)) {
              const method = methods[methodName];
              const func = t.cloneNode(
                t.functionDeclaration(
                  method.id,
                  method.func.params as t.FunctionDeclaration["params"],
                  method.func.body,
                ),
              );

              traverse(func, {
                noScope: true,
                ...traverse.visitors.environmentVisitor({
                  MemberExpression(path) {
                    const { object, property } = path.node;
                    if (
                      t.isThisExpression(object) &&
                      t.isIdentifier(property)
                    ) {
                      const propName = property.name;
                      if (!countMap.get(propName)) {
                        return;
                      } else if (
                        countMap.get(propName) === 1 ||
                        propName === "constructor"
                      ) {
                        const method = baseMethods[propName];
                        path.replaceWith(t.cloneNode(method.id));
                        return;
                      }
                      path.replaceWith(t.cloneNode(dynamicFuncs[propName]));
                    }
                  },
                  ThisExpression(path) {
                    path.replaceWith(t.cloneNode(newThis));
                  },
                  Super(path) {
                    path.replaceWith(findLastMethodId(methodName, i + 1));
                  },
                }),
              });

              newFuncs.push(func);
            }

            if (i === 0) {
              path.insertAfter(newFuncs);
              programScope.removeBinding(className);
              path.replaceWith(
                t.classDeclaration(
                  t.identifier(className),
                  null,
                  t.classBody([
                    (classes[i].dummyConstructor = t.classMethod(
                      "constructor",
                      t.identifier("constructor"),
                      [],
                      template.statement.ast`
                        {
                          ${t.cloneNode(newThis)} = {};
                          ${findLastMethodId("constructor")}.apply(null, arguments);
                        }
                      ` as t.BlockStatement,
                    )),
                    ...exportedMethods.map(name =>
                      t.classMethod(
                        "method",
                        t.identifier(name),
                        [],
                        t.blockStatement([
                          template.statement
                            .ast`return ${t.cloneNode(dynamicFuncs[name] || baseMethods[name].id)}.apply(null, arguments)`,
                        ]),
                      ),
                    ),
                  ]),
                ),
              );
            } else {
              path.remove();
            }
          }

          newFuncs = [];

          for (let i = inheritedClasses.length - 1; i >= 0; i--) {
            const { path, methods, name } = inheritedClasses[i];

            for (const methodName of Object.keys(methods)) {
              const method = methods[methodName];
              const func = t.cloneNode(
                t.functionDeclaration(
                  method.id,
                  method.func.params as t.FunctionDeclaration["params"],
                  method.func.body,
                ),
              );

              if (
                countMap.get(methodName) > 1 &&
                methodName !== "constructor"
              ) {
                func.params.unshift(t.identifier("__super"));
              }

              traverse(func, {
                noScope: true,
                ...traverse.visitors.environmentVisitor({
                  MemberExpression(path) {
                    const { object, property } = path.node;
                    if (
                      t.isThisExpression(object) &&
                      t.isIdentifier(property)
                    ) {
                      const propName = property.name;
                      if (!countMap.get(propName)) {
                        return;
                      } else if (countMap.get(propName) === 1) {
                        const method =
                          baseMethods[propName] || methods[propName];
                        path.replaceWith(t.cloneNode(method.id));
                        return;
                      }
                      path.replaceWith(t.cloneNode(dynamicFuncs[propName]));
                    } else if (t.isSuper(object) && t.isIdentifier(property)) {
                      const propName = property.name;
                      if (propName !== methodName) {
                        console.warn(
                          `Unexpected super method name: ${name}#${propName}`,
                        );
                        path.replaceWith(t.cloneNode(baseMethods[propName].id));
                        return;
                      }
                      path.replaceWith(t.identifier("__super"));
                    }
                  },
                  ThisExpression(path) {
                    path.replaceWith(t.cloneNode(newThis));
                  },
                  Super(path) {
                    path.parentPath.remove();
                  },
                }),
              });

              newFuncs.push(func);
            }

            const assignments = [];
            for (const name of Object.keys(methods)) {
              if (countMap.get(name) > 1) {
                assignments.push(
                  t.expressionStatement(
                    t.assignmentExpression(
                      "=",
                      t.cloneNode(dynamicFuncs[name]),
                      template.expression
                        .ast`${t.cloneNode(methods[name].id)}.bind(null, ${t.cloneNode(dynamicFuncs[name])})`,
                    ),
                  ),
                );
              }
            }

            programScope.removeBinding(name);
            path.replaceWith(
              t.classExpression(
                t.identifier(name),
                t.identifier("superClass"),
                t.classBody([
                  (inheritedClasses[i].dummyConstructor = t.classMethod(
                    "constructor",
                    t.identifier("constructor"),
                    [],
                    t.blockStatement([
                      t.expressionStatement(
                        t.callExpression(t.super(), [
                          t.spreadElement(t.identifier("arguments")),
                        ]),
                      ),
                      ...(methods["constructor"]
                        ? [
                            template.statement.ast`
                              ${methods["constructor"].id}(...arguments);
                            `,
                          ]
                        : []),
                      ...assignments,
                    ]),
                  )),
                ]),
              ),
            );
          }

          programPath.unshiftContainer("body", newFuncs);

          const assignments = [];
          for (const name of Object.keys(baseMethods)) {
            if (countMap.get(name) > 1) {
              assignments.push(
                t.expressionStatement(
                  t.assignmentExpression(
                    "=",
                    t.cloneNode(dynamicFuncs[name]),
                    t.cloneNode(baseMethods[name].id),
                  ),
                ),
              );
            }
          }

          classes[0].dummyConstructor.body.body.unshift(...assignments);

          for (const name of Object.keys(dynamicFuncs)) {
            programScope.push({
              id: dynamicFuncs[name],
              kind: "var",
            });
          }
        },
      },
    },
  };
}
