let isWarnedForDeprecation = false;

export default {
  meta: {
    deprecated: true,
    schema: [
      {
        enum: ["always", "always-multiline", "only-multiline", "never"],
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
          "The babel/func-params-comma-dangle rule is deprecated. Please " +
            "use the built in comma-dangle rule instead.",
        );
        isWarnedForDeprecation = true;
      },
    };
  },
};
