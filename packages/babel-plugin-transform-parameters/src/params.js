import callDelegate from "@babel/helper-call-delegate";
import { template, types as t } from "@babel/core";

const buildDefaultParam = template(`
  let VARIABLE_NAME =
    arguments.length > ARGUMENT_KEY && arguments[ARGUMENT_KEY] !== undefined ?
      arguments[ARGUMENT_KEY]
    :
      DEFAULT_VALUE;
`);

const buildLooseDefaultParam = template(`
  if (ASSIGNMENT_IDENTIFIER === UNDEFINED) {
    ASSIGNMENT_IDENTIFIER = DEFAULT_VALUE;
  }
`);

const buildLooseDestructuredDefaultParam = template(`
  let ASSIGNMENT_IDENTIFIER = PARAMETER_NAME === UNDEFINED ? DEFAULT_VALUE : PARAMETER_NAME ;
`);

const buildArgumentsAccess = template(`
  let $0 = arguments[$1];
`);

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

export default function convertFunctionParams(path, loose) {
  const { node, scope } = path;

  const state = {
    iife: false,
    scope: scope,
  };

  const body = [];
  const params = path.get("params");

  let firstOptionalIndex = null;

  for (let i = 0; i < params.length; i++) {
    const param = params[i];

    if (param.isAssignmentPattern() && loose) {
      const left = param.get("left");
      const right = param.get("right");

      const undefinedNode = scope.buildUndefinedNode();

      if (left.isIdentifier()) {
        body.push(
          buildLooseDefaultParam({
            ASSIGNMENT_IDENTIFIER: left.node,
            DEFAULT_VALUE: right.node,
            UNDEFINED: undefinedNode,
          }),
        );
        param.replaceWith(left.node);
      } else if (left.isObjectPattern() || left.isArrayPattern()) {
        const paramName = scope.generateUidIdentifier();
        body.push(
          buildLooseDestructuredDefaultParam({
            ASSIGNMENT_IDENTIFIER: left.node,
            DEFAULT_VALUE: right.node,
            PARAMETER_NAME: paramName,
            UNDEFINED: undefinedNode,
          }),
        );
        param.replaceWith(paramName);
      }
    } else if (param.isAssignmentPattern()) {
      if (firstOptionalIndex === null) firstOptionalIndex = i;

      const left = param.get("left");
      const right = param.get("right");

      //
      if (!state.iife) {
        if (right.isIdentifier() && !isSafeBinding(scope, right.node)) {
          // the right hand side references a parameter
          state.iife = true;
        } else {
          right.traverse(iifeVisitor, state);
        }
      }

      const defNode = buildDefaultParam({
        VARIABLE_NAME: left.node,
        DEFAULT_VALUE: right.node,
        ARGUMENT_KEY: t.numericLiteral(i),
      });
      body.push(defNode);
    } else if (firstOptionalIndex !== null) {
      const defNode = buildArgumentsAccess([param.node, t.numericLiteral(i)]);
      body.push(defNode);
    } else if (param.isObjectPattern() || param.isArrayPattern()) {
      const uid = path.scope.generateUidIdentifier("ref");

      const defNode = t.variableDeclaration("let", [
        t.variableDeclarator(param.node, uid),
      ]);
      body.push(defNode);

      param.replaceWith(uid);
    }

    if (!state.iife && !param.isIdentifier()) {
      param.traverse(iifeVisitor, state);
    }
  }

  if (body.length === 0) return false;

  // we need to cut off all trailing parameters
  if (firstOptionalIndex !== null) {
    node.params = node.params.slice(0, firstOptionalIndex);
  }

  // ensure it's a block, useful for arrow functions
  path.ensureBlock();

  if (state.iife) {
    body.push(callDelegate(path, scope));
    path.set("body", t.blockStatement(body));
  } else {
    path.get("body").unshiftContainer("body", body);
  }

  return true;
}
