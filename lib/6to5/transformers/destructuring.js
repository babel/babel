var util = require("../util");
var b    = require("ast-types").builders;
var _    = require("lodash");

var isPattern = function (id) {
  return id.type === "ArrayPattern" || id.type === "ObjectPattern";
};


var buildVariableAssign = function (kind, id, init) {
  return b.variableDeclaration(kind, [
    b.variableDeclarator(id, init)
  ]);
};

var push = function (kind, nodes, pattern, parentId) {
  if (pattern.type === "ObjectPattern") {
    pushObjectPattern(kind, nodes, pattern, parentId);
  } else if (pattern.type === "ArrayPattern") {
    pushArrayPattern(kind, nodes, pattern, parentId);
  }
};

var pushObjectPattern = function (kind, nodes, pattern, parentId) {
  _.each(pattern.properties, function (prop) {
    var pattern2   = prop.value;
    var patternId2 = b.memberExpression(parentId, prop.key, false);

    if (isPattern(pattern2)) {
      push(kind, nodes, pattern2, patternId2);
    } else {
      nodes.push(buildVariableAssign(kind, pattern2, patternId2));
    }
  });
};

var pushArrayPattern = function (kind, nodes, pattern, parentId) {
  _.each(pattern.elements, function (elem, i) {
    if (!elem) return;

    var newPatternId = b.memberExpression(parentId, b.literal(i), true);

    if (elem.type === "Identifier") {
      nodes.push(buildVariableAssign(kind, elem, newPatternId));
    } else {
      push(kind, nodes, elem, newPatternId);
    }
  });
};

var pushPattern = function (kind, nodes, pattern, parentId, generateUid) {
  if (parentId.type !== "MemberExpression" && parentId.type !== "Identifier") {
    var key = generateUid("ref");

    nodes.push(util.template("variable-assign", {
      KEY: key,
      VALUE: parentId
    }, true));

    parentId = b.identifier(key);
  }

  push(kind, nodes, pattern, parentId);
};

exports.FunctionDeclaration =
exports.FunctionExpression = function (node, parent, opts, generateUid) {
  var block = node.body;
  var nodes = [];

  node.params = node.params.map(function (pattern) {
    if (!isPattern(pattern)) return pattern;

    var parentId = b.identifier(generateUid("ref"));

    pushPattern("var", nodes, pattern, parentId, generateUid);

    return parentId;
  });

  block.body = nodes.concat(block.body);
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

  _.each(node.declarations, function (declar) {
    var patternId = declar.init;
    var pattern   = declar.id;
    if (isPattern(pattern)) {
      pushPattern(node.kind, nodes, pattern, patternId, generateUid);
    } else {
      nodes.push(buildVariableAssign(node.kind, declar.id, declar.init));
    }
  });

  return nodes;
};
