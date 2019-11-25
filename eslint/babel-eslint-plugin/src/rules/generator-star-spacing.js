let isWarnedForDeprecation = false;

export default {
  meta: {
    deprecated: true,
    schema: [
      {
        oneOf: [
          {
            enum: ["before", "after", "both", "neither"],
          },
          {
            type: "object",
            properties: {
              before: { type: "boolean" },
              after: { type: "boolean" },
            },
            additionalProperties: false,
          },
        ],
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
          "The babel/generator-star-spacing rule is deprecated. Please " +
            "use the built in generator-star-spacing rule instead.",
        );
        isWarnedForDeprecation = true;
      },
    };
  },
};
