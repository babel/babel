function f(a, o) {
  for ({ p: void } of a);
  for ({ length: void } in a) {}
  for (({ p: void } = o);;) break;
  for (const x of a) ({ p: void } = o);
}
