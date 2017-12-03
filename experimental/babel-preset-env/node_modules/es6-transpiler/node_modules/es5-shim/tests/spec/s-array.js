/*global describe, it, expect, beforeEach, jasmine, xit */

var toStr = Object.prototype.toString;
// var canDistinguishSparseFromUndefined = 0 in [undefined]; // IE 6 - 8 have a bug where this returns false.
var hasStrictMode = (function () {
  'use strict';
   return !this;
}());

describe('Array', function () {
    var testSubject;
    beforeEach(function () {
        testSubject = [2, 3, undefined, true, 'hej', null, false, 0];
        delete testSubject[1];
    });
    var createArrayLikeFromArray = function createArrayLikeFromArray(arr) {
        var o = {};
        Array.prototype.forEach.call(arr, function (e, i) {
            o[i] = e;
        });
        o.length = arr.length;
        return o;
    };

    describe('forEach', function () {
        var expected, actual;

        beforeEach(function () {
            expected = {0: 2, 2: undefined, 3: true, 4: 'hej', 5: null, 6: false, 7: 0 };
            actual = {};
        });
        it('should pass the right parameters', function () {
            var callback = jasmine.createSpy('callback'),
                array = ['1'];
            array.forEach(callback);
            expect(callback).toHaveBeenCalledWith('1', 0, array);
        });
        it('should not affect elements added to the array after it has begun', function () {
            var arr = [1, 2, 3],
                i = 0;
            arr.forEach(function (a) {
                i++;
                arr.push(a + 3);
            });
            expect(arr).toEqual([1, 2, 3, 4, 5, 6]);
            expect(i).toBe(3);
        });

        it('should set the right context when given none', function () {
            var context;
            [1].forEach(function () { context = this; });
            expect(context).toBe(function () { return this; }.call());
        });
        it('should iterate all', function () {
            testSubject.forEach(function (obj, index) {
                actual[index] = obj;
            });
            expect(actual).toExactlyMatch(expected);
        });
        it('should iterate all using a context', function () {
            var o = { a: actual };

            testSubject.forEach(function (obj, index) {
                this.a[index] = obj;
            }, o);
            expect(actual).toExactlyMatch(expected);
        });

        it('should iterate all in an array-like object', function () {
            var ts = createArrayLikeFromArray(testSubject);
            Array.prototype.forEach.call(ts, function (obj, index) {
                actual[index] = obj;
            });
            expect(actual).toExactlyMatch(expected);
        });
        it('should iterate all in an array-like object using a context', function () {
            var ts = createArrayLikeFromArray(testSubject),
                o = { a: actual };

            Array.prototype.forEach.call(ts, function (obj, index) {
                this.a[index] = obj;
            }, o);
            expect(actual).toExactlyMatch(expected);
        });

        describe('strings', function () {
            var str = 'Hello, World!';
            it('should iterate all in a string', function () {
                actual = [];
                Array.prototype.forEach.call(str, function (item, index) {
                    actual[index] = item;
                });
                expect(actual).toExactlyMatch(str.split(''));
            });
            it('should iterate all in a string using a context', function () {
                actual = [];
                var o = { a: actual };
                Array.prototype.forEach.call(str, function (item, index) {
                    this.a[index] = item;
                }, o);
                expect(actual).toExactlyMatch(str.split(''));
            });
        });
        it('should have a boxed object as list argument of callback', function () {
            var listArg;
            Array.prototype.forEach.call('foo', function (item, index, list) {
                listArg = list;
            });
            expect(typeof listArg).toBe('object');
            expect(toStr.call(listArg)).toBe('[object String]');
        });
        if (hasStrictMode) {
            it('does not autobox the content in strict mode', function () {
                var context;
                [1].forEach(function () {
                    'use strict';
                    context = this;
                }, 'x');
                expect(typeof context).toBe('string');
            });
        }
    });
    describe('some', function () {
        var actual, expected, numberOfRuns;

        beforeEach(function () {
            expected = {0: 2, 2: undefined, 3: true };
            actual = {};
            numberOfRuns = 0;
        });

        it('should pass the correct values along to the callback', function () {
            var callback = jasmine.createSpy('callback');
            var array = ['1'];
            array.some(callback);
            expect(callback).toHaveBeenCalledWith('1', 0, array);
        });
        it('should not affect elements added to the array after it has begun', function () {
            var arr = [1, 2, 3],
                i = 0;
            arr.some(function (a) {
                i++;
                arr.push(a + 3);
                return i > 3;
            });
            expect(arr).toEqual([1, 2, 3, 4, 5, 6]);
            expect(i).toBe(3);
        });
        it('should set the right context when given none', function () {
            var context;
            [1].some(function () { context = this; });
            expect(context).toBe(function () { return this; }.call());
        });

        it('should return false if it runs to the end', function () {
            actual = testSubject.some(function () {});
            expect(actual).toBeFalsy();
        });
        it('should return true if it is stopped somewhere', function () {
            actual = testSubject.some(function () { return true; });
            expect(actual).toBeTruthy();
        });
        it('should return false if there are no elements', function () {
            actual = [].some(function () { return true; });
            expect(actual).toBeFalsy();
        });

        it('should stop after 3 elements', function () {
            testSubject.some(function (obj, index) {
                actual[index] = obj;
                numberOfRuns += 1;
                return numberOfRuns === 3;
            });
            expect(actual).toExactlyMatch(expected);
        });
        it('should stop after 3 elements using a context', function () {
            var o = { a: actual };
            testSubject.some(function (obj, index) {
                this.a[index] = obj;
                numberOfRuns += 1;
                return numberOfRuns === 3;
            }, o);
            expect(actual).toExactlyMatch(expected);
        });

        it('should stop after 3 elements in an array-like object', function () {
            var ts = createArrayLikeFromArray(testSubject);
            Array.prototype.some.call(ts, function (obj, index) {
                actual[index] = obj;
                numberOfRuns += 1;
                return numberOfRuns === 3;
            });
            expect(actual).toExactlyMatch(expected);
        });
        it('should stop after 3 elements in an array-like object using a context', function () {
            var ts = createArrayLikeFromArray(testSubject);
            var o = { a: actual };
            Array.prototype.some.call(ts, function (obj, index) {
                this.a[index] = obj;
                numberOfRuns += 1;
                return numberOfRuns === 3;
            }, o);
            expect(actual).toExactlyMatch(expected);
        });
        it('should have a boxed object as list argument of callback', function () {
            var listArg;
            Array.prototype.some.call('foo', function (item, index, list) {
                listArg = list;
            });
            expect(typeof listArg).toBe('object');
            expect(toStr.call(listArg)).toBe('[object String]');
        });
    });
    describe('every', function () {
        var actual, expected, numberOfRuns;

        beforeEach(function () {
            expected = { 0: 2, 2: undefined, 3: true };
            actual = {};
            numberOfRuns = 0;
        });

        it('should pass the correct values along to the callback', function () {
            var callback = jasmine.createSpy('callback');
            var array = ['1'];
            array.every(callback);
            expect(callback).toHaveBeenCalledWith('1', 0, array);
        });
        it('should not affect elements added to the array after it has begun', function () {
            var arr = [1, 2, 3],
                i = 0;
            arr.every(function (a) {
                i++;
                arr.push(a + 3);
                return i <= 3;
            });
            expect(arr).toEqual([1, 2, 3, 4, 5, 6]);
            expect(i).toBe(3);
        });
        it('should set the right context when given none', function () {
            var context;
            [1].every(function () {context = this;});
            expect(context).toBe(function () { return this; }.call());
        });

        it('should return true if the array is empty', function () {
            actual = [].every(function () { return true; });
            expect(actual).toBeTruthy();

            actual = [].every(function () { return false; });
            expect(actual).toBeTruthy();
        });
        it('should return true if it runs to the end', function () {
            actual = [1, 2, 3].every(function () { return true; });
            expect(actual).toBeTruthy();
        });
        it('should return false if it is stopped before the end', function () {
            actual = [1, 2, 3].every(function () { return false; });
            expect(actual).toBeFalsy();
        });

        it('should return after 3 elements', function () {
            testSubject.every(function (obj, index) {
                actual[index] = obj;
                numberOfRuns += 1;
                return numberOfRuns !== 3;
            });
            expect(actual).toExactlyMatch(expected);
        });
        it('should stop after 3 elements using a context', function () {
            var o = { a: actual };
            testSubject.every(function (obj, index) {
                this.a[index] = obj;
                numberOfRuns += 1;
                return numberOfRuns !== 3;
            }, o);
            expect(actual).toExactlyMatch(expected);
        });

        it('should stop after 3 elements in an array-like object', function () {
            var ts = createArrayLikeFromArray(testSubject);
            Array.prototype.every.call(ts, function (obj, index) {
                actual[index] = obj;
                numberOfRuns += 1;
                return numberOfRuns !== 3;
            });
            expect(actual).toExactlyMatch(expected);
        });
        it('should stop after 3 elements in an array-like object using a context', function () {
            var ts = createArrayLikeFromArray(testSubject);
            var o = { a: actual };
            Array.prototype.every.call(ts, function (obj, index) {
                this.a[index] = obj;
                numberOfRuns += 1;
                return numberOfRuns !== 3;
            }, o);
            expect(actual).toExactlyMatch(expected);
        });
        it('should have a boxed object as list argument of callback', function () {
            var listArg;
            Array.prototype.every.call('foo', function (item, index, list) {
                listArg = list;
            });
            expect(typeof listArg).toBe('object');
            expect(toStr.call(listArg)).toBe('[object String]');
        });
    });

    describe('indexOf', function () {
        'use strict';
        var actual, expected;

        beforeEach(function () {
            testSubject = [2, 3, undefined, true, 'hej', null, 2, false, 0];
            delete testSubject[1];

        });

        it('should find the element', function () {
            expected = 4;
            actual = testSubject.indexOf('hej');
            expect(actual).toBe(expected);
        });
        it('should not find the element', function () {
            expected = -1;
            actual = testSubject.indexOf('mus');
            expect(actual).toBe(expected);
        });
        it('should find undefined as well', function () {
            expected = -1;
            actual = testSubject.indexOf(undefined);
            expect(actual).not.toBe(expected);
        });
        it('should skip unset indexes', function () {
            expected = 2;
            actual = testSubject.indexOf(undefined);
            expect(actual).toBe(expected);
        });
        it('should use a strict test', function () {
            actual = testSubject.indexOf(null);
            expect(actual).toBe(5);

            actual = testSubject.indexOf('2');
            expect(actual).toBe(-1);
        });
        it('should skip the first if fromIndex is set', function () {
            expect(testSubject.indexOf(2, 2)).toBe(6);
            expect(testSubject.indexOf(2, 0)).toBe(0);
            expect(testSubject.indexOf(2, 6)).toBe(6);
        });
        it('should work with negative fromIndex', function () {
            expect(testSubject.indexOf(2, -3)).toBe(6);
            expect(testSubject.indexOf(2, -9)).toBe(0);
        });
        it('should work with fromIndex being greater than the length', function () {
            expect(testSubject.indexOf(0, 20)).toBe(-1);
        });
        it('should work with fromIndex being negative and greater than the length', function () {
            expect(testSubject.indexOf('hej', -20)).toBe(4);
        });

        describe('Array-like', function ArrayLike() {
            var indexOf = Array.prototype.indexOf,
                testAL;
            beforeEach(function beforeEach() {
                testAL = {};
                testSubject = [2, 3, undefined, true, 'hej', null, 2, false, 0];
                testSubject.forEach(function (o, i) {
                    testAL[i] = o;
                });
                testAL.length = testSubject.length;
            });
            it('should find the element (array-like)', function () {
                expected = 4;
                actual = indexOf.call(testAL, 'hej');
                expect(actual).toBe(expected);
            });
            it('should not find the element (array-like)', function () {
                expected = -1;
                actual = indexOf.call(testAL, 'mus');
                expect(actual).toBe(expected);
            });
            it('should find undefined as well (array-like)', function () {
                expected = -1;
                actual = indexOf.call(testAL, undefined);
                expect(actual).not.toBe(expected);
            });
            it('should skip unset indexes (array-like)', function () {
                expected = 2;
                actual = indexOf.call(testAL, undefined);
                expect(actual).toBe(expected);
            });
            it('should use a strict test (array-like)', function () {
                actual = Array.prototype.indexOf.call(testAL, null);
                expect(actual).toBe(5);

                actual = Array.prototype.indexOf.call(testAL, '2');
                expect(actual).toBe(-1);
            });
            it('should skip the first if fromIndex is set (array-like)', function () {
                expect(indexOf.call(testAL, 2, 2)).toBe(6);
                expect(indexOf.call(testAL, 2, 0)).toBe(0);
                expect(indexOf.call(testAL, 2, 6)).toBe(6);
            });
            it('should work with negative fromIndex (array-like)', function () {
                expect(indexOf.call(testAL, 2, -3)).toBe(6);
                expect(indexOf.call(testAL, 2, -9)).toBe(0);
            });
            it('should work with fromIndex being greater than the length (array-like)', function () {
                expect(indexOf.call(testAL, 0, 20)).toBe(-1);
            });
            it('should work with fromIndex being negative and greater than the length (array-like)', function () {
                expect(indexOf.call(testAL, 'hej', -20)).toBe(4);
            });
        });
    });
    describe('lastIndexOf', function () {
        'use strict';
        var actual, expected;

        beforeEach(function () {
            testSubject = [2, 3, undefined, true, 'hej', null, 2, 3, false, 0];
            delete testSubject[1];
            delete testSubject[7];
        });
        describe('Array', function () {
            it('should find the element', function () {
                expected = 4;
                actual = testSubject.lastIndexOf('hej');
                expect(actual).toBe(expected);
            });
            it('should not find the element', function () {
                expected = -1;
                actual = testSubject.lastIndexOf('mus');
                expect(actual).toBe(expected);
            });
            it('should find undefined as well', function () {
                expected = -1;
                actual = testSubject.lastIndexOf(undefined);
                expect(actual).not.toBe(expected);
            });
            it('should skip unset indexes', function () {
                expected = 2;
                actual = testSubject.lastIndexOf(undefined);
                expect(actual).toBe(expected);
            });
            it('should use a strict test', function () {
                actual = testSubject.lastIndexOf(null);
                expect(actual).toBe(5);

                actual = testSubject.lastIndexOf('2');
                expect(actual).toBe(-1);
            });
            it('should skip the first if fromIndex is set', function () {
                expect(testSubject.lastIndexOf(2, 2)).toBe(0);
                expect(testSubject.lastIndexOf(2, 0)).toBe(0);
                expect(testSubject.lastIndexOf(2, 6)).toBe(6);
            });
            it('should work with negative fromIndex', function () {
                expect(testSubject.lastIndexOf(2, -3)).toBe(6);
                expect(testSubject.lastIndexOf(2, -9)).toBe(0);
            });
            it('should work with fromIndex being greater than the length', function () {
                expect(testSubject.lastIndexOf(2, 20)).toBe(6);
            });
            it('should work with fromIndex being negative and greater than the length', function () {
                expect(testSubject.lastIndexOf(2, -20)).toBe(-1);
            });
        });

        describe('Array like', function () {
            var lastIndexOf = Array.prototype.lastIndexOf,
                testAL;
            beforeEach(function () {
                testAL = {};
                testSubject.forEach(function (o, i) {
                    testAL[i] = o;
                });
                testAL.length = testSubject.length;
            });
            it('should find the element (array-like)', function () {
                expected = 4;
                actual = lastIndexOf.call(testAL, 'hej');
                expect(actual).toBe(expected);
            });
            it('should not find the element (array-like)', function () {
                expected = -1;
                actual = lastIndexOf.call(testAL, 'mus');
                expect(actual).toBe(expected);
            });
            it('should find undefined as well (array-like)', function () {
                expected = -1;
                actual = lastIndexOf.call(testAL, undefined);
                expect(actual).not.toBe(expected);
            });
            it('should skip unset indexes (array-like)', function () {
                expected = 2;
                actual = lastIndexOf.call(testAL, undefined);
                expect(actual).toBe(expected);
            });
            it('should use a strict test (array-like)', function () {
                actual = lastIndexOf.call(testAL, null);
                expect(actual).toBe(5);

                actual = lastIndexOf.call(testAL, '2');
                expect(actual).toBe(-1);
            });
            it('should skip the first if fromIndex is set', function () {
                expect(lastIndexOf.call(testAL, 2, 2)).toBe(0);
                expect(lastIndexOf.call(testAL, 2, 0)).toBe(0);
                expect(lastIndexOf.call(testAL, 2, 6)).toBe(6);
            });
            it('should work with negative fromIndex', function () {
                expect(lastIndexOf.call(testAL, 2, -3)).toBe(6);
                expect(lastIndexOf.call(testAL, 2, -9)).toBe(0);
            });
            it('should work with fromIndex being greater than the length', function () {
                expect(lastIndexOf.call(testAL, 2, 20)).toBe(6);
            });
            it('should work with fromIndex being negative and greater than the length', function () {
                expect(lastIndexOf.call(testAL, 2, -20)).toBe(-1);
            });
        });
    });

    describe('filter', function () {
        var filteredArray,
            callback = function callback(o, i) {
                return i !== 3 && i !== 5;
            };

        beforeEach(function () {
            testSubject = [2, 3, undefined, true, 'hej', 3, null, false, 0];
            delete testSubject[1];
            filteredArray = [2, undefined, 'hej', null, false, 0];
        });
        describe('Array object', function () {

            it('should call the callback with the proper arguments', function () {
                var predicate = jasmine.createSpy('predicate');
                var arr = ['1'];
                arr.filter(predicate);
                expect(predicate).toHaveBeenCalledWith('1', 0, arr);
            });
            it('should not affect elements added to the array after it has begun', function () {
                var arr = [1, 2, 3];
                var i = 0;
                arr.filter(function (a) {
                    i++;
                    if (i <= 4) {
                        arr.push(a + 3);
                    }
                    return true;
                });
                expect(arr).toEqual([1, 2, 3, 4, 5, 6]);
                expect(i).toBe(3);
            });
            it('should skip non-set values', function () {
                var passedValues = {};
                testSubject = [1, 2, 3, 4];
                delete testSubject[1];
                testSubject.filter(function (o, i) {
                    passedValues[i] = o;
                    return true;
                });
                expect(passedValues).toExactlyMatch(testSubject);
            });
            it('should pass the right context to the filter', function () {
                var passedValues = {};
                testSubject = [1, 2, 3, 4];
                delete testSubject[1];
                testSubject.filter(function (o, i) {
                    this[i] = o;
                    return true;
                }, passedValues);
                expect(passedValues).toExactlyMatch(testSubject);
            });
            it('should set the right context when given none', function () {
                var context;
                [1].filter(function () {context = this;});
                expect(context).toBe(function () { return this; }.call());
            });
            it('should remove only the values for which the callback returns false', function () {
                var result = testSubject.filter(callback);
                expect(result).toExactlyMatch(filteredArray);
            });
            it('should leave the original array untouched', function () {
                var copy = testSubject.slice();
                testSubject.filter(callback);
                expect(testSubject).toExactlyMatch(copy);
            });
            it('should not be affected by same-index mutation', function () {
                var results = [1, 2, 3].filter(function (value, index, array) {
                    array[index] = 'a';
                    return true;
                });
                expect(results).toEqual([1, 2, 3]);
            });
        });
        describe('Array like', function () {
            beforeEach(function () {
                testSubject = createArrayLikeFromArray(testSubject);
            });
            it('should call the predicate with the proper arguments', function () {
                var predicate = jasmine.createSpy('predicate');
                var arr = createArrayLikeFromArray(['1']);
                Array.prototype.filter.call(arr, predicate);
                expect(predicate).toHaveBeenCalledWith('1', 0, arr);
            });
            it('should not affect elements added to the array after it has begun', function () {
                var arr = createArrayLikeFromArray([1, 2, 3]),
                    i = 0;
                Array.prototype.filter.call(arr, function (a) {
                    i++;
                    if (i <= 4) {
                        arr[i + 2] = a + 3;
                    }
                    return true;
                });
                delete arr.length;
                expect(arr).toExactlyMatch([1, 2, 3, 4, 5, 6]);
                expect(i).toBe(3);
            });
            it('should skip non-set values', function () {
                var passedValues = {};
                testSubject = createArrayLikeFromArray([1, 2, 3, 4]);
                delete testSubject[1];
                Array.prototype.filter.call(testSubject, function (o, i) {
                    passedValues[i] = o;
                    return true;
                });
                delete testSubject.length;
                expect(passedValues).toExactlyMatch(testSubject);
            });
            it('should set the right context when given none', function () {
                var context;
                Array.prototype.filter.call(createArrayLikeFromArray([1]), function () {context = this;}, undefined);
                expect(context).toBe(function () { return this; }.call());
            });
            it('should pass the right context to the filter', function () {
                var passedValues = {};
                testSubject = createArrayLikeFromArray([1, 2, 3, 4]);
                delete testSubject[1];
                Array.prototype.filter.call(testSubject, function (o, i) {
                    this[i] = o;
                    return true;
                }, passedValues);
                delete testSubject.length;
                expect(passedValues).toExactlyMatch(testSubject);
            });
            it('should remove only the values for which the callback returns false', function () {
                var result = Array.prototype.filter.call(testSubject, callback);
                expect(result).toExactlyMatch(filteredArray);
            });
            it('should leave the original array untouched', function () {
                var copy = createArrayLikeFromArray(testSubject);
                Array.prototype.filter.call(testSubject, callback);
                expect(testSubject).toExactlyMatch(copy);
            });
        });
        it('should have a boxed object as list argument of callback', function () {
            var actual;
            Array.prototype.filter.call('foo', function (item, index, list) {
                actual = list;
            });
            expect(typeof actual).toBe('object');
            expect(toStr.call(actual)).toBe('[object String]');
        });
    });
    describe('map', function () {
        var callback;
        beforeEach(function () {
            var i = 0;
            callback = function () {
                return i++;
            };
        });
        describe('Array object', function () {
            it('should call mapper with the right parameters', function () {
                var mapper = jasmine.createSpy('mapper');
                var array = [1];
                array.map(mapper);
                expect(mapper).toHaveBeenCalledWith(1, 0, array);
            });
            it('should set the context correctly', function () {
                var context = {};
                testSubject.map(function (o, i) {
                    this[i] = o;
                }, context);
                expect(context).toExactlyMatch(testSubject);
            });
            it('should set the right context when given none', function () {
                var context;
                [1].map(function () { context = this; });
                expect(context).toBe(function () { return this; }.call());
            });
            it('should not change the array it is called on', function () {
                var copy = testSubject.slice();
                testSubject.map(callback);
                expect(testSubject).toExactlyMatch(copy);
            });
            it('should only run for the number of objects in the array when it started', function () {
                var arr = [1, 2, 3],
                    i = 0;
                arr.map(function (o) {
                    arr.push(o + 3);
                    i++;
                    return o;
                });
                expect(arr).toExactlyMatch([1, 2, 3, 4, 5, 6]);
                expect(i).toBe(3);
            });
            it('should properly translate the values as according to the callback', function () {
                var result = testSubject.map(callback),
                    expected = [0, 0, 1, 2, 3, 4, 5, 6];
                delete expected[1];
                expect(result).toExactlyMatch(expected);
            });
            it('should skip non-existing values', function () {
                var array = [1, 2, 3, 4],
                    i = 0;
                delete array[2];
                array.map(function () {
                    i++;
                });
                expect(i).toBe(3);
            });
        });
        describe('Array-like', function () {
            beforeEach(function () {
                testSubject = createArrayLikeFromArray(testSubject);
            });
            it('should call mapper with the right parameters', function () {
                var mapper = jasmine.createSpy('mapper');
                var array = createArrayLikeFromArray([1]);
                Array.prototype.map.call(array, mapper);
                expect(mapper).toHaveBeenCalledWith(1, 0, array);
            });
            it('should set the context correctly', function () {
                var context = {};
                Array.prototype.map.call(testSubject, function (o, i) {
                    this[i] = o;
                }, context);
                delete testSubject.length;
                expect(context).toExactlyMatch(testSubject);
            });
            it('should set the right context when given none', function () {
                var context;
                Array.prototype.map.call(createArrayLikeFromArray([1]), function () {context = this;});
                expect(context).toBe(function () { return this; }.call());
            });
            it('should not change the array it is called on', function () {
                var copy = createArrayLikeFromArray(testSubject);
                Array.prototype.map.call(testSubject, callback);
                expect(testSubject).toExactlyMatch(copy);
            });
            it('should only run for the number of objects in the array when it started', function () {
                var arr = createArrayLikeFromArray([1, 2, 3]),
                    i = 0;
                Array.prototype.map.call(arr, function (o) {
                    Array.prototype.push.call(arr, o + 3);
                    i++;
                    return o;
                });
                delete arr.length;
                expect(arr).toExactlyMatch([1, 2, 3, 4, 5, 6]);
                expect(i).toBe(3);
            });
            it('should properly translate the values as according to the callback', function () {
                var result = Array.prototype.map.call(testSubject, callback),
                    expected = [0, 0, 1, 2, 3, 4, 5, 6];
                delete expected[1];
                expect(result).toExactlyMatch(expected);
            });
            it('should skip non-existing values', function () {
                var array = createArrayLikeFromArray([1, 2, 3, 4]),
                    i = 0;
                delete array[2];
                Array.prototype.map.call(array, function () {
                    i++;
                });
                expect(i).toBe(3);
            });
        });
        it('should have a boxed object as list argument of callback', function () {
            var actual;
            Array.prototype.map.call('foo', function (item, index, list) {
                actual = list;
            });
            expect(typeof actual).toBe('object');
            expect(toStr.call(actual)).toBe('[object String]');
        });
    });

    describe('reduce', function () {
        beforeEach(function () {
            testSubject = [1, 2, 3];
        });

        describe('Array', function () {
            it('should pass the correct arguments to the callback', function () {
                var spy = jasmine.createSpy().andReturn(0);
                testSubject.reduce(spy);
                expect(spy.calls[0].args).toExactlyMatch([1, 2, 1, testSubject]);
            });
            it('should start with the right initialValue', function () {
                var spy = jasmine.createSpy().andReturn(0);
                testSubject.reduce(spy, 0);
                expect(spy.calls[0].args).toExactlyMatch([0, 1, 0, testSubject]);
            });
            it('should not affect elements added to the array after it has begun', function () {
                var arr = [1, 2, 3],
                    i = 0;
                arr.reduce(function (a, b) {
                    i++;
                    if (i <= 4) {
                        arr.push(a + 3);
                    }
                    return b;
                });
                expect(arr).toEqual([1, 2, 3, 4, 5]);
                expect(i).toBe(2);
            });
            it('should work as expected for empty arrays', function () {
                var spy = jasmine.createSpy();
                expect(function () {
                    [].reduce(spy);
                }).toThrow();
                expect(spy).not.toHaveBeenCalled();
            });
            it('should throw correctly if no callback is given', function () {
                expect(function () {
                    testSubject.reduce();
                }).toThrow();
            });
            it('should return the expected result', function () {
                expect(testSubject.reduce(function (a, b) {
                    return String(a || '') + String(b || '');
                })).toEqual(testSubject.join(''));
            });
            it('should not directly affect the passed array', function () {
                var copy = testSubject.slice();
                testSubject.reduce(function (a, b) {
                    return a + b;
                });
                expect(testSubject).toEqual(copy);
            });
            it('should skip non-set values', function () {
                delete testSubject[1];
                var visited = {};
                testSubject.reduce(function (a, b) {
                    if (a) { visited[a] = true; }
                    if (b) { visited[b] = true; }
                    return 0;
                });

                expect(visited).toEqual({ 1: true, 3: true });
            });
            it('should have the right length', function () {
                expect(testSubject.reduce.length).toBe(1);
            });
        });
        describe('Array-like objects', function () {
            beforeEach(function () {
                testSubject = createArrayLikeFromArray(testSubject);
                testSubject.reduce = Array.prototype.reduce;
            });
            it('should pass the correct arguments to the callback', function () {
                var spy = jasmine.createSpy().andReturn(0);
                testSubject.reduce(spy);
                expect(spy.calls[0].args).toExactlyMatch([1, 2, 1, testSubject]);
            });
            it('should start with the right initialValue', function () {
                var spy = jasmine.createSpy().andReturn(0);
                testSubject.reduce(spy, 0);
                expect(spy.calls[0].args).toExactlyMatch([0, 1, 0, testSubject]);
            });
            it('should not affect elements added to the array after it has begun', function () {
                var arr = createArrayLikeFromArray([1, 2, 3]),
                    i = 0;
                Array.prototype.reduce.call(arr, function (a, b) {
                    i++;
                    if (i <= 4) {
                        arr[i + 2] = a + 3;
                    }
                    return b;
                });
                expect(arr).toEqual({
                    0: 1,
                    1: 2,
                    2: 3,
                    3: 4,
                    4: 5,
                    length: 3
                });
                expect(i).toBe(2);
            });
            it('should work as expected for empty arrays', function () {
                var spy = jasmine.createSpy();
                expect(function () {
                    Array.prototype.reduce.call({length: 0}, spy);
                }).toThrow();
                expect(spy).not.toHaveBeenCalled();
            });
            it('should throw correctly if no callback is given', function () {
                expect(function () {
                    testSubject.reduce();
                }).toThrow();
            });
            it('should return the expected result', function () {
                expect(testSubject.reduce(function (a, b) {
                    return String(a || '') + String(b || '');
                })).toEqual('123');
            });
            it('should not directly affect the passed array', function () {
                var copy = createArrayLikeFromArray(testSubject);
                testSubject.reduce(function (a, b) {
                    return a + b;
                });
                delete testSubject.reduce;
                expect(testSubject).toEqual(copy);
            });
            it('should skip non-set values', function () {
                delete testSubject[1];
                var visited = {};
                testSubject.reduce(function (a, b) {
                    if (a) { visited[a] = true; }
                    if (b) { visited[b] = true; }
                    return 0;
                });

                expect(visited).toEqual({ 1: true, 3: true });
            });
            it('should have the right length', function () {
                expect(testSubject.reduce.length).toBe(1);
            });
        });
        it('should have a boxed object as list argument of callback', function () {
            var actual;
            Array.prototype.reduce.call('foo', function (accumulator, item, index, list) {
                actual = list;
            });
            expect(typeof actual).toBe('object');
            expect(toStr.call(actual)).toBe('[object String]');
        });
    });
    describe('reduceRight', function () {
        beforeEach(function () {
            testSubject = [1, 2, 3];
        });

        describe('Array', function () {
            it('should pass the correct arguments to the callback', function () {
                var spy = jasmine.createSpy().andReturn(0);
                testSubject.reduceRight(spy);
                expect(spy.calls[0].args).toExactlyMatch([3, 2, 1, testSubject]);
            });
            it('should start with the right initialValue', function () {
                var spy = jasmine.createSpy().andReturn(0);
                testSubject.reduceRight(spy, 0);
                expect(spy.calls[0].args).toExactlyMatch([0, 3, 2, testSubject]);
            });
            it('should not affect elements added to the array after it has begun', function () {
                var arr = [1, 2, 3],
                    i = 0;
                arr.reduceRight(function (a, b) {
                    i++;
                    if (i <= 4) {
                        arr.push(a + 3);
                    }
                    return b;
                });
                expect(arr).toEqual([1, 2, 3, 6, 5]);
                expect(i).toBe(2);
            });
            it('should work as expected for empty arrays', function () {
                var spy = jasmine.createSpy();
                expect(function () {
                    [].reduceRight(spy);
                }).toThrow();
                expect(spy).not.toHaveBeenCalled();
            });
            it('should work as expected for empty arrays with an initial value', function () {
                var spy = jasmine.createSpy(),
                    result;

                result = [].reduceRight(spy, '');
                expect(spy).not.toHaveBeenCalled();
                expect(result).toBe('');
            });
            it('should throw correctly if no callback is given', function () {
                expect(function () {
                    testSubject.reduceRight();
                }).toThrow();
            });
            it('should return the expected result', function () {
                expect(testSubject.reduceRight(function (a, b) {
                    return String(a || '') + String(b || '');
                })).toBe('321');
            });
            it('should not directly affect the passed array', function () {
                var copy = testSubject.slice();
                testSubject.reduceRight(function (a, b) {
                    return a + b;
                });
                expect(testSubject).toEqual(copy);
            });
            it('should skip non-set values', function () {
                delete testSubject[1];
                var visited = {};
                testSubject.reduceRight(function (a, b) {
                    if (a) { visited[a] = true; }
                    if (b) { visited[b] = true; }
                    return 0;
                });

                expect(visited).toEqual({ 1: true, 3: true });
            });
            it('should have the right length', function () {
                expect(testSubject.reduceRight.length).toBe(1);
            });
        });
        describe('Array-like objects', function () {
            beforeEach(function () {
                testSubject = createArrayLikeFromArray(testSubject);
                testSubject.reduceRight = Array.prototype.reduceRight;
            });
            it('should pass the correct arguments to the callback', function () {
                var spy = jasmine.createSpy().andReturn(0);
                testSubject.reduceRight(spy);
                expect(spy.calls[0].args).toExactlyMatch([3, 2, 1, testSubject]);
            });
            it('should start with the right initialValue', function () {
                var spy = jasmine.createSpy().andReturn(0);
                testSubject.reduceRight(spy, 0);
                expect(spy.calls[0].args).toExactlyMatch([0, 3, 2, testSubject]);
            });
            it('should not affect elements added to the array after it has begun', function () {
                var arr = createArrayLikeFromArray([1, 2, 3]),
                    i = 0;
                Array.prototype.reduceRight.call(arr, function (a, b) {
                    i++;
                    if (i <= 4) {
                        arr[i + 2] = a + 3;
                    }
                    return b;
                });
                expect(arr).toEqual({
                    0: 1,
                    1: 2,
                    2: 3,
                    3: 6,
                    4: 5,
                    length: 3 // does not get updated on property assignment
                });
                expect(i).toBe(2);
            });
            it('should work as expected for empty arrays', function () {
                var spy = jasmine.createSpy();
                expect(function () {
                    Array.prototype.reduceRight.call({ length: 0 }, spy);
                }).toThrow();
                expect(spy).not.toHaveBeenCalled();
            });
            it('should throw correctly if no callback is given', function () {
                expect(function () {
                    testSubject.reduceRight();
                }).toThrow();
            });
            it('should return the expected result', function () {
                expect(testSubject.reduceRight(function (a, b) {
                    return String(a || '') + String(b || '');
                })).toEqual('321');
            });
            it('should not directly affect the passed array', function () {
                var copy = createArrayLikeFromArray(testSubject);
                testSubject.reduceRight(function (a, b) {
                    return a + b;
                });
                delete testSubject.reduceRight;
                expect(testSubject).toEqual(copy);
            });
            it('should skip non-set values', function () {
                delete testSubject[1];
                var visited = {};
                testSubject.reduceRight(function (a, b) {
                    if (a) { visited[a] = true; }
                    if (b) { visited[b] = true; }
                    return 0;
                });

                expect(visited).toEqual({ 1: true, 3: true });
            });
            it('should have the right length', function () {
                expect(testSubject.reduceRight.length).toBe(1);
            });
        });
        it('should have a boxed object as list argument of callback', function () {
            var actual;
            Array.prototype.reduceRight.call('foo', function (accumulator, item, index, list) {
                actual = list;
            });
            expect(typeof actual).toBe('object');
            expect(toStr.call(actual)).toBe('[object String]');
        });
    });

    describe('isArray', function () {
        it('should be true for Array', function () {
            expect(Array.isArray([])).toBe(true);
        });

        it('should be false for primitives', function () {
            var primitives = [
                'foo',
                true,
                false,
                42,
                0,
                -0,
                NaN,
                Infinity,
                -Infinity
            ];
            primitives.forEach(function (v) {
                expect(Array.isArray(v)).toBe(false);
            });
        });

        it('should fail for other objects', function () {
            var objects = [
                {},
                /foo/,
                arguments
            ];
            if (Object.create) {
                objects.push(Object.create(null));
            }

            objects.forEach(function (v) {
                expect(Array.isArray(v)).toBe(false);
            });
        });

        /*globals document */
        if (typeof document !== 'undefined') {
            it('should be false for an HTML element', function () {
                var el = document.getElementsByTagName('div');
                expect(Array.isArray(el)).toBe(false);
            });
        }
    });

    describe('unshift', function () {
        it('should return length', function () {
            expect([].unshift(0)).toBe(1);
        });
    });

    describe('splice', function () {
        var b = ['b'];
        var a = [1, 'a', b];
        var test;

        var makeArray = function (l, prefix) {
            prefix = prefix || '';
            var arr = [];
            while (l--) {
                arr.unshift(prefix + Array(l + 1).join(' ') + l);
            }
            return arr;
        };

        beforeEach(function () {
            test = a.slice(0);
        });

        it('has the right length', function () {
            expect(Array.prototype.splice.length).toBe(2);
        });

        /* This test is disabled, because ES6 normalizes actual
         * browser behavior, contradicting ES5.
         */
        xit('treats undefined deleteCount as 0', function () {
            expect(test.splice(0).length).toBe(0);
            expect(test.splice(0)).toEqual(test.splice(0, 0));
        });

        it('basic implementation test 1', function () {
            expect(test.splice(0, 0)).toEqual([]);
        });

        it('basic implementation test 2', function () {
            test.splice(0, 2);
            expect(test).toEqual([b]);
        });

        it('should return right result 1', function () {
            var array = [];

            array.splice(0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20);
            array.splice(1, 0, 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'F13', 'F14', 'F15', 'F16', 'F17', 'F18', 'F19', 'F20', 'F21', 'F22', 'F23', 'F24', 'F25', 'F26');
            array.splice(5, 0, 'XXX');

            expect(array).toEqual([1, 'F1', 'F2', 'F3', 'F4', 'XXX', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'F13', 'F14', 'F15', 'F16', 'F17', 'F18', 'F19', 'F20', 'F21', 'F22', 'F23', 'F24', 'F25', 'F26', 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
        });

        it('should return right result 2', function () {
            var array = makeArray(6);

            array.splice(array.length - 1, 1, '');
            array.splice(0, 1, 1, 2, 3, 4);
            array.splice(0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45);

            array.splice(4, 0, '99999999999999');

            expect(array).toEqual([1, 2, 3, 4, '99999999999999', 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 1, 2, 3, 4, ' 1', '  2', '   3', '    4', '']);
        });

        it('should return right result 3', function () {
            var array = [1, 2, 3];

            array.splice(0, array.length);
            array.splice(0, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
            array.splice(1, 1, 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'F13', 'F14', 'F15', 'F16', 'F17', 'F18', 'F19', 'F20', 'F21', 'F22', 'F23', 'F24', 'F25', 'F26');
            array.splice(5, 1, 'YYY', 'XXX');
            array.splice(0, 1);
            array.splice(0, 2);
            array.pop();
            array.push.apply(array, makeArray(10, '-'));
            array.splice(array.length - 2, 10);
            array.splice();
            array.splice(1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9);
            array.splice(1, 1, 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'F13', 'F14', 'F15', 'F16', 'F17', 'F18', 'F19', 'F20', 'F21', 'F22', 'F23', 'F24', 'F25', 'F26', 1, 23, 4, 5, 6, 7, 8);
            array.splice(30, 10);
            array.splice(30, 1);
            array.splice(30, 0);
            array.splice(2, 5, 1, 2, 3, 'P', 'LLL', 'CCC', 'YYY', 'XXX');
            array.push(1, 2, 3, 4, 5, 6);
            array.splice(1, 6, 1, 2, 3, 4, 5, 6, 7, 8, 9, 4, 5, 6, 7, 8, 9);
            array.splice(3, 7);
            array.unshift(7, 8, 9, 10, 11);
            array.pop();
            array.splice(5, 2);
            array.pop();
            array.unshift.apply(array, makeArray(8, '~'));
            array.pop();
            array.splice(3, 1, 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'F13', 'F14', 'F15', 'F16', 'F17', 'F18', 'F19', 'F20', 'F21', 'F22', 'F23', 'F24', 'F25', 'F26', 1, 23, 4, 5, 6, 7, 8);
            array.splice(4, 5, 'P', 'LLL', 'CCC', 'YYY', 'XXX');

            expect(array).toEqual(['~0', '~ 1', '~  2', 'F1', 'P', 'LLL', 'CCC', 'YYY', 'XXX', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'F13', 'F14', 'F15', 'F16', 'F17', 'F18', 'F19', 'F20', 'F21', 'F22', 'F23', 'F24', 'F25', 'F26', 1, 23, 4, 5, 6, 7, 8, '~    4', '~     5', '~      6', '~       7', 7, 8, 9, 10, 11, 2, 4, 5, 6, 7, 8, 9, 'CCC', 'YYY', 'XXX', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'F13', 'F14', 'F15', 'F16', 'F17', 'F18', 'F19', 'F20', 'F21', 'F22', 'F23', 'F24', 'F25', 'F26', 1, 23, 4, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'YYY', 'XXX', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'F13', 'F14', 'F15', 'F16', 'F17', 'F18', 'F19', 'F20', 'F21', 'F22', 'F23', 'F24', 'F25', 'F26', 3, 4, 5, 6, 7, 8, 9, '-0', '- 1', '-  2', '-   3', '-    4', '-     5', '-      6', '-       7', 1, 2, 3]);
        });

        it('should do nothing if method called with no arguments', function () {
            expect(test.splice()).toEqual([]);
            expect(test).toEqual(a);
        });

        it('should set first argument to 0 if first argument is set but undefined', function () {
            var test2 = test.slice(0);
            expect(test.splice(void 0, 2)).toEqual(test2.splice(0, 2));
            expect(test).toEqual(test2);
        });

        it('should work with objects - adding 1', function () {
            var obj = {};
            Array.prototype.splice.call(obj, 0, 0, 1, 2, 3);
            expect(obj.length).toBe(3);
        });

        it('should work with objects - adding 2', function () {
            var obj = { 0: 1, length: 1 };
            Array.prototype.splice.call(obj, 1, 0, 2, 3);
            expect(obj.length).toBe(3);
        });

        it('should work with objects - removing', function () {
            var obj = { 0: 1, 1: 2, 2: 3, length: 3 };
            Array.prototype.splice.call(obj, 0, 3);
            expect(obj.length).toBe(0);
        });

        it('should work with objects - replacing', function () {
            var obj = { 0: 99, length: 1 };
            Array.prototype.splice.call(obj, 0, 1, 1, 2, 3);
            expect(obj.length).toBe(3);
            expect(obj[0]).toBe(1);
        });
    });


});
