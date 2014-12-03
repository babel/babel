exports.Property = function (node) {
  if (!node.shorthand) return;
  node.shorthand = false;
};
