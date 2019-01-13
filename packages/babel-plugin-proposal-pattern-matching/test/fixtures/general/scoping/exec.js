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


let log;
(() => {
  log = [];
  do {
    case (42) {
      when v -> {
        log.push("when1");
        if (v) { continue }
        log.push("when2");
      }
    }
    log.push("do2");
  } while (0);
  log.push("end");
})();
expect(log).toEqual(["when1", "end"]);


let s;
(() => {
  s = "";
  for (const i of [1, 2, 3, 4, 5]) {
    s += `(${i}`;
    case (i) {
      when 2 -> continue;
      when 4 -> break;
    }
    s += `${i})`;
  }
  s += ".";
})();
expect(s).toEqual("(11)(2(33)(4."); // no 5


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
