import type { Node } from "@babel/types";
import type NodePath from "./path/index.ts";
import type Scope from "./scope/index.ts";
import type { HubInterface } from "./hub.ts";

let pathsCache: WeakMap<
  HubInterface | typeof nullHub,
  WeakMap<Node, Map<Node, NodePath>>
> = new WeakMap();
export { pathsCache as path };
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
  if (!process.env.BABEL_8_BREAKING) {
    // Only use Hub as part of the cache key in Babel 8, because it is a
    // breaking change (it causes incompatibilities with older `@babel/core`
    // versions: see https://github.com/babel/babel/pull/15759)
    hub = null;
  }
  return pathsCache.get(hub ?? nullHub)?.get(parent);
}

export function getOrCreateCachedPaths(hub: HubInterface | null, parent: Node) {
  if (!process.env.BABEL_8_BREAKING) {
    hub = null;
  }

  let parents = pathsCache.get(hub ?? nullHub);
  if (!parents) pathsCache.set(hub ?? nullHub, (parents = new WeakMap()));

  let paths = parents.get(parent);
  if (!paths) parents.set(parent, (paths = new Map()));

  return paths;
}
