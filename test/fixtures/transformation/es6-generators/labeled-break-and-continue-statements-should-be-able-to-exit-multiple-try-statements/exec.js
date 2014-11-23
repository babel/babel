
    var e1 = "first";
    var e2 = "second";
    var e3 = "third";
    var e4 = "fourth";

    function *gen(n, which) {
      try {
        yield 0;
        genHelpers.raise(e1);

      } finally {
        yield 1;

        loop:
        for (var i = 0; i < n; ++i) {
          yield i;

          try {
            genHelpers.raise(e2);
          } finally {
            yield 2;

            try {
              genHelpers.raise(e3);
            } finally {
              yield 3;

              try {
                genHelpers.raise(e4);
              } finally {
                yield 4;

                if (which === "break") {
                  yield "breaking";
                  break loop;
                }

                if (which === "continue") {
                  yield "continuing";
                  continue loop;
                }

                yield 5;
              }
            }
          }
        }

        yield 6;
      }
    }

    try {
      genHelpers.check(gen(1, "break"), [
        0, 1, 0, 2, 3, 4, "breaking", 6
      ]);
      assert.ok(false, "should have thrown an exception");
    } catch (err) {
      assert.strictEqual(err, e1);
    }

    try {
      genHelpers.check(gen(3, "continue"), [
        0, 1, 0, 2, 3, 4, "continuing",
        1, 2, 3, 4, "continuing",
        2, 2, 3, 4, "continuing",
        6 // Loop finished naturally.
      ]);
      assert.ok(false, "should have thrown an exception");
    } catch (err) {
      assert.strictEqual(err, e1);
    }

    try {
      genHelpers.check(gen(3, "neither"), [
        0, 1, 0, 2, 3, 4, 5
      ]);
      assert.ok(false, "should have thrown an exception");
    } catch (err) {
      assert.strictEqual(err, e4);
    }
