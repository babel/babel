const x = n => function () {
  switch (n) {
    case 0:
    case 6:
      const b = 1;
      return void 0;

    case 1:
      {
        "a";
        {
          const c = 1;
          {
            return void 0;
          }
        }
      }

    case 2:
    case 3:
      {
        "b";

        if (n === 2) {
          const c = 1;
        } else {
          return "c";
        }

        {
          return void 0;
        }
      }

    default:
      return "bar";
  }
}();
