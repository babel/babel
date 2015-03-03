import each from "lodash/collection/each";

export function Identifier(node) {
  this.push(node.name);
}

export function RestElement(node, print) {
  this.push("...");
  print(node.argument);
}

export { RestElement as SpreadElement, RestElement as SpreadProperty };

export function VirtualPropertyExpression(node, print) {
  print(node.object);
  this.push("::");
  print(node.property);
}

export function ObjectExpression(node, print) {
  var props = node.properties;

  if (props.length) {
    this.push("{");
    this.space();

    print.list(props, { indent: true });

    this.space();
    this.push("}");
  } else {
    this.push("{}");
  }
}

export { ObjectExpression as ObjectPattern };

export function Property(node, print) {
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

    this.push(":");
    this.space();
    print(node.value);
  }
}

export function ArrayExpression(node, print) {
  var elems = node.elements;
  var len   = elems.length;

  this.push("[");

  each(elems, (elem, i) => {
    if (!elem) {
      // If the array expression ends with a hole, that hole
      // will be ignored by the interpreter, but if it ends with
      // two (or more) holes, we need to write out two (or more)
      // commas so that the resulting code is interpreted with
      // both (all) of the holes.
      this.push(",");
    } else {
      if (i > 0) this.push(" ");
      print(elem);
      if (i < len - 1) this.push(",");
    }
  });

  this.push("]");
}

export { ArrayExpression as ArrayPattern };

export function Literal(node) {
  var val  = node.value;
  var type = typeof val;

  if (type === "string") {
    this._stringLiteral(val);
  } else if (type === "number") {
    this.push(val + "");
  } else if (type === "boolean") {
    this.push(val ? "true" : "false");
  } else if (node.regex) {
    this.push(`/${node.regex.pattern}/${node.regex.flags}`);
  } else if (val === null) {
    this.push("null");
  }
}

export function _stringLiteral(val) {
  val = JSON.stringify(val);

  // escape illegal js but valid json unicode characters
  val = val.replace(/[\u000A\u000D\u2028\u2029]/g, function (c) {
    return "\\u" + ("0000" + c.charCodeAt(0).toString(16)).slice(-4);
  });

  this.push(val);
}
