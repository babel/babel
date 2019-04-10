// @flow

import { SourceLocation, type Position } from "../util/location";
import type { Comment, Node as NodeType, NodeBase } from "../types";

import { options, filename, state } from "./index";
import { processComment } from "./comments";

class Node implements NodeBase {
  constructor(pos: number, loc: Position) {
    this.type = "";
    this.start = pos;
    this.end = 0;
    this.loc = new SourceLocation(loc);
    if (options.ranges) this.range = [pos, 0];
    if (filename) this.loc.filename = filename;
  }

  type: string;
  start: number;
  end: number;
  loc: SourceLocation;
  range: [number, number];
  leadingComments: Array<Comment>;
  trailingComments: Array<Comment>;
  innerComments: Array<Comment>;
  extra: { [key: string]: any };

  __clone(): this {
    // $FlowIgnore
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
        // $FlowIgnore
        newNode[key] = this[key];
      }
    }

    return newNode;
  }
}

export function startNode<T: NodeType>(): T {
  // $FlowIgnore
  return new Node(state.start, state.startLoc);
}

export function startNodeAt<T: NodeType>(pos: number, loc: Position): T {
  // $FlowIgnore
  return new Node(pos, loc);
}

/** Start a new node with a previous node's location. */
export function startNodeAtNode<T: NodeType>(type: NodeType): T {
  return startNodeAt(type.start, type.loc.start);
}

// Finish an AST node, adding `type` and `end` properties.

export function finishNode<T: NodeType>(node: T, type: string): T {
  return finishNodeAt(node, type, state.lastTokEnd, state.lastTokEndLoc);
}

// Finish node at given position

export function finishNodeAt<T: NodeType>(
  node: T,
  type: string,
  pos: number,
  loc: Position,
): T {
  node.type = type;
  node.end = pos;
  node.loc.end = loc;
  if (options.ranges) node.range[1] = pos;
  processComment(node);
  return node;
}

export function resetStartLocation(
  node: NodeBase,
  start: number,
  startLoc: Position,
): void {
  node.start = start;
  node.loc.start = startLoc;
  if (options.ranges) node.range[0] = start;
}

/**
 * Reset the start location of node to the start location of locationNode
 */
export function resetStartLocationFromNode(
  node: NodeBase,
  locationNode: NodeBase,
): void {
  resetStartLocation(node, locationNode.start, locationNode.loc.start);
}
