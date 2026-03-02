{
  {
    var f = function f() {
      return 1;
    };
    switch (1) {
      case 1:
        expect(f()).toBe(1);
    }
  }
}
