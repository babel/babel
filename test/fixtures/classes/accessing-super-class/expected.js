var Test = function(Foo) {
    function Test() {
        woops.super.test();
        Foo.call(this);
        Foo.prototype.test.call(this);
        foob(Foo);
        Foo.call.apply(Foo, [this].concat(Array.prototype.slice.call(arguments)));
        Foo.call.apply(Foo, [this, "test"].concat(Array.prototype.slice.call(arguments)));
        Foo.prototype.test.call.apply(Foo.prototype, [this].concat(Array.prototype.slice.call(arguments)));

        Foo.prototype.test.call.apply(
            Foo.prototype,
            [this, "test"].concat(Array.prototype.slice.call(arguments))
        );
    }

    Test.prototype = Object.create(Foo.prototype, {
        constructor: {
            value: Test,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });

    Test.__proto__ = Foo;

    Object.defineProperties(Test.prototype, {
        test: {
            writeable: true,

            value: function() {
                Foo.prototype.test.call(this);
                Foo.prototype.test.call.apply(Foo.prototype.test, [this].concat(Array.prototype.slice.call(arguments)));

                Foo.prototype.test.call.apply(
                    Foo.prototype.test,
                    [this, "test"].concat(Array.prototype.slice.call(arguments))
                );
            }
        }
    });

    Object.defineProperties(Test, {
        foo: {
            writeable: true,

            value: function() {
                Foo.foo.call(this);
                Foo.foo.call.apply(Foo.foo, [this].concat(Array.prototype.slice.call(arguments)));
                Foo.foo.call.apply(Foo.foo, [this, "test"].concat(Array.prototype.slice.call(arguments)));
            }
        }
    });

    return Test;
}(Foo);
