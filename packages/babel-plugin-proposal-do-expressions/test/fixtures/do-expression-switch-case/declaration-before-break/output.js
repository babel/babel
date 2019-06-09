const x = n => function () {
  switch (n) {
    case 0:
    case 6:
      const b = 1;
      return void 0;

    default:
      return 'bar';
  }
}();
