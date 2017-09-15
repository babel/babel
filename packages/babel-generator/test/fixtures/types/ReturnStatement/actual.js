function foo() {
  return;
}

function bar() {
  return "foo";
}

function foo() {
  return 1, "foo";
}

() => { return /a/; }

function foo() { return /a/; }
