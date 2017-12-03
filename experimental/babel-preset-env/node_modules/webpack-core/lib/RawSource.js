/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var Source = require("./Source");
var SourceNode = require("source-map").SourceNode;
var SourceListMap = require("source-list-map").SourceListMap;

function RawSource(value) {
	Source.call(this);
	this._value = value;
}
module.exports = RawSource;

RawSource.prototype = Object.create(Source.prototype);
RawSource.prototype.constructor = RawSource;

RawSource.prototype.source = function() {
	return this._value;
};

RawSource.prototype.map = function(options) {
	return null;
};

RawSource.prototype.node = function(options) {
	return new SourceNode(null, null, null, this._value);
};

RawSource.prototype.listMap = function(options) {
	return new SourceListMap(this._value);
};

RawSource.prototype.updateHash = function(hash) {
	hash.update(this._value);
};
