var _ = require("lodash");

exports.WithStatement = function (node, print) {
  this.push("with (");
  print(node.object);
  this.push(") ");
  print(node.body);
};

exports.IfStatement = function (node, print) {
  this.push("if (");
  print(node.test);
  this.push(") ");
  print(node.consequent);
};

exports.BlockStatement = function (node, print) {
  var body = this.removeEmptyExpressions(node.body);
  if (body.length === 0) {
    this.push("{}");
  } else {
    this.push("{");
    this.newline();
    this.indent();
    print.sequence(body);
    this.dedent();
    this.newline();
    this.push("}");
  }
};

exports.ForStatement = function (node, print) {
  this.push("for (");

  print(node.init);
  this.push("; ");

  print(node.test);
  this.push("; ");

  print(node.update);
  this.push(") ");

  print(node.body);
};

exports.WhileStatement = function (node, print) {
  this.push("while (");
  print(node.test);
  this.push(") ");
  print(node.body);
};

exports.ForInStatement = function (node, print) {
  this.push(node.each ? "for each (" : "for (");
  print(node.left);
  this.push(" in ");
  print(node.right);
  this.push(") ");
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
  this.push(";");
};

exports.ContinueStatement = function (node, print) {
  this.push("continue");
  if (node.label) {
    this.push(" ");
    print(node.label);
  }
  this.push(";");
};

exports.LabeledStatement = function (node, print) {
  print(node.label);
  this.push(":");
  this.newline();
  print(node.body);
};

exports.TryStatement = function (node, print) {
  this.push("try ");
  print(node.block);
  this.push(" ");
  print(node.handler);
  if (node.finalizer) {
    this.push(" finally ");
    print(node.finalizer);
  }
};

exports.CatchClause = function (node, print) {
  this.push("catch (");
  print(node.param);
  this.push(") ");
  print(node.body);
};

exports.ThrowStatement = function (node, print) {
  this.push("throw ");
  print(node.argument)
  this.push(";");
};

exports.SwitchStatement = function (node, print) {
  this.push("switch (");
  print(node.discriminant);
  this.push(") {");
  if (node.cases.length > 0) {
    this.newline();
    this.printJoin(print, node.cases, "\n");
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

  this.indent();
  if (node.consequent.length === 1) {
    this.push(" ");
    print(node.consequent[0]);
  } else if (node.consequent.length > 1) {
    this.newline();
    print.sequence(node.consequent);
  }
  this.dedent();
};

exports.DebuggerStatement = function () {
  this.push("debugger;");
};

exports.ForOfStatement = function (node, print) {
  throw new Error("ForOfStatement");
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
    this.push(";");
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
