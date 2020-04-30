// @flow

export function removeUnnecessaryItems(
  items: Set<string>,
  overlapping: { [name: string]: string[] },
) {
  items.forEach(item => {
    overlapping[item]?.forEach(name => items.delete(name));
  });
}
