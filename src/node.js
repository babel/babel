import { Parser } from "./state";
import { SourceLocation } from "./locutil";

// Start an AST node, attaching a start offset.

const pp = Parser.prototype;

export class Node {
  constructor(parser, pos, loc) {
    this.type = "";
    this.start = pos;
    this.end = 0;

    if (parser) {
      this.loc = new SourceLocation(loc);
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
  node.loc.end = loc;
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
