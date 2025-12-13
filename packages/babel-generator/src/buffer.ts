import type SourceMap from "./source-map.ts";
import type { SourceLocation } from "@babel/types";

// We inline this package
// eslint-disable-next-line import/no-extraneous-dependencies
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

export default class Buffer {
  constructor(map: SourceMap | null, indentChar: string) {
    this._map = map;
    this._indentChar = indentChar;
  }

  _map: SourceMap | null = null;
  _buf = "";
  _str = "";
  _appendCount = 0;
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
      // Used as a marker for backwards compatibility. We moved input map merging
      // into the generator. We cannot merge the input map a second time, so the
      // presence of this field tells us we've already done the work.
      get __mergedMap() {
        return this.map;
      },
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

  append(str: string, maybeNewline: boolean): void {
    this._flush();
    this._append(str, maybeNewline);
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
        repeat > 64
          ? this._indentChar.repeat(repeat)
          : spaceIndents[repeat / 2];
      this._str += indent;
    } else {
      this._str +=
        repeat > 1
          ? String.fromCharCode(char).repeat(repeat)
          : String.fromCharCode(char);
    }

    const isSpace = char === charcodes.space;
    const position = this._position;
    if (char !== charcodes.lineFeed) {
      if (this._map) {
        const sourcePos = this._sourcePosition;
        if (useSourcePos && sourcePos) {
          this._map.mark(
            position,
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
          this._map.mark(position);
        }
      }

      position.column += repeat;
    } else {
      position.line++;
      position.column = 0;
    }
  }

  _append(str: string, maybeNewline: boolean): void {
    const len = str.length;
    const position = this._position;
    const sourcePos = this._sourcePosition;

    this._last = -1;

    if (++this._appendCount > 4096) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      +this._str; // Unexplainable huge performance boost. Ref: https://github.com/davidmarkclements/flatstr License: MIT
      this._buf += this._str;
      this._str = str;
      this._appendCount = 0;
    } else {
      this._str += str;
    }

    const hasMap = this._map !== null;

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
          this._map!.mark(position, line, 0, undefined, undefined, filename);
        }
      }
      i = str.indexOf("\n", last);
    }
    position.column += len - last;
  }

  removeLastSemicolon(): void {
    if (this._queuedChar === charcodes.semicolon) {
      this._queuedChar = 0;
    }
  }

  getLastChar(): number {
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
    return this._last !== 0 /*|| this._queuedChar !== 0*/;
  }

  /**
   * Certain sourcemap usecases expect mappings to be more accurate than
   * Babel's generic sourcemap handling allows. For now, we special-case
   * identifiers to allow for the primary cases to work.
   * The goal of this line is to ensure that the map output from Babel will
   * have an exact range on identifiers in the output code. Without this
   * line, Babel would potentially include some number of trailing tokens
   * that are printed after the identifier, but before another location has
   * been assigned.
   * This allows tooling like Rollup and Webpack to more accurately perform
   * their own transformations. Most importantly, this allows the import/export
   * transformations performed by those tools to loose less information when
   * applying their own transformations on top of the code and map results
   * generated by Babel itself.
   *
   * The primary example of this is the snippet:
   *
   *   import mod from "mod";
   *   mod();
   *
   * With this line, there will be one mapping range over "mod" and another
   * over "();", where previously it would have been a single mapping.
   */
  exactSource(loc: Loc, cb: () => void) {
    if (!this._map) {
      cb();
      return;
    }

    this.source("start", loc);
    const identifierName = loc.identifierName;
    const sourcePos = this._sourcePosition;
    if (identifierName != null) {
      this._canMarkIdName = false;
      sourcePos.identifierName = identifierName;
    }
    cb();

    if (identifierName != null) {
      this._canMarkIdName = true;
      sourcePos.identifierName = undefined;
      sourcePos.identifierNamePos = undefined;
    }
    this.source("end", loc);
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
    const target = this._sourcePosition;

    if (pos) {
      target.line = pos.line;
      // TODO: Fix https://github.com/babel/babel/issues/15712 in downstream
      target.column = Math.max(pos.column + columnOffset, 0);
      target.filename = loc.filename;
    }
  }

  getCurrentColumn(): number {
    return this._position.column + (this._queuedChar ? 1 : 0);
  }

  getCurrentLine(): number {
    return this._position.line;
  }
}
