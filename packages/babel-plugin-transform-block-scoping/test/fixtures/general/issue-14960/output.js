{
  switch (1) {
    case 1:
      expect(f()).toBe(1);
      function f() {
        return 1;
      }
  }
}
