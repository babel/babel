import {cooked, raw} from './resources/template-objects.js';

function assertCooked(obj) {
  assert.equal(obj, cooked);
  assert.notEqual(obj, raw);
}

function assertRaw(obj) {
  assert.equal(obj, raw);
  assert.notEqual(obj, cooked);
}

assertCooked `a${1}b`;
assertCooked `a${2}b`;

assertRaw `c${3}d\n`;
assertRaw `c${4}d\n`;
