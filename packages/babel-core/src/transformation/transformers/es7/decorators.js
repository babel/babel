import memoiseDecorators from "../../helpers/memoise-decorators";
import * as defineMap from "../../helpers/define-map";
import * as t from "babel-types";

export let metadata = {
  dependencies: ["es6.classes"],
  optional: true,
  stage: 1
};

export let visitor = {
  ObjectExpression(node, parent, scope, file) {
    let hasDecorators = false;
    for (let i = 0; i < node.properties.length; i++) {
      let prop = node.properties[i];
      if (prop.decorators) {
        hasDecorators = true;
        break;
      }
    }
    if (!hasDecorators) return;

    let mutatorMap = {};

    for (let i = 0; i < node.properties.length; i++) {
      let prop = node.properties[i];
      if (prop.decorators) memoiseDecorators(prop.decorators, scope);


      if (prop.kind === "init" && !prop.method) {
        prop.kind = "";
        prop.value = t.functionExpression(null, [], t.blockStatement([
          t.returnStatement(prop.value)
        ]));
      }

      defineMap.push(mutatorMap, prop, "initializer", file);
    }

    let obj = defineMap.toClassObject(mutatorMap);
    obj = defineMap.toComputedObjectFromClass(obj);
    return t.callExpression(file.addHelper("create-decorated-object"), [obj]);
  }
};
