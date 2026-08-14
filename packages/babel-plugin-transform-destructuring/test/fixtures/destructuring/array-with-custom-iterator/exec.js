function iteratorReturning(value) {
  return function () {
    var done = false;
    return {
      next: function () {
        if (done) return { done: true, value: undefined };
        done = true;
        return { done: false, value: value };
      },
    };
  };
}

// Array.isArray sees through a Proxy to its array target, but this Proxy serves its
// element only through Symbol.iterator and answers no positional read.
function makeProxy() {
  return new Proxy(["never-read"], {
    get: function (target, prop) {
      if (prop === Symbol.iterator) return iteratorReturning("from-iterator");
      return undefined;
    },
  });
}

var [fromProxy] = makeProxy();
expect(fromProxy).toBe("from-iterator");

// A real array carrying its own Symbol.iterator.
function makeArrayWithOwnIterator() {
  var arr = ["never-read"];
  Object.defineProperty(arr, Symbol.iterator, {
    value: iteratorReturning("from-iterator"),
  });
  return arr;
}

var [fromOwnIterator] = makeArrayWithOwnIterator();
expect(fromOwnIterator).toBe("from-iterator");

// A plain array keeps taking the fast path.
function makePlainArray() {
  return ["a", "b"];
}

var [a, b] = makePlainArray();
expect(a).toBe("a");
expect(b).toBe("b");
