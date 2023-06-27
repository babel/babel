import type { Node } from "@babel/types";
import type NodePath from "./path";
import type Scope from "./scope";
import type { HubInterface } from "./hub";

export let pathsCache: WeakMap<
  HubInterface | typeof nullHub,
  WeakMap<Node, Map<Node, NodePath>>
> = new WeakMap();
export let scope: WeakMap<Node, Scope> = new WeakMap();

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

// NodePath#hub can be null, but it's not a valid weakmap key because it
// cannot be collected by GC. Use an object, knowing tht it will not be
// collected anyway. It's not a memory leak because pathsCache.get(nullHub)
// is itself a weakmap, so its entries can still be collected.
const nullHub = Object.freeze({} as const);

export function getCachedPaths(hub: HubInterface | null, parent: Node) {
  return pathsCache.get(hub ?? nullHub)?.get(parent);
}

export function getOrCreateCachedPaths(hub: HubInterface | null, parent: Node) {
  let parents = pathsCache.get(hub ?? nullHub);
  if (!parents) pathsCache.set(hub ?? nullHub, (parents = new WeakMap()));

  let paths = parents.get(parent);
  if (!paths) parents.set(parent, (paths = new Map()));

  return paths;
}
