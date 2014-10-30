var _ = require("lodash");

exports.Identifier = function (node) {
  return node.name;
};

exports.SpreadElement = function (node, print) {
  return "..." + print(node.argument);
};

exports.BlockStatement = function (node, print) {
  var body = this.removeEmptyExpressions(node.body);
  if (body.length === 0) {
    return "{}";
  } else {
    return "{\n" + this.indent(print.sequence(body)) + "\n}";
  }
};
exports.ObjectExpression =
exports.ObjectPattern = function (node, print) {
  var props = node.properties;
  var len   = props.length;
  if (!len) return "{}";

  var indent = this.indent;
  var parts  = ["{\n"];

  _.each(props, function (prop, i) {
    var part = indent(print(prop));

    if (i < len - 1) {
      // not the last item
      part += ",\n";
    }

    parts.push(part);
  });

  parts.push("\n}");

  return parts.join("");
};

exports.Property = function (node, print) {
  if (node.method || node.kind === "get" || node.kind === "set") {
    throw new Error("Property");
  } else {
    return print(node.key) + ": " + print(node.value);
  }
};

exports.ArrayExpression =
exports.ArrayPattern = function (node, print) {
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

exports.Literal = function (node) {
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
