assert.equal(do {
  switch(0) {
    case 0: break;
    case 1: "foo"; break;
  }
} || "bar", "bar");
