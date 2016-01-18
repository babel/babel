import sourceMap from "source-map";
import * as t from "babel-types";

/**
 * Build a sourcemap.
 */

export default class SourceMap {
  constructor(position, opts, code) {
    this.position = position;
    this.opts     = opts;
    this.last     = {generated: {}, original: {}};

    if (opts.sourceMaps) {
      this.map = new sourceMap.SourceMapGenerator({
        file: opts.sourceMapTarget,
        sourceRoot: opts.sourceRoot
      });

      this.map.setSourceContent(opts.sourceFileName, code);
    } else {
      this.map = null;
    }
  }

  /**
   * Get the sourcemap.
   */

  get() {
    let map = this.map;
    if (map) {
      return map.toJSON();
    } else {
      return map;
    }
  }

  /**
   * Mark a node's generated position, and add it to the sourcemap.
   */

  mark(node) {
    let loc = node.loc;
    if (!loc) return; // no location info

    let map = this.map;
    if (!map) return; // no source map

    if (t.isProgram(node) || t.isFile(node)) return; // illegal mapping nodes

    let position = this.position;

    let generated = {
      line: position.line,
      column: position.column
    };

    let original = loc.start;

    // Avoid emitting duplicates on either side. Duplicated
    // original values creates unnecesssarily large source maps
    // and increases compile time. Duplicates on the generated
    // side can lead to incorrect mappings.
    if (comparePosition(original, this.last.original)
        || comparePosition(generated, this.last.generated)) {
      return;
    }

    this.last = {
      source: this.opts.sourceFileName,
      generated: generated,
      original: original
    };

    map.addMapping(this.last);
  }
}

function comparePosition(a, b) {
  return a.line === b.line &&  a.column === b.column;
}
