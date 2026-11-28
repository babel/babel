function f(o) {
  for (const x of [1]) switch (x) {
    case 1:
      ({ a: o.x = 1 } = {});
  }
}
