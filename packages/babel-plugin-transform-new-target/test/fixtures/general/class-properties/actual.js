class Foo {
  test = function() {
    new.target;
  };

  test2 = () => {
    new.target;
  }
}
