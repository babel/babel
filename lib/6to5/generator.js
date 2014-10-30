module.exports = function (ast, opts) {
  var gen = new CodeGenerator;
  return gen.generate(ast, opts);
};

var _ = require("lodash");

function CodeGenerator() {
  this.indent = this.indent.bind(this);
  this.print  = this.print.bind(this);
}

CodeGenerator.prototype.generate = function (ast, opts) {
  opts = opts || {};
  return {
    map:  null,
    ast:  ast,
    code: this.print(ast)
  };
};

CodeGenerator.prototype.buildPrint = function (parent) {
  var self = this;

  var print = function (node) {
    return self.print(node, parent);
  };

  print.sequence = function (nodes) {
    return self.printSequence(nodes, print);
  };

  return print;
};

CodeGenerator.prototype.print = function (node, parent) {
  if (!node) return "";

  if (this[node.type]) {
    return this[node.type](node, this.buildPrint(node), parent);
  } else {
    throw new ReferenceError("unknown node " + node.type + " " + JSON.stringify(node));
  }
};

CodeGenerator.prototype.printSequence = function (nodes, print) {
  return nodes.map(print).join("\n");
};

CodeGenerator.prototype.removeEmptyExpressions = function (nodes) {
  return nodes.filter(function (node) {
    if (node.type === "EmptyStatement") {
      return false;
    } else {
      return true;
    }
  });
};

CodeGenerator.prototype.indent = function (str) {
  return str.split("\n").map(function (line) {
    return "  " + line;
  }).join("\n");
};

CodeGenerator.prototype.File = function (node, print) {
  return print(node.program);
};

CodeGenerator.prototype.Program = function (node, print) {
  return print.sequence(node.body);
};

CodeGenerator.prototype.EmptyStatement = function (node, print) {
  return "";
};

CodeGenerator.prototype.ExpressionStatement = function (node, print) {
  return print(node.expression) + ";";
};

CodeGenerator.prototype.BinaryExpression =
CodeGenerator.prototype.LogicalExpression =
CodeGenerator.prototype.AssignmentExpression = function (node, print) {
  return print(node.left) + " " + node.operator + " " + print(node.right);
};

CodeGenerator.prototype.MemberExpression = function (node, print) {
  var code = this._maybeParans(node.object, print);

  if (node.computed) {
    code += "[" + print(node.property) + "]";
  } else {
    code += "." + print(node.property);
  }

  return code;
};

CodeGenerator.prototype.Path = function (node, print) {
  return "." + print(node.body);
};

CodeGenerator.prototype.Identifier = function (node, print) {
  return node.name;
};

CodeGenerator.prototype.SpreadElement =
CodeGenerator.prototype.SpreadElementPattern =
CodeGenerator.prototype.SpreadProperty =
CodeGenerator.prototype.SpreadPropertyPattern = function (node, print) {
  return "..." + print(node.argument);
};

CodeGenerator.prototype.FunctionDeclaration =
CodeGenerator.prototype.FunctionExpression = function (node, print) {
  var code = "";
  if (node.async) code += "async ";
  code += "function";
  if (node.generator) code += "*";
  if (node.id) code += " " + print(node.id);
  code += "(" + node.params.map(print).join(", ") + ")";
  code += " " + print(node.body);
  return code;
};

CodeGenerator.prototype.ArrowFunctionExpression = function (node, print) {
  var code = "";
  if (node.async) code += "async ";
  if (node.params.length === 1) {
    code += print(node.params[0]);
  } else {
    code += "(" + node.params.map(this.buildPrint(node)).join(", ") + ")";
  }
  code += " => ";
  code += print(node.body);
  return code;
};

CodeGenerator.prototype.MethodDefinition = function (node, print) {
  throw new Error("MethodDefinition");
};

CodeGenerator.prototype.YieldExpression = function (node, print) {
  var code = "yield";
  if (node.delegate) code += "*";
  if (node.argument) code += " " + print(node.argument);
  return code;
};

CodeGenerator.prototype.AwaitExpression = function (node, print) {
  var code = "await";
  if (node.all) code += "*";
  if (node.argument) code += print(node.argument);
  return code;
};

CodeGenerator.prototype.ModuleDeclaration = function (node, print) {
  var code = "module " + print(node.id);
  if (node.source) {
    code += " from " + print(node.source);
  } else {
    code += print(node.body);
  }
  return code;
};

CodeGenerator.prototype.ImportSpecifier =
CodeGenerator.prototype.ExportSpecifier = function (node, print) {
  var code = print(node.id);
  if (node.name) code += " as " + print(node.name);
  return code;
};

CodeGenerator.prototype.ExportBatchSpecifier = function (node, print) {
  return "*";
};

CodeGenerator.prototype.ExportDeclaration = function (node, print) {
  throw new Error("ExportDeclaration");
};

CodeGenerator.prototype.ImportDeclaration = function (node, print) {
  throw new Error("ImportDeclaration");
};

CodeGenerator.prototype.BlockStatement = function (node, print) {
  var body = this.removeEmptyExpressions(node.body);
  if (body.length === 0) {
    return "{}";
  } else {
    return "{\n" + this.indent(print.sequence(body)) + "\n}";
  }
};

