import { bare } from "../../helpers/name-method";

export var metadata = {
  group: "builtin-basic"
};

// visit Property functions first - https://github.com/babel/babel/issues/1860

/**
 * [Please add a description.]
 */

export var visitor = {

  /**
   * [Please add a description.]
   */

  "ArrowFunctionExpression|FunctionExpression": {
    exit() {
      if (!this.parentPath.isProperty()) {
        return bare.apply(this, arguments);
      }
    }
  },

  /**
   * [Please add a description.]
   */

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
