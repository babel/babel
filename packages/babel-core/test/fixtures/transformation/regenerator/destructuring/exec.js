function* foo() {
  var { bar } = { bar: "bar" };
  return bar;
}

assert.equal(foo().next().value, "bar");

function* foo2({ bar = 0 }) {
  return bar;
}

assert.equal(foo2({ bar: undefined }).next().value, 0);
assert.equal(foo2({ bar: 3 }).next().value, 3);

function* foo3() {
  loop:
    while(true) {
      // Changing "let" to "var" makes the tests pass.
      let { what, value } = yield "iteration";

      switch(what) {
        case "one":
          // Removing these 5 lines makes the tests pass.
          if(value === 1) {
            break loop;
          } else if(value === 2) {
            break loop;
          }
          break;
        case "two":
          // Removing these 3 lines makes the tests pass.
          ["a", "b"].map(function(v) {
            return value + v;
          });

          break loop;
          break;
        case "three":
          break loop;
          break;
      }
    }
}

var gen3 = foo3();

assert.equal(gen3.next().value, "iteration");
assert.equal(gen3.next({what: "one", value: 3}).done, false);
assert.equal(gen3.next({what: "one", value: 2}).done, true);

var gen4 = foo3();
assert.equal(gen4.next().value, "iteration");
assert.equal(gen4.next({what: "two", value: "sometext"}).done, true);

var gen5 = foo3();
assert.equal(gen5.next().value, "iteration");
assert.equal(gen5.next({what: "three"}).done, true);
