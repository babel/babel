import path from "path";
import rule from "../../src/rules/dry-error-messages";
import RuleTester from "../../../babel-eslint-shared-fixtures/utils/RuleTester";

const FILENAME = path.resolve(__dirname, "test/lib/index.js");
const ERRORS_MODULE = "errorsModule";
const MODULE_SAME_DIR = path.resolve(__dirname, "test/lib/errorsModule.js");
const MODULE_PARENT_DIR = path.resolve(__dirname, "test/errorsModule.js");

const ruleTester = new RuleTester();

ruleTester.run("dry-error-messages", rule, {
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
      code:
        "import { Errors } from 'errorsModule'; this.raise(loc, Errors.someErrorMessage);",
      options: [{ errorModule: ERRORS_MODULE }],
    },
    {
      filename: FILENAME,
      code:
        "import { Errors } from './errorsModule'; this.raise(loc, Errors.someErrorMessage);",
      options: [{ errorModule: MODULE_SAME_DIR }],
    },
    {
      filename: FILENAME,
      code:
        "import { Errors } from '../errorsModule'; this.raise(loc, Errors.someErrorMessage);",
      options: [{ errorModule: MODULE_PARENT_DIR }],
    },
    {
      filename: FILENAME,
      code:
        "import { NotErrors, Errors } from 'errorsModule'; this.raise(loc, Errors.someErrorMessage);",
      options: [{ errorModule: ERRORS_MODULE }],
    },
    {
      filename: FILENAME,
      code:
        "import { NotErrors, Errors } from './errorsModule'; this.raise(loc, Errors.someErrorMessage);",
      options: [{ errorModule: MODULE_SAME_DIR }],
    },
    {
      filename: FILENAME,
      code:
        "import { NotErrors, Errors } from '../errorsModule'; this.raise(loc, Errors.someErrorMessage);",
      options: [{ errorModule: MODULE_PARENT_DIR }],
    },
    {
      filename: FILENAME,
      code:
        "import { Errors } from 'errorsModule'; function fn() { this.raise(loc, Errors.someErrorMessage); }",
      options: [{ errorModule: ERRORS_MODULE }],
    },
    {
      filename: FILENAME,
      code:
        "import { Errors } from './errorsModule'; function fn() { this.raise(loc, Errors.someErrorMessage); }",
      options: [{ errorModule: MODULE_SAME_DIR }],
    },
    {
      filename: FILENAME,
      code:
        "import { Errors } from '../errorsModule'; function fn() { this.raise(loc, Errors.someErrorMessage); }",
      options: [{ errorModule: MODULE_PARENT_DIR }],
    },
    {
      filename: FILENAME,
      code:
        "import { NotErrors, Errors } from 'errorsModule'; function fn() { this.raise(loc, Errors.someErrorMessage); }",
      options: [{ errorModule: ERRORS_MODULE }],
    },
    {
      filename: FILENAME,
      code:
        "import { NotErrors, Errors } from './errorsModule'; function fn() { this.raise(loc, Errors.someErrorMessage); }",
      options: [{ errorModule: MODULE_SAME_DIR }],
    },
    {
      filename: FILENAME,
      code:
        "import { NotErrors, Errors } from '../errorsModule'; function fn() { this.raise(loc, Errors.someErrorMessage); }",
      options: [{ errorModule: MODULE_PARENT_DIR }],
    },
    {
      filename: FILENAME,
      code:
        "import Errors from 'errorsModule'; this.raise(loc, Errors.someErrorMessage);",
      options: [{ errorModule: ERRORS_MODULE }],
    },
    {
      filename: FILENAME,
      code:
        "import Errors from './errorsModule'; this.raise(loc, Errors.someErrorMessage);",
      options: [{ errorModule: MODULE_SAME_DIR }],
    },
    {
      filename: FILENAME,
      code:
        "import Errors from '../errorsModule'; this.raise(loc, Errors.someErrorMessage);",
      options: [{ errorModule: MODULE_PARENT_DIR }],
    },
    {
      filename: FILENAME,
      code:
        "import Errors, { NotErrors } from 'errorsModule'; this.raise(loc, Errors.someErrorMessage);",
      options: [{ errorModule: ERRORS_MODULE }],
    },
    {
      filename: FILENAME,
      code:
        "import Errors, { NotErrors } from './errorsModule'; this.raise(loc, Errors.someErrorMessage);",
      options: [{ errorModule: MODULE_SAME_DIR }],
    },
    {
      filename: FILENAME,
      code:
        "import Errors, { NotErrors } from '../errorsModule'; this.raise(loc, Errors.someErrorMessage);",
      options: [{ errorModule: MODULE_PARENT_DIR }],
    },
    {
      filename: FILENAME,
      code:
        "import NotErrors, { Errors } from 'errorsModule'; this.raise(loc, Errors.someErrorMessage);",
      options: [{ errorModule: ERRORS_MODULE }],
    },
    {
      filename: FILENAME,
      code:
        "import NotErrors, { Errors } from './errorsModule'; this.raise(loc, Errors.someErrorMessage);",
      options: [{ errorModule: MODULE_SAME_DIR }],
    },
    {
      filename: FILENAME,
      code:
        "import NotErrors, { Errors } from '../errorsModule'; this.raise(loc, Errors.someErrorMessage);",
      options: [{ errorModule: MODULE_PARENT_DIR }],
    },
    {
      filename: FILENAME,
      code:
        "import Errors from 'errorsModule'; function fn() { this.raise(loc, Errors.someErrorMessage); }",
      options: [{ errorModule: ERRORS_MODULE }],
    },
    {
      filename: FILENAME,
      code:
        "import Errors from './errorsModule'; function fn() { this.raise(loc, Errors.someErrorMessage); }",
      options: [{ errorModule: MODULE_SAME_DIR }],
    },
    {
      filename: FILENAME,
      code:
        "import Errors from '../errorsModule'; function fn() { this.raise(loc, Errors.someErrorMessage); }",
      options: [{ errorModule: MODULE_PARENT_DIR }],
    },
    {
      filename: FILENAME,
      code:
        "import Errors, { NotErrors } from 'errorsModule'; function fn() { this.raise(loc, Errors.someErrorMessage); }",
      options: [{ errorModule: ERRORS_MODULE }],
    },
    {
      filename: FILENAME,
      code:
        "import Errors, { NotErrors } from './errorsModule'; function fn() { this.raise(loc, Errors.someErrorMessage); }",
      options: [{ errorModule: MODULE_SAME_DIR }],
    },
    {
      filename: FILENAME,
      code:
        "import Errors, { NotErrors } from '../errorsModule'; function fn() { this.raise(loc, Errors.someErrorMessage); }",
      options: [{ errorModule: MODULE_PARENT_DIR }],
    },
    {
      filename: FILENAME,
      code:
        "import NotErrors, { Errors } from 'errorsModule'; function fn() { this.raise(loc, Errors.someErrorMessage); }",
      options: [{ errorModule: ERRORS_MODULE }],
    },
    {
      filename: FILENAME,
      code:
        "import NotErrors, { Errors } from './errorsModule'; function fn() { this.raise(loc, Errors.someErrorMessage); }",
      options: [{ errorModule: MODULE_SAME_DIR }],
    },
    {
      filename: FILENAME,
      code:
        "import NotErrors, { Errors } from '../errorsModule'; function fn() { this.raise(loc, Errors.someErrorMessage); }",
      options: [{ errorModule: MODULE_PARENT_DIR }],
    },

    // Do not warn when file linted is error module.
    {
      filename: FILENAME,
      code: "this.raise(loc, 'Oh no!');",
      options: [{ errorModule: FILENAME }],
    },
    {
      filename: MODULE_SAME_DIR,
      code: "this.raise(loc, 'Oh no!');",
      options: [{ errorModule: MODULE_SAME_DIR }],
    },

    // Do not warn if second argument is missing
    {
      filename: FILENAME,
      code: "this.raise(loc);",
      options: [{ errorModule: ERRORS_MODULE }],
    },
  ],
  invalid: [
    {
      filename: FILENAME,
      code: "this.raise(loc, new Error('Uh oh'));",
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
      code: "throw this.raise(loc, new Error('Uh oh'));",
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
      code: "this.raise(loc, Errors.someErrorMessage);",
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
      code:
        "const Errors = { someErrorMessage: 'Uh oh!' }; this.raise(loc, Errors.someErrorMessage);",
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
      code: "import { Errors } from 'errorsModule'; this.raise(loc, 'Uh oh!');",
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
      code:
        "import { Errors } from 'errorsModule'; const msg = 'Uh oh!'; this.raise(loc, msg);",
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
      code:
        "import { Errors } from 'not-errorsModule'; this.raise(loc, Errors.someErrorMessage);",
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
      code:
        "import { Errors } from './not-errorsModule'; this.raise(loc, Errors.someErrorMessage);",
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
      code:
        "import { Errors } from '../not-errorsModule'; this.raise(loc, Errors.someErrorMessage);",
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
      code:
        "import { NotErrors, Errors } from 'not-errorsModule'; this.raise(loc, Errors.someErrorMessage);",
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
      code:
        "import { NotErrors, Errors } from './not-errorsModule'; this.raise(loc, Errors.someErrorMessage);",
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
      code:
        "import { NotErrors, Errors } from '../not-errorsModule'; this.raise(loc, Errors.someErrorMessage);",
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
      code:
        "import { Errors } from 'not-errorsModule'; function fn() { this.raise(loc, Errors.someErrorMessage); }",
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
      code:
        "import { Errors } from './not-errorsModule'; function fn() { this.raise(loc, Errors.someErrorMessage); }",
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
      code:
        "import { Errors } from '../not-errorsModule'; function fn() { this.raise(loc, Errors.someErrorMessage); }",
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
      code:
        "import { NotErrors, Errors } from 'not-errorsModule'; function fn() { this.raise(loc, Errors.someErrorMessage); }",
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
      code:
        "import { NotErrors, Errors } from './not-errorsModule'; function fn() { this.raise(loc, Errors.someErrorMessage); }",
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
      code:
        "import { NotErrors, Errors } from '../not-errorsModule'; function fn() { this.raise(loc, Errors.someErrorMessage); }",
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
      code:
        "import Errors from 'not-errorsModule'; this.raise(loc, Errors.someErrorMessage);",
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
      code:
        "import Errors from './not-errorsModule'; this.raise(loc, Errors.someErrorMessage);",
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
      code:
        "import Errors from '../not-errorsModule'; this.raise(loc, Errors.someErrorMessage);",
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
      code:
        "import Errors, { NotErrors } from 'not-errorsModule'; this.raise(loc, Errors.someErrorMessage);",
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
      code:
        "import Errors, { NotErrors } from './not-errorsModule'; this.raise(loc, Errors.someErrorMessage);",
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
      code:
        "import Errors, { NotErrors } from '../not-errorsModule'; this.raise(loc, Errors.someErrorMessage);",
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
      code:
        "import NotErrors, { Errors } from 'not-errorsModule'; this.raise(loc, Errors.someErrorMessage);",
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
      code:
        "import NotErrors, { Errors } from './not-errorsModule'; this.raise(loc, Errors.someErrorMessage);",
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
      code:
        "import NotErrors, { Errors } from '../not-errorsModule'; this.raise(loc, Errors.someErrorMessage);",
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
      code:
        "import Errors from 'not-errorsModule'; function fn() { this.raise(loc, Errors.someErrorMessage); }",
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
      code:
        "import Errors from './not-errorsModule'; function fn() { this.raise(loc, Errors.someErrorMessage); }",
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
      code:
        "import Errors from '../not-errorsModule'; function fn() { this.raise(loc, Errors.someErrorMessage); }",
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
      code:
        "import Errors, { NotErrors } from 'not-errorsModule'; function fn() { this.raise(loc, Errors.someErrorMessage); }",
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
      code:
        "import Errors, { NotErrors } from './not-errorsModule'; function fn() { this.raise(loc, Errors.someErrorMessage); }",
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
      code:
        "import Errors, { NotErrors } from '../not-errorsModule'; function fn() { this.raise(loc, Errors.someErrorMessage); }",
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
      code:
        "import NotErrors, { Errors } from 'not-errorsModule'; function fn() { this.raise(loc, Errors.someErrorMessage); }",
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
      code:
        "import NotErrors, { Errors } from './not-errorsModule'; function fn() { this.raise(loc, Errors.someErrorMessage); }",
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
      code:
        "import NotErrors, { Errors } from '../not-errorsModule'; function fn() { this.raise(loc, Errors.someErrorMessage); }",
      options: [{ errorModule: MODULE_PARENT_DIR }],
      errors: [
        {
          messageId: "mustBeImported",
          data: { errorModule: MODULE_PARENT_DIR },
        },
      ],
    },
  ],
});
