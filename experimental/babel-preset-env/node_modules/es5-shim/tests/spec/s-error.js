/* global describe, it, xit, expect */

describe('Error', function () {
    'use strict';

    var supportsDescriptors = Object.defineProperty && (function () {
        try {
            var obj = {};
            Object.defineProperty(obj, 'x', { enumerable: false, value: obj });
            for (var _ in obj) { return false; } // jscs:ignore disallowUnusedVariables
            return obj.x === obj;
        } catch (e) { /* this is ES3 */
            return false;
        }
    }());
    var ifSupportsDescriptorsIt = supportsDescriptors ? it : xit;

    describe('#toString()', function () {
        it('stringifies a newed error properly', function () {
            var msg = 'test';
            var error = new RangeError(msg);
            expect(error.name).toBe('RangeError');
            expect(error.message).toBe(msg);
            expect(String(error)).toBe(error.name + ': ' + msg);
        });

        it('stringifies a thrown error properly', function () {
            var msg = 'test';
            var error;
            try {
                throw new RangeError(msg);
            } catch (e) {
                error = e;
            }
            expect(error.name).toBe('RangeError');
            expect(error.message).toBe(msg);
            expect(String(error)).toBe(error.name + ': ' + msg);
        });
    });

    describe('enumerability of prototype properties', function () {
        ifSupportsDescriptorsIt('#message', function () {
            expect(Object.prototype.propertyIsEnumerable.call(Error.prototype, 'message')).toBe(false);
        });

        ifSupportsDescriptorsIt('#name', function () {
            expect(Object.prototype.propertyIsEnumerable.call(Error.prototype, 'name')).toBe(false);
        });
    });
});
