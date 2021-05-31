// it shouldn't break on a case-break statement
var i;
the_loop: for (i = 0; i < 10; i++) {
  switch (i) {
    case 3: {
      break the_loop;
    }
  }

  const z = 3; // to force the plugin to convert to loop function call
  () => z;
}

expect(i).toBe(3);
