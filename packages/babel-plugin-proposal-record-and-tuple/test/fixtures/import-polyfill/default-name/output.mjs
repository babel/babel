import { Tuple as _Tuple } from "@bloomberg/record-tuple-polyfill";
import { Record as _Record } from "@bloomberg/record-tuple-polyfill";

const r2 = _Record({
  a: _Record({
    b: 456
  }),
  e: 789
});

const t2 = _Tuple(1, _Tuple(2, 3, _Tuple(4), 5), 6);
