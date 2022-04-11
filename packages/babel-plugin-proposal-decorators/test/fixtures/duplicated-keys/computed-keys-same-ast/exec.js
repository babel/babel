var i = 0;

function getKey() {
  return (i++).toString();
}

var desc;

@(_ => desc = _)
class Foo {
  [getKey()]() {
    return 1;
  }

  [getKey()]() {
    return 2;
  }
}

expect(desc.elements).toHaveLength(2);

expect(desc.elements[0].key).toBe("0");
expect(desc.elements[0].descriptor.value()).toBe(1);

expect(desc.elements[1].key).toBe("1");
expect(desc.elements[1].descriptor.value()).toBe(2);

expect(i).toBe(2);
