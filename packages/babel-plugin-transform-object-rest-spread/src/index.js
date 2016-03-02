export default function ({ types: t }) {
  function hasSpread(node) {
    for (let prop of node.properties) {
      if (t.isSpreadProperty(prop)) {
        return true;
      }
    }
    return false;
  }

  return {
    inherits: require("babel-plugin-syntax-object-rest-spread"),

    visitor: {
      ObjectExpression(path, file) {
        if (!hasSpread(path.node)) return;

        let args = [];
        let props = [];

        function push() {
          if (!props.length) return;
          args.push(t.objectExpression(props));
          props = [];
        }

        for (let prop of path.node.properties) {
          if (t.isSpreadProperty(prop)) {
            push();
            args.push(prop.argument);
          } else {
            props.push(prop);
          }
        }

        push();

        if (!t.isObjectExpression(args[0])) {
          args.unshift(t.objectExpression([]));
        }

        path.replaceWith(t.callExpression(file.addHelper("extends"), args));
      }
    }
  };
}
