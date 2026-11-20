for (var a of x) {
  if (a) use(a);else use(a);
}
for (var b in x) {
  try {} catch {
    use(b);
  }
}
for (var c = 0; c < 1 && (c ? use(c) : true); c++) {
  while (use(c));
}
