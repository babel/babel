class A {
  #x;

  method() {
    obj?.#x = 1;
    obj?.#x += 2;
    obj?.#x ??= 3;
    obj?.#x.y = 4;
    obj?.#x.y += 5;
    obj?.#x.y ??= 6;
  }
}
