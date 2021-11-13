import { declare } from "@babel/helper-plugin-utils";
import * as t from "@babel/types";
export default declare(api => {
  api.assertVersion(7);

  return {
    name: "proposal-class-brand-check",
    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push("brand-check");
    },
    visitor: {
      CallExpression(path) {
        const node = path.node;
        if (node.callee.name === "hasInstance") {
          const args = node.arguments;
          if (!args || args.length !== 1) {
            throw new Error("Expected 1 arguments, but got " + args.length);
          }
          const setID = path.scope.generateUidIdentifier("set");

          path.findParent(path => {
            if (path.type === "ClassDeclaration") {
              const id = t.identifier(setID.name);
              const weakSet = t.identifier("WeakSet");
              const expression = t.newExpression(weakSet, []);
              const declarator = t.variableDeclarator(id, expression);
              path.insertBefore(t.variableDeclaration("var", [declarator]));

              const body = path.node.body;
              if (body.type === "ClassBody") {
                const bodyList = body.body;
                const consFlag = bodyList.some(
                  node => node.kind === "constructor",
                );
                if (!consFlag) {
                  const key = "constructor";
                  const body = t.blockStatement([], []);
                  const constructorMethod = t.classMethod(
                    key,
                    t.identifier(key),
                    [],
                    body,
                    false,
                    false,
                    false,
                    false,
                  );
                  bodyList.unshift(constructorMethod);
                }

                bodyList.forEach(node => {
                  if (node.kind === "constructor") {
                    const consBody = node.body;
                    const expressionList = consBody.body;

                    const memberExpression = t.memberExpression(
                      t.identifier(setID.name),
                      t.identifier("add"),
                      false,
                    );

                    const callExpression = t.callExpression(memberExpression, [
                      t.thisExpression(),
                    ]);
                    const addExpression = t.expressionStatement(callExpression);

                    const returnFlag = expressionList.findIndex(
                      expression => expression.type === "ReturnStatement",
                    );
                    if (returnFlag === -1) {
                      expressionList.push(addExpression);
                    } else if (returnFlag === 0) {
                      expressionList.unshift(addExpression);
                    } else {
                      expressionList.splice(returnFlag - 1, 0, addExpression);
                    }
                  }
                });
              }
            }
          });

          path.node.callee = t.memberExpression(
            t.identifier(setID.name),
            t.identifier("has"),
            false,
          );
        }
      },
    },
  };
});
