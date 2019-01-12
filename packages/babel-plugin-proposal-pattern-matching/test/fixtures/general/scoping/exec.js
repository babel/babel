/*
  // From the spec:

  while (true) {
    case (42) {
      when v -> {
        var hoistMe = v
        const noHoist = v
        function alsoMe () { return v }
        if (v) { continue } // skips next line
        break // breaks out of the `while` loop
      }
      when y -> function foo () {} // function statement, not function expression
    }
  }
  console.log(hoistMe) // 42 -- variables are hoisted as in `if`
  console.log(alsoMe()) // 42 -- so are functions
  console.log(foo) // non-block function syntax treated as _statement_
  console.log(noHoist) // SyntaxError -- `const`/`let` are block-scoped
*/

(() => {
  do {
    case (42) {
      when v -> {
        var hoistMe = v;
        const noHoist = v;
        function alsoMe () { return v }
      }
    }
  } while (0);

  expect(hoistMe).toBe(42);

  // TODO spec says SyntaxError; is that quite right?
  // If so, test that specifically
  expect(typeof noHoist).toBe('undefined');

  expect(alsoMe()).toBe(42);
})();


(() => {
  do {
    case (42) {
      when v -> {}
      // TODO currently a SyntaxError
      // when y -> function foo () {}
    }
  } while (0);

  //expect(typeof foo).toBe('function');
})();


/* TODO broken
(() => {
  do {
    case (42) {
      when v -> {
        if (v) { continue }
        expect(true).toBe(false);
      }
    }
    expect(true).toBe(false);
  } while (0);
})();


(() => {
  do {
    case (42) {
      when v -> {
        break;  // TODO test distinctly from `continue`
        expect(true).toBe(false);
      }
    }
    expect(true).toBe(false);
  } while (0);
})();
*/


case ({ x: 1 }) {
  when { x } -> {
    expect(x).toBe(1);
  }
}

case ({ y: 1 }) {
 when { y } -> {
   const y = 3;
   expect(y).toBe(3);
  }
}

case ({ z: 1 }) {
  when { z } -> {
    expect(z).toBe(1);
    if ("window") {
      const z = "window";
      expect(z).toBe("window");
    }
    expect(z).toBe(1);
  }
}
