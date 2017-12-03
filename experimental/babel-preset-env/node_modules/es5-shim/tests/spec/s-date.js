/* global describe, it, xit, expect, beforeEach, jasmine */

describe('Date', function () {
    'use strict';

    var supportsDescriptors = Object.defineProperty && (function () {
        try {
            var obj = {};
            Object.defineProperty(obj, 'x', {
                enumerable: false,
                value: obj
            });
            for (var _ in obj) { // jscs:ignore disallowUnusedVariables
                return false;
            }
            return obj.x === obj;
        } catch (e) { /* this is ES3 */
            return false;
        }
    }());
    var ifSupportsDescriptorsIt = supportsDescriptors ? it : xit;
    var has = Object.prototype.hasOwnProperty;

    var negativeDate;
    beforeEach(function () {
        var negativeCanned = [
            {
                getTime: -3509827329600292,
                getUTCDay: 4,
                getDay: 4,
                dim: 31
            },
            {
                getTime: -3509824651200292,
                getUTCDay: 0,
                getDay: 0,
                dim: 29
            },
            {
                getTime: -3509822145600292,
                getUTCDay: 1,
                getDay: 1,
                dim: 31
            },
            {
                getTime: -3509819467200292,
                getUTCDay: 4,
                getDay: 4,
                dim: 30
            },
            {
                getTime: -3509816875200292,
                getUTCDay: 6,
                getDay: 6,
                dim: 31
            },
            {
                getTime: -3509814196800292,
                getUTCDay: 2,
                getDay: 2,
                dim: 30
            },
            {
                getTime: -3509811604800292,
                getUTCDay: 4,
                getDay: 4,
                dim: 31
            },
            {
                getTime: -3509808926400292,
                getUTCDay: 0,
                getDay: 0,
                dim: 31
            },
            {
                getTime: -3509806248000292,
                getUTCDay: 3,
                getDay: 3,
                dim: 30
            },
            {
                getTime: -3509803656000292,
                getUTCDay: 5,
                getDay: 5,
                dim: 31
            },
            {
                getTime: -3509800977600292,
                getUTCDay: 1,
                getDay: 1,
                dim: 30
            },
            {
                getTime: -3509798385600292,
                getUTCDay: 3,
                getDay: 3,
                dim: 31
            }
        ];
        negativeDate = negativeCanned.map(function (item) {
            var dateFirst = new Date(item.getTime);
            var dateLast = new Date(item.getTime + ((item.dim - 1) * 86400000));
            return {
                dates: [dateFirst, dateLast],
                days: [1, item.dim],
                getUTCDay: [item.getUTCDay, (item.getUTCDay + item.dim - 1) % 7],
                getDay: [item.getDay, (item.getDay + item.dim - 1) % 7]
            };
        });
    });

    describe('.now()', function () {
        it('should be the current time', function () {
            var before = (new Date()).getTime();
            var middle = Date.now();
            var after = (new Date()).getTime();
            expect(middle).not.toBeLessThan(before);
            expect(middle).not.toBeGreaterThan(after);
        });
    });

    describe('constructor', function () {
        it('works with standard formats', function () {
            //    Chrome 19     Opera 12      Firefox 11    IE 9          Safari 5.1.1
            expect(+new Date('2012-12-31T23:59:59.000Z')).toBe(1356998399000); //    1356998399000 1356998399000 1356998399000 1356998399000 1356998399000
            expect(+new Date('2012-04-04T05:02:02.170Z')).toBe(1333515722170); //    1333515722170 1333515722170 1333515722170 1333515722170 1333515722170
            expect(+new Date('2012-04-04T05:02:02.170999Z')).toBe(1333515722170); // 1333515722170 1333515722170 1333515722170 1333515722170 1333515722170
            expect(+new Date('2012-04-04T05:02:02.17Z')).toBe(1333515722170); //     1333515722170 1333515722170 1333515722170 1333515722170 1333515722170
            expect(+new Date('2012-04-04T05:02:02.1Z')).toBe(1333515722100); //      1333515722170 1333515722170 1333515722170 1333515722170 1333515722170
            expect(+new Date('2012-04-04T24:00:00.000Z')).toBe(1333584000000); //    NaN           1333584000000 1333584000000 1333584000000 1333584000000
            expect(+new Date('2012-02-29T12:00:00.000Z')).toBe(1330516800000); //    1330516800000 1330516800000 1330516800000 1330516800000 1330516800000
            expect(+new Date('2011-03-01T12:00:00.000Z')).toBe(1298980800000); //    1298980800000 1298980800000 1298980800000 1298980800000 1298980800000

            // https://github.com/es-shims/es5-shim/issues/80 Safari bug with leap day
            expect(new Date('2034-03-01T00:00:00.000Z') -
                new Date('2034-02-27T23:59:59.999Z')).toBe(86400001); //          86400001      86400001      86400001      86400001             1

        });

        ifSupportsDescriptorsIt('is not enumerable', function () {
            expect(Object.keys(new Date())).not.toContain('constructor');
        });

        it('works as a function', function () {
            var zeroDate = Date(0);
            expect(zeroDate).toBe(String(zeroDate));
            var value = Date(1441705534578);
            expect(value).toBe(String(value));
        });

        it('fixes this Safari 8/9 bug', function () {
            var offset = new Date(1970).getTimezoneOffset() * 60e3;

            var timestamp = 2147483647; // Math.pow(2, 31) - 1
            var date = new Date(1970, 0, 1, 0, 0, 0, timestamp);
            var expectedTimestamp = timestamp + offset;
            expect(date.getTime()).toBe(expectedTimestamp);

            var brokenTimestamp = 2147483648; // Math.pow(2, 31)
            var brokenDate = new Date(1970, 0, 1, 0, 0, 0, brokenTimestamp);
            var expectedBrokenTimestamp = brokenTimestamp + offset;
            expect(brokenDate.getTime()).toBe(expectedBrokenTimestamp); // NaN in Safari 8/9

            var veryBrokenTS = 1435734000000;
            var veryBrokenDate = new Date(1970, 0, 1, 0, 0, 0, veryBrokenTS);
            var largeDate = new Date('Wed Jul 01 2015 07:00:00 GMT-0700 (PDT)');
            var expectedVeryBrokenTS = veryBrokenTS + (largeDate.getTimezoneOffset() * 60e3);
            expect(veryBrokenDate.getTime()).toBe(expectedVeryBrokenTS); // NaN in Safari 8/9
        });

        it('works with a Date object', function () {
            var date = new Date(1456297712984);
            var copiedDate = new Date(date);
            expect(date).not.toBe(copiedDate);
            expect(copiedDate.getTime()).toBe(date.getTime());
            expect(+copiedDate).toBe(+date);
            expect(String(copiedDate)).toBe(String(date));
        });
    });

    describe('.parse()', function () {
        // TODO: Write the rest of the test.

        ifSupportsDescriptorsIt('is not enumerable', function () {
            expect(Object.getOwnPropertyDescriptor(Date, 'parse').enumerable).toBe(false);
        });

        it('should be an invalid date', function () {
            //            Chrome 19     Opera 12      Firefox 11    IE 9          Safari 5.1.1
            expect(Date.parse('2012-11-31T23:59:59.000Z')).toBeFalsy(); //            1354406399000 NaN           NaN           1354406399000 NaN
            expect(Date.parse('2012-12-31T23:59:60.000Z')).toBeFalsy(); //            NaN           NaN           NaN           NaN           1356998400000
            expect(Date.parse('2012-04-04T24:00:00.500Z')).toBeFalsy(); //            NaN           NaN           1333584000500 1333584000500 NaN
            expect(Date.parse('2012-12-31T10:08:60.000Z')).toBeFalsy(); //            NaN           NaN           NaN           NaN           1356948540000
            expect(Date.parse('2012-13-01T12:00:00.000Z')).toBeFalsy(); //            NaN           NaN           NaN           NaN           NaN
            expect(Date.parse('2012-12-32T12:00:00.000Z')).toBeFalsy(); //            NaN           NaN           NaN           NaN           NaN
            expect(Date.parse('2012-12-31T25:00:00.000Z')).toBeFalsy(); //            NaN           NaN           NaN           NaN           NaN
            expect(Date.parse('2012-12-31T24:01:00.000Z')).toBeFalsy(); //            NaN           NaN           NaN           1356998460000 NaN
            expect(Date.parse('2012-12-31T12:60:00.000Z')).toBeFalsy(); //            NaN           NaN           NaN           NaN           NaN
            expect(Date.parse('2012-12-31T12:00:60.000Z')).toBeFalsy(); //            NaN           NaN           NaN           NaN           1356955260000
            expect(Date.parse('2012-00-31T23:59:59.000Z')).toBeFalsy(); //            NaN           NaN           NaN           NaN           NaN
            expect(Date.parse('2012-12-00T23:59:59.000Z')).toBeFalsy(); //            NaN           NaN           NaN           NaN           NaN
            expect(Date.parse('2011-02-29T12:00:00.000Z')).toBeFalsy(); //            1298980800000 NaN           NaN           1298980800000 NaN
        });

        it('should work', function () {
            var dates = {
                //    Chrome 19     Opera 12      Firefox 11    IE 9          Safari 5.1.1  Safari 8
                '2012-12-31T23:59:59.000Z': 1356998399000, //    1356998399000 1356998399000 1356998399000 1356998399000 1356998399000 1356998399000
                '2012-04-04T05:02:02.170Z': 1333515722170, //    1333515722170 1333515722170 1333515722170 1333515722170 1333515722170 1333515722170
                '2012-04-04T05:02:02.170999Z': 1333515722170, // 1333515722170 1333515722170 1333515722170 1333515722170 1333515722170 1333515722170.999
                '2012-04-04T05:02:02.17Z': 1333515722170, //     1333515722170 1333515722170 1333515722170 1333515722170 1333515722170 1333515722170
                '2012-04-04T05:02:02.1Z': 1333515722100, //      1333515722170 1333515722170 1333515722170 1333515722170 1333515722170 1333515722170
                '2012-04-04T24:00:00.000Z': 1333584000000, //    NaN           1333584000000 1333584000000 1333584000000 1333584000000 1333584000000
                '2012-02-29T12:00:00.000Z': 1330516800000, //    1330516800000 1330516800000 1330516800000 1330516800000 1330516800000 1330516800000
                '2011-03-01T12:00:00.000Z': 1298980800000 //     1298980800000 1298980800000 1298980800000 1298980800000 1298980800000 1298980800000
            };
            for (var str in dates) {
                if (has.call(dates, str)) {
                    expect(Math.floor(Date.parse(str))).toBe(dates[str]);
                }
            }

            // https://github.com/es-shims/es5-shim/issues/80 Safari bug with leap day
            expect(Date.parse('2034-03-01T00:00:00.000Z') -
                Date.parse('2034-02-27T23:59:59.999Z')).toBe(86400001); //         86400001      86400001      86400001      86400001             1

        });

        it('fixes a Safari 8/9 bug with parsing in UTC instead of local time', function () {
            var offset = new Date('2015-07-01').getTimezoneOffset() * 60e3;
            expect(Date.parse('2015-07-01T00:00:00')).toBe(1435708800000 + offset); // Safari 8/9 give NaN
        });

        it('should support extended years', function () {
            //    Chrome 19     Opera 12      Firefox 11    IE 9          Safari 5.1.1
            expect(Date.parse('0000-01-01T00:00:00.000Z')).toBe(-621672192e5); //   -621672192e5  -621672192e5  -621672192e5  -621672192e5  -621672192e5
            expect(Date.parse('0001-01-01T00:00:00Z')).toBe(-621355968e5); //       -621355968e5  -621355968e5  -621355968e5   8.64e15      -621355968e5
            expect(Date.parse('+275760-09-13T00:00:00.000Z')).toBe(8.64e15); //      8.64e15       NaN           8.64e15       8.64e15       8.64e15
            expect(Date.parse('-271821-04-20T00:00:00.000Z')).toBe(-8.64e15); //    -8.64e15       NaN          -8.64e15      -8.64e15      -8.6400000864e15
            expect(Date.parse('+275760-09-13T00:00:00.001Z')).toBeFalsy(); //        NaN           NaN           NaN           8.64e15 + 1   8.64e15 + 1
            expect(Date.parse('-271821-04-19T23:59:59.999Z')).toBeFalsy(); //        NaN           NaN           NaN          -8.64e15 - 1  -8.6400000864e15 - 1
            expect(Date.parse('+033658-09-27T01:46:40.000Z')).toBe(1e15); //         1e15          NaN           1e15          1e15          9999999136e5
            expect(Date.parse('-000001-01-01T00:00:00Z')).toBe(-621987552e5); //    -621987552e5   NaN          -621987552e5  -621987552e5  -621987552e5
            expect(Date.parse('+002009-12-15T00:00:00Z')).toBe(12608352e5); //       12608352e5    NaN           12608352e5    12608352e5    12608352e5
        });

        it('works with timezone offsets', function () {
            //  Chrome 19   Opera 12     Firefox 11   IE 9             Safari 5.1.1
            expect(Date.parse('2012-01-29T12:00:00.000+01:00')).toBe(132783480e4); //  132783480e4 132783480e4  132783480e4  132783480e4      132783480e4
            expect(Date.parse('2012-01-29T12:00:00.000-00:00')).toBe(132783840e4); //  132783840e4 132783840e4  132783840e4  132783840e4      132783840e4
            expect(Date.parse('2012-01-29T12:00:00.000+00:00')).toBe(132783840e4); //  132783840e4 132783840e4  132783840e4  132783840e4      132783840e4
            expect(Date.parse('2012-01-29T12:00:00.000+23:59')).toBe(132775206e4); //  132775206e4 132775206e4  132775206e4  132775206e4      132775206e4
            expect(Date.parse('2012-01-29T12:00:00.000-23:59')).toBe(132792474e4); //  132792474e4 132792474e4  132792474e4  132792474e4      132792474e4
            expect(Date.parse('2012-01-29T12:00:00.000+24:00')).toBeFalsy(); //        NaN         1327752e6    NaN          1327752000000    1327752000000
            expect(Date.parse('2012-01-29T12:00:00.000+24:01')).toBeFalsy(); //        NaN         NaN          NaN          1327751940000    1327751940000
            expect(Date.parse('2012-01-29T12:00:00.000+24:59')).toBeFalsy(); //        NaN         NaN          NaN          1327748460000    1327748460000
            expect(Date.parse('2012-01-29T12:00:00.000+25:00')).toBeFalsy(); //        NaN         NaN          NaN          NaN              NaN
            expect(Date.parse('2012-01-29T12:00:00.000+00:60')).toBeFalsy(); //        NaN         NaN          NaN          NaN              NaN
            expect(Date.parse('-271821-04-20T00:00:00.000+00:01')).toBeFalsy(); //     NaN         NaN          NaN         -864000000006e4 -864000008646e4
            expect(Date.parse('-271821-04-20T00:01:00.000+00:01')).toBe(-8.64e15); // -8.64e15     NaN         -8.64e15     -8.64e15        -864000008640e4

            // When time zone is missed, local offset should be used (ES 5.1 bug)
            // see https://bugs.ecmascript.org/show_bug.cgi?id=112
            var tzOffset = Number(new Date(1970, 0));
            // same as (new Date().getTimezoneOffset() * 60000)
            expect(Date.parse('1970-01-01T00:00:00')).toBe(tzOffset); //              tzOffset    0            0            0               NaN
        });

        it('should be able to coerce to a number', function () {
            var actual = Number(new Date(1970, 0));
            var expected = parseInt(actual, 10);
            expect(actual).toBeDefined();
            expect(actual).toBe(expected);
            expect(isNaN(actual)).toBeFalsy();
        });

    });

    describe('#toString()', function () {
        var actual;

        beforeEach(function () {
            actual = (new Date(1970, 0)).toString();
        });

        it('should show correct date info for ' + actual, function () {
            expect(actual).toMatch(/1970/);
            expect(actual).toMatch(/jan/i);
            expect(actual).toMatch(/thu/i);
            expect(actual).toMatch(/00:00:00/);
        });
    });

    describe('#valueOf()', function () {
        // Note that new Date(1970, 0).valueOf() is 0 in UTC timezone.
        // Check check that it's a number (and an int), not that it's "truthy".
        var actual;

        beforeEach(function () {
            actual = (new Date(1970, 0)).valueOf();
        });
        it('should give a numeric value', function () {
            expect(typeof actual).toBe('number');
        });
        it('should not be NaN', function () {
            expect(isNaN(actual)).toBe(false);
        });
        it('should give an int value', function () {
            expect(actual).toBe(Math.floor(actual));
        });
    });

    describe('#getUTCDate()', function () {
        it('should return the right value for negative dates', function () {
            // Opera 10.6/11.61/Opera 12 bug
            negativeDate.forEach(function (item) {
                item.dates.forEach(function (date, index) {
                    expect(date.getUTCDate()).toBe(item.days[index], date);
                });
            });
        });
    });

    describe('#getUTCDay()', function () {
        it('should return the right value for negative dates', function () {
            negativeDate.forEach(function (item) {
                item.dates.forEach(function (date, index) {
                    expect(date.getUTCDay()).toBe(item.getUTCDay[index]);
                });
            });
        });
    });

    describe('#getUTCFullYear()', function () {
        it('should return the right value for negative dates', function () {
            // Opera 10.6/11.61/Opera 12 bug
            negativeDate.forEach(function (item) {
                item.dates.forEach(function (date) {
                    expect(date.getUTCFullYear()).toBe(-109252);
                });
            });
        });
    });

    describe('#getUTCMonth()', function () {
        it('should return the right value for negative dates', function () {
            // Opera 10.6/11.61/Opera 12 bug
            negativeDate.forEach(function (item, index) {
                item.dates.forEach(function (date) {
                    expect(date.getUTCMonth()).toBe(index);
                });
            });
        });

        it('should return correct values', function () {
            expect(new Date(8.64e15).getUTCMonth()).toBe(8);
            expect(new Date(0).getUTCMonth()).toBe(0);
        });
    });

    describe('#getUTCHours()', function () {
        it('should return the right value for negative dates', function () {
            negativeDate.forEach(function (item) {
                item.dates.forEach(function (date) {
                    expect(date.getUTCHours()).toBe(11);
                });
            });
        });
    });

    describe('#getUTCMinutes()', function () {
        it('should return the right value for negative dates', function () {
            negativeDate.forEach(function (item) {
                item.dates.forEach(function (date) {
                    expect(date.getUTCMinutes()).toBe(59);
                });
            });
        });
    });

    describe('#getUTCSeconds()', function () {
        it('should return the right value for negative dates', function () {
            negativeDate.forEach(function (item) {
                item.dates.forEach(function (date) {
                    expect(date.getUTCSeconds()).toBe(59);
                });
            });
        });
    });

    describe('#getUTCMilliseconds()', function () {
        it('should return the right value for negative dates', function () {
            // Opera 10.6/11.61/Opera 12 bug
            negativeDate.forEach(function (item) {
                item.dates.forEach(function (date) {
                    expect(date.getUTCMilliseconds()).toBe(708);
                });
            });
        });
    });

    describe('#getDate()', function () {
        it('should return the right value for negative dates', function () {
            negativeDate.forEach(function (item) {
                item.dates.forEach(function (date, index) {
                    expect(date.getDate()).toBe(item.days[index]);
                });
            });
        });
    });

    describe('#getDay()', function () {
        it('should return the right value for negative dates', function () {
            negativeDate.forEach(function (item) {
                item.dates.forEach(function (date, index) {
                    expect(date.getDay()).toBe(item.getDay[index]);
                });
            });
        });
    });

    describe('#getFullYear()', function () {
        it('should return the right value for negative dates', function () {
            // Opera 10.6/11.61/Opera 12 bug
            negativeDate.forEach(function (item) {
                item.dates.forEach(function (date) {
                    expect(date.getFullYear()).toBe(-109252);
                });
            });
        });
    });

    describe('#getMonth()', function () {
        it('should return the right value for negative dates', function () {
            // Opera 10.6/11.61/Opera 12 bug
            negativeDate.forEach(function (item, index) {
                item.dates.forEach(function (date) {
                    expect(date.getMonth()).toBe(index);
                });
            });
        });
    });

    describe('#getHours()', function () {
        it('should return the right value for negative dates', function () {
            negativeDate.forEach(function (item) {
                item.dates.forEach(function (date) {
                    expect(date.getHours() + Math.floor(date.getTimezoneOffset() / 60)).toBe(11);
                });
            });
        });
    });

    describe('#getMinutes()', function () {
        it('should return the right value for negative dates', function () {
            negativeDate.forEach(function (item) {
                item.dates.forEach(function (date) {
                    var off = date.getTimezoneOffset();
                    var offHours = Math.floor(off / 60);
                    var offMins = off - offHours * 60;
                    expect(date.getMinutes() + offMins).toBe(59);
                });
            });
        });
    });

    describe('#getSeconds()', function () {
        it('should return the right value for negative dates', function () {
            negativeDate.forEach(function (item) {
                item.dates.forEach(function (date) {
                    expect(date.getSeconds()).toBe(59);
                });
            });
        });
    });

    describe('#getMilliseconds()', function () {
        it('should return the right value for negative dates', function () {
            // Opera 10.6/11.61/Opera 12 bug
            negativeDate.forEach(function (item) {
                item.dates.forEach(function (date) {
                    expect(date.getMilliseconds()).toBe(708);
                });
            });
        });
    });

    describe('#toISOString()', function () {
        // TODO: write the rest of the test.

        it('should support extended years', function () {
            expect(new Date(-62198755200000).toISOString().indexOf('-000001-01-01')).toBe(0);
            expect(new Date(8.64e15).toISOString().indexOf('+275760-09-13')).toBe(0);
        });

        it('should return correct dates', function () {
            expect(new Date(-1).toISOString()).toBe('1969-12-31T23:59:59.999Z'); // Safari 5.1.5 "1969-12-31T23:59:59.-01Z"
            negativeDate.forEach(function (item, index) {
                var m = index + 1;
                item.dates.forEach(function (date, idx) {
                    var d = item.days[idx];
                    expect(date.toISOString()).toBe('-109252-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + 'T11:59:59.708Z'); // Opera 11.61/Opera 12 bug with Date#getUTCMonth
                });
            });
        });

    });

    describe('#toUTCString()', function () {
        it('should return correct dates', function () {
            expect(new Date(-1509842289600292).toUTCString()).toBe('Mon, 01 Jan -45875 11:59:59 GMT');
        });
    });

    describe('#toDateString()', function () {
        it('should return correct dates', function () {
            expect(new Date(-1509842289600292).toDateString()).toBe('Mon Jan 01 -45875');
        });
    });

    describe('#toString()', function () {
        it('should return correct dates', function () {
            var actual = new Date(1449662400000).toString();
            var re = /^Wed Dec 09 2015 \d\d:\d\d:\d\d GMT[-\+]\d\d\d\d(?: |$)/;
            expect(re.test(actual)).toBe(true, actual);
        });
    });

    describe('#toJSON()', function () {

        // Opera 11.6x/12 bug
        it('should call toISOString', function () {
            var date = new Date(0);
            date.toISOString = function () {
                return 1;
            };
            expect(date.toJSON()).toBe(1);
        });

        it('should return null for not finite dates', function () {
            var date = new Date(NaN),
                json;
            try {
                json = date.toJSON();
            } catch (e) {
                /* invalid json */
                expect(e).not.toEqual(jasmine.any(Error));
            }
            expect(json).toBe(null);
        });

        it('should return the isoString when stringified', function () {
            var date = new Date();
            expect(JSON.stringify(date.toISOString())).toBe(JSON.stringify(date));
        });
    });

});
