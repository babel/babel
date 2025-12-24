function test(e) {
  var i = e;
  {
    var _e = i[0];
    switch (_e) {
      case "n":
        var _e2 = 1;
        return true;
      default:
        return false;
    }
  }
}
console.log(test("nn"));
