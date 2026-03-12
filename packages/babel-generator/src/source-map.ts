import path from "node:path";
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

import type {
  InvalidOriginalMapping,
  OriginalMapping,
  SourceMapInput,
} from "@jridgewell/trace-mapping";
import { originalPositionFor, TraceMap } from "@jridgewell/trace-mapping";

/**
 * Build a sourcemap.
 */

export default class SourceMap {
  private _map: GenMapping;
  private _rawMappings: Mapping[] | undefined;

  // The source filename used in the source map's "sources" array.
  // This is the "normalized" version: if sourceRoot is set, it's
  // relative to sourceRoot; if the path is absolute with no sourceRoot,
  // it's reduced to its basename. Relative paths are kept as-is.
  #sourceFilename: string | undefined;

  // The original absolute filename (opts.filename, or opts.sourceFilename
  // as a fallback), converted to a POSIX path.
  // This is used in #resolveSourceFilename to detect when a node's
  // loc.filename refers to the main source file, so we can map it back
  // to the normalized #sourceFilename instead of creating a duplicate
  // source entry.
  #rawSourceFilename: string | undefined;

  private _sourceRoot: string | undefined;

  // Any real line is > 0, so init to 0 is fine.
  private _lastGenLine = 0;
  private _lastSourceLine = 0;

  // Source columns can be 0, but we only check in unison with sourceLine, which
  // inits to an impossible value. So init to 0 is fine.
  private _lastSourceColumn = 0;

  public _inputMap: TraceMap | null = null;

  constructor(
    opts: {
      filename?: string; // The complete filename
      sourceFilename?: string; // The name for `sources` in the source map
      sourceRoot?: string;
      inputSourceMap?: SourceMapInput;
    },
    code: string | Record<string, string> | null | undefined,
  ) {
    const map = (this._map = new GenMapping({ sourceRoot: opts.sourceRoot }));
    this._sourceRoot = opts.sourceRoot;
    this.#rawSourceFilename = (opts.filename ?? opts.sourceFilename)?.replace(
      /\\/g,
      "/",
    );
    this.#sourceFilename = this.#normalizeFilename(
      opts.sourceFilename?.replace(/\\/g, "/"),
    );
    this._rawMappings = undefined;

    if (opts.inputSourceMap) {
      this._inputMap = new TraceMap(opts.inputSourceMap);
      const resolvedSources = this._inputMap.resolvedSources;
      if (resolvedSources.length) {
        for (let i = 0; i < resolvedSources.length; i++) {
          setSourceContent(
            map,
            resolvedSources[i],
            // @ts-expect-error FIXME: this._inputMap.sourcesContent?.[i] may be undefined, which is not acceptable by setSourceContent
            this._inputMap.sourcesContent?.[i],
          );
        }
      }
    }

    if (typeof code === "string" && !opts.inputSourceMap) {
      setSourceContent(map, this.#sourceFilename!, code);
    } else if (typeof code === "object") {
      for (const sourceFileName of Object.keys(code!)) {
        setSourceContent(
          map,
          sourceFileName.replace(/\\/g, "/"),
          code![sourceFileName],
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

  #normalizeFilename(filename: string | undefined): string | undefined {
    if (filename && path.isAbsolute(filename)) {
      if (this._sourceRoot) {
        return path.relative(this._sourceRoot, filename);
      }
      return path.basename(filename);
    }
    return filename;
  }

  /**
   * Resolve the source filename for a mapping entry. If the loc filename
   * matches the main source file (raw or normalized), use _sourceFilename.
   * Otherwise normalize it as a secondary source.
   */
  #resolveSourceFilename(filename: string | null | undefined): string {
    if (!filename) return this.#sourceFilename!;
    const normalized = filename.replace(/\\/g, "/");
    if (
      normalized === this.#rawSourceFilename ||
      normalized === this.#sourceFilename
    ) {
      return this.#sourceFilename!;
    }
    return this.#normalizeFilename(normalized) ?? normalized;
  }

  /**
   * Mark the current generated position with a source position. May also be passed null line/column
   * values to insert a mapping to nothing.
   */

  mark(
    generated: { line: number; column: number },
    line?: number,
    column?: number,
    identifierName?: string | null,
    identifierNamePos?: { line: number; column: number },
    filename?: string | null,
  ) {
    this._rawMappings = undefined;

    let originalMapping: OriginalMapping | InvalidOriginalMapping | undefined;

    if (line != null) {
      if (this._inputMap) {
        // This is the lookup for this mark
        originalMapping = originalPositionFor(this._inputMap, {
          line,
          column: column!,
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
          name: null,
          source: this.#resolveSourceFilename(filename),
          line: line,
          column: column!,
        };
      }
    }

    // @ts-expect-error FIXME: original cannot be InvalidOriginalMapping
    maybeAddMapping(this._map, {
      name: identifierName,
      generated,
      source: originalMapping?.source,
      original: originalMapping,
    });
  }
}
