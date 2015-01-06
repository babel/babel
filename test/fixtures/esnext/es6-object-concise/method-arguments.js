var a = {
  echo(c) {
    return c;
  }
};

assert.strictEqual(a.echo(1), 1);
