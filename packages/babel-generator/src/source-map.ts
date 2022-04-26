import {
  GenMapping,
  addMapping,
  setSourceContent,
  allMappings,
  encodedMap,
  decodedMap,
} from "@jridgewell/gen-mapping";

import type {
  EncodedSourceMap,
  DecodedSourceMap,
  Mapping,
} from "@jridgewell/gen-mapping";

/**
 * Build a sourcemap.
 */

export default class SourceMap {
  private _map: GenMapping;
  private _rawMappings: Mapping[] | undefined;
  private _sourceFileName: string | undefined;

  // Any real line is > 0, so init to 0 is fine.
  private _lastGenLine = 0;
  private _lastSourceLine = 0;

  // Source columns can be 0, but we ony check in unison with sourceLine, which
  // inits to an impossible value. So init to 0 is fine.
  private _lastSourceColumn = 0;

  constructor(
    opts: { sourceFileName: string; sourceRoot?: string },
    code: string | { [sourceFileName: string]: string },
  ) {
    const map = (this._map = new GenMapping(undefined, opts.sourceRoot));
    this._sourceFileName = opts.sourceFileName?.replace(/\\/g, "/");
    this._rawMappings = undefined;

    if (typeof code === "string") {
      setSourceContent(map, this._sourceFileName, code);
    } else if (typeof code === "object") {
      Object.keys(code).forEach(sourceFileName => {
        setSourceContent(
          map,
          sourceFileName.replace(/\\/g, "/"),
          code[sourceFileName],
        );
      });
    }
  }

  /**
   * Get the sourcemap.
   */
  get(): EncodedSourceMap {
    return encodedMap(this._map);
  }

  getDecoded(): DecodedSourceMap {
    return decodedMap(this._map);
  }

  getRawMappings(): Mapping[] {
    return (this._rawMappings ||= allMappings(this._map));
  }

  /**
   * Mark the current generated position with a source position. May also be passed null line/column
   * values to insert a mapping to nothing.
   */

  mark(
    generated: { line: number; column: number },
    line: number,
    column: number,
    identifierName?: string | null,
    filename?: string | null,
    force?: boolean,
  ) {
    const generatedLine = generated.line;

    // Adding an empty mapping at the start of a generated line just clutters the map.
    if (this._lastGenLine !== generatedLine && line === null) return;

    // If this mapping points to the same source location as the last one, we can ignore it since
    // the previous one covers it.
    if (
      !force &&
      this._lastGenLine === generatedLine &&
      this._lastSourceLine === line &&
      this._lastSourceColumn === column
    ) {
      return;
    }

    this._rawMappings = undefined;
    this._lastGenLine = generatedLine;
    this._lastSourceLine = line;
    this._lastSourceColumn = column;

    addMapping(this._map, {
      name: identifierName,
      generated,
      source:
        line == null
          ? undefined
          : filename?.replace(/\\/g, "/") || this._sourceFileName,
      original:
        line == null
          ? undefined
          : {
              line: line,
              column: column,
            },
    });
  }
}
