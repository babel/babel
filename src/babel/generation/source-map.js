import sourceMap from "source-map";
import * as t from "../types";

/**
 * [Please add a description.]
 */

export default class SourceMap {
  constructor(position, opts, code) {
    this.position = position;
    this.opts     = opts;

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
   * [Please add a description.]
   */

  get() {
    var map = this.map;
    if (map) {
      return map.toJSON();
    } else {
      return map;
    }
  }

  /**
   * [Please add a description.]
   */

  mark(node, type) {
    var loc = node.loc;
    if (!loc) return; // no location info

    var map = this.map;
    if (!map) return; // no source map

    if (t.isProgram(node) || t.isFile(node)) return; // illegal mapping nodes

    var position = this.position;

    var generated = {
      line: position.line,
      column: position.column
    };

    var original = loc[type];

    map.addMapping({
      source: this.opts.sourceFileName,
      generated: generated,
      original: original
    });
  }
}
