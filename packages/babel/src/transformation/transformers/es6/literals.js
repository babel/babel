export var metadata = {
  group: "builtin-pre"
};

export var visitor = {
  Literal(node) {
    // number octal like 0b10 or 0o70
    if (typeof node.value === "number" && node.raw[0] === "0" && (node.raw[1] === "o" || node.raw[1] === "b")) {
      node.raw = undefined;
    }

    // unicode escape
    if (typeof node.value === "string" && /\\[ux]/gi.test(node.raw)) {
      node.raw = undefined;
    }
  }
};
