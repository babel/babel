/* global describe, it, expect */

describe('RegExp', function () {
    'use strict';

    describe('#toString()', function () {
        describe('literals', function () {
            it('should return correct flags and in correct order', function () {
                expect(String(/pattern/)).toBe('/pattern/');
                expect(String(/pattern/i)).toBe('/pattern/i');
                expect(String(/pattern/mi)).toBe('/pattern/im');
                expect(String(/pattern/im)).toBe('/pattern/im');
                expect(String(/pattern/mgi)).toBe('/pattern/gim');
            });
        });

        describe('objects', function () {
            it('should return correct flags and in correct order', function () {
                expect(String(new RegExp('pattern'))).toBe('/pattern/');
                expect(String(new RegExp('pattern', 'i'))).toBe('/pattern/i');
                expect(String(new RegExp('pattern', 'mi'))).toBe('/pattern/im');
                expect(String(new RegExp('pattern', 'im'))).toBe('/pattern/im');
                expect(String(new RegExp('pattern', 'mgi'))).toBe('/pattern/gim');
            });
        });
    });
});
