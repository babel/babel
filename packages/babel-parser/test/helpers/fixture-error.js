import { inspect } from "util";
import Difference from "./difference.js";
import "./polyfill.js";

const { isArray } = Array;
const { defineProperty, entries, fromEntries } = Object;

const named = (name, object) => defineProperty(object, "name", { value: name });
const mapEntries = (object, f) => fromEntries(entries(object).map(f));

export default class FixtureError extends Error {
  constructor(message, difference) {
    super(message);
    this.difference = difference;
  }

  static fromDifference(difference, actual) {
    return difference === Difference.None
      ? FixtureError.None
      : difference.path[0] !== "threw"
      ? new FixtureError.DifferentAST(difference)
      : !difference.expected
      ? new FixtureError.UnexpectedError(difference, actual.threw)
      : difference.actual
      ? new FixtureError.DifferentError(difference, actual.threw)
      : actual.ast && actual.ast.errors
      ? new FixtureError.UnexpectedRecovery(difference, actual.ast.errors)
      : new FixtureError.UnexpectedSuccess(difference);
  }
}

FixtureError.None = Object.freeze(
  Object.setPrototypeOf({}, FixtureError.prototype),
);

Object.assign(
  FixtureError,
  mapEntries(
    {
      DifferentError: ({ expected }) =>
        `Expected unrecoverable error:    \n\n${expected}\n\n` +
        `But instead encountered different unrecoverable error.`,

      DifferentAST: ({ message }) => message,

      UnexpectedError: () => `Encountered unexpected unrecoverable error.`,

      UnexpectedSuccess: ({ expected }) =>
        `Expected unrecoverable error:\n\n    ${expected}\n\n` +
        `But parsing succeeded without errors.`,

      UnexpectedRecovery: ({ expected }, errors) =>
        `Expected unrecoverable error:\n\n    ${expected}\n\n` +
        `But instead parsing recovered from ${errors.length} errors.`,
    },
    ([name, toMessage]) => [
      name,
      named(
        name,
        class extends FixtureError {
          constructor(difference, cause) {
            super(toMessage(difference, cause), difference);

            if (cause) {
              this.cause = isArray(cause)
                ? cause.map(cause => cause.context || cause)
                : cause;
            }
          }

          // Don't show the stack of FixtureErrors, it's irrelevant.
          // Instead, show the cause, if present.
          [inspect.custom](depth, options) {
            return `${this.message.replace(/(?<=error(s?))\.$/, ":\n")}${
              this.cause
                ? `\n${inspect(this.cause, options)}`.replace(/\n/g, "\n    ")
                : ""
            }`;
          }
        },
      ),
    ],
  ),
);
