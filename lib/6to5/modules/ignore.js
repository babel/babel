module.exports = IgnoreFormatter;

function IgnoreFormatter() {

}

IgnoreFormatter.prototype.import = function () {

};

IgnoreFormatter.prototype.importSpecifier = function () {

};

IgnoreFormatter.prototype.export = function (node, nodes) {
  nodes.push(node.declaration);
};

IgnoreFormatter.prototype.exportSpecifier = function () {

};
