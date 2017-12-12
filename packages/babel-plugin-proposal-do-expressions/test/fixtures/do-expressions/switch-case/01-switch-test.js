assert.equal(do {
  switch(0) {
    case 0: "foo";
    case 1: break;
  }
} || "bar", "foo");
