class Test {
  get bar() {
    throw new Error("wow");
  }
}

var test = new Test;
test.bar;
