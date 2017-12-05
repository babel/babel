const x = () => function () {
  switch (new Date().getDay()) {
    case 0:
    case 6:
      return "weekend 🚵";

    default:
      return "weekday 🚴";
  }
}();
