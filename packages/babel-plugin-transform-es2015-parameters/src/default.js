/* eslint max-len: 0 */

import getFunctionArity from "babel-helper-get-function-arity";
import callDelegate from "babel-helper-call-delegate";
import template from "babel-template";
import * as t from "babel-types";

let buildDefaultParam = template(`
  let VARIABLE_NAME =
    ARGUMENTS.length <= ARGUMENT_KEY || ARGUMENTS[ARGUMENT_KEY] === undefined ?
      DEFAULT_VALUE
    :
      ARGUMENTS[ARGUMENT_KEY];
`);

let buildCutOff = template(`
  let $0 = $1[$2];
`);

function hasDefaults(node) {
  for (let param of (node.params: Array<Object>)) {
    if (!t.isIdentifier(param)) return true;
  }
  return false;
}

let iifeVisitor = {
  ReferencedIdentifier(path, state) {
    let name = path.node.name;
    if (name === "eval" || (path.scope.hasOwnBinding(name) && path.scope.getOwnBinding(name).kind !== "param")) {
      state.iife = true;
      path.stop();
    }
  },

  Scope(path) {
    // different bindings
    path.skip();
  }
};

export let visitor = {
  Function(path) {
    let { node, scope } = path;
    if (!hasDefaults(node)) return;

    // ensure it's a block, useful for arrow functions
    path.ensureBlock();

    let state = {
      iife: false,
      scope: scope
    };

    let body = [];

    //
    let argsIdentifier = t.identifier("arguments");
    argsIdentifier._shadowedFunctionLiteral = path;

    // push a default parameter definition
    function pushDefNode(left, right, i) {
      const defNode = buildDefaultParam({
        VARIABLE_NAME: left,
        DEFAULT_VALUE: right,
        ARGUMENT_KEY:  t.numericLiteral(i),
        ARGUMENTS:     argsIdentifier
      });
      defNode._blockHoist = node.params.length - i;
      body.push(defNode);
    }

    //
    let lastNonDefaultParam = getFunctionArity(node);

    //
    let params = path.get("params");
    for (let i = 0; i < params.length; i++) {
      let param = params[i];

      if (!param.isAssignmentPattern()) {
        if (!param.isIdentifier()) {
          param.traverse(iifeVisitor, state);
        }

        continue;
      }

      let left  = param.get("left");
      let right = param.get("right");

      //
      if (i >= lastNonDefaultParam || left.isPattern()) {
        let placeholder = scope.generateUidIdentifier("x");
        placeholder._isDefaultPlaceholder = true;
        node.params[i] = placeholder;
      } else {
        node.params[i] = left.node;
      }

      //
      if (!state.iife) {
        if (right.isIdentifier() && scope.hasOwnBinding(right.node.name) && scope.getOwnBinding(right.node.name).kind !== "param") {
          // the right hand side references a parameter
          state.iife = true;
        } else {
          right.traverse(iifeVisitor, state);
        }
      }

      pushDefNode(left.node, right.node, i);
    }

    // add declarations for trailing parameters
    for (let i = lastNonDefaultParam + 1; i < node.params.length; i++) {
      let param = node.params[i];
      if (param._isDefaultPlaceholder) continue;

      let declar = buildCutOff(param, argsIdentifier, t.numericLiteral(i));
      declar._blockHoist = node.params.length - i;
      body.push(declar);
    }

    // we need to cut off all trailing parameters
    node.params = node.params.slice(0, lastNonDefaultParam);

    if (state.iife) {
      body.push(callDelegate(path, scope));
      path.set("body", t.blockStatement(body));
    } else {
      path.get("body").unshiftContainer("body", body);
    }
  }
};
