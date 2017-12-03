var arePropertyDescriptorsSupported = function () {
  try {
    Object.defineProperty({}, 'x', {});
    return true;
  } catch (e) { /* this is IE 8. */
    return false;
  }
};
var supportsDescriptors = !!Object.defineProperty && arePropertyDescriptorsSupported();
var functionsHaveNames = function f() {}.name === 'f';

var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';
var ifSymbolsIt = hasSymbols ? it : xit;
var describeIfGetProto = Object.getPrototypeOf ? describe : xdescribe;
var describeIfSetProto = Object.setPrototypeOf ? describe : xdescribe;
var describeIfES5 = supportsDescriptors ? describe : xdescribe;
var describeIfExtensionsPreventible = Object.preventExtensions ? describe : xdescribe;
var describeIfGetOwnPropertyNames = Object.getOwnPropertyNames ? describe : xdescribe;
var ifExtensionsPreventibleIt = Object.preventExtensions ? it : xit;
var ifES5It = supportsDescriptors ? it : xit;
var ifFreezeIt = typeof Object.freeze === 'function' ? it : xit;
var ifFunctionsHaveNamesIt = functionsHaveNames ? it : xit;
var ifShimIt = (typeof process !== 'undefined' && process.env.NO_ES6_SHIM) ? it.skip : it;

