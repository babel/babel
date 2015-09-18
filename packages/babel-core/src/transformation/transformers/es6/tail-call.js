import reduceRight from "lodash/collection/reduceRight";
import * as messages from "babel-messages";
import flatten from "lodash/array/flatten";
import * as util from  "../../../util";
import map from "lodash/collection/map";
import * as t from "babel-types";

export let metadata = {
  group: "builtin-trailing"
};

export let visitor = {
  Function(node, parent, scope, file) {
    if (node.generator || node.async) return;
    let tailCall = new TailCallTransformer(this, scope, file);
    tailCall.run();
  }
};

function returnBlock(expr) {
  return t.blockStatement([t.returnStatement(expr)]);
}

let visitor = {
  enter(node, parent) {
    if (t.isTryStatement(parent)) {
      if (node === parent.block) {
        this.skip();
      } else if (parent.finalizer && node !== parent.finalizer) {
        this.skip();
      }
    }
  },

  ReturnStatement(node, parent, scope, state) {
    return state.subTransform(node.argument);
  },

  Function() {
    this.skip();
  },

  VariableDeclaration(node, parent, scope, state) {
    state.vars.push(node);
  },

  ThisExpression(node, parent, scope, state) {
    if (!state.isShadowed) {
      state.needsThis = true;
      state.thisPaths.push(this);
    }
  },

  ReferencedIdentifier(node, parent, scope, state) {
    if (node.name === "arguments" && (!state.isShadowed || node._shadowedFunctionLiteral)) {
      state.needsArguments = true;
      state.argumentsPaths.push(this);
    }
  }
};

class TailCallTransformer {
  constructor(path, scope, file) {
    this.hasTailRecursion = false;

    this.needsArguments = false;
    this.argumentsPaths = [];
    this.setsArguments  = false;

    this.needsThis = false;
    this.thisPaths = [];

    this.isShadowed = path.isArrowFunctionExpression() || path.is("shadow");
    this.ownerId    = path.node.id;
    this.vars       = [];

    this.scope = scope;
    this.path  = path;
    this.file  = file;
    this.node  = path.node;
  }

  getArgumentsId() {
    return this.argumentsId = this.argumentsId || this.scope.generateUidIdentifier("arguments");
  }

  getThisId() {
    return this.thisId = this.thisId || this.scope.generateUidIdentifier("this");
  }

  getLeftId() {
    return this.leftId = this.leftId || this.scope.generateUidIdentifier("left");
  }

  getFunctionId() {
    return this.functionId = this.functionId || this.scope.generateUidIdentifier("function");
  }

  getAgainId() {
    return this.againId = this.againId || this.scope.generateUidIdentifier("again");
  }

  getParams() {
    let params = this.params;

    if (!params) {
      params = this.node.params;
      this.paramDecls = [];

      for (let i = 0; i < params.length; i++) {
        let param = params[i];
        if (!param._isDefaultPlaceholder) {
          this.paramDecls.push(t.variableDeclarator(
            param,
            params[i] = this.scope.generateUidIdentifier("x")
          ));
        }
      }
    }

    return this.params = params;
  }

  hasDeopt() {
    // check if the ownerId has been reassigned, if it has then it's not safe to
    // perform optimisations
    let ownerIdInfo = this.scope.getBinding(this.ownerId.name);
    return ownerIdInfo && !ownerIdInfo.constant;
  }

  run() {
    let node  = this.node;

    // only tail recursion can be optimized as for now, so we can skip anonymous
    // functions entirely
    let ownerId = this.ownerId;
    if (!ownerId) return;

    // traverse the function and look for tail recursion
    this.path.traverse(visitor, this);

    // has no tail call recursion
    if (!this.hasTailRecursion) return;

    // the function binding isn't constant so we can't be sure that it's the same function :(
    if (this.hasDeopt()) {
      this.file.log.deopt(node, messages.get("tailCallReassignmentDeopt"));
      return;
    }

    //

    let body = this.path.ensureBlock().body;

    for (let i = 0; i < body.length; i++) {
      let bodyNode = body[i];
      if (!t.isFunctionDeclaration(bodyNode)) continue;

      bodyNode = body[i] = t.variableDeclaration("var", [
        t.variableDeclarator(bodyNode.id, t.toExpression(bodyNode))
      ]);
      bodyNode._blockHoist = 2;
    }

    if (this.vars.length > 0) {
      let declarations = flatten(map(this.vars, function (decl) {
        return decl.declarations;
      }));

      let assignment = reduceRight(declarations, function (expr, decl) {
        return t.assignmentExpression("=", decl.id, expr);
      }, this.scope.buildUndefinedNode());

      let statement = t.expressionStatement(assignment);
      statement._blockHoist = Infinity;
      body.unshift(statement);
    }

    let paramDecls = this.paramDecls;
    if (paramDecls.length > 0) {
      let paramDecl = t.variableDeclaration("var", paramDecls);
      paramDecl._blockHoist = Infinity;
      body.unshift(paramDecl);
    }

    body.unshift(t.expressionStatement(
      t.assignmentExpression("=", this.getAgainId(), t.booleanLiteral(false)))
    );

    node.body = util.template("tail-call-body", {
      FUNCTION_ID: this.getFunctionId(),
      AGAIN_ID:    this.getAgainId(),
      BLOCK:       node.body
    });

    let topVars = [];

    if (this.needsThis) {
      for (let path of (this.thisPaths: Array)) {
        path.replaceWith(this.getThisId());
      }

      topVars.push(t.variableDeclarator(this.getThisId(), t.thisExpression()));
    }

    if (this.needsArguments || this.setsArguments) {
      for (let path of (this.argumentsPaths: Array)) {
        path.replaceWith(this.argumentsId);
      }

      let decl = t.variableDeclarator(this.argumentsId);
      if (this.argumentsId) {
        decl.init = t.identifier("arguments");
        decl.init._shadowedFunctionLiteral = this.path;
      }
      topVars.push(decl);
    }

    let leftId = this.leftId;
    if (leftId) {
      topVars.push(t.variableDeclarator(leftId));
    }

    if (topVars.length > 0) {
      node.body.body.unshift(t.variableDeclaration("var", topVars));
    }
  }

