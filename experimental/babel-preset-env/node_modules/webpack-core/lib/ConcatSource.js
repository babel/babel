/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var SourceNode = require("source-map").SourceNode;
var SourceListMap = require("source-list-map").SourceListMap;
var Source = require("./Source");

function ConcatSource() {
	Source.call(this);
	this.children = Array.prototype.slice.call(arguments);
}
module.exports = ConcatSource;

ConcatSource.prototype = Object.create(Source.prototype);
ConcatSource.prototype.constructor = ConcatSource;

ConcatSource.prototype.add = function(item) {
	this.children.push(item);
};

ConcatSource.prototype.source = function() {
	return this.children.map(function(item) {
		return typeof item === "string" ? item : item.source();
	}).join("");
};

ConcatSource.prototype.size = function() {
	return this.children.map(function(item) {
		return typeof item === "string" ? item.length : item.size();
	}).reduce(function(sum, s) { return sum + s; }, 0);
};

require("./SourceAndMapMixin")(ConcatSource.prototype);

ConcatSource.prototype.node = function(options) {
	var node = new SourceNode(null, null, null, this.children.map(function(item) {
		return typeof item === "string" ? item : item.node(options);
	}));
	return node;
};

ConcatSource.prototype.listMap = function(options) {
	var map = new SourceListMap();
	this.children.forEach(function(item) {
		if(typeof item === "string")
			map.add(item);
		else
			map.add(item.listMap(options));
	});
	return map;
};

ConcatSource.prototype.updateHash = function(hash) {
	this.children.forEach(function(item) {
		if (typeof item === "string") {
			hash.update(item)
		} else {
			item.updateHash(hash);
		}
	});
};
