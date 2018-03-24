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
expect(obj.getElement()).toBe(40);
expect(obj.makeFilterCapturedThis()(40)).toBe(true);

// http://code.google.com/p/v8/issues/detail?id=1381
// expect(obj.makeFilterLostThis()()).toBeUndefined();

obj.element = 39;
expect(obj.makeFilterCapturedThis()(40)).toBe(false);
expect(obj.makeFilterCapturedThis()(39)).toBe(true);

expect(obj.makeFilterHidden(41)(40)).toBe(false);
expect(obj.makeFilterHidden(41)(41)).toBe(true);
