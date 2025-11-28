import type { Node } from "@babel/types";
import type NodePath from "./path/index.ts";
import type Scope from "./scope/index.ts";

let pathsCache = new WeakMap<Node, Map<Node, NodePath>>();
export { pathsCache as path };
export let scope = new WeakMap<Node, Scope>();

export function clear() {
  clearPath();
  clearScope();
}

export function clearPath() {
  pathsCache = new WeakMap();
}

export function clearScope() {
  scope = new WeakMap();
}

export function getCachedPaths(path: NodePath) {
  const { parent, parentPath } = path;
  return parentPath ? parentPath._store : pathsCache.get(parent);
}

export function getOrCreateCachedPaths(
  node: Node,
  parentPath?: NodePath | null,
) {
  if (parentPath) {
    return (parentPath._store ||= new Map());
  }

  let paths = pathsCache.get(node);
  if (!paths) pathsCache.set(node, (paths = new Map()));

  return paths;
}
