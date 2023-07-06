import type { Node } from "@babel/types";
import type NodePath from "./path";
import type Scope from "./scope";
import type { HubInterface } from "./hub";

if (!IS_STANDALONE) {
  if (!USE_ESM) {
    if (!process.env.BABEL_8_BREAKING) {
      // `@babel/core` up to v7.22.5 relies on the (wrong) behavior
      // of NodePaths not taking into account .hub for their cache
      // key. To preserve backwards compatibility, we need to disable
      // the caching behavior in some cases.
      // The logic to detect _when_ we are being called by an old
      // `@babel/core` version is rather ugly, and it's in the
      // `traverse` function in ./index.ts and in the `static get`
      // function in ./path/index.ts

      // eslint-disable-next-line no-restricted-globals
      exports.noHubInCacheKeyForBackwardCompat = undefined;
    }
  }
}

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
  if (!IS_STANDALONE) {
    if (!USE_ESM) {
      if (!process.env.BABEL_8_BREAKING) {
        // eslint-disable-next-line no-restricted-globals
        if (exports.noHubInCacheKeyForBackwardCompat) hub = null;
      }
    }
  }
  return pathsCache.get(hub ?? nullHub)?.get(parent);
}

export function getOrCreateCachedPaths(hub: HubInterface | null, parent: Node) {
  if (!IS_STANDALONE) {
    if (!USE_ESM) {
      if (!process.env.BABEL_8_BREAKING) {
        // eslint-disable-next-line no-restricted-globals
        if (exports.noHubInCacheKeyForBackwardCompat) hub = null;
      }
    }
  }

  let parents = pathsCache.get(hub ?? nullHub);
  if (!parents) pathsCache.set(hub ?? nullHub, (parents = new WeakMap()));

  let paths = parents.get(parent);
  if (!paths) parents.set(parent, (paths = new Map()));

  return paths;
}
