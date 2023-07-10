function* foo() {
  var { bar } = { bar: "bar" };
  return bar;
}

expect(foo().next().value).toBe("bar");;

function* foo2({ bar = 0 }) {
  return bar;
}

expect(foo2({ bar: undefined }).next().value).toBe(0);
expect(foo2({ bar: 3 }).next().value).toBe(3);

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

expect(gen3.next().value).toBe("iteration");
expect(gen3.next({what: "one", value: 3}).done).toBe(false);
expect(gen3.next({what: "one", value: 2}).done).toBe(true);

var gen4 = foo3();
expect(gen4.next().value).toBe("iteration");
expect(gen4.next({what: "two", value: "sometext"}).done).toBe(true);

var gen5 = foo3();
expect(gen5.next().value).toBe("iteration");
expect(gen5.next({what: "three"}).done).toBe(true);
