var _ = require("lodash");

exports.Identifier = function (node) {
  this.push(node.name);
};

exports.SpreadElement = function (node, print) {
  this.push("...");
  print(node.argument);
};

exports.ObjectExpression =
exports.ObjectPattern = function (node, print) {
  var props = node.properties;

  if (props.length) {
    this.push("{");
    this.space();

    print.join(props, { separator: ", ", indent: true });

    this.space();
    this.push("}");
  } else {
    this.push("{}");
  }
};

exports.Property = function (node, print) {
  if (node.method || node.kind === "get" || node.kind === "set") {
    this._method(node, print);
  } else {
    if (node.computed) {
      this.push("[");
      print(node.key);
      this.push("]");
    } else {
      print(node.key);
      if (node.shorthand) return;
    }

    this.push(": ");
    print(node.value);
  }
};

exports.ArrayExpression =
exports.ArrayPattern = function (node, print) {
  var elems = node.elements;
  var self  = this;
  var len   = elems.length;

  this.push("[");

  _.each(elems, function (elem, i) {
    if (!elem) {
      // If the array expression ends with a hole, that hole
      // will be ignored by the interpreter, but if it ends with
      // two (or more) holes, we need to write out two (or more)
      // commas so that the resulting code is interpreted with
      // both (all) of the holes.
      self.push(",");
    } else {
      if (i > 0) self.push(" ");
      print(elem);
      if (i < len - 1) self.push(",");
    }
  });

  this.push("]");
};

exports.Literal = function (node) {
  var val  = node.value;
  var type = typeof val;

  if (type === "boolean" || type === "number" || type === "string") {
    this.push(JSON.stringify(val));
  } else if (node.regex) {
    this.push("/" + node.regex.pattern + "/" + node.regex.flags);
  } else if (val === null) {
    this.push("null");
  } else if (node.raw) {
    this.push(node.raw);
  }
};
