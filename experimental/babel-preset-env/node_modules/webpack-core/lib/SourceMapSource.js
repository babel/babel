/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var SourceNode = require("source-map").SourceNode;
var SourceMapConsumer = require("source-map").SourceMapConsumer;
var SourceMapGenerator = require("source-map").SourceMapGenerator;
var SourceListMap = require("source-list-map").SourceListMap;
var fromStringWithSourceMap = require("source-list-map").fromStringWithSourceMap;
var Source = require("./Source");

function SourceMapSource(value, name, sourceMap, originalSource, innerSourceMap) {
	Source.call(this);
	this._value = value;
	this._name = name;
	this._sourceMap = sourceMap;
	this._originalSource = originalSource;
	this._innerSourceMap = innerSourceMap;
}
module.exports = SourceMapSource;

SourceMapSource.prototype = Object.create(Source.prototype);
SourceMapSource.prototype.constructor = SourceMapSource;

SourceMapSource.prototype.source = function() {
	return this._value;
};

require("./SourceAndMapMixin")(SourceMapSource.prototype);

SourceMapSource.prototype.node = function(options) {
	var innerSourceMap = this._innerSourceMap;
	var sourceMap = this._sourceMap;
	if(innerSourceMap) {
		innerSourceMap = new SourceMapConsumer(innerSourceMap);
		sourceMap = SourceMapGenerator.fromSourceMap(new SourceMapConsumer(sourceMap));
		sourceMap.setSourceContent(this._name, this._originalSource);
		sourceMap.applySourceMap(innerSourceMap, this._name);
		sourceMap = sourceMap.toJSON();
	}
	return SourceNode.fromStringWithSourceMap(this._value, new SourceMapConsumer(sourceMap));
};

SourceMapSource.prototype.listMap = function(options) {
	if(options.module === false)
		return new SourceListMap(this._value, this._name, this._value);
	return fromStringWithSourceMap(this._value, typeof this._sourceMap === "string" ? JSON.parse(this._sourceMap) : this._sourceMap);
};

SourceMapSource.prototype.updateHash = function(hash) {
	hash.update(this._value);
	if(this._originalSource)
		hash.update(this._originalSource);
};
