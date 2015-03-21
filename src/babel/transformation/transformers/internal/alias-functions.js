import * as t from "../../../types";

var functionChildrenVisitor = {
  enter(node, parent, scope, state) {
    if (this.isFunction()) {
      return this.skip();
    }

    if (node._shadowedFunctionLiteral) return this.skip();

    var getId;

    if (this.isIdentifier() && node.name === "arguments") {
      getId = state.getArgumentsId;
    } else if (this.isThisExpression()) {
      getId = state.getThisId;
    } else {
      return;
    }

    if (this.isReferenced()) return getId();
  }
};

var functionVisitor = {
  enter(node, parent, scope, state) {
    if (this.isFunction()) {
      // stop traversal of this node as it'll be hit again by this transformer
      return this.skip();
    } else if (!this.isShadowFunctionExpression()) {
      return;
    }

    // traverse all child nodes of this function and find `arguments` and `this`
    this.traverse(functionChildrenVisitor, state);

    node.type = "FunctionExpression";

    return this.skip();
  }
};

function aliasFunction(getBody, path, scope) {
  var argumentsId;
  var thisId;

  var state = {
    getArgumentsId() {
      return argumentsId ||= scope.generateUidIdentifier("arguments");
    },

    getThisId() {
      return thisId ||= scope.generateUidIdentifier("this");
    }
  };

  // traverse the function and find all alias functions so we can alias
  // `arguments` and `this` if necessary
  path.traverse(functionVisitor, state);

  var body;

  var pushDeclaration = function (id, init) {
    body ||= getBody();
    body.unshift(t.variableDeclaration("var", [
      t.variableDeclarator(id, init)
    ]));
  };

  if (argumentsId) {
    pushDeclaration(argumentsId, t.identifier("arguments"));
  }

  if (thisId) {
    pushDeclaration(thisId, t.thisExpression());
  }
};

export function Program(node, parent, scope) {
  aliasFunction(function () {
    return node.body;
  }, this, scope);
};

export function FunctionDeclaration(node, parent, scope) {
  aliasFunction(function () {
    t.ensureBlock(node);
    return node.body.body;
  }, this, scope);
}

export { FunctionDeclaration as FunctionExpression };
