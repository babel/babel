export let path = new WeakMap();
export let scope = new WeakMap();

export function clear() {
  clearPath();
  clearScope();
}

export function clearPath() {
  path = new WeakMap;
}

export function clearScope() {
  scope = new WeakMap;
}

export function copyPath(source, destination) {
  if (path.has(source)) {
    path.set(destination, path.get(source));
  }
}
