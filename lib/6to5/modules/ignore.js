module.exports = IgnoreFormatter;

function IgnoreFormatter(file) {

}

IgnoreFormatter.prototype.import = function (node, nodes) {

};

IgnoreFormatter.prototype.importSpecifier = function (specifier, node, nodes) {

};

IgnoreFormatter.prototype.export = function (node, nodes) {
  nodes.push(node.declaration);
};

IgnoreFormatter.prototype.exportSpecifier = function (specifier, node, nodes) {

};
