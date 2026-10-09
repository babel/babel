/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var assert = require("assert");

function SyncPromise(run) {
  this.resolved = null;
  this.value = null;
  try {
    run(
      val => { this.resolved = true; this.value = val; },
      val => { this.resolved = false; this.value = val; }
    );
  } catch (e) {
    this.resolved = false;
    this.value = e;
  }
  if (this.resolved === null) {
    throw new Error("SyncPromise must be run synchronously");
  }
  if (this.value instanceof SyncPromise) this.value = this.value.value;
}
SyncPromise.prototype.then = function(onRes, onRej) {
  try {
    if (this.resolved) return SyncPromise.resolve(onRes(this.value));
    if (onRej) return SyncPromise.resolve(onRej(this.value));
    return this;
  } catch (e) {
    return SyncPromise.reject(e);
  }
};
SyncPromise.prototype.catch = function(onRej) {
  try {
    if (this.resolved) return this;
    return SyncPromise.resolve(onRej(this.value));
  } catch (e) {
    return SyncPromise.reject(e);
  }
};
SyncPromise.resolve = val => new SyncPromise(res => res(val));
SyncPromise.reject = val => new SyncPromise((_, rej) => rej(val));

describe("custom Promise polyfills", function() {
  it("should work with async functions", function() {
    babelInjectPromise: SyncPromise;

    async function fn() {
      var first = await SyncPromise.resolve(2);
      var second = await 3;
      return 4 * first * second;
    }

    assert.ok(fn() instanceof SyncPromise);
    assert.ok(fn().resolved);
    assert.strictEqual(fn().value, 24);
  });

  it("should correctly handle rejections", function() {
    babelInjectPromise: SyncPromise;

    async function fn() {
      throw 2;
    }

    assert.ok(fn() instanceof SyncPromise);
    assert.strictEqual(fn().resolved, false);
    assert.strictEqual(fn().value, 2);
  });

  it("should work with async generators", function() {
    babelInjectPromise: SyncPromise;

    async function* fn() {
      await 1;
      var input = yield 2;
      await 3;
      return input;
    }

    var it = fn();
    var val = it.next();

    assert.ok(val instanceof SyncPromise);
    assert.ok(val.resolved);
    assert.deepStrictEqual(val.value, { done: false, value: 2 });

    val = it.next(7);

    assert.ok(val instanceof SyncPromise);
    assert.ok(val.resolved);
    assert.deepStrictEqual(val.value, { done: true, value: 7 });
  });
});
