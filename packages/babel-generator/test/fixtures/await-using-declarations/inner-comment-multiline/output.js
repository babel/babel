async function f() {
  await /* 1 */ using a = b,
    c = d;
  await /* 2 */ using e = g(h);
  for (await /* 3 */ using i = j, k = l;;);
}