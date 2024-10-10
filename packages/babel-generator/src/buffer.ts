import type SourceMap from "./source-map.ts";

// We inline this package
// eslint-disable-next-line import/no-extraneous-dependencies
import * as charcodes from "charcodes";

export type Pos = {
  line: number;
  column: number;
  index: number;
};
export type Loc = {
  start?: Pos;
  end?: Pos;
  filename?: string;
};
type SourcePos = {
  line: number | undefined;
  column: number | undefined;
  identifierName: string | undefined;
  filename: string | undefined;
};
type InternalSourcePos = SourcePos & { identifierNamePos: Pos };

type QueueItem = {
  char: number;
  repeat: number;
  line: number | undefined;
  column: number | undefined;
  identifierName: undefined; // Not used, it always undefined.
  identifierNamePos: undefined; // Not used, it always undefined.
  filename: string | undefined;
};

export default class Buffer {
  constructor(map: SourceMap | null, indentChar: string) {
    this._map = map;
    this._indentChar = indentChar;

    for (let i = 0; i < 64; i++) {
      this._fastIndentations.push(indentChar.repeat(i));
    }

    this._allocQueue();
  }

  _map: SourceMap = null;
  _buf = "";
  _str = "";
  _appendCount = 0;
  _last = 0;
  _queue: QueueItem[] = [];
  _queueCursor = 0;
  _canMarkIdName = true;
  _indentChar = "";
  _fastIndentations: string[] = [];

  _position = {
    line: 1,
    column: 0,
  };
  _sourcePosition: InternalSourcePos = {
    identifierName: undefined,
    identifierNamePos: undefined,
    line: undefined,
    column: undefined,
    filename: undefined,
  };

  _allocQueue() {
    const queue = this._queue;

    for (let i = 0; i < 16; i++) {
      queue.push({
        char: 0,
        repeat: 1,
        line: undefined,
        column: undefined,
        identifierName: undefined,
        identifierNamePos: undefined,
        filename: "",
      });
    }
  }

  _pushQueue(
    char: number,
    repeat: number,
    line: number | undefined,
    column: number | undefined,
    filename: string | undefined,
  ) {
    const cursor = this._queueCursor;
    if (cursor === this._queue.length) {
      this._allocQueue();
    }
    const item = this._queue[cursor];
    item.char = char;
    item.repeat = repeat;
    item.line = line;
    item.column = column;
    item.filename = filename;

    this._queueCursor++;
  }

  _popQueue(): QueueItem {
    if (this._queueCursor === 0) {
      throw new Error("Cannot pop from empty queue");
    }
    return this._queue[--this._queueCursor];
  }

  /**
   * Get the final string output from the buffer, along with the sourcemap if one exists.
   */