  subTransform(node) {
    if (!node) return;

    let handler = this[`subTransform${node.type}`];
    if (handler) return handler.call(this, node);
  }

  subTransformConditionalExpression(node) {
    let callConsequent = this.subTransform(node.consequent);
    let callAlternate = this.subTransform(node.alternate);
    if (!callConsequent && !callAlternate) {
      return;
    }

    // if ternary operator had tail recursion in value, convert to optimized if-statement
    node.type = "IfStatement";
    node.consequent = callConsequent ? t.toBlock(callConsequent) : returnBlock(node.consequent);

    if (callAlternate) {
      node.alternate = t.isIfStatement(callAlternate) ? callAlternate : t.toBlock(callAlternate);
    } else {
      node.alternate = returnBlock(node.alternate);
    }

    return [node];
  }

  subTransformLogicalExpression(node) {
    // only call in right-value of can be optimized
    let callRight = this.subTransform(node.right);
    if (!callRight) return;

    // cache left value as it might have side-effects
    let leftId = this.getLeftId();
    let testExpr = t.assignmentExpression(
      "=",
      leftId,
      node.left
    );

    if (node.operator === "&&") {
      testExpr = t.unaryExpression("!", testExpr);
    }

    return [t.ifStatement(testExpr, returnBlock(leftId))].concat(callRight);
  }

  subTransformSequenceExpression(node) {
    let seq = node.expressions;

    // only last element can be optimized
    let lastCall = this.subTransform(seq[seq.length - 1]);
    if (!lastCall) {
      return;
    }

    // remove converted expression from sequence
    // and convert to regular expression if needed
    if (--seq.length === 1) {
      node = seq[0];
    }

    return [t.expressionStatement(node)].concat(lastCall);
  }

  subTransformCallExpression(node) {
    let callee = node.callee;
    let thisBinding, args;

    if (t.isMemberExpression(callee, { computed: false }) && t.isIdentifier(callee.property)) {
      switch (callee.property.name) {
        case "call":
          args = t.arrayExpression(node.arguments.slice(1));
          break;

        case "apply":
          args = node.arguments[1] || this.scope.buildUndefinedNode();
          this.needsArguments = true;
          break;

        default:
          return;
      }

      thisBinding = node.arguments[0];
      callee = callee.object;
    }

    // only tail recursion can be optimized as for now
    if (!t.isIdentifier(callee) || !this.scope.bindingIdentifierEquals(callee.name, this.ownerId)) {
      return;
    }

    this.hasTailRecursion = true;

    if (this.hasDeopt()) return;

    let body = [];

    if (this.needsThis && !t.isThisExpression(thisBinding)) {
      body.push(t.expressionStatement(t.assignmentExpression(
        "=",
        this.getThisId(),
        thisBinding || this.scope.buildUndefinedNode()
      )));
    }

    if (!args) {
      args = t.arrayExpression(node.arguments);
    }

    let argumentsId = this.getArgumentsId();
    let params      = this.getParams();

    if (this.needsArguments) {
      body.push(t.expressionStatement(t.assignmentExpression(
        "=",
        argumentsId,
        args
      )));
    }

    if (t.isArrayExpression(args)) {
      let elems = args.elements;

      // pad out the args so all the function args are reset - https://github.com/babel/babel/issues/1938
      while (elems.length < params.length) {
        elems.push(this.scope.buildUndefinedNode());
      }

      for (let i = 0; i < elems.length; i++) {
        let param = params[i];
        let elem  = elems[i];

        if (param && !param._isDefaultPlaceholder) {
          elems[i] = t.assignmentExpression("=", param, elem);
        } else {
          // exceeds parameters but push it anyway to ensure correct execution
        }
      }

      if (!this.needsArguments) {
        for (let elem of (elems: Array)) {
          // only push expressions that we really need, this will skip pure arguments that exceed the
          // parameter length of the current function
          if (!this.scope.isPure(elem)) {
            body.push(t.expressionStatement(elem));
          }
        }
      }
    } else {
      this.setsArguments = true;
      for (let i = 0; i < params.length; i++) {
        let param = params[i];
        if (!param._isDefaultPlaceholder) {
          body.push(t.expressionStatement(t.assignmentExpression(
            "=",
            param,
            t.memberExpression(argumentsId, t.numberLiteral(i), true)
          )));
        }
      }
    }

    body.push(t.expressionStatement(
      t.assignmentExpression("=", this.getAgainId(), t.booleanLiteral(true))
    ));

    body.push(t.continueStatement(this.getFunctionId()));

    return body;
  }
}
