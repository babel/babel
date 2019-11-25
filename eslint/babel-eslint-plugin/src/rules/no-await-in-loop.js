let isWarnedForDeprecation = false;

export default {
  meta: {
    deprecated: true,
    schema: [],
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
          "The babel/no-await-in-loop rule is deprecated. Please " +
            "use the built in no-await-in-loop rule instead.",
        );
        isWarnedForDeprecation = true;
      },
    };
  },
};
