/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var getNumberOfLines = require("./helpers").getNumberOfLines;

function CodeNode(generatedCode) {
	this.generatedCode = generatedCode;
}
module.exports = CodeNode;

CodeNode.prototype.clone = function() {
	return new CodeNode(this.generatedCode);
}

CodeNode.prototype.getGeneratedCode = function() {
	return this.generatedCode;
};

CodeNode.prototype.getMappings = function(mappingsContext) {
	var lines = getNumberOfLines(this.generatedCode);
	return Array(lines+1).join(";");
};

CodeNode.prototype.addGeneratedCode = function(generatedCode) {
	this.generatedCode += generatedCode;
};

CodeNode.prototype.mapGeneratedCode = function(fn) {
	this.generatedCode = fn(this.generatedCode);
};
