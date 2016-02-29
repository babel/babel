
import nameFunction from "babel-helper-function-name";
import template from "babel-template";
import * as t from "babel-types";

let buildWrapper = template(`
  (function () {
    var ref = FUNCTION;
    return function NAME(PARAMS) {
      return ref.apply(this, arguments);
    };
  })
`);

let namedBuildWrapper = template(`
  (function () {
    var ref = FUNCTION;
    function NAME(PARAMS) {
      return ref.apply(this, arguments);
    }
    return NAME;
  })
`);

let arrowBuildWrapper =  template(`
  (() => {
    var ref = FUNCTION, _this = this;
    return function(PARAMS) {
      return ref.apply(_this, arguments);
    };
  })
`);

let awaitVisitor = {
  ArrowFunctionExpression(path) {
    if (!path.node.async) {
      path.arrowFunctionToShadowed();
    }
  },

  AwaitExpression({ node }) {
    node.type = "YieldExpression";
  }
};

function classOrObjectMethod(path, callId) {
  let node = path.node;
  let body = node.body;

  node.async = false;

  let container = t.functionExpression(null, [], t.blockStatement(body.body), true);
  container.shadow = true;
  body.body = [
    t.returnStatement(t.callExpression(
      t.callExpression(callId, [container]),
      []
    ))
  ];
}

function plainFunction(path, callId) {
  let node = path.node;
  let isDeclaration = path.isFunctionDeclaration();
  let asyncFnId = node.id;
  let wrapper = buildWrapper;

  if (path.isArrowFunctionExpression()) {
    path.arrowFunctionToShadowed();
    wrapper = arrowBuildWrapper;
  } else if (!isDeclaration && asyncFnId) {
    wrapper = namedBuildWrapper;
  }

  node.async = false;
  node.generator = true;
  // Either the wrapped generator is invoked with `.apply(this, arguments)` or it has no params,
  // so it should capture `arguments`
  if (node.shadow) {
    // node.shadow may be `true` or an object
    node.shadow = Object.assign({}, node.shadow, { arguments: false });
  }

  node.id = null;

  if (isDeclaration) {
    node.type = "FunctionExpression";
  }

  let built = t.callExpression(callId, [node]);
  let container = wrapper({
    NAME: asyncFnId,
    FUNCTION: built,
    PARAMS: node.params.map(() => path.scope.generateUidIdentifier("x"))
  }).expression;

  if (isDeclaration) {
    let declar = t.variableDeclaration("let", [
      t.variableDeclarator(
        t.identifier(asyncFnId.name),
        t.callExpression(container, [])
      )
    ]);
    declar._blockHoist = true;

    path.replaceWith(declar);
  } else {
    let retFunction = container.body.body[1].argument;
    if (!asyncFnId) {
      nameFunction({
        node: retFunction,
        parent: path.parent,
        scope: path.scope
      });
    }

    if (!retFunction || retFunction.id || node.params.length) {
      // we have an inferred function id or params so we need this wrapper
      path.replaceWith(t.callExpression(container, []));
    } else {
      // we can omit this wrapper as the conditions it protects for do not apply
      path.replaceWith(built);
    }
  }
}

export default function (path, callId) {
  let node = path.node;
  if (node.generator) return;

  path.traverse(awaitVisitor);

  if (path.isClassMethod() || path.isObjectMethod()) {
    return classOrObjectMethod(path, callId);
  } else {
    return plainFunction(path, callId);
  }
}
