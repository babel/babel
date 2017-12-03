/* jshint strict: false */

var callerId = require('../lib/caller-id.js'),
    should = require('should');

var globalCaller = callerId.getData();

/* global describe, before, it */
describe('Get caller data', function() {

    describe('for function calling another function', function() {
        var caller;

        before(function() {
            function foo() {
                bar();
            }
            function bar() {
                caller = callerId.getData();
            }
            foo();
        });

        it('should have type "Object"', function() {
            caller.typeName.should.equal('Object');
        });
        it ('should have function "foo"', function() {
            caller.functionName.should.equal('foo');
        });
        it ('should not have a method name', function() {
            should.not.exist(caller.methodName);
        });
        it ('should have filePath that is this file', function() {
            caller.filePath.should.equal(__filename);
        });
        it ('should have a line number that is an integer', function() {
            /* jshint expr: true */
            (caller.lineNumber).should.be.a.Number;
            caller.lineNumber.should.be.above(0);
        });
        it ('should have topLevelFlag as true', function() {
            caller.topLevelFlag.should.equal(true);
        });
        it ('should have nativeFlag as false', function() {
            caller.nativeFlag.should.equal(false);
        });
        it ('should have evalFlag as false', function() {
            caller.evalFlag.should.equal(false);
        });
    });

    describe('for function calling another function (with specified function)', function() {
        var caller;

        before(function() {
            function foo() {
                bar();
            }
            function bar() {
                findCaller(bar);
            }
            function findCaller(func) {
                caller = callerId.getData(func);
            }
            foo();
        });

        it('should have type "Object"', function() {
            caller.typeName.should.equal('Object');
        });
        it ('should have function "foo"', function() {
            caller.functionName.should.equal('foo');
        });
        it ('should not have a method name', function() {
            should.not.exist(caller.methodName);
        });
        it ('should have filePath that is this file', function() {
            caller.filePath.should.equal(__filename);
        });
        it ('should have a line number that is an integer', function() {
            /* jshint expr: true */
            (caller.lineNumber).should.be.a.Number;
            caller.lineNumber.should.be.above(0);
        });
        it ('should have topLevelFlag as true', function() {
            caller.topLevelFlag.should.equal(true);
        });
        it ('should have nativeFlag as false', function() {
            caller.nativeFlag.should.equal(false);
        });
        it ('should have evalFlag as false', function() {
            caller.evalFlag.should.equal(false);
        });
    });

    describe('for nested function calling another function', function() {
        var caller;

        before(function() {
            function foo() {
                bar();
            }
            function bar() {
                baz();
            }
            function baz() {
                caller = callerId.getData();
            }
            foo();
        });

        it('should have type "Object"', function() {
            caller.typeName.should.equal('Object');
        });
        it ('should have function "bar"', function() {
            caller.functionName.should.equal('bar');
        });
        it ('should not have a method name', function() {
            should.not.exist(caller.methodName);
        });
        it ('should have filePath that is this file', function() {
            caller.filePath.should.equal(__filename);
        });
        it ('should have a line number that is an integer', function() {
            /* jshint expr: true */
            (caller.lineNumber).should.be.a.Number;
            caller.lineNumber.should.be.above(0);
        });
        it ('should have topLevelFlag as true', function() {
            caller.topLevelFlag.should.equal(true);
        });
        it ('should have nativeFlag as false', function() {
            caller.nativeFlag.should.equal(false);
        });
        it ('should have evalFlag as false', function() {
            caller.evalFlag.should.equal(false);
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
                caller = callerId.getData();
            }
            (new Foo()).bar();
        });

        it('should have type "Foo"', function() {
            caller.typeName.should.equal('Foo');
        });
        it ('should have function "Foo.bar"', function() {
            caller.functionName.should.equal('Foo.bar');
        });
        it ('should have method name "bar"', function() {
            caller.methodName.should.equal('bar');
        });
        it ('should have filePath that is this file', function() {
            caller.filePath.should.equal(__filename);
        });
        it ('should have a line number that is an integer', function() {
            /* jshint expr: true */
            (caller.lineNumber).should.be.a.Number;
            caller.lineNumber.should.be.above(0);
        });
        it ('should have topLevelFlag as false', function() {
            caller.topLevelFlag.should.equal(false);
        });
        it ('should have nativeFlag as false', function() {
            caller.nativeFlag.should.equal(false);
        });
        it ('should have evalFlag as false', function() {
            caller.evalFlag.should.equal(false);
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
                caller = callerId.getData();
            }
            foo();
        });

        it('should have type "Object"', function() {
            caller.typeName.should.equal('Object');
        });
        it ('should have function "foo"', function() {
            caller.functionName.should.equal('foo');
        });
        it ('should not have a method name', function() {
            should.not.exist(caller.methodName);
        });
        it ('should not have a filePath', function() {
            should.not.exist(caller.filePath);
        });
        it ('should have a line number of 2', function() {
            caller.lineNumber.should.equal(2);
        });
        it ('should have topLevelFlag as true', function() {
            caller.topLevelFlag.should.equal(true);
        });
        it ('should have nativeFlag as false', function() {
            caller.nativeFlag.should.equal(false);
        });
        it ('should have evalFlag as true', function() {
            caller.evalFlag.should.equal(true);
        });
        it ('should have evalOrigin that starts with "eval at <anonymous>" and this file path', function() {
            caller.evalOrigin.should.startWith('eval at <anonymous> (' + __filename);
        });
    });

    describe('for code in global scope calling a function', function() {
        var caller;

        before(function() {
            caller = globalCaller;
        });

        it('should have type "Module"', function() {
            caller.typeName.should.equal('Module');
        });
        it ('should have function "Module._compile"', function() {
            caller.functionName.should.equal('Module._compile');
        });
        it ('should have method name "_compile"', function() {
            caller.methodName.should.equal('_compile');
        });
        it ('should have filePath "module.js"', function() {
            caller.filePath.should.equal('module.js');
        });
        it ('should have a line number that is an integer', function() {
            /* jshint expr: true */
            (caller.lineNumber).should.be.a.Number;
            caller.lineNumber.should.be.above(0);
        });
        it ('should have topLevelFlag as false', function() {
            caller.topLevelFlag.should.equal(false);
        });
        it ('should have nativeFlag as false', function() {
            caller.nativeFlag.should.equal(false);
        });
        it ('should have evalFlag as false', function() {
            caller.evalFlag.should.equal(false);
        });
    });

});