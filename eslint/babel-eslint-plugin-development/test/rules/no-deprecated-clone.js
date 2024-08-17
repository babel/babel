import rule from "../../lib/rules/no-deprecated-clone.cjs";
import RuleTester from "../../../babel-eslint-shared-fixtures/utils/RuleTester.js";

const cloneError = "t.clone() is deprecated. Use t.cloneNode() instead.";
const cloneDeepError =
  "t.cloneDeep() is deprecated. Use t.cloneNode() instead.";

const ruleTester = new RuleTester();

ruleTester.run("no-deprecated-clone", rule, {
  valid: [
    `_.clone(obj)`,
    `_.cloneDeep(obj)`,
    `import * as t from "lib"; t.clone();`,
    `import * as t from "lib"; t.cloneDeep();`,
    `function f(_) { _.types.clone(); }`,
    `function f(_) { _.types.cloneDeep(); }`,
    `import * as t from "@babel/types"; t.cloneNode();`,
  ],
  invalid: [
    {
      code: `import { clone } from "@babel/types"; clone();`,
      errors: [cloneError],
    },
    {
      code: `import { cloneDeep } from "@babel/types"; cloneDeep();`,
      errors: [cloneDeepError],
    },
    {
      code: `import { clone } from "@babel/types"; var clone2 = clone; clone2();`,
      errors: [cloneError],
    },
    {
      code: `import { cloneDeep } from "@babel/types"; var cloneDeep2 = cloneDeep; cloneDeep2();`,
      errors: [cloneDeepError],
    },
    {
      code: `import * as t from "@babel/types"; t.clone();`,
      output: `import * as t from "@babel/types"; t.cloneNode();`,
      errors: [cloneError],
    },
    {
      code: `import * as t from "@babel/types"; t.cloneDeep();`,
      output: `import * as t from "@babel/types"; t.cloneNode();`,
      errors: [cloneDeepError],
    },
    {
      code: `import * as t from "@babel/types"; var { clone } = t; clone();`,
      errors: [cloneError],
    },
    {
      code: `import * as t from "@babel/types"; var { cloneDeep } = t; cloneDeep();`,
      errors: [cloneDeepError],
    },
    {
      code: `import { clone as c } from "@babel/types"; c();`,
      errors: [cloneError],
    },
    {
      code: `import { cloneDeep as cD } from "@babel/types"; cD();`,
      errors: [cloneDeepError],
    },
    {
      code: `import * as babel from "@babel/core"; babel.types.clone();`,
      output: `import * as babel from "@babel/core"; babel.types.cloneNode();`,
      errors: [cloneError],
    },
    {
      code: `import * as babel from "@babel/core"; babel.types.cloneDeep();`,
      output: `import * as babel from "@babel/core"; babel.types.cloneNode();`,
      errors: [cloneDeepError],
    },
    {
      code: `import { types } from "@babel/core"; types.clone();`,
      output: `import { types } from "@babel/core"; types.cloneNode();`,
      errors: [cloneError],
    },
    {
      code: `import { types } from "@babel/core"; types.cloneDeep();`,
      output: `import { types } from "@babel/core"; types.cloneNode();`,
      errors: [cloneDeepError],
    },
    {
      code: `import { types as t } from "@babel/core"; t.clone();`,
      output: `import { types as t } from "@babel/core"; t.cloneNode();`,
      errors: [cloneError],
    },
    {
      code: `import { types as t } from "@babel/core"; t.cloneDeep();`,
      output: `import { types as t } from "@babel/core"; t.cloneNode();`,
      errors: [cloneDeepError],
    },
    {
      code: `export default function plugin(babel) { babel.types.clone() }`,
      output: `export default function plugin(babel) { babel.types.cloneNode() }`,
      errors: [cloneError],
    },
    {
      code: `export default function plugin(babel) { babel.types.cloneDeep() }`,
      output: `export default function plugin(babel) { babel.types.cloneNode() }`,
      errors: [cloneDeepError],
    },
    {
      code: `export default function plugin({ types }) { types.clone() }`,
      output: `export default function plugin({ types }) { types.cloneNode() }`,
      errors: [cloneError],
    },
    {
      code: `export default function plugin({ types }) { types.cloneDeep() }`,
      output: `export default function plugin({ types }) { types.cloneNode() }`,
      errors: [cloneDeepError],
    },
    {
      code: `export default function plugin({ types: t }) { t.clone() }`,
      output: `export default function plugin({ types: t }) { t.cloneNode() }`,
      errors: [cloneError],
    },
    {
      code: `export default function plugin({ types: t }) { t.cloneDeep() }`,
      output: `export default function plugin({ types: t }) { t.cloneNode() }`,
      errors: [cloneDeepError],
    },
    {
      code: `export default ({ types }) => { types.clone() }`,
      output: `export default ({ types }) => { types.cloneNode() }`,
      errors: [cloneError],
    },
    {
      code: `export default ({ types }) => { types.cloneDeep() }`,
      output: `export default ({ types }) => { types.cloneNode() }`,
      errors: [cloneDeepError],
    },
    {
      code: `module.exports = function plugin({ types }) { types.clone() }`,
      output: `module.exports = function plugin({ types }) { types.cloneNode() }`,
      errors: [cloneError],
    },
    {
      code: `module.exports = function plugin({ types }) { types.cloneDeep() }`,
      output: `module.exports = function plugin({ types }) { types.cloneNode() }`,
      errors: [cloneDeepError],
    },
    {
      code: `import { declare } from "@babel/helper-plugin-utils"; declare(({ types }) => { types.clone() });`,
      output: `import { declare } from "@babel/helper-plugin-utils"; declare(({ types }) => { types.cloneNode() });`,
      errors: [cloneError],
    },
    {
      code: `import { declare } from "@babel/helper-plugin-utils"; declare(({ types }) => { types.cloneDeep() });`,
      output: `import { declare } from "@babel/helper-plugin-utils"; declare(({ types }) => { types.cloneNode() });`,
      errors: [cloneDeepError],
    },
  ],
});
