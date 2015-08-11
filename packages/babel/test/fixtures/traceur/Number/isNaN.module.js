import {isNaN} from '../../../src/runtime/polyfills/Number.js';

function testIsNaN(isNaN) {
  assert.isTrue(isNaN(NaN));
  assert.isTrue(isNaN(-NaN));

  assert.isFalse(isNaN('-0'));
  assert.isFalse(isNaN('0'));
  assert.isFalse(isNaN('NaN'));
  assert.isFalse(isNaN('x'));
  assert.isFalse(isNaN(-0));
  assert.isFalse(isNaN(0));
  assert.isFalse(isNaN(Infinity));
  assert.isFalse(isNaN(Number.EPSILON));
  assert.isFalse(isNaN(Number.MAX_SAFE_INTEGER + 23));
  assert.isFalse(isNaN(Number.MAX_VALUE));
  assert.isFalse(isNaN(Number.MIN_SAFE_INTEGER - 13));
  assert.isFalse(isNaN(Number.MIN_VALUE));
  assert.isFalse(isNaN(Number.NEGATIVE_INFINITY));
  assert.isFalse(isNaN(Number.POSITIVE_INFINITY));
  assert.isFalse(isNaN(false));
  assert.isFalse(isNaN(new Number(NaN)));
  assert.isFalse(isNaN(null));
  assert.isFalse(isNaN(true));
  assert.isFalse(isNaN(undefined));
  assert.isFalse(isNaN({valueOf() { return NaN; }}));
}

testIsNaN(isNaN);
testIsNaN(Number.isNaN);
