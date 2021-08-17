// This file contains that retrieve or validate anything related to the current paths ancestry.

import { VISITOR_KEYS } from "@babel/types";
import type * as t from "@babel/types";
import NodePath from "./index";

/**
 * Starting at the parent path of the current `NodePath` and going up the
 * tree, return the first `NodePath` that causes the provided `callback`
 * to return a truthy value, or `null` if the `callback` never returns a
 * truthy value.
 */

export function findParent(
  callback: (path: NodePath) => boolean,
): NodePath | null {
  let path = this;
  while ((path = path.parentPath)) {
    if (callback(path)) return path;
  }
  return null;
}

/**
 * Starting at current `NodePath` and going up the tree, return the first
 * `NodePath` that causes the provided `callback` to return a truthy value,
 * or `null` if the `callback` never returns a truthy value.
 */

export function find(
  this: NodePath,
  callback: (path: NodePath) => boolean,
): NodePath | null {
  let path = this;
  do {
    if (callback(path)) return path;
  } while ((path = path.parentPath));
  return null;
}

/**
 * Get the parent function of the current path.
 */

export function getFunctionParent(this: NodePath): NodePath<t.Function> | null {
  return this.findParent(p => p.isFunction()) as NodePath<t.Function> | null;
}

/**
 * Walk up the tree until we hit a parent node path in a list.
 */

export function getStatementParent(this: NodePath): NodePath<t.Statement> {
  let path = this;

  do {
    if (
      !path.parentPath ||
      (Array.isArray(path.container) && path.isStatement())
    ) {
      break;
    } else {
      path = path.parentPath;
    }
  } while (path);

  if (path && (path.isProgram() || path.isFile())) {
    throw new Error(
      "File/Program node, we can't possibly find a statement parent to this",
    );
  }

  return path as NodePath<t.Statement>;
}

/**
 * Get the deepest common ancestor and then from it, get the earliest relationship path
 * to that ancestor.
 *
 * Earliest is defined as being "before" all the other nodes in terms of list container
 * position and visiting key.
 */

export function getEarliestCommonAncestorFrom(
  this: NodePath,
  paths: Array<NodePath>,
): NodePath {
  return this.getDeepestCommonAncestorFrom(
    paths,
    function (deepest, i, ancestries) {
      let earliest;
      const keys = VISITOR_KEYS[deepest.type];

      for (const ancestry of ancestries) {
        const path = ancestry[i + 1];

        // first path
        if (!earliest) {
          earliest = path;
          continue;
        }

        // handle containers
        if (path.listKey && earliest.listKey === path.listKey) {
          // we're in the same container so check if we're earlier
          if (path.key < earliest.key) {
            earliest = path;
            continue;
          }
        }

        // handle keys
        const earliestKeyIndex = keys.indexOf(earliest.parentKey);
        const currentKeyIndex = keys.indexOf(path.parentKey as string);
        if (earliestKeyIndex > currentKeyIndex) {
          // key appears before so it's earlier
          earliest = path;
        }
      }

      return earliest;
    },
  );
}

/**
 * Get the earliest path in the tree where the provided `paths` intersect.
 *
 * TODO: Possible optimisation target.
 */

export function getDeepestCommonAncestorFrom(
  this: NodePath,
  paths: Array<NodePath>,
  filter?: (deepest: t.Node, i: number, ancestries: NodePath[][]) => NodePath,
): NodePath {
  if (!paths.length) {
    return this;
  }

  if (paths.length === 1) {
    return paths[0];
  }

  // minimum depth of the tree so we know the highest node
  let minDepth = Infinity;

  // last common ancestor
  let lastCommonIndex, lastCommon;

  // get the ancestors of the path, breaking when the parent exceeds ourselves
  const ancestries = paths.map(path => {
    const ancestry: NodePath[] = [];

    do {
      ancestry.unshift(path);
    } while ((path = path.parentPath) && path !== this);

    // save min depth to avoid going too far in
    if (ancestry.length < minDepth) {
      minDepth = ancestry.length;
    }

    return ancestry;
  });

  // get the first ancestry so we have a seed to assess all other ancestries with
  const first = ancestries[0];

  // check ancestor equality
  depthLoop: for (let i = 0; i < minDepth; i++) {
    const shouldMatch = first[i];

    for (const ancestry of ancestries) {
      if (ancestry[i] !== shouldMatch) {
        // we've hit a snag
        break depthLoop;
      }
    }

    // next iteration may break so store these so they can be returned
    lastCommonIndex = i;
    lastCommon = shouldMatch;
  }

  if (lastCommon) {
    if (filter) {
      return filter(lastCommon, lastCommonIndex, ancestries);
    } else {
      return lastCommon;
    }
  } else {
    throw new Error("Couldn't find intersection");
  }
}

/**
 * Build an array of node paths containing the entire ancestry of the current node path.
 *
 * NOTE: The current node path is included in this.
 */

export function getAncestry(this: NodePath): Array<NodePath> {
  let path = this;
  const paths = [];
  do {
    paths.push(path);
  } while ((path = path.parentPath));
  return paths;
}

/**
 * A helper to find if `this` path is an ancestor of @param maybeDescendant
 */
export function isAncestor(this: NodePath, maybeDescendant: NodePath): boolean {
  return maybeDescendant.isDescendant(this);
}

/**
 * A helper to find if `this` path is a descendant of @param maybeAncestor
 */
export function isDescendant(this: NodePath, maybeAncestor: NodePath): boolean {
  return !!this.findParent(parent => parent === maybeAncestor);
}

export function inType(this: NodePath, ...candidateTypes: string[]): boolean {
  let path = this;
  while (path) {
    for (const type of candidateTypes) {
      if (path.node.type === type) return true;
    }
    path = path.parentPath;
  }

  return false;
}
