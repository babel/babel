import intersection from "lodash/intersection";
import unique from "lodash/uniq";
import getFunctionArity from "babel-helper-get-function-arity";

export default function (babel) {
  const { types: t } = babel;

  function extractDeclaredVariables(declaration, fnPath) {
    const fn = t.functionExpression(null, [], t.blockStatement([declaration]));
    //for some reason I can't push to function's "body" directly
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
        
        let paramReplacements = []; // of length = arity
        // decide if the function is a simpleCase or not, find replacement identifiers for complex parameters
        // truncated to arity
        let simpleCase = true; // the case that we don't need to bring the args to function body
        for (let i = 0; i < path.get("params").length; i++) {
          const param = path.get("params")[i].node;
          if (param.type == "Identifier") {
            paramReplacements.push(param);
          } else {
            simpleCase = false;
            if (paramReplacements.length < arity) {
              const sym = path.scope.generateUidIdentifier("ref");
              paramReplacements.push(sym); // to maintain arity
            }
          }
        }

        if (simpleCase) return; // early exit

        // prepare lhs and rhs for the parameterDelcaration
        const lhs = t.arrayPattern([]);
        lhs.elements = path.get("params").map(
          (x, ix) => {return x.type == "Identifier" && ix < arity ? null : x.node;}
        ); //hack, not using the constructor directly since it's throwing a nonsensical error
        const rhs = paramReplacements.map((x, ix) => {return lhs.elements[ix] == null ? null : x;});

        if (path.get("params").length > arity) {
          const rest = path.scope.generateUidIdentifier("ref");
          rhs.push(t.spreadElement(rest));
          paramReplacements.push(t.restElement(rest));
        }

        // arguments are supposed to throw on a TDZ reference, 
        // hence a let declaration is the best way to mimic that
        const parameterDeclaration = t.variableDeclaration("let", 
          [t.variableDeclarator(lhs, t.arrayExpression(rhs))]
        );

        if (checkIfParamsContainAFunction(path)) {
          // if yes, then we'll put the original function body in a block scope and convert vars to lets so
          // that functions don't have access to the variables declared in the function body
          let fnBodyVarBindings = [];
          const functionParent = path;

          path.traverse({
            VariableDeclaration: function (path) {
              if (path.node.kind == "var" && path.getFunctionParent() == functionParent) {
                fnBodyVarBindings = fnBodyVarBindings.concat(
                  extractDeclaredVariables(t.clone(path.node), path.getFunctionParent())
                );

                let lhs, rhs;
                if (path.node.declarations.length > 1) {
                  lhs = t.arrayPattern([path.node.declarations.map((x) => x.id)]);
                  rhs = t.arrayPattern([path.node.declarations.map((x) => x.init)]);
                } else {
                  lhs = path.node.declarations[0].id;
                  rhs = path.node.declarations[0].init;
                }

                path.replaceWith(t.assignmentExpression("=", lhs, rhs));
              }
            },
          });

          fnBodyVarBindings = unique(fnBodyVarBindings);

          const bodyClone = t.cloneDeep(path.get("body").node);
          path.get("body").replaceWith(t.blockStatement([parameterDeclaration]));

          if (fnBodyVarBindings.length > 0) { // convert these var declarations, initialize and hoist them
            const parameterBindings = extractDeclaredVariables(parameterDeclaration, path);
            const commonBindings = intersection(fnBodyVarBindings, parameterBindings);
            const commonBindingMap = {};
            for (const binding of commonBindings) {
              commonBindingMap[binding] = path.scope.generateUidIdentifier(binding).name;
              path.scope.rename(binding, commonBindingMap[binding]);
            }

            const redeclareDeclaration = t.variableDeclaration("let", fnBodyVarBindings.map(
              (x) => t.variableDeclarator(t.identifier(x), t.identifier(commonBindingMap[x]))
            ));

            bodyClone.body.unshift(redeclareDeclaration);
          }

          path.get("body").pushContainer("body", bodyClone);
        } else {
          path.get("body").unshiftContainer("body", parameterDeclaration);
        }

        path.node.params = paramReplacements; // there doesn't seem to be a path.replace way to do this
      },
    },
  };
}
