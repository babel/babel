var _reactJsxDevRuntime = require("react/jsx-dev-runtime");
var _jsxFileName = "<CWD>/packages/babel-plugin-transform-react-jsx-development/test/fixtures/cross-platform/within-derived-classes-constructor/input.js";
class A {}
class B extends A {
  constructor() {
    /*#__PURE__*/_reactJsxDevRuntime.jsxDEV("sometag1", {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 5,
      columnNumber: 5
    });
    super(/*#__PURE__*/_reactJsxDevRuntime.jsxDEV("sometag2", {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 6,
      columnNumber: 11
    }));
    /*#__PURE__*/_reactJsxDevRuntime.jsxDEV("sometag3", {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 7,
      columnNumber: 5
    });
  }
}
class C {
  constructor() {
    /*#__PURE__*/_reactJsxDevRuntime.jsxDEV("sometag4", {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 5
    }, this);
    class D extends A {
      constructor() {
        super();
      }
    }
    const E = class extends A {
      constructor() {
        super();
      }
    };
  }
}
class E extends A {
  constructor() {
    this.x = function () {
      return /*#__PURE__*/_reactJsxDevRuntime.jsxDEV("sometag5", {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 29,
        columnNumber: 20
      });
    };
    this.y = function () {
      return /*#__PURE__*/_reactJsxDevRuntime.jsxDEV("sometag6", {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 31,
        columnNumber: 14
      }, this);
    };
    function z() {
      return /*#__PURE__*/_reactJsxDevRuntime.jsxDEV("sometag7", {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 34,
        columnNumber: 14
      }, this);
    }
    {
      /*#__PURE__*/_reactJsxDevRuntime.jsxDEV("sometag8", {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 36,
        columnNumber: 7
      });
    }
    super();
  }
}
class F {
  constructor() {
    /*#__PURE__*/_reactJsxDevRuntime.jsxDEV("sometag9", {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 5
    }, this);
  }
}
class G extends A {
  constructor() {
    return /*#__PURE__*/_reactJsxDevRuntime.jsxDEV("sometag10", {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 12
    });
  }
}
