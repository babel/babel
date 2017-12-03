/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var base64VLQ = require("./base64-vlq");
var getNumberOfLines = require("./helpers").getNumberOfLines;

function SourceNode(generatedCode, source, originalSource, startingLine) {
	this.generatedCode = generatedCode;
	this.originalSource = originalSource;
	this.source = source;
	this.startingLine = startingLine || 1;
}
module.exports = SourceNode;

SourceNode.prototype.clone = function() {
	return new SourceNode(this.generatedCode, this.source, this.originalSource, this.startingLine);
}

var LINE_MAPPING = "AACA;";
var LAST_LINE_MAPPING = "AACA";

SourceNode.prototype.getGeneratedCode = function() {
	return this.generatedCode;
};

SourceNode.prototype.getMappings = function(mappingsContext) {
	var lines = getNumberOfLines(this.generatedCode);
	var sourceIdx = mappingsContext.ensureSource(this.source, this.originalSource);
	var mappings = "A"; // generated column 0
	mappings += base64VLQ.encode(sourceIdx - mappingsContext.currentSource); // source index
	mappings += base64VLQ.encode(this.startingLine - mappingsContext.currentOriginalLine); // original line index
	mappings += "A"; // original column 0
	if(lines !== 0)
		mappings += ";"
	mappingsContext.currentSource = sourceIdx;
	mappingsContext.currentOriginalLine = (lines || 1) + this.startingLine - 1;
	mappings += Array(lines).join(LINE_MAPPING);
	if(lines !== 0 && this.generatedCode[this.generatedCode.length - 1] !== "\n") {
		mappings += LAST_LINE_MAPPING;
		mappingsContext.currentOriginalLine++;
	}
	return mappings;
};

SourceNode.prototype.mapGeneratedCode = function(fn) {
	this.generatedCode = fn(this.generatedCode);
};
