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
  elements.push(fn);
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

expect(elements[0]()).toEqual(2);
expect(elements[1]()).toEqual(2);
