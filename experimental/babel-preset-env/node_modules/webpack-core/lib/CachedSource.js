/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
function CachedSource(source) {
	this._source = source;
	this._cachedSource = undefined;
	this._cachedSize = undefined;
	this._cachedMaps = {};
}
module.exports = CachedSource;

CachedSource.prototype.source = function() {
	if(typeof this._cachedSource !== "undefined") return this._cachedSource;
	return this._cachedSource = this._source.source();
};

CachedSource.prototype.size = function() {
	if(typeof this._cachedSize !== "undefined") return this._cachedSize;
	if(typeof this._cachedSource !== "undefined")
		return this._cachedSize = this._cachedSource.length;
	return this._cachedSize = this._source.size();
};

CachedSource.prototype.sourceAndMap = function(options) {
	var key = JSON.stringify(options);
	if(typeof this._cachedSource !== "undefined" && key in this._cachedMaps)
		return { source: this._cachedSource, map: this._cachedMaps[key] };
	else if(typeof this._cachedSource !== "undefined") {
		return { source: this._cachedSource, map: this._cachedMaps[key] = this._source.map(options) };
	} else if(key in this._cachedMaps) {
		return { source: this._cachedSource = this._source.source(), map: this._cachedMaps[key] };
	}
	var result = this._source.sourceAndMap(options);
	this._cachedSource = result.source;
	this._cachedMaps[key] = result.map;
	return { source: this._cachedSource, map: this._cachedMaps[key] };
};

CachedSource.prototype.node = function(options) {
	return this._source.node(options);
};

CachedSource.prototype.listMap = function(options) {
	return this._source.listMap(options);
}

CachedSource.prototype.map = function(options) {
	if(!options) options = {};
	var key = JSON.stringify(options);
	if(key in this._cachedMaps)
		return this._cachedMaps[key];
	return this._cachedMaps[key] = this._source.map();
};

CachedSource.prototype.updateHash = function(hash) {
	this._source.updateHash(hash);
};
