import { isIdentifierName } from "../lib/identifier-browser.js";

import { describeIsIdentifierNameTests } from "./helpers/describe-is-identifier-name-tests.js";

describeIsIdentifierNameTests(isIdentifierName);

import { isIdentifierStart } from "../lib/identifier-browser.js";

import { describeIsIdentifierStartTests } from "./helpers/describe-is-identifier-start-tests.js";

describeIsIdentifierStartTests(isIdentifierStart);

import { isIdentifierChar } from "../lib/identifier-browser.js";

import { describeIsIdentifierCharTests } from "./helpers/describe-is-identifier-char-tests.js";

describeIsIdentifierCharTests(isIdentifierChar);
