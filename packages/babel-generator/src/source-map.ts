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
  private _sourceFileName: string | undefined;

  public _inputMap: TraceMap | null = null;

  // When range mappings are enabled, we buffer up to three mappings before
  // committing them to the underlying map, so that we can collapse runs of
  // mappings into a single range mapping:
  // - buffer0 is the start of the range we are building;
  // - buffer1 is its current end: it has the same offset as buffer0 in both
  //   the generated and the original code. Every following mapping that also
  //   has that offset replaces it, extending the range;
  // - buffer2 is a mapping on a new generated line, with the same original
  //   position as the last buffered one. It is dropped if the next mapping
  //   extends the range, as the range then covers it, and it is buffered
  //   normally otherwise.
  #mappingsBuffer0: Parameters<typeof maybeAddMapping>[1] | null = null;
  #mappingsBuffer1: Parameters<typeof maybeAddMapping>[1] | null = null;
  #mappingsBuffer2: Parameters<typeof maybeAddMapping>[1] | null = null;
  #droppedMappingForRange = false;

  #allowRangeMappings: boolean;

  constructor(
    opts: {
      filename?: string;
      sourceFileName?: string;
      sourceRoot?: string;
      inputSourceMap?: SourceMapInput;
      sourceMapRanges?: boolean;
    },
    code: string | Record<string, string> | null | undefined,
  ) {
    const map = (this._map = new GenMapping({ sourceRoot: opts.sourceRoot }));
    this._sourceFileName = opts.sourceFileName?.replace(/\\/g, "/");
    this._rawMappings = undefined;
    this.#allowRangeMappings = opts.sourceMapRanges ?? false;

    if (opts.inputSourceMap) {
      if (this.#allowRangeMappings) {
        this.#allowRangeMappings = false;
        console.warn(
          "[BABEL] Note: The code generator has disabled source map ranges " +
            `for ${opts.filename ?? "the generated code"}, because they ` +
            "cannot be used together with `inputSourceMap` yet.",
        );
      }

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
      setSourceContent(map, this._sourceFileName!, code);
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
    this.#flushBuffer();
    const encoded = toEncodedMap(this._map);
    // TODO(Babel 9): Remove this fallback.
    encoded.ignoreList ??= [];
    return encoded;
  }

  getDecoded(): DecodedSourceMap {
    this.#flushBuffer();
    const decoded = toDecodedMap(this._map);
    // TODO(Babel 9): Remove this fallback.
    decoded.ignoreList ??= [];
    return decoded;
  }

  getRawMappings(): Mapping[] {
    this.#flushBuffer();
    return (this._rawMappings ||= allMappings(this._map));
  }

  /**
   * Mark the current generated position with a source position. May also be passed null line/column
   * values to insert a mapping to nothing.
   */

  mark(
    generated: { line: number; column: number },
    generatedIdentifierName: string | null,
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

        // Prefer the original name from the input sourcemap when marking an
        // identifier token at the same column, or when marking a related
        // token such as `(` via identifierNamePos.
        if (
          originalMapping.name &&
          (identifierNamePos ||
            (identifierName != null && originalMapping.column === column))
        ) {
          identifierName = originalMapping.name;
        } else if (identifierNamePos) {
          // Maybe we're marking a `(` and the input map already had a name attached there,
          // or we're marking a `(` and the sourcemap spanned a `foo(`,
          // or we're marking an identifier, etc.
          // We're trying to mark a `(` (as that's the only thing that provides
          // an identifierNamePos currently), and we the AST had an identifier attached.
          // Lookup its original name.
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
          source: filename?.replace(/\\/g, "/") || this._sourceFileName!,
          line: line,
          column: column!,
        };
      }
    }

    if (identifierName != null && identifierName === generatedIdentifierName) {
      identifierName = null;
    }

    const newMapping = {
      name: identifierName ?? null,
      generated: { line: generated.line, column: generated.column },
      source: originalMapping?.source,
      original: originalMapping,
      isRange: false,
    } as Parameters<typeof maybeAddMapping>[1];

    // Named mappings never participate in range collapsing: a range erases
    // per-segment names, so a name has to land on a real, standalone segment.
    // Flush whatever is buffered and write the named mapping straight through.
    if (newMapping.name !== null) {
      this.#flushBuffer();
      maybeAddMapping(this._map, newMapping);
      return;
    }

    if (this.#allowRangeMappings) {
      if (this.#mappingsBuffer2 !== null) {
        const buf2 = this.#mappingsBuffer2;
        this.#mappingsBuffer2 = null;
        const prev = this.#mappingsBuffer1 ?? this.#mappingsBuffer0!;
        if (this.#isRangeCandidate(prev, newMapping)) {
          // The range we are building covers buffer2, so we can drop it.
          this.#droppedMappingForRange = true;
        } else {
          this.#bufferMapping(buf2);
        }
      }

      const prev = this.#mappingsBuffer1 ?? this.#mappingsBuffer0;

      // Unnamed marks whose source position matches the most recent buffered
      // mark are usually redundant.
      const prevOriginal = prev?.original;
      if (
        prevOriginal &&
        prev.source === newMapping.source &&
        prevOriginal.line === newMapping.original?.line &&
        prevOriginal.column === newMapping.original.column
      ) {
        // On the same generated line, gen-mapping would skip it anyway.
        if (prev.generated.line === newMapping.generated.line) return;
        // On a different generated line, it is only redundant if the range
        // that we are building ends up covering it: we only know that once
        // we see the next mapping, so keep it in buffer2 until then.
        this.#mappingsBuffer2 = newMapping;
        return;
      }
    }

    this.#bufferMapping(newMapping);
  }

  #bufferMapping(newMapping: Parameters<typeof maybeAddMapping>[1]) {
    // We keep up to two mappings buffered before committing them to the
    // underlying map. This lets us detect consecutive range candidate mappings and
    // collapse them into a single range mapping: buffer0 is the candidate
    // "range start", buffer1 (when present) is the candidate "range close",
    // and any subsequent range candidate mapping replaces buffer1 to extend the range.
    if (this.#mappingsBuffer0 === null) {
      this.#mappingsBuffer0 = newMapping;
      return;
    }

    if (this.#mappingsBuffer1 === null) {
      if (this.#isRangeCandidate(this.#mappingsBuffer0, newMapping)) {
        this.#mappingsBuffer1 = newMapping;
      } else {
        maybeAddMapping(this._map, this.#mappingsBuffer0);
        this.#mappingsBuffer0 = newMapping;
      }
      return;
    }

    if (this.#isRangeCandidate(this.#mappingsBuffer1, newMapping)) {
      // Extend the open range: drop the old close, keep the new one as the
      // range close so the pair (buffer0, buffer1) still spans range candidate code.
      this.#mappingsBuffer1 = newMapping;
      this.#droppedMappingForRange = true;
    } else {
      // Only the range-start segment carries the range marker; the next
      // committed segment is the implicit range close. Only mark the mapping
      // as range if it actually allowed us to drop other mappings.
      if (this.#droppedMappingForRange) this.#mappingsBuffer0.isRange = true;
      maybeAddMapping(this._map, this.#mappingsBuffer0);
      maybeAddMapping(this._map, this.#mappingsBuffer1);
      this.#mappingsBuffer0 = newMapping;
      this.#mappingsBuffer1 = null;
      this.#droppedMappingForRange = false;
    }
  }

  #flushBuffer() {
    if (this.#mappingsBuffer2 !== null) {
      this.#bufferMapping(this.#mappingsBuffer2);
      this.#mappingsBuffer2 = null;
    }

    const buf0 = this.#mappingsBuffer0;
    const buf1 = this.#mappingsBuffer1;
    if (buf0 !== null) {
      if (buf1 !== null && this.#droppedMappingForRange) buf0.isRange = true;
      maybeAddMapping(this._map, buf0 as any);
      this.#mappingsBuffer0 = null;
    }
    if (buf1 !== null) {
      maybeAddMapping(this._map, buf1);
      this.#mappingsBuffer1 = null;
    }
  }

  #isRangeCandidate(
    prev: Parameters<typeof maybeAddMapping>[1],
    next: Parameters<typeof maybeAddMapping>[1],
  ): boolean {
    if (!this.#allowRangeMappings) return false;

    const prevOriginal = prev.original;
    const nextOriginal = next.original;
    if (!prevOriginal || !nextOriginal) return false;
    if (prev.source !== next.source) return false;

    const generatedLineDelta = next.generated.line - prev.generated.line;
    const generatedColumnDelta =
      generatedLineDelta === 0
        ? next.generated.column - prev.generated.column
        : next.generated.column;

    const originalLineDelta = nextOriginal.line - prevOriginal.line;
    const originalColumnDelta =
      originalLineDelta === 0
        ? nextOriginal.column - prevOriginal.column
        : nextOriginal.column;

    return (
      generatedLineDelta >= 0 &&
      originalColumnDelta >= 0 &&
      generatedLineDelta === originalLineDelta &&
      generatedColumnDelta === originalColumnDelta
    );
  }
}
