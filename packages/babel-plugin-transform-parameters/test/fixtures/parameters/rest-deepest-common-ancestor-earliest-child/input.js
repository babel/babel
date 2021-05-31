// single reference
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

// deeply nested
function r(...rest){
  if (true) {
    if (true) {
      return rest;
    } else {
      return rest;
    }
  }
}

// nested reference with root reference
function r(...rest){
  if (noNeedToWork) return 0;

  if (lol) rest;
  rest;
}

// nested functions
function a(...args) {
  return function() {
    function b() {}

    console.log("Shouldn't args be from a's scope?", args);
  };
}

// loop
function runQueue(queue, ...args) {
  for (let i = 0; i < queue.length; i++) {
    queue[i](...args)
  }
}

// nested loop
function runQueue(queue, ...args) {
  if (foo) {
    for (let i = 0; i < queue.length; i++) {
      queue[i](...args)
    }
  }
}

function r(...rest){
  if (noNeedToWork) return 0;
  [rest[0]] = x;
  return rest;
}
