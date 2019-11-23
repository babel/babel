let isWarnedForDeprecation = false;

export default {
  meta: {
    deprecated: true,
    schema: [
      {
        enum: ["always", "as-needed"],
      },
    ],
  },
  create() {
    return {
      Program() {
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
