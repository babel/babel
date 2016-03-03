export let path = new WeakMap();
export let scope = new WeakMap();

export function clear() {
  path = new WeakMap();
  scope = new WeakMap();
}
