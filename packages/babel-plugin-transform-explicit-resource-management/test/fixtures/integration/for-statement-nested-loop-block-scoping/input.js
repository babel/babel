for (let k = 0; k < 2; k++) {
  for (using x = R(k); ; ) {
    fns.push(() => x);
    break;
  }
}
