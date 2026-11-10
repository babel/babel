const breakEvents = [];
function* gBreak() {
  while (true) {
    try {
      try {
        break;
      } finally {
        breakEvents.push("inner");
      }
    } finally {
      breakEvents.push("outer");
    }
  }
  yield "after";
}

expect(Array.from(gBreak())).toEqual(["after"]);
expect(breakEvents).toEqual(["inner", "outer"]);

const continueEvents = [];
function* gContinue() {
  for (let i = 0; i < 2; i++) {
    try {
      try {
        continue;
      } finally {
        continueEvents.push(`inner-${i}`);
      }
    } finally {
      continueEvents.push(`outer-${i}`);
    }
  }
  yield "done";
}

expect(Array.from(gContinue())).toEqual(["done"]);
expect(continueEvents).toEqual(["inner-0", "outer-0", "inner-1", "outer-1"]);

const outerEvents = [];
function* gOuterFinally() {
  try {
    while (true) {
      try {
        try {
          break;
        } finally {
          outerEvents.push("a");
        }
      } finally {
        outerEvents.push("b");
      }
    }
    outerEvents.push("afterLoop");
    yield 1;
  } finally {
    outerEvents.push("outer");
  }
}

const it = gOuterFinally();
expect(it.next()).toEqual({ value: 1, done: false });
expect(outerEvents).toEqual(["a", "b", "afterLoop"]);
expect(it.next()).toEqual({ value: undefined, done: true });
expect(outerEvents).toEqual(["a", "b", "afterLoop", "outer"]);
