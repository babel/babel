// we need to deopt `test` if it's reassigned as we can't be certain of it's
// state, ie. it could have been rebound or dereferenced

function test(exit) {
  if (exit) {
    return this.x;
  }
  return test(true);
}

test = test.bind({ x: "yay" });

console.log(test());
