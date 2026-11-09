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
