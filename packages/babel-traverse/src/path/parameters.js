// This file contains methods relating to function parameters
import intersection from "lodash/intersection";
import unique from "lodash/uniq";
import getFunctionArity from "babel-helper-get-function-arity";
import * as t from "babel-types";

// Finds the names of variables being declared in a declaration object by putting the declaration inside
// a closue and finding the bindings in that closure
function extractDeclaredVariables(declaration, fnPath) {
  const fn = t.functionExpression(null, [], t.blockStatement([declaration]));
  fnPath.get("body").unshiftContainer("body", t.expressionStatement(fn));
  const bindings = Object.keys(fnPath.get("body.body.0.expression").scope.bindings);
  fnPath.get("body").get("body.0").remove();
  return bindings;
}

export function inlineParameters() {

  this.ensureBlock(); // so that we work correctly with arrow functions
  const arity = getFunctionArity(this.node);

  const parameterBindings = extractDeclaredVariables(
    t.variableDeclaration("var", [t.variableDeclarator(t.arrayPattern(this.node.params))]),
    this
  );

  const paramsContainAFunction = this.get("params").some(
    (paramPath) => paramPath.findChild("Function") !== null
  );

  // logic to find replacement identifiers for complex parameters
  const lhs = [];
  const rhs = [];
  const arityLessThanParams = arity < this.get("params").length;

  // loop over all parameters and replace the complex ones with new Uids
  for (let i = 0; i < this.get("params").length; i++) {
    const paramPath = this.get("params")[i];

    if (i >= arity) {
      // remove params after this to mantain arity
      lhs.push(paramPath.node);
      paramPath.remove();
      i--; // since we removed this one, the next one will be shifted to this index
    } else if (paramPath.node.type != "Identifier") {
      const sym = this.scope.generateUidIdentifier("ref");
      lhs.push(paramPath.node);
      paramPath.replaceWith(sym);
      rhs.push(sym);
    }
  }

  if (arityLessThanParams) {
    const rest = this.scope.generateUidIdentifier("ref");
    rhs.push(t.spreadElement(rest));
    this.pushContainer("params", t.restElement(rest));
  }

  // arguments are supposed to throw on a TDZ reference,
  // hence a let declaration is the best way to mimic that
  const parameterDeclaration = t.variableDeclaration("let",
    [t.variableDeclarator(t.arrayPattern(lhs), t.arrayExpression(rhs))]
  );

  let fnBodyVarBindingSymbols = [];
  const fnBodyVarDeclarationPaths = []; // lookup array just to avoid traversing again later
  const functionParent = this;

  this.traverse({
    VariableDeclaration: function (path) {
      if (path.node.kind == "var" && path.getFunctionParent() == functionParent) {
        fnBodyVarBindingSymbols = fnBodyVarBindingSymbols.concat(
          extractDeclaredVariables(t.clone(path.node), path.getFunctionParent())
        );
        fnBodyVarDeclarationPaths.push(path);
      }
    },
  });

  fnBodyVarBindingSymbols = unique(fnBodyVarBindingSymbols);
  const commonSymbols = intersection(fnBodyVarBindingSymbols, parameterBindings);

  if (!paramsContainAFunction && commonSymbols.length == 0) {
    this.get("body").unshiftContainer("body", parameterDeclaration);
  } else { // put body in a block

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

    const bodyClone = t.cloneDeep(this.get("body").node);
    this.get("body").replaceWith(t.blockStatement([parameterDeclaration]));

    if (fnBodyVarBindingSymbols.length > 0) { // initialize and hoist them
      const commonSymbolsMap = {};
      for (const binding of commonSymbols) {
        commonSymbolsMap[binding] = this.scope.generateUidIdentifier(binding).name;
        this.scope.rename(binding, commonSymbolsMap[binding]);
        // special treatment for renaming the identifiers in params. See #2378
        for (const paramPath of this.get("params")) {
          if (paramPath.node.name == binding) paramPath.node.name = commonSymbolsMap[binding];
        }
      }

      const redeclareDeclaration = t.variableDeclaration("let", fnBodyVarBindingSymbols.map(
        (x) => t.variableDeclarator(
          t.identifier(x),
          commonSymbols.indexOf(x) > -1 ? t.identifier(commonSymbolsMap[x]) : undefined
        )
      ));

      bodyClone.body.unshift(redeclareDeclaration);
    }

    this.get("body").pushContainer("body", bodyClone);
  }
}
