import getFunctionArity from "babel-helper-get-function-arity";
import callDelegate from "babel-helper-call-delegate";
import template from "babel-template";
import * as t from "babel-types";

const buildDefaultParam = template(
  `
  let VARIABLE_NAME =
    ARGUMENTS.length > ARGUMENT_KEY && ARGUMENTS[ARGUMENT_KEY] !== undefined ?
      ARGUMENTS[ARGUMENT_KEY]
    :
      DEFAULT_VALUE;
`,
);

const buildCutOff = template(
  `
  let $0 = $1[$2];
`,
);

function hasDefaults(node) {
  for (const param of (node.params: Array<Object>)) {
    if (!t.isIdentifier(param)) return true;
  }
  return false;
}

function isSafeBinding(scope, node) {
  if (!scope.hasOwnBinding(node.name)) return true;
  const { kind } = scope.getOwnBinding(node.name);
  return kind === "param" || kind === "local";
}

const iifeVisitor = {
  ReferencedIdentifier(path, state) {
    const { scope, node } = path;
    if (node.name === "eval" || !isSafeBinding(scope, node)) {
      state.iife = true;
      path.stop();
    }
  },

  Scope(path) {
    // different bindings
    path.skip();
  },
};

export const visitor = {
  Function(path) {
    const { node, scope } = path;
    if (!hasDefaults(node)) return;

    // ensure it's a block, useful for arrow functions
    path.ensureBlock();

    const state = {
      iife: false,
      scope: scope,
    };

    const body = [];

    //
    const argsIdentifier = t.identifier("arguments");
    argsIdentifier._shadowedFunctionLiteral = path;

    // push a default parameter definition
    function pushDefNode(left, right, i) {
      const defNode = buildDefaultParam({
        VARIABLE_NAME: left,
        DEFAULT_VALUE: right,
        ARGUMENT_KEY: t.numericLiteral(i),
        ARGUMENTS: argsIdentifier,
      });
      defNode._blockHoist = node.params.length - i;
      body.push(defNode);
    }

    //
    const lastNonDefaultParam = getFunctionArity(node);

    //
    const params = path.get("params");
    for (let i = 0; i < params.length; i++) {
      const param = params[i];

      if (!param.isAssignmentPattern()) {
        if (!state.iife && !param.isIdentifier()) {
          param.traverse(iifeVisitor, state);
        }

        continue;
      }

      const left = param.get("left");
      const right = param.get("right");

      //
      if (i >= lastNonDefaultParam || left.isPattern()) {
        const placeholder = scope.generateUidIdentifier("x");
        placeholder._isDefaultPlaceholder = true;
        node.params[i] = placeholder;
      } else {
        node.params[i] = left.node;
      }

      //
      if (!state.iife) {
        if (right.isIdentifier() && !isSafeBinding(scope, right.node)) {
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
      const param = node.params[i];
      if (param._isDefaultPlaceholder) continue;

      const declar = buildCutOff(param, argsIdentifier, t.numericLiteral(i));
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
  },
};
