function foo() {
  const x = 5;
  console.log(x);

  {
    const x = 7;
    setTimeout(() => x, 0);
  }
}

function bar() {
  const x = 5;
  console.log(x);

  for (let i = 0; i < 7; i++) {
    {
      const x = i;
      setTimeout(() => x, 0);
    }
  }
}

function baz() {
  const x = 5;
  console.log(x);

  for (let i = 0; i < 7; i++) {
    var qux = function qux(y) {
      const x = y;
      setTimeout(() => x, 0);
    };
    qux(i);
  }
}
