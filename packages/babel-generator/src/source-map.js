import sourceMap from "source-map";

/**
 * Build a sourcemap.
 */

export default class SourceMap {
  constructor(opts, code) {
    this._opts     = opts;
    this._map = new sourceMap.SourceMapGenerator({
      file: opts.sourceMapTarget,
      sourceRoot: opts.sourceRoot
    });

    if (typeof code === "string") {
      this._map.setSourceContent(opts.sourceFileName, code);
    } else if (typeof code === "object") {
      Object.keys(code).forEach((sourceFileName) => {
        this._map.setSourceContent(sourceFileName, code[sourceFileName]);
      });
    }
  }

  /**
   * Get the sourcemap.
   */

  get() {
    return this._map.toJSON();
  }

  /**
   * Mark the current generated position with a source position. May also be passed null line/column
   * values to insert a mapping to nothing.
   */

  mark(
    generatedLine: number,
    generatedColumn: number,
    line: number,
    column: number,
    identifierName: ?string,
    filename: ?string,
  ) {
    // Adding an empty mapping at the start of a generated line just clutters the map.
    if (this._lastGenLine !== generatedLine && line === null) return;

    // If this mapping points to the same source location as the last one, we can ignore it since
    // the previous one covers it.
    if (this._lastGenLine === generatedLine && this._lastSourceLine === line &&
      this._lastSourceColumn === column) {
      return;
    }

    this._lastGenLine = generatedLine;
    this._lastSourceLine = line;
    this._lastSourceColumn = column;

    this._map.addMapping({
      name: identifierName,
      generated: {
        line: generatedLine,
        column: generatedColumn,
      },
      source: line == null ? null : filename || this._opts.sourceFileName,
      original: line == null ? null : {
        line: line,
        column: column,
      },
    });
  }
}
