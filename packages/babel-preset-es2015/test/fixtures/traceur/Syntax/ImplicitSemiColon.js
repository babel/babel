function f() {
  return
      42;
}

expect(f()).toBeUndefined();
