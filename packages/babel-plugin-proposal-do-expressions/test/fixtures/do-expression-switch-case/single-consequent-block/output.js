const x = n => function () {
  switch (n) {
    case 0:
    case 6:
      {
        return "weekend 🚵";
      }
    default:
      return "weekday 🚴";
  }
}();
