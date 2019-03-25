let B = babelHelpers.decorate([dec], function (_initialize, _A) {
  "use strict";

  class B extends _A {
    constructor() {
      const foo = () => {
        try {
          super();
        } finally {
          _initialize(this);
        }
      };

      if (a) {
        try {
          super();
        } finally {
          _initialize(this);
        }
      } else {
        foo();
      }

      while (0) {
        try {
          super();
        } finally {
          _initialize(this);
        }
      }

      try {
        super();
      } finally {
        _initialize(this);
      }
    }

  }

  return {
    F: B,
    d: []
  };
}, A);
