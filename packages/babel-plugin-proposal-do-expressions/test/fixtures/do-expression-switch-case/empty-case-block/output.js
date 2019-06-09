const x = () => function () {
  switch (new Date().getDay()) {
    case 0:
      return void 0;

    default:
      return "weekday 🚴";
  }
}();
