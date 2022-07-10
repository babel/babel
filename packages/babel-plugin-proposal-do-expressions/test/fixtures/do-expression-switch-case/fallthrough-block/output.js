const x = n => function () {
  switch (n) {
    case 0:
      {
        'a';
      }

    case 1:
      {
        return 'b';
      }

    case 2:
      {
        return 'c';
      }

    case 3:
      {
        return void 0;
      }

    case 4:
      {
        'd';
        'e';
      }

    default:
      return 'f';
  }
}();
