"use strict";

let isWarnedForDeprecation = false;
module.exports = {
  meta: {
    deprecated: true,
    schema: [
      {
        enum: ["semicolon", "comma"],
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
          "The babel/flow-object-type rule is deprecated. Please " +
            "use the flowtype/object-type-delimiter rule instead.\n" +
            // eslint-disable-next-line
            "Check out https://github.com/gajus/eslint-plugin-flowtype#eslint-plugin-flowtype-rules-object-type-delimiter"
        );

        isWarnedForDeprecation = true;
      },
    };
  },
};
