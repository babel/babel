module.exports = (function (Base62) {
    "use strict";

    var DEFAULT_CHARACTER_SET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    Base62.encode = function(integer){
        if (integer === 0) {return '0';}
        var s = '';
        while (integer > 0) {
            s = Base62.characterSet[integer % 62] + s;
            integer = Math.floor(integer/62);
        }
        return s;
    };

    var defaultCharsetDecode = function defaultCharsetDecode (base62String) {
        var value = 0,
            i = 0,
            length = base62String.length,
            charValue;

        for (; i < length; i++) {
            charValue = base62String.charCodeAt(i);

            if (charValue < 58) {
                charValue = charValue - 48;
            } else if (charValue < 91) {
                charValue = charValue - 29;
            } else {
                charValue = charValue - 87;
            }

            value += charValue * Math.pow(62, length - i - 1);
        }

        return value;
    };

    var customCharsetDecode = function customCharsetDecode (base62String) {
        var val = 0,
            i = 0,
            length = base62String.length,
            characterSet = Base62.characterSet;

        for (; i < length; i++) {
            val += characterSet.indexOf(base62String[i]) * Math.pow(62, length - i - 1);
        }

        return val;
    };

    var decodeImplementation = null;

    Base62.decode = function(base62String){
        return decodeImplementation(base62String);
    };

    Base62.setCharacterSet = function(chars) {
        var arrayOfChars = chars.split(""), uniqueCharacters = [];

        if(arrayOfChars.length !== 62) throw Error("You must supply 62 characters");

        arrayOfChars.forEach(function(char){
            if(!~uniqueCharacters.indexOf(char)) uniqueCharacters.push(char);
        });

        if(uniqueCharacters.length !== 62) throw Error("You must use unique characters.");

        Base62.characterSet = arrayOfChars;

        decodeImplementation = chars === DEFAULT_CHARACTER_SET ? defaultCharsetDecode : customCharsetDecode;
    };

    Base62.setCharacterSet(DEFAULT_CHARACTER_SET);
    return Base62;
}({}));
