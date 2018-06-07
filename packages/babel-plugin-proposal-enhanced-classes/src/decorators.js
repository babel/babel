export function hasDecorators(path) {
  return path.node.decorators && path.node.decorators.length;
}
