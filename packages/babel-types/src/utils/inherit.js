// @flow
export default function inherit(
  key: string,
  child: Object,
  parent: Object,
): void {
  if (child && parent) {
    child[key] = Array.from(
      new Set([].concat(child[key], parent[key]).filter(Boolean)),
    );
  }
}
