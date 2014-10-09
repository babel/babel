function student () {
  let isStudent = true;
  return Object.freeze({
    isStudent
  });
}

function student () {
  let isStudent = true;
  while (true) {
    let test = "foo";
    return Object.freeze({
      isStudent
    });
  }
}
