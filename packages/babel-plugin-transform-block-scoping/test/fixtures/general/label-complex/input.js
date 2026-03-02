outer: while (t) {
  inner: while (t2) {
    for (let i = 0; i < 3; i++) {
      later(() => i);
      if (test1) break outer;
      else if (test2) break inner;
      else if (test3) continue outer;
      else if (test4) continue inner;
      else if (test5) break;
      else if (test6) continue;
    }
  }
}
