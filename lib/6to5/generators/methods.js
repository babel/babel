exports._params = function (node, print) {
  this.push("(");
  this.printJoin(print, node.params, ", ");
  this.push(")");
};

exports._method = function (kind, key, value, print) {
  if (value.async) {
    this.push("async ");
  }

  if (!kind || kind === "init") {
    if (value.generator) {
      this.push("*");
    }
  } else {
    assert.ok(kind === "get" || kind === "set");
    this.push(kind + " ");
  }

  print(key);
  this._params(value, print);
  print(value.body);
};

exports.MethodDefinition = function (node, print) {
  if (node.static) {
    this.push("static ");
  }

  this._method(
    node.kind,
    node.key,
    node.value,
    print
  );
};

exports.ReturnStatement = function (node, print) {
  this.push("return");
  if (node.argument) {
    this.push(" ");
    print(node.argument);
  }
  this.push(";");
};

exports.FunctionDeclaration =
exports.FunctionExpression = function (node, print) {
  if (node.async) this.push("async ");
  this.push("function");
  if (node.generator) this.push("*");
  if (node.id) {
    this.push(" ");
    print(node.id);
    this.push(" ");
  }
  this._params(node, print);
  this.push(" ");
  print(node.body);
};

exports.ArrowFunctionExpression = function (node, print) {
  if (node.async) this.push("async ");
  if (node.params.length === 1) {
    print(node.params[0]);
  } else {
    this._params(node, print);
  }
  this.push(" => ");
  print(node.body);
};
