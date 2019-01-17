var i = 0;
var j = 0;

function getKeyI() {
  return (i++).toString();
}
function getKeyJ() {
  return (j++).toString();
}

var desc;

@(_ => desc = _)
class Foo {
  [getKeyI()]() {
    return 1;
  }

  [getKeyJ()]() {
    return 2;
  }
}

expect(desc.elements).toHaveLength(1);

expect(desc.elements[0].key).toBe("0");
expect(desc.elements[0].descriptor.value()).toBe(2);

expect(i).toBe(1);
expect(j).toBe(1);
