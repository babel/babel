import {isInteger} from '../../../src/runtime/polyfills/Number.js';

function testIsInteger(isInteger) {
  assert.isTrue(isInteger(-0));
  assert.isTrue(isInteger(0));
  assert.isTrue(isInteger(Number.MAX_SAFE_INTEGER + 23));
  assert.isTrue(isInteger(Number.MAX_VALUE));
  assert.isTrue(isInteger(Number.MIN_SAFE_INTEGER - 13));

  assert.isFalse(isInteger('-0'));
  assert.isFalse(isInteger('0'));
  assert.isFalse(isInteger('x'));
  assert.isFalse(isInteger(-Infinity));
  assert.isFalse(isInteger(-NaN));
  assert.isFalse(isInteger(Infinity));
  assert.isFalse(isInteger(NaN));
  assert.isFalse(isInteger(Number.EPSILON));
  assert.isFalse(isInteger(Number.MIN_VALUE));
  assert.isFalse(isInteger(Number.NEGATIVE_INFINITY));
  assert.isFalse(isInteger(Number.POSITIVE_INFINITY));
  assert.isFalse(isInteger(false));
  assert.isFalse(isInteger(new Number(1)));
  assert.isFalse(isInteger(null));
  assert.isFalse(isInteger(true));
  assert.isFalse(isInteger(undefined));
  assert.isFalse(isInteger({valueOf() { return 1; }}));
}

testIsInteger(isInteger);
testIsInteger(Number.isInteger);
