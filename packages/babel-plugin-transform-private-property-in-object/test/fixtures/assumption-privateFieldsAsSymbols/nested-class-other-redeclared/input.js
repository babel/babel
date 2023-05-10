class Foo {
  #foo = 1;
  #bar = 1;

  test() {
    class Nested {
      #bar = 2;

      test() {
        #foo in this;
        #bar in this;
      }
    }

    #foo in this;
    #bar in this;
  }
}
