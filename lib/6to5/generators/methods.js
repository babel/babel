exports._params = function (node, print) {
  return "(" + node.params.map(print).join(", ") + ")";
};

exports._method = function (kind, key, value, print) {
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
    this._params(value, print),
    print(value.body)
  );

  return parts.join("");
};

exports.MethodDefinition = function (node, print) {
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

exports.ReturnStatement = function (node, print) {
  var code = "return";
  if (node.argument) {
    code += " " + print(node.argument);
  }
  code += ";";
  return code;
};

exports.FunctionDeclaration =
exports.FunctionExpression = function (node, print) {
  var code = "";
  if (node.async) code += "async ";
  code += "function";
  if (node.generator) code += "*";
  if (node.id) code += " " + print(node.id);
  code += this._params(node, print);
  code += " " + print(node.body);
  return code;
};

exports.ArrowFunctionExpression = function (node, print) {
  var code = "";
  if (node.async) code += "async ";
  if (node.params.length === 1) {
    code += print(node.params[0]);
  } else {
    code += this._params(node, print);
  }
  code += " => ";
  code += print(node.body);
  return code;
};
