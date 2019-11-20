"use strict";

let isWarnedForDeprecation = false;
module.exports = {
  meta: {
    deprecated: true,
    schema: [],
  },
  create: function() {
    return {
      Program: function() {
        if (
          isWarnedForDeprecation ||
          /=-(f|-format)=/.test(process.argv.join("="))
        ) {
          return;
        }

        console.log(
          "The babel/no-await-in-loop rule is deprecated. Please " +
            "use the built in no-await-in-loop rule instead.",
        );
        isWarnedForDeprecation = true;
      },
    };
  },
};
