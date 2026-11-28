async function f() {
  for await ((a as any) of y) {
    g(a);
  }
  for await (b.c! of y);
}
