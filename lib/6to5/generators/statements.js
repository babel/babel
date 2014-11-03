var t = require("../types");
var _ = require("lodash");

exports.WithStatement = function (node, print) {
  this.keyword("with");
  this.push("(");
  print(node.object);
  this.push(") ");
  print(node.body);
};

exports.IfStatement = function (node, print) {
  this.keyword("if");
  this.push("(");
  print(node.test);
  this.push(") ");

  print(node.consequent);

  if (node.alternate) {
    if (this.isLast("}")) this.push(" ");
    this.keyword("else");
    print(node.alternate);
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

  this.push(") ");

  print(node.body);
};

exports.WhileStatement = function (node, print) {
  this.keyword("while");
  this.push("(");
  print(node.test);
  this.push(") ");
  print(node.body);
};

exports.ForInStatement = function (node, print) {
  this.keyword("for");
  this.push("(");
  print(node.left);
  this.push(" in ");
  print(node.right);
  this.push(") ");
  print(node.body);
};

exports.ForOfStatement = function (node, print) {
  this.keyword("for");
  this.push("(");
  print(node.left);
  this.push(" of ");
  print(node.right);
  this.push(")");
  print(node.body);
};

exports.DoWhileStatement = function (node, print) {
  this.push("do ");
  print(node.body);
  this.push(" while");
  this.push(" (");
  print(node.test);
  this.push(");");
};

exports.BreakStatement = function (node, print) {
  this.push("break");
  if (node.label) {
    this.push(" ");
    print(node.label);
  }
  this.semicolon();
};

exports.ContinueStatement = function (node, print) {
  this.push("continue");
  if (node.label) {
    this.push(" ");
    print(node.label);
  }
  this.semicolon();
};

exports.LabeledStatement = function (node, print) {
  print(node.label);
  this.push(": ");
  print(node.body);
};

exports.TryStatement = function (node, print) {
  this.keyword("try");
  print(node.block);
  this.push(" ");
  print(node.handler);
  if (node.finalizer) {
    this.push(" finally ");
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
  print(node.argument)
  this.semicolon();
};

exports.SwitchStatement = function (node, print) {
  this.keyword("switch");
  this.push("(");
  print(node.discriminant);
  this.push(") {");

  if (node.cases.length > 0) {
    this.newline();
    print.sequence(node.cases, { indent: true });
    this.newline();
  }

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

  if (node.consequent.length === 1) {
    this.push(" ");
    print(node.consequent[0]);
  } else if (node.consequent.length > 1) {
    this.newline();
    print.sequence(node.consequent, { indent: true });
  }
};

exports.DebuggerStatement = function () {
  this.push("debugger;");
};

exports.VariableDeclaration = function (node, print, parent) {
  this.push(node.kind + " ");

  this.printJoin(print, node.declarations, ", ");

  if (
    parent.type !== "ForStatement" &&
    parent.type !== "ForInStatement" &&
    parent.type !== "ForOfStatement" &&
    parent.type !== "ForOfStatement"
  ) {
    this.semicolon();
  }
};

exports.VariableDeclarator = function (node, print) {
  if (node.init) {
    print(node.id);
    this.push(" = ");
    print(node.init);
  } else {
    print(node.id);
  }
};
