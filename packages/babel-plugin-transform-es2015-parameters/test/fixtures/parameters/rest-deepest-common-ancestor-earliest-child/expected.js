// single reference
function r(..._ref) {
  let [...rest] = [..._ref];

  if (noNeedToWork) return 0;
  return rest;
}

// multiple references
function r(..._ref2) {
  let [...rest] = [..._ref2];

  if (noNeedToWork) return 0;

  rest;
  rest;
}

// multiple nested references
function r(..._ref3) {
  let [...rest] = [..._ref3];

  if (noNeedToWork) return 0;

  if (true) {
    return rest;
  } else {
    return rest;
  }
}

// deeply nested
function r(..._ref4) {
  let [...rest] = [..._ref4];

  if (true) {
    if (true) {
      return rest;
    } else {
      return rest;
    }
  }
}

// nested reference with root reference
function r(..._ref5) {
  let [...rest] = [..._ref5];

  if (noNeedToWork) return 0;

  if (lol) rest;
  rest;
}

// nested functions
function a(..._ref6) {
  let [...args] = [..._ref6];

  return function () {
    function b() {}

    console.log("Shouldn't args be from a's scope?", args);
  };
}

// loop
function runQueue(queue, ..._ref7) {
  let [...args] = [..._ref7];

  for (let i = 0; i < queue.length; i++) {
    queue[i](...args);
  }
}

// nested loop
function runQueue(queue, ..._ref8) {
  let [...args] = [..._ref8];

  if (foo) {
    for (let i = 0; i < queue.length; i++) {
      queue[i](...args);
    }
  }
}

function r(..._ref9) {
  let [...rest] = [..._ref9];

  if (noNeedToWork) return 0;
  [rest[0]] = x;
  return rest;
}