const x = n => function () {
  switch (n) {
    case 0:
      {
        return "a";
      }
      {}
      {
        "b";
      }
      ;

    case 1:
      {
        return "a";
      }
      {
        "b";
      }
      ;

    case 2:
      return "a";
      {}
      "b";

    case 3:
      "a";
      {
        return "b";
      }
      {
        "c";
      }

    case 4:
      {
        "a";
      }
      {
        "b";
      }
      {
        return "c";
        "d";
      }
      {
        "e";
        break;
        "f";
      }

    case 5:
      {
        return "a";
      }
      {
        "b";
      }
      {
        break;
        "c";
      }
  }
}();
