// Async.
// Options: --async-functions --for-on

import {AsyncGeneratorFunction} from './resources/observable.js';

var o1 = new AsyncGeneratorFunction(function* () {
  // TODO(mnieper): As soon as proper async generators are implemented, they
  // should be used here.
  yield 1;
  yield 2;
  yield 3;
  return 4;
});

(async function () {

  // test for on
  var squares = [];
  for (var i on o1) {
    squares.push(i * i);
  }
  assert.deepEqual(squares, [1, 4, 9]);

  // test break
  var cubes = [];
  for (var i on o1) {
    if (i > 2) {
      break;
    }
    cubes.push(i * i * i);
  }
  assert.deepEqual(cubes, [1, 8]);

  // test continue
  var list = [];
  for (var i on o1) {
    if (i === 2) {
      continue;
    }
    list.push(i);
  }
  assert.deepEqual(list, [1, 3]);

  // test outer continue
  var almostEmpty = [];
  label: do {
    for (var i on o1) {
      if (i === 2) {
        continue label;
      }
      almostEmpty.push(i);
    }
  } while (false);
  assert.deepEqual(almostEmpty, [1]);

  // test return
  var value = await (async function () {
    for (var i on o1) {
      if (i === 1) {
        return 42;
      }
    }
  })();
  assert.equal(value, 42);

  // test asynchronous loop body
  var sum = 0;
  for (var i on o1) {
    sum += i;
    await Promise.resolve();
  }
  assert.equal(sum, 6);

  done();
}()).catch(done);
