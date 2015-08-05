import repeating from "repeating";
import * as t from "../../types";

/**
 * Prints WithStatement, prints object and body.
 */

export function WithStatement(node) {
  this.keyword("with");
  this.push("(");
  this.print(node.object, node);
  this.push(")");
  this.printBlock(node.body, node);
}

/**
 * Prints IfStatement, prints test, consequent, and alternate.
 */

export function IfStatement(node) {
  this.keyword("if");
  this.push("(");
  this.print(node.test, node);
  this.push(")");
  this.space();

  this.printAndIndentOnComments(node.consequent, node);

  if (node.alternate) {
    if (this.isLast("}")) this.space();
    this.push("else ");
    this.printAndIndentOnComments(node.alternate, node);
  }
}

/**
 * Prints ForStatement, prints init, test, update, and body.
 */

export function ForStatement(node) {
  this.keyword("for");
  this.push("(");

  this.print(node.init, node);
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
  this.printBlock(node.body, node);
}

/**
 * Prints WhileStatement, prints test and body.
 */

export function WhileStatement(node) {
  this.keyword("while");
  this.push("(");
  this.print(node.test, node);
  this.push(")");
  this.printBlock(node.body, node);
}

/**
 * Builds ForIn or ForOf statement printers.
 * Prints left, right, and body.
 */

var buildForXStatement = function (op) {
  return function (node) {
    this.keyword("for");
    this.push("(");
    this.print(node.left, node);
    this.push(` ${op} `);
    this.print(node.right, node);
    this.push(")");
    this.printBlock(node.body, node);
  };
};

/**
 * Create ForInStatement and ForOfStatement printers.
 */

export var ForInStatement = buildForXStatement("in");
export var ForOfStatement = buildForXStatement("of");

/**
 * Prints DoWhileStatement, prints body and test.
 */

export function DoWhileStatement(node) {
  this.push("do ");
  this.print(node.body, node);
  this.space();
  this.keyword("while");
  this.push("(");
  this.print(node.test, node);
  this.push(");");
}

/**
 * Builds continue, return, or break statement printers.
 * Prints label (or key).
 */

var buildLabelStatement = function (prefix, key = "label") {
  return function (node) {
    this.push(prefix);

    var label = node[key];
    if (label) {
      this.push(" ");
      var terminatorState = this.startTerminatorless();
      this.print(label, node);
      this.endTerminatorless(terminatorState);
    }

    this.semicolon();
  };
};

/**
 * Create ContinueStatement, ReturnStatement, and BreakStatement printers.
 */

export var ContinueStatement = buildLabelStatement("continue");
export var ReturnStatement   = buildLabelStatement("return", "argument");
export var BreakStatement    = buildLabelStatement("break");
export var ThrowStatement    = buildLabelStatement("throw", "argument");

/**
 * Prints LabeledStatement, prints label and body.
 */

export function LabeledStatement(node) {
  this.print(node.label, node);
  this.push(": ");
  this.print(node.body, node);
}

/**
 * Prints TryStatement, prints block, handlers, and finalizer.
 */

export function TryStatement(node) {
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

/**
 * Prints CatchClause, prints param and body.
 */

export function CatchClause(node) {
  this.keyword("catch");
  this.push("(");
  this.print(node.param, node);
  this.push(") ");
  this.print(node.body, node);
}

/**
 * Prints SwitchStatement, prints discriminant and cases.
 */

export function SwitchStatement(node) {
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

/**
 * Prints SwitchCase, prints test and consequent.
 */

export function SwitchCase(node) {
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

/**
 * Prints DebuggerStatement.
 */

export function DebuggerStatement() {
  this.push("debugger;");
}

/**
 * Prints VariableDeclaration, prints declarations, handles kind and format.
 */

export function VariableDeclaration(node, parent) {
  this.push(node.kind + " ");

  var hasInits = false;
  // don't add whitespace to loop heads
  if (!t.isFor(parent)) {
    for (var declar of (node.declarations: Array)) {
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
  //   var foo = "bar", bar = "foo";
  //
  // into
  //
  //   var foo = "bar",
  //       bar = "foo";
  //

  var sep;
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

/**
 * Prints VariableDeclarator, handles id, id.typeAnnotation, and init.
 */

export function VariableDeclarator(node) {
  this.print(node.id, node);
  this.print(node.id.typeAnnotation, node);
  if (node.init) {
    this.space();
    this.push("=");
    this.space();
    this.print(node.init, node);
  }
}
