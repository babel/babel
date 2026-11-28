function* forLoop() {
  for (let arguments = 1; arguments < 3; arguments++) {
    yield arguments;
  }
}

function* block() {
  {
    let arguments = 5;
    yield arguments;
  }
  yield arguments.length;
}

function* arrowParam() {
  const f = arguments => arguments + 1;
  yield f(1);
  yield arguments[0];
}

expect([...forLoop()]).toEqual([1, 2]);
expect([...block(1, 2)]).toEqual([5, 2]);
expect([...arrowParam(9)]).toEqual([2, 9]);
