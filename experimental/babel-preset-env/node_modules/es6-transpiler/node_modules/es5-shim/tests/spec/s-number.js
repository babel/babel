/*global describe, it, expect */

describe('Number', function () {
    'use strict';

    describe('toFixed', function () {
        it('should convert numbers correctly', function () {
            expect((0.00008).toFixed(3)).toBe('0.000');
            expect((0.9).toFixed(0)).toBe('1');
            expect((1.255).toFixed(2)).toBe('1.25');
            expect((1843654265.0774949).toFixed(5)).toBe('1843654265.07749');
            expect((1000000000000000128).toFixed(0)).toBe('1000000000000000128');
        });
    });

});
