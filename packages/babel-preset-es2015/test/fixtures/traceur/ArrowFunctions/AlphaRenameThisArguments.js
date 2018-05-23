
var self = {};

function f() {
  (() => {
    expect(self).toBe(this);
    expect(1).toBe(arguments.length);
    expect(42).toBe(arguments[0]);

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

    expect(object.function()[THIS]).toBe(object);
    expect(object.function('a', 'b')[ARGUMENTS]).toHaveLength(2);
    expect(object.function('a', 'b')[ARGUMENTS][0]).toBe('a');
    expect(object.function('a', 'b')[ARGUMENTS][1]).toBe('b');

    expect(object.function()[THIS]).toBe(object);
    expect(object.method('c', 'd', 'e')[ARGUMENTS]).toHaveLength(3);
    expect(object.method('c', 'd', 'e')[ARGUMENTS][0]).toBe('c');
    expect(object.method('c', 'd', 'e')[ARGUMENTS][1]).toBe('d');
    expect(object.method('c', 'd', 'e')[ARGUMENTS][2]).toBe('e');

    expect(object.arrow()[THIS]).toBe(self);
    expect(object.arrow('f', 'g')[ARGUMENTS]).toHaveLength(1);
    expect(object.arrow('f', 'g')[ARGUMENTS][0]).toBe(42);
  })();
}

f.call(self, 42);
