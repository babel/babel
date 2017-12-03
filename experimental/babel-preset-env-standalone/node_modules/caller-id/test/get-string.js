/* jshint strict: false */

require('should');
var callerId = require('../lib/caller-id.js');

/* global describe, before, it */
describe('Get caller string', function() {

    describe('for function calling another function', function() {
        var caller;

        before(function() {
            function foo() {
                bar();
            }
            function bar() {
                caller = callerId.getString();
            }
            foo();
        });

        it('should be "foo"', function() {
            caller.should.equal('foo');
        });
    });

    describe('for function in a class calling another function', function() {
        var caller;

        before(function() {
            function Foo() {}
            Foo.prototype.bar = function() {
                baz();
            };
            function baz() {
                caller = callerId.getString();
            }
            (new Foo()).bar();
        });

        it('should be "Foo.bar"', function() {
            caller.should.equal('Foo.bar');
        });
    });

    describe('for function in eval calling another function', function() {
        var caller;

        before(function() {
            /* jshint evil: true, unused: false, undef: false */
            /* global foo */
            eval('function foo() {' + '\n' +
                'bar();' + '\n' +
                '}');
            function bar() {
                caller = callerId.getString();
            }
            foo();
        });

        it('should be "(eval)foo"', function() {
            caller.should.equal('(eval)foo');
        });
    });

});

describe('Get detailed caller string', function() {

    describe('for function calling another function', function() {
        var caller;

        before(function() {
            function foo() {
                bar();
            }
            function bar() {
                caller = callerId.getDetailedString();
            }
            foo();
        });

        var expectedPrefix = 'foo at ' + __filename + ':';
        it('should start with "foo at " with this file path', function() {
            caller.should.startWith(expectedPrefix);
        });
        it('should end with a line number', function() {
            var lineNumber = caller.replace(expectedPrefix, '');
            /* jshint expr: true */
            parseInt(lineNumber, 10).should.be.a.Number;
        });
    });

    describe('for function in a class calling another function', function() {
        var caller;

        before(function() {
            function Foo() {}
            Foo.prototype.bar = function() {
                baz();
            };
            function baz() {
                caller = callerId.getDetailedString();
            }
            (new Foo()).bar();
        });

        var expectedPrefix = 'Foo.bar at ' + __filename + ':';
        it('should start with "Foo.bar at " with this file path', function() {
            caller.should.startWith(expectedPrefix);
        });
        it('should end with a line number', function() {
            var lineNumber = caller.replace(expectedPrefix, '');
            /* jshint expr: true */
            parseInt(lineNumber, 10).should.be.a.Number;
        });
    });

    describe('for function in eval calling another function', function() {
        var caller;

        before(function() {
            /* jshint evil: true, unused: false, undef: false */
            /* global foo */
            eval('function foo() {' + '\n' +
                'bar();' + '\n' +
                '}');
            function bar() {
                caller = callerId.getDetailedString();
            }
            foo();
        });

        it ('should starts with "eval at <anonymous>" and this file path', function() {
            caller.should.startWith('eval at <anonymous> (' + __filename);
        });
    });

});