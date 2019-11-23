let isWarnedForDeprecation = false;

export default {
  meta: {
    deprecated: true,
    schema: [
      {
        enum: ["always", "never"],
      },
      {
        type: "object",
        properties: {
          singleValue: {
            type: "boolean",
          },
          objectsInArrays: {
            type: "boolean",
          },
          arraysInArrays: {
            type: "boolean",
          },
        },
        additionalProperties: false,
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
          "The babel/array-bracket-spacing rule is deprecated. Please " +
            "use the built in array-bracket-spacing rule instead.",
        );
        isWarnedForDeprecation = true;
      },
    };
  },
};
