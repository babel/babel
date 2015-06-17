// single referenes
function r(...rest){
  if (noNeedToWork) return 0;
  return rest;
}

// multiple references
function r(...rest){
  if (noNeedToWork) return 0;

  rest;
  rest;
}

// multiple nested references
function r(...rest){
  if (noNeedToWork) return 0;

  if (true) {
    return rest;
  } else {
    return rest;
  }
}

// nested reference with root reference
function r(...rest){
  if (noNeedToWork) return 0;

  if (lol) rest;
  rest;
}
