import type SourceMap from "./source-map";
import trimRight from "trim-right";

const SPACES_RE = /^[ \t]+$/;

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
  _buf: Array = [];
  _last: string = "";
  _queue: Array = [];

  _position: Object = {
    line: 1,
    column: 0,
  };
  _sourcePosition: Object = {
    identifierName: null,
    line: null,
    column: null,
    filename: null,
  };
  _disallowedPop: Object | null = null;

  /**
   * Get the final string output from the buffer, along with the sourcemap if one exists.
   */

  get(): Object {
    this._flush();

    const map = this._map;
    const result = {
      // Whatever trim is used here should not execute a regex against the
      // source string since it may be arbitrarily large after all transformations
      code: trimRight(this._buf.join("")),
      map: null,
      rawMappings: map && map.getRawMappings(),
    };

    if (map) {
      // The `.map` property is lazy to allow callers to use the raw mappings
      // without any overhead
      Object.defineProperty(result, "map", {
        configurable: true,
        enumerable: true,
        get() {
          return (this.map = map.get());
        },
        set(value) {
          Object.defineProperty(this, "map", { value, writable: true });
        },
      });
    }

    return result;
  }

  /**
   * Add a string to the buffer that cannot be reverted.
   */

  append(str: string): void {
    this._flush();
    const {
      line,
      column,
      filename,
      identifierName,
      force,
    } = this._sourcePosition;
    this._append(str, line, column, identifierName, filename, force);
  }

  /**
   * Add a string to the buffer than can be reverted.
   */

  queue(str: string): void {
    // Drop trailing spaces when a newline is inserted.
    if (str === "\n") {
      while (this._queue.length > 0 && SPACES_RE.test(this._queue[0][0])) {
        this._queue.shift();
      }
    }

    const {
      line,
      column,
      filename,
      identifierName,
      force,
    } = this._sourcePosition;
    this._queue.unshift([str, line, column, identifierName, filename, force]);
  }

  _flush(): void {
    let item;
    while ((item = this._queue.pop())) this._append(...item);
  }

  _append(
    str: string,
    line: number,
    column: number,
    identifierName: ?string,
    filename: ?string,
    force?: boolean,
  ): void {
    if (!str) return;

    // If there the line is ending, adding a new mapping marker is redundant
    if (this._map && str[0] !== "\n") {
      this._map.mark(
        this._position.line,
        this._position.column,
        line,
        column,
        identifierName,
        filename,
        force,
      );
    }

    this._buf.push(str);
    this._last = str[str.length - 1];

    for (let i = 0; i < str.length; i++) {
      if (str[i] === "\n") {
        this._position.line++;
        this._position.column = 0;
      } else {
        this._position.column++;
      }
    }
  }

  removeTrailingNewline(): void {
    if (this._queue.length > 0 && this._queue[0][0] === "\n") {
      this._queue.shift();
    }
  }

  removeLastSemicolon(): void {
    if (this._queue.length > 0 && this._queue[0][0] === ";") {
      this._queue.shift();
    }
  }

  endsWith(suffix: string): boolean {
    // Fast path to avoid iterating over this._queue.
    if (suffix.length === 1) {
      let last;
      if (this._queue.length > 0) {
        const str = this._queue[0][0];
        last = str[str.length - 1];
      } else {
        last = this._last;
      }

      return last === suffix;
    }

    const end =
      this._last + this._queue.reduce((acc, item) => item[0] + acc, "");
    if (suffix.length <= end.length) {
      return end.slice(-suffix.length) === suffix;
    }

    // We assume that everything being matched is at most a single token plus some whitespace,
    // which everything currently is, but otherwise we'd have to expand _last or check _buf.
    return false;
  }

  hasContent(): boolean {
    return this._queue.length > 0 || !!this._last;
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
  exactSource(loc: Object, cb: () => void) {
    // In cases where parent expressions start at the same locations as the
    // identifier itself, the current active location could already be the
    // start of this range. We use 'force' here to explicitly start a new
    // mapping range for this new token.
    this.source("start", loc, true /* force */);

    cb();

    // In cases where tokens are printed after this item, we want to
    // ensure that they get the location of the _end_ of the identifier.
    // To accomplish this, we assign the location and explicitly disable
    // the standard Buffer withSource previous-position "reactivation"
    // logic. This means that if another item calls '.source()' to set
    // the location after the identifier, it is fine, but the position won't
    // be automatically replaced with the previous value.
    this.source("end", loc);
    this._disallowPop("start", loc);
  }

  /**
   * Sets a given position as the current source location so generated code after this call
   * will be given this position in the sourcemap.
   */

  source(prop: string, loc: Location, force?: boolean): void {
    if (prop && !loc) return;

    // Since this is called extremly often, we re-use the same _sourcePosition
    // object for the whole lifetime of the buffer.
    this._normalizePosition(prop, loc, this._sourcePosition, force);
  }

  /**
   * Call a callback with a specific source location and restore on completion.
   */

  withSource(prop: string, loc: Location, cb: () => void): void {
    if (!this._map) return cb();

    // Use the call stack to manage a stack of "source location" data because
    // the _sourcePosition object is mutated over the course of code generation,
    // and constantly copying it would be slower.
    const originalLine = this._sourcePosition.line;
    const originalColumn = this._sourcePosition.column;
    const originalFilename = this._sourcePosition.filename;
    const originalIdentifierName = this._sourcePosition.identifierName;

    this.source(prop, loc);

    cb();

    if (
      // If the current active position is forced, we only want to reactivate
      // the old position if it is different from the newest position.
      (!this._sourcePosition.force ||
        this._sourcePosition.line !== originalLine ||
        this._sourcePosition.column !== originalColumn ||
        this._sourcePosition.filename !== originalFilename) &&
      // Verify if reactivating this specific position has been disallowed.
      (!this._disallowedPop ||
        this._disallowedPop.line !== originalLine ||
        this._disallowedPop.column !== originalColumn ||
        this._disallowedPop.filename !== originalFilename)
    ) {
      this._sourcePosition.line = originalLine;
      this._sourcePosition.column = originalColumn;
      this._sourcePosition.filename = originalFilename;
      this._sourcePosition.identifierName = originalIdentifierName;
      this._sourcePosition.force = false;
      this._disallowedPop = null;
    }
  }

  /**
   * Allow printers to disable the default location-reset behavior of the
   * sourcemap output, so that certain printers can be sure that the
   * "end" location that they set is actually treated as the end position.
   */
  _disallowPop(prop: string, loc: Location) {
    if (prop && !loc) return;

    this._disallowedPop = this._normalizePosition(prop, loc);
  }

  _normalizePosition(
    prop: string,
    loc: Object,
    targetObj: Object,
    force?: boolean,
  ) {
    const pos = loc ? loc[prop] : null;

    if (targetObj === undefined) {
      // Initialize with fields so that the object doesn't change shape.
      targetObj = {
        identifierName: null,
        line: null,
        column: null,
        filename: null,
        force: false,
      };
    }

    const origLine = targetObj.line;
    const origColumn = targetObj.column;
    const origFilename = targetObj.filename;

    targetObj.identifierName =
      (prop === "start" && loc && loc.identifierName) || null;
    targetObj.line = pos ? pos.line : null;
    targetObj.column = pos ? pos.column : null;
    targetObj.filename = (loc && loc.filename) || null;

    // We want to skip reassigning `force` if we're re-setting the same position.
    if (
      force ||
      targetObj.line !== origLine ||
      targetObj.column !== origColumn ||
      targetObj.filename !== origFilename
    ) {
      targetObj.force = force;
    }

    return targetObj;
  }

  getCurrentColumn(): number {
    const extra = this._queue.reduce((acc, item) => item[0] + acc, "");
    const lastIndex = extra.lastIndexOf("\n");

    return lastIndex === -1
      ? this._position.column + extra.length
      : extra.length - 1 - lastIndex;
  }

  getCurrentLine(): number {
    const extra = this._queue.reduce((acc, item) => item[0] + acc, "");

    let count = 0;
    for (let i = 0; i < extra.length; i++) {
      if (extra[i] === "\n") count++;
    }

    return this._position.line + count;
  }
}
