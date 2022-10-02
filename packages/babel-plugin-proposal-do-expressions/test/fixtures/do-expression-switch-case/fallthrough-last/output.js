const x = n => function () {
  switch (n) {
    case 0:
      'a';
    case 1:
      return 'b';
    default:
      'd';
    case 2:
      return 'c';
    case 3:
    case 4:
  }
}();
