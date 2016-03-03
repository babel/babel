export default function ({ types: t, template }) {
  let buildMutatorMapAssign = template(`
    MUTATOR_MAP_REF[KEY] = MUTATOR_MAP_REF[KEY] || {};
    MUTATOR_MAP_REF[KEY].KIND = VALUE;
  `);

  function getValue(prop) {
    if (t.isObjectProperty(prop)) {
      return prop.value;
    } else if (t.isObjectMethod(prop)) {
      return t.functionExpression(null, prop.params, prop.body, prop.generator, prop.async);
    }
  }

  function pushAssign(objId, prop, body) {
    if (prop.kind === "get" && prop.kind === "set") {
      pushMutatorDefine(objId, prop, body);
    } else {
      body.push(t.expressionStatement(
        t.assignmentExpression(
          "=",
          t.memberExpression(objId, prop.key, prop.computed || t.isLiteral(prop.key)),
          getValue(prop)
        )
      ));
    }
  }

  function pushMutatorDefine({ objId, body, getMutatorId, scope }, prop) {
    let key = !prop.computed && t.isIdentifier(prop.key) ? t.stringLiteral(prop.key.name) : prop.key;

    let maybeMemoise = scope.maybeGenerateMemoised(key);
    if (maybeMemoise) {
      body.push(t.expressionStatement(t.assignmentExpression("=", maybeMemoise, key)));
      key = maybeMemoise;
    }

    body.push(...buildMutatorMapAssign({
      MUTATOR_MAP_REF: getMutatorId(),
      KEY: key,
      VALUE: getValue(prop),
      KIND: t.identifier(prop.kind)
    }));
  }

  function loose(info) {
    for (let prop of info.computedProps) {
      if (prop.kind === "get" || prop.kind === "set") {
        pushMutatorDefine(info, prop);
      } else {
        pushAssign(info.objId, prop, info.body);
      }
    }
  }

  function spec(info) {
    let { objId, body, computedProps, state } = info;

    for (let prop of computedProps) {
      let key = t.toComputedKey(prop);

      if (prop.kind === "get" || prop.kind === "set") {
        pushMutatorDefine(info, prop);
      } else if (t.isStringLiteral(key, { value: "__proto__" })) {
        pushAssign(objId, prop, body);
      } else {
        if (computedProps.length === 1) {
          return t.callExpression(state.addHelper("defineProperty"), [
            info.initPropExpression,
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
          let { node, parent, scope } = path;
          let hasComputed = false;
          for (let prop of node.properties) {
            hasComputed = prop.computed === true;
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

            if (foundComputed) {
              computedProps.push(prop);
            } else {
              initProps.push(prop);
            }
          }

          let objId = scope.generateUidIdentifierBasedOnNode(parent);
          let initPropExpression = t.objectExpression(initProps);
          let body = [];

          body.push(t.variableDeclaration("var", [
            t.variableDeclarator(objId, initPropExpression)
          ]));

          let callback = spec;
          if (state.opts.loose) callback = loose;

          let mutatorRef;

          let getMutatorId = function () {
            if (!mutatorRef) {
              mutatorRef = scope.generateUidIdentifier("mutatorMap");

              body.push(t.variableDeclaration("var", [
                t.variableDeclarator(mutatorRef, t.objectExpression([]))
              ]));
            }

            return mutatorRef;
          };

          let single = callback({
            scope,
            objId,
            body,
            computedProps,
            initPropExpression,
            getMutatorId,
            state,
          });

          if (mutatorRef) {
            body.push(t.expressionStatement(t.callExpression(
              state.addHelper("defineEnumerableProperties"),
              [objId, mutatorRef]
            )));
          }

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
