import sortBy from "lodash/collection/sortBy";

export var metadata = {
  group: "builtin-trailing"
};

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

    node.body = sortBy(node.body, function(bodyNode){
      var priority = bodyNode && bodyNode._blockHoist;
      if (priority == null) priority = 1;
      if (priority === true) priority = 2;

      // Higher priorities should move toward the top.
      return -1 * priority;
    });
  }
};

export { BlockStatement as Program };
