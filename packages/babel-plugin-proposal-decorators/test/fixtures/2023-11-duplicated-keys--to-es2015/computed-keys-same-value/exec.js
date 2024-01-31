expect(() => {
  var i = 0;
  var j = 0;

  function getKeyI() {
    return (i++).toString();
  }
  function getKeyJ() {
    return (j++).toString();
  }

  let elements = [];

  function dec(fn, context) {
    elements.push({ fn, context });
  }

  class Foo {
    @dec
    [getKeyI()]() {
      return 1;
    }

    @dec
    [getKeyJ()]() {
      return 2;
    }
  }
}).toThrow("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: 0")
