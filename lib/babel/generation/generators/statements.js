"use strict";

var repeating = require("repeating");
var t         = require("../../types");

exports.WithStatement = function (node, print) {
  this.keyword("with");
  this.push("(");
  print(node.object);
  this.push(")");
  print.block(node.body);
};

exports.IfStatement = function (node, print) {
  this.keyword("if");
  this.push("(");
  print(node.test);
  this.push(")");
  this.space();

  print.indentOnComments(node.consequent);

  if (node.alternate) {
    if (this.isLast("}")) this.space();
    this.keyword("else");

    if (this.format.format && !t.isBlockStatement(node.alternate)) {
      this.push(" ");
    }

    print.indentOnComments(node.alternate);
  }
};

exports.ForStatement = function (node, print) {
  this.keyword("for");
  this.push("(");

  print(node.init);
  this.push(";");

  if (node.test) {
    this.push(" ");
    print(node.test);
  }
  this.push(";");

  if (node.update) {
    this.push(" ");
    print(node.update);
  }

  this.push(")");
  print.block(node.body);
};

exports.WhileStatement = function (node, print) {
  this.keyword("while");
  this.push("(");
  print(node.test);
  this.push(")");
  print.block(node.body);
};

var buildForXStatement = function (op) {
  return function (node, print) {
    this.keyword("for");
    this.push("(");
    print(node.left);
    this.push(" " + op + " ");
    print(node.right);
    this.push(")");
    print.block(node.body);
  };
};

exports.ForInStatement = buildForXStatement("in");
exports.ForOfStatement = buildForXStatement("of");

exports.DoWhileStatement = function (node, print) {
  this.keyword("do");
  print(node.body);
  this.space();
  this.keyword("while");
  this.push("(");
  print(node.test);
  this.push(");");
};

var buildLabelStatement = function (prefix, key) {
  return function (node, print) {
    this.push(prefix);

    var label = node[key || "label"];
    if (label) {
      this.push(" ");
      print(label);
    }

    this.semicolon();
  };
};

exports.ContinueStatement = buildLabelStatement("continue");
exports.ReturnStatement   = buildLabelStatement("return", "argument");
exports.BreakStatement    = buildLabelStatement("break");

exports.LabeledStatement = function (node, print) {
  print(node.label);
  this.push(": ");
  print(node.body);
};

exports.TryStatement = function (node, print) {
  this.keyword("try");
  print(node.block);
  this.space();

  // Esprima bug puts the catch clause in a `handlers` array.
  // see https://code.google.com/p/esprima/issues/detail?id=433
  // We run into this from regenerator generated ast.
  if (node.handlers) {
    print(node.handlers[0]);
  } else {
    print(node.handler);
  }

  if (node.finalizer) {
    this.space();
    this.push("finally ");
    print(node.finalizer);
  }
};

exports.CatchClause = function (node, print) {
  this.keyword("catch");
  this.push("(");
  print(node.param);
  this.push(") ");
  print(node.body);
};

exports.ThrowStatement = function (node, print) {
  this.push("throw ");
  print(node.argument);
  this.semicolon();
};

exports.SwitchStatement = function (node, print) {
  this.keyword("switch");
  this.push("(");
  print(node.discriminant);
  this.push(")");
  this.space();
  this.push("{");
  print.sequence(node.cases, { indent: true });
  this.push("}");
};

exports.SwitchCase = function (node, print) {
  if (node.test) {
    this.push("case ");
    print(node.test);
    this.push(":");
  } else {
    this.push("default:");
  }

  this.newline();
  print.sequence(node.consequent, { indent: true });
};

exports.DebuggerStatement = function () {
  this.push("debugger;");
};

exports.VariableDeclaration = function (node, print, parent) {
  this.push(node.kind + " ");

  var hasInits = false;
  // don't add whitespace to loop heads
  if (!t.isFor(parent)) {
    for (var i = 0; i < node.declarations.length; i++) {
      if (node.declarations[i].init) {
        // has an init so let's split it up over multiple lines
        hasInits = true;
      }
    }
  }

  var sep = ",";
  if (hasInits) {
    sep += "\n" + repeating(" ", node.kind.length + 1);
  } else {
    sep += " ";
  }

  print.list(node.declarations, { separator: sep });

  if (!t.isFor(parent)) {
    this.semicolon();
  }
};

exports.PrivateDeclaration = function (node, print) {
  this.push("private ");
  print.join(node.declarations, { separator: ", " });
  this.semicolon();
};

exports.VariableDeclarator = function (node, print) {
  if (node.init) {
    print(node.id);
    this.space();
    this.push("=");
    this.space();
    print(node.init);
  } else {
    print(node.id);
  }
};
