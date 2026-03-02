async function f() {
  for await (async of []);

  for await (async of async) async;

  for await ((async) of []);

  for await (async.x of []);

  for await (\u0061sync of []);
}
