export default function ({ types: t }) {
  function getValue(prop) {
    if (t.isObjectProperty(prop)) {
      return prop.value;
    } else if (t.isObjectMethod(prop)) {
      return t.functionExpression(null, prop.params, prop.body, prop.generator, prop.async);
    }
  }

  function pushAssign(objId, prop, body) {
    body.push(t.expressionStatement(
      t.assignmentExpression(
        "=",
        t.memberExpression(objId, prop.key, prop.computed || t.isLiteral(prop.key)),
        getValue(prop)
      )
    ));
  }

  function loose(objId, body, computedProps: Array<Object>) {
    for (let prop of computedProps) {
      pushAssign(objId, prop, body);
    }
  }

  function spec(objId, body, computedProps: Array<Object>, initPropExpression, state) {
    for (let prop of computedProps) {
      let key = t.toComputedKey(prop);

      if (t.isStringLiteral(key, { value: "__proto__" })) {
        pushAssign(objId, prop, body);
      } else {
        if (computedProps.length === 1) {
          return t.callExpression(state.addHelper("defineProperty"), [
            initPropExpression,
            key,
            getValue(prop)
          ]);
        } else {
          body.push(t.expressionStatement(
            t.callExpression(state.addHelper("defineProperty"), [
              objId,
              key,
              getValue(prop)
            ])
          ));
        }
      }
    }
  }

  return {
    visitor: {
      ObjectExpression: {
        exit(path, state) {
          let { node, parent } = path;
          let hasComputed = false;
          for (let prop of (node.properties: Array<Object>)) {
            hasComputed = prop.kind !== "get" && prop.kind !== "set" && prop.computed === true;
            if (hasComputed) break;
          }
          if (!hasComputed) return;

          // put all getters/setters into the first object expression as well as all initialisers up
          // to the first computed property

          let initProps = [];
          let computedProps = [];
          let foundComputed = false;

          for (let prop of node.properties) {
            if (prop.computed) {
              foundComputed = true;
            }

            if (foundComputed && prop.kind !== "get" && prop.kind !== "set") {
              computedProps.push(prop);
            } else {
              initProps.push(prop);
            }
          }

          let objId = path.scope.generateUidIdentifierBasedOnNode(parent);
          let initPropExpression = t.objectExpression(initProps);
          let body = [];

          body.push(t.variableDeclaration("var", [
            t.variableDeclarator(objId, initPropExpression)
          ]));

          let callback = spec;
          if (state.opts.loose) callback = loose;

          let single = callback(objId, body, computedProps, initPropExpression, state);
          if (single) {
            path.replaceWith(single);
          } else {
            body.push(t.expressionStatement(objId));
            path.replaceWithMultiple(body);
          }
        }
      }
    }
  };
}
