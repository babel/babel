import { bare } from "../../helpers/name-method";

export let metadata = {
  group: "builtin-basic"
};

// visit Property functions first - https://github.com/babel/babel/issues/1860

export let visitor = {
  "ArrowFunctionExpression|FunctionExpression": {
    exit() {
      if (!this.parentPath.isProperty()) {
        return bare.apply(this, arguments);
      }
    }
  },

  ObjectExpression() {
    let props = this.get("properties");
    for (let prop of (props: Array)) {
      let value = prop.get("value");
      if (value.isFunction()) {
        let newNode = bare(value.node, prop.node, value.scope);
        if (newNode) value.replaceWith(newNode);
      }
    }
  }
};
