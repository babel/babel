var assert = require('assert');
var Base62 = require('../base62');

describe("encode", function() {
    it("should encode a number to a Base62 string", function() {
        assert.equal(Base62.encode(0), '0');
        assert.equal(Base62.encode(999), 'g7');
        assert.equal(Base62.encode(65), '13');
        //test big numbers
        assert.equal(Base62.encode(10000000000001), "2Q3rKTOF");
        assert.equal(Base62.encode(10000000000002), "2Q3rKTOG");

    });
});

describe("decode", function() {
    it("should decode a number from a Base62 string", function() {
        assert.equal(Base62.decode('0'), 0);
        assert.equal(Base62.decode('g7'), 999);
        assert.equal(Base62.decode('13'), 65);
        //zero padded strings
        assert.equal(Base62.decode('0013'), 65);
        //test big numbers
        assert.equal(Base62.decode("2Q3rKTOF"), 10000000000001);
        assert.equal(Base62.decode("2Q3rKTOH"), 10000000000003);
    });
});

describe("setCharacterSequence", function(){
    it("should update the character sequence", function(){
        Base62.setCharacterSet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz");

        //Test default character set is not intact
        assert.notEqual(Base62.encode(999), 'g7');

        //Test new character set test cases
        var testCases = {
            "G7": 999,
            "Lxf7": 5234233,
            "qx": 3283,
            "29": 133,
            "1S": 90,
            "3k": 232,
            "4I": 266,
            "2X": 157,
            "1E": 76,
            "1L": 83
        };

        Object.keys(testCases).forEach(function(base62String){
            assert.equal(Base62.encode(testCases[base62String]), base62String);
            assert.equal(Base62.decode(base62String), testCases[base62String]);
        });

    });

    it("should throw exceptions on invalid strings", function(){
        var errorCheck = function(err) {
            if ( (err instanceof Error) && /value/.test(err) ) {
                return true;
            }
        };

        assert.throws(function(){
            Base62.setCharacterSet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy");
        }, /You must supply 62 characters/);

        assert.throws(function(){
            Base62.setCharacterSet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz;");
        }, /You must supply 62 characters/);


        assert.throws(function(){
            Base62.setCharacterSet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxzz");
        }, /You must use unique characters/);

    });
});
