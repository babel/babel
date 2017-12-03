/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var SourceNode = require("source-map").SourceNode;
var SourceMapConsumer = require("source-map").SourceMapConsumer;

function Source() {}

module.exports = Source;

Source.prototype.source = null;

Source.prototype.size = function() {
	return this.source().length;
};

Source.prototype.map = function(options) {
	return null;
};

Source.prototype.sourceAndMap = function(options) {
	return {
		source: this.source(),
		map: this.map()
	};
};

Source.prototype.node = null;

Source.prototype.listNode = null;

Source.prototype.updateHash = function(hash) {
	var source = this.source();
	hash.update(source || "");
};
