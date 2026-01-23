import type NodePath from "./path/index.ts";
import type { ExplodedTraverseOptions } from "./index.ts";
import type * as t from "@babel/types";

export default class TraversalContext<S = unknown> {
  constructor(opts: ExplodedTraverseOptions<S>, state: S) {
    this.state = state;
    this.opts = opts;
  }

  declare state: S;
  declare opts: ExplodedTraverseOptions<S>;
  queue: NodePath<t.Node | null>[] | null = null;
  priorityQueue: NodePath<t.Node | null>[] | null = null;

  maybeQueue(path: NodePath<t.Node | null>, notPriority?: boolean) {
    if (this.queue) {
      if (notPriority) {
        this.queue.push(path);
      } else {
        this.priorityQueue!.push(path);
      }
    }
  }
}
