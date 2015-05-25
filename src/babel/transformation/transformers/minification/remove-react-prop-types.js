export var metadata = {
  optional: true,
  group: "builtin-setup"
};

export var Property = {
  exit(node) {
    if (node.computed || node.key.name !== "propTypes") {
      return;
    }

    const parent = this.findParent((parent) => {
      return parent.type === "CallExpression";
    });

    if (parent && parent.get("callee").matchesPattern("React.createClass")) {
      this.remove();
    }
  }
};
