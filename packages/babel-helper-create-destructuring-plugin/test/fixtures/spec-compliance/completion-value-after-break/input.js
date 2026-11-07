switch (k) {
  case 0:
    ({ a, ...b } = o);
    break;
  case 1:
    0;
}
L: {
  if (k) {
    [a] = o;
    break L;
  }
  0;
}
