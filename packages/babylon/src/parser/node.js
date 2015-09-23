/* @flow */

import Parser from "./index";
import { SourceLocation } from "../util/location";

// Start an AST node, attaching a start offset.

const pp = Parser.prototype;

class Node {
  constructor(pos?: number, loc?: SourceLocation) {
    this.type = "";
    this.start = pos;
    this.end = 0;
    this.loc = new SourceLocation(loc);
  }

  type: string;
  start: ?number;
  end: number;
  loc: SourceLocation;

  __clone(): Node {
    var node2 = new Node;
    for (var key in this) node2[key] = this[key];
    return node2;
  }
}

pp.startNode = function () {
  return new Node(this.state.start, this.state.startLoc);
};

pp.startNodeAt = function (pos, loc) {
  return new Node(pos, loc);
};

function finishNodeAt(node, type, pos, loc) {
  node.type = type;
  node.end = pos;
  node.loc.end = loc;
  this.processComment(node);
  return node;
}

// Finish an AST node, adding `type` and `end` properties.

pp.finishNode = function (node, type) {
  return finishNodeAt.call(this, node, type, this.state.lastTokEnd, this.state.lastTokEndLoc);
};

// Finish node at given position

pp.finishNodeAt = function (node, type, pos, loc) {
  return finishNodeAt.call(this, node, type, pos, loc);
};
