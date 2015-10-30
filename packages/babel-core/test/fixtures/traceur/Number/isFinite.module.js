import {isFinite} from '../../../src/runtime/polyfills/Number.js';

function testIsFinite(isFinite) {
  assert.isTrue(isFinite(-0));
  assert.isTrue(isFinite(0));
  assert.isTrue(isFinite(Number.EPSILON));
  assert.isTrue(isFinite(Number.MAX_SAFE_INTEGER + 23));
  assert.isTrue(isFinite(Number.MAX_VALUE));
  assert.isTrue(isFinite(Number.MIN_SAFE_INTEGER - 13));
  assert.isTrue(isFinite(Number.MIN_VALUE));

  assert.isFalse(isFinite('-0'));
  assert.isFalse(isFinite('0'));
  assert.isFalse(isFinite('x'));
  assert.isFalse(isFinite(-Infinity));
  assert.isFalse(isFinite(-NaN));
  assert.isFalse(isFinite(Infinity));
  assert.isFalse(isFinite(NaN));
  assert.isFalse(isFinite(Number.NEGATIVE_INFINITY));
  assert.isFalse(isFinite(Number.POSITIVE_INFINITY));
  assert.isFalse(isFinite(false));
  assert.isFalse(isFinite(new Number(1)));
  assert.isFalse(isFinite(null));
  assert.isFalse(isFinite(true));
  assert.isFalse(isFinite(undefined));
  assert.isFalse(isFinite({valueOf() { return 1; }}));
}

testIsFinite(isFinite);
testIsFinite(Number.isFinite);
