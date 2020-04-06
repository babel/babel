import path from "path";
import rule from "../../src/rules/dry-error-messages";
import RuleTester from "@babel/eslint-shared-fixtures/utils/RuleTester";

const FILENAME = path.resolve(__dirname, "test/lib/index.js");
const ERRORS_MODULE = "errorsModule";
const MODULE_SAME_DIR = path.resolve(__dirname, "test/lib/errorsModule.js");
const MODULE_PARENT_DIR = path.resolve(__dirname, "test/errorsModule.js");

const ruleTester = new RuleTester();

ruleTester.run("dry-error-messages", rule, {
  valid: [
    "this.raise(loc);", // Ignores malformed `this.raise` invocations.
    "this.notRaise(loc, 'Uh oh');",
    "throw new Error(this.raise('Uh oh'));",
    "this.raise(() => { throw new Error('Uh oh') });",
    "throw new Error('Uh oh')",
    "throw this.createError('Uh oh')",
    "throw this.error",
    "throw this.raise",
    "throw obj.error",
    "throw obj.raise",
    {
      filename: FILENAME,
      code:
        "import { Errors } from 'errorsModule'; throw this.raise(loc, Errors.someErrorMessage);",
      options: [{ errorModule: ERRORS_MODULE }],
    },
    {
      filename: FILENAME,
      code:
        "import { Errors } from './errorsModule'; throw this.raise(loc, Errors.someErrorMessage);",
      options: [{ errorModule: MODULE_SAME_DIR }],
    },
    {
      filename: FILENAME,
      code:
        "import { Errors } from '../errorsModule'; throw this.raise(loc, Errors.someErrorMessage);",
      options: [{ errorModule: MODULE_PARENT_DIR }],
    },
    {
      filename: FILENAME,
      code:
        "import { NotErrors, Errors } from 'errorsModule'; throw this.raise(loc, Errors.someErrorMessage);",
      options: [{ errorModule: ERRORS_MODULE }],
    },
    {
      filename: FILENAME,
      code:
        "import { NotErrors, Errors } from './errorsModule'; throw this.raise(loc, Errors.someErrorMessage);",
      options: [{ errorModule: MODULE_SAME_DIR }],
    },
    {
      filename: FILENAME,
      code:
        "import { NotErrors, Errors } from '../errorsModule'; throw this.raise(loc, Errors.someErrorMessage);",
      options: [{ errorModule: MODULE_PARENT_DIR }],
    },
    {
      filename: FILENAME,
      code:
        "import { Errors } from 'errorsModule'; function fn() { throw this.raise(loc, Errors.someErrorMessage); }",
      options: [{ errorModule: ERRORS_MODULE }],
    },
    {
      filename: FILENAME,
      code:
        "import { Errors } from './errorsModule'; function fn() { throw this.raise(loc, Errors.someErrorMessage); }",
      options: [{ errorModule: MODULE_SAME_DIR }],
    },
    {
      filename: FILENAME,
      code:
        "import { Errors } from '../errorsModule'; function fn() { throw this.raise(loc, Errors.someErrorMessage); }",
      options: [{ errorModule: MODULE_PARENT_DIR }],
    },
    {
      filename: FILENAME,
      code:
        "import { NotErrors, Errors } from 'errorsModule'; function fn() { throw this.raise(loc, Errors.someErrorMessage); }",
      options: [{ errorModule: ERRORS_MODULE }],
    },
    {
      filename: FILENAME,
      code:
        "import { NotErrors, Errors } from './errorsModule'; function fn() { throw this.raise(loc, Errors.someErrorMessage); }",
      options: [{ errorModule: MODULE_SAME_DIR }],
    },
    {
      filename: FILENAME,
      code:
        "import { NotErrors, Errors } from '../errorsModule'; function fn() { throw this.raise(loc, Errors.someErrorMessage); }",
      options: [{ errorModule: MODULE_PARENT_DIR }],
    },
    {
      filename: FILENAME,
      code:
        "import Errors from 'errorsModule'; throw this.raise(loc, Errors.someErrorMessage);",
      options: [{ errorModule: ERRORS_MODULE }],
    },
    {
      filename: FILENAME,
      code:
        "import Errors from './errorsModule'; throw this.raise(loc, Errors.someErrorMessage);",
      options: [{ errorModule: MODULE_SAME_DIR }],
    },
    {
      filename: FILENAME,
      code:
        "import Errors from '../errorsModule'; throw this.raise(loc, Errors.someErrorMessage);",
      options: [{ errorModule: MODULE_PARENT_DIR }],
    },
    {
      filename: FILENAME,
      code:
        "import Errors, { NotErrors } from 'errorsModule'; throw this.raise(loc, Errors.someErrorMessage);",
      options: [{ errorModule: ERRORS_MODULE }],
    },
    {
      filename: FILENAME,
      code:
        "import Errors, { NotErrors } from './errorsModule'; throw this.raise(loc, Errors.someErrorMessage);",
      options: [{ errorModule: MODULE_SAME_DIR }],
    },
    {
      filename: FILENAME,
      code:
        "import Errors, { NotErrors } from '../errorsModule'; throw this.raise(loc, Errors.someErrorMessage);",
      options: [{ errorModule: MODULE_PARENT_DIR }],
    },
    {
      filename: FILENAME,
      code:
        "import NotErrors, { Errors } from 'errorsModule'; throw this.raise(loc, Errors.someErrorMessage);",
      options: [{ errorModule: ERRORS_MODULE }],
    },
    {
      filename: FILENAME,
      code:
        "import NotErrors, { Errors } from './errorsModule'; throw this.raise(loc, Errors.someErrorMessage);",
      options: [{ errorModule: MODULE_SAME_DIR }],
    },
    {
      filename: FILENAME,
      code:
        "import NotErrors, { Errors } from '../errorsModule'; throw this.raise(loc, Errors.someErrorMessage);",
      options: [{ errorModule: MODULE_PARENT_DIR }],
    },
    {
      filename: FILENAME,
      code:
        "import Errors from 'errorsModule'; function fn() { throw this.raise(loc, Errors.someErrorMessage); }",
      options: [{ errorModule: ERRORS_MODULE }],
    },
    {
      filename: FILENAME,
      code:
        "import Errors from './errorsModule'; function fn() { throw this.raise(loc, Errors.someErrorMessage); }",
      options: [{ errorModule: MODULE_SAME_DIR }],
    },
    {
      filename: FILENAME,
      code:
        "import Errors from '../errorsModule'; function fn() { throw this.raise(loc, Errors.someErrorMessage); }",
      options: [{ errorModule: MODULE_PARENT_DIR }],
    },
    {
      filename: FILENAME,
      code:
        "import Errors, { NotErrors } from 'errorsModule'; function fn() { throw this.raise(loc, Errors.someErrorMessage); }",
      options: [{ errorModule: ERRORS_MODULE }],
    },
    {
      filename: FILENAME,
      code:
        "import Errors, { NotErrors } from './errorsModule'; function fn() { throw this.raise(loc, Errors.someErrorMessage); }",
      options: [{ errorModule: MODULE_SAME_DIR }],
    },
    {
      filename: FILENAME,
      code:
        "import Errors, { NotErrors } from '../errorsModule'; function fn() { throw this.raise(loc, Errors.someErrorMessage); }",
      options: [{ errorModule: MODULE_PARENT_DIR }],
    },
    {
      filename: FILENAME,
      code:
        "import NotErrors, { Errors } from 'errorsModule'; function fn() { throw this.raise(loc, Errors.someErrorMessage); }",
      options: [{ errorModule: ERRORS_MODULE }],
    },
    {
      filename: FILENAME,
      code:
        "import NotErrors, { Errors } from './errorsModule'; function fn() { throw this.raise(loc, Errors.someErrorMessage); }",
      options: [{ errorModule: MODULE_SAME_DIR }],
    },
    {
      filename: FILENAME,
      code:
        "import NotErrors, { Errors } from '../errorsModule'; function fn() { throw this.raise(loc, Errors.someErrorMessage); }",
      options: [{ errorModule: MODULE_PARENT_DIR }],
    },
  ],
  invalid: [
    {
      filename: FILENAME,
      code: "throw this.raise(loc, Errors.someErrorMessage);",
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
        "const Errors = { someErrorMessage: 'Uh oh!' }; throw this.raise(loc, Errors.someErrorMessage);",
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
        "import { Errors } from 'errorsModule'; throw this.raise(loc, 'Uh oh!');",
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
        "import { Errors } from 'errorsModule'; const msg = 'Uh oh!'; throw this.raise(loc, msg);",
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
        "import { Errors } from 'not-errorsModule'; throw this.raise(loc, Errors.someErrorMessage);",
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
        "import { Errors } from './not-errorsModule'; throw this.raise(loc, Errors.someErrorMessage);",
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
        "import { Errors } from '../not-errorsModule'; throw this.raise(loc, Errors.someErrorMessage);",
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
        "import { NotErrors, Errors } from 'not-errorsModule'; throw this.raise(loc, Errors.someErrorMessage);",
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
        "import { NotErrors, Errors } from './not-errorsModule'; throw this.raise(loc, Errors.someErrorMessage);",
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
        "import { NotErrors, Errors } from '../not-errorsModule'; throw this.raise(loc, Errors.someErrorMessage);",
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
        "import { Errors } from 'not-errorsModule'; function fn() { throw this.raise(loc, Errors.someErrorMessage); }",
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
        "import { Errors } from './not-errorsModule'; function fn() { throw this.raise(loc, Errors.someErrorMessage); }",
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
        "import { Errors } from '../not-errorsModule'; function fn() { throw this.raise(loc, Errors.someErrorMessage); }",
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
        "import { NotErrors, Errors } from 'not-errorsModule'; function fn() { throw this.raise(loc, Errors.someErrorMessage); }",
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
        "import { NotErrors, Errors } from './not-errorsModule'; function fn() { throw this.raise(loc, Errors.someErrorMessage); }",
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
        "import { NotErrors, Errors } from '../not-errorsModule'; function fn() { throw this.raise(loc, Errors.someErrorMessage); }",
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
        "import Errors from 'not-errorsModule'; throw this.raise(loc, Errors.someErrorMessage);",
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
        "import Errors from './not-errorsModule'; throw this.raise(loc, Errors.someErrorMessage);",
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
        "import Errors from '../not-errorsModule'; throw this.raise(loc, Errors.someErrorMessage);",
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
        "import Errors, { NotErrors } from 'not-errorsModule'; throw this.raise(loc, Errors.someErrorMessage);",
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
        "import Errors, { NotErrors } from './not-errorsModule'; throw this.raise(loc, Errors.someErrorMessage);",
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
        "import Errors, { NotErrors } from '../not-errorsModule'; throw this.raise(loc, Errors.someErrorMessage);",
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
        "import NotErrors, { Errors } from 'not-errorsModule'; throw this.raise(loc, Errors.someErrorMessage);",
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
        "import NotErrors, { Errors } from './not-errorsModule'; throw this.raise(loc, Errors.someErrorMessage);",
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
        "import NotErrors, { Errors } from '../not-errorsModule'; throw this.raise(loc, Errors.someErrorMessage);",
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
        "import Errors from 'not-errorsModule'; function fn() { throw this.raise(loc, Errors.someErrorMessage); }",
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
        "import Errors from './not-errorsModule'; function fn() { throw this.raise(loc, Errors.someErrorMessage); }",
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
        "import Errors from '../not-errorsModule'; function fn() { throw this.raise(loc, Errors.someErrorMessage); }",
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
        "import Errors, { NotErrors } from 'not-errorsModule'; function fn() { throw this.raise(loc, Errors.someErrorMessage); }",
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
        "import Errors, { NotErrors } from './not-errorsModule'; function fn() { throw this.raise(loc, Errors.someErrorMessage); }",
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
        "import Errors, { NotErrors } from '../not-errorsModule'; function fn() { throw this.raise(loc, Errors.someErrorMessage); }",
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
        "import NotErrors, { Errors } from 'not-errorsModule'; function fn() { throw this.raise(loc, Errors.someErrorMessage); }",
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
        "import NotErrors, { Errors } from './not-errorsModule'; function fn() { throw this.raise(loc, Errors.someErrorMessage); }",
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
        "import NotErrors, { Errors } from '../not-errorsModule'; function fn() { throw this.raise(loc, Errors.someErrorMessage); }",
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
