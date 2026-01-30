import UtilParser from "./util.ts";
import { SourceLocation, type Position } from "../util/location.ts";
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
  constructor(
    optionFlags: OptionFlags,
    filename: string | undefined | null,
    pos: number,
    loc?: Position,
  ) {
    this.start = pos;
    this.end = 0;
    if (loc !== undefined) this.loc = new SourceLocation(loc);
    if (optionFlags & OptionFlags.Ranges) this.range = [pos, 0];
    if (loc !== undefined && filename) {
      this.loc.filename = filename;
    }
  }

  type: string = "";
  declare start: number;
  declare end: number;
  declare loc: SourceLocation;
  declare range: [number, number];
  declare leadingComments: Comment[];
  declare trailingComments: Comment[];
  declare innerComments: Comment[];
  declare extra: Record<string, any>;
}
const NodePrototype = Node.prototype;

export type Undone<T extends NodeType> = Omit<T, "type">;

export abstract class NodeUtils extends UtilParser {
  // Used for estree plugin
  createPosition(loc: Position): Position {
    return loc;
  }

  startNode<T extends NodeType = never>(): Undone<T> {
    const { startLoc } = this.state;
    this.setLoc(startLoc);

    return this.startNodeAt<T>(startLoc);
  }

  startNodeAt<T extends NodeType = never>(loc: Position): Undone<T> {
    const { optionFlags, filename } = this;
    if (!(optionFlags & OptionFlags.Locations)) {
      return new Node(optionFlags, filename, loc.index) as unknown as Undone<T>;
    }
    return new Node(
      optionFlags,
      filename,
      loc.index,
      this.createPosition(loc),
    ) as unknown as Undone<T>;
  }

  /** Start a new node with a previous node's location. */
  startNodeAtNode<T extends NodeType = never>(
    type: Undone<NodeType>,
  ): Undone<T> {
    const { optionFlags, filename } = this;
    if (!(optionFlags & OptionFlags.Locations)) {
      return new Node(
        optionFlags,
        filename,
        type.start,
      ) as unknown as Undone<T>;
    }
    return new Node(
      optionFlags,
      filename,
      type.start,
      type.loc.start,
    ) as unknown as Undone<T>;
  }

  // Finish an AST node, adding `type` and `end` properties.

  finishNode<T extends NodeType>(node: Undone<T>, type: T["type"]): T {
    return this.finishNodeAt(node, type, this.state.lastTokEndLoc!);
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
    (node as T).type = type;
    node.end = endLoc.index;
    const { optionFlags } = this;
    if (optionFlags & OptionFlags.Locations) {
      node.loc.end = this.createPosition(endLoc);
    }
    if (optionFlags & OptionFlags.Ranges) node.range![1] = endLoc.index;
    if (optionFlags & OptionFlags.AttachComment) this.processComment(node as T);
    return node as T;
  }

  finishNodeAtNode<T extends NodeType>(
    node: Omit<T, "type">,
    type: T["type"],
    endNode: NodeType,
  ): T {
    if (process.env.NODE_ENV !== "production" && node.end > 0) {
      throw new Error(
        "Do not call finishNode*() twice on the same node." +
          " Instead use resetEndLocation() or change type directly.",
      );
    }
    (node as T).type = type;
    node.end = endNode.end;
    const { optionFlags } = this;
    if (optionFlags & OptionFlags.Locations) {
      node.loc.end = endNode.loc.end;
    }
    if (optionFlags & OptionFlags.Ranges) node.range![1] = node.end;
    if (optionFlags & OptionFlags.AttachComment) this.processComment(node as T);
    return node as T;
  }

  resetStartLocation(node: NodeBase, startLoc: Position): void {
    node.start = startLoc.index;
    const { optionFlags } = this;
    if (optionFlags & OptionFlags.Locations) {
      node.loc.start = this.createPosition(startLoc);
    }
    if (optionFlags & OptionFlags.Ranges) node.range![0] = startLoc.index;
  }

  resetEndLocation(
    node: NodeBase,
    endLoc: Position = this.state.lastTokEndLoc!,
  ): void {
    node.end = endLoc.index;
    const { optionFlags } = this;
    if (optionFlags & OptionFlags.Locations) {
      node.loc.end = this.createPosition(endLoc);
    }
    if (optionFlags & OptionFlags.Ranges) node.range![1] = endLoc.index;
  }

  /**
   * Reset the start location of node to the start location of locationNode
   */
  resetStartLocationFromNode(node: NodeBase, locationNode: NodeBase): void {
    node.start = locationNode.start;
    const { optionFlags } = this;
    if (optionFlags & OptionFlags.Locations) {
      node.loc.start = locationNode.loc.start;
    }
    if (optionFlags & OptionFlags.Ranges) node.range![0] = locationNode.start;
  }

  resetEndLocationFromNode(node: NodeBase, locationNode: NodeBase): void {
    node.end = locationNode.end;
    const { optionFlags } = this;
    if (optionFlags & OptionFlags.Locations) {
      node.loc.end = locationNode.loc.end;
    }
    if (optionFlags & OptionFlags.Ranges) node.range![1] = locationNode.end;
  }

  castNodeTo<T extends NodeType["type"]>(
    node: NodeType,
    type: T,
  ): Extract<NodeType, { type: T }> {
    node.type = type;
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
