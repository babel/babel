/* global describe, it, expect */

describe('Number', function () {
    'use strict';

    describe('#toFixed()', function () {
        it('should convert numbers correctly', function () {
            expect((0.00008).toFixed(3)).toBe('0.000');
            expect((0.9).toFixed(0)).toBe('1');
            expect((1.255).toFixed(2)).toBe('1.25');
            expect((1843654265.0774949).toFixed(5)).toBe('1843654265.07749');
            expect((1000000000000000128).toFixed(0)).toBe('1000000000000000128');
        });
    });

    describe('#toPrecision()', function () {
        // the spec allows for this test to fail.
        it('throws a RangeError when < 1 or > 21', function () {
            expect(function () { return (0.9).toPrecision(0); }).toThrow();
            // Firefox allows values up to 100
            expect(function () { return (0.9).toPrecision(101); }).toThrow();
        });

        it('works as expected', function () {
            expect((0.00008).toPrecision(3)).toBe('0.0000800');
            expect((1.255).toPrecision(2)).toBe('1.3');
            expect((1843654265.0774949).toPrecision(13)).toBe('1843654265.077');
            expect(NaN.toPrecision(1)).toBe('NaN');
        });

        it('works with an undefined precision', function () {
            var num = 123.456;
            expect(num.toPrecision()).toBe(String(num));
            expect(num.toPrecision(undefined)).toBe(String(num));
        });
    });

    describe('constants', function () {
        it('should have MAX_VALUE', function () {
            expect(Number.MAX_VALUE).toBe(1.7976931348623157e308);
        });

        it('should have MIN_VALUE', function () {
            expect(Number.MIN_VALUE).toBe(5e-324);
        });

        it('should have NaN', function () {
            expect(Number.NaN).not.toBe(Number.NaN);
        });

        it('should have POSITIVE_INFINITY', function () {
            expect(Number.POSITIVE_INFINITY).toBe(Infinity);
        });

        it('should have NEGATIVE_INFINITY', function () {
            expect(Number.NEGATIVE_INFINITY).toBe(-Infinity);
        });
    });
});
