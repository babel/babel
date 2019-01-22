const _pipe = 5;

const _pipe4 = Math.pow(_pipe, 2);

var result = [10, 20, 30, 40, 50].filter(n => {
  const _pipe2 = _pipe4;

  const _pipe3 = n > _pipe2;

  return !_pipe3;
});
