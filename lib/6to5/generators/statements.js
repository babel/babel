exports.WithStatement = function (node, print) {
  return "with (" + print(node.object) + ") " + print(node.body);
};

exports.IfStatement = function (node, print) {
  var code = "if (" + print(node.test) + ") ";
  code += print(node.consequent);
  return code;
};

exports.ForStatement = function (node, print) {
  var code = "for (";
  code += print(node.init) + "; ";
  code += print(node.test) + "; ";
  code += print(node.update);
  code += ") ";
  code += print(node.body);
  return code;
};

exports.WhileStatement = function (node, print) {
  return "while (" + print(node.test) + ") " + print(node.body);
};

exports.ForInStatement = function (node, print) {
  var code = node.each ? "for each (" : "for (";
  code += print(node.left);
  code += " in ";
  code += print(node.right);
  code += ") ";
  code += print(node.body);
  return code;
};

exports.DoWhileStatement = function (node, print) {
  var code = "do " + print(node.body);
  if (/\}$/.test(code)) {
    code += " while";
  } else {
    code += "\nwhile";
  }
  code += " (" + print(node.test) + ");";
  return code;
};

exports.BreakStatement = function (node, print) {
  var code = "break";
  if (node.label) code += " " + print(node.label);
  code += ";";
  return code;
};

exports.ContinueStatement = function (node, print) {
  var code = "continue";
  if (node.label) code += " " + print(node.label);
  code += ";";
  return code;
};

exports.LabeledStatement = function (node, print) {
  return print(node.label) + ":\n" + print(node.body);
};

exports.TryStatement = function (node, print) {
  var code = "try " + print(node.block);
  code += " " + print(node.handler);
  if (node.finalizer) {
    code += " finally " + print(node.finalizer);
  }
  return code;
};

exports.CatchClause = function (node, print) {
  var code = "catch (" + print(node.param);
  if (node.guard) {
    code += " if " + print(node.guard);
  }
  code += ") " + print(node.body);
  return code;
};

exports.ThrowStatement = function (node, print) {
  return "throw " + print(node.argument) + ";";
};

exports.SwitchStatement = function (node, print) {
  var code = "switch (";
  code += print(node.discriminant);
  code += ") {";
  if (node.cases.length > 0) {
    code += "\n" + node.cases.map(print).join("\n") + "\n";
  }
  code += "}";
  return code;
};

exports.SwitchCase = function (node, print) {
  var code = "";
  if (node.test) {
    code += "case " + print(node.test) + ":";
  } else {
    code += "default:";
  }
  if (node.consequent.length === 1) {
    code += " " + print(node.consequent[0]);
  } else if (node.consequent.length > 1) {
    code += "\n" + this.indent(print.sequence(node.consequent));
  }
  return this.indent(code);
};

exports.DebuggerStatement = function () {
  return "debugger;";
};

exports.ForOfStatement = function (node, print) {
  throw new Error("ForOfStatement");
};

exports.VariableDeclaration = function (node, print, parent) {
  var code = node.kind + " ";
  var maxLen = 0;

  var printed = node.declarations.map(function (declar) {
    var lines = print(declar);
    maxLen = Math.max(maxLen, lines.length);
    return lines;
  });

  switch (maxLen) {
    case 0:
      code += printed[0];
      break;

    default:
      code += printed.join(",\n  ");
      break;
  }

  if (
    parent.type !== "ForStatement" &&
    parent.type !== "ForInStatement" &&
    parent.type !== "ForOfStatement" &&
    parent.type !== "ForOfStatement"
  ) {
    code += ";";
  }
  return code;
};

exports.VariableDeclarator = function (node, print) {
  if (node.init) {
    return print(node.id) + " = " + print(node.init);
  } else {
    return print(node.id);
  }
};
