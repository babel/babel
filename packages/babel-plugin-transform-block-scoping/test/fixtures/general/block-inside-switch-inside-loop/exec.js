// it shouldn't break on a case-break statement
var i;
for (i = 0; i < 10; i++) {
  switch (i) {
    case 1: {
      break;
    }
  }

  const z = 3; // to force the plugin to convert to loop function call
  () => z;
}

expect(i).toBe(10);

// it should continue on continue statements within switch
var j = 0;
for (i = 0; i < 10; i++) {
  switch (i) {
    case 0: {
      continue;
    }
  }
  j++;

  const z = 3;
  () => z;
}

expect(j).toBe(9);

// it should work with loops nested within switch
j = 0;
for (i = 0; i < 10; i++) {
  switch (i) {
    case 0: {
      for (var k = 0; k < 10; k++) {
        const z = 3;
        () => z;
        j++;
        break;
      }
      break;
    }
  }

  const z = 3;
  () => z;
}

expect(j).toBe(1);