CodeGenerator.prototype.ReturnStatement = function (node, print) {
  var code = "return";
  if (node.argument) {
    code += " " + print(node.argument);
  }
  code += ";";
  return code;
};

CodeGenerator.prototype._maybeParans = function (node, print) {
  var code = print(node);
  if (node.type === "AssignmentExpression" ||
      node.type === "FunctionExpression" ||
      node.type === "BinaryExpression") {
    code = "(" + code + ")";
  }
  return code;
};

CodeGenerator.prototype.CallExpression = function (node, print) {
  var code = "";
  code += this._maybeParans(node.callee, print);
  code += "(" + node.arguments.map(this.buildPrint(node)).join(", ") + ")";
  return code;
};

CodeGenerator.prototype.ObjectExpression =
CodeGenerator.prototype.ObjectPattern = function (node, print) {
  var allowBreak = false;
  var indent     = this.indent;
  var parts      = [len > 0 ? "{\n" : "{"];
  var len        = node.properties.length;

  _.each(node.properties, function (prop, i) {
    var lines = indent(print(prop));

    var multiLine = lines.length > 1;
    if (multiLine && allowBreak) {
      // Similar to the logic for BlockStatement.
      parts.push("\n");
    }

    parts.push(lines);

    if (i < len - 1) {
      // Add an extra line break if the previous object property
      // had a multi-line value.
      parts.push(multiLine ? ",\n\n" : ",\n");
      allowBreak = !multiLine;
    }
  });

  parts.push(len > 0 ? "\n}" : "}");

  return parts.join("\n");
};

CodeGenerator.prototype.PropertyPattern = function (node, print) {
  return print(node.key) + ": " + print(node.pattern);
};

CodeGenerator.prototype.Property = function (node, print) {
  if (node.method || node.kind === "get" || node.kind === "set") {
    throw new Error("Property");
  } else {
    return print(node.key) + ": " + print(node.value);
  }
};

CodeGenerator.prototype.ArrayExpression =
CodeGenerator.prototype.ArrayPattern = function (node, print) {
  var elems = node.elements;
  var parts = ["["];
  var len   = elems.length;

  _.each(elems, function(elem, i) {
    if (!elem) {
      // If the array expression ends with a hole, that hole
      // will be ignored by the interpreter, but if it ends with
      // two (or more) holes, we need to write out two (or more)
      // commas so that the resulting code is interpreted with
      // both (all) of the holes.
      parts.push(",");
    } else {
      if (i > 0) parts.push(" ");
      parts.push(print(elem));
      if (i < len - 1) parts.push(",");
    }
  });

  parts.push("]");

  return parts.join("");
};

CodeGenerator.prototype.SequenceExpression = function (node, print) {
  return node.expressions.map(print).join(", ");
};

CodeGenerator.prototype.ThisExpression = function (node, print) {
  return "this";
};

CodeGenerator.prototype.Literal = function (node, print) {
  var val  = node.value;
  var type = typeof val;

  if (type === "string" || type === "number" || type === "boolean") {
    return JSON.stringify(val);
  }

  if (node.regex) {
    return "/" + node.regex.pattern + "/" + node.regex.flags;
  }

  if (val === null) {
    return "null";
  }

  if (node.raw) {
    return node.raw;
  }
};

CodeGenerator.prototype.ModuleSpecifier = function (node, print) {
  return "\"" + node.value + "\"";
};

CodeGenerator.prototype.UnaryExpression = function (node, print) {
  var code = node.operator;
  if (/[a-z]$/.test(node.operator)) code += " ";
  code += this._maybeParans(node.argument, print);
  return code;
};

CodeGenerator.prototype.UpdateExpression = function (node, print) {
  var parts = [print(node.argument)];
  parts.push(node.operator);
  if (node.prefix) parts.reverse();
  return parts.join("");
};

CodeGenerator.prototype.ConditionalExpression = function (node, print) {
  var code = "(";
  code += print(node.test);
  code += " ? ";
  code += print(node.consequent);
  code += " : ";
  code += print(node.alternate);
  code += ")";
  return code;
};

CodeGenerator.prototype.NewExpression = function (node, print) {
  var code = "new ";
  code += print(node.callee);
  if (node.arguments) {
    code += "(" + node.arguments.map(print).join(", ") + ")";
  }
  return code;
};

