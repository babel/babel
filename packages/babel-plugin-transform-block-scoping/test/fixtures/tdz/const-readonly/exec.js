function callNow(f) {
  f();
}

function callLater(f) {
  return () => f();
}

expect(() => {
  const x = 0;
  x = 1;
}).toThrow(TypeError);

expect(() => {
  x = 1;
  const x = 0;
}).toThrow(ReferenceError);

expect(() => {
  callNow(() => {
    x = 1;
  });
  const x = 0;
}).toThrow(ReferenceError);


expect(() => {
  const call = callLater(() => {
    x = 1;
  });
  const x = 0;
  call();
}).toThrow(TypeError);
