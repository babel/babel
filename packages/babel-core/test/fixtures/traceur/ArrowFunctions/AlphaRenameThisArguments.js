
var self = {};

function f() {
  (() => {
    assert.equal(self, this);
    assert.equal(1, arguments.length);
    assert.equal(42, arguments[0]);

    var THIS = 0;
    var ARGUMENTS = 1;

    var object = {
      function: function() {
        return [this, arguments];
      },
      method() {
        return [this, arguments];
      },
      arrow: () => {
        return [this, arguments];
      }
    };

    assert.equal(object, object.function()[THIS]);
    assert.equal(2, object.function('a', 'b')[ARGUMENTS].length);
    assert.equal('a', object.function('a', 'b')[ARGUMENTS][0]);
    assert.equal('b', object.function('a', 'b')[ARGUMENTS][1]);

    assert.equal(object, object.method()[THIS]);
    assert.equal(3, object.method('c', 'd', 'e')[ARGUMENTS].length);
    assert.equal('c', object.method('c', 'd', 'e')[ARGUMENTS][0]);
    assert.equal('d', object.method('c', 'd', 'e')[ARGUMENTS][1]);
    assert.equal('e', object.method('c', 'd', 'e')[ARGUMENTS][2]);

    assert.equal(self, object.arrow()[THIS]);
    assert.equal(1, object.arrow('f', 'g')[ARGUMENTS].length);
    assert.equal(42, object.arrow('f', 'g')[ARGUMENTS][0]);
  })();
}

f.call(self, 42);
