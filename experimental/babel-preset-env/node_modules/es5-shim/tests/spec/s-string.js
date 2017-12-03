/* global describe, it, expect */

describe('String', function () {
    'use strict';

    describe('#trim()', function () {
        var test = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFFHello, World!\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

        it('trims all ES5 whitespace', function () {
            expect(test.trim()).toBe('Hello, World!');
            expect(test.trim().length).toBe(13);
        });

        it('does not trim the zero-width space', function () {
            expect('\u200b'.trim()).toBe('\u200b');
            expect('\u200b'.trim().length).toBe(1);
        });
    });

    describe('#replace()', function () {
        it('returns undefined for non-capturing groups', function () {
            var groups = [];
            'x'.replace(/x(.)?/g, function (m, group) {
                groups.push(group); /* "" in FF, `undefined` in CH/WK/IE */
            });
            expect(groups.length).toBe(1);
            expect(groups[0]).toBeUndefined();
        });

        it('should not fail in Firefox', function () {
            expect(function () {
                return '* alef\n* beth \n* gimel~0\n'.replace(
                    /(\n)?(^[ \t]*)([*+-]|\d+[.])[ \t]+([^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm,
                    function (match, m1, m2, m3, m4) { return '<li>' + m4 + '</li>\n'; }
                );
            }).not.toThrow();
        });
    });

    describe('#split()', function () {
        var test = 'ab';

        it('If "separator" is undefined must return Array with one String - "this" string', function () {
            expect(test.split()).toEqual([test]);
            expect(test.split(void 0)).toEqual([test]);
        });

        it('If "separator" is undefined and "limit" set to 0 must return Array[]', function () {
            expect(test.split(void 0, 0)).toEqual([]);
        });

        describe('Tests from Steven Levithan', function () {
            it("''.split() results in ['']", function () {
                expect(''.split()).toEqual(['']);
            });
            it("''.split(/./) results in ['']", function () {
                expect(''.split(/./)).toEqual(['']);
            });
            it("''.split(/.?/) results in []", function () {
                expect(''.split(/.?/)).toEqual([]);
            });
            it("''.split(/.??/) results in []", function () {
                expect(''.split(/.??/)).toEqual([]);
            });
            it("'ab'.split(/a*/) results in ['', 'b']", function () {
                expect('ab'.split(/a*/)).toEqual(['', 'b']);
            });
            it("'ab'.split(/a*?/) results in ['a', 'b']", function () {
                expect('ab'.split(/a*?/)).toEqual(['a', 'b']);
            });
            it("'ab'.split(/(?:ab)/) results in ['', '']", function () {
                expect('ab'.split(/(?:ab)/)).toEqual(['', '']);
            });
            it("'ab'.split(/(?:ab)*/) results in ['', '']", function () {
                expect('ab'.split(/(?:ab)*/)).toEqual(['', '']);
            });
            it("'ab'.split(/(?:ab)*?/) results in ['a', 'b']", function () {
                expect('ab'.split(/(?:ab)*?/)).toEqual(['a', 'b']);
            });
            it("'test'.split('') results in ['t', 'e', 's', 't']", function () {
                expect('test'.split('')).toEqual(['t', 'e', 's', 't']);
            });
            it("'test'.split() results in ['test']", function () {
                expect('test'.split()).toEqual(['test']);
            });
            it("'111'.split(1) results in ['', '', '', '']", function () {
                expect('111'.split(1)).toEqual(['', '', '', '']);
            });
            it("'test'.split(/(?:)/, 2) results in ['t', 'e']", function () {
                expect('test'.split(/(?:)/, 2)).toEqual(['t', 'e']);
            });
            it("'test'.split(/(?:)/, -1) results in ['t', 'e', 's', 't']", function () {
                expect('test'.split(/(?:)/, -1)).toEqual(['t', 'e', 's', 't']);
            });
            it("'test'.split(/(?:)/, undefined) results in ['t', 'e', 's', 't']", function () {
                expect('test'.split(/(?:)/, undefined)).toEqual(['t', 'e', 's', 't']);
            });
            it("'test'.split(/(?:)/, null) results in []", function () {
                expect('test'.split(/(?:)/, null)).toEqual([]);
            });
            it("'test'.split(/(?:)/, NaN) results in []", function () {
                expect('test'.split(/(?:)/, NaN)).toEqual([]);
            });
            it("'test'.split(/(?:)/, true) results in ['t']", function () {
                expect('test'.split(/(?:)/, true)).toEqual(['t']);
            });
            it("'test'.split(/(?:)/, '2') results in ['t', 'e']", function () {
                expect('test'.split(/(?:)/, '2')).toEqual(['t', 'e']);
            });
            it("'test'.split(/(?:)/, 'two') results in []", function () {
                expect('test'.split(/(?:)/, 'two')).toEqual([]);
            });
            it("'a'.split(/-/) results in ['a']", function () {
                expect('a'.split(/-/)).toEqual(['a']);
            });
            it("'a'.split(/-?/) results in ['a']", function () {
                expect('a'.split(/-?/)).toEqual(['a']);
            });
            it("'a'.split(/-??/) results in ['a']", function () {
                expect('a'.split(/-??/)).toEqual(['a']);
            });
            it("'a'.split(/a/) results in ['', '']", function () {
                expect('a'.split(/a/)).toEqual(['', '']);
            });
            it("'a'.split(/a?/) results in ['', '']", function () {
                expect('a'.split(/a?/)).toEqual(['', '']);
            });
            it("'a'.split(/a??/) results in ['a']", function () {
                expect('a'.split(/a??/)).toEqual(['a']);
            });
            it("'ab'.split(/-/) results in ['ab']", function () {
                expect('ab'.split(/-/)).toEqual(['ab']);
            });
            it("'ab'.split(/-?/) results in ['a', 'b']", function () {
                expect('ab'.split(/-?/)).toEqual(['a', 'b']);
            });
            it("'ab'.split(/-??/) results in ['a', 'b']", function () {
                expect('ab'.split(/-??/)).toEqual(['a', 'b']);
            });
            it("'a-b'.split(/-/) results in ['a', 'b']", function () {
                expect('a-b'.split(/-/)).toEqual(['a', 'b']);
            });
            it("'a-b'.split(/-?/) results in ['a', 'b']", function () {
                expect('a-b'.split(/-?/)).toEqual(['a', 'b']);
            });
            it("'a-b'.split(/-??/) results in ['a', '-', 'b']", function () {
                expect('a-b'.split(/-??/)).toEqual(['a', '-', 'b']);
            });
            it("'a--b'.split(/-/) results in ['a', '', 'b']", function () {
                expect('a--b'.split(/-/)).toEqual(['a', '', 'b']);
            });
            it("'a--b'.split(/-?/) results in ['a', '', 'b']", function () {
                expect('a--b'.split(/-?/)).toEqual(['a', '', 'b']);
            });
            it("'a--b'.split(/-??/) results in ['a', '-', '-', 'b']", function () {
                expect('a--b'.split(/-??/)).toEqual(['a', '-', '-', 'b']);
            });
            it("''.split(/()()/) results in []", function () {
                expect(''.split(/()()/)).toEqual([]);
            });
            it("'.'.split(/()()/) results in ['.']", function () {
                expect('.'.split(/()()/)).toEqual(['.']);
            });
            it("'.'.split(/(.?)(.?)/) results in ['', '.', '', '']", function () {
                expect('.'.split(/(.?)(.?)/)).toEqual(['', '.', '', '']);
            });
            it("'.'.split(/(.??)(.??)/) results in ['.']", function () {
                expect('.'.split(/(.??)(.??)/)).toEqual(['.']);
            });
            it("'.'.split(/(.)?(.)?/) results in ['', '.', undefined, '']", function () {
                expect('.'.split(/(.)?(.)?/)).toEqual(['', '.', undefined, '']);
            });
            it("'A<B>bold</B>and<CODE>coded</CODE>'.split(/<(\\/)?([^<>]+)>/) results in ['A', undefined, 'B', 'bold', '/', 'B', 'and', undefined, 'CODE', 'coded', '/', 'CODE', '']", function () {
                expect('A<B>bold</B>and<CODE>coded</CODE>'.split(/<(\/)?([^<>]+)>/)).toEqual(['A', undefined, 'B', 'bold', '/', 'B', 'and', undefined, 'CODE', 'coded', '/', 'CODE', '']);
            });
            it("'tesst'.split(/(s)*/) results in ['t', undefined, 'e', 's', 't']", function () {
                expect('tesst'.split(/(s)*/)).toEqual(['t', undefined, 'e', 's', 't']);
            });
            it("'tesst'.split(/(s)*?/) results in ['t', undefined, 'e', undefined, 's', undefined, 's', undefined, 't']", function () {
                expect('tesst'.split(/(s)*?/)).toEqual(['t', undefined, 'e', undefined, 's', undefined, 's', undefined, 't']);
            });
            it("'tesst'.split(/(s*)/) results in ['t', '', 'e', 'ss', 't']", function () {
                expect('tesst'.split(/(s*)/)).toEqual(['t', '', 'e', 'ss', 't']);
            });
            it("'tesst'.split(/(s*?)/) results in ['t', '', 'e', '', 's', '', 's', '', 't']", function () {
                expect('tesst'.split(/(s*?)/)).toEqual(['t', '', 'e', '', 's', '', 's', '', 't']);
            });
            it("'tesst'.split(/(?:s)*/) results in ['t', 'e', 't']", function () {
                expect('tesst'.split(/(?:s)*/)).toEqual(['t', 'e', 't']);
            });
            it("'tesst'.split(/(?=s+)/) results in ['te', 's', 'st']", function () {
                expect('tesst'.split(/(?=s+)/)).toEqual(['te', 's', 'st']);
            });
            it("'test'.split('t') results in ['', 'es', '']", function () {
                expect('test'.split('t')).toEqual(['', 'es', '']);
            });
            it("'test'.split('es') results in ['t', 't']", function () {
                expect('test'.split('es')).toEqual(['t', 't']);
            });
            it("'test'.split(/t/) results in ['', 'es', '']", function () {
                expect('test'.split(/t/)).toEqual(['', 'es', '']);
            });
            it("'test'.split(/es/) results in ['t', 't']", function () {
                expect('test'.split(/es/)).toEqual(['t', 't']);
            });
            it("'test'.split(/(t)/) results in ['', 't', 'es', 't', '']", function () {
                expect('test'.split(/(t)/)).toEqual(['', 't', 'es', 't', '']);
            });
            it("'test'.split(/(es)/) results in ['t', 'es', 't']", function () {
                expect('test'.split(/(es)/)).toEqual(['t', 'es', 't']);
            });
            it("'test'.split(/(t)(e)(s)(t)/) results in ['', 't', 'e', 's', 't', '']", function () {
                expect('test'.split(/(t)(e)(s)(t)/)).toEqual(['', 't', 'e', 's', 't', '']);
            });
            it("'.'.split(/(((.((.??)))))/) results in ['', '.', '.', '.', '', '', '']", function () {
                expect('.'.split(/(((.((.??)))))/)).toEqual(['', '.', '.', '.', '', '', '']);
            });
            it("'.'.split(/(((((.??)))))/) results in ['.']", function () {
                expect('.'.split(/(((((.??)))))/)).toEqual(['.']);
            });
            it("'a b c d'.split(/ /, -(Math.pow(2, 32) - 1)) results in ['a']", function () {
                expect('a b c d'.split(/ /, -(Math.pow(2, 32) - 1))).toEqual(['a']);
            });
            it("'a b c d'.split(/ /, Math.pow(2, 32) + 1) results in ['a']", function () {
                expect('a b c d'.split(/ /, Math.pow(2, 32) + 1)).toEqual(['a']);
            });
            it("'a b c d'.split(/ /, Infinity) results in []", function () {
                expect('a b c d'.split(/ /, Infinity)).toEqual([]);
            });
        });

        it('works with the second argument', function () {
            expect('a b'.split(/ /, 1)).toEqual(['a']);
        });
    });

    describe('#indexOf()', function () {
        it('has basic support', function () {
            expect('abcab'.indexOf('a')).toBe(0);
            expect('abcab'.indexOf('a', 1)).toBe(3);
            expect('abcab'.indexOf('a', 4)).toBe(-1);
        });

        it('works with unicode', function () {
            expect('あいabcあいabc'.indexOf('あい')).toBe(0);
            expect('あいabcあいabc'.indexOf('あい', 0)).toBe(0);
            expect('あいabcあいabc'.indexOf('あい', 1)).toBe(5);
            expect('あいabcあいabc'.indexOf('あい', 6)).toBe(-1);
        });
    });

    describe('#lastIndexOf()', function () {
        it('has the right length', function () {
            expect(String.prototype.lastIndexOf.length).toBe(1);
        });

        it('has basic support', function () {
            expect('abcd'.lastIndexOf('d')).toBe(3);
            expect('abcd'.lastIndexOf('d', 3)).toBe(3);
            expect('abcd'.lastIndexOf('d', 2)).toBe(-1);
        });

        it('works with unicode', function () {
            expect('abcあい'.lastIndexOf('あい')).toBe(3);
            expect('abcあい'.lastIndexOf('あい', 3)).toBe(3);
            expect('abcあい'.lastIndexOf('あい', 2)).toBe(-1);
        });
    });
});
