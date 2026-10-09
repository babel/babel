import { isIdentifierName } from "../lib/index.js";

import { describeIsIdentifierNameTests } from "./helpers/describe-is-identifier-name-tests.js";

describeIsIdentifierNameTests(isIdentifierName);

import { isIdentifierStart } from "../lib/index.js";

import { describeIsIdentifierStartTests } from "./helpers/describe-is-identifier-start-tests.js";

describeIsIdentifierStartTests(isIdentifierStart);

import { isIdentifierChar } from "../lib/index.js";

import { describeIsIdentifierCharTests } from "./helpers/describe-is-identifier-char-tests.js";

describeIsIdentifierCharTests(isIdentifierChar);
