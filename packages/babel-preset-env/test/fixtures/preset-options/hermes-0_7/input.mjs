class Foo {
  #bar() {
    // Should be transpiled
  }
}

try {
  /** Should be transpiled */
  function scoped() {}

  /** Should be transpiled */
  let arrow = () => scoped;
} /** Should be transpiled */ catch {}

let short = 42;
const obj = {
  short, // Should not be transpiled
};

/** Should be transpiled */
const { prop = `bar${'baz'}` } = foo?.bar;
