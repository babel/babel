import memoiseDecorators from "../../helpers/memoise-decorators";
import * as defineMap from "../../helpers/define-map";
import * as t from "../../../types";
import some from "lodash/collection/some";

export var metadata = {
  dependencies: ["es6.classes"],
  optional: true,
  stage: 1
};

/**
 * [Please add a description.]
 */

export var visitor = {

  /**
   * [Please add a description.]
   */

  ObjectExpression(node, parent, scope, file) {
    if (!some(node.properties, "decorators")) return;

    var mutatorMap = {};

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

    var obj = defineMap.toClassObject(mutatorMap);
    obj = defineMap.toComputedObjectFromClass(obj);
    return t.callExpression(file.addHelper("create-decorated-object"), [obj]);
  }
};
