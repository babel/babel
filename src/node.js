import { Parser } from "./state";
import { SourceLocation } from "./location";

// Start an AST node, attaching a start offset.

const pp = Parser.prototype;

export class Node {
  constructor(parser, pos, loc) {
    this.type = "";
    this.start = pos;
    this.end = 0;

    if (parser) {
      if (parser.options.locations) {
        this.loc = new SourceLocation(loc);
      }

      if (parser.options.ranges) {
        this.range = [pos, 0];
      }
    }
  }

  __clone() {
    var node2 = new Node;
    for (var key in this) node2[key] = this[key];
    return node2;
  }
}

pp.startNode = function () {
  return new Node(this, this.start, this.startLoc);
};

pp.startNodeAt = function (pos, loc) {
  return new Node(this, pos, loc);
};

function finishNodeAt(node, type, pos, loc) {
  node.type = type;
  node.end = pos;
  if (this.options.locations) node.loc.end = loc;
  if (this.options.ranges) node.range[1] = pos;
  this.processComment(node);
  return node;
}

// Finish an AST node, adding `type` and `end` properties.

pp.finishNode = function (node, type) {
  return finishNodeAt.call(this, node, type, this.lastTokEnd, this.lastTokEndLoc);
};

// Finish node at given position

pp.finishNodeAt = function (node, type, pos, loc) {
  return finishNodeAt.call(this, node, type, pos, loc);
};
