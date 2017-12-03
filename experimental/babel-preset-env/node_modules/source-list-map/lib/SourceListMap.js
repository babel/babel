/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var CodeNode = require("./CodeNode");
var SourceNode = require("./SourceNode");
var MappingsContext = require("./MappingsContext");

function SourceListMap(generatedCode, source, originalSource) {
	if(Array.isArray(generatedCode)) {
		this.children = generatedCode;
	} else {
		this.children = [];
		if(generatedCode || source)
			this.add(generatedCode, source, originalSource);
	}
}
module.exports = SourceListMap;

SourceListMap.prototype.add = function(generatedCode, source, originalSource) {
	if(typeof generatedCode === "string") {
		if(source) {
			this.children.push(new SourceNode(generatedCode, source, originalSource));
		} else if(this.children.length > 0 && this.children[this.children.length - 1].addGeneratedCode) {
			this.children[this.children.length - 1].addGeneratedCode(generatedCode);
		} else {
			this.children.push(new CodeNode(generatedCode));
		}
	} else if(generatedCode.getMappings && generatedCode.getGeneratedCode) {
		this.children.push(generatedCode);
	} else if(generatedCode.children) {
		generatedCode.children.forEach(function(sln) {
			this.children.push(sln);
		}, this);
	} else {
		throw new Error("Invalid arguments to SourceListMap.prototype.add: Expected string, Node or SourceListMap");
	}
};

SourceListMap.prototype.preprend = function(source) {
	if(typeof generatedCode === "string") {
		if(source) {
			this.children.unshift(new SourceNode(generatedCode, source, originalSource));
		} else if(this.children.length > 0 && this.children[this.children.length - 1].preprendGeneratedCode) {
			this.children[this.children.length - 1].preprendGeneratedCode(generatedCode);
		} else {
			this.children.unshift(new CodeNode(generatedCode));
		}
	} else if(generatedCode.getMappings && generatedCode.getGeneratedCode) {
		this.children.unshift(generatedCode);
	} else if(generatedCode.children) {
		generatedCode.children.slice().reverse().forEach(function(sln) {
			this.children.unshift(sln);
		}, this);
	} else {
		throw new Error("Invalid arguments to SourceListMap.prototype.prerend: Expected string, Node or SourceListMap");
	}
};

SourceListMap.prototype.mapGeneratedCode = function(fn) {
	this.children.forEach(function(sln) {
		sln.mapGeneratedCode(fn);
	});
};

SourceListMap.prototype.toString = function() {
	return this.children.map(function(sln) {
		return sln.getGeneratedCode();
	}).join("");
};

SourceListMap.prototype.toStringWithSourceMap = function(options) {
	var mappingsContext = new MappingsContext();
	var source = this.children.map(function(sln) {
		return sln.generatedCode;
	}).join("");
	var mappings = this.children.map(function(sln) {
		return sln.getMappings(mappingsContext);
	}).join("");
	return {
		source: source,
		map: {
			version: 3,
			file: options && options.file,
			sources: mappingsContext.sources,
			sourcesContent: mappingsContext.hasSourceContent ? mappingsContext.sourcesContent : undefined,
			mappings: mappings
		}
	};
}
