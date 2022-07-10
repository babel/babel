class A {
  #x;
  #m() {}

  test() {
    #x in this;
    #m in this;
    #x in this;
    #m in this;
  }
}
