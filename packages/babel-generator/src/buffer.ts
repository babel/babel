import type SourceMap from "./source-map.ts";
import type { SourceLocation } from "@babel/types";

import * as charcodes from "charcodes";

export type Loc = SourceLocation;
export type Pos = SourceLocation["start"];

type SourcePosition = {
  line: number | undefined;
  column: number | undefined;
  identifierName: string | undefined;
  identifierNamePos: Pos | undefined;
  filename: string | undefined;
};

const spaceIndents: string[] = [];
for (let i = 0; i < 32; i++) {
  spaceIndents.push(" ".repeat(i * 2));
}

// V8 represents `a += b` as a tree of "cons strings" rather than copying the
// characters. This makes appending cheap, but every garbage collection has
// to copy all the live cons cells, which gets slow for outputs of several
// megabytes. To bound the number of live cons cells, the pending chunk is
// flattened once it grows past this size (in characters).
const CHUNK_SIZE = 65536;

export default class Buffer {
  constructor(map: SourceMap | null, indentChar: string) {
    this._map = map;
    this._indentChar = indentChar;
  }

  _map: SourceMap | null = null;
  // The already flattened chunks of the output, and the pending chunk.
  _buf = "";
  _str = "";
  _last = 0;
  _canMarkIdName = true;
  _indentChar = "";
  _queuedChar: typeof charcodes.space | typeof charcodes.semicolon | 0 = 0;

  _position = {
    line: 1,
    column: 0,
  };
  _sourcePosition: SourcePosition = {
    identifierName: undefined,
    identifierNamePos: undefined,
    line: undefined,
    column: undefined,
    filename: undefined,
  };

  /**
   * Get the final string output from the buffer, along with the sourcemap if one exists.
   */

  get() {
    const { _map, _last } = this;
    if (this._queuedChar !== charcodes.space) {
      this._flush();
    }

    // Whatever trim is used here should not execute a regex against the
    // source string since it may be arbitrarily large after all transformations
    const code =
      _last === charcodes.lineFeed
        ? (this._buf + this._str).trimRight()
        : this._buf + this._str;

    // Creating objects with getters is expensive.
    if (_map === null) {
      return {
        code: code,
        decodedMap: undefined,
        map: null,
        rawMappings: undefined,
      };
    }

    const result = {
      code: code,
      // Decoded sourcemap is free to generate.
      decodedMap: _map.getDecoded(),
      // Encoding the sourcemap is moderately CPU expensive.
      get map() {
        const resultMap = _map.get();
        result.map = resultMap;
        return resultMap;
      },
      set map(value) {
        Object.defineProperty(result, "map", { value, writable: true });
      },
      // Retrieving the raw mappings is very memory intensive.
      get rawMappings() {
        const mappings = _map.getRawMappings();
        result.rawMappings = mappings;
        return mappings;
      },
      set rawMappings(value) {
        Object.defineProperty(result, "rawMappings", { value, writable: true });
      },
    };

    return result;
  }

  /**
   * Add a string to the buffer that cannot be reverted.
   */

  append(
    str: string,
    maybeNewline: boolean,
    ignoreMapping: boolean = false,
  ): void {
    this._flush();
    this._append(str, maybeNewline, ignoreMapping);
  }

  appendChar(char: number): void {
    this._flush();
    this._appendChar(char, 1, true);
  }

  /**
   * Add a string to the buffer than can be reverted.
   */
  queue(char: typeof charcodes.space | typeof charcodes.semicolon): void {
    this._flush();
    this._queuedChar = char;
  }

  _flush(): void {
    const queuedChar = this._queuedChar;
    if (queuedChar !== 0) {
      this._appendChar(queuedChar, 1, true);
      this._queuedChar = 0;
    }
  }

  _appendChar(char: number, repeat: number, useSourcePos: boolean): void {
    this._last = char;

    if (char === -1) {
      const indent =
        repeat >= 64
          ? this._indentChar.repeat(repeat)
          : spaceIndents[repeat / 2];
      this._str += indent;
    } else {
      this._str +=
        repeat > 1
          ? String.fromCharCode(char).repeat(repeat)
          : String.fromCharCode(char);
    }
    if (this._str.length > CHUNK_SIZE) this._flattenChunk();

    const isSpace = char === charcodes.space;
    const position = this._position;
    if (char !== charcodes.lineFeed) {
      if (this._map) {
        const sourcePos = this._sourcePosition;
        if (useSourcePos && sourcePos) {
          this._map.mark(
            position,
            null,
            sourcePos.line,
            sourcePos.column,
            isSpace ? undefined : sourcePos.identifierName,
            isSpace ? undefined : sourcePos.identifierNamePos,
            sourcePos.filename,
          );

          if (!isSpace && this._canMarkIdName) {
            sourcePos.identifierName = undefined;
            sourcePos.identifierNamePos = undefined;
          }
        } else {
          this._map.mark(position, null);
        }
      }

      position.column += repeat;
    } else {
      position.line++;
      position.column = 0;
    }
  }

