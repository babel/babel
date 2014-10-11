var Test = function(Foo) {
    function Test() {
        Foo.prototype.test.whatever();
        Foo.prototype.test.call(this);
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
    return Test;
}(Foo);
