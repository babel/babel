import type Parser from "./index";
import UtilParser from "./util";
import { SourceLocation, type Position } from "../util/location";
import type { Comment, Node as NodeType, NodeBase } from "../types";

// Start an AST node, attaching a start offset.

class Node implements NodeBase {
  constructor(parser: Parser, pos: number, loc: Position) {
    this.start = pos;
    this.end = 0;
    this.loc = new SourceLocation(loc);
    if (parser?.options.ranges) this.range = [pos, 0];
    if (parser?.filename) this.loc.filename = parser.filename;
  }

  type: string = "";
  declare start: number;
  declare end: number;
  declare loc: SourceLocation;
  declare range: [number, number];
  declare leadingComments: Array<Comment>;
  declare trailingComments: Array<Comment>;
  declare innerComments: Array<Comment>;
  declare extra: {
    [key: string]: any;
  };
}
const NodePrototype = Node.prototype;

if (!process.env.BABEL_8_BREAKING) {
  // @ts-expect-error
  NodePrototype.__clone = function (): Node {
    // @ts-expect-error
    const newNode: any = new Node();
    const keys = Object.keys(this);
    for (let i = 0, length = keys.length; i < length; i++) {
      const key = keys[i];
      // Do not clone comments that are already attached to the node
      if (
        key !== "leadingComments" &&
        key !== "trailingComments" &&
        key !== "innerComments"
      ) {
        newNode[key] =
          // @ts-expect-error: key must present in this
          this[key];
      }
    }

    return newNode;
  };
}

function clonePlaceholder(node: any): any {
  return cloneIdentifier(node);
}

export function cloneIdentifier(node: any): any {
  // We don't need to clone `typeAnnotations` and `optional`: because
  // cloneIdentifier is only used in object shorthand and named import/export.
  // Neither of them allow type annotations after the identifier or optional identifier
  const { type, start, end, loc, range, extra, name } = node;
  const cloned = Object.create(NodePrototype);
  cloned.type = type;
  cloned.start = start;
  cloned.end = end;
  cloned.loc = loc;
  cloned.range = range;
  cloned.extra = extra;
  cloned.name = name;
  if (type === "Placeholder") {
    cloned.expectedNode = node.expectedNode;
  }
  return cloned;
}

export function cloneStringLiteral(node: any): any {
  const { type, start, end, loc, range, extra } = node;
  if (type === "Placeholder") {
    return clonePlaceholder(node);
  }
  const cloned = Object.create(NodePrototype);
  cloned.type = type;
  cloned.start = start;
  cloned.end = end;
  cloned.loc = loc;
  cloned.range = range;
  if (node.raw !== undefined) {
    // estree set node.raw instead of node.extra
    cloned.raw = node.raw;
  } else {
    cloned.extra = extra;
  }
  cloned.value = node.value;
  return cloned;
}

export type Undone<T extends NodeType> = Omit<T, "type">;

export abstract class NodeUtils extends UtilParser {
  startNode<T extends NodeType>(): Undone<T> {
    // @ts-expect-error
    return new Node(this, this.state.start, this.state.startLoc);
  }

  startNodeAt<T extends NodeType>(pos: number, loc: Position): Undone<T> {
    // @ts-expect-error
    return new Node(this, pos, loc);
  }

  /** Start a new node with a previous node's location. */
  startNodeAtNode<T extends NodeType>(type: Undone<NodeType>): Undone<T> {
    return this.startNodeAt(type.start, type.loc.start);
  }

  // Finish an AST node, adding `type` and `end` properties.

  finishNode<T extends NodeType>(node: Undone<T>, type: T["type"]): T {
    return this.finishNodeAt(node, type, this.state.lastTokEndLoc);
  }

  // Finish node at given position

  finishNodeAt<T extends NodeType>(
    node: Omit<T, "type">,
    type: T["type"],
    endLoc: Position,
  ): T {
    if (process.env.NODE_ENV !== "production" && node.end > 0) {
      throw new Error(
        "Do not call finishNode*() twice on the same node." +
          " Instead use resetEndLocation() or change type directly.",
      );
    }
    // @ts-expect-error migrate to Babel types AST typings
    node.type = type;
    // @ts-expect-error migrate to Babel types AST typings
    node.end = endLoc.index;
    node.loc.end = endLoc;
    if (this.options.ranges) node.range[1] = endLoc.index;
    if (this.options.attachComment) this.processComment(node as T);
    return node as T;
  }

  resetStartLocation(node: NodeBase, start: number, startLoc: Position): void {
    node.start = start;
    node.loc.start = startLoc;
    if (this.options.ranges) node.range[0] = start;
  }

  resetEndLocation(
    node: NodeBase,
    endLoc: Position = this.state.lastTokEndLoc,
  ): void {
    node.end = endLoc.index;
    node.loc.end = endLoc;
    if (this.options.ranges) node.range[1] = endLoc.index;
  }

  /**
   * Reset the start location of node to the start location of locationNode
   */
  resetStartLocationFromNode(node: NodeBase, locationNode: NodeBase): void {
    this.resetStartLocation(node, locationNode.start, locationNode.loc.start);
  }
}
