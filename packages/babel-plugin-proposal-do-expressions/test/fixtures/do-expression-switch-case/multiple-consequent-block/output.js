const x = n => function () {
  switch (n) {
    case 0:
      {
        get();
        return 'a';
      }
    case 1:
      {
        return 'b';
        'c';
        break;
        'd';
      }
    case 2:
      {
        'e';
        const a = 'e';
        return void 0;
      }
    case 3:
      {
        const a = 'f';
        return void 0;
        'f';
      }
    default:
      return 'g';
  }
}();
