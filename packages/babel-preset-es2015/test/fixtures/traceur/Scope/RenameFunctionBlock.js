// Options: --block-binding
// Issue #1773
function when() {
  function* where() {
      var index = 0;
      for (let x of Object) {
          index++;
      }
  }
  var x = 5;
}
