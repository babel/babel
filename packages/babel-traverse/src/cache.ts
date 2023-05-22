import type { Node } from "@babel/types";
import type NodePath from "./path";
import type Scope from "./scope";

export let path: WeakMap<Node, Map<Node, NodePath>> = new WeakMap();
export let scope: WeakMap<Node, Scope> = new WeakMap();

export function clear() {
  clearPath();
  clearScope();
}

export function clearPath() {
  path = new WeakMap();
}

export function clearScope() {
  scope = new WeakMap();
}
