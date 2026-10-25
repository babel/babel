import type * as t from "@babel/types";
import type NodePath from "./path/index.ts";

export function getCachedNodePath(parent: NodePath, node: t.Node) {
  const first = parent._childPath0;
  if (first?.node === node) return first;
  const second = parent._childPath1;
  if (second?.node === node) return second;
  return parent._childPaths?.get(node);
}

export function cacheNodePath(path: NodePath<t.Node | null>) {
  const { node, parentPath } = path;
  if (!parentPath || !node) return;

  if (!parentPath._childPath0) {
    parentPath._childPath0 = path;
  } else if (!parentPath._childPath1) {
    parentPath._childPath1 = path;
  } else {
    (parentPath._childPaths ??= new Map()).set(node, path);
  }
}

export function uncacheNodePath(path: NodePath<t.Node | null>) {
  const { node, parentPath } = path;
  if (!parentPath || !node) return;

  if (parentPath._childPath0 === path) {
    parentPath._childPath0 = undefined;
  } else if (parentPath._childPath1 === path) {
    parentPath._childPath1 = undefined;
  } else {
    parentPath._childPaths?.delete(node);
  }
}