  _append(str: string, maybeNewline: boolean, ignoreMapping: boolean): void {
    const len = str.length;
    const position = this._position;
    const sourcePos = this._sourcePosition;

    this._last = -1; /* LAST_CHAR_KINDS.NORMAL */

    this._str += str;
    if (this._str.length > CHUNK_SIZE) this._flattenChunk();

    const hasMap = !ignoreMapping && this._map !== null;

    if (!maybeNewline && !hasMap) {
      position.column += len;
      return;
    }

    const { column, identifierName, identifierNamePos, filename } = sourcePos;
    let line = sourcePos.line;

    if (
      (identifierName != null || identifierNamePos != null) &&
      this._canMarkIdName
    ) {
      sourcePos.identifierName = undefined;
      sourcePos.identifierNamePos = undefined;
    }

    // Search for newline chars. We search only for `\n`, since both `\r` and
    // `\r\n` are normalized to `\n` during parse. We exclude `\u2028` and
    // `\u2029` for performance reasons, they're so uncommon that it's probably
    // ok. It's also unclear how other sourcemap utilities handle them...
    let i = str.indexOf("\n");
    let last = 0;

    // If the string starts with a newline char, then adding a mark is redundant.
    // This catches both "no newlines" and "newline after several chars".
    if (hasMap && i !== 0) {
      this._map!.mark(
        position,
        str,
        line,
        column,
        identifierName,
        identifierNamePos,
        filename,
      );
    }

    // Now, find each remaining newline char in the string.
    while (i !== -1) {
      position.line++;
      position.column = 0;
      last = i + 1;

      // We mark the start of each line, which happens directly after this newline char
      // unless this is the last char.
      // When manually adding multi-line content (such as a comment), `line` will be `undefined`.
      if (last < len && line !== undefined) {
        line++;
        if (hasMap) {
          this._map!.mark(
            position,
            str,
            line,
            0,
            undefined,
            undefined,
            filename,
          );
        }
      }
      i = str.indexOf("\n", last);
    }
    position.column += len - last;
  }

  _flattenChunk(): void {
    // Force V8 to flatten the pending chunk in place. Note that neither
    // `+str` (the "flatstr" trick) nor `str.charCodeAt(0)` flatten a cons
    // string: they walk it. Searching does.
    this._str.includes("\0");
    this._buf += this._str;
    this._str = "";
  }

  removeLastSemicolon(): void {
    if (this._queuedChar === charcodes.semicolon) {
      this._queuedChar = 0;
    }
  }

  getLastChar(checkQueue?: boolean): number {
    if (!checkQueue) {
      return this._last;
    }
    const queuedChar = this._queuedChar;
    return queuedChar !== 0 ? queuedChar : this._last;
  }

  /**
   * This will only detect at most 1 newline after a call to `flush()`,
   * but this has not been found so far, and an accurate count can be achieved if needed later.
   */
  getNewlineCount(): number {
    return this._queuedChar === 0 && this._last === charcodes.lineFeed ? 1 : 0;
  }

  hasContent(): boolean {
    return this._last !== 0; /*|| this._queuedChar !== 0*/
  }

  /**
   * Sets a given position as the current source location so generated code after this call
   * will be given this position in the sourcemap.
   */

  source(prop: "start" | "end", loc: Loc): void {
    if (!this._map) return;

    // Since this is called extremely often, we reuse the same _sourcePosition
    // object for the whole lifetime of the buffer.
    this._normalizePosition(prop, loc, 0);
  }

  sourceWithOffset(
    prop: "start" | "end",
    loc: Loc,
    columnOffset: number,
  ): void {
    if (!this._map) return;

    this._normalizePosition(prop, loc, columnOffset);
  }

  _normalizePosition(prop: "start" | "end", loc: Loc, columnOffset: number) {
    this._flush();

    const pos = loc[prop];
    if (pos) {
      this.setSourcePosition(
        pos.line,
        // TODO: Fix https://github.com/babel/babel/issues/15712 in downstream
        Math.max(pos.column + columnOffset, 0),
      );
      this._sourcePosition.filename = loc.filename;
    }
  }

  setSourcePosition(line: number, column: number): void {
    const target = this._sourcePosition;
    target.line = line;
    target.column = column;
  }

  getCurrentColumn(): number {
    return this._position.column + (this._queuedChar ? 1 : 0);
  }

  getCurrentLine(): number {
    return this._position.line;
  }
}
