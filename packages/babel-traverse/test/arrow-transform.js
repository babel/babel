import { NodePath } from "../lib/index.js";
import { parse } from "@babel/parser";
import * as t from "@babel/types";

import _generate from "@babel/generator";
const generate = _generate.default || _generate;

function assertConversion(
  input,
  output,
  { methodName = "method", extend = false, arrowOpts } = {},
) {
  const inputAst = wrapMethod(input, methodName, extend);
  const outputAst = wrapMethod(output, methodName, extend);

  const rootPath = NodePath.get({
    hub: {
      addHelper(helperName) {
        return t.memberExpression(
          t.identifier("babelHelpers"),
          t.identifier(helperName),
        );
      },
    },
    parentPath: null,
    parent: inputAst,
    container: inputAst,
    key: "program",
  }).setContext();

  rootPath.traverse({
    ClassMethod(path) {
      path.get("body.body.0.expression").arrowFunctionToExpression(arrowOpts);
    },
  });

  expect(generate(inputAst).code).toBe(generate(outputAst).code);
}

function wrapMethod(body, methodName, extend) {
  return parse(
    `
    class Example ${extend ? "extends class {}" : ""} {
      ${methodName}() {${body} }
    }
  `,
    { plugins: ["jsx"] },
  );
}

const itBabel7 = process.env.BABEL_8_BREAKING ? it.skip : it;

