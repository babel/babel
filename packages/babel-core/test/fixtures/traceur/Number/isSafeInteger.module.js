import {isSafeInteger} from '../../../src/runtime/polyfills/Number.js';

function testIsSafeInteger(isSafeInteger) {
  assert.isTrue(isSafeInteger(-0));
  assert.isTrue(isSafeInteger(0));
  assert.isTrue(isSafeInteger(Number.MAX_SAFE_INTEGER - 23));
  assert.isTrue(isSafeInteger(Number.MAX_SAFE_INTEGER));
  assert.isTrue(isSafeInteger(Number.MIN_SAFE_INTEGER + 13));

  assert.isFalse(isSafeInteger('-0'));
  assert.isFalse(isSafeInteger('0'));
  assert.isFalse(isSafeInteger('x'));
  assert.isFalse(isSafeInteger(-Infinity));
  assert.isFalse(isSafeInteger(-NaN));
  assert.isFalse(isSafeInteger(Infinity));
  assert.isFalse(isSafeInteger(NaN));
  assert.isFalse(isSafeInteger(Number.EPSILON));
  assert.isFalse(isSafeInteger(Number.MAX_SAFE_INTEGER + 23));
  assert.isFalse(isSafeInteger(Number.MAX_VALUE));
  assert.isFalse(isSafeInteger(Number.MIN_SAFE_INTEGER - 13));
  assert.isFalse(isSafeInteger(Number.MIN_VALUE));
  assert.isFalse(isSafeInteger(Number.NEGATIVE_INFINITY));
  assert.isFalse(isSafeInteger(Number.POSITIVE_INFINITY));
  assert.isFalse(isSafeInteger(false));
  assert.isFalse(isSafeInteger(new Number(1)));
  assert.isFalse(isSafeInteger(null));
  assert.isFalse(isSafeInteger(true));
  assert.isFalse(isSafeInteger(undefined));
  assert.isFalse(isSafeInteger({valueOf() { return 1; }}));
}

testIsSafeInteger(isSafeInteger);
testIsSafeInteger(Number.isSafeInteger);
