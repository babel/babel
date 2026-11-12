class Foo {
  #foo = 1;

  test() {
    class Nested {
      test() {
        #foo in this;
      }
    }

    #foo in this;
  }
}
