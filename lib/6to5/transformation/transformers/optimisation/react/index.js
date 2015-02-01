var CreateClassOptimiser = require("./create-class");
var NativeClassOptimiser = require("./native-class");
var react                = require("../../../helpers/react");

exports.optional = true;

exports.CallExpression = function (node) {
  if (react.isCreateClass(node)) {
    new CreateClassOptimiser(node.arguments[0]).run();
  }
};

exports.CallExpression = function (node) {
  if (react.isReactComponent(node.superClass)) {
    new NativeClassOptimiser(node).run();
  }
};