describe('Reflect', function () {
  if (typeof Reflect === 'undefined') {
    return it('exists', function () {
      expect(this).to.have.property('Reflect');
    });
  }

  var object = {
    something: 1,
    _value: 0
  };

  if (supportsDescriptors) {
    /* eslint-disable accessor-pairs */
    Object.defineProperties(object, {
      value: {
        get: function () {
          return this._value;
        }
      },

      setter: {
        set: function (val) {
          this._value = val;
        }
      },

      bool: {
        value: true
      }
    });
    /* eslint-enable accessor-pairs */
  }

  var testXThrow = function (values, func) {
    var checker = function checker(item) {
      try {
        func(item);
        return false;
      } catch (e) {
        return e instanceof TypeError;
      }
    };

    values.forEach(function (item) {
      expect(item).to.satisfy(checker);
    });
  };

  var testCallableThrow = testXThrow.bind(null, [null, undefined, 1, 'string', true, [], {}]);

  var testPrimitiveThrow = testXThrow.bind(null, [null, undefined, 1, 'string', true]);

  ifShimIt('is on the exported object', function () {
    var exported = require('../');
    expect(exported.Reflect).to.equal(Reflect);
  });

  describe('.apply()', function () {
    if (typeof Reflect.apply === 'undefined') {
      return it('exists', function () {
        expect(Reflect).to.have.property('apply');
      });
    }

    it('is a function', function () {
      expect(typeof Reflect.apply).to.equal('function');
    });

    ifFunctionsHaveNamesIt('has the right name', function () {
      expect(Reflect.apply.name).to.equal('apply');
    });

    it('throws if target isn’t callable', function () {
      testCallableThrow(function (item) {
        return Reflect.apply(item, null, []);
      });
    });

    it('works also with redefined apply', function () {
      expect(Reflect.apply(Array.prototype.push, [1, 2], [3, 4, 5])).to.equal(5);

      var F = function F(a, b, c) {
        return a + b + c;
      };

      F.apply = false;

      expect(Reflect.apply(F, null, [1, 2, 3])).to.equal(6);

      var G = function G(last) {
        return this.x + 'lo' + last;
      };

      G.apply = function nop() {};

      expect(Reflect.apply(G, { x: 'yel' }, ['!'])).to.equal('yello!');
    });
  });

  describe('.construct()', function () {
    if (typeof Reflect.construct === 'undefined') {
      return it('exists', function () {
        expect(Reflect).to.have.property('construct');
      });
    }

    it('is a function', function () {
      expect(typeof Reflect.construct).to.equal('function');
    });

    ifFunctionsHaveNamesIt('has the right name', function () {
      expect(Reflect.construct.name).to.equal('construct');
    });

    it('throws if target isn’t callable', function () {
      testCallableThrow(function (item) {
        return Reflect.apply(item, null, []);
      });
    });

    it('works also with redefined apply', function () {
      var C = function C(a, b, c) {
        this.qux = [a, b, c].join('|');
      };

      C.apply = undefined;

      expect(Reflect.construct(C, ['foo', 'bar', 'baz']).qux).to.equal('foo|bar|baz');
    });

    it('correctly handles newTarget param', function () {
      var F = function F() {};
      expect(Reflect.construct(function () {}, [], F) instanceof F).to.equal(true);
    });
  });

  describeIfES5('.defineProperty()', function () {
    if (typeof Reflect.defineProperty === 'undefined') {
      return it('exists', function () {
        expect(Reflect).to.have.property('defineProperty');
      });
    }

    it('is a function', function () {
      expect(typeof Reflect.defineProperty).to.equal('function');
    });

    ifFunctionsHaveNamesIt('has the right name', function () {
      expect(Reflect.defineProperty.name).to.equal('defineProperty');
    });

    it('throws if the target isn’t an object', function () {
      testPrimitiveThrow(function (item) {
        return Reflect.defineProperty(item, 'prop', { value: true });
      });
    });

    ifExtensionsPreventibleIt('returns false for non-extensible objects', function () {
      var o = Object.preventExtensions({});

      expect(Reflect.defineProperty(o, 'prop', {})).to.equal(false);
    });

    it('can return true, even for non-configurable, non-writable properties', function () {
      var o = {};
      var desc = {
        value: 13,
        enumerable: false,
        writable: false,
        configurable: false
      };

      expect(Reflect.defineProperty(o, 'prop', desc)).to.equal(true);

      // Defined as non-configurable, but descriptor is identical.
      expect(Reflect.defineProperty(o, 'prop', desc)).to.equal(true);

      desc.value = 37; // Change

      expect(Reflect.defineProperty(o, 'prop', desc)).to.equal(false);
    });

    it('can change from one property type to another, if configurable', function () {
      var o = {};

      var desc1 = {
        set: function () {},
        configurable: true
      };

      var desc2 = {
        value: 13,
        configurable: false
      };

      var desc3 = {
        get: function () {}
      };

      expect(Reflect.defineProperty(o, 'prop', desc1)).to.equal(true);

      expect(Reflect.defineProperty(o, 'prop', desc2)).to.equal(true);

      expect(Reflect.defineProperty(o, 'prop', desc3)).to.equal(false);
    });
  });

  describe('.deleteProperty()', function () {
    if (typeof Reflect.deleteProperty === 'undefined') {
      return it('exists', function () {
        expect(Reflect).to.have.property('deleteProperty');
      });
    }

    it('is a function', function () {
      expect(typeof Reflect.deleteProperty).to.equal('function');
    });

    ifFunctionsHaveNamesIt('has the right name', function () {
      expect(Reflect.deleteProperty.name).to.equal('deleteProperty');
    });

    it('throws if the target isn’t an object', function () {
      testPrimitiveThrow(function (item) {
        return Reflect.deleteProperty(item, 'prop');
      });
    });

    ifES5It('returns true for success and false for failure', function () {
      var o = { a: 1 };

      Object.defineProperty(o, 'b', { value: 2 });

      expect(o).to.have.property('a');
      expect(o).to.have.property('b');
      expect(o.a).to.equal(1);
      expect(o.b).to.equal(2);

      expect(Reflect.deleteProperty(o, 'a')).to.equal(true);

      expect(o).not.to.have.property('a');
      expect(o.b).to.equal(2);

      expect(Reflect.deleteProperty(o, 'b')).to.equal(false);

      expect(o).to.have.property('b');
      expect(o.b).to.equal(2);

      expect(Reflect.deleteProperty(o, 'a')).to.equal(true);
    });

    it('cannot delete an array’s length property', function () {
      expect(Reflect.deleteProperty([], 'length')).to.equal(false);
    });
  });

  describeIfES5('.get()', function () {
    if (typeof Reflect.get === 'undefined') {
      return it('exists', function () {
        expect(Reflect).to.have.property('get');
      });
    }

    it('is a function', function () {
      expect(typeof Reflect.get).to.equal('function');
    });

    ifFunctionsHaveNamesIt('has the right name', function () {
      expect(Reflect.get.name).to.equal('get');
    });

    it('throws on null and undefined', function () {
      [null, undefined].forEach(function (item) {
        expect(function () {
          return Reflect.get(item, 'property');
        }).to['throw'](TypeError);
      });
    });

    it('can retrieve a simple value, from the target', function () {
      var p = { something: 2, bool: false };

      expect(Reflect.get(object, 'something')).to.equal(1);
      // p has no effect
      expect(Reflect.get(object, 'something', p)).to.equal(1);

      // Value-defined properties take the target's value,
      // and ignore that of the receiver.
      expect(Reflect.get(object, 'bool', p)).to.equal(true);

      // Undefined values
      expect(Reflect.get(object, 'undefined_property')).to.equal(undefined);
    });

    it('will invoke getters on the receiver rather than target', function () {
      var other = { _value: 1337 };

      expect(Reflect.get(object, 'value', other)).to.equal(1337);

      // No getter for setter property
      expect(Reflect.get(object, 'setter', other)).to.equal(undefined);
    });

    it('will search the prototype chain', function () {
      var other = Object.create(object);
      other._value = 17;

      var yetAnother = { _value: 4711 };

      expect(Reflect.get(other, 'value', yetAnother)).to.equal(4711);

      expect(Reflect.get(other, 'bool', yetAnother)).to.equal(true);
    });
  });

  describeIfES5('.set()', function () {
    if (typeof Reflect.set === 'undefined') {
      return it('exists', function () {
        expect(Reflect).to.have.property('set');
      });
    }

    it('is a function', function () {
      expect(typeof Reflect.set).to.equal('function');
    });

    ifFunctionsHaveNamesIt('has the right name', function () {
      expect(Reflect.set.name).to.equal('set');
    });

    it('throws if the target isn’t an object', function () {
      testPrimitiveThrow(function (item) {
        return Reflect.set(item, 'prop', 'value');
      });
    });

    it('sets values on receiver', function () {
      var target = {};
      var receiver = {};

      expect(Reflect.set(target, 'foo', 1, receiver)).to.equal(true);

      expect('foo' in target).to.equal(false);
      expect(receiver.foo).to.equal(1);

      expect(Reflect.defineProperty(receiver, 'bar', {
        value: 0,
        writable: true,
        enumerable: false,
        configurable: true
      })).to.equal(true);

      expect(Reflect.set(target, 'bar', 1, receiver)).to.equal(true);
      expect(receiver.bar).to.equal(1);
      expect(Reflect.getOwnPropertyDescriptor(receiver, 'bar').enumerable).to.equal(false);

      var out;
      /* eslint-disable accessor-pairs */
      target = Object.create({}, {
        o: {
          set: function () { out = this; }
        }
      });
      /* eslint-enable accessor-pairs */

      expect(Reflect.set(target, 'o', 17, receiver)).to.equal(true);
      expect(out).to.equal(receiver);
    });
  });

  describeIfES5('.getOwnPropertyDescriptor()', function () {
    if (typeof Reflect.getOwnPropertyDescriptor === 'undefined') {
      return it('exists', function () {
        expect(Reflect).to.have.property('getOwnPropertyDescriptor');
      });
    }

    it('is a function', function () {
      expect(typeof Reflect.getOwnPropertyDescriptor).to.equal('function');
    });

    ifFunctionsHaveNamesIt('has the right name', function () {
      expect(Reflect.getOwnPropertyDescriptor.name).to.equal('getOwnPropertyDescriptor');
    });

    it('throws if the target isn’t an object', function () {
      testPrimitiveThrow(function (item) {
        return Reflect.getOwnPropertyDescriptor(item, 'prop');
      });
    });

    it('retrieves property descriptors', function () {
      var obj = { a: 4711 };

      var desc = Reflect.getOwnPropertyDescriptor(obj, 'a');

      expect(desc).to.deep.equal({
        value: 4711,
        configurable: true,
        writable: true,
        enumerable: true
      });
    });
  });

  describeIfGetProto('.getPrototypeOf()', function () {
    if (typeof Reflect.getPrototypeOf === 'undefined') {
      return it('exists', function () {
        expect(Reflect).to.have.property('getPrototypeOf');
      });
    }

    it('is a function', function () {
      expect(typeof Reflect.getPrototypeOf).to.equal('function');
    });

    ifFunctionsHaveNamesIt('has the right name', function () {
      expect(Reflect.getPrototypeOf.name).to.equal('getPrototypeOf');
    });

    it('throws if the target isn’t an object', function () {
      testPrimitiveThrow(function (item) {
        return Reflect.getPrototypeOf(item);
      });
    });

    it('retrieves prototypes', function () {
      expect(Reflect.getPrototypeOf(Object.create(null))).to.equal(null);

      expect(Reflect.getPrototypeOf([])).to.equal(Array.prototype);
    });
  });

  describe('.has()', function () {
    if (typeof Reflect.has === 'undefined') {
      return it('exists', function () {
        expect(Reflect).to.have.property('has');
      });
    }

    it('is a function', function () {
      expect(typeof Reflect.has).to.equal('function');
    });

    ifFunctionsHaveNamesIt('has the right name', function () {
      expect(Reflect.has.name).to.equal('has');
    });

    it('throws if the target isn’t an object', function () {
      testPrimitiveThrow(function (item) {
        return Reflect.has(item, 'prop');
      });
    });

    it('will detect own properties', function () {
      var target = Object.create ? Object.create(null) : {};

      expect(Reflect.has(target, 'prop')).to.equal(false);

      target.prop = undefined;
      expect(Reflect.has(target, 'prop')).to.equal(true);

      delete target.prop;
      expect(Reflect.has(target, 'prop')).to.equal(false);

      expect(Reflect.has(Reflect.has, 'length')).to.equal(true);
    });

    ifES5It('will detect an own accessor property', function () {
      var target = Object.create(null);
      /* eslint-disable accessor-pairs */
      Object.defineProperty(target, 'accessor', {
        set: function () {}
      });
      /* eslint-enable accessor-pairs */

      expect(Reflect.has(target, 'accessor')).to.equal(true);
    });

    it('will search the prototype chain', function () {
      var Parent = function () {};
      Parent.prototype.someProperty = undefined;

      var Child = function () {};
      Child.prototype = new Parent();

      var target = new Child();
      target.bool = true;

      expect(Reflect.has(target, 'bool')).to.equal(true);
      expect(Reflect.has(target, 'someProperty')).to.equal(true);
      expect(Reflect.has(target, 'undefinedProperty')).to.equal(false);
    });
  });

  describeIfExtensionsPreventible('.isExtensible()', function () {
    if (typeof Reflect.isExtensible === 'undefined') {
      return it('exists', function () {
        expect(Reflect).to.have.property('isExtensible');
      });
    }

    it('is a function', function () {
      expect(typeof Reflect.isExtensible).to.equal('function');
    });

    ifFunctionsHaveNamesIt('has the right name', function () {
      expect(Reflect.isExtensible.name).to.equal('isExtensible');
    });

    it('returns true for plain objects', function () {
      expect(Reflect.isExtensible({})).to.equal(true);
      expect(Reflect.isExtensible(Object.preventExtensions({}))).to.equal(false);
    });

    it('throws if the target isn’t an object', function () {
      testPrimitiveThrow(function (item) {
        return Reflect.isExtensible(item);
      });
    });
  });

  describeIfGetOwnPropertyNames('.ownKeys()', function () {
    if (typeof Reflect.ownKeys === 'undefined') {
      return it('exists', function () {
        expect(Reflect).to.have.property('ownKeys');
      });
    }

    it('is a function', function () {
      expect(typeof Reflect.ownKeys).to.equal('function');
    });

    ifFunctionsHaveNamesIt('has the right name', function () {
      expect(Reflect.ownKeys.name).to.equal('ownKeys');
    });

    it('throws if the target isn’t an object', function () {
      testPrimitiveThrow(function (item) {
        return Reflect.ownKeys(item);
      });
    });

    it('should return the same result as Object.getOwnPropertyNames if there are no Symbols', function () {
      var obj = { foo: 1, bar: 2 };

      obj[1] = 'first';

      var result = Object.getOwnPropertyNames(obj);

      // Reflect.ownKeys depends on the implementation of
      // Object.getOwnPropertyNames, at least for non-symbol keys.
      expect(Reflect.ownKeys(obj)).to.deep.equal(result);

      // We can only be sure of which keys should exist.
      expect(result.sort()).to.deep.equal(['1', 'bar', 'foo']);
    });

    ifSymbolsIt('symbols come last', function () {
      var s = Symbol();

      var o = {
        'non-symbol': true
      };

      o[s] = true;

      expect(Reflect.ownKeys(o)).to.deep.equal(['non-symbol', s]);
    });
  });

  describeIfExtensionsPreventible('.preventExtensions()', function () {
    if (typeof Reflect.preventExtensions === 'undefined') {
      return it('exists', function () {
        expect(Reflect).to.have.property('preventExtensions');
      });
    }

    it('is a function', function () {
      expect(typeof Reflect.preventExtensions).to.equal('function');
    });

    ifFunctionsHaveNamesIt('has the right name', function () {
      expect(Reflect.preventExtensions.name).to.equal('preventExtensions');
    });

    it('throws if the target isn’t an object', function () {
      testPrimitiveThrow(function (item) {
        return Reflect.preventExtensions(item);
      });
    });

    it('prevents extensions on objects', function () {
      var obj = {};
      Reflect.preventExtensions(obj);
      expect(Object.isExtensible(obj)).to.equal(false);
    });
  });

  describeIfSetProto('.setPrototypeOf()', function () {
    if (typeof Reflect.setPrototypeOf === 'undefined') {
      return it('exists', function () {
        expect(Reflect).to.have.property('setPrototypeOf');
      });
    }

    it('is a function', function () {
      expect(typeof Reflect.setPrototypeOf).to.equal('function');
    });

    ifFunctionsHaveNamesIt('has the right name', function () {
      expect(Reflect.setPrototypeOf.name).to.equal('setPrototypeOf');
    });

    it('throws if the target isn’t an object', function () {
      testPrimitiveThrow(function (item) {
        return Reflect.setPrototypeOf(item, null);
      });
    });

    it('throws if the prototype is neither object nor null', function () {
      var o = {};

      [undefined, 1, 'string', true].forEach(function (item) {
        expect(function () {
          return Reflect.setPrototypeOf(o, item);
        }).to['throw'](TypeError);
      });
    });

    it('can set prototypes, and returns true on success', function () {
      var obj = {};

      expect(Reflect.setPrototypeOf(obj, Array.prototype)).to.equal(true);
      expect(obj).to.be.an.instanceOf(Array);

      expect(obj.toString).not.to.equal(undefined);
      expect(Reflect.setPrototypeOf(obj, null)).to.equal(true);
      expect(obj.toString).to.equal(undefined);
    });

    ifFreezeIt('is returns false on failure', function () {
      var obj = Object.freeze({});

      expect(Reflect.setPrototypeOf(obj, null)).to.equal(false);
    });

    it('fails when attempting to create a circular prototype chain', function () {
      var o = {};

      expect(Reflect.setPrototypeOf(o, o)).to.equal(false);
    });
  });
});
