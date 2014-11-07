module.exports = SourceMap;

var sourceMap = require("source-map");

function SourceMap(position, opts, code) {
  this.position = position;
  this.opts     = opts;

  if (opts.sourceMap) {
    this.map = new sourceMap.SourceMapGenerator({
      file: opts.sourceMapName
    });

    this.map.setSourceContent(opts.sourceFileName, code);
  } else {
    this.map = null;
  }
}

SourceMap.prototype.get = function () {
  var map = this.map;
  if (map) {
    return map.toJSON();
  } else {
    return map;
  }
};

SourceMap.prototype.mark = function (node, type) {
  var loc = node.loc;
  if (!loc) return; // no location info

  var map = this.map;
  if (!map) return; // no source map

  var position = this.position;

  map.addMapping({
    source: this.opts.sourceFileName,
    generated: {
      line: position.line,
      column: position.column
    },
    original: loc[type]
  });
};
