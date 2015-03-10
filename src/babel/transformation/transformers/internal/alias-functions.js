import * as t from "../../../types";

var functionChildrenVisitor = {
  enter(node, parent, scope, state) {
    if (this.isFunction() && !node._aliasFunction) {
      return this.skip();
    }

    if (node._ignoreAliasFunctions) return this.skip();

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
    if (!node._aliasFunction) {
      if (this.isFunction()) {
        // stop traversal of this node as it'll be hit again by this transformer
        return this.skip();
      } else {
        return;
      }
    }

    // traverse all child nodes of this function and find `arguments` and `this`
    scope.traverse(node, functionChildrenVisitor, state);

    return this.skip();
  }
};

var go = function (getBody, node, scope) {
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
  scope.traverse(node, functionVisitor, state);

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
  go(function () {
    return node.body;
  }, node, scope);
};

export function FunctionDeclaration(node, parent, scope) {
  go(function () {
    t.ensureBlock(node);
    return node.body.body;
  }, node, scope);
}

export { FunctionDeclaration as FunctionExpression };
