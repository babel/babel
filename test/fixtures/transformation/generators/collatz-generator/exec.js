function *gen(n) {
  var count = 0;

  yield n;

  while (n !== 1) {
    count += 1;

    if (n % 2) {
      yield n = n * 3 + 1;
    } else {
      yield n >>= 1;
    }
  }

  return count;
}

function collatz(n) {
  var result = [n];

  while (n !== 1) {
    if (n % 2) {
      n *= 3;
      n += 1;
    } else {
      n >>= 1;
    }

    result.push(n);
  }

  return result;
}

var seven = collatz(7);
var fiftyTwo = seven.slice(seven.indexOf(52));
var eightyTwo = collatz(82);

genHelpers.check(gen(7), seven, 16);
genHelpers.check(gen(52), fiftyTwo, 11);
genHelpers.check(gen(82), eightyTwo, 110);
