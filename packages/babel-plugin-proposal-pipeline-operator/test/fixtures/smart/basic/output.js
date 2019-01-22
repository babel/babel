const _pipe = 5;

const _pipe2 = _pipe + 1;

const _pipe3 = _pipe2 + _pipe2;

var result = Math.pow((x => x * 7)(_pipe3), 2);
