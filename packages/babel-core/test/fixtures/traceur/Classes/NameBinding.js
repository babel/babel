class ElementHolder {
  getElement() { return this.element; }

  makeFilterCapturedThis() {
    var capturedThis = this;
    return function (x) {
      return x == capturedThis.element;
    }
  }

  makeFilterLostThis() {
    return function () { return this; }
  }

  makeFilterHidden(element) {
    return function (x) { return x == element; }
  }
}

// ----------------------------------------------------------------------------

var obj = new ElementHolder();

obj.element = 40;
assert.equal(40, obj.getElement());
assert.isTrue(obj.makeFilterCapturedThis()(40));

// http://code.google.com/p/v8/issues/detail?id=1381
// assert.isUndefined(obj.makeFilterLostThis()());

obj.element = 39;
assert.isFalse(obj.makeFilterCapturedThis()(40));
assert.isTrue(obj.makeFilterCapturedThis()(39));

assert.isFalse(obj.makeFilterHidden(41)(40));
assert.isTrue(obj.makeFilterHidden(41)(41));
