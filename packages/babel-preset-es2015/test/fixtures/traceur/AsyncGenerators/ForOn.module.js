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
  expect(squares).toEqual([1, 4, 9]);

  // test break
  var cubes = [];
  for (var i on o1) {
    if (i > 2) {
      break;
    }
    cubes.push(i * i * i);
  }
  expect(cubes).toEqual([1, 8]);

  // test continue
  var list = [];
  for (var i on o1) {
    if (i === 2) {
      continue;
    }
    list.push(i);
  }
  expect(list).toEqual([1, 3]);

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
  expect(almostEmpty).toEqual([1]);

  // test return
  var value = await (async function () {
    for (var i on o1) {
      if (i === 1) {
        return 42;
      }
    }
  })() => expect(value).toBe(42);

  // test asynchronous loop body
  var sum = 0;
  for (var i on o1) {
    sum += i;
    await Promise.resolve();
  }
  expect(sum).toBe(6);

  done();
}()).catch(done);
