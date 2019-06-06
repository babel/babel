// test that toConsumableArray clones the array.

function foo() {
  const x = [...arguments];

  expect(x).not.toBe(arguments);
}

foo(1,2);
