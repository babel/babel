class A {
  accessor handle = (() => function () {
    let x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    console.log(x);
  })();
}
