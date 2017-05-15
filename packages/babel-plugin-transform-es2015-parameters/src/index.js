import intersection from "lodash/intersection";
import unique from "lodash/uniq";
import getFunctionArity from "babel-helper-get-function-arity";

export default function (babel) {
  const { types: t } = babel;

  function extractDeclaredVariables(declaration, fnPath) {
    const fn = t.functionExpression(null, [], t.blockStatement([declaration]));
    fnPath.get("body").unshiftContainer("body", t.expressionStatement(fn));
    const bindings = Object.keys(fnPath.get("body.body.0.expression").scope.bindings);
    fnPath.get("body").get("body.0").remove();
    return bindings;
  }

  function checkIfParamsContainAFunction(path) {
    let result = false;
    for (let i = 0; i < path.get("params").length; i++) {
      path.get("params")[i].traverse({
        Function: function (path) {
          result = true;
          path.stop();
        },
      });
      if (result) break;
    }
    return result;
  }

  return {
    name: "params-to-function-body", // not required
    visitor: {
      "Function": function(path) {
        path.ensureBlock(); // so that we work correctly with arrow functions
        const arity = getFunctionArity(path.node);

        const parameterBindings = extractDeclaredVariables(
          t.variableDeclaration("var", [t.variableDeclarator(t.arrayPattern(path.node.params))]),
          path
        );
        const paramsContainAFunction = checkIfParamsContainAFunction(path);

        // logic to find replacement identifiers for complex parameters
        const lhs = [];
        const rhs = [];
        const arityLessThanParams = arity < path.get("params").length;
        let simpleCase = true; // the case that this plugin isn't needed
        for (let i = 0; i < path.get("params").length; i++) {
          const paramPath = path.get("params")[i];

          if (i >= arity) {
            lhs.push(paramPath.node);
            paramPath.remove();
            simpleCase = false;
            i--; // since we removed this one, the next one will be shifted to this index
          } else {
            if (paramPath.node.type != "Identifier") {
              simpleCase = false;
              const sym = path.scope.generateUidIdentifier("ref");
              lhs.push(paramPath.node);
              paramPath.replaceWith(sym);
              rhs.push(sym);
            }
          }
        }

        if (arityLessThanParams) {
          const rest = path.scope.generateUidIdentifier("ref");
          rhs.push(t.spreadElement(rest));
          path.pushContainer("params", t.restElement(rest));
        }

        if (simpleCase) return; // early exit

        // arguments are supposed to throw on a TDZ reference,
        // hence a let declaration is the best way to mimic that
        const parameterDeclaration = t.variableDeclaration("let",
          [t.variableDeclarator(t.arrayPattern(lhs), t.arrayExpression(rhs))]
        );

        let fnBodyVarBindings = [];
        const fnBodyVarDeclarationPaths = []; // lookup array just to avoid traversing again later
        const functionParent = path;

        path.traverse({
          VariableDeclaration: function (path) {
            if (path.node.kind == "var" && path.getFunctionParent() == functionParent) {
              fnBodyVarBindings = fnBodyVarBindings.concat(
                extractDeclaredVariables(t.clone(path.node), path.getFunctionParent())
              );
              fnBodyVarDeclarationPaths.push(path);
            }
          },
        });

        fnBodyVarBindings = unique(fnBodyVarBindings);
        const commonBindings = intersection(fnBodyVarBindings, parameterBindings);

        if (paramsContainAFunction || commonBindings.length > 0) { // put body in a block

          // first convert existing declarations to assignments where applicable
          for (const path of fnBodyVarDeclarationPaths) {
            const lhs = [], rhs = [];
            for (const declaration of path.node.declarations) {
              if (declaration.init !== null) {
                lhs.push(declaration.id);
                rhs.push(declaration.init);
              }
            }

            if (lhs.length == 0) {
              path.remove();
            } else if (lhs.length == 1) {
              path.replaceWith(t.assignmentExpression("=", lhs[0], rhs[0]));
            } else {
              path.replaceWith(t.assignmentExpression("=", t.arrayPattern(lhs), t.arrayExpression(rhs)));
            }
          }

          const bodyClone = t.cloneDeep(path.get("body").node);
          path.get("body").replaceWith(t.blockStatement([parameterDeclaration]));

          if (fnBodyVarBindings.length > 0) { // convert these var declarations, initialize and hoist them
            const commonBindingMap = {};
            for (const binding of commonBindings) {
              commonBindingMap[binding] = path.scope.generateUidIdentifier(binding).name;
              path.scope.rename(binding, commonBindingMap[binding]);
              // special treatment for renaming the identifiers in params. See #5734
              for (const paramPath of path.get("params")) {
                if (paramPath.node.name == binding) paramPath.node.name = commonBindingMap[binding];
              }
            }

            const redeclareDeclaration = t.variableDeclaration("let", fnBodyVarBindings.map(
              (x) => t.variableDeclarator(
                t.identifier(x),
                commonBindings.indexOf(x) > -1 ? t.identifier(commonBindingMap[x]) : undefined
              )
            ));

            bodyClone.body.unshift(redeclareDeclaration);
          }

          path.get("body").pushContainer("body", bodyClone);
        } else {
          path.get("body").unshiftContainer("body", parameterDeclaration);
        }
      },
    },
  };
}
