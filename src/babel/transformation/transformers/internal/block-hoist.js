import groupBy from "lodash/collection/groupBy";
import flatten from "lodash/array/flatten";
import values from "lodash/object/values";

// Priority:
//
//  - 0 We want this to be at the **very** bottom
//  - 1 Default node position
//  - 2 Priority over normal nodes
//  - 3 We want this to be at the **very** top

export var BlockStatement = {
  exit(node) {
    var hasChange = false;
    for (var i = 0; i < node.body.length; i++) {
      var bodyNode = node.body[i];
      if (bodyNode && bodyNode._blockHoist != null) hasChange = true;
    }
    if (!hasChange) return;

    var nodePriorities = groupBy(node.body, function (bodyNode) {
      var priority = bodyNode && bodyNode._blockHoist;
      if (priority == null) priority = 1;
      if (priority === true) priority = 2;
      return priority;
    });

    node.body = flatten(values(nodePriorities).reverse());
  }
};

export { BlockStatement as Program };
