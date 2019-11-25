let isWarnedForDeprecation = false;

export default {
  meta: {
    deprecated: true,
    schema: [
      {
        enum: ["always", "methods", "properties", "never"],
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
          "The babel/object-shorthand rule is deprecated. Please " +
            "use the built in object-shorthand rule instead.",
        );
        isWarnedForDeprecation = true;
      },
    };
  },
};
