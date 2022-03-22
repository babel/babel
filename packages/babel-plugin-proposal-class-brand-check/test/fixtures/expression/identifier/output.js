let hasInstance = () => null;

hasInstance();

class Foo {
  hasInstance() {
    return "foo";
  }

}