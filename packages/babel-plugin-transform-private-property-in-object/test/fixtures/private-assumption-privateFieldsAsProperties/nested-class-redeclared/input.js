class Foo {
  #foo = 1;

  test() {
    class Nested {
      #foo = 2;

      test() {
        #foo in this;
      }
    }

    #foo in this;
  }
}
