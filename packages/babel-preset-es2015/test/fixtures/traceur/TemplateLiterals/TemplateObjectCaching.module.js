import {cooked, raw} from './resources/template-objects.js';

function assertCooked(obj) {
  expect(obj).toBe(cooked);
  expect(obj).not.toBe(raw);
}

function assertRaw(obj) {
  expect(obj).toBe(raw);
  expect(obj).not.toBe(cooked);
}

assertCooked `a${1}b`;
assertCooked `a${2}b`;

assertRaw `c${3}d\n`;
assertRaw `c${4}d\n`;
