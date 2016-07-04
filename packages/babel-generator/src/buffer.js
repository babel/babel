import Position from "./position";
import type SourceMap from "./source-map";
import trimEnd from "lodash/trimEnd";

/**
 * The Buffer class exists to manage the queue of tokens being pushed onto the output string
 * in such a way that the final string buffer is treated as write-only until the final .get()
 * call. This allows V8 to optimize the output efficiently by not requiring it to store the
 * string in contiguous memory.
 */

export default class Buffer {
  constructor(map: ?SourceMap) {
    this._map = map;
  }

  _map: SourceMap = null;
  _buf: string = "";
  _last: string = "";
  _queue: Array = [];

  _position: Position = new Position;
  _sourcePosition: Object = {
    line: null,
    column: null,
    filename: null,
  };

  /**
   * Get the final string output from the buffer, along with the sourcemap if one exists.
   */

  get(): Object {
    return {
      code: trimEnd(this._buf),
      map: this._map ? this._map.get() : null,
    };
  }

  /**
   * Add a string to the buffer that cannot be reverted.
   */

  append(str: string): void {
    // If there the line is ending, adding a new mapping marker is redundant
    if (this._map && str[0] !== "\n") this._map.mark(this._position, this._sourcePosition.line,
      this._sourcePosition.column, this._sourcePosition.filename);

    this._buf += str;
    this._last = str[str.length - 1];
    this._position.push(str);
  }

  /**
   * Add a string to the buffer than can be reverted.
   */

  queue(str: string): void {
    this.append(str);
  }

  removeTrailingSpaces(): void {
    const oldBuf = this._buf;
    this._buf = this._buf.replace(/[ \t]+$/, "");
    this._last = this._buf[this._buf.length - 1];
    this._position.unshift(oldBuf.slice(this._buf.length));
  }

  removeTrailingNewline(): void {
    if (this._last !== "\n") return;

    this._buf = this._buf.slice(0, -1);
    this._last = this._buf[this._buf.length - 1];
    this._position.unshift("\n");
  }

  removeLastSemicolon(): void {
    if (this._last !== ";") return;

    this._buf = this._buf.slice(0, -1);
    this._last = this._buf[this._buf.length - 1];
    this._position.unshift(";");
  }

  endsWith(str: string): boolean {
    if (str.length === 1) return str === this._last;

    return this._buf.slice(-str.length) === str;
  }

  getLast(): string {
    return this._last;
  }

  hasContent(): boolean {
    return !!this._last;
  }

  /**
   * Sets a given position as the current source location so generated code after this call
   * will be given this position in the sourcemap.
   */

  source(prop: string, loc: Location): void {
    if (prop && !loc) return;

    let pos = loc ? loc[prop] : null;

    this._sourcePosition.line = pos ? pos.line : null;
    this._sourcePosition.column = pos ? pos.column : null;
    this._sourcePosition.filename = loc && loc.filename || null;
  }

  /**
   * Call a callback with a specific source location and restore on completion.
   */

  withSource(prop: string, loc: Location, cb: () => void): void {
    if (!this._map) return cb();

    // Use the call stack to manage a stack of "source location" data.
    let originalLine = this._sourcePosition.line;
    let originalColumn = this._sourcePosition.column;
    let originalFilename = this._sourcePosition.filename;

    this.source(prop, loc);

    cb();

    this._sourcePosition.line = originalLine;
    this._sourcePosition.column = originalColumn;
    this._sourcePosition.filename = originalFilename;
  }

  getCurrentColumn(): number {
    return this._position.column;
  }

  getCurrentLine(): number {
    return this._position.line;
  }
}
