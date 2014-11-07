var t = require("../../types");

exports.WithStatement = function (node, print) {
  this.keyword("with");
  this.push("(");
  print(node.object);
  print.block(node.body);
};

exports.IfStatement = function (node, print) {
  this.keyword("if");
  this.push("(");
  print(node.test);
  this.push(") ");

  print.indentOnComments(node.consequent);

  if (node.alternate) {
    if (this.isLast("}")) this.space();
    this.keyword("else");
    print.indentOnComments(node.alternate);
  }
};

exports.ForStatement = function (node, print) {
  this.keyword("for");
  this.push("(");

  print(node.init);
  this.push(";");

  if (node.test) {
    this.space();
    print(node.test);
  }
  this.push(";");

  if (node.update) {
    this.space();
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

exports.ForInStatement = function (node, print) {
  this.keyword("for");
  this.push("(");
  print(node.left);
  this.push(" in ");
  print(node.right);
  this.push(")");
  print.block(node.body);
};

exports.ForOfStatement = function (node, print) {
  this.keyword("for");
  this.push("(");
  print(node.left);
  this.push(" of ");
  print(node.right);
  this.push(")");
  print.block(node.body);
};

exports.DoWhileStatement = function (node, print) {
  this.keyword("do");
  print(node.body);
  this.space();
  this.keyword("while");
  this.push("(");
  print(node.test);
  this.push(");");
};

exports.BreakStatement = function (node, print) {
  this.push("break");
  if (node.label) {
    this.space();
    print(node.label);
  }
  this.semicolon();
};

exports.ContinueStatement = function (node, print) {
  this.push("continue");
  if (node.label) {
    this.space();
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
  this.space();
  print(node.handler);
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
  this.push(") {");
  print.sequence(node.cases, { indent: true });
  this.push("}");

  //if (node.cases.length) {
  //  this.newline();
  //  print.sequence(node.cases, { indent: true });
  //  this.newline();
  //  this.rightBrace();
  //} else {
  //  this.push("}");
  //}
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
    this.space();
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

  print.join(node.declarations, { separator: ", " });

  if (!t.isFor(parent)) {
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
