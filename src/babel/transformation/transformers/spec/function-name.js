import { bare } from "../../helpers/name-method";

export var metadata = {
  group: "builtin-basic"
};

// visit Property functions first - https://github.com/babel/babel/issues/1860
export var visitor = {
  "ArrowFunctionExpression|FunctionExpression": {
    exit() {
      if (!this.parentPath.isProperty()) {
        return bare.apply(this, arguments);
      }
    }
  },

  ObjectExpression() {
    var props = this.get("properties");
    for (var prop of (props: Array)) {
      var value = prop.get("value");
      if (value.isFunction()) {
        var newNode = bare(value.node, prop.node, value.scope);
        if (newNode) value.replaceWith(newNode);
      }
    }
  }
};
