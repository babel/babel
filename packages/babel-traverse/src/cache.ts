import type * as t from "@babel/types";
import type NodePath from "./path";
import type Scope from "./scope";

export let path = new WeakMap<t.Node, Map<t.Node, NodePath>>();
export let scope = new WeakMap<t.Node, Scope>();

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
