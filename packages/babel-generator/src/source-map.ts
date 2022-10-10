import {
  GenMapping,
  maybeAddMapping,
  setSourceContent,
  allMappings,
  toEncodedMap,
  toDecodedMap,
} from "@jridgewell/gen-mapping";

import type {
  EncodedSourceMap,
  DecodedSourceMap,
  Mapping,
} from "@jridgewell/gen-mapping";

import {
  type SourceMapInput,
  originalPositionFor,
  TraceMap,
} from "@jridgewell/trace-mapping";

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

  public _inputMap: TraceMap;

  constructor(
    opts: {
      sourceFileName?: string;
      sourceRoot?: string;
      inputSourceMap?: SourceMapInput;
    },
    code: string | { [sourceFileName: string]: string },
  ) {
    const map = (this._map = new GenMapping({ sourceRoot: opts.sourceRoot }));
    this._sourceFileName = opts.sourceFileName?.replace(/\\/g, "/");
    this._rawMappings = undefined;

    if (opts.inputSourceMap) {
      this._inputMap = new TraceMap(opts.inputSourceMap);
      const resolvedSources = this._inputMap.resolvedSources;
      if (resolvedSources.length) {
        for (let i = 0; i < resolvedSources.length; i++) {
          setSourceContent(
            map,
            resolvedSources[i],
            this._inputMap.sourcesContent[i],
          );
        }
      }
    }

    if (typeof code === "string") {
      setSourceContent(map, this._sourceFileName, code);
    } else if (typeof code === "object") {
      for (const sourceFileName of Object.keys(code)) {
        setSourceContent(
          map,
          sourceFileName.replace(/\\/g, "/"),
          code[sourceFileName],
        );
      }
    }
  }

  /**
   * Get the sourcemap.
   */
  get(): EncodedSourceMap {
    return toEncodedMap(this._map);
  }

  getDecoded(): DecodedSourceMap {
    return toDecodedMap(this._map);
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
  ) {
    this._rawMappings = undefined;

    let original;
    let source;

    if (line != null) {
      if (this._inputMap) {
        const originalMapping = originalPositionFor(this._inputMap, {
          line,
          column,
        });

        source =
          originalMapping.source ||
          filename?.replace(/\\/g, "/") ||
          this._sourceFileName;

        if (originalMapping.line != null) {
          original = {
            line: originalMapping.line,
            column: originalMapping.column,
          };
          if (originalMapping.name) {
            identifierName = originalMapping.name;
          }
        }
      } else {
        source = filename?.replace(/\\/g, "/") || this._sourceFileName;
      }
      if (!original) {
        original = {
          line: line,
          column: column,
        };
      }
    }

    maybeAddMapping(this._map, {
      name: identifierName,
      generated,
      source: line == null ? undefined : source,
      original: original,
    });
  }
}
