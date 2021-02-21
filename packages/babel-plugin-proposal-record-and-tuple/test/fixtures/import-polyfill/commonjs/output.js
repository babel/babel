var _Tuple = require("@bloomberg/record-tuple-polyfill").Tuple;

var _Record = require("@bloomberg/record-tuple-polyfill").Record;

const r2 = _Record({
  a: _Record({
    b: 456
  }),
  e: 789
});

const t2 = _Tuple(1, _Tuple(2, 3, _Tuple(4), 5), 6);
