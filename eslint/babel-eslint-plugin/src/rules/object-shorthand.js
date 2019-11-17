"use strict";

let isWarnedForDeprecation = false;
module.exports = {
  meta: {
    deprecated: true,
    schema: [
      {
        enum: ["always", "methods", "properties", "never"],
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
          "The babel/object-shorthand rule is deprecated. Please " +
            "use the built in object-shorthand rule instead."
        );
        isWarnedForDeprecation = true;
      },
    };
  },
};
