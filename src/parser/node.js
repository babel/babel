import Parser from "./index";
import { SourceLocation, type Position } from "../util/location";

// Start an AST node, attaching a start offset.

const pp = Parser.prototype;
const commentKeys = ["leadingComments", "trailingComments", "innerComments"];

class Node {
  constructor(parser?: Parser, pos?: number, loc?: Position) {
    this.type = "";
    this.start = pos;
    this.end = 0;
    this.loc = new SourceLocation(loc);
    if (parser && parser.options.ranges) this.range = [pos, 0];
    if (parser && parser.filename) this.loc.filename = parser.filename;
  }

  type: string;
  start: ?number;
  end: number;
  loc: SourceLocation;

  __clone(): Node {
    const node2 = new Node;
    for (const key in this) {
      // Do not clone comments that are already attached to the node
      if (commentKeys.indexOf(key) < 0) {
        node2[key] = this[key];
      }
    }

    return node2;
  }
}

pp.startNode = function () {
  return new Node(this, this.state.start, this.state.startLoc);
};

pp.startNodeAt = function (pos, loc) {
  return new Node(this, pos, loc);
};

function finishNodeAt(node, type, pos, loc) {
  node.type = type;
  node.end = pos;
  node.loc.end = loc;
  if (this.options.ranges) node.range[1] = pos;
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


/**
 * Reset the start location of node to the start location of locationNode
 */
pp.resetStartLocationFromNode = function (node, locationNode) {
  node.start = locationNode.start;
  node.loc.start = locationNode.loc.start;
  if (this.options.ranges) node.range[0] = locationNode.range[0];

  return node;
};
