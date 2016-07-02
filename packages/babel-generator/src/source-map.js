import sourceMap from "source-map";

/**
 * Build a sourcemap.
 */

export default class SourceMap {
  constructor(opts, code) {
    this.opts     = opts;
    this.last     = {generated: {}, original: {}};

    if (opts.sourceMaps) {
      this.map = new sourceMap.SourceMapGenerator({
        file: opts.sourceMapTarget,
        sourceRoot: opts.sourceRoot
      });

      if (typeof code === "string") {
        this.map.setSourceContent(opts.sourceFileName, code);
      } else if (typeof code === "object") {
        Object.keys(code).forEach((sourceFileName) => {
          this.map.setSourceContent(sourceFileName, code[sourceFileName]);
        });
      }
    } else {
      this.map = null;
    }
  }

  /**
   * Get the sourcemap.
   */

  get() {
    let map = this.map;
    if (map) {
      return map.toJSON();
    } else {
      return map;
    }
  }

  /**
   * Mark the current generated position with a source position. May also be passed null line/column
   * values to insert a mapping to nothing.
   */

  mark(position, sourcePos: Object) {
    let map = this.map;
    if (!map) return; // no source map

    // Adding an empty mapping at the start of a generated line just clutters the map.
    if (this._lastGenLine !== position.line && sourcePos.line === null) return;

    // If this mapping points to the same source location as the last one, we can ignore it since
    // the previous one covers it.
    if (this._lastGenLine === position.line && this._lastSourceLine === sourcePos.line &&
      this._lastSourceColumn === sourcePos.column) {
      return;
    }

    this._lastGenLine = position.line;
    this._lastSourceLine = sourcePos.line;
    this._lastSourceColumn = sourcePos.column;

    map.addMapping({
      generated: {
        line: position.line,
        column: position.column
      },
      source: sourcePos.line == null ? null : sourcePos.filename || this.opts.sourceFileName,
      original: sourcePos.line == null ? null : {
        line: sourcePos.line,
        column: sourcePos.column,
      },
    });
  }
}
