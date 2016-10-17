export default function ({ types: t }) {
  function hasSpread(node) {
    for (let prop of (node.properties: Array<Object>)) {
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

        let useBuiltIns = file.opts.useBuiltIns || false;
        if (typeof useBuiltIns !== "boolean") {
          throw new Error("transform-object-rest-spread currently only accepts a boolean option for useBuiltIns (defaults to false)");
        }

        let args = [];
        let props = [];

        function push() {
          if (!props.length) return;
          args.push(t.objectExpression(props));
          props = [];
        }

        for (let prop of (path.node.properties: Array)) {
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

        const helper = useBuiltIns ?
          t.memberExpression(t.identifier("Object"), t.identifier("assign")) :
          file.addHelper("extends");

        path.replaceWith(t.callExpression(helper, args));
      }
    }
  };
}
