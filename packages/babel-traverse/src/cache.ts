import type { Node } from "@babel/types";
import type NodePath from "./path";
import type Scope from "./scope";
import type { Binding } from "./scope";

export let path: WeakMap<Node, Map<Node, NodePath>> = new WeakMap();
export let scope: WeakMap<Node, Scope> = new WeakMap();
export let binding: WeakMap<Node, Map<Node, Binding>> = new WeakMap();

export function clear() {
  clearPath();
  clearScope();
  clearBinding();
}

export function clearPath() {
  path = new WeakMap();
}

export function clearScope() {
  scope = new WeakMap();
}

export function clearBinding() {
  binding = new WeakMap();
}
