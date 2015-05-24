import * as t from "../../../types";

export var metadata = {
  optional: true,
  group: "builtin-setup"
};

export var Property = {
  exit(node) {
    if (node.key.name === 'propTypes') {
      this.remove();
    }
  }
};
