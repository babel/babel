export let path = new WeakMap();
export let scope = new WeakMap();

let pathStack = [];
let scopeStack = [];

export function clear() {
  clearPath();
  clearScope();
}

export function enter() {
  //pathStack.push(path);
  //scopeStack.push(scope);
  //clear();
}

export function exit() {
  //path = pathStack.pop();
  //scope = scopeStack.pop();
}

export function clearPath() {
  path = new WeakMap();
}

export function clearScope() {
  scope = new WeakMap();
}
