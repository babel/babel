/* @flow */

import repeating from "repeating";
import * as t from "babel-types";

const NON_ALPHABETIC_UNARY_OPERATORS = t.UPDATE_OPERATORS.concat(t.NUMBER_UNARY_OPERATORS).concat(["!"]);

export function WithStatement(node: Object) {
  this.keyword("with");
  this.push("(");
  this.print(node.object, node);
  this.push(")");
  this.printBlock(node);
}

export function IfStatement(node: Object) {
  this.keyword("if");
  this.push("(");
  this.print(node.test, node);
  this.push(")");
  this.space();

  let needsBlock = node.alternate && t.isIfStatement(getLastStatement(node.consequent));
  if (needsBlock) {
    this.push("{");
    this.newline();
    this.indent();
  }

  this.printAndIndentOnComments(node.consequent, node);

  if (needsBlock) {
    this.dedent();
    this.newline();
    this.push("}");
  }

  if (node.alternate) {
    if (this.isLast("}")) this.space();
    this.push("else ");
    this.printAndIndentOnComments(node.alternate, node);
  }
}

// Recursively get the last statement.
function getLastStatement(statement) {
  if (!t.isStatement(statement.body)) return statement;
  return getLastStatement(statement.body);
}

export function ForStatement(node: Object) {
  this.keyword("for");
  this.push("(");

  this._inForStatementInit = true;
  this.print(node.init, node);
  this._inForStatementInit = false;
  this.push(";");

  if (node.test) {
    this.space();
    this.print(node.test, node);
  }
  this.push(";");

  if (node.update) {
    this.space();
    this.print(node.update, node);
  }

  this.push(")");
  this.printBlock(node);
}

export function WhileStatement(node: Object) {
  this.keyword("while");
  this.push("(");
  this.print(node.test, node);
  this.push(")");
  this.printBlock(node);
}

let buildForXStatement = function (op) {
  return function (node: Object) {
    this.keyword("for");
    this.push("(");
    this.print(node.left, node);
    this.push(` ${op} `);
    this.print(node.right, node);
    this.push(")");
    this.printBlock(node);
  };
};

export let ForInStatement = buildForXStatement("in");
export let ForOfStatement = buildForXStatement("of");

export function DoWhileStatement(node: Object) {
  this.push("do ");
  this.print(node.body, node);
  this.space();
  this.keyword("while");
  this.push("(");
  this.print(node.test, node);
  this.push(");");
}

function buildLabelStatement(prefix, key = "label") {
  return function (node: Object) {
    this.push(prefix);

    let label = node[key];
    if (label) {
      if (!(this.format.minified && ((t.isUnaryExpression(label, { prefix: true }) ||
                                      t.isUpdateExpression(label, { prefix: true })) &&
                                     NON_ALPHABETIC_UNARY_OPERATORS.indexOf(label.operator) > -1))) {
        this.push(" ");

      }

      let terminatorState = this.startTerminatorless();
      this.print(label, node);
      this.endTerminatorless(terminatorState);
    }

    this.semicolon();
  };
}

export let ContinueStatement = buildLabelStatement("continue");
export let ReturnStatement   = buildLabelStatement("return", "argument");
export let BreakStatement    = buildLabelStatement("break");
export let ThrowStatement    = buildLabelStatement("throw", "argument");

export function LabeledStatement(node: Object) {
  this.print(node.label, node);
  this.push(": ");
  this.print(node.body, node);
}

export function TryStatement(node: Object) {
  this.keyword("try");
  this.print(node.block, node);
  this.space();

  // Esprima bug puts the catch clause in a `handlers` array.
  // see https://code.google.com/p/esprima/issues/detail?id=433
  // We run into this from regenerator generated ast.
  if (node.handlers) {
    this.print(node.handlers[0], node);
  } else {
    this.print(node.handler, node);
  }

  if (node.finalizer) {
    this.space();
    this.push("finally ");
    this.print(node.finalizer, node);
  }
}

export function CatchClause(node: Object) {
  this.keyword("catch");
  this.push("(");
  this.print(node.param, node);
  this.push(")");
  this.space();
  this.print(node.body, node);
}

export function SwitchStatement(node: Object) {
  this.keyword("switch");
  this.push("(");
  this.print(node.discriminant, node);
  this.push(")");
  this.space();
  this.push("{");

  this.printSequence(node.cases, node, {
    indent: true,
    addNewlines(leading, cas) {
      if (!leading && node.cases[node.cases.length - 1] === cas) return -1;
    }
  });

  this.push("}");
}

export function SwitchCase(node: Object) {
  if (node.test) {
    this.push("case ");
    this.print(node.test, node);
    this.push(":");
  } else {
    this.push("default:");
  }

  if (node.consequent.length) {
    this.newline();
    this.printSequence(node.consequent, node, { indent: true });
  }
}

export function DebuggerStatement() {
  this.push("debugger;");
}

export function VariableDeclaration(node: Object, parent: Object) {
  this.push(node.kind + " ");

  let hasInits = false;
  // don't add whitespace to loop heads
  if (!t.isFor(parent)) {
    for (let declar of (node.declarations: Array<Object>)) {
      if (declar.init) {
        // has an init so let's split it up over multiple lines
        hasInits = true;
      }
    }
  }

  //
  // use a pretty separator when we aren't in compact mode, have initializers and don't have retainLines on
  // this will format declarations like:
  //
  //   let foo = "bar", bar = "foo";
  //
  // into
  //
  //   let foo = "bar",
  //       bar = "foo";
  //

  let sep;
  if (!this.format.compact && !this.format.concise && hasInits && !this.format.retainLines) {
    sep = `,\n${repeating(" ", node.kind.length + 1)}`;
  }

  //

  this.printList(node.declarations, node, { separator: sep });

  if (t.isFor(parent)) {
    // don't give semicolons to these nodes since they'll be inserted in the parent generator
    if (parent.left === node || parent.init === node) return;
  }

  this.semicolon();
}

export function VariableDeclarator(node: Object) {
  this.print(node.id, node);
  this.print(node.id.typeAnnotation, node);
  if (node.init) {
    this.space();
    this.push("=");
    this.space();
    this.print(node.init, node);
  }
}
