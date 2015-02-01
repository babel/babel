var CreateClassOptimiser = require("./create-class");
var NativeClassOptimiser = require("./native-class");
var react                = require("../../../helpers/react");

exports.optional = true;

exports.CallExpression = function (node) {
  if (react.isCreateClassCallExpression(node)) {
    new CreateClassOptimiser(node.arguments[0]).optimise();
  }
};

exports.CallExpression = function (node) {
  if (react.isReactComponentMemberExpression(node.superClass)) {
    new NativeClassOptimiser(node).optimise();
  }
};
