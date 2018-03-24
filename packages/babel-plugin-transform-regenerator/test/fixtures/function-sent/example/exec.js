function *adder(total = 0) {
  let increment = 1;
  while (true) {
    let request = function.sent;
    switch (request) {
      case undefined: break;
      case "done": return total;
      default: increment = Number(request);
    }
    yield total += increment;
  }
}

let tally = adder();
tally.next(0.1);
tally.next(0.1);
tally.next(0.1);
let last = tally.next("done");
expect(last.value).toBe(0.30000000000000004);
