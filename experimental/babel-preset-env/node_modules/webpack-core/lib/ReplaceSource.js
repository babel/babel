/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var Source = require("./Source");
var SourceNode = require("source-map").SourceNode;
var SourceListMap = require("source-list-map").SourceListMap;
var fromStringWithSourceMap = require("source-list-map").fromStringWithSourceMap;
var SourceMapConsumer = require("source-map").SourceMapConsumer;

function ReplaceSource(source, name) {
	Source.call(this);
	this._source = source;
	this._name = name;
	this.replacements = [];
}
module.exports = ReplaceSource;

ReplaceSource.prototype = Object.create(Source.prototype);
ReplaceSource.prototype.constructor = ReplaceSource;

ReplaceSource.prototype.replace = function(start, end, newValue) {
	this.replacements.push([start, end, newValue]);
};

ReplaceSource.prototype.insert = function(pos, newValue) {
	this.replacements.push([pos, pos-1, newValue]);
};

ReplaceSource.prototype.source = function(options) {
	return this._replaceString(this._source.source());
};

ReplaceSource.prototype._sortReplacements = function() {
	this.replacements.forEach(function(item, idx) {
		item[3] = idx;
	});
	this.replacements.sort(function(a, b) {
		var diff = b[1] - a[1];
		if(diff !== 0)
			return diff;
		return b[3] - a[3];
	});

};

ReplaceSource.prototype._replaceString = function(str) {
	this._sortReplacements();
	var result = [str];
	this.replacements.forEach(function(repl) {
		var remSource = result.pop();
		var splitted1 = this._splitString(remSource, Math.floor(repl[1]+1));
		var splitted2 = this._splitString(splitted1[0], Math.floor(repl[0]));
		result.push(splitted1[1], repl[2], splitted2[0]);
	}, this);
	result = result.reverse();
	return result.join("");
};

require("./SourceAndMapMixin")(ReplaceSource.prototype);

ReplaceSource.prototype.node = function(options) {
	this._sortReplacements();
	var result = [this._source.node(options)];
	this.replacements.forEach(function(repl) {
		var remSource = result.pop();
		var splitted1 = this._splitSourceNode(remSource, Math.floor(repl[1]+1));
		if(Array.isArray(splitted1)) {
			var splitted2 = this._splitSourceNode(splitted1[0], Math.floor(repl[0]));
			if(Array.isArray(splitted2)) {
				result.push(splitted1[1], this._replacementToSourceNode(splitted2[1], repl[2]), splitted2[0]);
			} else {
				result.push(splitted1[1], this._replacementToSourceNode(splitted1[1], repl[2]), splitted1[0]);
			}
		} else {
			var splitted2 = this._splitSourceNode(remSource, Math.floor(repl[0]));
			if(Array.isArray(splitted2)) {
				result.push(this._replacementToSourceNode(splitted2[1], repl[2]), splitted2[0]);
			} else {
				result.push(repl[2], remSource);
			}
		}
	}, this);
	result = result.reverse();
	return new SourceNode(null, null, null, result);
};

ReplaceSource.prototype.listMap = function(options) {
	var map = this._source.listMap(options);
	if(map.children.length !== 1) {
		var code = map.toString();
		code = this._replaceString(code).split("\n");
		var currentIndex = 0;
		map.mapGeneratedCode(function(str) {
			var idx = -1;
			var count = -1;
			do {
				count++;
				idx = str.indexOf("\n", idx + 1);
			} while(idx >= 0);
			if(!count) return "";
			var result = code.slice(currentIndex, currentIndex + count).join("\n") + "\n";
			currentIndex += count;
			return result;
		});
		map.add(code.slice(currentIndex).join("\n"));
	} else {
		map.mapGeneratedCode(this._replaceString.bind(this));
	}
	return map;
};

ReplaceSource.prototype._replacementToSourceNode = function(oldNode, newString) {
	var map = oldNode.toStringWithSourceMap({ file: "?" }).map;
	var original = new SourceMapConsumer(map.toJSON()).originalPositionFor({ line: 1, column: 0 });
	if(original) {
		return new SourceNode(original.line, original.column, original.source, newString);
	} else {
		return newString;
	}
};

ReplaceSource.prototype._splitSourceNode = function(node, position) {
	if(typeof node === "string") {
		if(node.length <= position) return position - node.length;
		return [node.substr(0, position), node.substr(position)];
	} else {
		for(var i = 0; i < node.children.length; i++) {
			position = this._splitSourceNode(node.children[i], position);
			if(Array.isArray(position)) {
				var leftNode = new SourceNode(
					node.line,
					node.column,
					node.source,
					node.children.slice(0, i).concat([position[0]]),
					node.name
				);
				var rightNode = new SourceNode(
					node.line,
					node.column,
					node.source,
					[position[1]].concat(node.children.slice(i+1)),
					node.name
				);
				leftNode.sourceContents = node.sourceContents;
				return [leftNode, rightNode];
			}
		}
		return position;
	}
};

ReplaceSource.prototype._splitString = function(str, position) {
	return [str.substr(0, position), str.substr(position)];
};
