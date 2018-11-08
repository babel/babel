/**
 * @fileoverview Tests for camelcase rule.
 * @author Nicholas C. Zakas
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../rules/camelcase"),
  RuleTester = require("../RuleTester");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("camelcase", rule, {
  valid: [
    // Original test cases.
    "firstName = \"Nicholas\"",
    "FIRST_NAME = \"Nicholas\"",
    "__myPrivateVariable = \"Patrick\"",
    "myPrivateVariable_ = \"Patrick\"",
    "function doSomething(){}",
    "do_something()",
    "new do_something",
    "new do_something()",
    "foo.do_something()",
    "var foo = bar.baz_boom;",
    "var foo = bar.baz_boom.something;",
    "foo.boom_pow.qux = bar.baz_boom.something;",
    "if (bar.baz_boom) {}",
    "var obj = { key: foo.bar_baz };",
    "var arr = [foo.bar_baz];",
    "[foo.bar_baz]",
    "var arr = [foo.bar_baz.qux];",
    "[foo.bar_baz.nesting]",
    "if (foo.bar_baz === boom.bam_pow) { [foo.baz_boom] }",
    {
      code: "var o = {key: 1}",
      options: [{ properties: "always" }]
    },
    {
      code: "var o = {_leading: 1}",
      options: [{ properties: "always" }]
    },
    {
      code: "var o = {trailing_: 1}",
      options: [{ properties: "always" }]
    },
    {
      code: "var o = {bar_baz: 1}",
      options: [{ properties: "never" }]
    },
    {
      code: "var o = {_leading: 1}",
      options: [{ properties: "never" }]
    },
    {
      code: "var o = {trailing_: 1}",
      options: [{ properties: "never" }]
    },
    {
      code: "obj.a_b = 2;",
      options: [{ properties: "never" }]
    },
    {
      code: "obj._a = 2;",
      options: [{ properties: "always" }]
    },
    {
      code: "obj.a_ = 2;",
      options: [{ properties: "always" }]
    },
    {
      code: "obj._a = 2;",
      options: [{ properties: "never" }]
    },
    {
      code: "obj.a_ = 2;",
      options: [{ properties: "never" }]
    },
    {
      code: "var obj = {\n a_a: 1 \n};\n obj.a_b = 2;",
      options: [{ properties: "never" }]
    },
    {
      code: "obj.foo_bar = function(){};",
      options: [{ properties: "never" }]
    },
    {
      code: "var { category_id } = query;",
      options: [{ ignoreDestructuring: true }],
      parserOptions: { ecmaVersion: 6 }
    },
    {
      code: "var { category_id: category_id } = query;",
      options: [{ ignoreDestructuring: true }],
      parserOptions: { ecmaVersion: 6 }
    },
    {
      code: "var { category_id = 1 } = query;",
      options: [{ ignoreDestructuring: true }],
      parserOptions: { ecmaVersion: 6 },

    },
    {
      code: "var { category_id: category } = query;",
      parserOptions: { ecmaVersion: 6 }
    },
    {
      code: "var { _leading } = query;",
      parserOptions: { ecmaVersion: 6 }
    },
    {
      code: "var { trailing_ } = query;",
      parserOptions: { ecmaVersion: 6 }
    },
    {
      code: "import { camelCased } from \"external module\";",
      parserOptions: { ecmaVersion: 6, sourceType: "module" }
    },
    {
      code: "import { _leading } from \"external module\";",
      parserOptions: { ecmaVersion: 6, sourceType: "module" }
    },
    {
      code: "import { trailing_ } from \"external module\";",
      parserOptions: { ecmaVersion: 6, sourceType: "module" }
    },
    {
      code: "import { no_camelcased as camelCased } from \"external-module\";",
      parserOptions: { ecmaVersion: 6, sourceType: "module" }
    },
    {
      code: "import { no_camelcased as _leading } from \"external-module\";",
      parserOptions: { ecmaVersion: 6, sourceType: "module" }
    },
    {
      code: "import { no_camelcased as trailing_ } from \"external-module\";",
      parserOptions: { ecmaVersion: 6, sourceType: "module" }
    },
    {
      code: "import { no_camelcased as camelCased, anoterCamelCased } from \"external-module\";",
      parserOptions: { ecmaVersion: 6, sourceType: "module" }
    },
    {
      code: "function foo({ no_camelcased: camelCased }) {};",
      parserOptions: { ecmaVersion: 6 }
    },
    {
      code: "function foo({ no_camelcased: _leading }) {};",
      parserOptions: { ecmaVersion: 6 }
    },
    {
      code: "function foo({ no_camelcased: trailing_ }) {};",
      parserOptions: { ecmaVersion: 6 }
    },
    {
      code: "function foo({ camelCased = 'default value' }) {};",
      parserOptions: { ecmaVersion: 6 }
    },
    {
      code: "function foo({ _leading = 'default value' }) {};",
      parserOptions: { ecmaVersion: 6 }
    },
    {
      code: "function foo({ trailing_ = 'default value' }) {};",
      parserOptions: { ecmaVersion: 6 }
    },
    {
      code: "function foo({ camelCased }) {};",
      parserOptions: { ecmaVersion: 6 }
    },
    {
      code: "function foo({ _leading }) {}",
      parserOptions: { ecmaVersion: 6 }
    },
    {
      code: "function foo({ trailing_ }) {}",
      parserOptions: { ecmaVersion: 6 }
    },

    // Babel-specific test cases
    {
      code: "var foo = bar?.a_b;",
      options: [{ properties: "never" }]
    },
  ],
  invalid: [
    {
      code: "first_name = \"Nicholas\"",
      errors: [
        {
          messageId: "notCamelCase",
          data: { name: "first_name" },
          type: "Identifier"
        }
      ]
    },
    {
      code: "__private_first_name = \"Patrick\"",
      errors: [
        {
          messageId: "notCamelCase",
          data: { name: "__private_first_name" },
          type: "Identifier"
        }
      ]
    },
    {
      code: "function foo_bar(){}",
      errors: [
        {
          messageId: "notCamelCase",
          data: { name: "foo_bar" },
          type: "Identifier"
        }
      ]
    },
    {
      code: "obj.foo_bar = function(){};",
      errors: [
        {
          messageId: "notCamelCase",
          data: { name: "foo_bar" },
          type: "Identifier"
        }
      ]
    },
    {
      code: "bar_baz.foo = function(){};",
      errors: [
        {
          messageId: "notCamelCase",
          data: { name: "bar_baz" },
          type: "Identifier"
        }
      ]
    },
    {
      code: "[foo_bar.baz]",
      errors: [
        {
          messageId: "notCamelCase",
          data: { name: "foo_bar" },
          type: "Identifier"
        }
      ]
    },
    {
      code: "if (foo.bar_baz === boom.bam_pow) { [foo_bar.baz] }",
      errors: [
        {
          messageId: "notCamelCase",
          data: { name: "foo_bar" },
          type: "Identifier"
        }
      ]
    },
    {
      code: "foo.bar_baz = boom.bam_pow",
      errors: [
        {
          messageId: "notCamelCase",
          data: { name: "bar_baz" },
          type: "Identifier"
        }
      ]
    },
    {
      code: "var foo = { bar_baz: boom.bam_pow }",
      errors: [
        {
          messageId: "notCamelCase",
          data: { name: "bar_baz" },
          type: "Identifier"
        }
      ]
    },
    {
      code: "foo.qux.boom_pow = { bar: boom.bam_pow }",
      errors: [
        {
          messageId: "notCamelCase",
          data: { name: "boom_pow" },
          type: "Identifier"
        }
      ]
    },
    {
      code: "var o = {bar_baz: 1}",
      options: [{ properties: "always" }],
      errors: [
        {
          messageId: "notCamelCase",
          data: { name: "bar_baz" },
          type: "Identifier"
        }
      ]
    },
    {
      code: "obj.a_b = 2;",
      options: [{ properties: "always" }],
      errors: [
        {
          messageId: "notCamelCase",
          data: { name: "a_b" },
          type: "Identifier"
        }
      ]
    },
    {
      code: "var { category_id: category_alias } = query;",
      parserOptions: { ecmaVersion: 6 },
      errors: [
        {
          messageId: "notCamelCase",
          data: { name: "category_alias" },
          type: "Identifier"
        }
      ]
    },
    {
      code: "var { category_id: category_alias } = query;",
      options: [{ ignoreDestructuring: true }],
      parserOptions: { ecmaVersion: 6 },
      errors: [
        {
          messageId: "notCamelCase",
          data: { name: "category_alias" },
          type: "Identifier"
        }
      ]
    },
    {
      code: "var { category_id: categoryId, ...other_props } = query;",
      options: [{ ignoreDestructuring: true }],
      parserOptions: { ecmaVersion: 2018 },
      errors: [
        {
          messageId: "notCamelCase",
          data: { name: "other_props" },
          type: "Identifier"
        }
      ]
    },
    {
      code: "var { category_id } = query;",
      parserOptions: { ecmaVersion: 6 },
      errors: [
        {
          messageId: "notCamelCase",
          data: { name: "category_id" },
          type: "Identifier"
        }
      ]
    },
    {
      code: "var { category_id: category_id } = query;",
      parserOptions: { ecmaVersion: 6 },
      errors: [
        {
          messageId: "notCamelCase",
          data: { name: "category_id" },
          type: "Identifier"
        }
      ]
    },
    {
      code: "var { category_id = 1 } = query;",
      parserOptions: { ecmaVersion: 6 },
      errors: [
        {
          message: "Identifier 'category_id' is not in camel case.",
          type: "Identifier"
        }
      ]
    },
    {
      code: "import no_camelcased from \"external-module\";",
      parserOptions: { ecmaVersion: 6, sourceType: "module" },
      errors: [
        {
          messageId: "notCamelCase",
          data: { name: "no_camelcased" },
          type: "Identifier"
        }
      ]
    },
    {
      code: "import * as no_camelcased from \"external-module\";",
      parserOptions: { ecmaVersion: 6, sourceType: "module" },
      errors: [
        {
          messageId: "notCamelCase",
          data: { name: "no_camelcased" },
          type: "Identifier"
        }
      ]
    },
    {
      code: "import { no_camelcased } from \"external-module\";",
      parserOptions: { ecmaVersion: 6, sourceType: "module" },
      errors: [
        {
          messageId: "notCamelCase",
          data: { name: "no_camelcased" },
          type: "Identifier"
        }
      ]
    },
    {
      code: "import { no_camelcased as no_camel_cased } from \"external module\";",
      parserOptions: { ecmaVersion: 6, sourceType: "module" },
      errors: [
        {
          messageId: "notCamelCase",
          data: { name: "no_camel_cased" },
          type: "Identifier"
        }
      ]
    },
    {
      code: "import { camelCased as no_camel_cased } from \"external module\";",
      parserOptions: { ecmaVersion: 6, sourceType: "module" },
      errors: [
        {
          messageId: "notCamelCase",
          data: { name: "no_camel_cased" },
          type: "Identifier"
        }
      ]
    },
    {
      code: "import { camelCased, no_camelcased } from \"external-module\";",
      parserOptions: { ecmaVersion: 6, sourceType: "module" },
      errors: [
        {
          messageId: "notCamelCase",
          data: { name: "no_camelcased" },
          type: "Identifier"
        }
      ]
    },
    {
      code: "import { no_camelcased as camelCased, another_no_camelcased } from \"external-module\";",
      parserOptions: { ecmaVersion: 6, sourceType: "module" },
      errors: [
        {
          messageId: "notCamelCase",
          data: { name: "another_no_camelcased" },
          type: "Identifier"
        }
      ]
    },
    {
      code: "import camelCased, { no_camelcased } from \"external-module\";",
      parserOptions: { ecmaVersion: 6, sourceType: "module" },
      errors: [
        {
          messageId: "notCamelCase",
          data: { name: "no_camelcased" },
          type: "Identifier"
        }
      ]
    },
    {
      code: "import no_camelcased, { another_no_camelcased as camelCased } from \"external-module\";",
      parserOptions: { ecmaVersion: 6, sourceType: "module" },
      errors: [
        {
          messageId: "notCamelCase",
          data: { name: "no_camelcased" },
          type: "Identifier"
        }
      ]
    },
    {
      code: "function foo({ no_camelcased }) {};",
      parserOptions: { ecmaVersion: 6 },
      errors: [
        {
          message: "Identifier 'no_camelcased' is not in camel case.",
          type: "Identifier"
        }
      ]
    },
    {
      code: "function foo({ no_camelcased = 'default value' }) {};",
      parserOptions: { ecmaVersion: 6 },
      errors: [
        {
          message: "Identifier 'no_camelcased' is not in camel case.",
          type: "Identifier"
        }
      ]
    },
    {
      code: "const no_camelcased = 0; function foo({ camelcased_value = no_camelcased}) {}",
      parserOptions: { ecmaVersion: 6 },
      errors: [
        {
          message: "Identifier 'no_camelcased' is not in camel case.",
          type: "Identifier"
        },
        {
          message: "Identifier 'camelcased_value' is not in camel case.",
          type: "Identifier"
        }
      ]
    },
    {
      code: "const { bar: no_camelcased } = foo;",
      parserOptions: { ecmaVersion: 6 },
      errors: [
        {
          message: "Identifier 'no_camelcased' is not in camel case.",
          type: "Identifier"
        }
      ]
    },
    {
      code: "function foo({ value_1: my_default }) {}",
      parserOptions: { ecmaVersion: 6 },
      errors: [
        {
          message: "Identifier 'my_default' is not in camel case.",
          type: "Identifier"
        }
      ]
    },
    {
      code: "function foo({ isCamelcased: no_camelcased }) {};",
      parserOptions: { ecmaVersion: 6 },
      errors: [
        {
          message: "Identifier 'no_camelcased' is not in camel case.",
          type: "Identifier"
        }
      ]
    },
    {
      code: "var { foo: bar_baz = 1 } = quz;",
      parserOptions: { ecmaVersion: 6 },
      errors: [
        {
          message: "Identifier 'bar_baz' is not in camel case.",
          type: "Identifier"
        }
      ]
    },
    {
      code: "const { no_camelcased = false } = bar;",
      parserOptions: { ecmaVersion: 6 },
      errors: [
        {
          message: "Identifier 'no_camelcased' is not in camel case.",
          type: "Identifier"
        }
      ]
    }
  ]
});
