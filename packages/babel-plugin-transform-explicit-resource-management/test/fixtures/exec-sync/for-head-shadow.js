let log = [];
{
  for (using x of [null]) {
    const x = undefined;
    log.push(x);
  }
}

expect(log).toEqual([undefined]);
