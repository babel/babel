// https://github.com/facebook/regenerator/issues/103
function *range() {
  for (var i = 0; false; ) {
  }
}

genHelpers.check(range(), []);
