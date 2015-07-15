import codeFrame from "../../helpers/code-frame";
import traverse from "../index";
import NodePath from "./index";
import parse from "../../helpers/parse";
import * as t from "../../types";

/**
 * [Please add a description.]
 */

var hoistVariablesVisitor = {

  /**
   * [Please add a description.]
   */

  Function() {
    this.skip();
  },

  /**
   * [Please add a description.]
   */

  VariableDeclaration(node, parent, scope) {
    if (node.kind !== "var") return;

    var bindings = this.getBindingIdentifiers();
    for (var key in bindings) {
      scope.push({ id: bindings[key] });
    }

    var exprs = [];

    for (var declar of (node.declarations: Array)) {
      if (declar.init) {
        exprs.push(t.expressionStatement(
          t.assignmentExpression("=", declar.id, declar.init)
        ));
      }
    }

    return exprs;
  }
};

/**
 * Replace a node with an array of multiple. This method performs the following steps:
 *
 *  - Inherit the comments of first provided node with that of the current node.
 *  - Insert the provided nodes after the current node.
 *  - Remove the current node.
 */

export function replaceWithMultiple(nodes: Array<Object>) {
  this.resync();

  nodes = this._verifyNodeList(nodes);
  t.inheritsComments(nodes[0], this.node);
  this.node = this.container[this.key] = null;
  this.insertAfter(nodes);
  if (!this.node) this.dangerouslyRemove();
}

/**
 * Parse a string as an expression and replace the current node with the result.
 *
 * NOTE: This is typically not a good idea to use. Building source strings when
 * transforming ASTs is an antipattern and SHOULD NOT be encouraged. Even if it's
 * easier to use, your transforms will be extremely brittle.
 */

export function replaceWithSourceString(replacement) {
  this.resync();

  try {
    replacement = `(${replacement})`;
    replacement = parse(replacement);
  } catch (err) {
    var loc = err.loc;
    if (loc) {
      err.message += " - make sure this is an expression.";
      err.message += "\n" + codeFrame(replacement, loc.line, loc.column + 1);
    }
    throw err;
  }

  replacement = replacement.program.body[0].expression;
  traverse.removeProperties(replacement);
  return this.replaceWith(replacement);
}

/**
 * Replace the current node with another.
 */

export function replaceWith(replacement, whateverAllowed) {
  this.resync();

  if (this.removed) {
    throw new Error("You can't replace this node, we've already removed it");
  }

  if (replacement instanceof NodePath) {
    replacement = replacement.node;
  }

  if (!replacement) {
    throw new Error("You passed `path.replaceWith()` a falsy node, use `path.dangerouslyRemove()` instead");
  }

  if (this.node === replacement) {
    return;
  }

  if (this.isProgram() && !t.isProgram(replacement)) {
    throw new Error("You can only replace a Program root node with another Program node");
  }

  // normalise inserting an entire AST
  if (t.isProgram(replacement) && !this.isProgram()) {
    replacement = replacement.body;
    whateverAllowed = true;
  }

  if (Array.isArray(replacement)) {
    if (whateverAllowed) {
      return this.replaceWithMultiple(replacement);
    } else {
      throw new Error("Don't use `path.replaceWith()` with an array of nodes, use `path.replaceWithMultiple()`");
    }
  }

  if (typeof replacement === "string") {
    // triggers an error
    return this.replaceWithSourceString();
  }

  // replacing a statement with an expression so wrap it in an expression statement
  if (this.isNodeType("Statement") && t.isExpression(replacement) && !this.canHaveVariableDeclarationOrExpression()) {
    replacement = t.expressionStatement(replacement);
  }

  // replacing an expression with a statement so let's explode it
  if (this.isNodeType("Expression") && t.isStatement(replacement)) {
    return this.replaceExpressionWithStatements([replacement]);
  }

  var oldNode = this.node;
  if (oldNode) t.inheritsComments(replacement, oldNode);

  // replace the node
  this.node = this.container[this.key] = replacement;
  this.type = replacement.type;

  // potentially create new scope
  this.setScope();
}

/**
 * This method takes an array of statements nodes and then explodes it
 * into expressions. This method retains completion records which is
 * extremely important to retain original semantics.
 */

export function replaceExpressionWithStatements(nodes: Array) {
  this.resync();

  var toSequenceExpression = t.toSequenceExpression(nodes, this.scope);

  if (toSequenceExpression) {
    return this.replaceWith(toSequenceExpression);
  } else {
    var container = t.functionExpression(null, [], t.blockStatement(nodes));
    container.shadow = true;

    this.replaceWith(t.callExpression(container, []));
    this.traverse(hoistVariablesVisitor);

    // add implicit returns to all ending expression statements
    var last = this.get("callee").getCompletionRecords();
    for (var lastNode of (last: Array)) {
      if (!lastNode.isExpressionStatement()) continue;

      var loop = lastNode.findParent((path) => path.isLoop());
      if (loop) {
        var uid = this.get("callee").scope.generateDeclaredUidIdentifier("ret");
        this.get("callee.body").pushContainer("body", t.returnStatement(uid));
        lastNode.get("expression").replaceWith(
          t.assignmentExpression("=", uid, lastNode.node.expression)
        );
      } else {
        lastNode.replaceWith(t.returnStatement(lastNode.node.expression));
      }
    }

    return this.node;
  }
}

/**
 * [Please add a description.]
 */

export function replaceInline(nodes) {
  this.resync();

  if (Array.isArray(nodes)) {
    if (Array.isArray(this.container)) {
      nodes = this._verifyNodeList(nodes);
      this._containerInsertAfter(nodes);
      return this.dangerouslyRemove();
    } else {
      return this.replaceWithMultiple(nodes);
    }
  } else {
    return this.replaceWith(nodes);
  }
}
