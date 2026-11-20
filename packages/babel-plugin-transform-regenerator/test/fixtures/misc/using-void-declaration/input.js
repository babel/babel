function* gen(resource, list) {
  using void = resource, first = list[0];
  for (using void of list);
  for (using void = resource; false; );
  yield first;
}

async function fn(resource) {
  await using void = await resource;
}
