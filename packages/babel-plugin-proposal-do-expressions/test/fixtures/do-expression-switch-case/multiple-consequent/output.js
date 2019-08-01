const x = () => function () {
  switch (new Date().getDay()) {
    case 0:
      get();
      return 1 + 1;

    default:
      return "weekday 🚴";
  }
}();
