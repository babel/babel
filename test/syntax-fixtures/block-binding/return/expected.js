function student() {
  var isStudent = true;
  return Object.freeze({ isStudent: isStudent });
}

function student() {
  var isStudent = true;
  while (true) {
    return function () {
      var test = 'foo';
      return Object.freeze({ isStudent: isStudent });
    }();
  }
}