  get() {
    this._flush();

    const map = this._map;
    const result = {
      // Whatever trim is used here should not execute a regex against the
      // source string since it may be arbitrarily large after all transformations
      code: (this._buf + this._str).trimRight(),
      // Decoded sourcemap is free to generate.
      decodedMap: map?.getDecoded(),
      // Used as a marker for backwards compatibility. We moved input map merging
      // into the generator. We cannot merge the input map a second time, so the
      // presence of this field tells us we've already done the work.
      get __mergedMap() {
        return this.map;
      },
      // Encoding the sourcemap is moderately CPU expensive.
      get map() {
        const resultMap = map ? map.get() : null;
        result.map = resultMap;
        return resultMap;
      },
      set map(value) {
        Object.defineProperty(result, "map", { value, writable: true });
      },
      // Retrieving the raw mappings is very memory intensive.
      get rawMappings() {
        const mappings = map?.getRawMappings();
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

    this._append(str, this._sourcePosition, maybeNewline);
  }

  appendChar(char: number): void {
    this._flush();
    this._appendChar(char, 1, this._sourcePosition);
  }

  /**
   * Add a string to the buffer than can be reverted.
   */
  queue(char: number): void {
    // Drop trailing spaces when a newline is inserted.
    if (char === charcodes.lineFeed) {
      while (this._queueCursor !== 0) {
        const char = this._queue[this._queueCursor - 1].char;
        if (char !== charcodes.space && char !== charcodes.tab) {
          break;
        }

        this._queueCursor--;
      }
    }

    const sourcePosition = this._sourcePosition;
    this._pushQueue(
      char,
      1,
      sourcePosition.line,
      sourcePosition.column,
      sourcePosition.filename,
    );
  }

  /**
   * Same as queue, but this indentation will never have a sourcemap marker.
   */
  queueIndentation(repeat: number): void {
    if (repeat === 0) return;
    this._pushQueue(-1, repeat, undefined, undefined, undefined);
  }

  _flush(): void {
    const queueCursor = this._queueCursor;
    const queue = this._queue;
    for (let i = 0; i < queueCursor; i++) {
      const item: QueueItem = queue[i];
      this._appendChar(item.char, item.repeat, item);
    }
    this._queueCursor = 0;
  }

  _appendChar(
    char: number,
    repeat: number,
    sourcePos: InternalSourcePos,
  ): void {
    this._last = char;

    if (char === -1) {
      const fastIndentation = this._fastIndentations[repeat];
      if (fastIndentation !== undefined) {
        this._str += fastIndentation;
      } else {
        this._str +=
          repeat > 1 ? this._indentChar.repeat(repeat) : this._indentChar;
      }
    } else {
      this._str +=
        repeat > 1
          ? String.fromCharCode(char).repeat(repeat)
          : String.fromCharCode(char);
    }

    if (char !== charcodes.lineFeed) {
      this._mark(
        sourcePos.line,
        sourcePos.column,
        sourcePos.identifierName,
        sourcePos.identifierNamePos,
        sourcePos.filename,
      );
      this._position.column += repeat;
    } else {
      this._position.line++;
      this._position.column = 0;
    }

    if (this._canMarkIdName) {
      sourcePos.identifierName = undefined;
      sourcePos.identifierNamePos = undefined;
    }
  }

  _append(
    str: string,
    sourcePos: InternalSourcePos,
    maybeNewline: boolean,
  ): void {
    const len = str.length;
    const position = this._position;

    this._last = str.charCodeAt(len - 1);

    if (++this._appendCount > 4096) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      +this._str; // Unexplainable huge performance boost. Ref: https://github.com/davidmarkclements/flatstr License: MIT
      this._buf += this._str;
      this._str = str;
      this._appendCount = 0;
    } else {
      this._str += str;
    }

    if (!maybeNewline && !this._map) {
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
    if (i !== 0) {
      this._mark(line, column, identifierName, identifierNamePos, filename);
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
        this._mark(++line, 0, null, null, filename);
      }
      i = str.indexOf("\n", last);
    }
    position.column += len - last;
  }

  _mark(
    line: number | undefined,
    column: number | undefined,
    identifierName: string | undefined,
    identifierNamePos: Pos | undefined,
    filename: string | undefined,
  ): void {
    this._map?.mark(
      this._position,
      line,
      column,
      identifierName,
      identifierNamePos,
      filename,
    );
  }

  removeTrailingNewline(): void {
    const queueCursor = this._queueCursor;
    if (
      queueCursor !== 0 &&
      this._queue[queueCursor - 1].char === charcodes.lineFeed
    ) {
      this._queueCursor--;
    }
  }

  removeLastSemicolon(): void {
    const queueCursor = this._queueCursor;
    if (
      queueCursor !== 0 &&
      this._queue[queueCursor - 1].char === charcodes.semicolon
    ) {
      this._queueCursor--;
    }
  }

  getLastChar(): number {
    const queueCursor = this._queueCursor;
    return queueCursor !== 0 ? this._queue[queueCursor - 1].char : this._last;
  }

  /**
   * This will only detect at most 1 newline after a call to `flush()`,
   * but this has not been found so far, and an accurate count can be achieved if needed later.
   */
  getNewlineCount(): number {
    const queueCursor = this._queueCursor;
    let count = 0;
    if (queueCursor === 0) return this._last === charcodes.lineFeed ? 1 : 0;
    for (let i = queueCursor - 1; i >= 0; i--) {
      if (this._queue[i].char !== charcodes.lineFeed) {
        break;
      }
      count++;
    }
    return count === queueCursor && this._last === charcodes.lineFeed
      ? count + 1
      : count;
  }

  /**
   * check if current _last + queue ends with newline, return the character before newline
   */
  endsWithCharAndNewline(): number {
    const queue = this._queue;
    const queueCursor = this._queueCursor;
    if (queueCursor !== 0) {
      // every element in queue is one-length whitespace string
      const lastCp = queue[queueCursor - 1].char;
      if (lastCp !== charcodes.lineFeed) return;
      if (queueCursor > 1) {
        return queue[queueCursor - 2].char;
      } else {
        return this._last;
      }
    }
    // We assume that everything being matched is at most a single token plus some whitespace,
    // which everything currently is, but otherwise we'd have to expand _last or check _buf.
  }

  hasContent(): boolean {
    return this._queueCursor !== 0 || !!this._last;
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
  exactSource(loc: Loc | undefined, cb: () => void) {
    if (!this._map) {
      cb();
      return;
    }

    this.source("start", loc);
    // @ts-expect-error identifierName is not defined
    const identifierName = loc.identifierName;
    const sourcePos = this._sourcePosition;
    if (identifierName) {
      this._canMarkIdName = false;
      sourcePos.identifierName = identifierName;
    }
    cb();

    if (identifierName) {
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

  source(prop: "start" | "end", loc: Loc | undefined): void {
    if (!this._map) return;

    // Since this is called extremely often, we reuse the same _sourcePosition
    // object for the whole lifetime of the buffer.
    this._normalizePosition(prop, loc, 0);
  }

  sourceWithOffset(
    prop: "start" | "end",
    loc: Loc | undefined,
    columnOffset: number,
  ): void {
    if (!this._map) return;

    this._normalizePosition(prop, loc, columnOffset);
  }

  _normalizePosition(prop: "start" | "end", loc: Loc, columnOffset: number) {
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
    const queue = this._queue;
    const queueCursor = this._queueCursor;

    let lastIndex = -1;
    let len = 0;
    for (let i = 0; i < queueCursor; i++) {
      const item = queue[i];
      if (item.char === charcodes.lineFeed) {
        lastIndex = len;
      }
      len += item.repeat;
    }

    return lastIndex === -1 ? this._position.column + len : len - 1 - lastIndex;
  }

  getCurrentLine(): number {
    let count = 0;

    const queue = this._queue;
    for (let i = 0; i < this._queueCursor; i++) {
      if (queue[i].char === charcodes.lineFeed) {
        count++;
      }
    }

    return this._position.line + count;
  }
}
