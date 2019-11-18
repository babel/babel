"use strict";

let isWarnedForDeprecation = false;
module.exports = {
  meta: {
    deprecated: true,
    schema: [
      {
        enum: ["always", "as-needed"],
      },
    ],
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
          "The babel/arrow-parens rule is deprecated. Please " +
            "use the built in arrow-parens rule instead.",
        );
        isWarnedForDeprecation = true;
      },
    };
  },
};
