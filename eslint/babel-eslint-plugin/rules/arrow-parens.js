"use strict";

var isWarnedForDeprecation = false;
module.exports = function() {
    return {
        Program() {
            if (isWarnedForDeprecation || /\=-(f|-format)=/.test(process.argv.join('='))) {
              return;
            }

            /* eslint-disable no-console */
            console.log('The babel/arrow-parens rule is deprecated. Please ' +
                        'use the built in arrow-parens rule instead.');
            /* eslint-enable no-console */
            isWarnedForDeprecation = true;
        }
    };
};

module.exports.schema = [
    {
        "enum": ["always", "as-needed"]
    }
];
