// https://github.com/sebmarkbage/ecmascript-rest-spread

import * as t from "babel-types";

export let metadata = {
  stage: 2,
  dependencies: ["es6.destructuring"]
};

let hasSpread = function (node) {
  for (let i = 0; i < node.properties.length; i++) {
    if (t.isSpreadProperty(node.properties[i])) {
      return true;
    }
  }
  return false;
};

export let visitor = {
  ObjectExpression(node, parent, scope, file) {
    if (!hasSpread(node)) return;

    let args = [];
    let props = [];

    let push = function () {
      if (!props.length) return;
      args.push(t.objectExpression(props));
      props = [];
    };

    for (let i = 0; i < node.properties.length; i++) {
      let prop = node.properties[i];
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

    return t.callExpression(file.addHelper("extends"), args);
  }
};
