import path from "path";
import rule from "../../lib/rules/dry-error-messages.js";
import RuleTester from "../../../babel-eslint-shared-fixtures/utils/RuleTester.js";
import { fileURLToPath } from "url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const FILENAME = path.resolve(dirname, "test/lib/index.js");
const ERRORS_MODULE = "errorsModule";
const MODULE_SAME_DIR = path.resolve(dirname, "test/lib/errorsModule.js");
const MODULE_PARENT_DIR = path.resolve(dirname, "test/errorsModule.js");

const ruleTester = new RuleTester();

ruleTester.run("dry-error-messages", rule.default, {
  valid: [
    // Ignores malformed `this.raise` invocations.
    {
      filename: FILENAME,
      code: "this.raise(loc);",
      options: [{ errorModule: ERRORS_MODULE }],
    },
    {
      filename: FILENAME,
      code: "this.notRaise(loc, 'Uh oh');",
      options: [{ errorModule: ERRORS_MODULE }],
    },
    {
      filename: FILENAME,
      code: "throw new Error(this.raise('Uh oh'));",
      options: [{ errorModule: ERRORS_MODULE }],
    },
    {
      filename: FILENAME,
      code: "this.raise(() => { throw new Error('Uh oh') });",
      options: [{ errorModule: ERRORS_MODULE }],
    },
    {
      filename: FILENAME,
      code: "throw new Error('Uh oh')",
      options: [{ errorModule: ERRORS_MODULE }],
    },
    {
      filename: FILENAME,
      code: "throw this.createError('Uh oh')",
      options: [{ errorModule: ERRORS_MODULE }],
    },
    {
      filename: FILENAME,
      code: "throw this.error",
      options: [{ errorModule: ERRORS_MODULE }],
    },
    {
      filename: FILENAME,
      code: "this.raise",
      options: [{ errorModule: ERRORS_MODULE }],
    },
    {
      filename: FILENAME,
      code: "throw obj.error",
      options: [{ errorModule: ERRORS_MODULE }],
    },
    {
      filename: FILENAME,
      code: "throw obj.raise",
      options: [{ errorModule: ERRORS_MODULE }],
    },
    {
      filename: FILENAME,
      code: "import { Errors } from 'errorsModule'; this.raise(Errors.someErrorMessage, loc);",
      options: [{ errorModule: ERRORS_MODULE }],
    },
    {
      filename: FILENAME,
      code: "import { Errors } from './errorsModule'; this.raise(Errors.someErrorMessage, loc);",
      options: [{ errorModule: MODULE_SAME_DIR }],
    },
    {
      filename: FILENAME,
      code: "import { Errors } from '../errorsModule'; this.raise(Errors.someErrorMessage, loc);",
      options: [{ errorModule: MODULE_PARENT_DIR }],
    },
    {
      filename: FILENAME,
      code: "import { NotErrors, Errors } from 'errorsModule'; this.raise(Errors.someErrorMessage, loc);",
      options: [{ errorModule: ERRORS_MODULE }],
    },
    {
      filename: FILENAME,
      code: "import { NotErrors, Errors } from './errorsModule'; this.raise(Errors.someErrorMessage, loc);",
      options: [{ errorModule: MODULE_SAME_DIR }],
    },
    {
      filename: FILENAME,
      code: "import { NotErrors, Errors } from '../errorsModule'; this.raise(Errors.someErrorMessage, loc);",
      options: [{ errorModule: MODULE_PARENT_DIR }],
    },
    {
      filename: FILENAME,
      code: "import { Errors } from 'errorsModule'; function fn() { this.raise(Errors.someErrorMessage, loc); }",
      options: [{ errorModule: ERRORS_MODULE }],
    },
    {
      filename: FILENAME,
      code: "import { Errors } from './errorsModule'; function fn() { this.raise(Errors.someErrorMessage, loc); }",
      options: [{ errorModule: MODULE_SAME_DIR }],
    },
    {
      filename: FILENAME,
      code: "import { Errors } from '../errorsModule'; function fn() { this.raise(Errors.someErrorMessage, loc); }",
      options: [{ errorModule: MODULE_PARENT_DIR }],
    },
    {
      filename: FILENAME,
      code: "import { NotErrors, Errors } from 'errorsModule'; function fn() { this.raise(Errors.someErrorMessage, loc); }",
      options: [{ errorModule: ERRORS_MODULE }],
    },
    {
      filename: FILENAME,
      code: "import { NotErrors, Errors } from './errorsModule'; function fn() { this.raise(Errors.someErrorMessage, loc); }",
      options: [{ errorModule: MODULE_SAME_DIR }],
    },
    {
      filename: FILENAME,
      code: "import { NotErrors, Errors } from '../errorsModule'; function fn() { this.raise(Errors.someErrorMessage, loc); }",
      options: [{ errorModule: MODULE_PARENT_DIR }],
    },
    {
      filename: FILENAME,
      code: "import Errors from 'errorsModule'; this.raise(Errors.someErrorMessage, loc);",
      options: [{ errorModule: ERRORS_MODULE }],
    },
    {
      filename: FILENAME,
      code: "import Errors from './errorsModule'; this.raise(Errors.someErrorMessage, loc);",
      options: [{ errorModule: MODULE_SAME_DIR }],
    },
    {
      filename: FILENAME,
      code: "import Errors from '../errorsModule'; this.raise(Errors.someErrorMessage, loc);",
      options: [{ errorModule: MODULE_PARENT_DIR }],
    },
    {
      filename: FILENAME,
      code: "import Errors, { NotErrors } from 'errorsModule'; this.raise(Errors.someErrorMessage, loc);",
      options: [{ errorModule: ERRORS_MODULE }],
    },
    {
      filename: FILENAME,
      code: "import Errors, { NotErrors } from './errorsModule'; this.raise(Errors.someErrorMessage, loc);",
      options: [{ errorModule: MODULE_SAME_DIR }],
    },
    {
      filename: FILENAME,
      code: "import Errors, { NotErrors } from '../errorsModule'; this.raise(Errors.someErrorMessage, loc);",
      options: [{ errorModule: MODULE_PARENT_DIR }],
    },
    {
      filename: FILENAME,
      code: "import NotErrors, { Errors } from 'errorsModule'; this.raise(Errors.someErrorMessage, loc);",
      options: [{ errorModule: ERRORS_MODULE }],
    },
    {
      filename: FILENAME,
      code: "import NotErrors, { Errors } from './errorsModule'; this.raise(Errors.someErrorMessage, loc);",
      options: [{ errorModule: MODULE_SAME_DIR }],
    },
    {
      filename: FILENAME,
      code: "import NotErrors, { Errors } from '../errorsModule'; this.raise(Errors.someErrorMessage, loc);",
      options: [{ errorModule: MODULE_PARENT_DIR }],
    },
    {
      filename: FILENAME,
      code: "import Errors from 'errorsModule'; function fn() { this.raise(Errors.someErrorMessage, loc); }",
      options: [{ errorModule: ERRORS_MODULE }],
    },
    {
      filename: FILENAME,
      code: "import Errors from './errorsModule'; function fn() { this.raise(Errors.someErrorMessage, loc); }",
      options: [{ errorModule: MODULE_SAME_DIR }],
    },
    {
      filename: FILENAME,
      code: "import Errors from '../errorsModule'; function fn() { this.raise(Errors.someErrorMessage, loc); }",
      options: [{ errorModule: MODULE_PARENT_DIR }],
    },
    {
      filename: FILENAME,
      code: "import Errors, { NotErrors } from 'errorsModule'; function fn() { this.raise(Errors.someErrorMessage, loc); }",
      options: [{ errorModule: ERRORS_MODULE }],
    },
    {
      filename: FILENAME,
      code: "import Errors, { NotErrors } from './errorsModule'; function fn() { this.raise(Errors.someErrorMessage, loc); }",
      options: [{ errorModule: MODULE_SAME_DIR }],
    },
    {
      filename: FILENAME,
      code: "import Errors, { NotErrors } from '../errorsModule'; function fn() { this.raise(Errors.someErrorMessage, loc); }",
      options: [{ errorModule: MODULE_PARENT_DIR }],
    },
    {
      filename: FILENAME,
      code: "import NotErrors, { Errors } from 'errorsModule'; function fn() { this.raise(Errors.someErrorMessage, loc); }",
      options: [{ errorModule: ERRORS_MODULE }],
    },
    {
      filename: FILENAME,
      code: "import NotErrors, { Errors } from './errorsModule'; function fn() { this.raise(Errors.someErrorMessage, loc); }",
      options: [{ errorModule: MODULE_SAME_DIR }],
    },
    {
      filename: FILENAME,
      code: "import NotErrors, { Errors } from '../errorsModule'; function fn() { this.raise(Errors.someErrorMessage, loc); }",
      options: [{ errorModule: MODULE_PARENT_DIR }],
    },

    // Do not warn when file linted is error module.
    {
      filename: FILENAME,
      code: "this.raise( 'Oh no!', loc);",
      options: [{ errorModule: FILENAME }],
    },
    {
      filename: MODULE_SAME_DIR,
      code: "this.raise('Oh no!', loc);",
      options: [{ errorModule: MODULE_SAME_DIR }],
    },

    // Do not warn if second argument is missing
    {
      filename: FILENAME,
      code: "this.raise(loc);",
      options: [{ errorModule: ERRORS_MODULE }],
    },

    // Support ternary as second argument
    {
      filename: FILENAME,
      code: "import Errors, { NotErrors } from 'errorsModule'; this.raise(a ? Errors.someErrorMessage : Errors.someOtherErrorMessage, loc);",
      options: [{ errorModule: ERRORS_MODULE }],
    },
  ],
  invalid: [
    {
      filename: FILENAME,
      code: "this.raise(new Error('Uh oh'), loc);",
      options: [{ errorModule: ERRORS_MODULE }],
      errors: [
        {
          messageId: "mustBeImported",
          data: { errorModule: ERRORS_MODULE },
        },
      ],
    },
    {
      filename: FILENAME,
      code: "throw this.raise(new Error('Uh oh'), loc);",
      options: [{ errorModule: ERRORS_MODULE }],
      errors: [
        {
          messageId: "mustBeImported",
          data: { errorModule: ERRORS_MODULE },
        },
      ],
    },
    {
      filename: FILENAME,
      code: "this.raise(Errors.someErrorMessage, loc);",
      options: [{ errorModule: ERRORS_MODULE }],
      errors: [
        {
          messageId: "mustBeImported",
          data: { errorModule: ERRORS_MODULE },
        },
      ],
    },
    {
      filename: FILENAME,
      code: "const Errors = { someErrorMessage: 'Uh oh!' }; this.raise(Errors.someErrorMessage, loc);",
      options: [{ errorModule: ERRORS_MODULE }],
      errors: [
        {
          messageId: "mustBeImported",
          data: { errorModule: ERRORS_MODULE },
        },
      ],
    },
    {
      filename: FILENAME,
      code: "import { Errors } from 'errorsModule'; this.raise('Uh oh!', loc);",
      options: [{ errorModule: ERRORS_MODULE }],
      errors: [
        {
          messageId: "mustBeImported",
          data: { errorModule: ERRORS_MODULE },
        },
      ],
    },
    {
      filename: FILENAME,
      code: "import { Errors } from 'errorsModule'; const msg = 'Uh oh!'; this.raise(msg, loc);",
      options: [{ errorModule: ERRORS_MODULE }],
      errors: [
        {
          messageId: "mustBeImported",
          data: { errorModule: ERRORS_MODULE },
        },
      ],
    },
    {
      filename: FILENAME,
      code: "import { Errors } from 'not-errorsModule'; this.raise(Errors.someErrorMessage, loc);",
      options: [{ errorModule: ERRORS_MODULE }],
      errors: [
        {
          messageId: "mustBeImported",
          data: { errorModule: ERRORS_MODULE },
        },
      ],
    },
    {
      filename: FILENAME,
      code: "import { Errors } from './not-errorsModule'; this.raise(Errors.someErrorMessage, loc);",
      options: [{ errorModule: MODULE_SAME_DIR }],
      errors: [
        {
          messageId: "mustBeImported",
          data: { errorModule: MODULE_SAME_DIR },
        },
      ],
    },
    {
      filename: FILENAME,
      code: "import { Errors } from '../not-errorsModule'; this.raise(Errors.someErrorMessage, loc);",
      options: [{ errorModule: MODULE_PARENT_DIR }],
      errors: [
        {
          messageId: "mustBeImported",
          data: { errorModule: MODULE_PARENT_DIR },
        },
      ],
    },
    {
      filename: FILENAME,
      code: "import { NotErrors, Errors } from 'not-errorsModule'; this.raise(Errors.someErrorMessage, loc);",
      options: [{ errorModule: ERRORS_MODULE }],
      errors: [
        {
          messageId: "mustBeImported",
          data: { errorModule: ERRORS_MODULE },
        },
      ],
    },
    {
      filename: FILENAME,
      code: "import { NotErrors, Errors } from './not-errorsModule'; this.raise(Errors.someErrorMessage, loc);",
      options: [{ errorModule: MODULE_SAME_DIR }],
      errors: [
        {
          messageId: "mustBeImported",
          data: { errorModule: MODULE_SAME_DIR },
        },
      ],
    },
    {
      filename: FILENAME,
      code: "import { NotErrors, Errors } from '../not-errorsModule'; this.raise(Errors.someErrorMessage, loc);",
      options: [{ errorModule: MODULE_PARENT_DIR }],
      errors: [
        {
          messageId: "mustBeImported",
          data: { errorModule: MODULE_PARENT_DIR },
        },
      ],
    },
    {
      filename: FILENAME,
      code: "import { Errors } from 'not-errorsModule'; function fn() { this.raise(Errors.someErrorMessage, loc); }",
      options: [{ errorModule: ERRORS_MODULE }],
      errors: [
        {
          messageId: "mustBeImported",
          data: { errorModule: ERRORS_MODULE },
        },
      ],
    },
    {
      filename: FILENAME,
      code: "import { Errors } from './not-errorsModule'; function fn() { this.raise(Errors.someErrorMessage, loc); }",
      options: [{ errorModule: MODULE_SAME_DIR }],
      errors: [
        {
          messageId: "mustBeImported",
          data: { errorModule: MODULE_SAME_DIR },
        },
      ],
    },
    {
      filename: FILENAME,
      code: "import { Errors } from '../not-errorsModule'; function fn() { this.raise(Errors.someErrorMessage, loc); }",
      options: [{ errorModule: MODULE_PARENT_DIR }],
      errors: [
        {
          messageId: "mustBeImported",
          data: { errorModule: MODULE_PARENT_DIR },
        },
      ],
    },
    {
      filename: FILENAME,
      code: "import { NotErrors, Errors } from 'not-errorsModule'; function fn() { this.raise(Errors.someErrorMessage, loc); }",
      options: [{ errorModule: ERRORS_MODULE }],
      errors: [
        {
          messageId: "mustBeImported",
          data: { errorModule: ERRORS_MODULE },
        },
      ],
    },
    {
      filename: FILENAME,
      code: "import { NotErrors, Errors } from './not-errorsModule'; function fn() { this.raise(Errors.someErrorMessage, loc); }",
      options: [{ errorModule: MODULE_SAME_DIR }],
      errors: [
        {
          messageId: "mustBeImported",
          data: { errorModule: MODULE_SAME_DIR },
        },
      ],
    },
    {
      filename: FILENAME,
      code: "import { NotErrors, Errors } from '../not-errorsModule'; function fn() { this.raise(Errors.someErrorMessage, loc); }",
      options: [{ errorModule: MODULE_PARENT_DIR }],
      errors: [
        {
          messageId: "mustBeImported",
          data: { errorModule: MODULE_PARENT_DIR },
        },
      ],
    },
    {
      filename: FILENAME,
      code: "import Errors from 'not-errorsModule'; this.raise(Errors.someErrorMessage, loc);",
      options: [{ errorModule: ERRORS_MODULE }],
      errors: [
        {
          messageId: "mustBeImported",
          data: { errorModule: ERRORS_MODULE },
        },
      ],
    },
    {
      filename: FILENAME,
      code: "import Errors from './not-errorsModule'; this.raise(Errors.someErrorMessage, loc);",
      options: [{ errorModule: MODULE_SAME_DIR }],
      errors: [
        {
          messageId: "mustBeImported",
          data: { errorModule: MODULE_SAME_DIR },
        },
      ],
    },
    {
      filename: FILENAME,
      code: "import Errors from '../not-errorsModule'; this.raise(Errors.someErrorMessage, loc);",
      options: [{ errorModule: MODULE_PARENT_DIR }],
      errors: [
        {
          messageId: "mustBeImported",
          data: { errorModule: MODULE_PARENT_DIR },
        },
      ],
    },
    {
      filename: FILENAME,
      code: "import Errors, { NotErrors } from 'not-errorsModule'; this.raise(Errors.someErrorMessage, loc);",
      options: [{ errorModule: ERRORS_MODULE }],
      errors: [
        {
          messageId: "mustBeImported",
          data: { errorModule: ERRORS_MODULE },
        },
      ],
    },
    {
      filename: FILENAME,
      code: "import Errors, { NotErrors } from './not-errorsModule'; this.raise(Errors.someErrorMessage, loc);",
      options: [{ errorModule: MODULE_SAME_DIR }],
      errors: [
        {
          messageId: "mustBeImported",
          data: { errorModule: MODULE_SAME_DIR },
        },
      ],
    },
    {
      filename: FILENAME,
      code: "import Errors, { NotErrors } from '../not-errorsModule'; this.raise(Errors.someErrorMessage, loc);",
      options: [{ errorModule: MODULE_PARENT_DIR }],
      errors: [
        {
          messageId: "mustBeImported",
          data: { errorModule: MODULE_PARENT_DIR },
        },
      ],
    },
    {
      filename: FILENAME,
      code: "import NotErrors, { Errors } from 'not-errorsModule'; this.raise(Errors.someErrorMessage, loc);",
      options: [{ errorModule: ERRORS_MODULE }],
      errors: [
        {
          messageId: "mustBeImported",
          data: { errorModule: ERRORS_MODULE },
        },
      ],
    },
    {
      filename: FILENAME,
      code: "import NotErrors, { Errors } from './not-errorsModule'; this.raise(Errors.someErrorMessage, loc);",
      options: [{ errorModule: MODULE_SAME_DIR }],
      errors: [
        {
          messageId: "mustBeImported",
          data: { errorModule: MODULE_SAME_DIR },
        },
      ],
    },
    {
      filename: FILENAME,
      code: "import NotErrors, { Errors } from '../not-errorsModule'; this.raise(Errors.someErrorMessage, loc);",
      options: [{ errorModule: MODULE_PARENT_DIR }],
      errors: [
        {
          messageId: "mustBeImported",
          data: { errorModule: MODULE_PARENT_DIR },
        },
      ],
    },
    {
      filename: FILENAME,
      code: "import Errors from 'not-errorsModule'; function fn() { this.raise(Errors.someErrorMessage, loc); }",
      options: [{ errorModule: ERRORS_MODULE }],
      errors: [
        {
          messageId: "mustBeImported",
          data: { errorModule: ERRORS_MODULE },
        },
      ],
    },
    {
      filename: FILENAME,
      code: "import Errors from './not-errorsModule'; function fn() { this.raise(Errors.someErrorMessage, loc); }",
      options: [{ errorModule: MODULE_SAME_DIR }],
      errors: [
        {
          messageId: "mustBeImported",
          data: { errorModule: MODULE_SAME_DIR },
        },
      ],
    },
    {
      filename: FILENAME,
      code: "import Errors from '../not-errorsModule'; function fn() { this.raise(Errors.someErrorMessage, loc); }",
      options: [{ errorModule: MODULE_PARENT_DIR }],
      errors: [
        {
          messageId: "mustBeImported",
          data: { errorModule: MODULE_PARENT_DIR },
        },
      ],
    },
    {
      filename: FILENAME,
      code: "import Errors, { NotErrors } from 'not-errorsModule'; function fn() { this.raise(Errors.someErrorMessage, loc); }",
      options: [{ errorModule: ERRORS_MODULE }],
      errors: [
        {
          messageId: "mustBeImported",
          data: { errorModule: ERRORS_MODULE },
        },
      ],
    },
    {
      filename: FILENAME,
      code: "import Errors, { NotErrors } from './not-errorsModule'; function fn() { this.raise(Errors.someErrorMessage, loc); }",
      options: [{ errorModule: MODULE_SAME_DIR }],
      errors: [
        {
          messageId: "mustBeImported",
          data: { errorModule: MODULE_SAME_DIR },
        },
      ],
    },
    {
      filename: FILENAME,
      code: "import Errors, { NotErrors } from '../not-errorsModule'; function fn() { this.raise(Errors.someErrorMessage, loc); }",
      options: [{ errorModule: MODULE_PARENT_DIR }],
      errors: [
        {
          messageId: "mustBeImported",
          data: { errorModule: MODULE_PARENT_DIR },
        },
      ],
    },
    {
      filename: FILENAME,
      code: "import NotErrors, { Errors } from 'not-errorsModule'; function fn() { this.raise(Errors.someErrorMessage, loc); }",
      options: [{ errorModule: ERRORS_MODULE }],
      errors: [
        {
          messageId: "mustBeImported",
          data: { errorModule: ERRORS_MODULE },
        },
      ],
    },
    {
      filename: FILENAME,
      code: "import NotErrors, { Errors } from './not-errorsModule'; function fn() { this.raise(Errors.someErrorMessage, loc); }",
      options: [{ errorModule: MODULE_SAME_DIR }],
      errors: [
        {
          messageId: "mustBeImported",
          data: { errorModule: MODULE_SAME_DIR },
        },
      ],
    },
    {
      filename: FILENAME,
      code: "import NotErrors, { Errors } from '../not-errorsModule'; function fn() { this.raise(Errors.someErrorMessage, loc); }",
      options: [{ errorModule: MODULE_PARENT_DIR }],
      errors: [
        {
          messageId: "mustBeImported",
          data: { errorModule: MODULE_PARENT_DIR },
        },
      ],
    },

    // Should error if either part of a ternary isn't from error module
    {
      filename: FILENAME,
      code: "import Errors, { NotErrors } from 'errorsModule'; this.raise(a ? Errors.someErrorMessage : 'hello', loc);",
      options: [{ errorModule: ERRORS_MODULE }],
      errors: [
        {
          messageId: "mustBeImported",
          data: { errorModule: ERRORS_MODULE },
        },
      ],
    },
    {
      filename: FILENAME,
      code: "import Errors, { NotErrors } from 'errorsModule'; this.raise( a ? 'hello' : Errors.someErrorMessage, loc);",
      options: [{ errorModule: ERRORS_MODULE }],
      errors: [
        {
          messageId: "mustBeImported",
          data: { errorModule: ERRORS_MODULE },
        },
      ],
    },
    {
      filename: FILENAME,
      code: "import Errors, { NotErrors } from 'errorsModule'; this.raise(a ? 'hello' : 'world', loc);",
      options: [{ errorModule: ERRORS_MODULE }],
      errors: [
        {
          messageId: "mustBeImported",
          data: { errorModule: ERRORS_MODULE },
        },
      ],
    },
  ],
});
