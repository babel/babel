const p = async do {
  for await (const x of xs) {}
  await using resource = value;
  for (await using x of xs) {}
  await done;
};