CodeGenerator.prototype.VariableDeclaration = function (node, print, parent) {
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

CodeGenerator.prototype.VariableDeclarator = function (node, print) {
  if (node.init) {
    return print(node.id) + " = " + print(node.init);
  } else {
    return print(node.id);
  }
};

CodeGenerator.prototype.WithStatement = function (node, print) {
  return "with (" + print(node.object) + ") " + print(node.body);
};

CodeGenerator.prototype.IfStatement = function (node, print) {
  var code = "if (" + print(node.test) + ") ";
  code += print(node.consequent);
  return code;
};

CodeGenerator.prototype.ForStatement = function (node, print) {
  var code = "for (";
  code += print(node.init) + "; ";
  code += print(node.test) + "; ";
  code += print(node.update);
  code += ") ";
  code += print(node.body);
  return code;
};

CodeGenerator.prototype.WhileStatement = function (node, print) {
  return "while (" + print(node.test) + ") " + print(node.body);
};

CodeGenerator.prototype.ForInStatement = function (node, print) {
  var code = node.each ? "for each (" : "for (";
  code += print(node.left);
  code += " in ";
  code += print(node.right);
  code += ") ";
  code += print(node.body);
  return code;
};

CodeGenerator.prototype.DoWhileStatement = function (node, print) {
  var code = "do " + print(node.body);
  if (/\}$/.test(code)) {
    code += " while";
  } else {
    code += "\nwhile";
  }
  code += " (" + print(node.test) + ");";
  return code;
};

CodeGenerator.prototype.BreakStatement = function (node, print) {
  var code = "break";
  if (node.label) code += " " + print(node.label);
  code += ";";
  return code;
};

CodeGenerator.prototype.ContinueStatement = function (node, print) {
  var code = "continue";
  if (node.label) code += " " + print(node.label);
  code += ";";
  return code;
};

CodeGenerator.prototype.LabeledStatement = function (node, print) {
  return print(node.label) + ":\n" + print(node.body);
};

CodeGenerator.prototype.TryStatement = function (node, print) {
  var code = "try " + print(node.block);
  code += " " + print(node.handler);
  if (node.finalizer) {
    code += " finally " + print(node.finalizer);
  }
  return code;
};

CodeGenerator.prototype.CatchClause = function (node, print) {
  var code = "catch (" + print(node.param);
  if (node.guard) {
    code += " if " + print(node.guard);
  }
  code += ") " + print(node.body);
  return code;
};

CodeGenerator.prototype.ThrowStatement = function (node, print) {
  return "throw " + print(node.argument) + ";";
};

CodeGenerator.prototype.SwitchStatement = function (node, print) {
  var code = "switch (";
  code += print(node.discriminant);
  code += ") {";
  if (node.cases.length > 0) {
    code += "\n" + node.cases.map(print).join("\n") + "\n";
  }
  code += "}";
  return code;
};

CodeGenerator.prototype.SwitchCase = function (node, print) {
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

CodeGenerator.prototype.DebuggerStatement = function (node, print) {
  return "debugger;";
};

CodeGenerator.prototype.ClassExpression =
CodeGenerator.prototype.ClassDeclaration = function (node, print) {
  var parts = ["class"];

  if (node.id) parts.push(" ", print(node.id));

  if (node.superClass) parts.push(" extends ", print(node.superClass));

  parts.push(" ", print(node.body));

  return parts.join("");
};

CodeGenerator.prototype.ClassBody = function (node, print) {
  if (node.body.length === 0) {
    return "{}";
  }

  return [
    "{\n",
    this.indent(node.body.map(print).join("")),
    "\n}"
  ].join("");
};

CodeGenerator.prototype._method = function (kind, key, value, print) {
  var parts = [];

  if (value.async) {
    parts.push("async ");
  }

  if (!kind || kind === "init") {
    if (value.generator) {
      parts.push("*");
    }
  } else {
    assert.ok(kind === "get" || kind === "set");
    parts.push(kind, " ");
  }

  parts.push(
    print(key),
    "(" + value.params.map(print).join(", ") + ")",
    print(value.body)
  );

  return parts.join("");
};

CodeGenerator.prototype.MethodDefinition = function (node, print) {
  var parts = [];

  if (node.static) {
    parts.push("static ");
  }

  parts.push(this._method(
    node.kind,
    node.key,
    node.value,
    print
  ));

  return parts.join("");
};

CodeGenerator.prototype.XJSAttribute = function (node, print) {
  var code = print(node.name);
  if (node.value) code += "=" + print(node.value);
  return code;
};

CodeGenerator.prototype.XJSIdentifier = function (node, print) {
  return node.name;
};

CodeGenerator.prototype.XJSNamespacedName = function (node, print) {
  return print(node.namespace) + ":" + print(node.name);
};

CodeGenerator.prototype.XJSMemberExpression = function (node, print) {
  return print(node.object) + "." + print(node.property);
};

CodeGenerator.prototype.XJSSpreadAttribute = function (node, print) {
  return "{..." + print(node.argument) + "}";
};

CodeGenerator.prototype.XJSExpressionContainer = function (node, print) {
  return "{" + print(node.expression) + "}";
};

CodeGenerator.prototype.XJSElement = function (node, print) {
  throw new Error("XJSElement");
};

CodeGenerator.prototype.XJSOpeningElement = function (node, print) {
  var code = "<" + print(node.name);
  if (node.attributes.length < 0) {
    code += " " + node.attributes.map(print).join(" ");
  }
  code += node.selfClosing ? " />" : ">";
  return code;
};

CodeGenerator.prototype.XJSClosingElement = function (node, print) {
  return "</" + node.name + ">";
};

CodeGenerator.prototype.XJSText = function (node, print) {
  return node.value;
};

CodeGenerator.prototype.XJSEmptyExpression = function (node, print) {
  return "";
};
