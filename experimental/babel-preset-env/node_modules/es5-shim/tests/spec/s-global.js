/* global describe, it, xit, expect */

describe('global methods', function () {
    'use strict';

    var foo = function foo() {};
    var functionsHaveNames = foo.name === 'foo';
    var ifFunctionsHaveNamesIt = functionsHaveNames ? it : xit;

    var is = function (x, y) {
        if (x === 0 && y === 0) {
            return 1 / x === 1 / y;
        }
        return x === y;
    };

    describe('parseInt', function () {
        /* eslint-disable radix */

        ifFunctionsHaveNamesIt('has the right name', function () {
            expect(parseInt.name).toBe('parseInt');
        });

        it('accepts a radix', function () {
            for (var i = 2; i <= 36; ++i) {
                expect(parseInt('10', i)).toBe(i);
            }
        });

        it('defaults the radix to 10 when the number does not start with 0x or 0X', function () {
            [
                '01',
                '08',
                '10',
                '42'
            ].forEach(function (str) {
                expect(parseInt(str)).toBe(parseInt(str, 10));
            });
        });

        it('defaults the radix to 16 when the number starts with 0x or 0X', function () {
            expect(parseInt('0x16')).toBe(parseInt('0x16', 16));
            expect(parseInt('0X16')).toBe(parseInt('0X16', 16));
        });

        it('ignores leading whitespace', function () {
            expect(parseInt('  0x16')).toBe(parseInt('0x16', 16));
            expect(parseInt('  42')).toBe(parseInt('42', 10));
            expect(parseInt('  08')).toBe(parseInt('08', 10));

            var ws = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
                '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028' +
                '\u2029\uFEFF';
            expect(parseInt(ws + '08')).toBe(parseInt('08', 10));
            expect(parseInt(ws + '0x16')).toBe(parseInt('0x16', 16));
        });

        it('defaults the radix properly when not a true number', function () {
            var fakeZero = { valueOf: function () { return 0; } };
            expect(parseInt('08', fakeZero)).toBe(parseInt('08', 10));
            expect(parseInt('0x16', fakeZero)).toBe(parseInt('0x16', 16));
        });

        it('allows sign-prefixed hex values', function () {
            expect(parseInt('-0xF')).toBe(-15);
            expect(parseInt('-0xF', 16)).toBe(-15);
            expect(parseInt('+0xF')).toBe(15);
            expect(parseInt('+0xF', 16)).toBe(15);
        });

        it('NaN parsing', function () {
            expect(parseInt(undefined)).toBeNaN();
            expect(parseInt(null)).toBeNaN();
            expect(parseInt(NaN)).toBeNaN();
        });
        /* eslint-enable radix */
    });

    describe('parseFloat()', function () {
        it('works with zeroes', function () {
            expect(is(parseFloat('0'), 0) ? '+0' : '-0').toBe('+0');
            expect(is(parseFloat(' 0'), 0) ? '+0' : '-0').toBe('+0');
            expect(is(parseFloat('+0'), 0) ? '+0' : '-0').toBe('+0');
            expect(is(parseFloat(' +0'), 0) ? '+0' : '-0').toBe('+0');
            expect(is(parseFloat('-0'), -0) ? '-0' : '+0').toBe('-0');
            expect(is(parseFloat(' -0'), -0) ? '-0' : '+0').toBe('-0');
        });

        it('NaN parsing', function () {
            expect(parseFloat(undefined)).toBeNaN();
            expect(parseFloat(null)).toBeNaN();
            expect(parseFloat(NaN)).toBeNaN();
        });
    });
});
