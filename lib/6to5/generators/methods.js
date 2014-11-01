exports._params = function (node, print) {
  var self = this;

  this.push("(");

  this.printJoin(print, node.params, ", ", {
    iterator: function (param, i) {
      var def = node.defaults && node.defaults[i];
      if (def) {
        self.push(" = ");
        print(def);
      }
    }
  });

  if (node.rest) {
    if (node.params.length) {
      this.push(", ");
    }

    this.push("...");
    print(node.rest);
  }

  this.push(")");
};

exports._method = function (node, print) {
  var value = node.value;
  var kind  = node.kind;
  var key   = node.key;

  if (!kind || kind === "init") {
    if (value.generator) {
      this.push("*");
    }
  } else {
    this.push(kind + " ");
  }

  if (node.computed) {
    this.push("[");
    print(key);
    this.push("]");
  } else {
    print(key);
  }

  this._params(value, print);
  print(value.body);
};

exports.MethodDefinition = function (node, print) {
  if (node.static) {
    this.push("static ");
  }

  this._method(node, print);
};

exports.ReturnStatement = function (node, print) {
  this.push("return");
  if (node.argument) {
    this.push(" ");
    print(node.argument);
  }
  this.semicolon();
};

exports.FunctionDeclaration =
exports.FunctionExpression = function (node, print) {
  this.push("function");
  if (node.generator) this.push("*");
  this.push(" ");
  if (node.id) print(node.id);
  this._params(node, print);
  this.push(" ");
  print(node.body);
};

exports.ArrowFunctionExpression = function (node, print) {
  if (node.params.length === 1 && !node.defaults.length && !node.rest && node.params[0].type === "Identifier") {
    print(node.params[0]);
  } else {
    this._params(node, print);
  }

  this.push(" => ");
  print(node.body);
};
