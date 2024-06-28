import {
  GenMapping,
  maybeAddMapping,
  setSourceContent,
  allMappings,
  toEncodedMap,
  toDecodedMap,
  addOriginalScope,
  addGeneratedRange,
  addBinding,
  setEndPosition,
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

interface Pos {
  line: number;
  column: number;
}

export interface ScopeInfo {
  kind: string;
  loc: { start: Pos; end: Pos };
  source: string;
  name?: string;
  bindings: string[];
  callsite?: Pos & { source: string };
  isScope: boolean;
}

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

  // Source columns can be 0, but we only check in unison with sourceLine, which
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
            this._inputMap.sourcesContent?.[i],
          );
        }
      }
    }

    if (typeof code === "string" && !opts.inputSourceMap) {
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
    generated: Pos,
    line: number,
    column: number,
    identifierName?: string | null,
    identifierNamePos?: Pos,
    filename?: string | null,
  ) {
    this._rawMappings = undefined;

    let originalMapping: {
      source: string | null;
      name?: string | null;
      line: number | null;
      column: number | null;
    };

    if (line != null) {
      if (this._inputMap) {
        // This is the lookup for this mark
        originalMapping = originalPositionFor(this._inputMap, {
          line,
          column,
        });

        // If the we found a name, nothing else needs to be done
        // Maybe we're marking a `(` and the input map already had a name attached there,
        // or we're marking a `(` and the sourcemap spanned a `foo(`,
        // or we're marking an identifier, etc.
        if (!originalMapping.name && identifierNamePos) {
          // We're trying to mark a `(` (as that's the only thing that provides
          // an identifierNamePos currently), and we the AST had an identifier attached.
          // Lookup it's original name.
          const originalIdentifierMapping = originalPositionFor(
            this._inputMap,
            identifierNamePos,
          );
          if (originalIdentifierMapping.name) {
            identifierName = originalIdentifierMapping.name;
          }
        }
      } else {
        originalMapping = {
          source: filename?.replace(/\\/g, "/") || this._sourceFileName,
          line: line,
          column: column,
        };
      }
    }

    maybeAddMapping(this._map, {
      name: identifierName,
      generated,
      source: originalMapping?.source,
      original: originalMapping,
    });
  }

  _generatedRangesStack: any[] = [];

  startScope(
    originalScopeInfo: {
      start: Pos;
      end: Pos;
      source: string;
      kind: string;
      name?: string;
      variables?: string[];
    },
    generatedStart: Pos,
    isScope: boolean,
    callsite?: Pos & { source: string },
  ) {
    console.log(`CALL addOriginalScope with`, originalScopeInfo);
    const originalScope = addOriginalScope(this._map, originalScopeInfo);

    console.log(`CALL addGeneratedRange with`, {
      start: generatedStart,
      isScope,
      originalScope,
      callsite,
    });
    const generatedRange = addGeneratedRange(this._map, {
      start: generatedStart,
      isScope,
      originalScope,
      callsite,
    });

    this._generatedRangesStack.push(generatedRange);
  }

  addBinding(originalName: string, generatedName: string) {
    const generatedRange =
      this._generatedRangesStack[this._generatedRangesStack.length - 1];

    console.log(
      `CALL addBinding with`,
      generatedRange,
      originalName,
      generatedName,
    );

    addBinding(this._map, generatedRange, originalName, generatedName);
  }

  endScope(generatedEnd: Pos) {
    const generatedRange = this._generatedRangesStack.pop();

    console.log(`CALL setEndPosition with`, generatedRange, generatedEnd);

    setEndPosition(generatedRange, generatedEnd);
  }
}
