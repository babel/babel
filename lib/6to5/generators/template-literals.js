var _ = require("lodash");

exports.TaggedTemplateExpression = function (node, print) {
  print(node.tag);
  print(node.quasi);
};

exports.TemplateElement = function (node) {
  this.push(node.value.raw, true);
};

exports.TemplateLiteral = function (node, print) {
  this.push("`");

  var quasis = node.quasis;
  var self   = this;
  var len    = quasis.length;

  _.each(quasis, function (quasi, i) {
    print(quasi);

    if (i + 1 < len) {
      self.push("${ ");
      print(node.expressions[i]);
      self.push(" }");
    }
  });

  this.push("`");
};
