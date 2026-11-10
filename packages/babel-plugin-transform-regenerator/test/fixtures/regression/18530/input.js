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

function* gOuterFinally() {
  try {
    while (true) {
      try {
        try {
          break;
        } finally {
          log("a");
        }
      } finally {
        log("b");
      }
    }
    log("afterLoop");
    yield 1;
  } finally {
    log("outer");
  }
}
