// @flow

export function removeUnnecessaryItems(
  items: Set<string>,
  overlapping: { [name: string]: string[] },
) {
  items.forEach(item => {
    // $FlowIgnore Flow doesn't support calls in optional chains
    overlapping[item]?.forEach(name => items.delete(name));
  });
}
