/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var SourceNode = require("source-map").SourceNode;
var SourceListMap = require("source-list-map").SourceListMap;
var Source = require("./Source");

function LineToLineMappedSource(value, name, originalSource) {
	Source.call(this);
	this._value = value;
	this._name = name;
	this._originalSource = originalSource;
}

module.exports = LineToLineMappedSource;

LineToLineMappedSource.prototype = Object.create(Source.prototype);
LineToLineMappedSource.prototype.constructor = LineToLineMappedSource;

LineToLineMappedSource.prototype.source = function() {
	return this._value;
};

require("./SourceAndMapMixin")(LineToLineMappedSource.prototype);

LineToLineMappedSource.prototype.node = function(options) {
	var value = this._value;
	var name = this._name;
	var lines = value.split("\n");
	var node = new SourceNode(null, null, null,
		lines.map(function(line, idx) {
			return new SourceNode(idx+1, 0, name,
				(line + (idx != lines.length-1 ? "\n" : ""))
			);
		})
	);
	node.setSourceContent(name, this._originalSource);
	return node;
};

LineToLineMappedSource.prototype.listMap = function(options) {
	return new SourceListMap(this._value, this._name, this._originalSource)
};

LineToLineMappedSource.prototype.updateHash = function(hash) {
	hash.update(this._value);
	hash.update(this._originalSource);
};
