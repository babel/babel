/*global describe, it, expect, beforeEach */

describe('Date', function () {
    'use strict';

    describe('now', function () {
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
                                                                                  //Chrome 19     Opera 12      Firefox 11    IE 9          Safari 5.1.1
            expect(+new Date('2012-12-31T23:59:59.000Z')).toBe(1356998399000);   //1356998399000 1356998399000 1356998399000 1356998399000 1356998399000
            expect(+new Date('2012-04-04T05:02:02.170Z')).toBe(1333515722170);   //1333515722170 1333515722170 1333515722170 1333515722170 1333515722170
            expect(+new Date('2012-04-04T05:02:02.170999Z')).toBe(1333515722170);   //1333515722170 1333515722170 1333515722170 1333515722170 1333515722170
            expect(+new Date('2012-04-04T05:02:02.17Z')).toBe(1333515722170);    //1333515722170 1333515722170 1333515722170 1333515722170 1333515722170
            expect(+new Date('2012-04-04T05:02:02.1Z')).toBe(1333515722100);     //1333515722170 1333515722170 1333515722170 1333515722170 1333515722170
            expect(+new Date('2012-04-04T24:00:00.000Z')).toBe(1333584000000);   //NaN           1333584000000 1333584000000 1333584000000 1333584000000
            expect(+new Date('2012-02-29T12:00:00.000Z')).toBe(1330516800000);   //1330516800000 1330516800000 1330516800000 1330516800000 1330516800000
            expect(+new Date('2011-03-01T12:00:00.000Z')).toBe(1298980800000);   //1298980800000 1298980800000 1298980800000 1298980800000 1298980800000

            // https://github.com/es-shims/es5-shim/issues/80 Safari bug with leap day
            expect(new Date('2034-03-01T00:00:00.000Z') -
                        new Date('2034-02-27T23:59:59.999Z')).toBe(86400001);   //86400001      86400001       86400001       86400001      1

        });
    });

    describe('parse', function () {
        // TODO: Write the rest of the test.

        it('should support extended years', function () {
            expect(Date.parse('0001-01-01T00:00:00Z')).toBe(-62135596800000);
            expect(Date.parse('+275760-09-13T00:00:00.000Z')).toBe(8.64e15);
            expect(Date.parse('+033658-09-27T01:46:40.000Z')).toBe(1e15);
            expect(Date.parse('-000001-01-01T00:00:00Z')).toBe(-62198755200000);
            expect(Date.parse('+002009-12-15T00:00:00Z')).toBe(1260835200000);
        });

        it('should be an invalid date', function () {
                                                                                  //Chrome 19     Opera 12      Firefox 11    IE 9          Safari 5.1.1
            expect(Date.parse('2012-11-31T23:59:59.000Z')).toBeFalsy();           //1354406399000 NaN           NaN           1354406399000 NaN
            expect(Date.parse('2012-12-31T23:59:60.000Z')).toBeFalsy();           //NaN           NaN           NaN           NaN           1356998400000
            expect(Date.parse('2012-04-04T24:00:00.500Z')).toBeFalsy();           //NaN           NaN           1333584000500 1333584000500 NaN
            expect(Date.parse('2012-12-31T10:08:60.000Z')).toBeFalsy();           //NaN           NaN           NaN           NaN           1356948540000
            expect(Date.parse('2012-13-01T12:00:00.000Z')).toBeFalsy();           //NaN           NaN           NaN           NaN           NaN
            expect(Date.parse('2012-12-32T12:00:00.000Z')).toBeFalsy();           //NaN           NaN           NaN           NaN           NaN
            expect(Date.parse('2012-12-31T25:00:00.000Z')).toBeFalsy();           //NaN           NaN           NaN           NaN           NaN
            expect(Date.parse('2012-12-31T24:01:00.000Z')).toBeFalsy();           //NaN           NaN           NaN           1356998460000 NaN
            expect(Date.parse('2012-12-31T12:60:00.000Z')).toBeFalsy();           //NaN           NaN           NaN           NaN           NaN
            expect(Date.parse('2012-12-31T12:00:60.000Z')).toBeFalsy();           //NaN           NaN           NaN           NaN           1356955260000
            expect(Date.parse('2012-00-31T23:59:59.000Z')).toBeFalsy();           //NaN           NaN           NaN           NaN           NaN
            expect(Date.parse('2012-12-00T23:59:59.000Z')).toBeFalsy();           //NaN           NaN           NaN           NaN           NaN
            expect(Date.parse('2011-02-29T12:00:00.000Z')).toBeFalsy();           //1298980800000 NaN           NaN           1298980800000 NaN
        });

        it('should work', function () {
                                                                                  //Chrome 19     Opera 12      Firefox 11    IE 9          Safari 5.1.1
            expect(Date.parse('2012-12-31T23:59:59.000Z')).toBe(1356998399000);   //1356998399000 1356998399000 1356998399000 1356998399000 1356998399000
            expect(Date.parse('2012-04-04T05:02:02.170Z')).toBe(1333515722170);   //1333515722170 1333515722170 1333515722170 1333515722170 1333515722170
            expect(Date.parse('2012-04-04T05:02:02.170999Z')).toBe(1333515722170);   //1333515722170 1333515722170 1333515722170 1333515722170 1333515722170
            expect(Date.parse('2012-04-04T05:02:02.17Z')).toBe(1333515722170);    //1333515722170 1333515722170 1333515722170 1333515722170 1333515722170
            expect(Date.parse('2012-04-04T05:02:02.1Z')).toBe(1333515722100);     //1333515722170 1333515722170 1333515722170 1333515722170 1333515722170
            expect(Date.parse('2012-04-04T24:00:00.000Z')).toBe(1333584000000);   //NaN           1333584000000 1333584000000 1333584000000 1333584000000
            expect(Date.parse('2012-02-29T12:00:00.000Z')).toBe(1330516800000);   //1330516800000 1330516800000 1330516800000 1330516800000 1330516800000
            expect(Date.parse('2011-03-01T12:00:00.000Z')).toBe(1298980800000);   //1298980800000 1298980800000 1298980800000 1298980800000 1298980800000

            // https://github.com/es-shims/es5-shim/issues/80 Safari bug with leap day
            expect(Date.parse('2034-03-01T00:00:00.000Z') -
                        Date.parse('2034-02-27T23:59:59.999Z')).toBe(86400001);   //86400001      86400001       86400001       86400001      1

        });

        it('should support extended years', function () {
                                                                                  //Chrome 19     Opera 12      Firefox 11    IE 9          Safari 5.1.1
            expect(Date.parse('0000-01-01T00:00:00.000Z')).toBe(-621672192e5);    //-621672192e5  -621672192e5  -621672192e5  -621672192e5  -621672192e5
            expect(Date.parse('+275760-09-13T00:00:00.000Z')).toBe(8.64e15);      //8.64e15       NaN           8.64e15       8.64e15       8.64e15
            expect(Date.parse('-271821-04-20T00:00:00.000Z')).toBe(-8.64e15);     //-8.64e15      NaN           -8.64e15      -8.64e15      -8.6400000864e15
            expect(Date.parse('+275760-09-13T00:00:00.001Z')).toBeFalsy();        //NaN           NaN           NaN           8.64e15 + 1   8.64e15 + 1
            expect(Date.parse('-271821-04-19T23:59:59.999Z')).toBeFalsy();        //NaN           NaN           NaN           -8.64e15 - 1  -8.6400000864e15 - 1
        });

        it('works with timezone offsets', function () {
                                                                                  //Chrome 19     Opera 12      Firefox 11    IE 9          Safari 5.1.1
            expect(Date.parse('2012-01-29T12:00:00.000+01:00')).toBe(132783480e4);//132783480e4 132783480e4  132783480e4  132783480e4     132783480e4
            expect(Date.parse('2012-01-29T12:00:00.000-00:00')).toBe(132783840e4);//132783840e4 132783840e4  132783840e4  132783840e4     132783840e4
            expect(Date.parse('2012-01-29T12:00:00.000+00:00')).toBe(132783840e4);//132783840e4 132783840e4  132783840e4  132783840e4     132783840e4
            expect(Date.parse('2012-01-29T12:00:00.000+23:59')).toBe(132775206e4);//132775206e4 132775206e4  132775206e4  132775206e4     132775206e4
            expect(Date.parse('2012-01-29T12:00:00.000-23:59')).toBe(132792474e4);//132792474e4 132792474e4  132792474e4  132792474e4     132792474e4
            expect(Date.parse('2012-01-29T12:00:00.000+24:00')).toBeFalsy();      //NaN         1327752e6    NaN          1327752000000   1327752000000
            expect(Date.parse('2012-01-29T12:00:00.000+24:01')).toBeFalsy();      //NaN         NaN          NaN          1327751940000   1327751940000
            expect(Date.parse('2012-01-29T12:00:00.000+24:59')).toBeFalsy();      //NaN         NaN          NaN          1327748460000   1327748460000
            expect(Date.parse('2012-01-29T12:00:00.000+25:00')).toBeFalsy();      //NaN         NaN          NaN          NaN             NaN
            expect(Date.parse('2012-01-29T12:00:00.000+00:60')).toBeFalsy();      //NaN         NaN          NaN          NaN             NaN
            expect(Date.parse('-271821-04-20T00:00:00.000+00:01')).toBeFalsy();   //NaN         NaN          NaN          -864000000006e4 -864000008646e4
            expect(Date.parse('-271821-04-20T00:01:00.000+00:01')).toBe(-8.64e15);//-8.64e15    NaN          -8.64e15     -8.64e15        -864000008640e4

            // When time zone is missed, local offset should be used (ES 5.1 bug)
            // see https://bugs.ecmascript.org/show_bug.cgi?id=112
            var tzOffset = Number(new Date(1970, 0));
            // same as (new Date().getTimezoneOffset() * 60000)
            expect(Date.parse('1970-01-01T00:00:00')).toBe(tzOffset);             //tzOffset    0            0            0               NaN
        });

        it('should be able to coerce to a number', function () {
            var actual = Number(new Date(1970, 0));
            var expected = parseInt(actual, 10);
            expect(actual).toBeDefined();
            expect(actual).toEqual(expected);
            expect(isNaN(actual)).toBeFalsy();
        });

    });

    describe('toString', function () {
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

    describe('valueOf', function () {
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

    describe('toISOString', function () {
        // TODO: write the rest of the test.

        it('should support extended years', function () {
            expect(new Date(-62198755200000).toISOString().indexOf('-000001-01-01')).toBe(0);
            expect(new Date(8.64e15).toISOString().indexOf('+275760-09-13')).toBe(0);
        });

        it('should return correct dates', function () {
            expect(new Date(-1).toISOString()).toBe('1969-12-31T23:59:59.999Z');// Safari 5.1.5 "1969-12-31T23:59:59.-01Z"
            expect(new Date(-3509827334573292).toISOString()).toBe('-109252-01-01T10:37:06.708Z'); // Opera 11.61/Opera 12 bug with Date#getUTCMonth
        });

    });

    describe('toJSON', function () {

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
          } catch (e) {}
          expect(json).toBe(null);
        });

        it('should return the isoString when stringified', function () {
            var date = new Date();
            expect(JSON.stringify(date.toISOString())).toBe(JSON.stringify(date));
        });
    });

});