describe("arrow function conversion", () => {
  it("should convert super calls in constructors", () => {
    assertConversion(
      `
      () => {
        super(345);
      };
      super();
      () => super();
    `,
      `
      var _supercall = (..._args) => super(..._args);

      (function () {
        _supercall(345);
      });
      _supercall();
      () => _supercall();
    `,
      { methodName: "constructor", extend: true },
    );
  });

  it("should convert super calls in constructors used in computed method keys", () => {
    assertConversion(
      `
      () => ({
        [super()]: 123,
        get [super() + "1"]() {},
        [super()]() {},
      });
    `,
      `
      var _supercall = (..._args) => super(..._args);

      (function () {
        return {
          [_supercall()]: 123,
          get [_supercall() + "1"]() {},
          [_supercall()]() {},
        };
      });
    `,
      { methodName: "constructor", extend: true },
    );
  });

  it("should convert super calls and this references in constructors", () => {
    assertConversion(
      `
      () => {
        super(345);
        this;
      };
      super();
      this;
      () => super();
      () => this;
    `,
      `
      var _supercall = (..._args) => (super(..._args), _this = this),
        _this;

      (function () {
        _supercall(345);
        _this;
      });
      _supercall();
      this;
      () => _supercall();
      () => this;
    `,
      { methodName: "constructor", extend: true },
    );
  });

  it("should convert this references in constructors", () => {
    assertConversion(
      `
      () => {
        this;
      };
      super();
      this;
      () => super();
      () => this;
    `,
      `
      var _this;

      (function () {
        _this;
      });
      super();
      _this = this;
      this;
      () => (super(), _this = this);
      () => this;
    `,
      { methodName: "constructor", extend: true },
    );
  });

  it("should convert this references in constructors with super() used in computed method keys", () => {
    assertConversion(
      `
      () => this;

      ({
        [super()]: 123,
        get [super() + "1"]() {},
        [super()]() {},
      });
    `,
      `
      var _this;

      (function () { return _this; });

      ({
        [(super(), _this = this)]: 123,
        get [(super(), _this = this) + "1"]() {},
        [(super(), _this = this)]() {},
      });
    `,
      { methodName: "constructor", extend: true },
    );
  });

  itBabel7(
    "should convert this references in constructors with spec compliance",
    () => {
      assertConversion(
        `
          () => {
            this;
          };
          super();
          this;
          () => super();
          () => this;
        `,
        `
          var _this,
              _arrowCheckId = {};

          (function () {
            babelHelpers.newArrowCheck(this, _arrowCheckId);

            _this;
          }).bind(_arrowCheckId);
          super();
          _this = this;
          this;
          () => (super(), _this = this);
          () => this;
        `,
        {
          methodName: "constructor",
          extend: true,
          arrowOpts: { specCompliant: true },
        },
      );
    },
  );

  it("should convert this references in constructors with `noNewArrows: false`", () => {
    assertConversion(
      `
      () => {
        this;
      };
      super();
      this;
      () => super();
      () => this;
    `,
      `
      var _this,
          _arrowCheckId = {};

      (function () {
        babelHelpers.newArrowCheck(this, _arrowCheckId);

        _this;
      }).bind(_arrowCheckId);
      super();
      _this = this;
      this;
      () => (super(), _this = this);
      () => this;
    `,
      {
        methodName: "constructor",
        extend: true,
        arrowOpts: { noNewArrows: false },
      },
    );
  });

  it("should convert this references in constructors without extension", () => {
    assertConversion(
      `
      () => {
        this;
      };
      this;
      () => this;
    `,
      `
      var _this = this;

      (function () {
        _this;
      });
      this;
      () => this;
    `,
      { methodName: "constructor" },
    );
  });

  itBabel7(
    "should convert this references in constructors with spec compliance without extension",
    () => {
      assertConversion(
        `
          () => {
            this;
          };
          this;
          () => this;
        `,
        `
          var _this = this;

          (function () {
            babelHelpers.newArrowCheck(this, _this);

            this;
          }).bind(this);
          this;
          () => this;
        `,
        { methodName: "constructor", arrowOpts: { specCompliant: true } },
      );
    },
  );

  it("should convert this references in constructors with `noNewArrows: false` without extension", () => {
    assertConversion(
      `
      () => {
        this;
      };
      this;
      () => this;
    `,
      `
      var _this = this;

      (function () {
        babelHelpers.newArrowCheck(this, _this);

        this;
      }).bind(this);
      this;
      () => this;
    `,
      { methodName: "constructor", arrowOpts: { noNewArrows: false } },
    );
  });

  it("should convert this references in methods", () => {
    assertConversion(
      `
      () => {
        this;
      };
      this;
      () => this;
    `,
      `
      var _this = this;

      (function () {
        _this;
      });
      this;
      () => this;
    `,
    );
  });

  itBabel7(
    "should convert this references in methods with spec compliance",
    () => {
      assertConversion(
        `
          () => {
            this;
          };
          this;
          () => this;
        `,
        `
          var _this = this;

          (function () {
            babelHelpers.newArrowCheck(this, _this);

            this;
          }).bind(this);
          this;
          () => this;
        `,
        { arrowOpts: { specCompliant: true } },
      );
    },
  );

  it("should convert this references in methods with `noNewArrows: false`", () => {
    assertConversion(
      `
      () => {
        this;
      };
      this;
      () => this;
    `,
      `
      var _this = this;

      (function () {
        babelHelpers.newArrowCheck(this, _this);

        this;
      }).bind(this);
      this;
      () => this;
    `,
      { arrowOpts: { noNewArrows: false } },
    );
  });

  it("should convert this references inside JSX in methods", () => {
    assertConversion(
      `
      () => {
        <this.this this="" />;
      };
      <this.this this="" />;
      () => <this.this this="" />;
    `,
      `
      var _this = this;

      (function () {
        <_this.this this="" />;
      });
      <this.this this="" />;
      () => <this.this this="" />;
    `,
    );
  });

  it("should convert this references used in computed method keys", () => {
    assertConversion(
      `
      () => ({
        [this]: 123,
        get [this + "1"]() {},
        [this]() {},
      });
    `,
      `
      var _this = this;

      (function () {
        return {
          [_this]: 123,
          get [_this + "1"]() {},
          [_this]() {},
        };
      });
    `,
    );
  });

  it("should convert arguments references", () => {
    assertConversion(
      `
      () => {
        arguments;
      };
      arguments;
      () => arguments;
    `,
      `
      var _arguments = arguments;

      (function () {
        _arguments;
      });
      arguments;
      () => arguments;
    `,
    );
  });

  it("should convert new.target references", () => {
    assertConversion(
      `
      () => {
        new.target;
      };
      new.target;
      () => new.target;
    `,
      `
      var _newtarget = new.target;

      (function () {
        _newtarget;
      });
      new.target;
      () => new.target;
    `,
    );
  });

  it("should convert super.prop references", () => {
    assertConversion(
      `
      () => {
        var tmp = super.foo;
      };
      super.foo;
      () => super.foo;
    `,
      `
      var _superprop_getFoo = () => super.foo;

      (function () {
        var tmp = _superprop_getFoo();
      });
      super.foo;
      () => super.foo;
    `,
    );
  });

  it("should convert super[prop] references", () => {
    assertConversion(
      `
      () => {
        var tmp = super[foo];
      };
      super[foo];
      () => super[foo];
    `,
      `
      var _superprop_get = _prop => super[_prop];

      (function () {
        var tmp = _superprop_get(foo);
      });
      super[foo];
      () => super[foo];
    `,
    );
  });

  it("should convert super.prop assignment", () => {
    assertConversion(
      `
      () => {
        super.foo = 4;
      };
      super.foo = 4;
      () => super.foo = 4;
    `,
      `
      var _superprop_setFoo = _value => super.foo = _value;

      (function () {
        _superprop_setFoo(4);
      });
      super.foo = 4;
      () => super.foo = 4;
    `,
    );
  });

  it("should convert super[prop] assignment", () => {
    assertConversion(
      `
      () => {
        super[foo] = 4;
      };
      super[foo] = 4;
      () => super[foo] = 4;
    `,
      `
      var _superprop_set = (_prop, _value) => super[_prop] = _value;

      (function () {
        _superprop_set(foo, 4);
      });
      super[foo] = 4;
      () => super[foo] = 4;
    `,
    );
  });

  it("should convert super.prop operator assign", () => {
    assertConversion(
      `
      () => {
        super.foo **= 4;
      };
      super.foo **= 4;
      () => super.foo **= 4;
    `,
      `
      var _superprop_setFoo = _value => super.foo = _value,
          _superprop_getFoo = () => super.foo;

      (function () {
        _superprop_setFoo(_superprop_getFoo() ** 4);
      });
      super.foo **= 4;
      () => super.foo **= 4;
    `,
    );
  });

  it("should convert super[prop] operator assign", () => {
    assertConversion(
      `
      () => {
        super[foo] **= 4;
      };
      super[foo] **= 4;
      () => super[foo] **= 4;
    `,
      `
      var _superprop_set = (_prop, _value) => super[_prop] = _value,
          _superprop_get = _prop2 => super[_prop2];

      (function () {
        var _tmp;

        _superprop_set(_tmp = foo, _superprop_get(_tmp) ** 4);
      });
      super[foo] **= 4;
      () => super[foo] **= 4;
    `,
    );
  });

  it("should convert super.prop operator logical assign `??=`", () => {
    assertConversion(
      `
      () => {
        super.foo ??= 4;
      };
      super.foo ??= 4;
      () => super.foo ??= 4;
    `,
      `
     var _superprop_getFoo = () => super.foo,
         _superprop_setFoo = _value => super.foo = _value;

     (function () {
       _superprop_getFoo() ?? _superprop_setFoo(4);
     });

     super.foo ??= 4;

     () => super.foo ??= 4;
    `,
    );
  });

  it("should convert super.prop operator logical assign `&&=`", () => {
    assertConversion(
      `
      () => {
        super.foo &&= true;
      };
      super.foo &&= true;
      () => super.foo &&= true;
    `,
      `
     var _superprop_getFoo = () => super.foo,
         _superprop_setFoo = _value => super.foo = _value;

     (function () {
       _superprop_getFoo() && _superprop_setFoo(true);
     });

     super.foo &&= true;

     () => super.foo &&= true;
    `,
    );
  });

  it("should convert super.prop operator logical assign `||=`", () => {
    assertConversion(
      `
      () => {
        super.foo ||= true;
      };
      super.foo ||= true;
      () => super.foo ||= true;
    `,
      `
     var _superprop_getFoo = () => super.foo,
         _superprop_setFoo = _value => super.foo = _value;

     (function () {
       _superprop_getFoo() || _superprop_setFoo(true);
     });

     super.foo ||= true;

     () => super.foo ||= true;
    `,
    );
  });

  it("should convert super[prop] operator logical assign `??=`", () => {
    assertConversion(
      `
      () => {
        super[foo] ??= 4;
      };
      super[foo] ??= 4;
      () => super[foo] ??= 4;
    `,
      `
     var _superprop_get = _prop => super[_prop],
         _superprop_set = (_prop2, _value) => super[_prop2] = _value;

     (function () {
       var _tmp;

       _superprop_get(_tmp = foo) ?? _superprop_set(_tmp, 4);
     });

     super[foo] ??= 4;

     () => super[foo] ??= 4;
    `,
    );
  });

  it("should convert super[prop] operator logical assign `&&=`", () => {
    assertConversion(
      `
      () => {
        super[foo] &&= true;
      };
      super[foo] &&= true;
      () => super[foo] &&= true;
    `,
      `
     var _superprop_get = _prop => super[_prop],
         _superprop_set = (_prop2, _value) => super[_prop2] = _value;

     (function () {
       var _tmp;

       _superprop_get(_tmp = foo) && _superprop_set(_tmp, true);
     });

     super[foo] &&= true;

     () => super[foo] &&= true;
    `,
    );
  });

  it("should convert super[prop] operator logical assign `||=`", () => {
    assertConversion(
      `
      () => {
        super[foo] ||= true;
      };
      super[foo] ||= true;
      () => super[foo] ||= true;
    `,
      `
     var _superprop_get = _prop => super[_prop],
         _superprop_set = (_prop2, _value) => super[_prop2] = _value;

     (function () {
       var _tmp;

       _superprop_get(_tmp = foo) || _superprop_set(_tmp, true);
     });

     super[foo] ||= true;

     () => super[foo] ||= true;
    `,
    );
  });

  it("should convert `++super.prop` prefix update", () => {
    assertConversion(
      `
      () => {
        ++super.foo;
      };
      ++super.foo;
      () => ++super.foo;
    `,
      `
      var _superprop_getFoo = () => super.foo,
          _superprop_setFoo = _value => super.foo = _value;

      (function () {
        var _tmp;

        _tmp = _superprop_getFoo(), _superprop_setFoo(_tmp + 1);
      });
      ++super.foo;
      () => ++super.foo;
    `,
    );
  });

  it("should convert `--super.prop` prefix update", () => {
    assertConversion(
      `
      () => {
        --super.foo;
      };
      --super.foo;
      () => --super.foo;
    `,
      `
      var _superprop_getFoo = () => super.foo,
          _superprop_setFoo = _value => super.foo = _value;

      (function () {
        var _tmp;

        _tmp = _superprop_getFoo(), _superprop_setFoo(_tmp - 1);
      });
      --super.foo;
      () => --super.foo;
    `,
    );
  });

  it("should convert `++super[prop]` prefix update", () => {
    assertConversion(
      `
      () => {
        ++super[foo];
      };
      ++super[foo];
      () => ++super[foo];
    `,
      `
      var _superprop_get = _prop2 => super[_prop2],
          _superprop_set = (_prop3, _value) => super[_prop3] = _value;

      (function () {
        var _tmp, _prop;

        _tmp = _superprop_get(_prop = foo), _superprop_set(_prop, _tmp + 1);
      });
      ++super[foo];
      () => ++super[foo];
    `,
    );
  });

  it("should convert `--super[prop]` prefix update", () => {
    assertConversion(
      `
      () => {
        --super[foo];
      };
      --super[foo];
      () => --super[foo];
    `,
      `
      var _superprop_get = _prop2 => super[_prop2],
          _superprop_set = (_prop3, _value) => super[_prop3] = _value;

      (function () {
        var _tmp, _prop;

        _tmp = _superprop_get(_prop = foo), _superprop_set(_prop, _tmp - 1);
      });
      --super[foo];
      () => --super[foo];
    `,
    );
  });

  it("should convert `super.prop++` suffix update", () => {
    assertConversion(
      `
      () => {
        super.foo++;
      };
      super.foo++;
      () => super.foo++;
    `,
      `
      var _superprop_getFoo = () => super.foo,
          _superprop_setFoo = _value => super.foo = _value;

      (function () {
        var _tmp;

        _tmp = _superprop_getFoo(), _superprop_setFoo(_tmp + 1), _tmp;
      });
      super.foo++;
      () => super.foo++;
    `,
    );
  });

  it("should convert `super.prop--` suffix update", () => {
    assertConversion(
      `
      () => {
        super.foo--;
      };
      super.foo--;
      () => super.foo--;
    `,
      `
      var _superprop_getFoo = () => super.foo,
          _superprop_setFoo = _value => super.foo = _value;

      (function () {
        var _tmp;

        _tmp = _superprop_getFoo(), _superprop_setFoo(_tmp - 1), _tmp;
      });
      super.foo--;
      () => super.foo--;
    `,
    );
  });

  it("should convert `super[prop]++` suffix update", () => {
    assertConversion(
      `
      () => {
        super[foo]++;
      };
      super[foo]++;
      () => super[foo]++;
    `,
      `
      var _superprop_get = _prop2 => super[_prop2],
          _superprop_set = (_prop3, _value) => super[_prop3] = _value;

      (function () {
        var _tmp, _prop;

        _tmp = _superprop_get(_prop = foo), _superprop_set(_prop, _tmp + 1), _tmp;
      });
      super[foo]++;
      () => super[foo]++;
    `,
    );
  });

  it("should convert `super[prop]--` suffix update", () => {
    assertConversion(
      `
      () => {
        super[foo]--;
      };
      super[foo]--;
      () => super[foo]--;
    `,
      `
      var _superprop_get = _prop2 => super[_prop2],
          _superprop_set = (_prop3, _value) => super[_prop3] = _value;

      (function () {
        var _tmp, _prop;

        _tmp = _superprop_get(_prop = foo), _superprop_set(_prop, _tmp - 1), _tmp;
      });
      super[foo]--;
      () => super[foo]--;
    `,
    );
  });

  it("should convert super.prop() calls without params", () => {
    assertConversion(
      `
      () => {
        super.foo();
      };
      super.foo();
      () => super.foo();
    `,
      `
      var _superprop_getFoo = () => super.foo,
          _this = this;

      (function () {
        _superprop_getFoo().call(_this);
      });
      super.foo();
      () => super.foo();
    `,
    );
  });

  it("should convert super.prop() calls with params", () => {
    assertConversion(
      `
      () => {
        super.foo(a, b, ...c);
      };
      super.foo(a, b, ...c);
      () => super.foo(a, b, ...c);
    `,
      `
      var _superprop_getFoo = () => super.foo,
          _this = this;

      (function () {
        _superprop_getFoo().call(_this, a, b, ...c);
      });
      super.foo(a, b, ...c);
      () => super.foo(a, b, ...c);
    `,
    );
  });

  it("should convert super[prop]() calls", () => {
    assertConversion(
      `
      () => {
        super[foo]();
      };
      super[foo]();
      () => super[foo]();
    `,
      `
      var _superprop_get = _prop => super[_prop],
          _this = this;

      (function () {
        _superprop_get(foo).call(_this);
      });
      super[foo]();
      () => super[foo]();
    `,
    );
  });
});
