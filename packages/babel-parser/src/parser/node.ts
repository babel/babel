import UtilParser from "./util.ts";
import { SourceLocation } from "../util/location.ts";
import type { Position } from "../util/location.ts";
import type {
  Comment,
  Node as NodeType,
  NodeBase,
  EstreeLiteral,
  Identifier,
  Placeholder,
  StringLiteral,
} from "../types.ts";
import { OptionFlags } from "../options.ts";

// Start an AST node, attaching a start offset.

class Node implements NodeBase {
  constructor(parser: UtilParser, pos: number, loc: Position, type: string) {
    this.type = type ?? "";
    this.start = pos;
    this.end = 0;
    this.loc = new SourceLocation(loc);
    if (parser?.optionFlags & OptionFlags.Ranges) this.range = [pos, 0];
    if (parser?.filename) this.loc.filename = parser.filename;
  }

  declare type: string;
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
  // @ts-expect-error __clone is not defined in Node prototype
  NodePrototype.__clone = function (): Node {
    const newNode = new Node(undefined, this.start, this.loc.start, "");
    const keys = Object.keys(this) as (keyof Node)[];
    for (let i = 0, length = keys.length; i < length; i++) {
      const key = keys[i];
      // Do not clone comments that are already attached to the node
      if (
        key !== "leadingComments" &&
        key !== "trailingComments" &&
        key !== "innerComments"
      ) {
        // @ts-expect-error cloning this to newNode
        newNode[key] = this[key];
      }
    }

    return newNode;
  };
}

export type Undone<T extends NodeType> = Omit<T, "type">;

export abstract class NodeUtils extends UtilParser {
  startNode<N extends NodeType = never>(type?: N["type"]): Undone<N>;
  startNode<N extends NodeType, T extends string = N["type"]>(
    type?: T,
  ): Undone<Extract<NodeType, { type: T }>>;
  startNode<T extends NodeType = never>(type?: T["type"]): Undone<T> {
    const loc = this.state.startLoc;
    return new Node(this, loc.index, loc, type) as unknown as Undone<T>;
  }

  startNodeAt<T extends NodeType = never>(
    loc: Position,
    type?: T["type"],
  ): Undone<T> {
    return new Node(this, loc.index, loc, type) as unknown as Undone<T>;
  }

  /** Start a newNode with a previous node's location. */
  startNodeAtNode<T extends NodeType = never>(
    node: Undone<NodeType>,
    type?: T["type"],
  ): Undone<T> {
    return this.startNodeAt(node.loc.start, type);
  }

  // Finish an AST node, adding `type` and `end` properties.

  finishNode<T extends NodeType>(node: Undone<T>, type?: T["type"]): T {
    return this.finishNodeAt(node, this.state.lastTokEndLoc, type);
  }

  // Finish node at given position

  finishNodeAt<T extends NodeType>(
    node: Omit<T, "type">,
    endLoc: Position,
    type?: T["type"],
  ): T {
    if (process.env.NODE_ENV !== "production" && node.end > 0) {
      throw new Error(
        "Do not call finishNode*() twice on the same node." +
          " Instead use resetEndLocation() or change type directly.",
      );
    }
    if (type !== undefined) (node as T).type = type;
    node.end = endLoc.index;
    node.loc.end = endLoc;
    if (this.optionFlags & OptionFlags.Ranges) node.range[1] = endLoc.index;
    if (this.optionFlags & OptionFlags.AttachComment) {
      this.processComment(node as T);
    }
    return node as T;
  }

  resetStartLocation(node: NodeBase, startLoc: Position): void {
    node.start = startLoc.index;
    node.loc.start = startLoc;
    if (this.optionFlags & OptionFlags.Ranges) node.range[0] = startLoc.index;
  }

  resetEndLocation(
    node: NodeBase,
    endLoc: Position = this.state.lastTokEndLoc,
  ): void {
    node.end = endLoc.index;
    node.loc.end = endLoc;
    if (this.optionFlags & OptionFlags.Ranges) node.range[1] = endLoc.index;
  }

  /**
   * Reset the start location of node to the start location of locationNode
   */
  resetStartLocationFromNode(node: NodeBase, locationNode: NodeBase): void {
    this.resetStartLocation(node, locationNode.loc.start);
  }

  castNodeTo<T extends NodeType["type"]>(
    node: NodeType | Undone<NodeType>,
    type: T,
  ): Extract<NodeType, { type: T }> {
    (node as NodeType).type = type;
    return node as Extract<NodeType, { type: T }>;
  }

  cloneIdentifier<T extends Identifier | Placeholder>(node: T): T {
    // We don't need to clone `typeAnnotations` and `optional`: because
    // cloneIdentifier is only used in object shorthand and named import/export.
    // Neither of them allow type annotations after the identifier or optional identifier
    const { type, start, end, loc, range, name } = node;
    const cloned = Object.create(NodePrototype);
    cloned.type = type;
    cloned.start = start;
    cloned.end = end;
    cloned.loc = loc;
    cloned.range = range;
    cloned.name = name;
    if (node.extra) cloned.extra = node.extra;
    return cloned;
  }

  cloneStringLiteral<T extends StringLiteral | EstreeLiteral | Placeholder>(
    node: T,
  ): T {
    const { type, start, end, loc, range, extra } = node;
    const cloned = Object.create(NodePrototype);
    cloned.type = type;
    cloned.start = start;
    cloned.end = end;
    cloned.loc = loc;
    cloned.range = range;
    cloned.extra = extra;
    cloned.value = (node as StringLiteral).value;
    return cloned;
  }
}
