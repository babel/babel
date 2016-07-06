import sourceMap from "source-map";
import type Position from "./position";

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

  mark(position: Position, line: number, column: number, filename: ?string) {
    let map = this.map;
    if (!map) return; // no source map

    // Adding an empty mapping at the start of a generated line just clutters the map.
    if (this._lastGenLine !== position.line && line === null) return;

    // If this mapping points to the same source location as the last one, we can ignore it since
    // the previous one covers it.
    if (this._lastGenLine === position.line && this._lastSourceLine === line &&
      this._lastSourceColumn === column) {
      return;
    }

    this._lastGenLine = position.line;
    this._lastSourceLine = line;
    this._lastSourceColumn = column;

    map.addMapping({
      generated: {
        line: position.line,
        column: position.column
      },
      source: line == null ? null : filename || this.opts.sourceFileName,
      original: line == null ? null : {
        line: line,
        column: column,
      },
    });
  }
}
