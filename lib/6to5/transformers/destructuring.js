var util = require("../util");
var _    = require("lodash");

var isPattern = function (id) {
  return id.type === "ArrayPattern" || id.type === "ObjectPattern";
};

exports.VariableDeclaration = function (node, parent, opts, generateUid) {
  var nodes = [];

  var hasPattern = false;
  _.each(node.declarations, function (declar) {
    if (isPattern(declar.id)) {
      hasPattern = true;
      return false;
    }
  });
  if (!hasPattern) return;

  //

  var buildVariableAssign = function (id, init) {
    return {
      type: "VariableDeclaration",
      kind: node.kind,
      declarations: [{
        type: "VariableDeclarator",
        id: id,
        init: init
      }]
    };
  };

  var push = function (pattern, parentId) {
    if (pattern.type === "ObjectPattern") {
      pushObjectPattern(pattern, parentId);
    } else if (pattern.type === "ArrayPattern") {
      pushArrayPattern(pattern, parentId);
    }
  };

  var pushObjectPattern = function (pattern, parentId) {
    _.each(pattern.properties, function (prop) {
      var id = prop.value;

      var init = {
        type: "MemberExpression",
        object: parentId,
        property: prop.key
      };

      if (isPattern(id)) {
        push(id, init);
      } else {
        nodes.push(buildVariableAssign(id, init));
      }
    });
  };

  var pushArrayPattern = function (pattern, parentId) {
    _.each(pattern.elements, function (id, i) {
      var init = {
        type: "MemberExpression",
        computed: true,
        object: parentId,
        property: {
          type: "Literal",
          value: i
        }
      };

      if (id.type === "Identifier") {
        nodes.push(buildVariableAssign(id, init));
      } else {
        push(id, init);
      }
    });
  };

  var pushPattern = function (id, init) {
    if (init.type !== "MemberExpression" && init.type !== "Identifier") {
      var key = generateUid("ref");

      nodes.push(util.template("variable-assign", {
        KEY: key,
        VALUE: init
      }, true));

      init = {
        type: "Identifier",
        name: key
      };
    }

    push(id, init);
  };

  //

  _.each(node.declarations, function (declar) {
    var init = declar.init;
    var id   = declar.id;

    if (isPattern(id)) {
      pushPattern(id, init);
    } else {
      nodes.push(buildVariableAssign(id, init));
    }
  });

  return nodes;
};
