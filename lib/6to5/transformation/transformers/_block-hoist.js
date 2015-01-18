"use strict";

var useStrict = require("../helpers/use-strict");
var _         = require("lodash");

// Priority:
//
//  - 0 We want this to be at the **very** bottom
//  - 1 Default node position
//  - 2 Priority over normal nodes
//  - 3 We want this to be at the **very** top

exports.BlockStatement =
exports.Program = {
  exit: function (node) {
    var hasChange = false;
    for (var i = 0; i < node.body.length; i++) {
      var bodyNode = node.body[i];
      if (bodyNode && bodyNode._blockHoist != null) hasChange = true;
    }
    if (!hasChange) return;

    useStrict.wrap(node, function () {
      var nodePriorities = _.groupBy(node.body, function (bodyNode) {
        var priority = bodyNode._blockHoist;
        if (priority == null) priority = 1;
        if (priority === true) priority = 2;
        return priority;
      });

      node.body = _.flatten(_.values(nodePriorities).reverse());
    });
  }
};
