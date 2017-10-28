"use strict";

function sameNode(firstNode, secondNode) {
  if (firstNode.type === "Identifier" || secondNode.type === "Identifier") {
    return firstNode.name === secondNode.name;
  }

  if (
    firstNode.type === "MemberExpression" &&
    secondNode.type === "MemberExpression"
  ) {
    const nodes = [];

    let node;
    for (
      node = firstNode;
      node.type === "MemberExpression";
      node = node.object
    ) {
      nodes.push(node.property);
    }
    nodes.push(node);

    const second = [];

    let node2;
    for (
      node2 = secondNode;
      node2.type === "MemberExpression";
      node2 = node2.object
    ) {
      second.push(node2.property);
    }
    second.push(node2);

    if (nodes.length < second.length) return false;

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      let value;
      if (node.type === "Identifier") {
        value = node.name;
      } else if (node.type === "Literal" && typeof node.value === "string") {
        value = node.value;
      } else {
        return false;
      }

      const node2 = second[i];
      let value2;
      if (node2.type === "Identifier") {
        value2 = node2.name;
      } else if (node2.type === "Literal" && typeof node2.value === "string") {
        value2 = node2.value;
      } else {
        return false;
      }

      if (value !== value2) return false;
    }
    return true;
  }
}

module.exports = {
  meta: {
    schema: [],
  },
  create: function(context) {
    return {
      MemberExpression(node) {
        if (
          node.computed === true &&
          node.property.type === "BinaryExpression" &&
          node.property.operator == "-" &&
          node.property.right.type === "Literal" &&
          node.property.right.value === 1 &&
          node.property.left.type === "MemberExpression" &&
          node.property.left.property.type === "Identifier" &&
          node.property.left.property.name === "length" &&
          sameNode(node.object, node.property.left.object)
        ) {
          context.report(
            node,
            'Potential performance penality without fixing access to "-1" property by adding a length check'
          );
        }
      },
    };
  },
};
